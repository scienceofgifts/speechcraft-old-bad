import { GoogleGenAI, Type } from '@google/genai';

export interface Env {
  GEMINI_API_KEY: string;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

const DEFAULT_GEMINI_MODEL_ID = 'gemini-3.5-flash-lite';

function resolveApiModelId(modelId?: string): string {
  if (!modelId) return DEFAULT_GEMINI_MODEL_ID;
  if (modelId.includes('flash-lite') || modelId.includes('lite')) return 'gemini-3.1-flash-lite';
  if (modelId.includes('pro')) return 'gemini-3.1-pro-preview';
  if (modelId.includes('tts')) return modelId;
  return modelId;
}

function getGeminiClient(apiKey?: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function extractBase64Data(input: string): string {
  if (!input || typeof input !== 'string') return '';
  const commaIndex = input.indexOf(',');
  if (commaIndex !== -1 && input.substring(0, commaIndex).includes('base64')) {
    return input.substring(commaIndex + 1).trim();
  }
  return input.trim();
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (path === '/health' || path === '/') {
      return jsonResponse({
        status: 'ok',
        service: 'speechcraft-api',
        timestamp: new Date().toISOString(),
      });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ code: 'METHOD_NOT_ALLOWED', error: 'Method not allowed.' }, 405);
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ code: 'INVALID_JSON', error: 'Invalid JSON body.' }, 400);
    }

    const ai = getGeminiClient(env.GEMINI_API_KEY);

    try {
      // 1. /api/analyze-speech
      if (path === '/api/analyze-speech') {
        const {
          audioBase64,
          mimeType = 'audio/webm',
          durationSeconds = 0,
          exerciseType = 'general',
          targetText = '',
          context = '',
          learnerGoals = [],
          targetAccent = 'General American English',
        } = body;

        if (!audioBase64 || typeof audioBase64 !== 'string') {
          return jsonResponse({ code: 'INVALID_AUDIO', error: 'No audio data was provided.' }, 400);
        }

        const cleanBase64 = extractBase64Data(audioBase64);
        if (!cleanBase64) {
          return jsonResponse({ code: 'INVALID_AUDIO', error: 'The audio payload appears empty or corrupted.' }, 400);
        }

        const approxBytes = (cleanBase64.length * 3) / 4;
        if (approxBytes > 15 * 1024 * 1024) {
          return jsonResponse({ code: 'REQUEST_TOO_LARGE', error: 'Audio recording exceeds 15 MB limit.' }, 413);
        }

        const systemInstruction = `You are a world-class speech and dialect coach specializing in General American English (GenAm), articulation, natural rhythm, and executive verbal presence.
Your task is to analyze the learner's actual spoken audio recording.

Guidelines:
1. Provide a STRICT VERBATIM transcription of what was spoken. Include every filler sound ("um", "uh", "er", "ah", "like", "you know", "I mean", "so yeah"), false start, repeated word, and audible pause.
2. Note that natural conversational speech contains occasional brief pauses; distinguish between thoughtful pauses and hesitant filler words.
3. Pronunciation & Accent Analysis: Compare against General American English standards:
   - Rhoticity (clear American /r/ in word-initial, blends, and vocalic /ɚ, ɝ/ like in 'bird', 'car', 'water').
   - Alveolar tap / flap T [ɾ] in intervocalic contexts ('butter', 'city', 'matter', 'better').
   - Consonant precision (dental fricatives /θ, ð/, clear /v/ vs /w/, final consonant releases).
   - Vowel distinctions (e.g., /æ/ as in 'cat', /ɪ/ vs /iː/, schwa /ə/ reduction in unstressed syllables).
   - Word and sentence stress, thought groups, and linking.
4. Fluency & Pacing:
   - Count actual filler occurrences.
   - Estimate speaking rate in Words Per Minute (WPM). (Optimal American conversational rate is usually 130-160 WPM).
   - Flag rushing, sudden deceleration, or monotone cadence.
5. Verbal Expression & Structure:
   - If spontaneous, assess clarity, conciseness, redundancy, and rambling.
6. Provide constructive, high-yield feedback. If audio evidence is limited or ambiguous, explicitly state that more practice is needed to confirm the pattern. Do not invent timestamps or phonetic certitude without audio evidence.`;

        const userPromptText = `Analyze this spoken audio.
Exercise Type: ${exerciseType}
Target Accent: ${targetAccent}
${targetText ? `Target Text/Script learner was reading: "${targetText}"` : ''}
${context ? `Context / Prompt: ${context}` : ''}
${learnerGoals?.length ? `Learner Focus Goals: ${learnerGoals.join(', ')}` : ''}
Duration reported: ${durationSeconds ? Math.round(durationSeconds) + ' seconds' : 'not specified'}

Return your analysis in the specified JSON schema.`;

        const requestedModel = body.selectedGeminiModel || body.selectedModel || body.model || DEFAULT_GEMINI_MODEL_ID;
        const modelToUse = resolveApiModelId(requestedModel);

        const analysisSchema = {
          type: Type.OBJECT,
          properties: {
            transcript: { type: Type.STRING, description: 'Verbatim transcript preserving all fillers, stutters, and repetitions.' },
            summary: { type: Type.STRING, description: 'Executive 2-3 sentence overview of this speech performance.' },
            metrics: {
              type: Type.OBJECT,
              properties: {
                estimatedWpm: { type: Type.NUMBER },
                fillerCount: { type: Type.INTEGER },
                detectedFillers: { type: Type.ARRAY, items: { type: Type.STRING } },
                clarityScore: { type: Type.NUMBER },
                pronunciationScore: { type: Type.NUMBER },
                pacingScore: { type: Type.NUMBER },
                fluencyScore: { type: Type.NUMBER },
              },
              required: ['estimatedWpm', 'fillerCount', 'clarityScore', 'pronunciationScore', 'pacingScore', 'fluencyScore'],
            },
            findings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  issue: { type: Type.STRING },
                  evidence: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  suggestedCorrection: { type: Type.STRING },
                  targetedExercise: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                },
                required: ['category', 'issue', 'evidence', 'explanation', 'suggestedCorrection', 'targetedExercise'],
              },
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            priorityAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
            nextExercises: { type: Type.ARRAY, items: { type: Type.STRING } },
            limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['transcript', 'summary', 'metrics', 'findings', 'strengths', 'priorityAreas', 'nextExercises'],
        };

        const geminiRes = await ai.models.generateContent({
          model: modelToUse,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: (mimeType || 'audio/webm').split(';')[0].trim().toLowerCase(),
                  data: cleanBase64,
                },
              },
              { text: userPromptText },
            ],
          },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: analysisSchema,
          },
        });

        const textOutput = geminiRes.text?.trim() || '{}';
        return jsonResponse(JSON.parse(textOutput));
      }

      // 2. /api/tts-reference
      if (path === '/api/tts-reference') {
        const { text } = body;
        if (!text || typeof text !== 'string') {
          return jsonResponse({ code: 'INVALID_INPUT', error: 'Text parameter is required.' }, 400);
        }

        let audioData: string | null = null;
        let mimeType = 'audio/wav';

        try {
          const ttsRes = await ai.models.generateContent({
            model: 'gemini-3.8-flash-lite-tts',
            contents: [{ role: 'user', parts: [{ text: text.trim() }] }],
          });
          for (const candidate of ttsRes.candidates || []) {
            for (const part of candidate.content?.parts || []) {
              if (part.inlineData?.data) {
                audioData = part.inlineData.data;
                mimeType = part.inlineData.mimeType || 'audio/wav';
                break;
              }
            }
            if (audioData) break;
          }
        } catch {
          try {
            const ttsRes2 = await ai.models.generateContent({
              model: 'gemini-3.8-flash-tts',
              contents: [{ role: 'user', parts: [{ text: text.trim() }] }],
            });
            for (const candidate of ttsRes2.candidates || []) {
              for (const part of candidate.content?.parts || []) {
                if (part.inlineData?.data) {
                  audioData = part.inlineData.data;
                  mimeType = part.inlineData.mimeType || 'audio/wav';
                  break;
                }
              }
              if (audioData) break;
            }
          } catch {
            // fallback
          }
        }

        if (!audioData) {
          return jsonResponse({ fallback: true, message: 'Triggering browser speech synthesis fallback.' });
        }

        return jsonResponse({
          audioBase64: `data:${mimeType};base64,${audioData}`,
          mimeType,
        });
      }

      // 3. /api/conversation-reply
      if (path === '/api/conversation-reply') {
        const {
          scenarioTitle,
          scenarioPrompt,
          conversationHistory = [],
          latestUserAudioBase64,
          latestUserTranscript,
          mode = 'standard',
          toneStyle = 'Playful & Witty',
          flirtationLevel = 'Confident & Flirty',
          partnerGender = 'Female',
          practiceObjective,
        } = body;

        let systemInstruction = '';
        if (mode === 'roleplay') {
          const genderInstruction =
            partnerGender === 'Male'
              ? 'The fictional roleplay partner must be consistently male, using male pronouns (he/him/his).'
              : partnerGender === 'Female'
              ? 'The fictional roleplay partner must be consistently female, using female pronouns (she/her/hers).'
              : 'Choose a suitable male or female character for this scenario and maintain consistent identity.';

          systemInstruction = `You are playing the fictional character in an immersive conversational roleplay scenario titled "${scenarioTitle || 'Romantic Scenario'}".
Scenario context: "${scenarioPrompt || 'Engage in natural spontaneous dialogue.'}"
Tone style: "${toneStyle}". Flirtation level: "${flirtationLevel}".
Partner Gender: ${genderInstruction}
${practiceObjective ? `Objective: "${practiceObjective}".` : ''}
Rules: Stay 100% in character. Never break character or mention AI. Keep coachingFeedback strictly empty ([]).`;
        } else if (mode === 'coach') {
          systemInstruction = `You are an expert American English communication and dating coach.
Scenario: "${scenarioTitle}". Setup: "${scenarioPrompt}".
Provide learnerTranscript, 1-2 coachingFeedback notes, and coachResponseText.`;
        } else {
          systemInstruction = `You are Alex, an engaging American executive speech and communication coach.
Scenario: "${scenarioTitle || 'Everyday Speaking'}". Setup: "${scenarioPrompt || 'Engage in dialogue.'}".`;
        }

        const contents: any[] = [];
        const historyContext = conversationHistory
          .slice(-6)
          .map((t: any) => `${t.role === 'coach' ? 'Coach (Alex)' : 'Learner'}: ${t.text}`)
          .join('\n');

        const promptText = `Previous context:\n${historyContext}\n\nLatest learner turn:\n${latestUserTranscript ? `Learner Transcript: "${latestUserTranscript}"` : 'Please transcribe the attached audio and respond.'}`;

        if (latestUserAudioBase64) {
          const cleanB64 = extractBase64Data(latestUserAudioBase64);
          if (cleanB64) {
            contents.push({
              inlineData: { mimeType: 'audio/webm', data: cleanB64 },
            });
          }
        }
        contents.push({ text: promptText });

        const conversationSchema = {
          type: Type.OBJECT,
          properties: {
            learnerTranscript: { type: Type.STRING },
            coachingFeedback: { type: Type.ARRAY, items: { type: Type.STRING } },
            coachResponseText: { type: Type.STRING },
            suggestedNextQuestion: { type: Type.STRING },
          },
          required: ['learnerTranscript', 'coachingFeedback', 'coachResponseText', 'suggestedNextQuestion'],
        };

        const requestedModel = body.selectedGeminiModel || body.selectedModel || body.model || DEFAULT_GEMINI_MODEL_ID;
        const modelToUse = resolveApiModelId(requestedModel);

        const geminiRes = await ai.models.generateContent({
          model: modelToUse,
          contents: { parts: contents },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: conversationSchema,
          },
        });

        return jsonResponse(JSON.parse(geminiRes.text?.trim() || '{}'));
      }

      // 4. /api/generate-vocab-lesson
      if (path === '/api/generate-vocab-lesson') {
        const { word, partOfSpeech = 'noun', definition = '', difficulty = 'Advanced', topicTags = [], rootId = '', wordId = '' } = body;
        if (!word) return jsonResponse({ code: 'INVALID_WORD', error: 'Word parameter is required.' }, 400);

        const systemInstruction = `You are a world-class lexicographer, etymologist, and speech coach. Generate a comprehensive vocabulary lesson for "${word}".`;
        const promptText = `Generate a full structured vocabulary lesson for word: "${word}", POS: "${partOfSpeech}", definition: "${definition}", difficulty: "${difficulty}", topics: ${JSON.stringify(topicTags)}. Return valid JSON.`;

        const requestedModel = body.selectedGeminiModel || body.selectedModel || DEFAULT_GEMINI_MODEL_ID;
        const modelToUse = resolveApiModelId(requestedModel);

        const geminiRes = await ai.models.generateContent({
          model: modelToUse,
          contents: promptText,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });

        const parsed = JSON.parse(geminiRes.text?.trim() || '{}');
        if (!parsed.id) parsed.id = wordId || `lesson-${word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        if (!parsed.word) parsed.word = word;
        return jsonResponse(parsed);
      }

      // 5. /api/generate-root-enrichment
      if (path === '/api/generate-root-enrichment') {
        const { wordOrRoot } = body;
        if (!wordOrRoot) return jsonResponse({ code: 'INVALID_INPUT', error: 'wordOrRoot required.' }, 400);

        const systemInstruction = `Master etymologist. Generate structured root or affix breakdown for "${wordOrRoot}".`;
        const geminiRes = await ai.models.generateContent({
          model: resolveApiModelId(body.selectedGeminiModel),
          contents: `Generate complete etymological root record for "${wordOrRoot}".`,
          config: { systemInstruction, responseMimeType: 'application/json' },
        });

        const parsed = JSON.parse(geminiRes.text?.trim() || '{}');
        if (!parsed.id) parsed.id = `gen-root-${wordOrRoot.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        return jsonResponse(parsed);
      }

      // 6. /api/generate-family-enrichment
      if (path === '/api/generate-family-enrichment') {
        const { word } = body;
        if (!word) return jsonResponse({ code: 'INVALID_INPUT', error: 'word required.' }, 400);

        const systemInstruction = `Morphological linguist. Generate 4-part Word Family Matrix for "${word}".`;
        const geminiRes = await ai.models.generateContent({
          model: resolveApiModelId(body.selectedGeminiModel),
          contents: `Generate Word Family Matrix for "${word}".`,
          config: { systemInstruction, responseMimeType: 'application/json' },
        });

        const parsed = JSON.parse(geminiRes.text?.trim() || '{}');
        if (!parsed.id) parsed.id = `gen-family-${word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        return jsonResponse(parsed);
      }

      // 7. /api/generate-curriculum-lessons
      if (path === '/api/generate-curriculum-lessons') {
        const { categoryId = 'banter', categoryName = 'Playful Banter', count = 4, selectedGeminiModel = DEFAULT_GEMINI_MODEL_ID } = body;
        const geminiRes = await ai.models.generateContent({
          model: resolveApiModelId(selectedGeminiModel),
          contents: `Generate ${count} distinct curriculum lessons for category "${categoryName}" as a JSON array.`,
          config: {
            systemInstruction: 'Expert speech coach and curriculum developer.',
            responseMimeType: 'application/json',
          },
        });

        let lessons = [];
        try {
          lessons = JSON.parse(geminiRes.text?.trim() || '[]');
          if (!Array.isArray(lessons)) lessons = [lessons];
        } catch {
          lessons = [];
        }
        return jsonResponse({ lessons });
      }

      // 8. /api/generate-compliment-collection
      if (path === '/api/generate-compliment-collection') {
        const { theme = 'Wit', tone = 'Playful', targetAudience = 'General', count = 8, selectedGeminiModel = DEFAULT_GEMINI_MODEL_ID } = body;
        const geminiRes = await ai.models.generateContent({
          model: resolveApiModelId(selectedGeminiModel),
          contents: `Generate ${count} compliments for theme "${theme}", tone "${tone}", audience "${targetAudience}".`,
          config: {
            systemInstruction: 'Master speech coach and social chemistry expert.',
            responseMimeType: 'application/json',
          },
        });

        return jsonResponse(JSON.parse(geminiRes.text?.trim() || '{}'));
      }

      // 9. /api/analyze-conversation-patterns
      if (path === '/api/analyze-conversation-patterns') {
        const { sessions = [] } = body;
        const transcriptTexts = sessions
          .map((s: any) => `Title: "${s.title}"\nText: "${s.transcript || s.summary || ''}"`)
          .join('\n\n');

        if (!transcriptTexts || transcriptTexts.length < 15) {
          return jsonResponse({ patterns: [], insufficientEvidence: 'Insufficient conversation history.' });
        }

        const geminiRes = await ai.models.generateContent({
          model: resolveApiModelId(body.selectedGeminiModel),
          contents: `Analyze these conversation transcripts for patterns:\n\n${transcriptTexts}`,
          config: {
            systemInstruction: 'Conversation and naturalness analyst.',
            responseMimeType: 'application/json',
          },
        });

        return jsonResponse(JSON.parse(geminiRes.text?.trim() || '{}'));
      }

      return jsonResponse({ code: 'NOT_FOUND', error: `API route ${path} not found.` }, 404);
    } catch (err: any) {
      console.error(`Worker error on ${path}:`, err);
      return jsonResponse({
        code: 'WORKER_ERROR',
        error: err?.message || 'An unexpected error occurred in the API worker.',
      }, 500);
    }
  },
};
