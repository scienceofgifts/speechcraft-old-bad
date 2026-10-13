import React, { useState } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  Radio,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { PRONUNCIATION_LESSONS } from '../data/pronunciationCurriculum';
import { PronunciationLesson, SpeechAnalysisResult, LearnerProfile } from '../types/speech';
import { StudioRecorder } from '../components/StudioRecorder';
import { AnalysisReportView } from '../components/AnalysisReportView';
import { HorizontalCategoryNav, CategoryNavItem } from '../components/HorizontalCategoryNav';
import { PronunciationGuideView } from '../components/PronunciationGuideView';
import { TongueTwisterStudioView } from '../components/TongueTwisterStudioView';
import { AudioRecordingResult } from '../hooks/useAudioRecorder';
import { analyzeSpeech } from '../services/apiService';
import { referenceSpeaker } from '../services/ttsService';
import { saveSessionRecord } from '../services/storage';

interface PronunciationLabViewProps {
  profile: LearnerProfile;
}

export const PronunciationLabView: React.FC<PronunciationLabViewProps> = ({ profile }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(PRONUNCIATION_LESSONS[0].id);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [activeSpeed, setActiveSpeed] = useState<number>(1.0); // 1.0 or 0.75
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showTongueTwisters, setShowTongueTwisters] = useState<boolean>(false);

  // Practice state
  const [practiceMode, setPracticeMode] = useState<'words' | 'minimal-pairs' | 'sentences' | 'twister'>('words');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [lastAudioUrl, setLastAudioUrl] = useState<string | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  const currentLesson: PronunciationLesson =
    PRONUNCIATION_LESSONS.find((l) => l.id === selectedLessonId) || PRONUNCIATION_LESSONS[0];

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
    setIsAnalyzing(true);
    setLastAudioUrl(recording.blobUrl);

    // Context target based on active practice mode
    let targetScript = currentLesson.referenceAudioText;
    if (practiceMode === 'sentences' && currentLesson.sentences.length) {
      targetScript = currentLesson.sentences.join(' ');
    } else if (practiceMode === 'twister' && currentLesson.tongueTwister) {
      targetScript = currentLesson.tongueTwister;
    } else if (practiceMode === 'words') {
      targetScript = currentLesson.words.map((w) => w.word).join(', ');
    }

    try {
      const result = await analyzeSpeech({
        audioBase64: recording.base64,
        mimeType: recording.mimeType,
        durationSeconds: recording.durationSeconds,
        exerciseType: `Pronunciation Lab: ${currentLesson.title} (${practiceMode})`,
        targetText: targetScript,
        targetAccent: profile.targetAccent,
      });

      setAnalysisResult(result);

      // Save session
      saveSessionRecord({
        id: `pronun-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: `${currentLesson.title} (${practiceMode})`,
        category: 'pronunciation',
        durationSeconds: recording.durationSeconds,
        transcript: result.transcript,
        wpm: result.metrics.estimatedWpm,
        fillerCount: result.metrics.fillerCount,
        score: result.metrics.pronunciationScore,
        summary: result.summary,
      });

      // Mark lesson completed
      if (!completedLessonIds.includes(currentLesson.id)) {
        setCompletedLessonIds((prev) => [...prev, currentLesson.id]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Build category nav items for HorizontalCategoryNav
  const navItems: CategoryNavItem[] = PRONUNCIATION_LESSONS.map((lesson) => ({
    id: lesson.id,
    label: lesson.title.split(':')[0],
    badge: lesson.phoneticIpa,
    isCompleted: completedLessonIds.includes(lesson.id),
  }));

  if (showGuide) {
    return <PronunciationGuideView onBackToLab={() => setShowGuide(false)} />;
  }

  if (showTongueTwisters) {
    return <TongueTwisterStudioView profile={profile} onBack={() => setShowTongueTwisters(false)} />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Pronunciation Guide Banner / Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Volume2 className="w-4 h-4" />
            <span>American Pronunciation Lab</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-1">
            General American Phonology Curriculum
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Master the biomechanics of American English: rhotic R resonance, intervocalic flap T, vowel contrasts, diphthongs, and connected speech catenation with native reference audio models.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowGuide(true)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Pronunciation Guide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prominent Tongue Twister Studio Entry Card */}
      <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/60 border border-teal-500/30 rounded-3xl p-6 md:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Dedicated Training Studio</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">
            Tongue Twister Studio
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Train specific American English sounds with guided tongue twisters, articulation drills, reference audio, and progressive speaking practice.
          </p>
        </div>
        <button
          onClick={() => setShowTongueTwisters(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-teal-500/20 shrink-0 cursor-pointer"
        >
          <span>Explore Tongue Twisters</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Curriculum Module Horizontal Navigation */}
      <HorizontalCategoryNav
        items={navItems}
        selectedId={selectedLessonId}
        onSelect={(id) => {
          setSelectedLessonId(id);
          setAnalysisResult(null);
          setLastAudioUrl(null);
        }}
        ariaLabel="Pronunciation Curriculum Categories"
      />

      {/* Main Lesson Studio Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Explanations & Biomechanics (1 col) */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                {currentLesson.category}
              </span>
              <h3 className="text-xl font-bold text-slate-100 mt-1">{currentLesson.title}</h3>
              <div className="font-mono text-sm text-teal-300 font-semibold mt-1">
                Target: {currentLesson.targetSound} ({currentLesson.phoneticIpa})
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
              {currentLesson.explanation}
            </p>

            {/* Biomechanics Breakdown */}
            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Mouth Biomechanics
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="font-semibold text-slate-200">Tongue:</span>{' '}
                  {currentLesson.mouthMechanics.tongue}
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Lips:</span>{' '}
                  {currentLesson.mouthMechanics.lips}
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Jaw & Cords:</span>{' '}
                  {currentLesson.mouthMechanics.jawAndVocalCords}
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-rose-950/20 rounded-2xl p-4 border border-rose-900/30 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Common Interferences
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {currentLesson.commonMistakes}
              </p>
            </div>

            {/* Reference Audio Player */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 mb-2">Native Reference Model</div>
              <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-200 italic truncate">
                  "{currentLesson.referenceAudioText}"
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handlePlayReference(currentLesson.referenceAudioText, currentLesson.id, 1.0)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
                      playingAudioId === currentLesson.id && activeSpeed === 1.0
                        ? 'bg-teal-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                    title="Play normal speed"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>1.0x</span>
                  </button>
                  <button
                    onClick={() => handlePlayReference(currentLesson.referenceAudioText, `${currentLesson.id}-slow`, 0.75)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
                      playingAudioId === `${currentLesson.id}-slow` && activeSpeed === 0.75
                        ? 'bg-teal-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                    title="Play slow 0.75x speed"
                  >
                    <span>0.75x</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Studio & Drills (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Practice Mode Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100">Interactive Practice Studio</h3>
                <p className="text-xs text-slate-400">Select drill mode and record your pronunciation attempt</p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setPracticeMode('words')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    practiceMode === 'words'
                      ? 'bg-teal-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Key Words ({currentLesson.words.length})
                </button>
                {currentLesson.minimalPairs && currentLesson.minimalPairs.length > 0 && (
                  <button
                    onClick={() => setPracticeMode('minimal-pairs')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      practiceMode === 'minimal-pairs'
                        ? 'bg-teal-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Minimal Pairs
                  </button>
                )}
                <button
                  onClick={() => setPracticeMode('sentences')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    practiceMode === 'sentences'
                      ? 'bg-teal-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sentences
                </button>
                {currentLesson.tongueTwister && (
                  <button
                    onClick={() => setPracticeMode('twister')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      practiceMode === 'twister'
                        ? 'bg-teal-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Tongue Twister
                  </button>
                )}
              </div>
            </div>

            {/* Active Practice Drill Content */}
            <div className="space-y-4">
              {practiceMode === 'words' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.words.map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-teal-500/40 transition-all group"
                    >
                      <div>
                        <div className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                          {w.word}
                        </div>
                        <div className="font-mono text-xs text-teal-400/90 mt-0.5">{w.phonetic}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{w.context}</div>
                      </div>
                      <button
                        onClick={() => handlePlayReference(w.word, `${currentLesson.id}-word-${idx}`)}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/50 transition-all shrink-0"
                        title={`Listen to ${w.word}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {practiceMode === 'minimal-pairs' && currentLesson.minimalPairs && (
                <div className="space-y-3">
                  {currentLesson.minimalPairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-teal-500/10 border border-teal-500/30 px-3 py-2 rounded-xl text-center">
                          <span className="text-sm font-bold text-teal-300">{pair.pairA}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">vs</span>
                        <div className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-2 rounded-xl text-center">
                          <span className="text-sm font-bold text-indigo-300">{pair.pairB}</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-300 flex-1 sm:text-right italic">
                        {pair.difference}
                      </div>
                      <button
                        onClick={() => handlePlayReference(`${pair.pairA}... ${pair.pairB}`, `${currentLesson.id}-pair-${idx}`)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-300 transition-all shrink-0"
                        title="Listen to pair"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {practiceMode === 'sentences' && (
                <div className="space-y-3">
                  {currentLesson.sentences.map((sentence, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider">
                          Sentence Drill {idx + 1}
                        </span>
                        <p className="text-sm text-slate-100 font-medium">"{sentence}"</p>
                      </div>
                      <button
                        onClick={() => handlePlayReference(sentence, `${currentLesson.id}-sent-${idx}`)}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-300 transition-all shrink-0"
                        title="Listen to sentence"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {practiceMode === 'twister' && currentLesson.tongueTwister && (
                <div className="bg-gradient-to-br from-teal-950/30 via-slate-950 to-indigo-950/30 border border-teal-500/30 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Articulation Tongue Twister Challenge
                    </span>
                    <button
                      onClick={() => handlePlayReference(currentLesson.tongueTwister!, `${currentLesson.id}-twister`)}
                      className="px-3 py-1.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                  <p className="text-base font-bold text-slate-100 italic leading-relaxed">
                    "{currentLesson.tongueTwister}"
                  </p>
                </div>
              )}
            </div>

            {/* Studio Recorder Component */}
            <div className="border-t border-slate-800 pt-6">
              <div className="mb-4">
                <h4 className="text-sm font-bold text-slate-200">Record & Evaluate Attempt</h4>
                <p className="text-xs text-slate-400">
                  Read the target text aloud. Gemini AI will analyze your phoneme accuracy, pacing, and mechanics.
                </p>
              </div>
              <StudioRecorder
                onAnalyze={handleAnalyzeAttempt}
                isAnalyzing={isAnalyzing}
                label="Record Pronunciation Attempt"
              />
            </div>

            {/* Analysis Result Report */}
            {analysisResult && (
              <div className="border-t border-slate-800 pt-6 animate-fadeIn">
                <AnalysisReportView analysis={analysisResult} recordedAudioUrl={lastAudioUrl || undefined} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
