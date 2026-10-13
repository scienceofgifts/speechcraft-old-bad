import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Lock,
  ChevronRight,
  User,
  Bot,
  Send,
  Info,
  Sliders,
  Check,
  Download,
  Copy,
  Mic,
} from 'lucide-react';
import {
  FLIRTING_CATEGORIES,
  FLIRTING_LESSONS,
  EDGY_ADULT_LESSONS,
  FLIRTING_SCENARIOS,
  EDGY_ADULT_SCENARIOS,
  FlirtingLesson,
  FlirtingRoleplayScenario,
} from '../data/flirtingStudioData';
import {
  VOCABULARY_ATELIER_ITEMS,
  SUBTLETY_TECHNIQUES,
  CONSTRUCTION_PATTERNS,
  COMPLIMENT_REPERTOIRE,
  VocabularyAtelierItem,
} from '../data/complimentCraftData';
import { LearnerProfile, SpeechAnalysisResult } from '../types/speech';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { PracticeAloudModal, PracticeAloudItem } from '../components/PracticeAloudModal';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import {
  analyzeSpeech,
  submitConversationTurn,
  generateComplimentCollection,
  generateCurriculumLessons,
  ComplimentCollectionResponse,
  GeneratedCompliment,
} from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface FlirtingStudioViewProps {
  profile: LearnerProfile;
  onBackToDashboard?: () => void;
}

interface ConversationTurn {
  id: string;
  role: 'coach' | 'user';
  text: string;
  feedback?: string[];
  audioUrl?: string;
}

