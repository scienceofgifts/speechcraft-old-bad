import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Mic,
  Search,
  Layers,
  Award,
} from 'lucide-react';
import { VocabularyItem, SpeechAnalysisResult, LearnerProfile } from '../types/speech';
import { getStoredVocabulary, updateVocabularyStatus } from '../services/storage';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { VocabularyStudyDeck } from '../components/VocabularyStudyDeck';
import { VocabularyQuizView } from '../components/VocabularyQuizView';

interface VocabularyStudioViewProps {
  profile: LearnerProfile;
}

export const VocabularyStudioView: React.FC<VocabularyStudioViewProps> = ({ profile }) => {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>(() => getStoredVocabulary());
  const [activeTab, setActiveTab] = useState<'browse' | 'study' | 'quiz'>('browse');
  const [selectedItemId, setSelectedItemId] = useState<string>(vocabList[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRegister, setFilterRegister] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category' | 'status'>('alphabetical');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);

  const filteredItems = vocabList
    .filter((item) => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesRegister =
        filterRegister === 'all' || item.register.toLowerCase().includes(filterRegister.toLowerCase());
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.naturalExample.toLowerCase().includes(query) ||
        item.collocations.some((c) => c.toLowerCase().includes(query));
      return matchesCategory && matchesRegister && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.term.localeCompare(b.term);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else {
        const order = { new: 0, learning: 1, mastered: 2 };
        return order[a.status] - order[b.status];
      }
    });

  const currentItem =
    filteredItems.find((v) => v.id === selectedItemId) ||
    filteredItems[0] ||
    vocabList.find((v) => v.id === selectedItemId) ||
    vocabList[0];

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

  const handleStatusChange = (id: string, status: 'new' | 'learning' | 'mastered') => {
    updateVocabularyStatus(id, status);
    setVocabList(getStoredVocabulary());
  };

  const handleAnalyzeChallenge = async (recording: AudioRecordingResult) => {
    if (!currentItem) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Vocabulary Studio: "${currentItem.term}" in natural context`,
        targetText: currentItem.naturalExample,
        context: `Prompt: ${currentItem.speakingPrompt}. Target phrase to use: "${currentItem.term}"`,
        targetAccent: profile.targetAccent,
      });

      setAnalysisResult(result);

      if (result.metrics.clarityScore >= 80) {
        handleStatusChange(currentItem.id, 'mastered');
      } else {
        handleStatusChange(currentItem.id, 'learning');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <BookOpen className="w-4 h-4" />
            <span>Vocabulary & American Idioms Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            Idiomatic Expressions & Verbal Precision
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Master 300+ natural American idioms, collocations, and executive phrasing with spaced study, interactive quizzes, and AI voice practice.
          </p>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'browse'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Browse & Search
          </button>
          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'study'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Study Deck
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Active Quizzes
          </button>
        </div>
      </div>

      {/* RENDER MODE: STUDY DECK */}
      {activeTab === 'study' && (
        <VocabularyStudyDeck
          items={filteredItems.length > 0 ? filteredItems : vocabList}
          onStatusChange={handleStatusChange}
          onOpenStudio={(item) => {
            setSelectedItemId(item.id);
            setActiveTab('browse');
          }}
        />
      )}

      {/* RENDER MODE: QUIZ */}
      {activeTab === 'quiz' && (
        <VocabularyQuizView items={filteredItems.length > 0 ? filteredItems : vocabList} />
      )}

      {/* RENDER MODE: BROWSE & SEARCH */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="space-y-3 bg-slate-900/60 border border-slate-800/80 p-4 rounded-3xl">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search expressions, definitions, examples, or collocations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Status & Sorting Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="learning">Learning</option>
                  <option value="mastered">Mastered</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="alphabetical">Sort: A-Z</option>
                  <option value="category">Sort: Category</option>
                  <option value="status">Sort: Learning Status</option>
                </select>
              </div>
            </div>

            {/* Filter Tabs Row */}
            <div className="w-full max-w-full min-w-0">
              <div
                role="tablist"
                aria-label="American Expression Categories"
                className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x px-0.5 scroll-smooth"
              >
                {[
                  { id: 'all', label: 'All Expressions' },
                  { id: 'everyday', label: 'Everyday Conversational' },
                  { id: 'idiom', label: 'American Idioms' },
                  { id: 'collocation', label: 'American Collocations' },
                  { id: 'concise-alternative', label: 'Concise Alternatives' },
                  { id: 'executive', label: 'Professional & Executive' },
                  { id: 'disagreement', label: 'Disagreement & Persuasion' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={filterCategory === tab.id}
                    onClick={() => setFilterCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap border transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                      filterCategory === tab.id
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <div className="w-4 shrink-0" aria-hidden="true" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
              <span>
                Showing <strong className="text-teal-400 font-bold">{filteredItems.length}</strong> of{' '}
                <strong className="text-slate-200">{vocabList.length}</strong> expressions
              </span>
              {filteredItems.length === 0 && (
                <span className="text-rose-400 font-medium">No results match your search or filter.</span>
              )}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vocabulary Items List (1 col) */}
            <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-300 font-bold">No expressions found</p>
                  <p className="text-[11px] text-slate-500">Try clearing your search query or filters.</p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isSelected = item.id === selectedItemId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setAnalysisResult(null);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        isSelected
                          ? 'bg-teal-500/10 border-teal-500/80 shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-100">{item.term}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                            item.status === 'mastered'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : item.status === 'learning'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-teal-400">{item.phonetic}</div>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.meaning}</p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Selected Term Detail & Speaking Challenge (2 cols) */}
            {currentItem && (
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                  {/* Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-100">{currentItem.term}</span>
                        <button
                          onClick={() => handlePlayAudio(currentItem.term)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            playingAudioText === currentItem.term
                              ? 'bg-teal-500 text-slate-950 animate-pulse'
                              : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                          }`}
                          title={playingAudioText === currentItem.term ? 'Stop pronunciation' : 'Hear American pronunciation'}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-mono text-xs text-teal-400 mt-1">
                        {currentItem.phonetic} • {currentItem.register}
                      </div>
                    </div>

                    {/* Status Toggle buttons */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                      {(['new', 'learning', 'mastered'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(currentItem.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                            currentItem.status === st
                              ? 'bg-teal-500 text-slate-950 shadow'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meaning & Vague Alternative comparison */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                        Plain-English Meaning
                      </span>
                      <p className="text-slate-200 leading-relaxed text-sm">{currentItem.meaning}</p>
                    </div>

                    {currentItem.vagueAlternative && (
                      <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs flex items-start gap-2">
                        <span className="font-semibold text-rose-300 shrink-0">Avoid Vague Fluff: </span>
                        <span className="text-slate-400 italic">"{currentItem.vagueAlternative}"</span>
                      </div>
                    )}
                  </div>

                  {/* Natural American Sentence Example */}
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

                  {/* Common Collocations Pills */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                      Common American Collocations:
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

                  {/* Spoken Challenge Prompt */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                      Impromptu Speaking Challenge:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentItem.speakingPrompt} Use <strong className="text-teal-300">"{currentItem.term}"</strong> naturally in your answer.
                    </p>
                  </div>

                  {/* Studio Recorder Dock */}
                  <div className="pt-2">
                    <StudioRecorder
                      label={`Vocabulary Challenge • "${currentItem.term}"`}
                      hintText="Record your impromptu response incorporating the target expression."
                      onAnalyze={handleAnalyzeChallenge}
                      isAnalyzing={isAnalyzing}
                      minDurationSeconds={3}
                    />
                  </div>
                </div>

                {/* Analysis feedback */}
                {analysisResult && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      Vocabulary Usage & Pronunciation Feedback
                    </h3>
                    <AnalysisReportView analysis={analysisResult} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

