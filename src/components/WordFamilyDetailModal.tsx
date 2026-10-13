import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Volume2,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { WordFamilyItem } from '../types/speech';
import { referenceSpeaker } from '../services/ttsService';
import { markFamilyExplored, toggleFamilyMastery } from '../services/vocabBuilderStorage';

interface WordFamilyDetailModalProps {
  familyItem: WordFamilyItem | null;
  isOpen: boolean;
  onClose: () => void;
  isMastered?: boolean;
  onStatusChange?: () => void;
  onSelectWord?: (wordOrId: string) => void;
}

export const WordFamilyDetailModal: React.FC<WordFamilyDetailModalProps> = ({
  familyItem,
  isOpen,
  onClose,
  isMastered = false,
  onStatusChange,
  onSelectWord,
}) => {
  const [playingAudio, setPlayingAudio] = React.useState<boolean>(false);
  const [mastered, setMastered] = React.useState<boolean>(isMastered);

  useEffect(() => {
    if (familyItem) {
      setMastered(isMastered);
      markFamilyExplored(familyItem.id);
    }
  }, [familyItem?.id, isMastered]);

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

  if (!isOpen || !familyItem) return null;

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
    toggleFamilyMastery(familyItem.id);
    setMastered(!mastered);
    if (onStatusChange) onStatusChange();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative text-slate-100 flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 shrink-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Word Family
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                  Stem: {familyItem.baseStem}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {familyItem.cluster}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-serif tracking-tight">
                  {familyItem.familyHeadword} Family
                </h2>
                <button
                  type="button"
                  onClick={() => handlePlayAudio(familyItem.familyHeadword)}
                  className={`p-2 rounded-xl transition-colors shadow-sm ${
                    playingAudio
                      ? 'bg-teal-500 text-slate-950 animate-pulse'
                      : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                  }`}
                  title="Listen to headword"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-amber-300/90 font-mono">
                Suffix Patterns: {familyItem.suffixPatternsNote}
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
                <span>{mastered ? 'Mastered Family' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200 flex-1">
          {/* 4-Part Morphological Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-teal-400" /> Morphological Member Forms ({familyItem.forms.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {familyItem.forms.map((form, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-100 font-serif">{form.word}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-teal-300 border border-slate-800">
                          {form.partOfSpeech}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePlayAudio(form.word)}
                        className="text-slate-400 hover:text-teal-300 p-1"
                        title="Hear pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {form.phoneticIpa && (
                      <p className="text-[11px] font-mono text-teal-400">
                        {form.phoneticIpa} {form.stressShiftNote ? `• ${form.stressShiftNote}` : ''}
                      </p>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed">{form.definition}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 space-y-2">
                    <p className="text-[11px] text-slate-400 italic">"{form.example}"</p>

                    {onSelectWord && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectWord(form.lessonId || form.catalogueId || form.word);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[11px] font-semibold flex items-center gap-1 transition-colors border border-teal-500/30"
                        >
                          <span>Open Lesson</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Distinctions & Common Mistakes */}
          {familyItem.distinctionsAndMistakes && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Usage Distinctions & Common Pitfalls
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider">
                    Key Distinction ({familyItem.distinctionsAndMistakes.nearSynonymOrForm}):
                  </span>
                  <p className="text-slate-300">{familyItem.distinctionsAndMistakes.keyDifference}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-300 block text-[11px] uppercase tracking-wider">
                    Common Mistake to Avoid:
                  </span>
                  <p className="text-slate-300">{familyItem.distinctionsAndMistakes.commonMistake}</p>
                </div>
              </div>

              {familyItem.distinctionsAndMistakes.collocationNote && (
                <p className="text-xs text-teal-300/90 font-medium pt-1">
                  Collocation Tip: {familyItem.distinctionsAndMistakes.collocationNote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
