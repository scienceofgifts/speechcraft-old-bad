import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import { resolveApiModelId, DEFAULT_GEMINI_MODEL_ID } from './src/config/modelConfig';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware for JSON bodies with limit for audio base64 payload
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Helper to extract clean base64 string from data URL or raw string
function extractBase64Data(input: string): string {
  if (!input || typeof input !== 'string') return '';
  const commaIndex = input.indexOf(',');
  if (commaIndex !== -1 && input.substring(0, commaIndex).includes('base64')) {
    return input.substring(commaIndex + 1).trim();
  }
  return input.trim();
}

// Server-side Gemini client initialization
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[SERVER WARN] GEMINI_API_KEY is missing from environment variables.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Resilient execution with retry and fallback across supported Gemini models
async function callGeminiWithRetryAndFallback(
  primaryModel: string,
  fn: (model: string) => Promise<any>
): Promise<any> {
  const modelsToTry = Array.from(
    new Set([primaryModel, 'gemini-3.8-flash', 'gemini-3.1-flash-lite'])
  );
  let lastErr: any;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await fn(model);
      } catch (err: any) {
        lastErr = err;
        const msg = String(err?.message || '').toLowerCase();
        const isUnavailable =
          msg.includes('503') ||
          msg.includes('429') ||
          msg.includes('unavailable') ||
          msg.includes('high demand') ||
          msg.includes('overloaded');
        if (!isUnavailable) {
          throw err;
        }
        console.warn(`[SERVER WARN] Model "${model}" temporarily at capacity or busy. Retrying/falling back...`);
        await new Promise((res) => setTimeout(res, (attempt + 1) * 800));
      }
    }
  }

  throw lastErr;
}

