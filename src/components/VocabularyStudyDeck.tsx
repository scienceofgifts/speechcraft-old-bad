import React, { useState } from 'react';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  RotateCcw,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { VocabularyItem } from '../types/speech';
import { referenceSpeaker } from '../services/ttsService';

interface VocabularyStudyDeckProps {
  items: VocabularyItem[];
  onStatusChange: (id: string, status: 'new' | 'learning' | 'mastered') => void;
  onOpenStudio?: (item: VocabularyItem) => void;
}

export const VocabularyStudyDeck: React.FC<VocabularyStudyDeckProps> = ({
  items,
  onStatusChange,
  onOpenStudio,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealLevel, setRevealLevel] = useState<number>(0); // 0: term, 1: meaning, 2: example, 3: prompt
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
        <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-200">No expressions match your current filter</h3>
        <p className="text-xs text-slate-400">Try adjusting your category or search query to start studying.</p>
      </div>
    );
  }

  const currentItem = items[currentIndex % items.length];

  const handlePlayAudio = (text: string) => {
    if (playingAudioText === text) {
      referenceSpeaker.stop();
      setPlayingAudioText(null);
      return;
    }
    setPlayingAudioText(text);
    referenceSpeaker.play(
      text,
      1.0,
      () => setPlayingAudioText(text),
      () => setPlayingAudioText(null)
    );
  };

  const handleNext = () => {
    setRevealLevel(0);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setRevealLevel(0);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleRevealMore = () => {
    if (revealLevel < 3) {
      setRevealLevel((prev) => prev + 1);
    }
  };

  const handleResetCard = () => {
    setRevealLevel(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Progress & Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-teal-400">Study Mode</span>
          <span>•</span>
          <span>
            Card {currentIndex + 1} of {items.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
              currentItem.status === 'mastered'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : currentItem.status === 'learning'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {currentItem.status}
          </span>
          <button
            onClick={handleResetCard}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200"
            title="Reset card view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Container with Progressive Disclosure */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Step 1: Term & Pronunciation */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-800/80">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 mb-1">
            {currentItem.category.toUpperCase()} • {currentItem.register}
          </div>
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 font-serif tracking-tight">
              {currentItem.term}
            </h2>
            <button
              onClick={() => handlePlayAudio(currentItem.term)}
              className={`p-2 rounded-xl transition-all ${
                playingAudioText === currentItem.term
                  ? 'bg-teal-500 text-slate-950 animate-pulse'
                  : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
              }`}
              title="Hear Pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <div className="font-mono text-xs text-teal-400">{currentItem.phonetic}</div>
        </div>

        {/* Step 2: Meaning & Vague Alternative (Revealed at level >= 1) */}
        {revealLevel >= 1 ? (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 block">
                Plain-English Meaning & Context
              </span>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">{currentItem.meaning}</p>
            </div>

            {currentItem.vagueAlternative && (
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-xs flex items-start gap-2">
                <span className="font-semibold text-rose-300 shrink-0">Avoid Vague Fluff:</span>
                <span className="text-slate-400 italic">"{currentItem.vagueAlternative}"</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <button
              onClick={handleRevealMore}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all flex items-center gap-2 mx-auto"
            >
              <Eye className="w-4 h-4 text-teal-400" /> Reveal Meaning (Try to recall first)
            </button>
          </div>
        )}

        {/* Step 3: Natural Example & Collocations (Revealed at level >= 2) */}
        {revealLevel >= 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-900/50 space-y-2">
              <div className="flex items-center justify-between text-xs text-teal-400">
                <span className="font-semibold uppercase tracking-wider">Natural Usage Example</span>
                <button
                  onClick={() => handlePlayAudio(currentItem.naturalExample)}
                  className="flex items-center gap-1 text-teal-300 hover:text-teal-200 font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen Model
                </button>
              </div>
              <p className="font-serif text-sm md:text-base text-teal-100/90 leading-relaxed">
                "{currentItem.naturalExample}"
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Common Collocations:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentItem.collocations.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Speaking Prompt (Revealed at level >= 3) */}
        {revealLevel >= 3 && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
              Active Speaking Prompt:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentItem.speakingPrompt} Use <strong className="text-teal-300">"{currentItem.term}"</strong> naturally.
            </p>
            {onOpenStudio && (
              <button
                type="button"
                onClick={() => onOpenStudio(currentItem)}
                className="mt-2 w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Practice in Speech Studio Recorder
              </button>
            )}
          </div>
        )}

        {/* Reveal button if not fully revealed */}
        {revealLevel < 3 && (
          <div className="text-center pt-2">
            <button
              onClick={handleRevealMore}
              className="px-5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold transition-all border border-teal-500/40 flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" /> Reveal Next Section ({revealLevel}/3)
            </button>
          </div>
        )}
      </div>

      {/* Footer Controls: Navigation & Learning Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={handleNext}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Mark Status:</span>
          {(['new', 'learning', 'mastered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                onStatusChange(currentItem.id, st);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                currentItem.status === st
                  ? 'bg-teal-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
