/**
 * Cloudflare Pages Function: /api/conversation-reply
 * Serverless handler for AI conversation coaching using Gemini API on Cloudflare Pages Edge
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
      scenarioTitle = 'Spontaneous Expression',
      scenarioPrompt = 'Engage in conversational practice.',
      conversationHistory = [],
      latestUserAudioBase64,
      latestUserTranscript,
      selectedGeminiModel = 'gemini-3.8-flash',
    } = body;

    const cleanModel = (selectedGeminiModel || 'gemini-3.8-flash').toLowerCase();
    const effectiveModel = cleanModel.includes('pro')
      ? 'gemini-3.1-pro-preview'
      : cleanModel.includes('lite')
      ? 'gemini-3.1-flash-lite'
      : 'gemini-3.8-flash';

    const systemInstruction = `You are an expert executive speech coach facilitating a real-time conversational scenario titled "${scenarioTitle}".
Scenario context: ${scenarioPrompt}

Your goals:
1. Provide a verbatim transcript of the user's latest turn if audio was provided.
2. Offer 1-2 actionable coaching notes on delivery, filler words, or word choice.
3. Respond naturally as a conversation partner to advance the scenario.
4. Suggest a follow-up prompt to keep the learner speaking.`;

    const parts: any[] = [];

    if (latestUserAudioBase64) {
      const cleanBase64 = latestUserAudioBase64.includes(',')
        ? latestUserAudioBase64.split(',')[1].trim()
        : latestUserAudioBase64.trim();
      parts.push({ inlineData: { mimeType: 'audio/webm', data: cleanBase64 } });
    }

    let promptText = `Scenario: ${scenarioTitle}\nPrompt: ${scenarioPrompt}\n`;
    if (conversationHistory.length > 0) {
      promptText += `\nConversation History:\n` + conversationHistory.map((turn: any) => `${turn.role}: ${turn.text}`).join('\n') + '\n';
    }
    if (latestUserTranscript) {
      promptText += `\nLearner latest text turn: "${latestUserTranscript}"`;
    }
    promptText += `\nProvide your coaching and response in the required JSON format.`;

    parts.push({ text: promptText });

    const conversationSchema = {
      type: "OBJECT",
      properties: {
        learnerTranscript: { type: "STRING" },
        coachingFeedback: { type: "ARRAY", items: { type: "STRING" } },
        coachResponseText: { type: "STRING" },
        suggestedNextQuestion: { type: "STRING" },
      },
      required: ["learnerTranscript", "coachingFeedback", "coachResponseText", "suggestedNextQuestion"],
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${effectiveModel}:generateContent?key=${env.GEMINI_API_KEY}`;

    const payload = {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: conversationSchema,
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
        JSON.stringify({ code: 'GEMINI_API_ERROR', error: `Gemini API error (HTTP ${geminiRes.status}): ${errText}` }),
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
      JSON.stringify({ code: 'SERVER_ERROR', error: err?.message || 'Conversation processing error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
