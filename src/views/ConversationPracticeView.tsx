import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  Volume2,
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  Clock,
  User,
  Bot,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Layers,
  Award,
  Play,
  ChevronRight,
  Info,
  ShieldAlert,
  Target,
} from 'lucide-react';
import { CONVERSATION_SCENARIOS } from '../data/conversationScenarios';
import { ConversationScenario, LearnerProfile } from '../types/speech';
import { StudioRecorder } from '../components/StudioRecorder';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { submitConversationTurn } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface ConversationTurn {
  id: string;
  role: 'coach' | 'user';
  text: string;
  feedback?: string[];
  audioUrl?: string;
}

interface ConversationPracticeViewProps {
  profile: LearnerProfile;
}

const CATEGORIES = [
  'All',
  'Everyday',
  'Making Friends',
  'Workplace',
  'Meetings & Ideas',
  'Job Interviews',
  'Opinions & Debate',
  'Clarification',
  'Storytelling',
  'Phone & Video',
  'Unexpected',
];

export const ConversationPracticeView: React.FC<ConversationPracticeViewProps> = ({ profile }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBriefingModal, setShowBriefingModal] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const currentScenario = useMemo(() => {
    return CONVERSATION_SCENARIOS.find((s) => s.id === selectedScenarioId) || CONVERSATION_SCENARIOS[0];
  }, [selectedScenarioId]);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const scenarioRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeBtn = scenarioRefs.current[selectedScenarioId];
    const container = navContainerRef.current;
    if (activeBtn && container) {
      const containerWidth = container.clientWidth;
      const activeLeft = activeBtn.offsetLeft;
      const activeWidth = activeBtn.clientWidth;
      const targetLeft = activeLeft - containerWidth / 2 + activeWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, [selectedScenarioId]);

  const [turns, setTurns] = useState<ConversationTurn[]>([
    {
      id: 'init-1',
      role: 'coach',
      text: currentScenario.initialCoachMessage,
    },
  ]);

  const [isProcessingTurn, setIsProcessingTurn] = useState<boolean>(false);
  const [isPlayingCoachVoice, setIsPlayingCoachVoice] = useState<string | null>(null);
  const [practiceObjective, setPracticeObjective] = useState<string>('Keep conversation going naturally');
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  const filteredScenarios = useMemo(() => {
    return CONVERSATION_SCENARIOS.filter((s) => {
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'All' || s.difficulty === selectedDifficulty;
      const matchesSearch =
        !searchQuery ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.contextDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.keyPhrases.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesDiff && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setSessionCompleted(false);
    const scenario = CONVERSATION_SCENARIOS.find((s) => s.id === id) || CONVERSATION_SCENARIOS[0];
    setTurns([
      {
        id: `init-${Date.now()}`,
        role: 'coach',
        text: scenario.initialCoachMessage,
      },
    ]);
  };

  const handlePlayVoice = (text: string, id: string) => {
    setIsPlayingCoachVoice(id);
    referenceSpeaker.play(
      text,
      1.0,
      () => setIsPlayingCoachVoice(id),
      () => setIsPlayingCoachVoice(null)
    );
  };

  const handleUserRecording = async (recording: AudioRecordingResult) => {
    setIsProcessingTurn(true);

    try {
      const response = await submitConversationTurn({
        scenarioTitle: currentScenario.title,
        scenarioPrompt: currentScenario.contextDescription,
        conversationHistory: turns.map((t) => ({ role: t.role, text: t.text })),
        latestUserAudioBase64: recording.base64,
        practiceObjective,
      });

      const userTurn: ConversationTurn = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: response.learnerTranscript || 'Spoken input recorded',
        audioUrl: recording.blobUrl,
      };

      const coachTurn: ConversationTurn = {
        id: `coach-${Date.now()}`,
        role: 'coach',
        text: `${response.coachResponseText} ${response.suggestedNextQuestion}`,
        feedback: response.coachingFeedback,
      };

      setTurns((prev) => [...prev, userTurn, coachTurn]);

      // Play coach response audio
      handlePlayVoice(coachTurn.text, coachTurn.id);

      // Record session
      saveSessionRecord({
        id: `conv-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `Dialogue: ${currentScenario.title}`,
        category: 'conversation',
        durationSeconds: recording.durationSeconds,
        transcript: userTurn.text,
        summary: response.coachResponseText,
      });

      if (turns.length >= 7) {
        setSessionCompleted(true);
      }
    } catch (e) {
      console.error('Conversation turn error:', e);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  const resetConversation = () => {
    setTurns([
      {
        id: `init-${Date.now()}`,
        role: 'coach',
        text: currentScenario.initialCoachMessage,
      },
    ]);
    setSessionCompleted(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <MessageSquare className="w-4 h-4" />
            <span>Conversation Practice Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            Interactive Dialogue with Coach Alex
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Master 20+ realistic American English conversation scenarios across everyday chats, professional networking, job interviews, and impromptu challenges.
          </p>
        </div>

        <button
          onClick={() => setShowBriefingModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-xl text-sm font-semibold transition-all self-start md:self-auto"
        >
          <Info className="w-4 h-4" />
          <span>Scenario Briefing & Goals</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scenarios, tags, or key phrases..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-teal-500/50 transition-all"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pill Selector (Responsive Horizontal Swipe) */}
        <div className="w-full max-w-full min-w-0">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 min-w-0 w-full max-w-full no-scrollbar scrollbar-none touch-pan-x px-0.5 scroll-smooth whitespace-nowrap flex-nowrap"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Selector Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Active Scenario ({filteredScenarios.length} available)
          </label>
        </div>

        <div
          ref={navContainerRef}
          className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scrollbar-none touch-pan-x scroll-smooth"
        >
          {filteredScenarios.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            return (
              <button
                key={scen.id}
                ref={(el) => {
                  scenarioRefs.current[scen.id] = el;
                }}
                onClick={() => handleScenarioChange(scen.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all shrink-0 w-72 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-900 border-teal-500/50 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/30'
                    : 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        scen.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : scen.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {scen.difficulty}
                    </span>
                    <span className="text-[11px] text-teal-400 font-medium">{scen.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 line-clamp-1">{scen.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {scen.contextDescription}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-teal-400" /> {scen.learnerRole}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Top: Scenario Briefing Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Scenario Briefing
              </span>
              <button
                onClick={resetConversation}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 px-2.5 py-1 rounded-xl transition-all"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restart
              </button>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-100">{currentScenario.title}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {currentScenario.contextDescription}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Your Role:</span>
                <span className="font-semibold text-slate-200">{currentScenario.learnerRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Coach Role:</span>
                <span className="font-semibold text-slate-200">{currentScenario.coachRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Difficulty:</span>
                <span className="font-semibold text-teal-400">{currentScenario.difficulty}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 block mb-1">Conversational Goal:</span>
              <p className="text-xs text-slate-400 italic bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                "{currentScenario.goal}"
              </p>
            </div>

            {currentScenario.keyPhrases?.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 block mb-1.5">Recommended Phrases:</span>
                <div className="space-y-1.5">
                  {currentScenario.keyPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-teal-950/30 text-teal-300 px-2.5 py-1.5 rounded-xl border border-teal-500/20 font-medium"
                    >
                      "{phrase}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Practice Objective */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-teal-400" /> Optional Objective:
              </span>
              <select
                value={practiceObjective}
                onChange={(e) => setPracticeObjective(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="Keep conversation going naturally">Keep conversation going naturally</option>
                <option value="Ask better follow-up questions">Ask better follow-up questions</option>
                <option value="Sound less formal and more natural">Sound less formal & more natural</option>
                <option value="Respond to teasing with a witty comeback">Respond to teasing with a witty comeback</option>
                <option value="Express interest without sounding forced">Express interest without sounding forced</option>
                <option value="Recover from an awkward moment">Recover from an awkward moment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Chat Transcript & Studio Recorder */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-[480px] backdrop-blur-md">
            {/* Transcript Flow */}
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {turns.map((turn) => {
                const isCoach = turn.role === 'coach';
                return (
                  <div
                    key={turn.id}
                    className={`flex gap-3 ${isCoach ? 'items-start' : 'items-start flex-row-reverse'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isCoach
                          ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}
                    >
                      {isCoach ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`space-y-2 max-w-[85%] ${isCoach ? '' : 'text-right'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">
                          {isCoach ? 'Coach Alex' : 'You'}
                        </span>
                        {isCoach && (
                          <button
                            onClick={() => handlePlayVoice(turn.text, turn.id)}
                            className={`p-1 rounded-lg transition-all ${
                              isPlayingCoachVoice === turn.id
                                ? 'bg-teal-500 text-slate-950 animate-pulse'
                                : 'bg-slate-800/80 text-teal-400 hover:bg-slate-800'
                            }`}
                            title="Play audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                          isCoach
                            ? 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-sm'
                            : 'bg-teal-950/40 border border-teal-500/30 text-teal-100 rounded-tr-sm text-left'
                        }`}
                      >
                        {turn.text}
                      </div>

                      {/* Coaching Feedback notes if attached */}
                      {turn.feedback && turn.feedback.length > 0 && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1 text-left">
                          <span className="font-bold text-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> Coach Feedback:
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-amber-200/90">
                            {turn.feedback.map((fb, fidx) => (
                              <li key={fidx}>{fb}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isProcessingTurn && (
                <div className="flex items-center gap-3 p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl animate-pulse">
                  <Bot className="w-5 h-5 text-teal-400 animate-spin" />
                  <span className="text-xs font-semibold text-slate-300">
                    Coach Alex is analyzing your pronunciation, phrasing, and preparing the next turn...
                  </span>
                </div>
              )}

              {sessionCompleted && (
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-4 text-center space-y-2">
                  <Award className="w-6 h-6 text-teal-400 mx-auto" />
                  <h4 className="text-sm font-bold text-teal-200">Conversation Milestone Reached!</h4>
                  <p className="text-xs text-slate-300">
                    You've completed multiple turns in this scenario. Great job practicing active dialogue and natural pacing.
                  </p>
                  <button
                    onClick={resetConversation}
                    className="px-4 py-2 bg-teal-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20"
                  >
                    Start New Round
                  </button>
                </div>
              )}
            </div>

            {/* Recorder / Input Bar */}
            <div className="pt-4 mt-4 border-t border-slate-800/80">
              <StudioRecorder
                onAnalyze={handleUserRecording}
                isAnalyzing={isProcessingTurn}
                label={`Speak your turn for: "${currentScenario.title}"`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Briefing Modal */}
      {showBriefingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>Scenario Briefing & Strategy</span>
              </div>
              <button
                onClick={() => setShowBriefingModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-semibold bg-slate-800 px-3 py-1 rounded-xl"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-100">{currentScenario.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {currentScenario.contextDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Category</span>
                  <span className="font-semibold text-slate-200">{currentScenario.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Difficulty</span>
                  <span className="font-semibold text-teal-400">{currentScenario.difficulty}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Your Role</span>
                  <span className="font-semibold text-slate-200">{currentScenario.learnerRole}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Coach Role</span>
                  <span className="font-semibold text-slate-200">{currentScenario.coachRole}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-300">Goal:</span>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {currentScenario.goal}
                </p>
              </div>

              {currentScenario.suggestedResponses?.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-300">Suggested Openers:</span>
                  <div className="space-y-2">
                    {currentScenario.suggestedResponses.map((resp, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-slate-950/80 text-slate-300 p-2.5 rounded-xl border border-slate-800/80 italic"
                      >
                        "{resp}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowBriefingModal(false)}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-2xl font-bold text-sm shadow-lg shadow-teal-500/20 transition-all"
            >
              Got It, Let's Practice!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
