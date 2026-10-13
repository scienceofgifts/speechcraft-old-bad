import React, { useState, useMemo } from 'react';
import {
  Zap,
  Clock,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Volume2,
  Search,
  Filter,
  Flame,
  Layers,
  ArrowRight,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { FLUENCY_GYM_DRILLS } from '../data/fluencyGymData';
import { FluencyGymDrill, SpeechAnalysisResult, LearnerProfile } from '../types/speech';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface FluencyGymViewProps {
  profile: LearnerProfile;
}

export const FluencyGymView: React.FC<FluencyGymViewProps> = ({ profile }) => {
  const [selectedDrillId, setSelectedDrillId] = useState<string>(FLUENCY_GYM_DRILLS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [take1Result, setTake1Result] = useState<SpeechAnalysisResult | null>(null);
  const [take2Result, setTake2Result] = useState<SpeechAnalysisResult | null>(null);
  const [activeTake, setActiveTake] = useState<1 | 2>(1);
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(0);

  const currentDrill =
    FLUENCY_GYM_DRILLS.find((d) => d.id === selectedDrillId) || FLUENCY_GYM_DRILLS[0];

  // Filtered drills
  const filteredDrills = useMemo(() => {
    return FLUENCY_GYM_DRILLS.filter((drill) => {
      const matchesCategory = selectedCategory === 'all' || drill.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || drill.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery.trim() === '' ||
        drill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drill.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drill.targetFocus.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const handlePlayModelDemonstration = () => {
    referenceSpeaker.play(currentDrill.modelDemonstration, 1.0);
  };

  const handleAnalyze = async (recording: AudioRecordingResult) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Fluency Gym: ${currentDrill.title} (Take ${activeTake})`,
        context: `${currentDrill.prompt}. Target: ${currentDrill.targetFocus}. Rule: ${currentDrill.challengeRule}`,
        targetAccent: profile.targetAccent,
      });

      result.audioBlobUrl = recording.blobUrl;

      if (activeTake === 1) {
        setTake1Result(result);
      } else {
        setTake2Result(result);
      }

      saveSessionRecord({
        id: `fluency-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `${currentDrill.title} (Take ${activeTake})`,
        category: 'fluency',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.fluencyScore,
        summary: result.summary,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startPrepTimer = (drill: FluencyGymDrill) => {
    setSelectedDrillId(drill.id);
    setTake1Result(null);
    setTake2Result(null);
    setActiveTake(1);
    setPrepCountdown(drill.prepTimeSeconds);
    setIsPrepActive(true);

    const interval = setInterval(() => {
      setPrepCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPrepActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const categories = [
    { id: 'all', label: 'All Drills' },
    { id: 'fillers', label: 'Reducing Fillers' },
    { id: 'organizing', label: 'Organizing Thoughts' },
    { id: 'concision', label: 'Concision' },
    { id: 'impromptu', label: 'Impromptu' },
    { id: 'thinking-english', label: 'Thinking in English' },
    { id: 'response-speed', label: 'Response Speed' },
    { id: 'expanding', label: 'Expanding Ideas' },
    { id: 'paraphrasing', label: 'Paraphrasing' },
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Zap className="w-4 h-4" />
            <span>Fluency Gym • Phase 6</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            Spontaneous Speech & Concision Lab
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Master rapid thought-to-speech conversion, eliminate verbal filler habits ("um", "uh", "like"), and refine multi-take executive delivery with adaptive levels and instant AI analytics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 shrink-0">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Curriculum Scope</div>
            <div className="text-sm font-bold text-slate-200">{FLUENCY_GYM_DRILLS.length} Drills Available</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drills by prompt, focus, or keywords..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none py-1">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Scrollable Pills */}
        <div className="w-full max-w-full min-w-0">
          <div
            role="region"
            aria-label="Fluency Drill Categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-none pb-1 touch-pan-x whitespace-nowrap flex-nowrap min-w-0 w-full max-w-full"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 border border-amber-500/80 text-amber-300'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Drill Selector Grid / Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Select Drill ({filteredDrills.length} matches)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDrills.map((drill) => {
            const isSelected = drill.id === selectedDrillId;
            return (
              <button
                key={drill.id}
                onClick={() => startPrepTimer(drill)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/80 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-amber-400 font-bold">
                      {drill.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" /> ~{drill.timeLimitSeconds}s
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{drill.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {drill.targetFocus}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-500 capitalize">{drill.category.replace('-', ' ')}</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    Practice <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prep Countdown Overlay State */}
      {isPrepActive && (
        <div className="bg-amber-500/10 border border-amber-500/50 rounded-3xl p-8 text-center space-y-4 animate-pulse">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Preparation Countdown
          </div>
          <div className="text-6xl font-extrabold font-mono text-amber-300">
            {prepCountdown}
          </div>
          <p className="text-sm text-slate-200 max-w-md mx-auto">
            Read the prompt below and frame your opening sentence. Recording will start automatically in a moment...
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-left max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
              Prompt:
            </span>
            <p className="text-sm font-serif text-slate-100">{currentDrill.prompt}</p>
          </div>
        </div>
      )}

      {/* Main Challenge Arena */}
      {!isPrepActive && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prompt & Challenge Rules (1 col) */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Active Drill
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    {currentDrill.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{currentDrill.title}</h3>
              </div>

              {/* Prompt Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Prompt:
                </span>
                <p className="font-serif text-sm text-slate-200 leading-relaxed">
                  "{currentDrill.prompt}"
                </p>
              </div>

              {/* Challenge Constraint Rule */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-xs text-amber-200/90 space-y-1 leading-relaxed">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">
                  Challenge Rule ({currentDrill.targetFocus}):
                </span>
                <p>{currentDrill.challengeRule}</p>
              </div>

              {/* Model Demonstration */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                    Model Example
                  </span>
                  <button
                    onClick={handlePlayModelDemonstration}
                    className="flex items-center gap-1 text-xs text-teal-300 hover:text-teal-200 font-semibold"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  "{currentDrill.modelDemonstration}"
                </p>
              </div>
            </div>
          </div>

          {/* Recording & 2-Take Comparison (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Take Selection Toggle */}
            <div className="w-full max-w-full min-w-0">
              <div
                role="tablist"
                aria-label="Drill Takes"
                className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2 overflow-x-auto min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x"
              >
                <button
                  type="button"
                  onClick={() => setActiveTake(1)}
                  className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 sm:shrink ${
                    activeTake === 1
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="whitespace-nowrap">Take 1 (Initial)</span>
                  {take1Result && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTake(2)}
                  className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 sm:shrink ${
                    activeTake === 2
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="whitespace-nowrap">Take 2 (Refined / Concision)</span>
                  {take2Result && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                </button>
              </div>
            </div>

            {/* Recorder Component */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Recording Take {activeTake}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeTake === 1
                      ? 'Record your first spontaneous attempt. Do not overthink.'
                      : 'Record Take 2. Apply the challenge rule and trim 30% of unnecessary filler words.'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400">
                  Target: ~{currentDrill.timeLimitSeconds}s
                </span>
              </div>

              <StudioRecorder
                minDurationSeconds={2}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Side-by-Side Comparison if both takes exist */}
            {(take1Result || take2Result) && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-slate-100">Take Analysis & Comparison</h3>
                  </div>
                  {take1Result && take2Result && (
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/50 text-xs font-bold text-teal-300">
                      Improvement Delta Verified
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Take 1 Report */}
                  {take1Result ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Take 1 Initial
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Score: {take1Result.metrics.fluencyScore}/100
                        </span>
                      </div>
                      <AnalysisReportView analysis={take1Result} />
                    </div>
                  ) : (
                    <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6 text-center text-xs text-slate-500 flex flex-col items-center justify-center">
                      <Clock className="w-6 h-6 mb-2 text-slate-600" />
                      Take 1 pending recording...
                    </div>
                  )}

                  {/* Take 2 Report */}
                  {take2Result ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                          Take 2 Refined
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Score: {take2Result.metrics.fluencyScore}/100
                        </span>
                      </div>
                      <AnalysisReportView analysis={take2Result} />
                    </div>
                  ) : (
                    <div className="bg-slate-950/50 border border-slate-800/60 rounded-2xl p-6 text-center text-xs text-slate-500 flex flex-col items-center justify-center">
                      <Clock className="w-6 h-6 mb-2 text-slate-600" />
                      Record Take 2 to compare progress and filler reduction...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
