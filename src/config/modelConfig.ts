/**
 * Centralized Gemini Model Configuration for SpeechCraft Studio
 *
 * Defines display names, verified Gemini API model IDs,
 * availability status, supported multimodal capabilities, and default settings.
 */

export interface ModelCapability {
  supportsAudioInput: boolean;
  supportsStructuredJson: boolean;
  supportsSystemInstruction: boolean;
  notes?: string;
}

export interface GeminiModelOption {
  id: string; // Internal key matching the dropdown options
  displayName: string;
  apiModelId: string; // Actual verified Gemini API model identifier
  isDefault?: boolean;
  status: 'verified_available' | 'verified_unsupported_or_restricted' | 'unverified';
  description: string;
  capabilities: ModelCapability;
}

export const GEMINI_FLASH_MODELS: GeminiModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    displayName: 'Gemini 3.8 Flash',
    apiModelId: 'gemini-3.8-flash',
    isDefault: true,
    status: 'verified_available',
    description:
      'Ultra-fast, high-reliability multimodal model optimized for real-time speech analysis, low-latency scoring, conversation coaching, and curriculum generation.',
    capabilities: {
      supportsAudioInput: true,
      supportsStructuredJson: true,
      supportsSystemInstruction: true,
      notes: 'Recommended production model with multimodal audio input, structured JSON schemas, and fast response times (~1s).',
    },
  },
  {
    id: 'gemini-3.1-flash-lite',
    displayName: 'Gemini 3.1 Flash Lite',
    apiModelId: 'gemini-3.1-flash-lite',
    status: 'verified_available',
    description:
      'Ultra-lightweight, cost-efficient model offering exceptional speed and structured output support for rapid drills and lesson generation.',
    capabilities: {
      supportsAudioInput: false,
      supportsStructuredJson: true,
      supportsSystemInstruction: true,
      notes: 'High throughput and minimal latency for text-based exercises.',
    },
  },
  {
    id: 'gemini-3.1-pro-preview',
    displayName: 'Gemini 3.1 Pro',
    apiModelId: 'gemini-3.1-pro-preview',
    status: 'verified_available',
    description:
      'Advanced reasoning model providing nuanced phonetic precision, deep conversational critique, and high-level syntactic feedback.',
    capabilities: {
      supportsAudioInput: true,
      supportsStructuredJson: true,
      supportsSystemInstruction: true,
      notes: 'Deep reasoning for comprehensive speech diagnostics and acoustic critique (requires paid API key).',
    },
  },
];

export const DEFAULT_GEMINI_MODEL_ID = 'gemini-3.8-flash';

export const SPECIALIZED_SERVICE_MODELS = {
  tts: {
    primary: 'gemini-3.8-flash-lite-tts',
    secondary: 'gemini-3.8-flash-tts',
    description:
      'Specialized Gemini audio synthesis engine for generating authentic General American phonetic reference models.',
  },
  transcriptionBackup: {
    model: 'gemini-3.5-transcribe',
    description: 'Dedicated audio transcription model utilized if speech audio requires specialized transcription pre-processing.',
  },
};

/**
 * Normalizes legacy or unverified model IDs to active supported production models
 */
export function normalizeLegacyModelId(modelId?: string): string {
  if (!modelId) return DEFAULT_GEMINI_MODEL_ID;
  const clean = modelId.trim().toLowerCase();

  if (GEMINI_FLASH_MODELS.some((m) => m.id === clean || m.apiModelId === clean)) {
    return clean;
  }

  if (clean.includes('pro')) {
    return 'gemini-3.1-pro-preview';
  }

  if (clean.includes('lite')) {
    return 'gemini-3.1-flash-lite';
  }

  return DEFAULT_GEMINI_MODEL_ID;
}

/**
 * Returns model configuration by ID, or the default model if not found
 */
export function getModelConfig(modelId?: string): GeminiModelOption {
  const normalizedId = normalizeLegacyModelId(modelId);
  const found = GEMINI_FLASH_MODELS.find(
    (m) => m.id === normalizedId || m.apiModelId === normalizedId
  );
  return found || GEMINI_FLASH_MODELS[0];
}

/**
 * Resolves verified API model ID for an input model ID or returns default
 */
export function resolveApiModelId(modelId?: string): string {
  const config = getModelConfig(modelId);
  return config.apiModelId;
}
