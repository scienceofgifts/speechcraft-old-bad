import React, { useState, useMemo, useEffect } from 'react';
import {
  Layers,
  GitBranch,
  Volume2,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  HelpCircle,
} from 'lucide-react';
import { WordFamilyItem } from '../types/speech';
import { WORD_FAMILIES_CATALOGUE } from '../data/wordFamiliesCatalogue';
import { WordFamilyDetailModal } from './WordFamilyDetailModal';
import { familyCacheDB } from '../services/familyCacheDB';
import { generateFamilyEnrichment } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import {
  getVocabBuilderProgress,
  markFamilyExplored,
} from '../services/vocabBuilderStorage';

interface MorphologyMatrixViewProps {
  onSelectWord: (wordOrId: string) => void;
}

export const MorphologyMatrixView: React.FC<MorphologyMatrixViewProps> = ({ onSelectWord }) => {
  const [progress, setProgress] = useState(() => getVocabBuilderProgress());
  const [cachedFamilies, setCachedFamilies] = useState<Record<string, WordFamilyItem>>({});

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [selectedPosFilter, setSelectedPosFilter] = useState<string>('all');

  // Modal State
  const [selectedFamilyModal, setSelectedFamilyModal] = useState<WordFamilyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // AI Generation State for uncatalogued families
  const [aiGeneratingWord, setAiGeneratingWord] = useState<string>('');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Quiz Mode State
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Load saved AI generated families on mount
  useEffect(() => {
    familyCacheDB.getAll().then((saved) => {
      if (saved) setCachedFamilies(saved);
    });
  }, []);

  const refreshProgress = () => {
    setProgress(getVocabBuilderProgress());
  };

  const allFamilies = useMemo(() => {
    const list = [...WORD_FAMILIES_CATALOGUE];
    Object.values(cachedFamilies).forEach((f) => {
      if (!list.some((existing) => existing.id === f.id)) {
        list.push(f);
      }
    });
    return list;
  }, [cachedFamilies]);

  const filteredFamilies = useMemo(() => {
    return allFamilies.filter((fam) => {
      const matchesCluster = selectedCluster === 'all' || fam.cluster === selectedCluster;

      let matchesPos = true;
      if (selectedPosFilter !== 'all') {
        matchesPos = fam.forms.some((f) => f.partOfSpeech.toLowerCase() === selectedPosFilter.toLowerCase());
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        fam.familyHeadword.toLowerCase().includes(q) ||
        fam.baseStem.toLowerCase().includes(q) ||
        fam.forms.some((f) => f.word.toLowerCase().includes(q) || f.definition.toLowerCase().includes(q));

      return matchesCluster && matchesPos && matchesSearch;
    });
  }, [allFamilies, selectedCluster, selectedPosFilter, searchQuery]);

  const handleOpenFamilyModal = (family: WordFamilyItem) => {
    markFamilyExplored(family.id);
    refreshProgress();
    setSelectedFamilyModal(family);
    setIsModalOpen(true);
  };

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    referenceSpeaker.play(text, 1.0);
  };

  const handleGenerateFamilyAi = async () => {
    if (!aiGeneratingWord.trim() || isAiGenerating) return;
    setIsAiGenerating(true);
    setAiError(null);

    try {
      const generated = await generateFamilyEnrichment(aiGeneratingWord.trim());
      await familyCacheDB.set(generated);
      setCachedFamilies((prev) => ({ ...prev, [generated.id]: generated }));
      setSelectedFamilyModal(generated);
      setIsModalOpen(true);
      setAiGeneratingWord('');
    } catch (err: any) {
      setAiError(err.message || 'Failed to generate word family. Please retry.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Interactive Word Family Quiz Questions (sentence form choice)
  const familyQuizQuestions = [
    {
      prompt: 'Complete the sentence with the correct word form: "In times of economic crisis, the prime minister proved to be a shrewd ________."',
      options: ['pragmatic', 'pragmatist', 'pragmatically', 'pragmatism'],
      correctOption: 'pragmatist',
      explanation: 'The sentence requires a noun referring to a person ("pragmatist") following the article "a".',
    },
    {
      prompt: 'Choose the correct form: "Her ________ approach transformed the complex financial dataset into clear strategic insights."',
      options: ['analysis', 'analytical', 'analyze', 'analyst'],
      correctOption: 'analytical',
      explanation: 'The sentence requires an adjective ("analytical") to modify the noun "approach".',
    },
    {
      prompt: 'Select the correct form: "Great leaders demonstrate genuine ________ toward their team members during challenging periods."',
      options: ['empathetic', 'empathize', 'empathy', 'empathetically'],
      correctOption: 'empathy',
      explanation: 'The sentence requires a direct object noun ("empathy") following the verb "demonstrate".',
    },
    {
      prompt: 'Choose the correct form: "The report ________ three potential strategies for entering international markets."',
      options: ['delineation', 'delineate', 'delineates', 'delineative'],
      correctOption: 'delineates',
      explanation: 'The sentence requires a third-person singular present verb ("delineates") agreeing with subject "the report".',
    },
    {
      prompt: 'Select the correct form: "Researchers must ________ findings across dozens of clinical trials to form a coherent theory."',
      options: ['synthesis', 'synthetic', 'synthesize', 'synthesizer'],
      correctOption: 'synthesize',
      explanation: 'The sentence requires an infinitive verb ("synthesize") following the modal verb "must".',
    },
  ];

  const currentQuizItem = familyQuizQuestions[quizIndex % familyQuizQuestions.length];

  const handleAnswerQuiz = (opt: string) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(opt);
    const isCorrect = opt === currentQuizItem.correctOption;
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    refreshProgress();
  };

  const handleNextQuiz = () => {
    setQuizSelectedOption(null);
    setQuizIndex((prev) => (prev + 1) % familyQuizQuestions.length);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Layers className="w-4 h-4" />
            <span>Word Families & Morphological Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            4-Part Morphological Word Family Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Explore complete morphological word families across Noun, Verb, Adjective, and Adverb forms. Master stress shifts, suffix derivations, and precise grammatical usage.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsQuizMode(!isQuizMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${
              isQuizMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isQuizMode ? 'Exit Family Practice' : 'Word Family Practice Quiz'}</span>
          </button>
        </div>
      </div>

      {/* QUIZ MODE VIEW */}
      {isQuizMode ? (
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Grammatical Choice Challenge
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                Question {quizIndex + 1} of {familyQuizQuestions.length}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Current Score</span>
              <span className="text-lg font-bold text-teal-400 font-mono">
                {quizScore.correct} / {quizScore.total} ({quizScore.total > 0 ? Math.round((quizScore.correct / quizScore.total) * 100) : 0}%)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-100 leading-relaxed font-serif">
                {currentQuizItem.prompt}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuizItem.options.map((opt, idx) => {
                const isSelected = quizSelectedOption === opt;
                const isCorrect = opt === currentQuizItem.correctOption;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                if (quizSelectedOption) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-slate-950 border-slate-900 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!!quizSelectedOption}
                    onClick={() => handleAnswerQuiz(opt)}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all ${btnStyle}`}
                  >
                    <span className="font-bold block text-sm">{opt}</span>
                  </button>
                );
              })}
            </div>

            {quizSelectedOption && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Grammatical Explanation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-serif">
                  {currentQuizItem.explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* DIRECTORY VIEW */
        <div className="space-y-5">
          {/* Search & AI Family Generator Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search word families, stems, derived forms..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              {/* On-Demand AI Generator for Uncatalogued Words */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={aiGeneratingWord}
                  onChange={(e) => setAiGeneratingWord(e.target.value)}
                  placeholder="Generate family for any word..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={handleGenerateFamilyAi}
                  disabled={!aiGeneratingWord.trim() || isAiGenerating}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs disabled:opacity-50 shrink-0 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                  <span>{isAiGenerating ? 'Generating...' : 'AI Enrich'}</span>
                </button>
              </div>
            </div>

            {aiError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {aiError}
              </div>
            )}
          </div>

          {/* Families Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFamilies.map((fam) => (
              <div
                key={fam.id}
                onClick={() => handleOpenFamilyModal(fam)}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all space-y-4 flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xl font-extrabold text-slate-100 group-hover:text-teal-300 transition-colors font-serif">
                        {fam.familyHeadword} Family
                      </h4>
                      <p className="text-[11px] font-mono text-teal-400 mt-0.5">
                        Stem: {fam.baseStem} • {fam.cluster}
                      </p>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950 text-slate-400 border border-slate-800">
                      {fam.forms.length} Forms
                    </span>
                  </div>

                  <p className="text-xs text-amber-300/90 font-mono text-[11px]">
                    Pattern: {fam.suffixPatternsNote}
                  </p>
                </div>

                {/* Form Badges Preview */}
                <div className="pt-2 border-t border-slate-950 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {fam.forms.map((f, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl text-[11px] bg-slate-950 border border-slate-800 text-slate-200 font-medium"
                      >
                        <strong className="text-teal-400 font-mono uppercase text-[9px] mr-1">
                          {f.partOfSpeech.slice(0, 3)}:
                        </strong>
                        {f.word}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end pt-1">
                    <span className="text-[11px] font-bold text-teal-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Inspect Morphological Matrix →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORD FAMILY DETAIL MODAL */}
      <WordFamilyDetailModal
        familyItem={selectedFamilyModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMastered={selectedFamilyModal ? progress.masteredFamilyIds?.includes(selectedFamilyModal.id) : false}
        onStatusChange={refreshProgress}
        onSelectWord={onSelectWord}
      />
    </div>
  );
};
