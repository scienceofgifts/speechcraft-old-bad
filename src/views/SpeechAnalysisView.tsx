import React, { useState } from 'react';
import {
  Mic,
  Sparkles,
  AlertCircle,
  FileText,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { SpeechAnalysisResult, LearnerProfile } from '../types/speech';
import { analyzeSpeech } from '../services/apiService';
import { saveSessionRecord } from '../services/storage';

interface SpeechAnalysisViewProps {
  profile: LearnerProfile;
  onSelectExercise?: (exerciseName: string) => void;
}

export const SpeechAnalysisView: React.FC<SpeechAnalysisViewProps> = ({
  profile,
  onSelectExercise,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Optional practice prompt selection for inspiration
  const [selectedPrompt, setSelectedPrompt] = useState<string>(
    'Free speech monologue (speak freely on any topic)'
  );

  const samplePrompts = [
    'Free speech monologue (speak freely on any topic)',
    'Explain a recent project architecture or challenging bug',
    'Describe your philosophy on work-life balance',
    'Give a 60-second summary of an interesting book or article',
    'Explain how to prepare your favorite dish or morning routine',
  ];

  const handleAnalyze = async (recording: AudioRecordingResult) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setRecordedAudioUrl(recording.blobUrl);

    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: 'Speech Analysis Lab',
        context: selectedPrompt,
        learnerGoals: profile.goals,
        targetAccent: profile.targetAccent,
      });

      result.audioBlobUrl = recording.blobUrl;
      result.recordedAt = new Date().toISOString();
      setAnalysisResult(result);

      // Persist in session records
      saveSessionRecord({
        id: `analysis-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: selectedPrompt,
        category: 'fluency',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.clarityScore,
        summary: result.summary,
      });
    } catch (e: any) {
      console.error('Speech analysis failed:', e);
      setAnalysisError(e.message || 'Analysis failed. Please check microphone input and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
          <Mic className="w-4 h-4" />
          <span>Speech Analysis Lab</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
          Acoustic Recording & Verbatim Speech Coach
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Record your spoken monologue or passage. The server-side Gemini audio engine will generate a strict verbatim transcript, compute speaking rate (WPM), highlight filler habits, and diagnose American pronunciation targets.
        </p>
      </div>

      {/* Prompt Selection Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 w-full max-w-full min-w-0">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
          Speaking Prompt (Optional):
        </label>
        <div
          role="tablist"
          aria-label="Speaking Prompts"
          className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x scroll-smooth"
        >
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPrompt(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 whitespace-nowrap border ${
                selectedPrompt === p
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
          <div className="w-3 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* Recording Dock */}
      <StudioRecorder
        label="Speech Analysis Deck"
        hintText={`Target prompt: "${selectedPrompt}". Record for at least 10–60 seconds for rich analysis.`}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        minDurationSeconds={3}
      />

      {/* Error alert */}
      {analysisError && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <div className="font-semibold text-rose-300">Analysis Notice</div>
            <div>{analysisError}</div>
          </div>
        </div>
      )}

      {/* Analysis Output View */}
      {analysisResult && (
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              Comprehensive Performance Diagnostic
            </h2>
            <button
              onClick={() => {
                setAnalysisResult(null);
                setRecordedAudioUrl(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Start New Analysis
            </button>
          </div>

          <AnalysisReportView
            analysis={analysisResult}
            recordedAudioUrl={recordedAudioUrl || undefined}
            onPracticeExercise={onSelectExercise}
          />
        </div>
      )}
    </div>
  );
};
