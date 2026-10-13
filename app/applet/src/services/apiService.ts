import { SpeechAnalysisResult, VocabularyCatalogueItem, DetailedWordLesson, ExpandedRootItem, WordFamilyItem } from '@/src/types/speech';
import { FlirtingLesson } from '@/src/data/flirtingStudioData';
import { getStoredProfile } from '@/src/services/storage';

const API_BASE_URL = import.meta.env.VITE_GEMINI_API_URL || '';

export interface AnalyzeOptions {
  audioBase64: string;
  mimeType: string;
  durationSeconds?: number;
  exerciseType?: string;
  targetText?: string;
  context?: string;
  learnerGoals?: string[];
  targetAccent?: string;
  selectedGeminiModel?: string;
}

// Helper to safely extract JSON or handle non-JSON responses gracefully
async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const rawText = await response.text();
    if (rawText.trim().toLowerCase().startsWith('<!doctype') || rawText.trim().toLowerCase().startsWith('<html')) {
      throw new Error(
        `Server returned an HTML page instead of API JSON response (HTTP ${response.status}). Please verify API endpoint.`
      );
    }
    throw new Error(`Server returned non-JSON response (HTTP ${response.status}): ${rawText.substring(0, 100)}`);
  }
  return await response.json();
}

export async function analyzeSpeech(options: AnalyzeOptions): Promise<SpeechAnalysisResult> {
  const controller = new AbortController();
  const timeoutMs = 120000; // 120 seconds client timeout for long audio recordings
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const selectedModel = options.selectedGeminiModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze-speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options,
        selectedGeminiModel: selectedModel,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Speech analysis failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch (parseErr: any) {
        if (parseErr.message.includes('HTML page')) {
          errMessage = parseErr.message;
        }
      }
      throw new Error(errMessage);
    }

    const result = await parseJsonResponse<SpeechAnalysisResult>(response);
    return result;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(
        'Speech analysis request timed out (120s). Please try recording a shorter clip (10–45 seconds) or check your connection.'
      );
    }
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new Error(
        'Network connection error: Unable to reach the speech analysis server. Please check your internet connection.'
      );
    }
    throw err;
  }
}

