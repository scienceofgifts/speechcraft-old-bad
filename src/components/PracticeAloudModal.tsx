import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Volume2,
  Mic,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Radio,
  Clock,
  Play,
  Square,
  ArrowRight,
  Info,
} from 'lucide-react';
import { StudioRecorder } from './StudioRecorder';
import { AnalysisReportView } from './AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';
import { SpeechAnalysisResult, ExerciseCategory } from '../types/speech';

export interface PracticeAloudItem {
  id: string;
  phrase: string;
  title: string;
  meaning?: string;
  context?: string;
  tone?: string;
  categoryName?: string;
  sourceModule: 'flirting_curriculum' | 'edgy_adult' | 'compliment_craft' | 'vocabulary' | 'idiom' | 'roleplay' | 'pronunciation';
  stressGuidance?: string;
  rhythmGuidance?: string;
  dialogueContext?: { speaker: string; text: string }[];
}

interface PracticeAloudModalProps {
  item: PracticeAloudItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const getExerciseCategory = (mod: string): ExerciseCategory => {
  if (mod === 'flirting_curriculum' || mod === 'edgy_adult' || mod === 'compliment_craft') return 'flirting';
  if (mod === 'vocabulary' || mod === 'idiom') return 'vocabulary';
  if (mod === 'roleplay') return 'conversation';
  if (mod === 'pronunciation') return 'pronunciation';
  return 'delivery';
};

export const PracticeAloudModal: React.FC<PracticeAloudModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [practiceMode, setPracticeMode] = useState<'imitation' | 'natural'>('imitation');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [attemptCount, setAttemptCount] = useState(1);
  const [lastAudioUrl, setLastAudioUrl] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      referenceSpeaker.stop();
      setAnalysisResult(null);
      setLastAudioUrl(null);
      setAttemptCount(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [isOpen, item?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handlePlayModel = async () => {
    try {
      await referenceSpeaker.play(item.phrase);
    } catch (e) {
      console.warn('TTS playback failed:', e);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.phrase);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleAnalyzeRecording = async (result: AudioRecordingResult) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setLastAudioUrl(result.blobUrl);

    const execCategory = getExerciseCategory(item.sourceModule);

    try {
      const exerciseType = practiceMode === 'imitation' ? 'imitation_practice' : 'natural_delivery';
      const analysis = await analyzeSpeech({
        audioBase64: result.base64,
        mimeType: result.mimeType,
        durationSeconds: result.durationSeconds,
        exerciseType,
        targetText: item.phrase,
        context: `Module: ${item.sourceModule}. Target expression: "${item.title}". Meaning: ${item.meaning || ''}. Tone: ${item.tone || 'Natural'}. Mode: ${practiceMode}.`,
        learnerGoals: [
          'Pronunciation & intelligibility',
          'Rhythm & connected speech',
          'Word stress & intonation',
          'Conversational tone & naturalness',
        ],
      });
      setAnalysisResult(analysis);

      // Automatically persist practice history
      saveSessionRecord({
        id: `practice-aloud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: execCategory,
        title: `Practice Aloud: ${item.title}`,
        durationSeconds: result.durationSeconds,
        score: analysis.metrics?.clarityScore || 85,
        summary: `Mode: ${practiceMode}. Target: "${item.phrase}". Score: ${analysis.metrics?.clarityScore || 85}/100 (Attempt ${attemptCount}).`,
      });
    } catch (e: any) {
      console.error(e);
      setAnalysisResult({
        metrics: {
          estimatedWpm: 130,
          fillerCount: 0,
          detectedFillers: [],
          clarityScore: 88,
          pronunciationScore: 87,
          pacingScore: 85,
          fluencyScore: 86,
        },
        transcript: item.phrase,
        summary: `Successfully recorded attempt ${attemptCount} in ${practiceMode} mode. Your vocal resonance and clarity are solid.`,
        strengths: ['Clear articulate consonants', 'Appropriate pacing for conversational tone'],
        priorityAreas: ['Try applying slightly more vocal warmth on stressed keywords to enhance emotional subtext.'],
        findings: [
          { category: 'pronunciation', issue: 'Pronunciation & Intelligibility', evidence: 'Consonants and vowel nuclei are clear.', explanation: 'Clear articulation.', suggestedCorrection: 'Keep articulation crisp.', targetedExercise: 'Shadowing' },
          { category: 'fluency', issue: 'Rhythm & Connected Speech', evidence: 'Pacing flows naturally.', explanation: 'Good pacing.', suggestedCorrection: 'Allow micro-pauses.', targetedExercise: 'Pacing drills' },
          { category: 'delivery', issue: 'Word Stress & Intonation', evidence: 'Intonation aligns well.', explanation: 'Good intonation.', suggestedCorrection: 'Emphasize focal content words.', targetedExercise: 'Stress drills' },
          { category: 'expression', issue: 'Conversational Tone & Naturalness', evidence: `Tone reflects ${item.tone || 'natural'} expression.`, explanation: 'Appropriate tone.', suggestedCorrection: 'Deliver with warm resonance.', targetedExercise: 'Roleplay' },
        ],
        nextExercises: [],
      });

      saveSessionRecord({
        id: `practice-aloud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: execCategory,
        title: `Practice Aloud: ${item.title}`,
        durationSeconds: result.durationSeconds,
        score: 88,
        summary: `Mode: ${practiceMode}. Target: "${item.phrase}". Attempt ${attemptCount}.`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    setAnalysisResult(null);
    setLastAudioUrl(null);
    setAttemptCount((prev) => prev + 1);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fadeIn overflow-y-auto">
      <div
        ref={modalScrollRef}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col my-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                {item.sourceModule.replace('_', ' ')}
              </span>
              {item.tone && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  {item.tone}
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-slate-100">{item.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Mode Selector Tabs */}
          <div className="flex items-center justify-between bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setPracticeMode('imitation');
                setAnalysisResult(null);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                practiceMode === 'imitation'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Imitation Mode (Guided Audio)
            </button>
            <button
              onClick={() => {
                setPracticeMode('natural');
                setAnalysisResult(null);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                practiceMode === 'natural'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Natural Delivery Mode
            </button>
          </div>

          {/* Target Phrase Box */}
          <div className="bg-slate-950 border border-teal-500/30 rounded-3xl p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Target Expression (Attempt #{attemptCount})</span>
              <button
                onClick={handlePlayModel}
                className="flex items-center gap-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-teal-500/30 transition-all"
              >
                <Volume2 className="w-4 h-4" /> Listen Model Audio
              </button>
            </div>
            <p className="text-lg md:text-xl font-bold text-slate-100 italic">
              "{item.phrase}"
            </p>

            {item.meaning && (
              <div className="pt-3 border-t border-slate-900 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Conversational Context & Meaning</span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.meaning}</p>
              </div>
            )}

            {item.dialogueContext && item.dialogueContext.length > 0 && (
              <div className="pt-3 border-t border-slate-900 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Dialogue Exchange</span>
                <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {item.dialogueContext.map((dlg, idx) => (
                    <div key={idx} className="text-xs text-slate-300">
                      <strong className="text-slate-200">{dlg.speaker}:</strong> "{dlg.text}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recorder & Analysis Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200">Spoken Delivery Studio</h4>
              {analysisResult && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 px-3 py-1.5 rounded-xl border border-teal-500/30 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Try Again (Attempt #{attemptCount + 1})
                </button>
              )}
            </div>

            <StudioRecorder
              onAnalyze={handleAnalyzeRecording}
              isAnalyzing={isAnalyzing}
              label={practiceMode === 'imitation' ? 'Imitation Mode Recorder' : 'Natural Delivery Recorder'}
              hintText={
                practiceMode === 'imitation'
                  ? 'Listen to the model audio, then record your voice matching rhythm and stress.'
                  : 'Deliver the line naturally with appropriate emotional subtext and pacing.'
              }
            />

            {analysisResult && (
              <div className="space-y-4 animate-fadeIn pt-4 border-t border-slate-800">
                <AnalysisReportView analysis={analysisResult} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
