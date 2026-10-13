import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Mic,
  Shield,
  Volume2,
  Clock,
  Trash2,
  Download,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { LearnerProfile, AccentType } from '../types/speech';
import { saveStoredProfile, clearAllStoredData, exportAllDataAsJson } from '../services/storage';
import {
  GEMINI_FLASH_MODELS,
  DEFAULT_GEMINI_MODEL_ID,
  getModelConfig,
  SPECIALIZED_SERVICE_MODELS,
} from '../config/modelConfig';

interface SettingsViewProps {
  profile: LearnerProfile;
  onProfileUpdate: (updated: LearnerProfile) => void;
  onRetakeAssessment: () => void;
  onRefreshData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onProfileUpdate,
  onRetakeAssessment,
  onRefreshData,
}) => {
  const [dailyDuration, setDailyDuration] = useState<number>(profile.dailyDurationMinutes || 18);
  const [targetAccent, setTargetAccent] = useState<AccentType>(profile.targetAccent);
  const [selectedGeminiModel, setSelectedGeminiModel] = useState<string>(
    profile.selectedGeminiModel || DEFAULT_GEMINI_MODEL_ID
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleModelChange = (newModelId: string) => {
    setSelectedGeminiModel(newModelId);
    const updated: LearnerProfile = {
      ...profile,
      dailyDurationMinutes: dailyDuration,
      targetAccent,
      selectedGeminiModel: newModelId,
    };
    saveStoredProfile(updated);
    onProfileUpdate(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSavePreferences = () => {
    const updated: LearnerProfile = {
      ...profile,
      dailyDurationMinutes: dailyDuration,
      targetAccent,
      selectedGeminiModel,
    };
    saveStoredProfile(updated);
    onProfileUpdate(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

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

  const handleResetData = () => {
    if (
      window.confirm(
        'Warning: This will delete all locally stored session records, profile metrics, and learned vocabulary. Continue?'
      )
    ) {
      clearAllStoredData();
      onRefreshData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
          <SettingsIcon className="w-4 h-4" />
          <span>Studio Configuration</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
          Settings & Audio Privacy
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Configure your General American target phonology, daily training duration, microphone permissions, and local data persistence.
        </p>
      </div>

      {/* Target Accent Configuration */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">Target Spoken Accent Model</h3>
            <p className="text-xs text-slate-400">The phonological reference standard used for audio evaluation</p>
          </div>
          <Volume2 className="w-5 h-5 text-teal-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'General American English' as AccentType,
              title: 'General American (GenAm)',
              desc: 'Standard North American broadcast standard. Strong rhotic R and intervocalic flap T.',
            },
            {
              id: 'Standard American (West Coast)' as AccentType,
              title: 'West Coast Standard',
              desc: 'Modern conversational tone with open front vowels and relaxed cadence.',
            },
            {
              id: 'Midwestern General American' as AccentType,
              title: 'Midwestern Standard',
              desc: 'Classic articulate acoustic model with neutral vowel positions.',
            },
          ].map((acc) => (
            <button
              key={acc.id}
              onClick={() => setTargetAccent(acc.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                targetAccent === acc.id
                  ? 'bg-teal-500/10 border-teal-500 text-teal-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-sm text-slate-100">{acc.title}</div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">{acc.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Model Configuration */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-400" />
              AI Model Configuration
            </h3>
            <p className="text-xs text-slate-400">
              Configure the current Gemini model powering speech analysis, feedback, and curriculum generation
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Verified Available
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Active Gemini Model
            </label>
            <select
              value={selectedGeminiModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-100 font-semibold focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
            >
              {GEMINI_FLASH_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-slate-900 text-slate-100">
                  {m.displayName} {m.isDefault ? '(DEFAULT)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Model Capability Details */}
          {(() => {
            const activeModelConfig = getModelConfig(selectedGeminiModel);
            return (
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    Selected Model: {activeModelConfig.displayName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    ID: {activeModelConfig.apiModelId}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModelConfig.description}
                </p>

                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Feature Compatibility & Operation Scope:
                  </div>
                  <div>• Speech Analysis & Phonetic Scoring: Active on server requests.</div>
                  <div>• Conversation Coaching & Feedback: Active on server requests.</div>
                  <div>• Multimodal Audio Input: Supported via direct audio buffer streaming.</div>
                  <div className="pt-1 text-slate-400 text-[10px] leading-tight border-t border-slate-800/60 mt-1">
                    * Note: Text-to-Speech reference audio uses dedicated voice models (<code className="text-teal-300">{SPECIALIZED_SERVICE_MODELS.tts.primary}</code>) to preserve consistent General American pronunciation standards.
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Daily Training Commitment */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">Daily Training Duration</h3>
            <p className="text-xs text-slate-400">Target practice time for the personalized daily routine</p>
          </div>
          <Clock className="w-5 h-5 text-teal-400" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[15, 18, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => setDailyDuration(mins)}
              className={`p-4 rounded-2xl border text-center transition-all ${
                dailyDuration === mins
                  ? 'bg-teal-500/10 border-teal-500 text-teal-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-lg font-bold font-mono">{mins} Minutes</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {mins === 18 ? 'Recommended (5 Parts)' : mins === 15 ? 'Express Routine' : 'Extended Mastery'}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSavePreferences}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
              </>
            ) : (
              'Save Configuration'
            )}
          </button>
        </div>
      </div>

      {/* Audio Privacy & In-Memory Handling (Section 13) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">Audio Privacy & Security</h3>
            <p className="text-xs text-slate-400">Strict in-memory processing guarantees</p>
          </div>
          <Shield className="w-5 h-5 text-teal-400" />
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">On-Demand Microphone Access: </span>
              Your microphone is activated only when you explicitly press the Record button, and releases immediately upon stop.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">In-Memory Buffering: </span>
              Recordings reside in browser memory and are dispatched to the server-side Gemini audio engine solely for transcription and acoustic coaching analysis. No audio is retained or indexed permanently without explicit consent.
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Server-Side Proxy Security: </span>
              All Gemini API credentials reside strictly in server-side environment variables and are never transmitted to client bundles.
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic & Data Management */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">Diagnostic & Data Management</h3>
            <p className="text-xs text-slate-400">
              Acoustic assessment baseline: {profile.assessmentCompleted ? (
                <span className="text-emerald-400 font-semibold">Completed ({new Date(profile.initialAssessment?.date || '').toLocaleDateString()})</span>
              ) : (
                <span className="text-amber-400 font-semibold">Not Completed (Skipped)</span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={onRetakeAssessment}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-left transition-all space-y-1"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <RefreshCw className="w-4 h-4" /> {profile.assessmentCompleted ? 'Retake Diagnostic' : 'Complete Initial Assessment'}
            </div>
            <p className="text-[11px] text-slate-400">
              {profile.assessmentCompleted
                ? 'Run the 4-task acoustic diagnostic to recalibrate your baseline.'
                : 'Calibrate your speech baseline with the 4-task microphone diagnostic.'}
            </p>
          </button>

          <button
            onClick={handleExport}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-left transition-all space-y-1"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
              <Download className="w-4 h-4" /> Export Studio Data
            </div>
            <p className="text-[11px] text-slate-400">
              Download your complete session history, metrics, and vocabulary as JSON.
            </p>
          </button>

          <button
            onClick={handleResetData}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-rose-900 text-left transition-all space-y-1 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <Trash2 className="w-4 h-4" /> Clear All History
            </div>
            <p className="text-[11px] text-slate-400 group-hover:text-rose-300">
              Permanently wipe all locally cached sessions and progress records.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
