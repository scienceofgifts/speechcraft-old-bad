import React from 'react';
import { Sparkles, Target, CheckCircle2, ArrowRight, Award, Zap, BookOpen, Volume2, Mic, RotateCcw } from 'lucide-react';
import { LearnerProfile, PracticeSessionRecord } from '../types/speech';
import { NavTab } from './Navbar';

interface PersonalizedPathSectionProps {
  profile: LearnerProfile;
  sessions: PracticeSessionRecord[];
  onNavigateTab: (tab: NavTab) => void;
  onOpenAssessment: () => void;
}

export const PersonalizedPathSection: React.FC<PersonalizedPathSectionProps> = ({
  profile,
  sessions,
  onNavigateTab,
  onOpenAssessment,
}) => {
  const assessment = profile.initialAssessment;
  const isCompleted = profile.assessmentCompleted && assessment;

  // Calculate dynamic milestone completion based on sessions count and practice history
  const totalPracticeMins = Math.round(
    sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0) / 60
  );

  const milestones = [
    {
      id: 'm1',
      title: 'Milestone 1: Acoustic Baseline & Phonemic Tuning',
      description: 'Calibrate your American English vowel discrimination, rhotic /r/, and flap T patterns.',
      status: isCompleted ? 'completed' : 'in_progress',
      targetTab: 'pronunciation' as NavTab,
      actionText: isCompleted ? 'Review Pronunciation Lab' : 'Take Baseline Assessment',
      onClick: isCompleted ? () => onNavigateTab('pronunciation') : onOpenAssessment,
    },
    {
      id: 'm2',
      title: 'Milestone 2: Executive Vocabulary & Precision',
      description: 'Master 30+ executive collocations and replace vague filler phrases with professional alternatives.',
      status: totalPracticeMins >= 10 ? 'completed' : 'in_progress',
      targetTab: 'vocab-builder' as NavTab,
      actionText: 'Explore Word Roots & Builder',
      onClick: () => onNavigateTab('vocab-builder'),
    },
    {
      id: 'm3',
      title: 'Milestone 3: Filler Elimination & Fluency Gym',
      description: 'Practice spontaneous 60-second responses while suppressing "um" and "uh" habits.',
      status: sessions.some((s) => s.category === 'fluency') ? 'completed' : 'in_progress',
      targetTab: 'fluency' as NavTab,
      actionText: 'Open Fluency Gym',
      onClick: () => onNavigateTab('fluency'),
    },
    {
      id: 'm4',
      title: 'Milestone 4: Executive Voice Delivery & Pacing',
      description: 'Develop low diaphragmatic warmth, resonant thought-group pausing, and confident projection.',
      status: sessions.some((s) => s.category === 'delivery') ? 'completed' : 'upcoming',
      targetTab: 'delivery' as NavTab,
      actionText: 'Start Voice Drills',
      onClick: () => onNavigateTab('delivery'),
    },
    {
      id: 'm5',
      title: 'Milestone 5: Real-Life Conversational Mastery',
      description: 'Engage in adaptive AI conversation scenarios with polite disagreement and clarification strategies.',
      status: sessions.some((s) => s.category === 'conversation') ? 'completed' : 'upcoming',
      targetTab: 'conversation' as NavTab,
      actionText: 'Launch Conversation Practice',
      onClick: () => onNavigateTab('conversation'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                <Target className="w-4 h-4" />
                <span>Phase 9: Personalized Learning Path</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 mt-1">
                Your Adaptive American English Roadmap
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Dynamically generated based on your baseline diagnostic scores, practice session history, and spoken fluency records.
              </p>
            </div>

            {!isCompleted ? (
              <button
                onClick={onOpenAssessment}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Baseline Assessment</span>
              </button>
            ) : (
              <button
                onClick={onOpenAssessment}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-400" /> Recalibrate Assessment
              </button>
            )}
          </div>

          {/* Assessment Summary Scores if completed */}
          {isCompleted && assessment && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-0.5">Pronunciation Score</div>
                <div className="text-lg font-bold font-mono text-teal-400">{assessment.scores.pronunciation}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-0.5">Fluency Score</div>
                <div className="text-lg font-bold font-mono text-sky-400">{assessment.scores.fluency}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-0.5">Voice Delivery</div>
                <div className="text-lg font-bold font-mono text-indigo-400">{assessment.scores.articulation}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-0.5">Overall Pacing</div>
                <div className="text-lg font-bold font-mono text-amber-400">{assessment.scores.pacing}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider px-1">
          Curriculum Milestones & Adaptive Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                m.status === 'completed'
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">Milestone {idx + 1}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                      m.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {m.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3 text-amber-400" /> Recommended
                      </>
                    )}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-100">{m.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400">
                  {m.status === 'completed' ? 'Mastered & Verified' : 'Next Priority Step'}
                </span>
                <button
                  onClick={m.onClick}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{m.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