// -------------------------------------------------------------
// POST /api/analyze-speech
// -------------------------------------------------------------
app.post('/api/analyze-speech', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/analyze-speech`);

  try {
    const {
      audioBase64,
      mimeType = 'audio/webm',
      durationSeconds = 0,
      exerciseType = 'general',
      targetText = '',
      context = '',
      learnerGoals = [],
      targetAccent = 'General American English',
    } = req.body;

    // 1. Audio validation
    if (!audioBase64 || typeof audioBase64 !== 'string') {
      console.warn(`[SERVER WARN] Audio validation failed: Missing audioBase64 payload.`);
      return res.status(400).json({
        code: 'INVALID_AUDIO',
        error: 'No audio data was provided. Please record audio before analyzing.',
        stage: 'validation',
      });
    }

    const cleanBase64 = extractBase64Data(audioBase64);
    if (!cleanBase64) {
      console.warn(`[SERVER WARN] Audio validation failed: Empty base64 payload after cleaning.`);
      return res.status(400).json({
        code: 'INVALID_AUDIO',
        error: 'The audio payload appears to be empty or corrupted.',
        stage: 'validation',
      });
    }

    const audioBuffer = Buffer.from(cleanBase64, 'base64');
    if (audioBuffer.length === 0) {
      console.warn(`[SERVER WARN] Audio validation failed: Audio buffer length is 0 bytes.`);
      return res.status(400).json({
        code: 'INVALID_AUDIO',
        error: 'The recorded audio file contains 0 bytes of audio data.',
        stage: 'validation',
      });
    }

    // 15 MB payload limit
    if (audioBuffer.length > 15 * 1024 * 1024) {
      console.warn(`[SERVER WARN] Audio validation failed: Audio size ${audioBuffer.length} bytes exceeds 15 MB limit.`);
      return res.status(413).json({
        code: 'REQUEST_TOO_LARGE',
        error: 'Audio recording exceeds the maximum supported size (15 MB). Please record a shorter clip.',
        stage: 'validation',
      });
    }

    const cleanMimeType = (mimeType || 'audio/webm').split(';')[0].trim().toLowerCase();
    const supportedMimeTypes = [
      'audio/webm',
      'audio/wav',
      'audio/x-wav',
      'audio/mp3',
      'audio/mpeg',
      'audio/ogg',
      'audio/mp4',
      'audio/m4a',
      'audio/aac',
      'audio/flac',
    ];

    if (!supportedMimeTypes.includes(cleanMimeType)) {
      console.warn(`[SERVER WARN] Audio validation failed: Unsupported MIME type "${cleanMimeType}".`);
      return res.status(400).json({
        code: 'UNSUPPORTED_AUDIO_FORMAT',
        error: `Audio format "${cleanMimeType}" is not supported for speech analysis. Supported formats: webm, wav, mp3, ogg, mp4.`,
        stage: 'validation',
      });
    }

    console.log(
      `[SERVER LOG] Audio validation completed. Format: ${cleanMimeType}, Size: ${audioBuffer.length} bytes (${(
        audioBuffer.length / 1024
      ).toFixed(1)} KB), Duration: ${durationSeconds}s`
    );

    // 2. Gemini Client Request
    const ai = getGeminiClient();

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

    const requestedModel = req.body.selectedGeminiModel || req.body.selectedModel || req.body.model || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    console.log(`[SERVER LOG] Gemini request started with model "${modelToUse}" (requested: "${requestedModel}")...`);
    const geminiStart = Date.now();

    const analysisSchema = {
      type: Type.OBJECT,
      properties: {
        transcript: {
          type: Type.STRING,
          description: 'Verbatim transcript preserving all fillers, stutters, and repetitions.',
        },
        summary: {
          type: Type.STRING,
          description: 'Executive 2-3 sentence overview of this speech performance.',
        },
        metrics: {
          type: Type.OBJECT,
          properties: {
            estimatedWpm: { type: Type.NUMBER, description: 'Words per minute estimated' },
            fillerCount: { type: Type.INTEGER, description: 'Total count of detected fillers' },
            detectedFillers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of specific fillers used (e.g. um, uh, like)',
            },
            clarityScore: { type: Type.NUMBER, description: 'Score out of 100 for articulation & clarity' },
            pronunciationScore: { type: Type.NUMBER, description: 'Score out of 100 for GenAm accuracy' },
            pacingScore: { type: Type.NUMBER, description: 'Score out of 100 for rhythm & pacing' },
            fluencyScore: { type: Type.NUMBER, description: 'Score out of 100 for smoothness & filler control' },
          },
          required: ['estimatedWpm', 'fillerCount', 'clarityScore', 'pronunciationScore', 'pacingScore', 'fluencyScore'],
        },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: 'One of: pronunciation, fluency, delivery, expression',
              },
              issue: { type: Type.STRING, description: 'Concise title of the observed issue' },
              evidence: { type: Type.STRING, description: 'Verbatim phrase or sound heard in recording' },
              explanation: { type: Type.STRING, description: 'Why this matters in natural American English' },
              suggestedCorrection: { type: Type.STRING, description: 'How to pronounce or express it naturally' },
              targetedExercise: { type: Type.STRING, description: 'Recommended drill to practice right away' },
              confidence: { type: Type.STRING, description: 'high, medium, or preliminary' },
            },
            required: ['category', 'issue', 'evidence', 'explanation', 'suggestedCorrection', 'targetedExercise'],
          },
        },
        strengths: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Specific positive observations supported by the audio.',
        },
        priorityAreas: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Top 2-3 highest-leverage improvement priorities.',
        },
        nextExercises: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Recommended follow-up exercises to do right now.',
        },
        limitations: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Any caveats regarding audio length or dimensions needing more evidence.',
        },
      },
      required: [
        'transcript',
        'summary',
        'metrics',
        'findings',
        'strengths',
        'priorityAreas',
        'nextExercises',
      ],
    };

    let response: any;
    try {
      response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
        ai.models.generateContent({
          model: targetModel,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: cleanMimeType,
                  data: cleanBase64,
                },
              },
              {
                text: userPromptText,
              },
            ],
          },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: analysisSchema,
          },
        })
      );
    } catch (primaryError: any) {
      console.error(`[SERVER ERROR] Speech analysis failed with model "${modelToUse}":`, primaryError?.message);
      const isDemandError = primaryError?.message?.includes('503') || primaryError?.message?.includes('demand');
      const errorMessage = isDemandError
        ? `The selected model (${modelToUse}) is currently experiencing high demand (503). Please select another model in Settings or try again.`
        : `Speech analysis failed with model (${modelToUse}): ${primaryError?.message || 'Unknown error'}`;

      return res.status(503).json({
        code: 'GEMINI_MODEL_ERROR',
        error: errorMessage,
        modelAttempted: modelToUse,
        details: primaryError?.message,
      });
    }

    const geminiDuration = Date.now() - geminiStart;
    console.log(`[SERVER LOG] Gemini response received in ${geminiDuration} ms.`);

    // 3. Response parsing
    const textOutput = response.text?.trim() || '';
    if (!textOutput) {
      console.error(`[SERVER ERROR] Gemini returned empty response text.`);
      return res.status(502).json({
        code: 'INVALID_MODEL_RESPONSE',
        error: 'The AI model generated an empty response. Please try speaking again.',
        stage: 'model_parsing',
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(textOutput);
      console.log(`[SERVER LOG] Response JSON parsing completed successfully.`);
    } catch (parseErr: any) {
      console.error(`[SERVER ERROR] Failed to parse model JSON:`, parseErr);
      return res.status(502).json({
        code: 'INVALID_MODEL_RESPONSE',
        error: 'The AI model returned an invalid JSON response structure.',
        stage: 'model_parsing',
      });
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[SERVER LOG] Request completed successfully in ${totalDuration} ms total.`);

    return res.json(parsed);
  } catch (error: any) {
    const totalDuration = Date.now() - startTime;
    console.error(`[SERVER ERROR] Speech analysis failed after ${totalDuration} ms:`, error);

    const errMsg = error?.message || '';

    // Classify error type
    if (errMsg.includes('API_KEY') || errMsg.includes('401') || errMsg.includes('403') || errMsg.includes('unauthorized')) {
      return res.status(401).json({
        code: 'GEMINI_AUTH_ERROR',
        error: 'Authentication error with speech coaching service. Please verify server secret config.',
        stage: 'gemini_api',
      });
    }

    if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('quota')) {
      return res.status(429).json({
        code: 'GEMINI_QUOTA_ERROR',
        error: 'Speech analysis service rate limit reached. Please wait 10 seconds and try again.',
        stage: 'gemini_api',
      });
    }

    if (errMsg.includes('503') || errMsg.includes('UNAVAILABLE') || errMsg.includes('overloaded')) {
      return res.status(503).json({
        code: 'GEMINI_SERVICE_ERROR',
        error: 'Speech coaching AI service is temporarily busy. Please try again shortly.',
        stage: 'gemini_api',
      });
    }

    return res.status(500).json({
      code: 'UNEXPECTED_SERVER_ERROR',
      error: 'An unexpected error occurred during audio processing.',
      details: errMsg,
      stage: 'processing',
    });
  }
});

