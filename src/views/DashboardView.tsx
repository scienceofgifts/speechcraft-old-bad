import React, { useMemo } from 'react';
import {
  Zap,
  Clock,
  Flame,
  Target,
  ArrowRight,
  TrendingUp,
  Volume2,
  Activity,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Award,
  Mic,
  MessageSquare,
  X,
  Brain,
  BookOpen,
} from 'lucide-react';
import { LearnerProfile, DailySessionPlan, PracticeSessionRecord } from '../types/speech';
import { NavTab } from '../components/Navbar';
import { generatePerformanceProfile, generateRecommendations, generateLearningInsights } from '../services/adaptiveEngine';

interface DashboardViewProps {
  profile: LearnerProfile;
  dailyPlan: DailySessionPlan;
  sessions: PracticeSessionRecord[];
  onStartSession: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenOnboarding: () => void;
  onDismissNotice?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  dailyPlan,
  sessions,
  onStartSession,
  onNavigateTab,
  onOpenOnboarding,
  onDismissNotice,
}) => {
  const performanceProfiles = useMemo(() => generatePerformanceProfile(sessions, profile), [sessions, profile]);
  const recommendations = useMemo(() => generateRecommendations(performanceProfiles, sessions), [performanceProfiles, sessions]);
  const learningInsights = useMemo(() => generateLearningInsights(performanceProfiles, sessions), [performanceProfiles, sessions]);

  const handleNavigateModule = (targetModule: string) => {
    if (targetModule === 'pronunciation') onNavigateTab('pronunciation');
    else if (targetModule === 'fluency') onNavigateTab('fluency');
    else if (targetModule === 'delivery') onNavigateTab('delivery');
    else if (targetModule === 'vocabulary') onNavigateTab('vocab-builder');
    else if (targetModule === 'flirting') onNavigateTab('flirting');
    else if (targetModule === 'conversation') onNavigateTab('conversation');
    else if (targetModule === 'speech_analysis') onNavigateTab('analysis');
    else onNavigateTab('analysis');
  };
  const totalMinutes = Math.round(
    sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0) / 60
  );
  const totalSessionsCount = sessions.length;
  const lastSession = sessions[0];

  const avgClarity = sessions.length
    ? Math.round(
        sessions.slice(0, 10).reduce((acc, s) => acc + (s.score || 75), 0) /
          Math.min(sessions.length, 10)
      )
    : profile.initialAssessment?.scores.articulation || 76;

  const avgWpm = sessions.length
    ? Math.round(
        sessions.slice(0, 10).reduce((acc, s) => acc + (s.wpm || 140), 0) /
          Math.min(sessions.length, 10)
      )
    : 142;

  const avgFillers = sessions.length
    ? (
        sessions.slice(0, 10).reduce((acc, s) => acc + (s.fillerCount || 0), 0) /
        Math.min(sessions.length, 10)
      ).toFixed(1)
    : '1.2';

  const showAssessmentNotice = !profile.assessmentCompleted && !profile.dismissedAssessmentNotice;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Subtle, Dismissible Notice for Skipped Initial Assessment */}
      {showAssessmentNotice && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <span>Initial Speech Assessment Pending</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-teal-300">
                  Skipped for Now
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                You are currently exploring SpeechCraft Studio with default recommendations. Complete the 4-task acoustic assessment anytime to calibrate your personal phonological and fluency diagnostics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={onOpenOnboarding}
              className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Complete Assessment</span>
            </button>
            {onDismissNotice && (
              <button
                type="button"
                onClick={onDismissNotice}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Studio Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {profile.targetAccent}
            </span>
            <span className="text-xs text-slate-400">
              • Target: {profile.dailyDurationMinutes} min daily
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Elevate Your Spoken Voice with Precision.
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Welcome to today’s studio session. Focus on natural American phonology, deliberate thought-group pauses, and crisp consonant articulation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartSession}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-950/40 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>
                {dailyPlan.isFinished
                  ? 'Review Completed Routine'
                  : dailyPlan.completedCount > 0
                  ? `Resume Routine (${dailyPlan.completedCount}/${dailyPlan.exercises.length})`
                  : `Start Today’s ${dailyPlan.totalDurationMinutes}-Min Session`}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('analysis')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/60 transition-all"
            >
              <Mic className="w-4 h-4 text-teal-400" />
              <span>Open Speech Analysis Lab</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Practice Time */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Practice Time</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-100 font-mono">
            {totalMinutes}{' '}
            <span className="text-xs font-normal text-slate-400">minutes</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across {totalSessionsCount} recorded drills
          </div>
        </div>

        {/* Practice Streak */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-amber-300 font-mono">
            3 <span className="text-xs font-normal text-slate-400">days</span>
          </div>
          <div className="text-[11px] text-amber-400/80 mt-1">
            Consistent daily vocal practice
          </div>
        </div>

        {/* Average Pace WPM */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Speaking Pace</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-100 font-mono">
            {avgWpm} <span className="text-xs font-normal text-slate-400">WPM</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Within natural American range (130-165)
          </div>
        </div>

        {/* Clarity Score */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Clarity Baseline</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-indigo-300 font-mono">
            {avgClarity}
            <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Fillers: ~{avgFillers} per minute
          </div>
        </div>
      </div>

      {/* Recommended Practice Section (Phase 10L-D) */}
      <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-sky-950/40 border border-teal-500/30 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Adaptive Intelligence</span>
              <h3 className="text-xl font-extrabold text-slate-100">Recommended Practice</h3>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">Based on your practice history</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 flex flex-col justify-between shadow-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                    {rec.skillName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">~{rec.estimatedMinutes} mins</span>
                </div>
                <h4 className="text-sm font-bold text-slate-100">{rec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
                <div className="p-2.5 rounded-xl bg-slate-900 text-[11px] text-slate-400 border border-slate-800/80">
                  <strong className="text-teal-300">Why recommended:</strong> {rec.reasoning}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-slate-400 italic">{rec.successCriteria}</span>
                <button
                  onClick={() => handleNavigateModule(rec.targetModule)}
                  className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-teal-600/20"
                >
                  Start Practice <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Today's Plan & Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Personalized Training Plan (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Daily Regimen
              </span>
              <h3 className="text-lg font-bold text-slate-100">Today’s 5-Part Studio Routine</h3>
            </div>
            <button
              onClick={onStartSession}
              className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              Start Routine <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {dailyPlan.exercises.map((drill, idx) => (
              <div
                key={drill.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  drill.completed
                    ? 'bg-slate-950/50 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs ${
                      drill.completed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {drill.completed ? <CheckCircle2 className="w-4 h-4" /> : `0${idx + 1}`}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{drill.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{drill.instructions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-500">
                    ~{drill.targetDurationMinutes}m
                  </span>
                  {drill.completed ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                      Done
                    </span>
                  ) : (
                    <button
                      onClick={onStartSession}
                      className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold transition-colors"
                    >
                      Practice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Focus Areas & Diagnostics */}
        <div className="space-y-6">
          {/* Priority Focus Areas */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Priority Focus
              </span>
              <button
                onClick={onOpenOnboarding}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                Re-assess
              </button>
            </div>

            <div className="space-y-2.5">
              {(profile.initialAssessment?.priorityAreas || [
                'American rhotic R in consonant blends & vocalic endings',
                'Deliberate thought-group pausing without fillers',
                'Intervocalic flap T [ɾ] in connected speech',
              ]).map((area, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Insights Summary (Phase 10L-D) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Learning Insights
            </span>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="space-y-1">
                <strong className="text-slate-200 block">Skills Practiced:</strong>
                <p className="text-slate-400">{learningInsights.skillsPracticed.length ? learningInsights.skillsPracticed.join(', ') : 'No modules practiced yet.'}</p>
              </div>
              <div className="space-y-1">
                <strong className="text-slate-200 block">Recurring Difficulties:</strong>
                <p className="text-slate-400">{learningInsights.recurringDifficulties.length ? learningInsights.recurringDifficulties.join(', ') : 'None detected — great consistency!'}</p>
              </div>
              <div className="space-y-1">
                <strong className="text-slate-200 block">Unassessed Areas:</strong>
                <p className="text-slate-400">{learningInsights.unassessedAreas.length ? learningInsights.unassessedAreas.join(', ') : 'All core areas explored.'}</p>
              </div>
            </div>
          </div>

          {/* Last Session Snapshot */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Last Session Summary
            </span>

            {lastSession ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-200">{lastSession.title}</span>
                  <span className="font-mono text-[11px]">
                    {new Date(lastSession.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed line-clamp-3">
                  {lastSession.summary || lastSession.transcript || 'Good session completion.'}
                </p>
                <div className="pt-1 flex items-center gap-2 text-slate-500 text-[11px]">
                  <span>Score: {lastSession.score || 80}/100</span>
                  <span>•</span>
                  <span>Pace: {lastSession.wpm || 140} WPM</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 leading-relaxed">
                No individual sessions completed yet today. Tap "Start Session" to record your first warm-up!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Access Studio Modules */}
      <div>
        <h3 className="text-base font-bold text-slate-100 mb-4">Explore Studio Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              tab: 'vocab-builder' as NavTab,
              title: 'Vocabulary Builder',
              desc: 'Classical Greek & Latin roots, morphological matrices, semantic nuances & spaced flashcards.',
              icon: <Brain className="w-5 h-5 text-teal-400" />,
            },
            {
              tab: 'pronunciation' as NavTab,
              title: 'Pronunciation Lab',
              desc: 'General American phonology, minimal pairs, Rhotic R & Flap T.',
              icon: <Volume2 className="w-5 h-5 text-sky-400" />,
            },
            {
              tab: 'fluency' as NavTab,
              title: 'Fluency Gym',
              desc: 'High-intensity drills to eliminate fillers & train concision.',
              icon: <Zap className="w-5 h-5 text-amber-400" />,
            },
            {
              tab: 'vocabulary' as NavTab,
              title: 'American Idioms',
              desc: 'Idiomatic American collocations, executive phrasing & spoken audio challenges.',
              icon: <BookOpen className="w-5 h-5 text-purple-400" />,
            },
            {
              tab: 'delivery' as NavTab,
              title: 'Voice & Delivery',
              desc: 'Vocal warmups, thought pausing, and 4 delivery personas.',
              icon: <Activity className="w-5 h-5 text-emerald-400" />,
            },
            {
              tab: 'conversation' as NavTab,
              title: 'Conversation Practice',
              desc: 'Spontaneous dialogue with Alex, your interactive coach.',
              icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
            },
          ].map((item) => (
            <div
              key={item.tab}
              onClick={() => onNavigateTab(item.tab)}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
