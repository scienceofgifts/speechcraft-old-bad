import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Volume2,
  GitBranch,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Award,
  Sparkles,
  Tag,
} from 'lucide-react';
import { ExpandedRootItem } from '../types/speech';
import { referenceSpeaker } from '../services/ttsService';
import { markRootExplored, toggleRootMastery } from '../services/vocabBuilderStorage';

interface RootDetailModalProps {
  rootItem: ExpandedRootItem | null;
  isOpen: boolean;
  onClose: () => void;
  isMastered?: boolean;
  onStatusChange?: () => void;
  onSelectWord?: (wordOrId: string) => void;
}

export const RootDetailModal: React.FC<RootDetailModalProps> = ({
  rootItem,
  isOpen,
  onClose,
  isMastered = false,
  onStatusChange,
  onSelectWord,
}) => {
  const [playingAudio, setPlayingAudio] = React.useState<boolean>(false);
  const [mastered, setMastered] = React.useState<boolean>(isMastered);

  useEffect(() => {
    if (rootItem) {
      setMastered(isMastered);
      markRootExplored(rootItem.id);
    }
  }, [rootItem?.id, isMastered]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !rootItem) return null;

  const handlePlayAudio = (text: string) => {
    if (playingAudio) {
      referenceSpeaker.stop();
      setPlayingAudio(false);
      return;
    }
    setPlayingAudio(true);
    referenceSpeaker.play(
      text,
      1.0,
      () => setPlayingAudio(true),
      () => setPlayingAudio(false)
    );
  };

  const handleToggleMastery = () => {
    toggleRootMastery(rootItem.id);
    setMastered(!mastered);
    if (onStatusChange) onStatusChange();
  };

  const originBadgeColors = {
    Latin: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    Greek: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    Germanic: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Old French': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl relative text-slate-100 flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 shrink-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                    originBadgeColors[rootItem.origin] || 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {rootItem.origin} {rootItem.type || 'root'}
                </span>
                {rootItem.originalForm && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                    Orig: {rootItem.originalForm}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                  {rootItem.thematicCluster}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                  {rootItem.root}
                </h2>
                <button
                  type="button"
                  onClick={() => handlePlayAudio(rootItem.root)}
                  className={`p-2 rounded-xl transition-colors shadow-sm ${
                    playingAudio
                      ? 'bg-teal-500 text-slate-950 animate-pulse'
                      : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                  }`}
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm font-semibold text-teal-300 font-serif">
                Core Meaning: "{rootItem.meaning}"
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleToggleMastery}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  mastered
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${mastered ? 'text-emerald-400' : ''}`} />
                <span>{mastered ? 'Mastered Root' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200 flex-1">
          {/* Historical Insight & Evolution */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Etymological Development & Insight
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-serif">
              {rootItem.historicalInsight}
            </p>

            {rootItem.semanticShiftNote && (
              <div className="mt-2 pt-2 border-t border-slate-900 text-[11px] text-amber-300/90 font-medium">
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400 block mb-0.5">
                  Semantic Evolution Note:
                </span>
                {rootItem.semanticShiftNote}
              </div>
            )}
          </div>

          {/* Derived Vocabulary Words (5+ example words) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-teal-400" /> Derived Vocabulary Words ({rootItem.derivedWordsList.length})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Click word to inspect full record
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rootItem.derivedWordsList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors font-serif">
                          {item.word}
                        </h5>
                        <span className="text-[10px] italic text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {item.pos}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePlayAudio(item.word)}
                        className="text-slate-500 hover:text-teal-300 p-1"
                        title="Hear word"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.briefDefinition}
                    </p>

                    {item.rootContribution && (
                      <p className="text-[11px] text-teal-400/90 font-mono pt-1">
                        Breakdown: {item.rootContribution}
                      </p>
                    )}
                  </div>

                  {onSelectWord && (
                    <div className="pt-2 border-t border-slate-900 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectWord(item.lessonId || item.catalogueId || item.word);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-[11px] flex items-center gap-1 transition-colors border border-teal-500/30"
                      >
                        <span>Study Word</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