// Server-side in-memory cache for TTS reference audio
const ttsCache = new Map<string, { audioBase64: string; mimeType: string }>();

// -------------------------------------------------------------
// POST /api/tts-reference
// Generates native American English audio model using Gemini TTS
// -------------------------------------------------------------
app.post('/api/tts-reference', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] Request received: POST /api/tts-reference`);

  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        code: 'INVALID_INPUT',
        error: 'Text parameter is required for speech synthesis.',
      });
    }

    const cleanText = text.trim();
    const cacheKey = cleanText.toLowerCase();

    // Check server-side cache
    if (ttsCache.has(cacheKey)) {
      console.log(`[SERVER LOG] Serving TTS from server cache (${Date.now() - startTime} ms).`);
      return res.json(ttsCache.get(cacheKey)!);
    }

    const ai = getGeminiClient();
    const promptMessage = cleanText;

    let response: any;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: promptMessage,
                speechMetadata: {
                  style: 'Clear, authentic General American accent pronunciation reference model',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
    } catch (primaryError: any) {
      console.log(`[SERVER LOG] TTS model call encountered: ${primaryError?.message}. Falling back to browser speech synthesis.`);
    }

    let audioData: string | null = null;
    let mimeType = 'audio/wav';

    const candidates = response?.candidates || [];
    for (const candidate of candidates) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData?.data) {
          audioData = part.inlineData.data;
          mimeType = part.inlineData.mimeType || 'audio/wav';
          break;
        }
      }
      if (audioData) break;
    }

    if (!audioData) {
      console.log(`[SERVER LOG] TTS model generated text only or was unavailable. Triggering browser fallback.`);
      return res.status(200).json({
        fallback: true,
        message: 'TTS model generated text only or was unavailable; triggering browser speech synthesis fallback.',
      });
    }

    const resultPayload = {
      audioBase64: `data:${mimeType};base64,${audioData}`,
      mimeType,
    };

    // Cache up to 100 entries
    if (ttsCache.size > 100) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, resultPayload);

    console.log(`[SERVER LOG] TTS reference generated successfully in ${Date.now() - startTime} ms.`);
    return res.json(resultPayload);
  } catch (error: any) {
    console.log(`[SERVER LOG] Gemini TTS model rate-limited or unavailable. Triggering native speech fallback.`);
    return res.status(200).json({
      fallback: true,
      message: 'Gemini TTS model rate-limited; triggering client browser speech synthesis fallback.',
    });
  }
});

// -------------------------------------------------------------
// POST /api/conversation-reply
// Interactive dialogue coaching
// -------------------------------------------------------------
app.post('/api/conversation-reply', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] Request received: POST /api/conversation-reply`);

  try {
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
    } = req.body;

    const ai = getGeminiClient();

    const objectiveInstruction = practiceObjective
      ? `\nUser's Practice Objective for this session: "${practiceObjective}". Keep this objective in mind to create natural opportunities for the user to practice this skill, without making it feel artificial.`
      : '';

    let systemInstruction = '';
    if (mode === 'roleplay') {
      const genderInstruction =
        partnerGender === 'Male'
          ? 'The fictional roleplay partner must be consistently male, using male pronouns (he/him/his) and a distinct male identity throughout the conversation.'
          : partnerGender === 'Female'
          ? 'The fictional roleplay partner must be consistently female, using female pronouns (she/her/hers) and a distinct female identity throughout the conversation.'
          : 'Choose a suitable male or female character for this scenario and maintain that character’s gender and identity consistently throughout the session.';

      systemInstruction = `You are playing the fictional character in an immersive conversational roleplay scenario titled "${scenarioTitle || 'Romantic Scenario'}".
Scenario context: "${scenarioPrompt || 'Engage in natural spontaneous dialogue.'}"
Tone style: "${toneStyle}". Flirtation/intensity level: "${flirtationLevel}".
Partner Gender requirement: ${genderInstruction}${objectiveInstruction}

CRITICAL RULES FOR HIGH-REALISM IMMERSIVE ROLEPLAY:
1. Stay 100% in character as the fictional person described in the scenario. NEVER break character, never mention you are an AI, never give coaching or meta-commentary.
2. Respond specifically and organically to what the user actually said. Remember details from earlier turns, ask natural follow-up questions, and react dynamically to witty, awkward, or thoughtful remarks.
3. Vary your conversational rhythm and sentence length: sometimes give a brief, punchy reaction or a witty one-liner; sometimes elaborate with a 2-3 sentence thought; occasionally change the subject naturally or challenge the user playfully. Do NOT automatically agree with everything the user says.
4. Maintain realistic emotional dynamics: allow playful friction, curiosity, dry wit, hesitation, or subtle tension where appropriate.
5. Keep dialogue natural, spoken, using contractions and American idioms. Keep coachingFeedback strictly empty ([]).`;
    } else if (mode === 'coach') {
      systemInstruction = `You are an expert American English communication and dating coach specializing in social calibration, subtext, flirting, and intimate conversation.
The user is practicing a scenario titled: "${scenarioTitle}". Setup: "${scenarioPrompt}".
Your job:
1. Transcribe the user's audio accurately in learnerTranscript.
2. Provide 1-2 sharp, actionable coaching notes on natural American phrasing, tone, subtext, timing, and alternative bolder/softer phrasings in coachingFeedback.
3. Respond as a supportive coach in coachResponseText.`;
    } else {
      systemInstruction = `You are Alex, an engaging, supportive American executive speech and communication coach.
You are running a conversational practice session titled: "${scenarioTitle || 'Everyday Speaking'}".
Scenario setup: "${scenarioPrompt || 'Engage in natural spontaneous dialogue.'}"

You will receive either the user's latest audio recording or their transcript, plus the conversation history.
Your job:
1. Provide a verbatim transcription of what they said (if audio is provided).
2. Give 1-2 sharp, encouraging, actionable speech coaching pointers on their delivery (e.g., filler words, word choice, American linking, or sentence structure).
3. Respond naturally as the conversation partner to keep the conversation flowing.
4. Ask an engaging follow-up question or advance the scenario.`;
    }

    const contents: any[] = [];

    let historyContext = conversationHistory
      .slice(-6)
      .map((t: any) => `${t.role === 'coach' ? 'Coach (Alex)' : 'Learner'}: ${t.text}`)
      .join('\n');

    const promptText = `Previous context:\n${historyContext}\n\nLatest learner turn:\n${latestUserTranscript ? `Learner Transcript: "${latestUserTranscript}"` : 'Please transcribe the attached audio and respond.'}`;

    if (latestUserAudioBase64) {
      const cleanBase64 = extractBase64Data(latestUserAudioBase64);
      if (cleanBase64) {
        contents.push({
          inlineData: {
            mimeType: 'audio/webm',
            data: cleanBase64,
          },
        });
      }
    }
    contents.push({ text: promptText });

    let response: any;
    const conversationSchema = {
      type: Type.OBJECT,
      properties: {
        learnerTranscript: { type: Type.STRING, description: 'Verbatim transcription of learner input' },
        coachingFeedback: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '1 or 2 specific coaching notes on speech delivery or expression',
        },
        coachResponseText: {
          type: Type.STRING,
          description: 'Natural conversational response to the learner, advancing the topic',
        },
        suggestedNextQuestion: {
          type: Type.STRING,
          description: 'Guiding follow-up prompt to encourage more speaking',
        },
      },
      required: ['learnerTranscript', 'coachingFeedback', 'coachResponseText', 'suggestedNextQuestion'],
    };

    const requestedModel = req.body.selectedGeminiModel || req.body.selectedModel || req.body.model || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    try {
      response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
        ai.models.generateContent({
          model: targetModel,
          contents: { parts: contents },
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: conversationSchema,
          },
        })
      );
    } catch (primErr: any) {
      console.error(`[SERVER ERROR] Conversation reply call failed with model "${modelToUse}":`, primErr?.message);
      const isDemandError = primErr?.message?.includes('503') || primErr?.message?.includes('demand');
      const errorMessage = isDemandError
        ? `The selected model (${modelToUse}) is currently experiencing high demand (503). Please select another model in Settings or try again.`
        : `Conversation coaching failed with model (${modelToUse}): ${primErr?.message || 'Unknown error'}`;

      return res.status(503).json({
        code: 'GEMINI_MODEL_ERROR',
        error: errorMessage,
        modelAttempted: modelToUse,
        details: primErr?.message,
      });
    }

    const parsed = JSON.parse(response.text?.trim() || '{}');
    console.log(`[SERVER LOG] Conversation reply completed in ${Date.now() - startTime} ms.`);
    return res.json(parsed);
  } catch (error: any) {
    console.error(`[SERVER ERROR] Conversation reply failed:`, error);
    return res.status(500).json({
      code: 'CONVERSATION_ERROR',
      error: 'Failed to process conversation round.',
      details: error?.message,
    });
  }
});