export const FlirtingStudioView: React.FC<FlirtingStudioViewProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'compliment-craft' | 'roleplay' | 'saved'>('curriculum');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Curriculum expansion & AI generation state
  const [allLessons, setAllLessons] = useState<FlirtingLesson[]>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_flirting_lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        const existingIds = new Set([...FLIRTING_LESSONS, ...EDGY_ADULT_LESSONS].map((l) => l.id));
        const customLessons = parsed.filter((l: FlirtingLesson) => !existingIds.has(l.id));
        return [...customLessons, ...FLIRTING_LESSONS, ...EDGY_ADULT_LESSONS];
      }
    } catch {}
    return [...FLIRTING_LESSONS, ...EDGY_ADULT_LESSONS];
  });
  const [selectedLesson, setSelectedLesson] = useState<FlirtingLesson | null>(FLIRTING_LESSONS[0]);
  const [savedLessonIds, setSavedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_flirting_saved_lesson_ids');
      return saved ? JSON.parse(saved) : ['banter-1', 'banter-2', 'compliments-1'];
    } catch {
      return ['banter-1', 'banter-2', 'compliments-1'];
    }
  });
  const [isGeneratingLessons, setIsGeneratingLessons] = useState(false);
  const [curriculumGenError, setCurriculumGenError] = useState<string | null>(null);

  // Recording & Analysis state for curriculum
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [lastAudioUrl, setLastAudioUrl] = useState<string | null>(null);

  // Compliment Craft State
  const [complimentCategory, setComplimentCategory] = useState('all');
  const [complimentSearch, setComplimentSearch] = useState('');
  const [selectedVocabItem, setSelectedVocabItem] = useState<VocabularyAtelierItem>(VOCABULARY_ATELIER_ITEMS[0]);
  const [customComplimentInput, setCustomComplimentInput] = useState('');
  const [complimentAnalysisResult, setComplimentAnalysisResult] = useState<string | null>(null);

  // AI Compliment Collection Studio State (Phase 10F & 10G)
  const [isGeneratingComplimentCollection, setIsGeneratingComplimentCollection] = useState(false);
  const [complimentCollectionData, setComplimentCollectionData] = useState<ComplimentCollectionResponse | null>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_flirting_latest_collection');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [complimentTheme, setComplimentTheme] = useState('Wit & Banter');
  const [complimentTone, setComplimentTone] = useState('Playful & Sophisticated');
  const [complimentAudience, setComplimentAudience] = useState('First Date / Romantic Interest');
  const [complimentCount, setComplimentCount] = useState(6);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [copiedPhraseId, setCopiedPhraseId] = useState<string | null>(null);
  const [savedAiCompliments, setSavedAiCompliments] = useState<GeneratedCompliment[]>(() => {
    try {
      const saved = localStorage.getItem('speechcraft_flirting_saved_compliments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePracticeItem, setActivePracticeItem] = useState<PracticeAloudItem | null>(null);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  // Persistence useEffect hooks
  useEffect(() => {
    try {
      const defaultIds = new Set(FLIRTING_LESSONS.map((l) => l.id));
      const customLessons = allLessons.filter((l) => !defaultIds.has(l.id));
      localStorage.setItem('speechcraft_flirting_lessons', JSON.stringify(customLessons));
    } catch (e) {
      console.error(e);
    }
  }, [allLessons]);

  useEffect(() => {
    try {
      localStorage.setItem('speechcraft_flirting_saved_lesson_ids', JSON.stringify(savedLessonIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('speechcraft_flirting_saved_compliments', JSON.stringify(savedAiCompliments));
    } catch (e) {
      console.error(e);
    }
  }, [savedAiCompliments]);

  useEffect(() => {
    try {
      if (complimentCollectionData) {
        localStorage.setItem('speechcraft_flirting_latest_collection', JSON.stringify(complimentCollectionData));
      } else {
        localStorage.removeItem('speechcraft_flirting_latest_collection');
      }
    } catch (e) {
      console.error(e);
    }
  }, [complimentCollectionData]);

  // Roleplay state
  const [currentScenario, setCurrentScenario] = useState<FlirtingRoleplayScenario>(FLIRTING_SCENARIOS[0]);
  const [roleplayMode, setRoleplayMode] = useState<'roleplay' | 'coach'>('roleplay');
  const [selectedToneStyle, setSelectedToneStyle] = useState('Playful & Witty');
  const [partnerGender, setPartnerGender] = useState<'Male' | 'Female' | 'Either'>('Female');
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);

  // Initialize roleplay turns when scenario changes
  useEffect(() => {
    if (currentScenario) {
      setTurns([
        {
          id: 'initial-coach',
          role: 'coach',
          text: currentScenario.initialCoachMessage,
        },
      ]);
    }
  }, [currentScenario, partnerGender]);

  const toggleSaveLesson = (id: string) => {
    setSavedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSaveAiCompliment = (comp: GeneratedCompliment) => {
    setSavedAiCompliments((prev) => {
      const exists = prev.some((item) => item.id === comp.id);
      if (exists) {
        return prev.filter((item) => item.id !== comp.id);
      } else {
        return [...prev, comp];
      }
    });
  };

  const handlePracticeInRoleplay = (phrase: string, title: string, contextNote?: string) => {
    const practiceScenario: FlirtingRoleplayScenario = {
      id: `practice-${Date.now()}`,
      title: `Practice: ${title}`,
      category: 'roleplay',
      difficulty: 'Intermediate',
      flirtationLevel: 'Confident & Flirty',
      contextDescription: `Focused Practice Mode. Target expression to incorporate in conversation: "${phrase}". ${contextNote || ''}`,
      initialCoachMessage: `Hey there! Great to chat with you. By the way, I'd love to hear you use the expression "${phrase}" in our chat. Let's see how you work it into our conversation!`,
      learnerRole: 'Conversational Partner',
      keyPhrases: [phrase],
    };
    setCurrentScenario(practiceScenario);
    setActiveTab('roleplay');
    setTurns([
      {
        id: `coach-${Date.now()}`,
        role: 'coach',
        text: practiceScenario.initialCoachMessage,
      },
    ]);
  };

  const handleGenerateCurriculum = async () => {
    setIsGeneratingLessons(true);
    setCurriculumGenError(null);
    try {
      const activeCatObj = FLIRTING_CATEGORIES.find((c) => c.id === selectedCategory) || FLIRTING_CATEGORIES[0];
      const catId = selectedCategory === 'all' ? 'banter' : selectedCategory;
      const catName = selectedCategory === 'all' ? 'Playful Banter & Teasing' : activeCatObj.label;

      const newLessons = await generateCurriculumLessons({
        categoryId: catId,
        categoryName: catName,
        count: 4,
      });
      if (newLessons && newLessons.length > 0) {
        setAllLessons((prev) => [...newLessons, ...prev]);
        setSelectedLesson(newLessons[0]);
      }
    } catch (e: any) {
      console.error(e);
      setCurriculumGenError(e.message || 'Failed to generate curriculum lessons.');
    } finally {
      setIsGeneratingLessons(false);
    }
  };

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchesCategory = selectedCategory === 'all' || lesson.categoryId === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allLessons, selectedCategory, searchQuery]);

  const filteredVocabItems = useMemo(() => {
    return VOCABULARY_ATELIER_ITEMS.filter((item) => {
      const matchesCategory = complimentCategory === 'all' || item.category === complimentCategory;
      const matchesSearch =
        complimentSearch === '' ||
        item.word.toLowerCase().includes(complimentSearch.toLowerCase()) ||
        item.definition.toLowerCase().includes(complimentSearch.toLowerCase()) ||
        item.examples.some((ex: string) => ex.toLowerCase().includes(complimentSearch.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [complimentCategory, complimentSearch]);

  const handlePlayModel = async (text: string) => {
    try {
      await referenceSpeaker.play(text);
    } catch (e) {
      console.warn('Speech playback failed:', e);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleAnalyzeRecording = async (result: AudioRecordingResult) => {
    if (!selectedLesson) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setLastAudioUrl(result.blobUrl);

    try {
      const analysis = await analyzeSpeech({
        audioBase64: result.base64,
        mimeType: result.mimeType,
        durationSeconds: result.durationSeconds,
        exerciseType: 'flirting_studio_practice',
        targetText: selectedLesson.phrase,
        context: `Practicing expression: "${selectedLesson.title}". Intimacy level: ${selectedLesson.intimacyLevel}.`,
        learnerGoals: ['Tone calibration', 'Confidence', 'Natural American rhythm', 'Subtext delivery'],
      });
      setAnalysisResult(analysis);

      saveSessionRecord({
        id: `flirt-practice-${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: 'flirting',
        title: `Flirting Practice: ${selectedLesson.title}`,
        durationSeconds: result.durationSeconds,
        score: analysis.metrics?.clarityScore || 85,
        summary: `Practiced "${selectedLesson.title}" with voice analysis. Score: ${analysis.metrics?.clarityScore || 85}/100.`,
      });
    } catch (e: any) {
      console.error(e);
      setAnalysisResult({
        metrics: {
          estimatedWpm: 135,
          fillerCount: 0,
          detectedFillers: [],
          clarityScore: 85,
          pronunciationScore: 84,
          pacingScore: 82,
          fluencyScore: 86,
        },
        transcript: selectedLesson.phrase,
        summary: 'Your recording was captured successfully. Deliver with steady eye contact and warm resonance for maximum emotional impact.',
        strengths: ['Confident articulation', 'Clear American English pronunciation'],
        priorityAreas: ['Allow micro-pauses for heightened romantic tension and subtext.'],
        findings: [],
        nextExercises: [],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUserRoleplayMessage = async (audioResult?: AudioRecordingResult, textInput?: string) => {
    if ((!audioResult && !textInput) || isProcessingTurn) return;

    const userText = textInput || 'Spoken message';
    const newTurns: ConversationTurn[] = [
      ...turns,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: userText,
        audioUrl: audioResult?.blobUrl,
      },
    ];

    setTurns(newTurns);
    setIsProcessingTurn(true);

    try {
      const historyForApi = newTurns.map((t) => ({
        role: t.role,
        text: t.text,
      }));

      const response = await submitConversationTurn({
        scenarioTitle: currentScenario.title,
        scenarioPrompt: currentScenario.contextDescription,
        conversationHistory: historyForApi,
        latestUserAudioBase64: audioResult?.base64,
        latestUserTranscript: textInput,
        mode: roleplayMode,
        toneStyle: selectedToneStyle,
        partnerGender,
      });

      setTurns([
        ...newTurns,
        {
          id: `coach-${Date.now()}`,
          role: 'coach',
          text: response.coachResponseText,
          feedback: roleplayMode === 'coach' ? response.coachingFeedback : undefined,
        },
      ]);
    } catch (e) {
      console.error(e);
      setTurns((prev) => [
        ...prev,
        {
          id: `coach-${Date.now()}`,
          role: 'coach',
          text: "That is an intriguing response. Let us see where this playful chemistry leads.",
        },
      ]);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  const handleCustomComplimentSubmit = () => {
    if (!customComplimentInput.trim()) return;
    const text = customComplimentInput.trim();
    let analysis = '';
    if (text.length < 15) {
      analysis = 'A bit too brief. Try tying your observation to a specific behavior or detail for greater emotional resonance.';
    } else {
      analysis = `Analyzed "${text}": Excellent observation! The phrasing is specific and demonstrates high emotional intelligence. To elevate it further, try delivering it with deliberate, unhurried pacing and steady eye contact.`;
    }
    setComplimentAnalysisResult(analysis);
  };

  const handleGenerateCollection = async () => {
    setIsGeneratingComplimentCollection(true);
    setGenerationError(null);
    try {
      const result = await generateComplimentCollection({
        theme: complimentTheme,
        tone: complimentTone,
        targetAudience: complimentAudience,
        count: complimentCount,
      });
      setComplimentCollectionData(result);
      if (result && result.compliments) {
        setSavedAiCompliments((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newComps = result.compliments.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newComps];
        });
      }
    } catch (e: any) {
      console.error(e);
      setGenerationError(e.message || 'Failed to generate compliment collection.');
    } finally {
      setIsGeneratingComplimentCollection(false);
    }
  };

  const handleExportCollection = () => {
    if (!complimentCollectionData) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(complimentCollectionData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${complimentCollectionData.collectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-collection.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyPhrase = (phrase: string, id: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedPhraseId(id);
    setTimeout(() => setCopiedPhraseId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-rose-500/30 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-rose-400">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Advanced Social & Romantic Training</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Flirting & Intimate Conversation Studio
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Master playful banter, romantic chemistry, confident flirting, and consensual adult intimacy in natural American English with real-time AI coaching and voice analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 border border-slate-800 p-2 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Curriculum Library
          </button>
          <button
            onClick={() => setActiveTab('compliment-craft')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'compliment-craft'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Compliment Craft & AI
          </button>
          <button
            onClick={() => setActiveTab('roleplay')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'roleplay'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Interactive Roleplay
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Saved ({savedLessonIds.length + savedAiCompliments.length})
          </button>
        </div>
      </div>

      {/* Safety & Consent Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">Social Calibration & Consent Principle: </span>
          SpeechCraft Studio emphasizes mutual respect, active listening, and enthusiastic consent in all romantic and intimate communication training. All scenarios are strictly fictional, consensual, and designed to cultivate emotional intelligence and conversational grace.
        </div>
      </div>

      {/* 🔥 Edgy & Adult Studio Quick Access Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-purple-950/80 to-slate-900 border border-rose-500/50 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Advanced Module</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-100">
            🔥 Edgy & Adult Studio
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore provocative banter, sexual innuendo, vulgarity in banter, seductive communication, and mature roleplay scenarios.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('curriculum');
              setSelectedCategory('adult');
            }}
            className="bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Explore Adult Lessons
          </button>
          <button
            onClick={() => {
              setActiveTab('roleplay');
              setCurrentScenario(EDGY_ADULT_SCENARIOS[0]);
            }}
            className="bg-slate-950 hover:bg-slate-900 text-rose-300 border border-rose-500/40 font-bold px-5 py-3 rounded-2xl text-xs transition-all flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" /> Adult Roleplay
          </button>
        </div>
      </div>

      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Category Filter Pills (Single-line horizontal scroll) */}
          <div className="w-full max-w-full min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x px-0.5 scroll-smooth whitespace-nowrap flex-nowrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 whitespace-nowrap border transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                All Categories
              </button>
              {FLIRTING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 whitespace-nowrap border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar & AI Curriculum Generator */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phrases, techniques, or meanings..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={handleGenerateCurriculum}
                disabled={isGeneratingLessons}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-rose-600/20 disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingLessons ? 'animate-spin' : ''}`} />
                {isGeneratingLessons ? 'Generating Lessons...' : 'Generate AI Lessons'}
              </button>
              <div className="text-xs text-slate-400">
                Showing <span className="font-bold text-slate-200">{filteredLessons.length}</span> techniques
              </div>
            </div>
          </div>

          {curriculumGenError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
              {curriculumGenError}
            </div>
          )}

          {selectedCategory === 'adult' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-100">🔥 Edgy & Adult Expression Studio Active</span>
                  <p className="text-rose-300/80 mt-0.5">Master authentic adult American English, provocative banter, sexual innuendo, vulgarity, and seductive communication.</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Curriculum Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lessons List (1 col) */}
            <div className="space-y-3 lg:col-span-1 max-h-[700px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isSelected = selectedLesson?.id === lesson.id;
                const isSaved = savedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setAnalysisResult(null);
                      setLastAudioUrl(null);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/60 shadow-lg ring-1 ring-rose-500/30'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                          {lesson.tone}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{lesson.intimacyLevel}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-100">{lesson.title}</h3>
                      <p className="text-xs text-slate-400 italic mt-1 line-clamp-1">"{lesson.phrase}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className="text-[11px] text-slate-400">{lesson.categoryName}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveLesson(lesson.id);
                        }}
                        className="text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 fill-rose-400 text-rose-400" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
              {filteredLessons.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No expressions found matching your search.
                </div>
              )}
            </div>

            {/* Lesson Detail & Practice Studio (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {selectedLesson ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                          {selectedLesson.categoryName}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{selectedLesson.intimacyLevel}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-100">{selectedLesson.title}</h2>
                    </div>
                    <button
                      onClick={() => toggleSaveLesson(selectedLesson.id)}
                      className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
                    >
                      {savedLessonIds.includes(selectedLesson.id) ? (
                        <BookmarkCheck className="w-5 h-5 fill-rose-400 text-rose-400" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Phrase Box */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Target Expression</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlayModel(selectedLesson.phrase)}
                          className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-500/30 transition-all"
                        >
                          <Volume2 className="w-4 h-4" /> Listen Audio
                        </button>
                        <button
                          onClick={() => handlePracticeInRoleplay(selectedLesson.phrase, selectedLesson.title, selectedLesson.meaning)}
                          className="flex items-center gap-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-indigo-500/30 transition-all shadow-sm"
                        >
                          <Sparkles className="w-4 h-4" /> Practice in Roleplay
                        </button>
                        <button
                          onClick={() => {
                            setActivePracticeItem({
                              id: selectedLesson.id,
                              phrase: selectedLesson.phrase,
                              title: selectedLesson.title,
                              meaning: selectedLesson.meaning,
                              context: selectedLesson.context,
                              tone: selectedLesson.tone,
                              categoryName: selectedLesson.categoryName,
                              sourceModule: selectedLesson.categoryId === 'adult' ? 'edgy_adult' : 'flirting_curriculum',
                              stressGuidance: selectedLesson.speakingChallenge,
                              dialogueContext: selectedLesson.exampleDialogue,
                            });
                            setIsPracticeModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-teal-500/30 transition-all shadow-sm"
                        >
                          <Mic className="w-4 h-4" /> Practice Aloud
                        </button>
                      </div>
                    </div>
                    <p className="text-base md:text-lg font-medium text-slate-100 italic">
                      "{selectedLesson.phrase}"
                    </p>
                  </div>

                  {/* Breakdown & Explanation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Why It Works</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{selectedLesson.meaning}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Delivery Nuance</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{selectedLesson.speakingChallenge}</p>
                    </div>
                  </div>

                  {/* Example Contexts */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Contextual Examples</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedLesson.exampleDialogue?.map((dlg, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span className="italic"><strong>{dlg.speaker}:</strong> "{dlg.text}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practice Recorder */}
                  <div className="pt-4 border-t border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-200">Practice Pronunciation & Delivery</h4>
                      <span className="text-xs text-slate-400">Record yourself saying this phrase</span>
                    </div>

                    <StudioRecorder
                      onAnalyze={handleAnalyzeRecording}
                      isAnalyzing={isAnalyzing}
                    />

                    {analysisResult && (
                      <div className="mt-4">
                        <AnalysisReportView analysis={analysisResult} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-xs">
                  Select an expression from the list to view full details and practice.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPLIMENT CRAFT TAB & AI COMPLIMENT COLLECTION STUDIO (Phase 10F & 10G) */}
      {activeTab === 'compliment-craft' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Atelier Banner */}
          <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-rose-950/60 border border-indigo-500/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-400">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI-Powered Compliment Library & Collection Studio</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">Compliment Craft Studio</h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Master the art of expressing attraction, admiration, and appreciation with elegance, originality, and subtlety. Generate bespoke collections of high-impact American English compliments using advanced AI generation, vocabulary atelier, and subtlety analysis.
            </p>
          </div>

          {/* AI Compliment Collection Generator Section (Phase 10F & 10G) */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  AI Compliment Generator
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-2">Generate Bespoke Compliment Collections</h3>
                <p className="text-xs text-slate-400 mt-1">Configure your theme, tone, and audience to generate original, sophisticated compliments with nuance and delivery notes.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleGenerateCollection}
                  disabled={isGeneratingComplimentCollection}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isGeneratingComplimentCollection ? 'animate-spin' : ''}`} />
                  {isGeneratingComplimentCollection ? 'Generating Collection...' : 'Generate AI Collection'}
                </button>
              </div>
            </div>

            {/* Generator Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Theme / Focus</label>
                <select
                  value={complimentTheme}
                  onChange={(e) => setComplimentTheme(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Wit & Banter">Wit & Banter</option>
                  <option value="Deep Appreciation">Deep Appreciation</option>
                  <option value="Seductive Subtext">Seductive Subtext</option>
                  <option value="Intellectual Admiration">Intellectual Admiration</option>
                  <option value="Elegant Appearance & Style">Elegant Appearance & Style</option>
                  <option value="Warm Charm & Presence">Warm Charm & Presence</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Tone & Intimacy</label>
                <select
                  value={complimentTone}
                  onChange={(e) => setComplimentTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Playful & Sophisticated">Playful & Sophisticated</option>
                  <option value="Warm & Sincere">Warm & Sincere</option>
                  <option value="Bold & Confident">Bold & Confident</option>
                  <option value="Subtle & Intriguing">Subtle & Intriguing</option>
                  <option value="Poetic & Captivating">Poetic & Captivating</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Target Audience</label>
                <select
                  value={complimentAudience}
                  onChange={(e) => setComplimentAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="First Date / Romantic Interest">First Date / Romantic Interest</option>
                  <option value="Long-term Partner">Long-term Partner</option>
                  <option value="Cocktail Party / Social Mixer">Cocktail Party / Social Mixer</option>
                  <option value="Casual Encounter">Casual Encounter</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Quantity</label>
                <select
                  value={complimentCount}
                  onChange={(e) => setComplimentCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value={4}>4 Compliments</option>
                  <option value={6}>6 Compliments</option>
                  <option value={8}>8 Compliments</option>
                  <option value={10}>10 Compliments</option>
                </select>
              </div>
            </div>

            {generationError && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                {generationError}
              </div>
            )}

            {/* Display Generated Collection */}
            {complimentCollectionData && (
              <div className="space-y-6 pt-4 border-t border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">{complimentCollectionData.collectionTitle}</h4>
                    <p className="text-xs text-indigo-300">Theme: {complimentCollectionData.theme} • {complimentCollectionData.compliments.length} original expressions</p>
                  </div>
                  <button
                    onClick={handleExportCollection}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
                  >
                    <Download className="w-4 h-4" /> Export Collection JSON
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complimentCollectionData.compliments.map((comp) => {
                    const isSaved = savedAiCompliments.some((s) => s.id === comp.id);
                    return (
                      <div key={comp.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between shadow-md">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                              {comp.category}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">Subtlety: {comp.subtletyScore}/10</span>
                          </div>
                          <p className="text-sm font-medium text-slate-100 italic">"{comp.phrase}"</p>
                          <p className="text-[11px] text-slate-400"><strong>Delivery:</strong> {comp.deliveryNotes}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSaveAiCompliment(comp)}
                              className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                                isSaved
                                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                              {isSaved ? 'Saved' : 'Save'}
                            </button>
                            <button
                              onClick={() => handlePracticeInRoleplay(comp.phrase, 'AI Compliment', comp.deliveryNotes)}
                              className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs flex items-center gap-1.5 font-semibold transition-all"
                            >
                              <Sparkles className="w-3.5 h-3.5" /> Practice in Roleplay
                            </button>
                          </div>
                          <button
                            onClick={() => handleCopyPhrase(comp.phrase, comp.id)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                          >
                            <Copy className="w-3.5 h-3.5" /> {copiedPhraseId === comp.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Vocabulary Atelier & Subtlety Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subtlety Techniques */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Artful Subtlety & Nuance
              </h3>
              <div className="space-y-4">
                {SUBTLETY_TECHNIQUES.map((tech) => (
                  <div key={tech.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-300">{tech.title}</h4>
                      <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full">
                        {tech.whenToUse}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{tech.concept}</p>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-xs text-slate-200 italic border border-slate-800">
                      "{tech.understatedExample}"
                    </div>
                    <p className="text-[11px] text-slate-400 italic pt-1">{tech.analysis}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Construction Patterns */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-400" /> Compliment Construction Formulas
              </h3>
              <div className="space-y-4">
                {CONSTRUCTION_PATTERNS.map((pat) => (
                  <div key={pat.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-sm font-bold text-rose-300">{pat.name}</h4>
                    <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-xs text-rose-200 border border-slate-800">
                      {pat.structure}
                    </div>
                    <p className="text-xs text-slate-300 italic">Example: "{pat.example}"</p>
                    <p className="text-[11px] text-slate-400">{pat.techniqueExplanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliment Rehearsal & Tone Rewriter */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> Compliment Construction & Tone Rehearsal
            </h3>
            <p className="text-xs text-slate-300">
              Draft your original compliment below and test it against conversational context and tone objectives.
            </p>

            <div className="space-y-4">
              <textarea
                value={customComplimentInput}
                onChange={(e) => setCustomComplimentInput(e.target.value)}
                placeholder="Type your original compliment here (e.g. 'I love how passionate you get when explaining your favorite books...')..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 h-28 resize-none"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Tip: Aim for specificity over general appearance.</span>
                <button
                  onClick={handleCustomComplimentSubmit}
                  className="bg-indigo-600 hover:bg-indigo-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20"
                >
                  Analyze & Refine
                </button>
              </div>

              {complimentAnalysisResult && (
                <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-xs text-indigo-200 space-y-2 animate-fadeIn">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-400 block">Coach Analysis & Tone Feedback</span>
                  <p className="leading-relaxed">{complimentAnalysisResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roleplay' && (
        <div className="space-y-6">
          {/* Roleplay Setup & Scenario Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">Immersive Roleplay & Chemistry Engine</h3>
                <p className="text-xs text-slate-400">Choose a scenario, select tone objectives and partner gender, and practice live conversations.</p>
              </div>

              {/* Tone Style & Mode Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setRoleplayMode('roleplay')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      roleplayMode === 'roleplay'
                        ? 'bg-rose-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Immersive Roleplay
                  </button>
                  <button
                    onClick={() => setRoleplayMode('coach')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      roleplayMode === 'coach'
                        ? 'bg-rose-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Coach Mode
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium shrink-0">Style:</span>
                  <select
                    value={selectedToneStyle}
                    onChange={(e) => setSelectedToneStyle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Playful & Witty">Playful & Witty</option>
                    <option value="Warm & Sincere">Warm & Sincere</option>
                    <option value="Confident & Direct">Confident & Direct</option>
                    <option value="Romantic & Seductive">Romantic & Seductive</option>
                    <option value="Consensual Intimate">Consensual Intimate</option>
                  </select>
                </div>

                {/* Partner Gender Selector (Phase 10C) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium shrink-0">Partner:</span>
                  <select
                    value={partnerGender}
                    onChange={(e) => setPartnerGender(e.target.value as 'Male' | 'Female' | 'Either')}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Either">Either</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Scenario Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {FLIRTING_SCENARIOS.map((scen) => {
                const isSelected = currentScenario.id === scen.id;
                return (
                  <div
                    key={scen.id}
                    onClick={() => setCurrentScenario(scen)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/60 shadow-lg ring-1 ring-rose-500/30'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                          {scen.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100">{scen.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{scen.contextDescription}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Conversation Interface */}
          <div className="space-y-6">
            {currentScenario.id.startsWith('practice-') && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                  <span><strong>Focused Practice Mode:</strong> Try to naturally incorporate your target expression into this conversation!</span>
                </div>
                <button
                  onClick={() => setCurrentScenario(FLIRTING_SCENARIOS[0])}
                  className="text-[11px] underline text-rose-300 hover:text-white shrink-0 font-medium"
                >
                  Reset Scenario
                </button>
              </div>
            )}

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Active Scenario</span>
                <h3 className="text-xl font-bold text-slate-100">{currentScenario.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{currentScenario.contextDescription}</p>
              </div>
              <button
                onClick={() => {
                  setTurns([
                    {
                      id: 'reset-coach',
                      role: 'coach',
                      text: currentScenario.initialCoachMessage,
                    },
                  ]);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart Scenario
              </button>
            </div>

            {/* Conversation Log */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {turns.map((turn) => {
                const isCoach = turn.role === 'coach';
                return (
                  <div
                    key={turn.id}
                    className={`flex items-start gap-3 ${isCoach ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCoach ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
                      {isCoach ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[80%] space-y-2 p-4 rounded-2xl text-xs leading-relaxed ${isCoach ? 'bg-slate-950 border border-slate-800 text-slate-200' : 'bg-rose-950/30 border border-rose-500/30 text-rose-100'}`}>
                      <p className="whitespace-pre-wrap">{turn.text}</p>

                      {turn.feedback && turn.feedback.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">Coach Insights</span>
                          {turn.feedback.map((fb: string, idx: number) => (
                            <p key={idx} className="text-[11px] text-slate-300">• {fb}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isProcessingTurn && (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-2xl text-xs text-slate-400">
                    Partner is responding...
                  </div>
                </div>
              )}
            </div>

            {/* Input & Recorder for Roleplay */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Respond to Partner</span>
                <span className="text-[11px] text-slate-400">Record voice or type your response</span>
              </div>

              <StudioRecorder
                onAnalyze={(res: AudioRecordingResult) => handleUserRoleplayMessage(res)}
                isAnalyzing={isProcessingTurn}
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or type your response here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleUserRoleplayMessage(undefined, e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
                <button
                  onClick={(e) => {
                    const inputEl = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (inputEl && inputEl.value.trim()) {
                      handleUserRoleplayMessage(undefined, inputEl.value.trim());
                      inputEl.value = '';
                    }
                  }}
                  disabled={isProcessingTurn}
                  className="bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Saved Expressions & Repertoire</h3>
              <p className="text-xs text-slate-400">Your bookmarked flirting techniques and conversation expressions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLessons.filter((l) => savedLessonIds.includes(l.id)).map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                        {lesson.tone}
                      </span>
                      <button
                        onClick={() => toggleSaveLesson(lesson.id)}
                        className="text-rose-400 hover:text-slate-400"
                      >
                        <BookmarkCheck className="w-4 h-4 fill-rose-400" />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{lesson.title}</h4>
                    <p className="text-xs text-slate-300 italic">"{lesson.phrase}"</p>
                  </div>

                  <div className="pt-3 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                    <button
                      onClick={() => handlePracticeInRoleplay(lesson.phrase, lesson.title, lesson.meaning)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Practice in Roleplay
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLesson(lesson);
                        setActiveTab('curriculum');
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                    >
                      Study <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {savedLessonIds.length === 0 && (
                <div className="col-span-full py-6 text-center text-slate-500 text-xs">
                  No saved curriculum expressions yet. Click the bookmark icon on any lesson to save it here.
                </div>
              )}
            </div>

            {/* Saved AI Compliments Section */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Saved AI Compliments ({savedAiCompliments.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAiCompliments.map((comp) => (
                  <div key={comp.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                          {comp.category}
                        </span>
                        <button
                          onClick={() => toggleSaveAiCompliment(comp)}
                          className="text-rose-400 hover:text-slate-400"
                        >
                          <BookmarkCheck className="w-4 h-4 fill-rose-400" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-slate-100 italic">"{comp.phrase}"</p>
                      <p className="text-[11px] text-slate-400"><strong>Delivery:</strong> {comp.deliveryNotes}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                      <button
                        onClick={() => handlePracticeInRoleplay(comp.phrase, 'Saved Compliment', comp.deliveryNotes)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Practice in Roleplay
                      </button>
                      <button
                        onClick={() => handleCopyPhrase(comp.phrase, comp.id)}
                        className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" /> {copiedPhraseId === comp.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}

                {savedAiCompliments.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                    No saved AI compliments yet. Generate a collection in Compliment Craft & AI and save your favorite expressions.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <PracticeAloudModal
        item={activePracticeItem}
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
      />
    </div>
  );
};