export async function getTtsReferenceAudio(text: string): Promise<{ audioBase64?: string; fallback?: boolean }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/tts-reference`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { fallback: true };
    }

    return await parseJsonResponse<{ audioBase64?: string; fallback?: boolean }>(response);
  } catch (e) {
    clearTimeout(timeoutId);
    console.warn('TTS reference request failed, triggering browser speech fallback:', e);
    return { fallback: true };
  }
}

export interface ConversationTurnPayload {
  scenarioTitle: string;
  scenarioPrompt: string;
  conversationHistory: { role: 'coach' | 'user'; text: string }[];
  latestUserAudioBase64?: string;
  latestUserTranscript?: string;
  selectedGeminiModel?: string;
  mode?: 'roleplay' | 'coach' | 'standard';
  toneStyle?: string;
  flirtationLevel?: string;
  partnerGender?: 'Male' | 'Female' | 'Either';
  practiceObjective?: string;
}

export interface ConversationTurnResponse {
  learnerTranscript: string;
  coachingFeedback: string[];
  coachResponseText: string;
  suggestedNextQuestion: string;
}

export async function submitConversationTurn(
  payload: ConversationTurnPayload
): Promise<ConversationTurnResponse> {
  const controller = new AbortController();
  const timeoutMs = 120000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const selectedModel = payload.selectedGeminiModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/conversation-reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        selectedGeminiModel: selectedModel,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Conversation round failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch (parseErr: any) {
        if (parseErr.message.includes('HTML page')) {
          errMessage = parseErr.message;
        }
      }
      throw new Error(errMessage);
    }

    return await parseJsonResponse<ConversationTurnResponse>(response);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(
        'Conversation response timed out (120s). Please try recording a shorter spoken turn.'
      );
    }
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new Error(
        'Network error: Unable to connect to conversation server. Please check your connection.'
      );
    }
    throw err;
  }
}

export async function generateVocabLesson(
  item: VocabularyCatalogueItem,
  selectedModel?: string
): Promise<DetailedWordLesson> {
  const controller = new AbortController();
  const timeoutMs = 120000; // 120s timeout
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const modelToUse = selectedModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-vocab-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wordId: item.id,
        word: item.word,
        partOfSpeech: item.partOfSpeech,
        definition: item.definition,
        difficulty: item.difficulty,
        topicTags: item.topicTags,
        rootId: item.rootId,
        selectedGeminiModel: modelToUse,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Lesson generation failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch (parseErr: any) {
        if (parseErr.message.includes('HTML page')) {
          errMessage = parseErr.message;
        }
      }
      throw new Error(errMessage);
    }

    return await parseJsonResponse<DetailedWordLesson>(response);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Lesson generation request timed out (120s). Please click Retry.');
    }
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your connection and retry.');
    }
    throw err;
  }
}

export async function generateRootEnrichment(
  wordOrRoot: string,
  selectedModel?: string
): Promise<ExpandedRootItem> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  const modelToUse = selectedModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-root-enrichment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wordOrRoot,
        selectedGeminiModel: modelToUse,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Root enrichment generation failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch {
        // Fallback
      }
      throw new Error(errMessage);
    }

    return await parseJsonResponse<ExpandedRootItem>(response);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Root enrichment request timed out. Please retry.');
    }
    throw err;
  }
}

export async function generateFamilyEnrichment(
  word: string,
  selectedModel?: string
): Promise<WordFamilyItem> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  const modelToUse = selectedModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-family-enrichment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word,
        selectedGeminiModel: modelToUse,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Word family enrichment generation failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch {
        // Fallback
      }
      throw new Error(errMessage);
    }

    return await parseJsonResponse<WordFamilyItem>(response);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Word family enrichment request timed out. Please retry.');
    }
    throw err;
  }
}

export interface GeneratedCompliment {
  id: string;
  phrase: string;
  category: string;
  subtletyScore: number;
  vocabularyHighlight: string;
  deliveryNotes: string;
  contextFit: string;
}

export interface ComplimentCollectionResponse {
  collectionTitle: string;
  theme: string;
  compliments: GeneratedCompliment[];
}

export async function generateComplimentCollection(options: {
  theme?: string;
  tone?: string;
  targetAudience?: string;
  count?: number;
  selectedGeminiModel?: string;
}): Promise<ComplimentCollectionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  const modelToUse = options.selectedGeminiModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-compliment-collection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options,
        selectedGeminiModel: modelToUse,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Compliment collection generation failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch {
        // Fallback
      }
      throw new Error(errMessage);
    }

    return await parseJsonResponse<ComplimentCollectionResponse>(response);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Compliment collection request timed out. Please retry.');
    }
    throw err;
  }
}

export async function generateCurriculumLessons(options: {
  categoryId?: string;
  categoryName?: string;
  count?: number;
  selectedGeminiModel?: string;
}): Promise<FlirtingLesson[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  const modelToUse = options.selectedGeminiModel || getStoredProfile().selectedGeminiModel;

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-curriculum-lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...options,
        selectedGeminiModel: modelToUse,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errMessage = `Curriculum generation failed (HTTP ${response.status})`;
      try {
        const errData = await parseJsonResponse<any>(response);
        errMessage = errData.error || errData.details || errMessage;
      } catch {
        // Fallback
      }
      throw new Error(errMessage);
    }

    const data = await parseJsonResponse<{ lessons: FlirtingLesson[] }>(response);
    return data.lessons || [];
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Curriculum generation request timed out. Please retry.');
    }
    throw err;
  }
}

export interface ConversationPatternAnalysis {
  patterns: {
    patternName: string;
    explanation: string;
    examples: string[];
    whyItMatters: string;
    confidence: 'High' | 'Medium' | 'Preliminary';
    trend: 'Improving' | 'Stable' | 'Frequent' | 'Insufficient Data';
    recommendedExercise: string;
  }[];
  insufficientEvidence?: string;
}

export async function analyzeConversationPatterns(sessions: any[]): Promise<ConversationPatternAnalysis> {
  const response = await fetch(`${API_BASE_URL}/api/analyze-conversation-patterns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessions }),
  });
  if (!response.ok) {
    throw new Error('Failed to analyze conversation patterns.');
  }
  return await parseJsonResponse<ConversationPatternAnalysis>(response);
}
