/**
 * Cloudflare Pages Function: /api/tts-reference
 * Serverless handler for TTS audio reference synthesis using Gemini API on Cloudflare Pages Edge
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
        fallback: true,
        error: 'GEMINI_API_KEY environment variable is not configured in Cloudflare Pages settings.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json() as any;
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ code: 'INVALID_TEXT', fallback: true, error: 'Valid text is required for TTS synthesis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ttsModel = 'gemini-3.8-flash-lite-tts';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${env.GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Pronounce this phrase clearly in authentic General American English: "${text}"`,
              speechMetadata: { style: 'Clear articulate General American accent coach' },
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    };

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      return new Response(
        JSON.stringify({ fallback: true, error: `TTS request returned HTTP ${geminiRes.status}` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await geminiRes.json() as any;
    const audioBase64 = geminiData.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      return new Response(
        JSON.stringify({ fallback: true, error: 'No audio data returned from TTS model.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ audioBase64, mimeType: 'audio/wav', fallback: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ fallback: true, error: err?.message || 'TTS reference synthesis failed.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
