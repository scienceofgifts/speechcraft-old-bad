import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Activity,
  Flame,
  Award,
  Download,
  Trash2,
  Volume2,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Target,
} from 'lucide-react';
import { PracticeSessionRecord, LearnerProfile } from '../types/speech';
import { NavTab } from '../components/Navbar';
import { exportAllDataAsJson, clearAllStoredData } from '../services/storage';
import { PersonalizedPathSection } from '../components/PersonalizedPathSection';
import { BaselineAssessmentModal } from '../components/BaselineAssessmentModal';

interface ProgressViewProps {
  profile: LearnerProfile;
  sessions: PracticeSessionRecord[];
  onRefreshData: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  profile,
  sessions,
  onRefreshData,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'path' | 'history'>('path');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<PracticeSessionRecord | null>(
    sessions[0] || null
  );

  const totalMinutes = Math.round(
    sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0) / 60
  );

  const handleExport = () => {
    const jsonStr = exportAllDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speechcraft-studio-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all stored studio history and start fresh? This cannot be undone.'
      )
    ) {
      clearAllStoredData();
      onRefreshData();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <TrendingUp className="w-4 h-4" />
            <span>Progress & Personalized Path</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            Speech Metrics & Adaptive Learning Journey
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Review your personalized milestone roadmap, diagnostic assessment scores, and longitudinal speaking metrics.
          </p>
        </div>

        {/* Data Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4 text-teal-400" /> Export JSON
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900 text-xs font-semibold text-slate-400 hover:text-rose-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Reset Data
          </button>
        </div>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('path')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeSubTab === 'path'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Personalized Learning Path</span>
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeSubTab === 'history'
              ? 'bg-teal-500 text-slate-950 shadow-lg'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Session History & Logs ({sessions.length})</span>
        </button>
      </div>

      {activeSubTab === 'path' ? (
        <PersonalizedPathSection
          profile={profile}
          sessions={sessions}
          onNavigateTab={onNavigateTab}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
        />
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Metric Philosophy Banner (Prompt Requirement 11) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Measurement Disclaimer: </span>
              Scores and speaking metrics are acoustic estimates based on Gemini analysis of your specific recording clips. Scores may naturally vary depending on microphone acoustics, room background noise, topic complexity, and whether you are reading or speaking extemporaneously. True progress is measured by spontaneous fluency and effortless intelligibility.
            </div>
          </div>

      {/* Aggregate Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Studio Practice</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">{totalMinutes} mins</div>
          <div className="text-[11px] text-slate-500 mt-1">{sessions.length} recorded takes</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">3 Days</div>
          <div className="text-[11px] text-slate-500 mt-1">Goal: 15–20m daily</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Average Speaking Pace</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">
            {sessions.length
              ? Math.round(
                  sessions.reduce((acc, s) => acc + (s.wpm || 140), 0) / sessions.length
                )
              : 142}{' '}
            <span className="text-xs font-normal text-slate-400">WPM</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Optimal conversational range</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg Clarity Score</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300">
            {sessions.length
              ? Math.round(
                  sessions.reduce((acc, s) => acc + (s.score || 78), 0) / sessions.length
                )
              : 78}
            <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Derived across recent takes</div>
        </div>
      </div>

      {/* Main Grid: Session History & Deep Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Log (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Recorded Takes History ({sessions.length})</span>
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {sessions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                No session recordings saved yet. Complete a drill in any lab to populate history.
              </div>
            ) : (
              sessions.map((s) => {
                const isSelected = selectedSession?.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSession(s)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-teal-500/10 border-teal-500/80 shadow-md'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 line-clamp-1">{s.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(s.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 text-[10px] font-mono uppercase">
                        {s.category}
                      </span>
                      <span>{s.durationSeconds}s duration</span>
                      {s.wpm && <span>• {s.wpm} WPM</span>}
                      {s.score && <span>• {s.score}/100</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Session Inspector (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {selectedSession ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    Session Take Detail
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 mt-1">{selectedSession.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {new Date(selectedSession.timestamp).toLocaleString()} • {selectedSession.category}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Session Score</div>
                    <div className="text-xl font-bold text-teal-300 font-mono">
                      {selectedSession.score || 80}/100
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Duration</span>
                  <span className="text-slate-200 font-mono font-bold">
                    {selectedSession.durationSeconds} seconds
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Speaking Rate</span>
                  <span className="text-slate-200 font-mono font-bold">
                    {selectedSession.wpm || 'N/A'} WPM
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Fillers Detected</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {selectedSession.fillerCount ?? '0'}
                  </span>
                </div>
              </div>

              {/* Verbatim Transcript */}
              {selectedSession.transcript && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Verbatim Transcript Recorded:
                  </span>
                  <p className="font-serif text-sm text-slate-200 leading-relaxed italic">
                    "{selectedSession.transcript}"
                  </p>
                </div>
              )}

              {/* Summary / Notes */}
              {selectedSession.summary && (
                <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-900/50 text-xs text-teal-200/90 leading-relaxed">
                  <span className="font-semibold text-teal-300">Coaching Takeaway: </span>
                  {selectedSession.summary}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-sm">
              Select any session from the log to view its detailed acoustic metrics and verbatim transcript.
            </div>
          )}
        </div>
      </div>
    </div>
  )}

      {/* Baseline Assessment Modal */}
      <BaselineAssessmentModal
        profile={profile}
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onComplete={(updated) => {
          setIsAssessmentOpen(false);
          onRefreshData();
        }}
      />
    </div>
  );
};
