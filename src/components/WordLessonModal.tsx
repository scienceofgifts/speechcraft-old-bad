import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Volume2,
  Star,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  GitBranch,
  Lightbulb,
  Layers,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Mic,
} from 'lucide-react';
import { DetailedWordLesson } from '../types/speech';
import { referenceSpeaker } from '../services/ttsService';
import {
  toggleStarWord,
  updateWordMastery,
  recordSelfCheckScore,
} from '../services/vocabBuilderStorage';
import { PracticeAloudModal } from './PracticeAloudModal';

interface WordLessonModalProps {
  lesson: DetailedWordLesson | null;
  isOpen: boolean;
  onClose: () => void;
  isStarred?: boolean;
  isMastered?: boolean;
  isLearning?: boolean;
  onStatusChange?: () => void;
  onSelectRoot?: (rootId: string) => void;
}

export const WordLessonModal: React.FC<WordLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  isStarred = false,
  isMastered = false,
  isLearning = false,
  onStatusChange,
  onSelectRoot,
}) => {
  const [activeTab, setActiveTab] = useState<'definitions' | 'etymology' | 'distinctions' | 'collocations' | 'morphology' | 'examples' | 'quiz'>('definitions');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [starred, setStarred] = useState<boolean>(isStarred);
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  // Stop any active audio and unlock scroll when closing
  useEffect(() => {
    if (!isOpen) {
      referenceSpeaker.stop();
      setPlayingAudioText(null);
    }
  }, [isOpen]);

  // Prevent unwanted background-page scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Ensure modal always opens at the beginning of the lesson
  useEffect(() => {
    if (isOpen && bodyScrollRef.current) {
      bodyScrollRef.current.scrollTop = 0;
    }
  }, [isOpen, lesson?.id, activeTab]);

  // Reset tab, quiz, and star state when switching lessons
  useEffect(() => {
    if (lesson) {
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
      setStarred(isStarred);
      setActiveTab('definitions');
    }
  }, [lesson?.id, isStarred]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !lesson) return null;

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

  const handleToggleStar = () => {
    const newState = toggleStarWord(lesson.id);
    setStarred(newState);
    if (onStatusChange) onStatusChange();
  };

  const handleMasteryToggle = (status: 'learning' | 'mastered') => {
    updateWordMastery(lesson.id, status);
    if (onStatusChange) onStatusChange();
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(optionIdx);
    setQuizSubmitted(true);
    const isCorrect = optionIdx === lesson.selfCheck.correctIndex;
    recordSelfCheckScore(lesson.id, isCorrect);
    if (onStatusChange) onStatusChange();
  };

  const resetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const difficultyColors = {
    Foundational: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Intermediate: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    Advanced: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Mastery: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl relative text-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${difficultyColors[lesson.difficulty]}`}>
                  {lesson.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {lesson.register}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lesson.frequency}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
                  {lesson.word}
                </h2>
                <button
                  type="button"
                  onClick={() => handlePlayAudio(lesson.word)}
                  className={`p-2 rounded-xl transition-colors shadow-sm ${
                    playingAudioText === lesson.word
                      ? 'bg-teal-500 text-slate-950 animate-pulse'
                      : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                  }`}
                  title={playingAudioText === lesson.word ? 'Stop pronunciation' : 'Hear natural pronunciation'}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleStar}
                  className={`p-2 rounded-xl border transition-colors ${
                    starred
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-300'
                  }`}
                  title={starred ? 'Starred word' : 'Star word for review'}
                >
                  <Star className={`w-5 h-5 ${starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPracticeModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-all shadow-sm"
                  title="Practice word aloud"
                >
                  <Mic className="w-4 h-4" /> Practice Aloud
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="italic text-slate-400">{lesson.partOfSpeech}</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-teal-400">{lesson.phoneticIpa}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{lesson.syllables}</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300/90 font-medium">{lesson.stressPattern}</span>
              </div>
            </div>

            {/* Close Button & Quick Actions */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                title="Close lesson"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => handleMasteryToggle('learning')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isLearning && !isMastered
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Learning
                </button>
                <button
                  type="button"
                  onClick={() => handleMasteryToggle('mastered')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isMastered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Mastered
                </button>
              </div>
            </div>
          </div>

          {/* Quick Gloss */}
          <div className="mt-3.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold text-teal-300">Core Meaning: </span>
            {lesson.shortGloss}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto px-6 py-2.5 bg-slate-950 border-b border-slate-800 shrink-0 text-xs font-medium">
          {[
            { id: 'definitions', label: 'Definitions' },
            { id: 'etymology', label: 'Etymology & Roots' },
            { id: 'distinctions', label: 'Word Distinctions' },
            { id: 'collocations', label: 'Natural Usage' },
            { id: 'morphology', label: 'Word Family' },
            { id: 'examples', label: 'Domains & Context' },
            { id: 'quiz', label: 'Interactive Check' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Lesson Body */}
        <div ref={bodyScrollRef} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          {/* 1. DEFINITIONS TAB */}
          {activeTab === 'definitions' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Full Sense Breakdown
                </h3>
                <div className="space-y-3">
                  {lesson.definitions.map((sense, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-mono text-[10px]">
                            {idx + 1}
                          </span>
                          {sense.isPrimary ? 'Primary Sense' : 'Secondary / Domain Sense'}
                        </span>
                        {sense.contextNote && (
                          <span className="text-[11px] text-slate-500 italic">
                            {sense.contextNote}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-100 text-sm leading-relaxed">{sense.definition}</p>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 italic flex items-start justify-between gap-2">
                        <span>"{sense.example}"</span>
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(sense.example)}
                          className="text-teal-400 hover:text-teal-300 shrink-0 p-1"
                          title="Listen to example sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synonyms & Antonyms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Synonyms & Precise Nuances
                  </h4>
                  <div className="space-y-2">
                    {lesson.synonyms.map((syn, idx) => (
                      <div key={idx} className="text-xs space-y-0.5 border-b border-slate-900 pb-2 last:border-0">
                        <span className="font-semibold text-sky-300">{syn.word}</span>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{syn.nuance}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Direct Antonyms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.antonyms.map((ant, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-200"
                      >
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ETYMOLOGY & ROOTS TAB */}
          {activeTab === 'etymology' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Language of Origin & Historical Evolution
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {lesson.etymology.languageOfOrigin}
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-xs md:text-sm">
                  {lesson.etymology.historicalDevelopment}
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Literal Original Meaning: </span>
                    <strong className="text-teal-300 font-serif">"{lesson.etymology.literalOriginalMeaning}"</strong>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Connection to Modern Usage: </span>
                    {lesson.etymology.modernConnection}
                  </div>
                </div>
              </div>

              {/* Word Root Link */}
              <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-800/40 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                    Anchoring Root
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-0.5">
                    Root: <span className="font-mono text-teal-300">{lesson.etymology.rootName}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Cluster: {lesson.cluster}
                  </p>
                </div>
                {onSelectRoot && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectRoot(lesson.etymology.rootId);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>Explore Root</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Memory Aids */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Pedagogical Memory Aids & Mnemonics
                </h4>
                <div className="space-y-2">
                  {lesson.memoryAids.map((aid, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-start gap-2.5"
                    >
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 mt-0.5 ${
                        aid.isEtymological
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {aid.isEtymological ? 'Etymological' : 'Mnemonic Hook'}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{aid.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. WORD DISTINCTIONS TAB ("What makes this word different?") */}
          {activeTab === 'distinctions' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 to-slate-950 border border-sky-800/40">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  What Makes This Word Different?
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  English words that appear interchangeable in dictionaries often carry completely distinct psychological, social, and grammatical nuances.
                </p>
              </div>

              <div className="space-y-4">
                {lesson.distinctions.map((dist, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                      <span className="text-sm font-bold text-slate-100">
                        <span className="text-teal-400">{lesson.word}</span> vs <span className="text-sky-300">{dist.alternativeWord}</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Semantic Contrast</span>
                    </div>

                    <div className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      <strong className="text-teal-300">Central Distinction: </strong>
                      {dist.centralDifference}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-900/40 space-y-1">
                        <span className="font-semibold text-teal-300 block">Use "{lesson.word}" when:</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{dist.targetPreferredWhen}</p>
                        <p className="text-slate-400 italic text-[11px] pt-1">"{dist.targetExample}"</p>
                      </div>

                      <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-900/40 space-y-1">
                        <span className="font-semibold text-sky-300 block">Use "{dist.alternativeWord}" when:</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{dist.alternativePreferredWhen}</p>
                        <p className="text-slate-400 italic text-[11px] pt-1">"{dist.alternativeExample}"</p>
                      </div>
                    </div>

                    {dist.commonMistake && (
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-rose-300">Common Learner Mistake: </strong>
                          {dist.commonMistake}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. COLLOCATIONS & NATURAL USAGE TAB */}
          {activeTab === 'collocations' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Collocations & Natural Word Partnerships
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block">
                      Common Verbs That Pair:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {lesson.collocations.verbs.map((v, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block">
                      Typical Modifiers:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {lesson.collocations.modifiers.map((m, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block mb-2">
                    Idiomatic Frames & Phrases:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {lesson.collocations.idiomaticFrames.map((frame, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                        "{frame}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Natural vs Awkward Usage Contrasts */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Natural vs Awkward Usage Contrasts
                </h4>
                <div className="space-y-2">
                  {lesson.collocations.contrasts.map((c, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[10px] uppercase font-bold text-emerald-400">Natural:</strong>
                          <span>"{c.natural}"</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-rose-300">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[10px] uppercase font-bold text-rose-400">Awkward / Unnatural:</strong>
                          <span>"{c.awkward}"</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. MORPHOLOGY & WORD FAMILY TAB */}
          {activeTab === 'morphology' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Morphological Family & Part-of-Speech Transformations
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Notice how prefixes and suffixes transform the root, frequently shifting the primary syllable stress and vowel qualities.
                </p>
              </div>

              <div className="space-y-3">
                {lesson.morphology.forms.map((form, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-100">{form.form}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-teal-300 border border-slate-700">
                          {form.partOfSpeech}
                        </span>
                      </div>
                      {form.stressShiftNote && (
                        <span className="text-xs text-amber-300 font-mono">
                          {form.stressShiftNote}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{form.definition}</p>
                    <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      "{form.example}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. PRACTICAL DOMAIN EXAMPLES TAB */}
          {activeTab === 'examples' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Practical Sentences Across 5 Professional & Intellectual Domains
                </h3>
              </div>

              <div className="space-y-3">
                {lesson.practicalExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-teal-400 uppercase tracking-wider text-[11px]">
                        {ex.domain}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayAudio(ex.sentence)}
                        className="text-slate-400 hover:text-teal-300 p-1"
                        title="Listen to sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-serif">
                      "{ex.sentence}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. INTERACTIVE QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" /> Immediate Self-Check Question
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                    Type: {lesson.selfCheck.type}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {lesson.selfCheck.prompt}
                </p>

                <div className="space-y-2.5 pt-1">
                  {lesson.selfCheck.options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === lesson.selfCheck.correctIndex;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-teal-950/50 border-teal-500 text-teal-200';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${
                        selectedQuizOption === lesson.selfCheck.correctIndex
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}>
                        {selectedQuizOption === lesson.selfCheck.correctIndex
                          ? '✓ Correct Answer!'
                          : 'Review Feedback:'}
                      </span>
                      <button
                        type="button"
                        onClick={resetQuiz}
                        className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lesson.selfCheck.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      <PracticeAloudModal
        item={{
          id: lesson.id,
          phrase: lesson.word,
          title: lesson.word,
          meaning: lesson.definitions[0]?.definition,
          tone: lesson.register,
          sourceModule: 'vocabulary',
          stressGuidance: lesson.stressPattern,
        }}
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
      />
    </>
  );
};
