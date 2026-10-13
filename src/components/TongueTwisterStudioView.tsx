import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Award,
  Zap,
  BookOpen,
  Info,
  ArrowRight,
  Clock,
  Mic,
  Activity,
  Check,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { TONGUE_TWISTERS_CATALOGUE, TongueTwisterExercise } from '../data/tongueTwistersData';
import { LearnerProfile, SpeechAnalysisResult } from '../types/speech';
import { StudioRecorder } from './StudioRecorder';
import { AnalysisReportView } from './AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface TongueTwisterStudioViewProps {
  profile: LearnerProfile;
  onBack: () => void;
}

export const TongueTwisterStudioView: React.FC<TongueTwisterStudioViewProps> = ({ profile, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'unpracticed' | 'saved'>('all');

  // Bookmarks & Completed in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_tt_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_tt_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Practice Modal State
  const [activeExercise, setActiveExercise] = useState<TongueTwisterExercise | null>(null);
  const [practiceStage, setPracticeStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeSpeed, setActiveSpeed] = useState<number>(1.0);

  // Recording & Analysis state inside modal
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [lastAudioUrl, setLastAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('speechcraft_tt_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('speechcraft_tt_completed', JSON.stringify(completedIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedIds]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayReference = (text: string, id: string, speed: number = 1.0) => {
    if (playingAudioId === id) {
      referenceSpeaker.stop();
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    setActiveSpeed(speed);
    referenceSpeaker.play(
      text,
      speed,
      () => setPlayingAudioId(id),
      () => setPlayingAudioId(null),
      id
    );
  };

  const handleAnalyzeAttempt = async (recording: AudioRecordingResult) => {
    if (!activeExercise) return;
    setIsAnalyzing(true);
    setLastAudioUrl(recording.blobUrl);
    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Tongue Twister Studio: ${activeExercise.primaryTarget}`,
        targetText: activeExercise.phrase,
        targetAccent: profile.targetAccent,
      });

      setAnalysisResult(result);

      // Save session record
      saveSessionRecord({
        id: `tt-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `Tongue Twister: ${activeExercise.phrase.slice(0, 30)}...`,
        category: 'articulation',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.pronunciationScore,
        summary: result.summary,
      });

      if (!completedIds.includes(activeExercise.id)) {
        setCompletedIds((prev) => [...prev, activeExercise.id]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Filter exercises
  const filteredExercises = TONGUE_TWISTERS_CATALOGUE.filter((item) => {
    const matchesSearch =
      item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneticIpa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.challengingWordsOrSequences.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;

    let matchesStatus = true;
    if (statusFilter === 'completed') matchesStatus = completedIds.includes(item.id);
    if (statusFilter === 'unpracticed') matchesStatus = !completedIds.includes(item.id);
    if (statusFilter === 'saved') matchesStatus = bookmarkedIds.includes(item.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  const categories = [
    'All',
    'Consonant Contrasts',
    'Consonant Clusters',
    'Vowels & Diphthongs',
    'American Speech Patterns',
    'Articulation & Precision',
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-teal-500/20 p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Pronunciation Lab Expansion</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            Tongue Twister & Articulation Studio
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Master precise American consonant contrasts, clusters, vowels, and speech patterns through purposeful, phonetically targeted drills. Progress from slow biomechanical awareness to confident natural speed.
          </p>
        </div>
        <button
          onClick={onBack}
          className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all shadow-md"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Back to Pronunciation Lab</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search phrases, targets, IPA, or challenging words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                Difficulty: {diff}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-700/80 text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500"
          >
            <option value="all">Status: All ({TONGUE_TWISTERS_CATALOGUE.length})</option>
            <option value="unpracticed">Unpracticed</option>
            <option value="completed">Completed ({completedIds.length})</option>
            <option value="saved">Saved / Bookmarked ({bookmarkedIds.length})</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? TONGUE_TWISTERS_CATALOGUE.length
              : TONGUE_TWISTERS_CATALOGUE.filter((i) => i.category === cat).length;
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  isSelected ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Exercise Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => {
          const isCompleted = completedIds.includes(exercise.id);
          const isBookmarked = bookmarkedIds.includes(exercise.id);
          const isPlaying = playingAudioId === exercise.id;

          return (
            <div
              key={exercise.id}
              onClick={() => {
                setActiveExercise(exercise);
                setPracticeStage(1);
                setAnalysisResult(null);
              }}
              className="group bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Top Meta Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {exercise.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        exercise.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : exercise.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {exercise.difficulty}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(exercise.id, e)}
                      className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                    <span>Target: {exercise.primaryTarget}</span>
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors leading-snug">
                    "{exercise.phrase}"
                  </h3>
                </div>

                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-400">
                  {exercise.phoneticIpa}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {exercise.phoneticChallenge}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayReference(exercise.phrase, exercise.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isPlaying
                      ? 'bg-teal-500 text-slate-950 font-bold animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>{isPlaying ? 'Playing...' : 'Listen'}</span>
                </button>

                <div className="flex items-center gap-1 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
                  <span>Start Drills</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No tongue twisters found</h3>
          <p className="text-sm text-slate-400">Try adjusting your search query or filter options.</p>
        </div>
      )}

      {/* Interactive 5-Stage Practice Modal */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-md border border-teal-500/20">
                    {activeExercise.category}
                  </span>
                  <span className="text-xs text-slate-400">• Target: {activeExercise.primaryTarget}</span>
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-100">
                  "{activeExercise.phrase}"
                </h2>
              </div>
              <button
                onClick={() => setActiveExercise(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Navigation Stepper */}
            <div className="grid grid-cols-5 border-b border-slate-800 bg-slate-950/30 text-center">
              {[
                { stage: 1, label: '1. Understand' },
                { stage: 2, label: '2. Slow & Accurate' },
                { stage: 3, label: '3. Repetition' },
                { stage: 4, label: '4. Natural Speech' },
                { stage: 5, label: '5. Mastery' },
              ].map((s) => {
                const isActive = practiceStage === s.stage;
                return (
                  <button
                    key={s.stage}
                    onClick={() => setPracticeStage(s.stage as any)}
                    className={`py-3 px-2 text-xs font-bold border-b-2 transition-all ${
                      isActive
                        ? 'border-teal-500 text-teal-300 bg-teal-500/10'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* STAGE 1: UNDERSTAND */}
              {practiceStage === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-teal-400" />
                        <span>Phonetic Breakdown & Challenge</span>
                      </h3>
                      <button
                        onClick={() => handlePlayReference(activeExercise.phrase, activeExercise.id)}
                        className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Native Model</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">IPA Transcription</span>
                        <p className="font-mono text-sm text-slate-200">{activeExercise.phoneticIpa}</p>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Challenging Sequences</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeExercise.challengingWordsOrSequences.map((word, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-slate-950 rounded-lg text-xs font-semibold text-amber-300 border border-amber-500/20">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">What You Are Training</h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                        {activeExercise.phoneticChallenge}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Practical Articulation Guidance</h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                        {activeExercise.articulationGuidance}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Common Mistakes to Watch For</h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                        {activeExercise.commonMistakes}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setPracticeStage(2)}
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      <span>Next: Slow & Accurate Practice</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: SLOW & ACCURATE */}
              {practiceStage === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-teal-400" />
                        <span>Slow Biomechanical Practice (0.75x Speed)</span>
                      </h3>
                      <button
                        onClick={() => handlePlayReference(activeExercise.phrase, `${activeExercise.id}-slow`, 0.75)}
                        className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Play Slow Audio (0.75x)</span>
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      Before attempting normal conversational speed, listen to the slow reference audio and speak along at 0.75x speed. Focus on exact tongue and lip placement.
                    </p>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Target Phrase</span>
                      <h2 className="text-2xl font-extrabold text-slate-100">"{activeExercise.phrase}"</h2>
                      <p className="text-xs text-slate-400">Recommended Start: {activeExercise.recommendedSpeed}</p>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Completion Criterion</h4>
                      <p className="text-xs text-slate-300">{activeExercise.completionCriterion}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setPracticeStage(1)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setPracticeStage(3)}
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      <span>Next: Controlled Repetition</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: CONTROLLED REPETITION */}
              {practiceStage === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-teal-400" />
                      <span>Controlled Repetition Recording</span>
                    </h3>
                    <p className="text-sm text-slate-300">
                      Record yourself repeating the phrase 3 times with controlled pacing. Focus on clarity over speed.
                    </p>

                    <div className="py-4">
                      <StudioRecorder onAnalyze={handleAnalyzeAttempt} isAnalyzing={isAnalyzing} />
                    </div>

                    {isAnalyzing && (
                      <div className="flex items-center justify-center gap-3 py-8 text-teal-400 font-semibold text-sm">
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>Analyzing articulation and speech metrics...</span>
                      </div>
                    )}

                    {analysisResult && (
                      <div className="mt-6">
                        <AnalysisReportView analysis={analysisResult} recordedAudioUrl={lastAudioUrl || undefined} />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setPracticeStage(2)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setPracticeStage(4)}
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      <span>Next: Natural Delivery</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 4: NATURAL DELIVERY */}
              {practiceStage === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-teal-400" />
                      <span>Natural Conversational Pace</span>
                    </h3>
                    <p className="text-sm text-slate-300">
                      Speak the phrase naturally as if telling a story in everyday conversation. Preserve sound contrasts without exaggerating syllables unnaturally.
                    </p>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Target Delivery</span>
                      <h2 className="text-2xl font-extrabold text-slate-100">"{activeExercise.phrase}"</h2>
                    </div>

                    <div className="py-4">
                      <StudioRecorder onAnalyze={handleAnalyzeAttempt} isAnalyzing={isAnalyzing} />
                    </div>

                    {analysisResult && (
                      <div className="mt-6">
                        <AnalysisReportView analysis={analysisResult} recordedAudioUrl={lastAudioUrl || undefined} />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setPracticeStage(3)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setPracticeStage(5)}
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
                    >
                      <span>Next: Mastery & Completion</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 5: MASTERY & COMPLETION */}
              {practiceStage === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-6 text-center">
                    <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto text-teal-400">
                      <Award className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-slate-100">Exercise Review & Completion</h3>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        Verify your mastery of "{activeExercise.primaryTarget}". Accurate, intelligible speech is the ultimate goal.
                      </p>
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => toggleComplete(activeExercise.id)}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                          completedIds.includes(activeExercise.id)
                            ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{completedIds.includes(activeExercise.id) ? 'Completed & Mastered' : 'Mark as Completed'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <button
                      onClick={() => setActiveExercise(null)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm"
                    >
                      Close & Return to Studio
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
