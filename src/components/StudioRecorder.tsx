import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  AlertCircle,
  Clock,
  Radio,
} from 'lucide-react';
import { useAudioRecorder, AudioRecordingResult } from '../hooks/useAudioRecorder';
import { AudioVisualizer } from './AudioVisualizer';

interface StudioRecorderProps {
  onAnalyze?: (recording: AudioRecordingResult) => void;
  isAnalyzing?: boolean;
  minDurationSeconds?: number;
  label?: string;
  hintText?: string;
  autoPlayTarget?: string; // Optional text to preview reference speech
  showAnalyzeButton?: boolean;
}

export const StudioRecorder: React.FC<StudioRecorderProps> = ({
  onAnalyze,
  isAnalyzing = false,
  minDurationSeconds = 2,
  label = 'Studio Microphone',
  hintText = 'Speak clearly into your microphone at normal conversational volume.',
  showAnalyzeButton = true,
}) => {
  const {
    recorderState,
    recordingDuration,
    audioLevel,
    lastRecording,
    errorMessage,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStop = async () => {
    try {
      await stopRecording();
    } catch (e) {
      console.error(e);
    }
  };

  const togglePlayback = () => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    if (isPlayingAudio) {
      audio.pause();
      setIsPlayingAudio(false);
    } else {
      audio.play().catch(console.error);
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setPlaybackProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
      setIsPlayingAudio(false);
      setPlaybackProgress(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [lastRecording]);

  const canAnalyze = lastRecording && lastRecording.durationSeconds >= minDurationSeconds;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100 tracking-wide">{label}</h4>
            <p className="text-xs text-slate-400">{hintText}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {recorderState === 'recording' && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Recording • {formatTime(recordingDuration)}
            </span>
          )}
          {recorderState === 'paused' && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Pause className="w-3 h-3" />
              Paused • {formatTime(recordingDuration)}
            </span>
          )}
          {recorderState === 'inactive' && lastRecording && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Clock className="w-3 h-3" />
              Ready • {lastRecording.durationSeconds}s clip
            </span>
          )}
          {recorderState === 'inactive' && !lastRecording && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
              Standby
            </span>
          )}
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-red-300">Microphone Notice: </span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Audio Visualizer Area */}
      <div className="my-4 py-3 px-4 bg-slate-950/70 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center">
        <AudioVisualizer isRecording={recorderState === 'recording'} audioLevel={audioLevel} />

        {recorderState === 'recording' && (
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span>Audio Input Level:</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-sky-400 transition-all duration-75"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Playback strip if audio recorded */}
      {lastRecording && recorderState === 'inactive' && (
        <div className="mb-5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
          <button
            onClick={togglePlayback}
            className="w-10 h-10 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center hover:bg-teal-400 transition-colors shadow"
            title={isPlayingAudio ? 'Pause playback' : 'Play recording'}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-mono text-slate-300">
                {audioPlayerRef.current
                  ? formatTime(Math.floor(audioPlayerRef.current.currentTime))
                  : '00:00'}
              </span>
              <span className="font-mono text-slate-400">
                {formatTime(lastRecording.durationSeconds)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-teal-400 transition-all"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>
          </div>

          <audio ref={audioPlayerRef} src={lastRecording.blobUrl} preload="auto" />

          <button
            onClick={() => {
              if (isPlayingAudio && audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                setIsPlayingAudio(false);
              }
              clearRecording();
            }}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 rounded-lg transition-colors"
            title="Discard and re-record"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Transport Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {recorderState === 'inactive' ? (
            <button
              onClick={startRecording}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-sm shadow-lg shadow-red-900/30 transition-all disabled:opacity-50"
            >
              <Mic className="w-4 h-4" />
              {lastRecording ? 'Re-record Take' : 'Start Recording'}
            </button>
          ) : (
            <>
              {recorderState === 'recording' ? (
                <button
                  onClick={pauseRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={resumeRecording}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-all"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              )}

              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-semibold text-sm transition-all shadow"
              >
                <Square className="w-4 h-4 text-red-600 fill-current" />
                Stop Take
              </button>
            </>
          )}

          {lastRecording && recorderState === 'inactive' && (
            <button
              onClick={clearRecording}
              className="px-3.5 py-2.5 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Button: Analyze */}
        {showAnalyzeButton && onAnalyze && (
          <button
            onClick={() => lastRecording && onAnalyze(lastRecording)}
            disabled={!canAnalyze || isAnalyzing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-semibold text-sm shadow-lg shadow-teal-900/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Analyzing Audio...
              </span>
            ) : (
              'Analyze Speech'
            )}
          </button>
        )}
      </div>

      {lastRecording && lastRecording.durationSeconds < minDurationSeconds && (
        <p className="mt-2 text-xs text-amber-400/90">
          * Clip is too short ({lastRecording.durationSeconds}s). Please record at least {minDurationSeconds} seconds for reliable acoustic analysis.
        </p>
      )}
    </div>
  );
};
