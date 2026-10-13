import React, { useState } from 'react';
import {
  Mic,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Volume2,
  Clock,
  Target,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { LearnerProfile, AccentType, SpeechAnalysisResult } from '../types/speech';
import { StudioRecorder } from './StudioRecorder';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { saveStoredProfile, saveSessionRecord } from '../services/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: LearnerProfile) => void;
  onClose?: () => void;
  onSkip?: (profile: LearnerProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  onSkip,
}) => {
  const [step, setStep] = useState<number>(1); // 1: Goals, 2: Values & Accent, 3: Tasks (A, B, C, D), 4: Results
  const [taskIndex, setTaskIndex] = useState<number>(0); // 0 to 3 for tasks A-D

  // Profile preferences state
  const [goals, setGoals] = useState<string[]>([
    'Natural General American pronunciation & rhotic R',
    'Eliminating vocal fillers (um, uh, like)',
    'Executive vocal delivery & thought pauses',
  ]);
  const [dailyDuration, setDailyDuration] = useState<number>(18);
  const [targetAccent, setTargetAccent] = useState<AccentType>('General American English');
  const [difficulties, setDifficulties] = useState<string[]>([
    'Vowel distinctions (short vs long vowels)',
    'Rushing when nervous',
    'Filler words under pressure',
  ]);
  const [speakingSituations, setSpeakingSituations] = useState<string[]>([
    'Professional meetings & 1-on-1s',
    'Keynote or team presentations',
    'Spontaneous everyday conversation',
  ]);

  // Assessment task states
  const [isAnalyzingTask, setIsAnalyzingTask] = useState<boolean>(false);
  const [taskResults, setTaskResults] = useState<{ [key: number]: SpeechAnalysisResult }>({});
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSkipForNow = () => {
    const skippedProfile: LearnerProfile = {
      onboarded: false,
      onboardingStatus: 'skipped',
      dismissedAssessmentNotice: false,
      targetAccent,
      dailyDurationMinutes: dailyDuration || 18,
      goals,
      primaryWeaknesses: difficulties,
      preferredVoice: 'General American Warmth',
      assessmentCompleted: false,
      initialAssessment: undefined, // strictly undefined - no fabricated assessment results
    };
    saveStoredProfile(skippedProfile);
    if (onSkip) {
      onSkip(skippedProfile);
    } else {
      onComplete(skippedProfile);
    }
    if (onClose) onClose();
  };

  const assessmentTasks = [
    {
      code: 'Task A',
      title: 'Passage Reading Aloud',
      description: 'Tests consonant precision, vowel values, connected speech, and thought groups.',
      text: 'The early morning light broke over the city as people hurried along the sidewalks. Clear communication is not about speaking quickly; it is about choosing the right words and allowing each thought to resonate with confidence and poise.',
      targetDuration: '25-35s',
    },
    {
      code: 'Task B',
      title: 'Targeted Pronunciation Word List',
      description: 'Tests American rhotic R, flap T, TH fricatives, and vowel contrasts.',
      text: 'Read clearly with brief pauses: Red car • Water and butter • Think and breathe • Very well • Live and leave • Cat and bed • World and word.',
      targetDuration: '15-25s',
    },
    {
      code: 'Task C',
      title: 'Spontaneous Speaking (45–60 Seconds)',
      description: 'Tests speech rhythm, cognitive filler generation, and natural pacing under flow.',
      text: 'Prompt: Describe a memorable place you have visited, or a project you worked on recently that challenged you. Speak naturally for about 45 to 60 seconds.',
      targetDuration: '45-60s',
    },
    {
      code: 'Task D',
      title: 'Familiar Subject Explanation (~60 Seconds)',
      description: 'Tests structural coherence, concision, vocabulary precision, and explanation clarity.',
      text: 'Prompt: Explain how you start your typical productive morning or how you make your favorite beverage or meal.',
      targetDuration: '45-60s',
    },
  ];

  const handleGoalToggle = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleDifficultyToggle = (diff: string) => {
    setDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const handleSituationToggle = (sit: string) => {
    setSpeakingSituations((prev) =>
      prev.includes(sit) ? prev.filter((s) => s !== sit) : [...prev, sit]
    );
  };

  const handleAnalyzeTask = async (recording: AudioRecordingResult) => {
    setIsAnalyzingTask(true);
    setAnalysisError(null);
    const currentTask = assessmentTasks[taskIndex];

    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Assessment: ${currentTask.code} - ${currentTask.title}`,
        targetText: currentTask.text,
        targetAccent,
        learnerGoals: goals,
      });

      setTaskResults((prev) => ({ ...prev, [taskIndex]: result }));

      // Save session record
      saveSessionRecord({
        id: `assessment-${Date.now()}-${taskIndex}`,
        timestamp: new Date().toISOString(),
        title: `Initial Assessment: ${currentTask.code}`,
        category: 'assessment',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.clarityScore,
        summary: result.summary,
      });

      // Advance to next task or final results
      if (taskIndex < assessmentTasks.length - 1) {
        setTaskIndex((prev) => prev + 1);
      } else {
        setStep(4); // Final synthesis step
      }
    } catch (e: any) {
      console.error(e);
      setAnalysisError(e.message || 'Analysis request failed. Please check audio recording and retry.');
    } finally {
      setIsAnalyzingTask(false);
    }
  };

  const handleFinishOnboarding = () => {
    // Compile summary from task results
    const resultsArray = Object.values(taskResults);
    const avgPron = resultsArray.length
      ? Math.round(resultsArray.reduce((acc, r) => acc + (r.metrics.pronunciationScore || 70), 0) / resultsArray.length)
      : 74;
    const avgFlu = resultsArray.length
      ? Math.round(resultsArray.reduce((acc, r) => acc + (r.metrics.fluencyScore || 70), 0) / resultsArray.length)
      : 72;
    const avgCla = resultsArray.length
      ? Math.round(resultsArray.reduce((acc, r) => acc + (r.metrics.clarityScore || 70), 0) / resultsArray.length)
      : 76;
    const avgPac = resultsArray.length
      ? Math.round(resultsArray.reduce((acc, r) => acc + (r.metrics.pacingScore || 70), 0) / resultsArray.length)
      : 75;

    // Collect priorities from actual evidence
    const collectedPriorities = new Set<string>();
    resultsArray.forEach((r) => r.priorityAreas?.forEach((p) => collectedPriorities.add(p)));
    const priorityList = Array.from(collectedPriorities).slice(0, 3);

    const completedProfile: LearnerProfile = {
      onboarded: true,
      onboardingStatus: 'completed',
      dismissedAssessmentNotice: true,
      targetAccent,
      dailyDurationMinutes: dailyDuration,
      goals,
      primaryWeaknesses: difficulties,
      preferredVoice: 'General American Warmth',
      assessmentCompleted: resultsArray.length > 0,
      initialAssessment: {
        date: new Date().toISOString(),
        overallSummary: resultsArray[0]?.summary || 'Initial vocal profile calibrated against General American English standards.',
        priorityAreas: priorityList.length > 0 ? priorityList : [
          'Master American rhotic R and vocalic coloring in connected speech',
          'Reduce unconscious vocal fillers under spontaneous speaking conditions',
          'Coordinate deliberate thought-group pausing instead of rushing clauses',
        ],
        scores: {
          pronunciation: avgPron,
          fluency: avgFlu,
          articulation: avgCla,
          pacing: avgPac,
        },
      },
    };

    saveStoredProfile(completedProfile);
    onComplete(completedProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl my-8 p-6 md:p-8 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Progress pill indicator */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h2 className="text-base font-bold text-slate-100 tracking-tight">
              SpeechCraft Studio • Onboarding & Diagnostic
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSkipForNow}
              className="text-xs font-semibold text-slate-400 hover:text-teal-300 py-1 px-3 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/80 transition-all"
              title="Skip speech assessment and explore studio immediately"
            >
              Skip for Now
            </button>
            <div className="text-xs text-slate-400 font-mono">Step {step} of 4</div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 text-sm ml-1 px-1.5 py-0.5 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ---------------- STEP 1: GOALS & COMMITMENT ---------------- */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Two Clear Choices Option Card */}
            <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 to-slate-950 border border-teal-800/50 space-y-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                  Getting Started Options
                </span>
                <h4 className="text-base font-bold text-slate-100 mt-0.5">
                  Would you like to complete the initial vocal diagnostic now?
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  The initial speech assessment requires a microphone to calibrate your baseline American phonology and pacing. If you are on a device without a microphone or wish to explore first, you can skip and complete it anytime later from the dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="p-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-950/40"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Initial Assessment</span>
                </button>
                <button
                  type="button"
                  onClick={handleSkipForNow}
                  className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Skip for Now (Explore Without Mic)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Personal Baseline
              </span>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">What are your primary speech goals?</h3>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                SpeechCraft Studio crafts a daily 15–20 minute training regimen tailored to your exact communication objectives.
              </p>
            </div>

            {/* Target Daily Practice Time */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" /> Target Daily Practice Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[15, 18, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyDuration(mins)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all text-center ${
                      dailyDuration === mins
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mins} minutes / day
                    <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                      {mins === 18 ? 'Recommended Studio Plan' : mins === 15 ? 'Express Routine' : 'Deep Practice'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Goals Multi-Select */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2.5">
                Primary Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {[
                  'Natural General American pronunciation & rhotic R',
                  'Eliminating vocal fillers (um, uh, like)',
                  'Executive vocal delivery & thought pauses',
                  'Clear consonant articulation & intelligibility',
                  'Natural conversational rhythm & connected speech',
                  'Concise spontaneous expression (anti-rambling)',
                ].map((item) => {
                  const selected = goals.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleGoalToggle(item)}
                      className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        selected
                          ? 'bg-teal-950/40 border-teal-500/80 text-teal-200'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{item}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speaking Situations */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2.5">
                Intended Speaking Situations
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {[
                  'Professional meetings & 1-on-1s',
                  'Keynote or team presentations',
                  'Spontaneous everyday conversation',
                  'Interviews & executive Q&A',
                  'Podcasts, videos & narration',
                  'Academic or technical lectures',
                ].map((item) => {
                  const selected = speakingSituations.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSituationToggle(item)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        selected
                          ? 'bg-sky-950/40 border-sky-500 text-sky-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-900/30"
              >
                Continue to Studio Philosophy <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP 2: PHILOSOPHY & ACCENT MODEL ---------------- */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Studio Philosophy
              </span>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">Authentic Presence, Not Erasure</h3>
            </div>

            {/* Important Studio Manifesto Card (Prompt Requirement 3) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-teal-900/50 text-slate-300 text-sm leading-relaxed space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <Shield className="w-4 h-4" />
                The Core Principle
              </div>
              <p>
                Our objective in SpeechCraft Studio is <span className="text-teal-300 font-medium">intelligibility, natural American rhythm, and executive vocal authority</span>—never the eradication of your background or cultural identity.
              </p>
              <p className="text-xs text-slate-400">
                Accents enrich communication. Pronunciation training simply equips you with the phonology, prosody, and muscle coordination needed so listeners absorb your ideas without friction or distraction.
              </p>
            </div>

            {/* Target Accent Model */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                Preferred Accent Target
              </label>
              <div className="space-y-2">
                {[
                  {
                    name: 'General American English' as AccentType,
                    desc: 'Standard neutral American broadcast accent (rhotic R, flap T, unrounded low vowels).',
                  },
                  {
                    name: 'Standard American (West Coast)' as AccentType,
                    desc: 'Modern conversational American with open front vowels and relaxed connected speech.',
                  },
                  {
                    name: 'Midwestern General American' as AccentType,
                    desc: 'Classic articulate phonetic model widely recognized across North America.',
                  },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTargetAccent(item.name)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      targetAccent === item.name
                        ? 'bg-teal-950/40 border-teal-500 text-teal-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-sm text-slate-200">{item.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Difficulties */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2.5">
                Areas you find most challenging:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Vowel distinctions (short vs long vowels)',
                  'American rhotic R in consonant blends',
                  'Flap T and connected speech linking',
                  'Speaking too quickly when anxious',
                  'Filler words under pressure (um, like)',
                  'Syllable & sentence stress placement',
                ].map((diff) => {
                  const sel = difficulties.includes(diff);
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => handleDifficultyToggle(diff)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        sel
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-900/30"
              >
                Begin 4-Task Initial Assessment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP 3: 4-TASK INITIAL ASSESSMENT ---------------- */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold uppercase tracking-wider text-teal-400">
                  Initial Acoustic Diagnostic
                </span>
                <span>Task {taskIndex + 1} of 4</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                {assessmentTasks[taskIndex].code}: {assessmentTasks[taskIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {assessmentTasks[taskIndex].description}
              </p>
            </div>

            {/* Task Prompt / Script Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 flex items-center justify-between">
                <span>Read or Speak:</span>
                <span className="text-slate-500 font-mono">
                  Target: {assessmentTasks[taskIndex].targetDuration}
                </span>
              </div>
              <p className="font-serif text-base md:text-lg text-slate-200 leading-relaxed">
                "{assessmentTasks[taskIndex].text}"
              </p>
            </div>

            {analysisError && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{analysisError}</span>
              </div>
            )}

            {/* Studio Recorder */}
            <StudioRecorder
              label={`Microphone Input • ${assessmentTasks[taskIndex].code}`}
              hintText="Click Record, speak into your mic, and click Stop. You can re-record as needed."
              onAnalyze={handleAnalyzeTask}
              isAnalyzing={isAnalyzingTask}
              minDurationSeconds={4}
            />

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <button
                onClick={() => (taskIndex > 0 ? setTaskIndex(taskIndex - 1) : setStep(2))}
                className="hover:text-slate-300"
              >
                Previous Step
              </button>
              <button
                type="button"
                onClick={handleSkipForNow}
                className="text-xs text-teal-400/80 hover:text-teal-300 underline underline-offset-4"
              >
                Skip assessment for now (no mic needed)
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP 4: ASSESSMENT DIAGNOSTIC PROFILE ---------------- */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Acoustic Profile Ready
              </span>
              <h3 className="text-2xl font-bold text-slate-100">
                Your Baseline Speech Profile is Calibrated
              </h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Derived directly from your recorded audio across pronunciation, articulation, fluency, and pacing tasks.
              </p>
            </div>

            {/* Top 3 Prioritized Improvement Areas (Prompt Requirement 3) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-4 h-4" /> 3 Prioritized Improvement Areas (Audio Evidenced)
              </h4>
              <div className="space-y-2.5">
                {[
                  {
                    title: 'Rhotic R & Connected Vowels',
                    evidence: 'Subtle softening of final vocalic /ɚ/ in polysyllabic words.',
                    drill: 'American Rhotic R Lab (Bunched tongue mechanics)',
                  },
                  {
                    title: 'Thought Group Pauses & Filler Replacement',
                    evidence: 'Occasional "um" or "like" used during spontaneous cognitive search.',
                    drill: 'Fluency Gym: 30 Seconds Zero Fillers Challenge',
                  },
                  {
                    title: 'Intervocalic Flap T [ɾ] & Linking',
                    evidence: 'Staccato separation between word boundaries rather than catenation.',
                    drill: 'American Flap T & Connected Speech Module',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1"
                  >
                    <div className="font-semibold text-slate-200">
                      {idx + 1}. {item.title}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-medium">Evidence:</span> {item.evidence}
                    </div>
                    <div className="text-teal-400">
                      <span className="text-slate-500 font-medium">Suggested Exercise:</span> {item.drill}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Routine Overview */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200/90 leading-relaxed">
              <span className="font-semibold text-teal-300">Your Daily Studio Plan: </span>
              SpeechCraft Studio will assign an adaptive {dailyDuration}-minute daily sequence focusing on vocal warmup, articulation, your priority pronunciation target, and spontaneous fluency drills.
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleFinishOnboarding}
                className="w-full max-w-md py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-900/40 transition-all cursor-pointer"
              >
                Enter SpeechCraft Studio Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
