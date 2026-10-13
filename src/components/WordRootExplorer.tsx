import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  GitBranch,
  BookOpen,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  X,
  RotateCcw,
  Layers,
  Filter,
  ChevronLeft,
  ChevronRight,
  Award,
  Volume2,
} from 'lucide-react';
import { ExpandedRootItem, RootCluster } from '../types/speech';
import { EXPANDED_ROOTS } from '../data/rootsCatalogue';
import {
  markRootLearned,
  markRootExplored,
  toggleRootMastery,
  getVocabBuilderProgress,
} from '../services/vocabBuilderStorage';
import { RootDetailModal } from './RootDetailModal';
import { referenceSpeaker } from '../services/ttsService';

interface WordRootExplorerProps {
  onSelectWord: (wordOrId: string) => void;
  learnedRoots?: string[];
  onRootLearned?: (rootId: string) => void;
}

export const WordRootExplorer: React.FC<WordRootExplorerProps> = ({
  onSelectWord,
  learnedRoots = [],
  onRootLearned,
}) => {
  const [progress, setProgress] = useState(() => getVocabBuilderProgress());

  // Filter & Search states
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'root' | 'meaning' | 'derived'>('root');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;

  // Modal State
  const [selectedRootModal, setSelectedRootModal] = useState<ExpandedRootItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Quiz Mode state
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const refreshProgress = () => {
    setProgress(getVocabBuilderProgress());
  };

  const clusters: { id: string; label: string }[] = [
    { id: 'all', label: 'All Clusters' },
    { id: 'The Human Personality', label: '1. Human Personality' },
    { id: 'Human Relationships, Power, and Society', label: '2. Power & Society' },
    { id: 'Speech, Writing, and Language', label: '3. Speech & Writing' },
    { id: 'Mind, Emotion, and Behavior', label: '4. Mind & Emotion' },
    { id: 'Seeing, Thinking, and Knowing', label: '5. Knowing & Seeing' },
    { id: 'Science, Measurement, and Nature', label: '6. Nature & Science' },
    { id: 'Movement, Action, and Change', label: '7. Movement & Change' },
  ];

  const filteredRoots = useMemo(() => {
    return EXPANDED_ROOTS.filter((r) => {
      const matchesCluster = selectedCluster === 'all' || r.thematicCluster === selectedCluster;
      const matchesOrigin = selectedOrigin === 'all' || r.origin === selectedOrigin;
      const matchesType = selectedType === 'all' || r.type === selectedType;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.root.toLowerCase().includes(q) ||
        r.meaning.toLowerCase().includes(q) ||
        r.anchorWord.toLowerCase().includes(q) ||
        (r.originalForm && r.originalForm.toLowerCase().includes(q)) ||
        r.derivedWordsList.some(
          (dw) => dw.word.toLowerCase().includes(q) || dw.briefDefinition.toLowerCase().includes(q)
        );

      return matchesCluster && matchesOrigin && matchesType && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'root') return a.root.localeCompare(b.root);
      if (sortBy === 'meaning') return a.meaning.localeCompare(b.meaning);
      return b.derivedWordsList.length - a.derivedWordsList.length;
    });
  }, [selectedCluster, selectedOrigin, selectedType, searchQuery, sortBy]);

  // Pagination calculation
  const totalItems = filteredRoots.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedRoots = filteredRoots.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenRootModal = (root: ExpandedRootItem) => {
    markRootExplored(root.id);
    refreshProgress();
    setSelectedRootModal(root);
    setIsModalOpen(true);
  };

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    referenceSpeaker.play(text, 1.0);
  };

  // Interactive 10-Question Quiz dynamically generated from EXPANDED_ROOTS
  const quizQuestions = useMemo(() => {
    return EXPANDED_ROOTS.slice(0, 15).map((root, idx) => {
      const dists = EXPANDED_ROOTS.filter((r) => r.id !== root.id).slice(idx * 2, idx * 2 + 3);
      const options = [root.meaning, ...dists.map((d) => d.meaning)].sort();
      return {
        id: root.id,
        root: root.root,
        origin: root.origin,
        type: root.type || 'root',
        correctMeaning: root.meaning,
        options,
        anchor: root.anchorWord,
        insight: root.historicalInsight,
      };
    });
  }, []);

  const currentQuizItem = quizQuestions[quizIndex % quizQuestions.length];

  const handleAnswerQuiz = (selectedMeaning: string) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(selectedMeaning);
    const isCorrect = selectedMeaning === currentQuizItem.correctMeaning;
    if (isCorrect) {
      markRootLearned(currentQuizItem.id);
      if (onRootLearned) onRootLearned(currentQuizItem.id);
    }
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    refreshProgress();
  };

  const handleNextQuiz = () => {
    setQuizSelectedOption(null);
    setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  const originBadgeColors = {
    Latin: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    Greek: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    Germanic: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Old French': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <GitBranch className="w-4 h-4" />
            <span>Classical Etymology & Affix Explorer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Greek, Latin & Germanic Root Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Master the core Greek and Latin roots, prefixes, and suffixes that form over 65% of advanced English vocabulary. Recognizing roots unlocks thousands of word meanings instantly.
          </p>
        </div>

        {/* Action Toggle for Quiz Mode */}
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
            <span>{isQuizMode ? 'Exit Root Quiz' : 'Take Root Practice Quiz'}</span>
          </button>
        </div>
      </div>

      {/* QUIZ MODE VIEW */}
      {isQuizMode ? (
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Root Matching Challenge
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                Question {quizIndex + 1} of {quizQuestions.length}
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
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {currentQuizItem.origin} {currentQuizItem.type}
              </span>
              <h4 className="text-4xl font-extrabold text-teal-300 font-mono">
                "{currentQuizItem.root}"
              </h4>
              <p className="text-xs text-slate-400">
                Found in anchor word: <span className="text-slate-200 font-semibold italic">{currentQuizItem.anchor}</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 font-semibold text-center">
              Select the correct classical meaning for the root above:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuizItem.options.map((option, idx) => {
                const isSelected = quizSelectedOption === option;
                const isCorrect = option === currentQuizItem.correctMeaning;

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
                    onClick={() => handleAnswerQuiz(option)}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all space-y-1 ${btnStyle}`}
                  >
                    <span className="font-bold block text-sm">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback */}
            {quizSelectedOption && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                  <BookOpen className="w-4 h-4" />
                  <span>Etymological Insight</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-serif">
                  {currentQuizItem.insight}
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
        /* EXPLORER & DIRECTORY VIEW */
        <div className="space-y-5">
          {/* Multi-Tier Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search roots, meanings, origins, or derived words..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              {/* Origin Dropdown */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedOrigin}
                  onChange={(e) => {
                    setSelectedOrigin(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Origins</option>
                  <option value="Latin">Latin Roots</option>
                  <option value="Greek">Greek Roots</option>
                  <option value="Germanic">Germanic Affixes</option>
                  <option value="Old French">Old French</option>
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Types</option>
                  <option value="root">Base Roots</option>
                  <option value="prefix">Prefixes</option>
                  <option value="suffix">Suffixes</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="root">Sort by Root Name</option>
                  <option value="meaning">Sort by Meaning</option>
                  <option value="derived">Sort by Derivations Count</option>
                </select>
              </div>
            </div>

            {/* Cluster Selector Pills */}
            <div className="w-full max-w-full min-w-0 border-t border-slate-800/80 pt-2">
              <div
                role="tablist"
                aria-label="Root Thematic Clusters"
                className="flex items-center gap-2 overflow-x-auto pb-1 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x scroll-smooth"
              >
                {clusters.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCluster(c.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 whitespace-nowrap transition-all border ${
                      selectedCluster === c.id
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
                <div className="w-3 shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Results Summary Banner */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-200">{filteredRoots.length}</strong> classical root and affix entries
            </span>
            <span>Page {validCurrentPage} of {totalPages}</span>
          </div>

          {/* Root Cards Grid */}
          {filteredRoots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedRoots.map((root) => {
                const isMastered = progress.masteredRootIds?.includes(root.id) || progress.rootsLearned.includes(root.id);
                const isExplored = progress.exploredRootIds?.includes(root.id);

                return (
                  <div
                    key={root.id}
                    onClick={() => handleOpenRootModal(root)}
                    className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all space-y-3 flex flex-col justify-between group shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-extrabold text-slate-100 group-hover:text-teal-300 transition-colors font-mono">
                              {root.root}
                            </h4>
                            <button
                              type="button"
                              onClick={(e) => handlePlayAudio(e, root.root)}
                              className="text-slate-500 hover:text-teal-300 p-0.5"
                              title="Hear root"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] font-bold text-teal-300 font-serif block">
                            "{root.meaning}"
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                              originBadgeColors[root.origin] || 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {root.origin}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {root.historicalInsight}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-950 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 text-[10px]">
                        Anchor: <strong className="text-slate-300 italic">{root.anchorWord}</strong>
                      </span>
                      <span className="text-teal-400 font-bold text-[10px]">
                        {root.derivedWordsList.length} Derived Words →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No classical roots matched your query</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCluster('all');
                  setSelectedOrigin('all');
                  setSelectedType('all');
                }}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Clear Search Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <button
                type="button"
                disabled={validCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 disabled:opacity-40 font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span className="text-slate-400">
                Page <strong className="text-slate-200">{validCurrentPage}</strong> of {totalPages}
              </span>

              <button
                type="button"
                disabled={validCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 disabled:opacity-40 font-semibold flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ROOT DETAIL MODAL */}
      <RootDetailModal
        rootItem={selectedRootModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isMastered={selectedRootModal ? progress.masteredRootIds?.includes(selectedRootModal.id) : false}
        onStatusChange={refreshProgress}
        onSelectWord={onSelectWord}
      />
    </div>
  );
};