// -------------------------------------------------------------
// POST /api/generate-vocab-lesson
// -------------------------------------------------------------
app.post('/api/generate-vocab-lesson', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/generate-vocab-lesson`);

  try {
    const {
      wordId,
      word,
      partOfSpeech = 'noun',
      definition = '',
      difficulty = 'Advanced',
      topicTags = [],
      rootId = '',
    } = req.body;

    if (!word || typeof word !== 'string') {
      return res.status(400).json({
        code: 'INVALID_WORD',
        error: 'Word parameter is required for lesson generation.',
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a world-class lexicographer, etymologist, and speech coach specializing in English vocabulary acquisition for high-impact communication.
Your task is to generate a comprehensive, highly pedagogical vocabulary lesson for the requested word.

Provide:
1. Pronunciation: IPA, syllable breakdown, primary stress, and natural American English pronunciation notes.
2. Meaning: precise primary definition, secondary sense if applicable, and clear examples.
3. Word Origins: verified language of origin, historical root development, original literal meaning, and modern conceptual connection.
4. Synonyms & Antonyms: at least 3-4 synonyms with nuanced distinctions (intensity, formality, or connotation).
5. Nuanced Contrast / Distinction: compare the target word against 1-2 near-synonyms or easily confused terms with preferred contexts and common mistakes.
6. Collocations & Usage: common verbs, modifiers, prepositions, idiomatic frames, and natural vs awkward contrasts.
7. Morphology: base root and 2-4 derived morphological word forms with POS, definition, example, and stress shift note if applicable.
8. Memory Aids: mnemonics or root breakdown.
9. Practical Examples: exactly 5 varied, high-quality example sentences across Professional/Workplace, Academic & Essay, Journalism & Commentary, Everyday Intellectual, Literature & Rhetoric.
10. Self-Check Quiz: 1 multiple-choice question testing precise context usage or distinction, with 4 options, correctIndex (0-3), and explanation.`;

    const promptText = `Generate a full, structured vocabulary lesson for:
Headword: "${word}"
Part of speech: "${partOfSpeech}"
Catalogue definition: "${definition}"
Target Difficulty: "${difficulty}"
Topic Domains: ${JSON.stringify(topicTags)}
Root ID: "${rootId || 'none'}"
Word ID: "${wordId || 'lesson-' + word.toLowerCase().replace(/[^a-z0-0]+/g, '-')}"`;

    const lessonSchema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        word: { type: Type.STRING },
        partOfSpeech: { type: Type.STRING },
        syllables: { type: Type.STRING },
        phoneticIpa: { type: Type.STRING },
        stressPattern: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        register: { type: Type.STRING },
        frequency: { type: Type.STRING },
        shortGloss: { type: Type.STRING },
        definitions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              definition: { type: Type.STRING },
              isPrimary: { type: Type.BOOLEAN },
              contextNote: { type: Type.STRING },
              example: { type: Type.STRING },
            },
            required: ['definition', 'isPrimary', 'example'],
          },
        },
        etymology: {
          type: Type.OBJECT,
          properties: {
            languageOfOrigin: { type: Type.STRING },
            historicalDevelopment: { type: Type.STRING },
            rootId: { type: Type.STRING },
            rootName: { type: Type.STRING },
            literalOriginalMeaning: { type: Type.STRING },
            modernConnection: { type: Type.STRING },
            disputedOrUncertain: { type: Type.STRING },
          },
          required: [
            'languageOfOrigin',
            'historicalDevelopment',
            'rootId',
            'rootName',
            'literalOriginalMeaning',
            'modernConnection',
          ],
        },
        synonyms: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              nuance: { type: Type.STRING },
            },
            required: ['word', 'nuance'],
          },
        },
        antonyms: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        distinctions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              alternativeWord: { type: Type.STRING },
              centralDifference: { type: Type.STRING },
              targetPreferredWhen: { type: Type.STRING },
              alternativePreferredWhen: { type: Type.STRING },
              commonMistake: { type: Type.STRING },
              targetExample: { type: Type.STRING },
              alternativeExample: { type: Type.STRING },
            },
            required: [
              'alternativeWord',
              'centralDifference',
              'targetPreferredWhen',
              'alternativePreferredWhen',
              'commonMistake',
              'targetExample',
              'alternativeExample',
            ],
          },
        },
        collocations: {
          type: Type.OBJECT,
          properties: {
            verbs: { type: Type.ARRAY, items: { type: Type.STRING } },
            modifiers: { type: Type.ARRAY, items: { type: Type.STRING } },
            prepositions: { type: Type.ARRAY, items: { type: Type.STRING } },
            idiomaticFrames: { type: Type.ARRAY, items: { type: Type.STRING } },
            contrasts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  natural: { type: Type.STRING },
                  awkward: { type: Type.STRING },
                },
                required: ['natural', 'awkward'],
              },
            },
          },
          required: ['verbs', 'modifiers', 'prepositions', 'idiomaticFrames', 'contrasts'],
        },
        morphology: {
          type: Type.OBJECT,
          properties: {
            baseRoot: { type: Type.STRING },
            forms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  form: { type: Type.STRING },
                  partOfSpeech: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  example: { type: Type.STRING },
                  stressShiftNote: { type: Type.STRING },
                },
                required: ['form', 'partOfSpeech', 'definition', 'example'],
              },
            },
          },
          required: ['baseRoot', 'forms'],
        },
        memoryAids: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              technique: { type: Type.STRING },
              explanation: { type: Type.STRING },
              isEtymological: { type: Type.BOOLEAN },
            },
            required: ['technique', 'explanation', 'isEtymological'],
          },
        },
        practicalExamples: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              domain: { type: Type.STRING },
              sentence: { type: Type.STRING },
            },
            required: ['domain', 'sentence'],
          },
        },
        selfCheck: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            prompt: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            type: { type: Type.STRING },
          },
          required: ['id', 'prompt', 'options', 'correctIndex', 'explanation', 'type'],
        },
        cluster: { type: Type.STRING },
        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: [
        'id',
        'word',
        'partOfSpeech',
        'syllables',
        'phoneticIpa',
        'stressPattern',
        'difficulty',
        'register',
        'frequency',
        'shortGloss',
        'definitions',
        'etymology',
        'synonyms',
        'antonyms',
        'distinctions',
        'collocations',
        'morphology',
        'memoryAids',
        'practicalExamples',
        'selfCheck',
        'cluster',
        'tags',
      ],
    };

    const requestedModel = req.body.selectedGeminiModel || req.body.selectedModel || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: lessonSchema,
        },
      })
    );

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (!parsed.id) parsed.id = wordId || `lesson-${word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    if (!parsed.word) parsed.word = word;

    console.log(`[SERVER LOG] Lesson generation for "${word}" completed in ${Date.now() - startTime} ms.`);
    return res.json(parsed);
  } catch (error: any) {
    console.error(`[SERVER ERROR] Lesson generation failed:`, error);
    return res.status(500).json({
      code: 'LESSON_GENERATION_ERROR',
      error: 'Failed to generate vocabulary lesson using AI.',
      details: error?.message,
    });
  }
});

// -------------------------------------------------------------
// POST /api/generate-root-enrichment
// -------------------------------------------------------------
app.post('/api/generate-root-enrichment', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/generate-root-enrichment`);

  try {
    const { wordOrRoot } = req.body;
    if (!wordOrRoot || typeof wordOrRoot !== 'string') {
      return res.status(400).json({ code: 'INVALID_INPUT', error: 'wordOrRoot parameter is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a master etymologist and linguist specializing in Latin, Greek, Germanic, and Old French roots and affixes.
Generate a structured, authentic Root or Affix breakdown for the requested term.`;

    const promptText = `Generate a complete etymological root record for "${wordOrRoot}". Include origin, original form, meaning, type (root, prefix, or suffix), historical insight, semantic shift note, and exactly 5 verified derived example words with POS, definition, and root contribution.`;

    const rootSchema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        root: { type: Type.STRING },
        type: { type: Type.STRING },
        origin: { type: Type.STRING },
        originalForm: { type: Type.STRING },
        meaning: { type: Type.STRING },
        variants: { type: Type.ARRAY, items: { type: Type.STRING } },
        pronunciationOrCombining: { type: Type.STRING },
        thematicCluster: { type: Type.STRING },
        anchorWord: { type: Type.STRING },
        historicalInsight: { type: Type.STRING },
        semanticShiftNote: { type: Type.STRING },
        derivedWordsList: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              pos: { type: Type.STRING },
              briefDefinition: { type: Type.STRING },
              rootContribution: { type: Type.STRING },
            },
            required: ['word', 'pos', 'briefDefinition'],
          },
        },
      },
      required: [
        'id',
        'root',
        'type',
        'origin',
        'meaning',
        'pronunciationOrCombining',
        'thematicCluster',
        'anchorWord',
        'historicalInsight',
        'derivedWordsList',
      ],
    };

    const requestedModel = req.body.selectedGeminiModel || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: rootSchema,
        },
      })
    );

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (!parsed.id) parsed.id = `gen-root-${wordOrRoot.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    console.log(`[SERVER LOG] Root enrichment for "${wordOrRoot}" completed in ${Date.now() - startTime} ms.`);
    return res.json(parsed);
  } catch (error: any) {
    console.error(`[SERVER ERROR] Root enrichment failed:`, error);
    return res.status(500).json({ code: 'ROOT_GENERATION_ERROR', error: 'Failed to generate root enrichment.' });
  }
});

// -------------------------------------------------------------
// POST /api/generate-family-enrichment
// -------------------------------------------------------------
app.post('/api/generate-family-enrichment', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/generate-family-enrichment`);

  try {
    const { word } = req.body;
    if (!word || typeof word !== 'string') {
      return res.status(400).json({ code: 'INVALID_INPUT', error: 'word parameter is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are an expert morphological linguist and lexicographer.
Generate a structured 4-part Word Family Matrix (Noun, Verb, Adjective, Adverb where they genuinely exist) for the requested word. Do NOT invent non-existent word forms.`;

    const promptText = `Generate a complete Word Family Matrix for headword "${word}". Include base stem, thematic cluster, suffix patterns note, usage distinctions, common mistakes, and derived forms with POS, definition, IPA, stress note, and natural example sentence.`;

    const familySchema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        familyHeadword: { type: Type.STRING },
        baseStem: { type: Type.STRING },
        cluster: { type: Type.STRING },
        suffixPatternsNote: { type: Type.STRING },
        distinctionsAndMistakes: {
          type: Type.OBJECT,
          properties: {
            nearSynonymOrForm: { type: Type.STRING },
            keyDifference: { type: Type.STRING },
            commonMistake: { type: Type.STRING },
            collocationNote: { type: Type.STRING },
          },
        },
        linkedCatalogueIds: { type: Type.ARRAY, items: { type: Type.STRING } },
        forms: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              partOfSpeech: { type: Type.STRING },
              definition: { type: Type.STRING },
              phoneticIpa: { type: Type.STRING },
              stressShiftNote: { type: Type.STRING },
              example: { type: Type.STRING },
            },
            required: ['word', 'partOfSpeech', 'definition', 'example'],
          },
        },
      },
      required: ['id', 'familyHeadword', 'baseStem', 'cluster', 'suffixPatternsNote', 'forms'],
    };

    const requestedModel = req.body.selectedGeminiModel || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: familySchema,
        },
      })
    );

    const parsed = JSON.parse(response.text?.trim() || '{}');
    if (!parsed.id) parsed.id = `gen-family-${word.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    console.log(`[SERVER LOG] Word family enrichment for "${word}" completed in ${Date.now() - startTime} ms.`);
    return res.json(parsed);
  } catch (error: any) {
    console.error(`[SERVER ERROR] Family enrichment failed:`, error);
    return res.status(500).json({ code: 'FAMILY_GENERATION_ERROR', error: 'Failed to generate word family enrichment.' });
  }
});

// -------------------------------------------------------------
// POST /api/generate-curriculum-lessons
// -------------------------------------------------------------
app.post('/api/generate-curriculum-lessons', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/generate-curriculum-lessons`);
  try {
    const {
      categoryId = 'banter',
      categoryName = 'Playful Banter & Teasing',
      count = 4,
      selectedGeminiModel = DEFAULT_GEMINI_MODEL_ID,
    } = req.body;

    const ai = getGeminiClient();
    const modelToUse = resolveApiModelId(selectedGeminiModel);

    const systemInstruction = `You are an expert speech coach and curriculum developer specializing in American English social chemistry, romantic nuance, and artful flirting.
Generate a JSON array of curriculum lessons for category "${categoryName}".
Return valid JSON matching this schema:
[
  {
    "id": "string",
    "categoryId": "string",
    "categoryName": "string",
    "title": "string",
    "phrase": "string",
    "meaning": "string",
    "context": "string",
    "tone": "Playful",
    "intimacyLevel": "Casual / Acquaintance",
    "exampleDialogue": [
      { "speaker": "Partner", "text": "string" },
      { "speaker": "You", "text": "string" }
    ],
    "possibleResponses": ["string"],
    "commonMistakes": "string",
    "alternativePhrasings": [
      { "style": "string", "phrasing": "string" }
    ],
    "speakingChallenge": "string"
  }
]`;

    const promptText = `Generate ${count} distinct, high-quality flirting and conversation lessons for category "${categoryName}".`;

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.85,
        },
      })
    );

    const text = response.text ? response.text.trim() : '[]';
    let lessons = [];
    try {
      lessons = JSON.parse(text);
      if (!Array.isArray(lessons)) {
        lessons = [lessons];
      }
    } catch {
      lessons = [
        {
          id: `ai-lesson-${Date.now()}-1`,
          categoryId,
          categoryName,
          title: 'The Artful Pivot',
          phrase: 'You have a fascinating way of looking at things. Tell me more about that perspective.',
          meaning: 'A warm conversational pivot that validates the speaker and deepens engagement.',
          context: 'When transitioning from small talk to a more personal topic.',
          tone: 'Warm',
          intimacyLevel: 'Dating / Mutual Interest',
          exampleDialogue: [
            { speaker: 'Partner', text: 'I spend way too much time restoring antique watches.' },
            { speaker: 'You', text: 'You have a fascinating way of looking at things. Tell me more about that perspective.' },
            { speaker: 'Partner', text: '(Smiles) Not many people appreciate mechanical patience.' }
          ],
          possibleResponses: ['Patience is a lost art.', 'Show me how it works sometime.'],
          commonMistakes: 'Interrupting before they can explain.',
          alternativePhrasings: [{ style: 'Curious', phrasing: 'That is quite rare. What drew you to it?' }],
          speakingChallenge: 'Speak with genuine curiosity and warm vocal tone.'
        }
      ];
    }

    lessons = lessons.map((l: any, idx: number) => ({
      ...l,
      id: `ai-lesson-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      categoryId: l.categoryId || categoryId,
      categoryName: l.categoryName || categoryName,
    }));

    console.log(`[SERVER LOG] Curriculum lessons generated in ${Date.now() - startTime} ms.`);
    return res.json({ lessons });
  } catch (error: any) {
    console.error(`[SERVER ERROR] Curriculum lesson generation failed:`, error);
    return res.status(500).json({ code: 'CURRICULUM_GENERATION_ERROR', error: 'Failed to generate curriculum lessons.' });
  }
});

// -------------------------------------------------------------
// POST /api/generate-compliment-collection
// -------------------------------------------------------------
app.post('/api/generate-compliment-collection', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] [${new Date().toISOString()}] Request received: POST /api/generate-compliment-collection`);
  try {
    const {
      theme = 'Wit & Banter',
      tone = 'Playful & Sophisticated',
      targetAudience = 'First Date / Romantic Interest',
      count = 8,
      selectedGeminiModel = DEFAULT_GEMINI_MODEL_ID,
    } = req.body;

    const ai = getGeminiClient();
    const modelToUse = resolveApiModelId(selectedGeminiModel);

    const systemInstruction = `You are a master speech coach and expert in American English social chemistry, romantic nuance, and artful compliments.
Generate a JSON collection of original, sophisticated, observant, and high-impact American English compliments based on the user's theme, tone, and audience.
Do NOT output cliché pickup lines or generic appearance praise. Focus on specific observations, subtle appreciation, wit, charm, and emotional intelligence.

Return valid JSON matching this schema:
{
  "collectionTitle": "string",
  "theme": "string",
  "compliments": [
    {
      "id": "string",
      "phrase": "string",
      "category": "string",
      "subtletyScore": number,
      "vocabularyHighlight": "string",
      "deliveryNotes": "string",
      "contextFit": "string"
    }
  ]
}`;

    const promptText = `Generate ${count} original compliments for:
Theme: "${theme}"
Tone: "${tone}"
Target Audience: "${targetAudience}"`;

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.8,
        },
      })
    );

    const text = response.text ? response.text.trim() : '{}';
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        collectionTitle: `${theme} Collection`,
        theme,
        compliments: [
          {
            id: 'comp-1',
            phrase: 'I love how effortlessly you pull humor out of ordinary moments—it is genuinely refreshing.',
            category: 'Personality & Character',
            subtletyScore: 8,
            vocabularyHighlight: 'effortlessly',
            deliveryNotes: 'Deliver with a warm, genuine smile and relaxed eye contact.',
            contextFit: 'Great for a casual coffee date or relaxed evening conversation.',
          },
          {
            id: 'comp-2',
            phrase: 'There is a sharp curiosity in the way you listen; you notice details most people miss completely.',
            category: 'Charm & Presence',
            subtletyScore: 9,
            vocabularyHighlight: 'curiosity',
            deliveryNotes: 'Spoken calmly and deliberately after they finish explaining an idea.',
            contextFit: 'Ideal for deep conversations or intellectual chemistry.',
          },
        ],
      };
    }

    console.log(`[SERVER LOG] Compliment collection generation completed in ${Date.now() - startTime} ms.`);
    return res.json(data);
  } catch (error: any) {
    console.error(`[SERVER ERROR] Compliment collection generation failed:`, error);
    return res.status(500).json({ code: 'COMPLIMENT_GENERATION_ERROR', error: 'Failed to generate compliment collection.' });
  }
});

