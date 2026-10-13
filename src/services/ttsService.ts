/**
 * Re-export wrapper and unified interface for reference audio playback
 *
 * Ensures 100% backward-compatibility with all existing components importing
 * `referenceSpeaker` from `../services/ttsService` while providing the new
 * shared, deduplicated, and cached audio manager under the hood.
 */

import { audioPlaybackManager, PlaybackOptions } from './audioPlaybackManager';

class ReferenceSpeechPlayerProxy {
  play(
    text: string,
    speedOrOptions: number | PlaybackOptions = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    playbackId?: string
  ): Promise<void> {
    return audioPlaybackManager.play(text, speedOrOptions, onStart, onEnd, playbackId);
  }

  stop(): void {
    audioPlaybackManager.stop();
  }

  isPlaying(): boolean {
    return audioPlaybackManager.isPlaying();
  }

  getActiveText(): string | null {
    return audioPlaybackManager.getActiveText();
  }

  preload(texts: string[]): Promise<void> {
    return audioPlaybackManager.preload(texts);
  }

  clearCache(): Promise<void> {
    return audioPlaybackManager.clearCache();
  }
}

export const referenceSpeaker = new ReferenceSpeechPlayerProxy();
export { audioPlaybackManager };
export type { PlaybackOptions, PlaybackState } from './audioPlaybackManager';
