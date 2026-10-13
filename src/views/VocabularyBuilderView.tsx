import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  GitBranch,
  Layers,
  Award,
  Star,
  Shuffle,
  Volume2,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  Brain,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Tag,
} from 'lucide-react';
import { LearnerProfile, DetailedWordLesson, VocabularyCatalogueItem } from '../types/speech';
import { DETAILED_WORD_LESSONS, WORD_ROOTS } from '../data/vocabBuilderData';
import { VOCABULARY_CATALOGUE } from '../data/vocabularyCatalogue';
import {
  getVocabBuilderProgress,
  markWordExplored,
  toggleStarWord,
} from '../services/vocabBuilderStorage';
import { referenceSpeaker } from '../services/ttsService';
import { lessonCacheDB } from '../services/lessonCacheDB';
import { WordLessonModal } from '../components/WordLessonModal';
import { CatalogueWordModal } from '../components/CatalogueWordModal';
import { WordRootExplorer } from '../components/WordRootExplorer';
import { MorphologyMatrixView } from '../components/MorphologyMatrixView';
import { VocabPracticeReview } from '../components/VocabPracticeReview';

interface VocabularyBuilderViewProps {
  profile: LearnerProfile;
}

export const VocabularyBuilderView: React.FC<VocabularyBuilderViewProps> = ({ profile }) => {
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'roots' | 'morphology' | 'practice' | 'saved'>('home');
  const [progress, setProgress] = useState(() => getVocabBuilderProgress());

  // Modal states
  const [selectedLesson, setSelectedLesson] = useState<DetailedWordLesson | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false);
  const [selectedCatalogueItem, setSelectedCatalogueItem] = useState<VocabularyCatalogueItem | null>(null);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState<boolean>(false);
  const [generatedLessons, setGeneratedLessons] = useState<Record<string, DetailedWordLesson>>({});

  // Load saved AI generated lessons from IndexedDB / storage
  useEffect(() => {
    lessonCacheDB.getAll().then((saved) => {
      if (saved) {
        setGeneratedLessons(saved);
      }
    });
  }, []);

  const [playingAudioWord, setPlayingAudioWord] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [rootFilter, setRootFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [hasLessonFilter, setHasLessonFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'difficulty' | 'length'>('alphabetical');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // Word of the Day (deterministic from full catalogue)
  const todayDate = new Date().getDate();
  const wordOfTheDay = VOCABULARY_CATALOGUE[todayDate % VOCABULARY_CATALOGUE.length] || VOCABULARY_CATALOGUE[0];
  const wotdLesson = DETAILED_WORD_LESSONS.find((l) => l.id === wordOfTheDay.id);

  // Unique topic tags extracted dynamically from catalogue
  const allTopicTags = useMemo(() => {
    const tagSet = new Set<string>();
    VOCABULARY_CATALOGUE.forEach((item) => {
      item.topicTags?.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }, []);

  const refreshProgress = () => {
    setProgress(getVocabBuilderProgress());
  };

  // Open item helper: routes to Detailed Lesson Modal if available, or Catalogue Word Modal
  const handleOpenItem = (item: VocabularyCatalogueItem) => {
    markWordExplored(item.id);
    refreshProgress();

    const lesson = DETAILED_WORD_LESSONS.find((l) => l.id === item.id) || generatedLessons[item.id];
    if (lesson) {
      setSelectedLesson(lesson);
      setIsLessonModalOpen(true);
    } else {
      setSelectedCatalogueItem(item);
      setIsCatalogueModalOpen(true);
    }
  };

  const handleOpenWordById = (wordId: string) => {
    const item = VOCABULARY_CATALOGUE.find((c) => c.id === wordId);
    if (item) {
      handleOpenItem(item);
    } else {
      // Fallback search by headword
      const itemByHeadword = VOCABULARY_CATALOGUE.find((c) => c.word.toLowerCase() === wordId.toLowerCase());
      if (itemByHeadword) handleOpenItem(itemByHeadword);
    }
  };

  const handleOpenRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * VOCABULARY_CATALOGUE.length);
    const randomItem = VOCABULARY_CATALOGUE[randomIndex];
    handleOpenItem(randomItem);
  };

  const handlePlayAudio = (text: string) => {
    if (playingAudioWord === text) {
      referenceSpeaker.stop();
      setPlayingAudioWord(null);
      return;
    }
    setPlayingAudioWord(text);
    referenceSpeaker.play(
      text,
      1.0,
      () => setPlayingAudioWord(text),
      () => setPlayingAudioWord(null)
    );
  };

  const handleToggleStar = (e: React.MouseEvent, wordId: string) => {
    e.stopPropagation();
    toggleStarWord(wordId);
    refreshProgress();
  };

  // Reset pagination to page 1 whenever search, filter, or sort options change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, difficultyFilter, topicFilter, rootFilter, statusFilter, hasLessonFilter, sortBy, itemsPerPage]);

  // Comprehensive Search & Filter across the FULL 1,021 catalogue
  const filteredItems = useMemo(() => {
    return VOCABULARY_CATALOGUE.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.word.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.partOfSpeech.toLowerCase().includes(q) ||
        item.topicTags.some((t) => t.toLowerCase().includes(q));

      const matchesDifficulty = difficultyFilter === 'all' || item.difficulty === difficultyFilter;
      const matchesTopic = topicFilter === 'all' || item.topicTags.includes(topicFilter);
      const matchesRoot = rootFilter === 'all' || item.rootId === rootFilter;
      const hasAnyLesson = item.hasDetailedLesson || !!generatedLessons[item.id];
      const matchesLesson =
        hasLessonFilter === 'all' ||
        (hasLessonFilter === 'detailed' && hasAnyLesson) ||
        (hasLessonFilter === 'catalogue' && !hasAnyLesson);

      let matchesStatus = true;
      if (statusFilter === 'starred') {
        matchesStatus = progress.starredWordIds.includes(item.id);
      } else if (statusFilter === 'mastered') {
        matchesStatus = progress.masteredWordIds.includes(item.id);
      } else if (statusFilter === 'learning') {
        matchesStatus = progress.learningWordIds.includes(item.id);
      } else if (statusFilter === 'new') {
        matchesStatus = !progress.exploredWordIds.includes(item.id);
      }

      return matchesSearch && matchesDifficulty && matchesTopic && matchesRoot && matchesLesson && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.word.localeCompare(b.word);
      } else if (sortBy === 'length') {
        return a.word.length - b.word.length;
      } else {
        const order = { Foundational: 1, Intermediate: 2, Advanced: 3, Mastery: 4 };
        return order[a.difficulty] - order[b.difficulty];
      }
    });
  }, [VOCABULARY_CATALOGUE, searchQuery, difficultyFilter, topicFilter, rootFilter, statusFilter, hasLessonFilter, sortBy, progress, generatedLessons]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const isFiltersActive =
    searchQuery !== '' ||
    difficultyFilter !== 'all' ||
    topicFilter !== 'all' ||
    rootFilter !== 'all' ||
    statusFilter !== 'all' ||
    hasLessonFilter !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setDifficultyFilter('all');
    setTopicFilter('all');
    setRootFilter('all');
    setStatusFilter('all');
    setHasLessonFilter('all');
    setSortBy('alphabetical');
  };

  const accuracyPct =
    progress.quizScores.totalAnswered > 0
      ? Math.round((progress.quizScores.totalCorrect / progress.quizScores.totalAnswered) * 100)
      : 88;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Brain className="w-4 h-4" />
            <span>General English Vocabulary Builder</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            Lexical Catalogue & Verbal Mastery (1,021 Words)
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Expand your active and analytical vocabulary through etymology, semantic discriminations, morphology, and spaced repetition across 1,021 curated English headwords.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenRandomWord}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-950/40 transition-all cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Learn a Random Word</span>
          </button>
        </div>
      </div>

      {/* Vocabulary Sub-Navigation Tabs */}
      <div className="w-full max-w-full min-w-0">
        <div
          role="tablist"
          aria-label="Vocabulary Builder Sections"
          className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x px-0.5 scroll-smooth"
        >
          {[
            { id: 'home', label: `Catalogue Directory (${VOCABULARY_CATALOGUE.length})`, icon: <BookOpen className="w-4 h-4 shrink-0" /> },
            { id: 'roots', label: `Explore Roots (${WORD_ROOTS.length})`, icon: <GitBranch className="w-4 h-4 shrink-0" /> },
            { id: 'morphology', label: 'Word Families Matrix', icon: <Layers className="w-4 h-4 shrink-0" /> },
            { id: 'practice', label: 'Practice & Flashcards', icon: <Award className="w-4 h-4 shrink-0" /> },
            { id: 'saved', label: `Saved Words (${progress.starredWordIds.length})`, icon: <Star className="w-4 h-4 shrink-0" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeSubTab === tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                if (tab.id === 'saved') setStatusFilter('starred');
                else if (statusFilter === 'starred') setStatusFilter('all');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                activeSubTab === tab.id
                  ? 'bg-slate-800 text-teal-300 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
          <div className="w-4 shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* =========================================================================
          SUB-TAB 1: CATALOGUE DIRECTORY
         ========================================================================= */}
      {activeSubTab === 'home' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Word of the Day Banner + Quick Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Word of the Day Card (2 cols) */}
            <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-teal-800/40 p-6 md:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Word of the Day
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-100 font-serif tracking-tight">
                    {wordOfTheDay.word}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(wordOfTheDay.word)}
                    className={`p-2 rounded-xl transition-colors ${
                      playingAudioWord === wordOfTheDay.word
                        ? 'bg-teal-500 text-slate-950 animate-pulse'
                        : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                    }`}
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs italic text-slate-400">{wordOfTheDay.partOfSpeech}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {wordOfTheDay.difficulty}
                  </span>
                </div>

                <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-xl">
                  {wordOfTheDay.definition}
                </p>

                {wordOfTheDay.rootId && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 max-w-xl">
                    <span className="text-teal-400 font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                      Classical Root Connection:
                    </span>
                    Root <strong className="text-slate-100">{WORD_ROOTS.find((r) => r.id === wordOfTheDay.rootId)?.root || wordOfTheDay.rootId}</strong> — {WORD_ROOTS.find((r) => r.id === wordOfTheDay.rootId)?.meaning}
                  </div>
                )}
              </div>

              <div className="pt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenItem(wordOfTheDay)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow"
                >
                  <span>{wordOfTheDay.hasDetailedLesson ? 'Study Complete Lesson' : 'Explore Word Record'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleOpenRandomWord}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Next Random Word
                </button>
              </div>
            </div>

            {/* Learner Dashboard Card (1 col) */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Learner Dashboard
                </span>
                <h4 className="text-lg font-bold text-slate-100 mt-1">Catalogue Progress</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Words Explored</div>
                  <div className="text-2xl font-bold font-mono text-slate-100 mt-0.5">
                    {progress.exploredWordIds.length}
                    <span className="text-xs font-normal text-slate-500"> / {VOCABULARY_CATALOGUE.length}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Words Mastered</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                    {progress.masteredWordIds.length}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Roots Learned</div>
                  <div className="text-2xl font-bold font-mono text-sky-400 mt-0.5">
                    {progress.rootsLearned.length}
                    <span className="text-xs font-normal text-slate-500"> / {WORD_ROOTS.length}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Quiz Accuracy</div>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
                    {accuracyPct}%
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSubTab('practice')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors text-center"
              >
                Launch Spaced Practice Drill →
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 1,021 words, definitions, topics (e.g. pragmatism, benevolent, ego)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto w-full md:w-auto">
                {[
                  { id: 'all', label: `All (${VOCABULARY_CATALOGUE.length})` },
                  { id: 'starred', label: `Starred (${progress.starredWordIds.length})` },
                  { id: 'learning', label: `Learning (${progress.learningWordIds.length})` },
                  { id: 'mastered', label: `Mastered (${progress.masteredWordIds.length})` },
                  { id: 'new', label: 'New' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
                      statusFilter === st.id
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Filter Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {/* Difficulty selector */}
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Foundational">Foundational</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Mastery">Mastery</option>
                </select>

                {/* Topic selector */}
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 max-w-[200px]"
                >
                  <option value="all">All Topics ({allTopicTags.length})</option>
                  {allTopicTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>

                {/* Root selector */}
                <select
                  value={rootFilter}
                  onChange={(e) => setRootFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500 max-w-[180px]"
                >
                  <option value="all">All Roots ({WORD_ROOTS.length})</option>
                  {WORD_ROOTS.map((r) => (
                    <option key={r.id} value={r.id}>
                      Root: {r.root} ({r.meaning})
                    </option>
                  ))}
                </select>

                {/* Detailed Lesson Filter */}
                <select
                  value={hasLessonFilter}
                  onChange={(e) => setHasLessonFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Records</option>
                  <option value="detailed">36 Detailed Lessons Only</option>
                </select>
              </div>

              {/* Sort selector & Reset */}
              <div className="flex items-center gap-2 shrink-0">
                {isFiltersActive && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-medium mr-2"
                  >
                    Clear Filters
                  </button>
                )}
                <span className="text-slate-500 text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                  <option value="difficulty">Difficulty Level</option>
                  <option value="length">Word Length</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary & Pagination Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-1">
            <div>
              Showing <strong className="text-slate-200">{totalItems === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of{' '}
              <strong className="text-teal-300">{totalItems.toLocaleString()}</strong> matching words
              {isFiltersActive && <span className="text-slate-500"> (filtered from {VOCABULARY_CATALOGUE.length})</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px]">Per page:</span>
              {[20, 50, 100].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setItemsPerPage(num)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                    itemsPerPage === num
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Empty Results State */}
          {totalItems === 0 && (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Vocabulary Words Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No words match your current query or filter combination. Try clearing your filters or searching for another term.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Catalogue Cards Grid */}
          {totalItems > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedItems.map((item) => {
                const isStarred = progress.starredWordIds.includes(item.id);
                const isMastered = progress.masteredWordIds.includes(item.id);
                const isLearning = progress.learningWordIds.includes(item.id);
                const rootItem = item.rootId ? WORD_ROOTS.find((r) => r.id === item.rootId) : null;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenItem(item)}
                    className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all space-y-3 flex flex-col justify-between group shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-slate-100 group-hover:text-teal-300 transition-colors font-serif">
                              {item.word}
                            </h4>
                            <span className="text-[11px] italic text-slate-500">
                              {item.partOfSpeech}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {(item.hasDetailedLesson || !!generatedLessons[item.id]) && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                              title="Complete 7-tab detailed lesson available"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                              <span>Lesson</span>
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => handleToggleStar(e, item.id)}
                            className="p-1 rounded-lg text-slate-500 hover:text-amber-400 transition-colors"
                            title="Star word"
                          >
                            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-950 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono text-[10px]">
                        {rootItem ? (
                          <>
                            Root: <span className="text-teal-400">{rootItem.root}</span>
                          </>
                        ) : (
                          <span className="capitalize text-slate-400">{item.difficulty}</span>
                        )}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          isMastered
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isLearning
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isMastered ? 'Mastered' : isLearning ? 'Learning' : 'New'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls Bar */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div className="text-slate-400">
                Page <strong className="text-slate-200">{validCurrentPage}</strong> of{' '}
                <strong className="text-slate-200">{totalPages}</strong>
              </div>

              <div className="flex items-center gap-1">
                {/* First page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  disabled={validCurrentPage === 1}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:enabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Previous page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validCurrentPage === 1}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:enabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Numbered Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - validCurrentPage) <= 2
                  )
                  .map((p, idx, arr) => {
                    const prevP = arr[idx - 1];
                    const showEllipsis = prevP && p - prevP > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && <span className="px-1 text-slate-600">...</span>}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(p)}
                          className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all ${
                            validCurrentPage === p
                              ? 'bg-teal-500 text-slate-950 shadow'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}

                {/* Next page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={validCurrentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:enabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={validCurrentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:enabled:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 2: DEDICATED ROOT EXPLORER
         ========================================================================= */}
      {activeSubTab === 'roots' && (
        <WordRootExplorer
          onSelectWord={(wordId) => handleOpenWordById(wordId)}
          learnedRoots={progress.rootsLearned}
          onRootLearned={refreshProgress}
        />
      )}

      {/* =========================================================================
          SUB-TAB 3: MORPHOLOGY & WORD FAMILIES
         ========================================================================= */}
      {activeSubTab === 'morphology' && (
        <MorphologyMatrixView
          onSelectWord={(wordId) => handleOpenWordById(wordId)}
        />
      )}

      {/* =========================================================================
          SUB-TAB 4: PRACTICE & REVIEWS
         ========================================================================= */}
      {activeSubTab === 'practice' && (
        <VocabPracticeReview
          onSelectWord={(wordId) => handleOpenWordById(wordId)}
          onRefreshProgress={refreshProgress}
        />
      )}

      {/* =========================================================================
          SUB-TAB 5: MY SAVED WORDS & PROGRESS
         ========================================================================= */}
      {activeSubTab === 'saved' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-100">My Saved & Starred Words</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Words you have pinned for prioritized retention and spaced recall.
              </p>
            </div>
          </div>

          {progress.starredWordIds.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <Star className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Starred Words Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the star icon on any word in the directory or lesson view to bookmark it here for daily review.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('home')}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Browse Catalogue Directory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VOCABULARY_CATALOGUE.filter((item) => progress.starredWordIds.includes(item.id)).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenItem(item)}
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-slate-100 font-serif">{item.word}</h4>
                      <button
                        type="button"
                        onClick={(e) => handleToggleStar(e, item.id)}
                        className="text-amber-400 p-1"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">{item.definition}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-950 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="italic text-slate-500">{item.partOfSpeech}</span>
                    <span className="text-teal-400 font-medium">Study Word →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detailed Lesson Modal (For original 36 detailed lessons) */}
      <WordLessonModal
        lesson={selectedLesson}
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        isStarred={selectedLesson ? progress.starredWordIds.includes(selectedLesson.id) : false}
        isMastered={selectedLesson ? progress.masteredWordIds.includes(selectedLesson.id) : false}
        isLearning={selectedLesson ? progress.learningWordIds.includes(selectedLesson.id) : false}
        onStatusChange={refreshProgress}
        onSelectRoot={(rootId) => {
          setIsLessonModalOpen(false);
          setActiveSubTab('roots');
        }}
      />

      {/* Catalogue Word Modal (For 1,021 catalogue entries) */}
      <CatalogueWordModal
        item={selectedCatalogueItem}
        isOpen={isCatalogueModalOpen}
        onClose={() => setIsCatalogueModalOpen(false)}
        isStarred={selectedCatalogueItem ? progress.starredWordIds.includes(selectedCatalogueItem.id) : false}
        isMastered={selectedCatalogueItem ? progress.masteredWordIds.includes(selectedCatalogueItem.id) : false}
        isLearning={selectedCatalogueItem ? progress.learningWordIds.includes(selectedCatalogueItem.id) : false}
        onStatusChange={refreshProgress}
        onSelectRoot={(rootId) => {
          setIsCatalogueModalOpen(false);
          setActiveSubTab('roots');
        }}
        onLessonGenerated={(newLesson) => {
          setGeneratedLessons((prev) => ({ ...prev, [newLesson.id]: newLesson }));
          setSelectedLesson(newLesson);
          setIsLessonModalOpen(true);
        }}
      />
    </div>
  );
};