// -------------------------------------------------------------
// POST /api/analyze-conversation-patterns
// Conversation intelligence & naturalness evaluation
// -------------------------------------------------------------
app.post('/api/analyze-conversation-patterns', async (req, res) => {
  const startTime = Date.now();
  console.log(`[SERVER LOG] Request received: POST /api/analyze-conversation-patterns`);

  try {
    const { sessions = [] } = req.body;
    const ai = getGeminiClient();

    const transcriptTexts = sessions
      .filter((s: any) => s.category === 'conversation' || s.category === 'flirting')
      .map((s: any) => `Session Title: "${s.title}"\nTranscript/Summary: "${s.transcript || s.summary || ''}"`)
      .slice(-10)
      .join('\n\n');

    if (!transcriptTexts || transcriptTexts.length < 15) {
      return res.json({
        patterns: [],
        insufficientEvidence: 'Insufficient conversation history to reliably detect recurring patterns. Complete at least 2-3 conversation sessions to unlock AI conversation intelligence insights.',
      });
    }

    const systemInstruction = `You are an expert American English conversation and naturalness analyst.
Analyze the provided conversation session transcripts and identify 2-4 recurring patterns in the user's conversational style (e.g., overusing certain expressions, answering too briefly, asking too few follow-up questions, sounding overly formal, using hedging, etc.).
Distinguish transcript-based observations (phrasing, vocabulary, repetition, turn-taking, follow-up questions) from audio/delivery observations.
Do not manufacture numerical scores or proficiency levels. Provide concrete evidence examples.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        patterns: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              patternName: { type: Type.STRING },
              explanation: { type: Type.STRING },
              examples: { type: Type.ARRAY, items: { type: Type.STRING } },
              whyItMatters: { type: Type.STRING },
              confidence: { type: Type.STRING, enum: ['High', 'Medium', 'Preliminary'] },
              trend: { type: Type.STRING, enum: ['Improving', 'Stable', 'Frequent', 'Insufficient Data'] },
              recommendedExercise: { type: Type.STRING },
            },
            required: ['patternName', 'explanation', 'examples', 'whyItMatters', 'confidence', 'trend', 'recommendedExercise'],
          },
        },
        insufficientEvidence: { type: Type.STRING },
      },
      required: ['patterns'],
    };

    const requestedModel = req.body.selectedGeminiModel || DEFAULT_GEMINI_MODEL_ID;
    const modelToUse = resolveApiModelId(requestedModel);

    const response = await callGeminiWithRetryAndFallback(modelToUse, (targetModel) =>
      ai.models.generateContent({
        model: targetModel,
        contents: {
          parts: [{ text: `Analyze these user conversation practice transcripts for recurring naturalness patterns:\n\n${transcriptTexts}` }],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      })
    );

    const result = JSON.parse(response.text || '{}');
    console.log(`[SERVER LOG] Conversation pattern analysis completed in ${Date.now() - startTime} ms.`);
    return res.json(result);
  } catch (err: any) {
    console.error('[SERVER ERROR] /api/analyze-conversation-patterns failed:', err?.message);
    return res.status(500).json({ error: err?.message || 'Failed to analyze conversation patterns.' });
  }
});

// Catch-all for any unmatched /api/* requests to ensure JSON 404 is returned instead of HTML index.html
app.use('/api/*', (req, res) => {
  console.warn(`[SERVER WARN] Unmatched API route requested: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    code: 'API_NOT_FOUND',
    error: `API endpoint ${req.method} ${req.originalUrl} not found.`,
  });
});

// -------------------------------------------------------------
// Vite middleware mounting in development, or static serving in production
// -------------------------------------------------------------
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER LOG] SpeechCraft Studio server running on port ${PORT}`);
  });
}

setupServer();
