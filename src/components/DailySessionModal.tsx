import React, { useState } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  SkipForward,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { DailySessionPlan, SpeechAnalysisResult } from '../types/speech';
import { StudioRecorder } from './StudioRecorder';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord, saveDailyPlan } from '../services/storage';

interface DailySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: DailySessionPlan;
  onPlanUpdate: (updatedPlan: DailySessionPlan) => void;
}

export const DailySessionModal: React.FC<DailySessionModalProps> = ({
  isOpen,
  onClose,
  plan,
  onPlanUpdate,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    // Resume from first incomplete step
    const firstIncomplete = plan.exercises.findIndex((e) => !e.completed);
    return firstIncomplete >= 0 ? firstIncomplete : 0;
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepAnalysis, setStepAnalysis] = useState<SpeechAnalysisResult | null>(null);
  const [isPlayingModel, setIsPlayingModel] = useState(false);
  const [sessionFinished, setSessionFinished] = useState<boolean>(() => plan.isFinished);

  if (!isOpen) return null;

  const currentExercise = plan.exercises[currentStepIndex];

  const handlePlayModel = () => {
    if (!currentExercise?.targetText) return;
    setIsPlayingModel(true);
    referenceSpeaker.play(
      currentExercise.targetText,
      1.0,
      () => setIsPlayingModel(true),
      () => setIsPlayingModel(false)
    );
  };

  const handleAnalyzeStep = async (recording: AudioRecordingResult) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Daily Routine: ${currentExercise.title}`,
        targetText: currentExercise.targetText,
      });

      setStepAnalysis(result);

      // Record session in history
      saveSessionRecord({
        id: `daily-${Date.now()}-${currentStepIndex}`,
        timestamp: new Date().toISOString(),
        title: currentExercise.title,
        category: currentExercise.category,
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.clarityScore,
        summary: result.summary,
      });

      // Mark this exercise completed in plan
      const updatedExercises = [...plan.exercises];
      updatedExercises[currentStepIndex] = {
        ...updatedExercises[currentStepIndex],
        completed: true,
      };

      const completedCount = updatedExercises.filter((e) => e.completed).length;
      const isFinished = completedCount === updatedExercises.length;

      const updatedPlan: DailySessionPlan = {
        ...plan,
        exercises: updatedExercises,
        completedCount,
        isFinished,
      };

      onPlanUpdate(updatedPlan);
      saveDailyPlan(updatedPlan);

      if (isFinished) {
        setSessionFinished(true);
      }
    } catch (e) {
      console.error('Step analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextStep = () => {
    setStepAnalysis(null);
    if (currentStepIndex < plan.exercises.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setSessionFinished(true);
    }
  };

  const handleSkipStep = () => {
    setStepAnalysis(null);
    if (currentStepIndex < plan.exercises.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setSessionFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl my-8 p-6 md:p-8 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Today’s {plan.totalDurationMinutes}-Minute Coaching Routine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            {sessionFinished ? 'Daily Routine Completed!' : `Step ${currentStepIndex + 1} of ${plan.exercises.length}: ${currentExercise?.title}`}
          </h2>
        </div>

        {/* Step Progress Pills */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {plan.exercises.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                setStepAnalysis(null);
                setCurrentStepIndex(idx);
                setSessionFinished(false);
              }}
              className={`p-2 rounded-xl text-left border transition-all ${
                idx === currentStepIndex && !sessionFinished
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                  : step.completed
                  ? 'bg-slate-950/80 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-mono flex items-center justify-between">
                <span>0{idx + 1}</span>
                {step.completed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="text-[11px] font-medium truncate mt-0.5">{step.title}</div>
            </button>
          ))}
        </div>

        {/* If session finished celebration */}
        {sessionFinished ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100">
              Outstanding Work! Session Complete
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              You just invested {plan.totalDurationMinutes} minutes into vocal warmup, articulation, General American pronunciation, and spontaneous fluency.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-900/30 transition-all"
              >
                Back to Studio Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Exercise Instructions & Script */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Target Duration: ~{currentExercise?.targetDurationMinutes} mins
                </span>
                {currentExercise?.targetText && (
                  <button
                    onClick={handlePlayModel}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-medium transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isPlayingModel ? 'Playing Model...' : 'Listen to Reference Model'}
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {currentExercise?.instructions}
              </p>

              {currentExercise?.targetText && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-serif text-base md:text-lg leading-relaxed">
                  "{currentExercise.targetText}"
                </div>
              )}
            </div>

            {/* Studio Recorder */}
            <StudioRecorder
              label={`Microphone Dock • ${currentExercise?.title}`}
              hintText="Speak into your microphone. Click Stop when finished to analyze."
              onAnalyze={handleAnalyzeStep}
              isAnalyzing={isAnalyzing}
              minDurationSeconds={3}
            />

            {/* Immediate Step Analysis Feedback */}
            {stepAnalysis && (
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-teal-900/60 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Step Coaching Review
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Pace: {stepAnalysis.metrics.estimatedWpm} WPM • Fillers: {stepAnalysis.metrics.fillerCount}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {stepAnalysis.summary}
                </p>

                {stepAnalysis.findings.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-teal-300">Target Focus: </span>
                    {stepAnalysis.findings[0]?.suggestedCorrection}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition-all"
                  >
                    Proceed to Next Drill <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Footer controls: Skip or Next */}
            {!stepAnalysis && (
              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  onClick={handleSkipStep}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <SkipForward className="w-3.5 h-3.5" /> Skip this exercise for now
                </button>
                <span className="text-slate-500">
                  Record and analyze to automatically advance
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
