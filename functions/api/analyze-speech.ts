/**
 * Cloudflare Pages Function: /api/analyze-speech
 * Serverless handler for speech analysis using Gemini API on Cloudflare Pages Edge
 */

interface Env {
  GEMINI_API_KEY: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  if (!env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        code: 'MISSING_API_KEY',
        error: 'GEMINI_API_KEY environment variable is not configured in Cloudflare Pages settings.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json() as any;
    const {
      audioBase64,
      mimeType = 'audio/webm',
      durationSeconds,
      exerciseType = 'General Spoken Practice',
      targetText,
      context: promptContext,
      learnerGoals,
      targetAccent = 'General American English',
      selectedGeminiModel = 'gemini-3.8-flash',
    } = body;

    const cleanModel = (selectedGeminiModel || 'gemini-3.8-flash').toLowerCase();
    const effectiveModel = cleanModel.includes('pro')
      ? 'gemini-3.1-pro-preview'
      : cleanModel.includes('lite')
      ? 'gemini-3.1-flash-lite'
      : 'gemini-3.8-flash';

    if (!audioBase64) {
      return new Response(
        JSON.stringify({ code: 'MISSING_AUDIO', error: 'No audio recording payload provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clean base64 string
    const cleanBase64 = audioBase64.includes(',')
      ? audioBase64.split(',')[1].trim()
      : audioBase64.trim();

    const cleanMimeType = mimeType.split(';')[0].trim();

    const systemInstruction = `You are a world-class speech and dialect coach specializing in General American English (GenAm), articulation, natural rhythm, and executive verbal presence.
Your task is to analyze the learner's actual spoken audio recording.

Guidelines:
1. Provide a STRICT VERBATIM transcription of what was spoken. Include every filler sound ("um", "uh", "er", "ah", "like", "you know"), false start, repeated word, and audible pause.
2. Note that natural conversational speech contains occasional brief pauses; distinguish between thoughtful pauses and hesitant filler words.
3. Pronunciation & Accent Analysis: Compare against General American English standards (rhoticity, flap T [ɾ], vowel distinctions).
4. Fluency & Pacing: Count actual filler occurrences and estimate Words Per Minute (WPM).
5. Provide constructive, high-yield feedback.`;

    const userPromptText = `Analyze this spoken audio.
Exercise Type: ${exerciseType}
Target Accent: ${targetAccent}
${targetText ? `Target Text: "${targetText}"` : ''}
${promptContext ? `Context: ${promptContext}` : ''}
${learnerGoals?.length ? `Learner Goals: ${learnerGoals.join(', ')}` : ''}
Duration: ${durationSeconds ? Math.round(durationSeconds) + 's' : 'unspecified'}

Return your analysis strictly matching the required JSON schema.`;

    const analysisSchema = {
      type: "OBJECT",
      properties: {
        transcript: { type: "STRING" },
        summary: { type: "STRING" },
        metrics: {
          type: "OBJECT",
          properties: {
            estimatedWpm: { type: "NUMBER" },
            fillerCount: { type: "INTEGER" },
            detectedFillers: { type: "ARRAY", items: { type: "STRING" } },
            clarityScore: { type: "NUMBER" },
            pronunciationScore: { type: "NUMBER" },
            pacingScore: { type: "NUMBER" },
            fluencyScore: { type: "NUMBER" },
          },
          required: ["estimatedWpm", "fillerCount", "clarityScore", "pronunciationScore", "pacingScore", "fluencyScore"],
        },
        findings: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              category: { type: "STRING" },
              issue: { type: "STRING" },
              evidence: { type: "STRING" },
              explanation: { type: "STRING" },
              suggestedCorrection: { type: "STRING" },
              targetedExercise: { type: "STRING" },
              confidence: { type: "STRING" },
            },
            required: ["category", "issue", "evidence", "explanation", "suggestedCorrection", "targetedExercise"],
          },
        },
        strengths: { type: "ARRAY", items: { type: "STRING" } },
        priorityAreas: { type: "ARRAY", items: { type: "STRING" } },
        nextExercises: { type: "ARRAY", items: { type: "STRING" } },
        limitations: { type: "ARRAY", items: { type: "STRING" } },
      },
      required: ["transcript", "summary", "metrics", "findings", "strengths", "priorityAreas", "nextExercises"],
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${effectiveModel}:generateContent?key=${env.GEMINI_API_KEY}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          parts: [
            { inlineData: { mimeType: cleanMimeType, data: cleanBase64 } },
            { text: userPromptText },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    };

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({
          code: 'GEMINI_API_ERROR',
          error: `Gemini API request failed (HTTP ${geminiRes.status}): ${errText}`,
        }),
        { status: geminiRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiRes.json() as any;
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return new Response(
        JSON.stringify({ code: 'EMPTY_RESPONSE', error: 'Gemini model returned empty response.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const parsedResult = JSON.parse(rawText);
    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ code: 'SERVER_ERROR', error: err?.message || 'Speech analysis processing error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
