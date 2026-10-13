import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Gauge,
  Activity,
  Layers,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { SpeechAnalysisResult, Finding } from '../types/speech';
import { referenceSpeaker } from '../services/ttsService';

interface AnalysisReportViewProps {
  analysis: SpeechAnalysisResult;
  onPracticeExercise?: (exerciseName: string) => void;
  recordedAudioUrl?: string;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  analysis,
  onPracticeExercise,
  recordedAudioUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pronunciation' | 'fluency' | 'delivery' | 'expression'>('all');
  const [playingExample, setPlayingExample] = useState<string | null>(null);

  const { transcript, summary, metrics, findings, strengths, priorityAreas, nextExercises, limitations } = analysis;

  const playReferenceAudio = (text: string, id: string) => {
    setPlayingExample(id);
    referenceSpeaker.play(
      text,
      1.0,
      () => setPlayingExample(id),
      () => setPlayingExample(null)
    );
  };

  const filteredFindings = findings.filter(
    (f) => activeTab === 'all' || f.category.toLowerCase() === activeTab
  );

  // Highlight detected fillers in verbatim transcript
  const renderHighlightedTranscript = () => {
    if (!transcript) return <span className="italic text-slate-500">No speech detected.</span>;

    const fillerWords = (metrics?.detectedFillers || ['um', 'uh', 'like', 'you know', 'ah', 'er']).map((f) =>
      f.toLowerCase().trim()
    );

    // Split text into tokens
    const words = transcript.split(/(\s+)/);

    return (
      <div className="font-serif leading-relaxed text-slate-200 text-base md:text-lg tracking-normal">
        {words.map((word, idx) => {
          const clean = word.toLowerCase().replace(/[^a-z']/g, '');
          const isFiller = fillerWords.includes(clean);

          if (isFiller) {
            return (
              <span
                key={idx}
                className="bg-amber-500/20 text-amber-300 font-sans font-medium px-1.5 py-0.5 rounded border border-amber-500/30 text-sm mx-0.5"
                title="Filler word detected"
              >
                {word}
              </span>
            );
          }
          return <span key={idx}>{word}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview & Verbatim Transcript Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Verbatim Acoustic Transcript
            </span>
            <h3 className="text-lg font-bold text-slate-100">Speech Performance Analysis</h3>
          </div>
          {recordedAudioUrl && (
            <div className="flex items-center gap-2">
              <audio controls src={recordedAudioUrl} className="h-8 max-w-[200px]" />
            </div>
          )}
        </div>

        {/* Verbatim Transcript */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
            <span>Speech Captured:</span>
            <span className="text-amber-400/90 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Highlighted tags denote verbal fillers & padding
            </span>
          </div>
          {renderHighlightedTranscript()}
        </div>

        {/* Executive Summary */}
        <div className="mt-4 p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 text-sm text-teal-100/90 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-teal-300">Coach Summary: </span>
            {summary}
          </div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Speaking Pace (WPM) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Pace (WPM)</span>
            <Gauge className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {metrics?.estimatedWpm || 0}{' '}
            <span className="text-xs font-normal text-slate-400">words/min</span>
          </div>
          <div className="mt-1.5 text-[11px] text-slate-400">
            {metrics?.estimatedWpm >= 130 && metrics?.estimatedWpm <= 165 ? (
              <span className="text-emerald-400">Optimal American range (130-165)</span>
            ) : metrics?.estimatedWpm < 130 ? (
              <span className="text-amber-400">Measured / Deliberate pace</span>
            ) : (
              <span className="text-rose-400">Fast tempo / Tendency to rush</span>
            )}
          </div>
        </div>

        {/* Fillers Count */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Fillers Detected</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {metrics?.fillerCount ?? 0}
          </div>
          <div className="mt-1.5 text-[11px] text-slate-400 truncate">
            {metrics?.detectedFillers?.length
              ? `Used: ${metrics.detectedFillers.slice(0, 3).join(', ')}`
              : 'Zero fillers used! Crisp delivery'}
          </div>
        </div>

        {/* Pronunciation & Accent Score */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">GenAm Target</span>
            <Volume2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-300 font-mono">
            {metrics?.pronunciationScore ?? 75}
            <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="mt-1.5 text-[11px] text-teal-400/80">
            American rhoticity & clarity
          </div>
        </div>

        {/* Fluency Score */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Fluency & Rhythm</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-300 font-mono">
            {metrics?.fluencyScore ?? 75}
            <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="mt-1.5 text-[11px] text-indigo-400/80">
            Smooth thought group flow
          </div>
        </div>
      </div>

      {/* Strengths & Priority Areas Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="w-4 h-4" /> Audio-Evidenced Strengths
          </h4>
          <ul className="space-y-2">
            {strengths?.map((strength, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Areas */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-3">
            <AlertTriangle className="w-4 h-4" /> High-Yield Focus Areas
          </h4>
          <ul className="space-y-2">
            {priorityAreas?.map((priority, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Diagnostic Findings */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-100">Specific Coaching Findings</h3>
            <p className="text-xs text-slate-400">Audio evidence, explanations, and targeted drills</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {(['all', 'pronunciation', 'fluency', 'delivery', 'expression'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-4">
          {filteredFindings.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No specific issues flagged in this category. Excellent control!
            </div>
          ) : (
            filteredFindings.map((finding, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-teal-300 border border-slate-700">
                      {finding.category}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">{finding.issue}</h4>
                  </div>
                  {finding.confidence && (
                    <span className="text-[10px] text-slate-500">
                      Confidence: {finding.confidence}
                    </span>
                  )}
                </div>

                {/* Evidence Quote */}
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs mb-3 text-slate-300">
                  <span className="text-slate-500 font-semibold mr-1.5">Audio Evidence:</span>
                  <span className="font-serif italic text-amber-200/90">"{finding.evidence}"</span>
                </div>

                {/* Explanation */}
                <div className="text-xs text-slate-400 leading-relaxed mb-3">
                  <span className="text-slate-300 font-semibold">Why this matters: </span>
                  {finding.explanation}
                </div>

                {/* Suggested Correction */}
                <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-900/60 text-xs text-teal-200/90 mb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-teal-300">Correction Target: </span>
                    {finding.suggestedCorrection}
                  </div>
                  <button
                    onClick={() => playReferenceAudio(finding.suggestedCorrection, `find-${idx}`)}
                    className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[11px] font-medium transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    {playingExample === `find-${idx}` ? 'Playing...' : 'Hear Model'}
                  </button>
                </div>

                {/* Targeted Exercise Recommendation & Action */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">
                    <span className="text-slate-500 font-medium">Recommended Drill: </span>
                    <span className="text-slate-200 font-medium">{finding.targetedExercise}</span>
                  </span>
                  {onPracticeExercise && (
                    <button
                      onClick={() => onPracticeExercise(finding.targetedExercise)}
                      className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-medium text-xs transition-colors"
                    >
                      Practice This Exercise <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suggested Next Exercises */}
      {nextExercises?.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">
              Next In Your Routine
            </h4>
            <p className="text-sm text-slate-200">
              {nextExercises.join(' • ')}
            </p>
          </div>
          {onPracticeExercise && nextExercises[0] && (
            <button
              onClick={() => onPracticeExercise(nextExercises[0])}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs shadow-md transition-colors"
            >
              Start Next Drill
            </button>
          )}
        </div>
      )}

      {/* Scientific/Model Limitations Disclosure (Requirement 5 & 12) */}
      {limitations && limitations.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-500 text-[11px] leading-relaxed flex items-start gap-2">
          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-400">Analysis Transparency: </span>
            {limitations.join(' ')}
          </div>
        </div>
      )}
    </div>
  );
};
