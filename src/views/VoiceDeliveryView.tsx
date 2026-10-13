import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Activity,
  Volume2,
  Sparkles,
  Shield,
  Play,
  RotateCcw,
  CheckCircle2,
  Layers,
  ArrowRight,
  Flame,
  Search,
  Filter,
  Check,
  BookOpen,
} from 'lucide-react';
import { VOICE_DELIVERY_DRILLS } from '../data/voiceDeliveryData';
import { VoiceDeliveryDrill, SpeechAnalysisResult, LearnerProfile } from '../types/speech';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface VoiceDeliveryViewProps {
  profile: LearnerProfile;
}

export const VoiceDeliveryView: React.FC<VoiceDeliveryViewProps> = ({ profile }) => {
  const [selectedDrillId, setSelectedDrillId] = useState<string>(VOICE_DELIVERY_DRILLS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStyleIndex, setSelectedStyleIndex] = useState<number>(0);
  const [styleRecordings, setStyleRecordings] = useState<{ [key: string]: AudioRecordingResult }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const drillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'warmup', label: 'Warm-ups & Breath' },
    { id: 'articulation', label: 'Clarity & Articulation' },
    { id: 'pacing', label: 'Pacing & Pauses' },
    { id: 'inflection', label: 'Vocal Inflection' },
    { id: 'emphasis', label: 'Emphasis & Meaning' },
    { id: 'confident', label: 'Confident Delivery' },
    { id: 'style', label: 'Style Studio' },
  ];

  const filteredDrills = useMemo(() => {
    return VOICE_DELIVERY_DRILLS.filter((drill) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        drill.category === selectedCategory ||
        (selectedCategory === 'warmup' && (drill.category === 'warmup' || drill.category === 'breath'));
      const matchesSearch =
        searchQuery.trim() === '' ||
        drill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drill.instructions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drill.targetPhrase.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    // If current selected drill is filtered out, select first available filtered drill
    if (filteredDrills.length > 0 && !filteredDrills.some((d) => d.id === selectedDrillId)) {
      setSelectedDrillId(filteredDrills[0].id);
      setAnalysisResult(null);
    }
  }, [filteredDrills, selectedDrillId]);

  const currentDrill =
    VOICE_DELIVERY_DRILLS.find((d) => d.id === selectedDrillId) || VOICE_DELIVERY_DRILLS[0];

  const handlePlayModel = (text: string) => {
    referenceSpeaker.play(text, 1.0);
  };

  const handleAnalyze = async (recording: AudioRecordingResult) => {
    setIsAnalyzing(true);
    const styleLabel = currentDrill.styles ? currentDrill.styles[selectedStyleIndex].name : 'Standard';

    try {
      if (currentDrill.styles) {
        setStyleRecordings((prev) => ({ ...prev, [styleLabel]: recording }));
      }

      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Voice & Delivery: ${currentDrill.title} (${styleLabel} style)`,
        targetText: currentDrill.targetPhrase,
        targetAccent: profile.targetAccent,
      });

      setAnalysisResult(result);

      saveSessionRecord({
        id: `delivery-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `${currentDrill.title} - ${styleLabel}`,
        category: 'delivery',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.pacingScore,
        summary: result.summary,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
          <Activity className="w-4 h-4" />
          <span>Voice & Delivery Lab</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
          Vocal Presence, Breath & Dynamic Modulation
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Develop relaxed vocal onset, deliberate thought-group pausing, and flexible vocal personas—from conversational warmth to executive authority—without throat tension.
        </p>
      </div>

      {/* Vocal Safety Guidance */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">Vocal Health Principle: </span>
          SpeechCraft Studio emphasizes effortless breath coordination and natural pitch inflection. Never force artificial vocal fry, strain to deepen your voice, or push air aggressively. If you ever feel throat soreness or fatigue, rest your vocal cords immediately.
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Filter Scrollable Row */}
          <div className="w-full overflow-x-auto pb-1 no-scrollbar scrollbar-none touch-pan-x min-w-0 max-w-full">
            <div className="flex items-center gap-2 min-w-max flex-nowrap whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drills..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Drill Selector Horizontal Scroll Row */}
        <div className="w-full max-w-full min-w-0">
          <div
            ref={navContainerRef}
            role="tablist"
            aria-label="Voice & Delivery Drills"
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x px-0.5 scroll-smooth"
          >
            {filteredDrills.map((drill) => {
              const isSelected = drill.id === selectedDrillId;
              return (
                <button
                  key={drill.id}
                  ref={(el) => {
                    drillRefs.current[drill.id] = el;
                  }}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedDrillId(drill.id);
                    setAnalysisResult(null);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 whitespace-nowrap border transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                    isSelected
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md ring-1 ring-teal-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {drill.title}
                </button>
              );
            })}
            {filteredDrills.length === 0 && (
              <div className="text-xs text-slate-500 py-2 italic">No drills match your filter.</div>
            )}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Exercise Card */}
      {filteredDrills.length > 0 && currentDrill && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drill Explanation (1 col) */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {currentDrill.category} Drill
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{currentDrill.title}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentDrill.instructions}
              </p>

              {currentDrill.precaution && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/50 text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-semibold text-amber-300">Caution: </span>
                  {currentDrill.precaution}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Target Passage / Phrase
                </span>
                <p className="font-serif italic text-sm text-slate-200 leading-relaxed">
                  "{currentDrill.targetPhrase}"
                </p>
                <button
                  onClick={() => handlePlayModel(currentDrill.targetPhrase)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-medium hover:bg-teal-500/30 transition-colors mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen to Reference Cadence
                </button>
              </div>
            </div>
          </div>

          {/* Drill Workspace & Multi-Style Comparison (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* If Multi-Style Studio */}
            {currentDrill.styles ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-slate-100">Style Studio Comparison</h4>
                  <span className="text-xs text-slate-400">
                    Record all 4 styles to compare vocal contrast
                  </span>
                </div>

                {/* Persona Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentDrill.styles.map((style, idx) => {
                    const isSelected = selectedStyleIndex === idx;
                    const hasRecording = !!styleRecordings[style.name];
                    return (
                      <button
                        key={style.name}
                        onClick={() => setSelectedStyleIndex(idx)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{style.name}</span>
                          {hasRecording && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {style.description}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Persona Tip Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-slate-200">
                    Style: {currentDrill.styles[selectedStyleIndex].name}
                  </div>
                  <div className="text-slate-400">
                    {currentDrill.styles[selectedStyleIndex].description}
                  </div>
                  <div className="text-teal-400 font-medium pt-1">
                    Coaching Tip: {currentDrill.styles[selectedStyleIndex].tip}
                  </div>
                </div>

                {/* Recorded takes comparison audio players */}
                {Object.keys(styleRecordings).length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Saved Style Takes Comparison
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(styleRecordings).map(([name, rec]) => (
                        <div
                          key={name}
                          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-semibold text-slate-200">{name}</span>
                          <audio controls src={rec.blobUrl} className="h-7 max-w-[140px]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recording Dock for active style */}
                <StudioRecorder
                  label={`Take: ${currentDrill.styles[selectedStyleIndex].name} Style`}
                  hintText="Incorporate the vocal tip above and record your take."
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  minDurationSeconds={3}
                />
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <StudioRecorder
                  label={`Recording • ${currentDrill.title}`}
                  hintText="Take a deep diaphragmatic breath, then record the exercise."
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  minDurationSeconds={3}
                />
              </div>
            )}

            {/* Feedback */}
            {analysisResult && (
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Vocal Delivery & Cadence Analysis
                </h3>
                <AnalysisReportView analysis={analysisResult} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
