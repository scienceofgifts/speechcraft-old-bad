import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  X,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Layers,
  Award,
} from 'lucide-react';
import { DETAILED_WORD_LESSONS, WORD_ROOTS } from '../data/vocabBuilderData';
import { VOCABULARY_CATALOGUE } from '../data/vocabularyCatalogue';
import { referenceSpeaker } from '../services/ttsService';
import { recordFlashcardRating, recordSelfCheckScore } from '../services/vocabBuilderStorage';

interface VocabPracticeReviewProps {
  onSelectWord: (wordId: string) => void;
  onRefreshProgress?: () => void;
}

export const VocabPracticeReview: React.FC<VocabPracticeReviewProps> = ({
  onSelectWord,
  onRefreshProgress,
}) => {
  const [practiceMode, setPracticeMode] = useState<'flashcards' | 'context' | 'roots' | 'synonyms'>('flashcards');

  // Flashcards state
  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const currentFlashcard = VOCABULARY_CATALOGUE[flashcardIdx % VOCABULARY_CATALOGUE.length];
  const detailedLesson = currentFlashcard ? DETAILED_WORD_LESSONS.find((l) => l.id === currentFlashcard.id) : null;
  const linkedRoot = currentFlashcard?.rootId ? WORD_ROOTS.find((r) => r.id === currentFlashcard.rootId) : null;

  // Practice Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const handlePlayAudio = (text: string) => {
    referenceSpeaker.play(text, 1.0);
  };

  const handleRateFlashcard = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (currentFlashcard) {
      recordFlashcardRating(currentFlashcard.id, rating);
      if (onRefreshProgress) onRefreshProgress();
    }
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev + 1) % VOCABULARY_CATALOGUE.length);
  };

  // 10 Contextual practice questions derived from our rich lesson dataset
  const contextQuestions = [
    {
      prompt: 'Complete the sentence with the most precise word: "Rather than taking a firm ethical stand on the proposed zoning ordinance, the mayor chose to ________, uttering safe platitudes that could be interpreted either way."',
      options: ['equivocate', 'exonerate', 'delineate', 'synthesize'],
      correctIndex: 0,
      lessonId: 'lesson-equivocate',
      explanation: 'To equivocate is to speak with intentional ambiguity to avoid committing oneself or concealing truth.',
    },
    {
      prompt: 'Which word describes a person whose psychological orientation and mental energy are replenished through quiet internal contemplation rather than large social crowds?',
      options: ['Extrovert', 'Introvert', 'Ambivert', 'Misanthrope'],
      correctIndex: 1,
      lessonId: 'lesson-introvert',
      explanation: 'An introvert is oriented inward toward thoughts and concepts rather than external social stimulation.',
    },
    {
      prompt: 'Select the most appropriate word: "The general was ________ in victory, allowing the defeated troops to return to their family farms with their horses."',
      options: ['perfunctory', 'magnanimous', 'supercilious', 'garrulous'],
      correctIndex: 1,
      lessonId: 'lesson-magnanimous',
      explanation: 'Magnanimous describes high-minded nobility of spirit and generosity toward defeated rivals or opponents.',
    },
    {
      prompt: 'Identify the word describing a deep-seated, natural, or visceral feeling of intense dislike and aversion toward something:',
      options: ['Apathy', 'Antipathy', 'Empathy', 'Sympathy'],
      correctIndex: 1,
      lessonId: 'lesson-antipathy',
      explanation: 'Antipathy combines anti- (against) with pathos (feeling) to denote a deep-seated active aversion.',
    },
    {
      prompt: 'Complete the sentence: "Because cherry blossoms bloom magnificently for only a few days each spring, they are cherished as a symbol of ________ beauty."',
      options: ['ephemeral', 'intractable', 'fastidious', 'perfunctory'],
      correctIndex: 0,
      lessonId: 'lesson-ephemeral',
      explanation: 'Ephemeral derives from the Greek for "lasting only a day," signifying delicate, fleeting existence.',
    },
  ];

  const currentContextQuestion = contextQuestions[quizIdx % contextQuestions.length];

  const handleSelectQuizAnswer = (idx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswer(idx);
    setSubmittedQuiz(true);
    const isCorrect = idx === currentContextQuestion.correctIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    recordSelfCheckScore(currentContextQuestion.lessonId, isCorrect);
    if (onRefreshProgress) onRefreshProgress();
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setSubmittedQuiz(false);
    setQuizIdx((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
            <Award className="w-4 h-4" />
            <span>Practice & Self-Testing Lab</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">
            Spaced Repetition & Contextual Challenges
          </h2>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="w-full max-w-full min-w-0">
          <div
            role="tablist"
            aria-label="Practice Review Modes"
            className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar scrollbar-none touch-pan-x scroll-smooth min-w-0 w-full max-w-full"
          >
            <button
              type="button"
              onClick={() => setPracticeMode('flashcards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                practiceMode === 'flashcards'
                  ? 'bg-teal-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flashcard Deck
            </button>
            <button
              type="button"
              onClick={() => setPracticeMode('context')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                practiceMode === 'context'
                  ? 'bg-teal-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Contextual Quiz ({score.correct}/{score.total})
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: FLASHCARDS */}
      {practiceMode === 'flashcards' && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Card {flashcardIdx + 1} of {VOCABULARY_CATALOGUE.length}
            </span>
            <span>Tap card to reveal definition & etymology</span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-slate-700 transition-all select-none relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-teal-300 border border-slate-700">
                {currentFlashcard.difficulty}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {isFlipped ? 'Back of Card' : 'Front of Card (Tap to Flip)'}
              </span>
            </div>

            {!isFlipped ? (
              /* FRONT OF CARD */
              <div className="text-center space-y-3 my-auto py-8">
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-100 font-serif tracking-tight">
                  {currentFlashcard.word}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {detailedLesson?.phoneticIpa && (
                    <span className="font-mono text-sm text-teal-400">{detailedLesson.phoneticIpa}</span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentFlashcard.word);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 italic font-serif">
                  {currentFlashcard.partOfSpeech}
                </div>
              </div>
            ) : (
              /* BACK OF CARD */
              <div className="space-y-4 my-auto py-2 animate-fadeIn text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                    Primary Definition:
                  </span>
                  <p className="text-base text-slate-100 font-medium leading-relaxed font-serif">
                    {detailedLesson?.definitions[0]?.definition || currentFlashcard.definition}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  {linkedRoot && (
                    <div>
                      <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Root: </span>
                      <strong className="text-teal-300 font-mono">{linkedRoot.root}</strong> ({linkedRoot.meaning})
                    </div>
                  )}
                  {detailedLesson?.definitions[0]?.example && (
                    <div>
                      <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Example: </span>
                      <span className="italic">"{detailedLesson.definitions[0].example}"</span>
                    </div>
                  )}
                  {currentFlashcard.topicTags && currentFlashcard.topicTags.length > 0 && (
                    <div>
                      <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Topics: </span>
                      <span className="text-slate-300">{currentFlashcard.topicTags.join(', ')}</span>
                    </div>
                  )}
                </div>

                {detailedLesson?.memoryAids[0] && (
                  <div className="text-xs text-amber-300/90 leading-relaxed">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] block">Memory Hook:</span>
                    {detailedLesson.memoryAids[0].explanation}
                  </div>
                )}
              </div>
            )}

            <div className="text-center text-[11px] text-slate-500 font-mono">
              {isFlipped ? 'Rate recall below to schedule next review' : 'Click anywhere on card to flip'}
            </div>
          </div>

          {/* Spaced Repetition Rating Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleRateFlashcard('again')}
              className="py-3 px-2 rounded-2xl bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 text-rose-200 text-xs font-semibold text-center transition-all"
            >
              <div>Again</div>
              <div className="text-[10px] text-rose-400 font-normal">1 day</div>
            </button>
            <button
              type="button"
              onClick={() => handleRateFlashcard('hard')}
              className="py-3 px-2 rounded-2xl bg-amber-950/40 hover:bg-amber-950/70 border border-amber-800/60 text-amber-200 text-xs font-semibold text-center transition-all"
            >
              <div>Hard</div>
              <div className="text-[10px] text-amber-400 font-normal">2 days</div>
            </button>
            <button
              type="button"
              onClick={() => handleRateFlashcard('good')}
              className="py-3 px-2 rounded-2xl bg-sky-950/40 hover:bg-sky-950/70 border border-sky-800/60 text-sky-200 text-xs font-semibold text-center transition-all"
            >
              <div>Good</div>
              <div className="text-[10px] text-sky-400 font-normal">4 days</div>
            </button>
            <button
              type="button"
              onClick={() => handleRateFlashcard('easy')}
              className="py-3 px-2 rounded-2xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 text-emerald-200 text-xs font-semibold text-center transition-all"
            >
              <div>Easy</div>
              <div className="text-[10px] text-emerald-400 font-normal">7 days</div>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: CONTEXTUAL QUIZ */}
      {practiceMode === 'context' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span>
              Question {(quizIdx % contextQuestions.length) + 1} of {contextQuestions.length}
            </span>
            <span className="font-mono text-teal-400">
              Score: {score.correct} / {score.total} (
              {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 100}%)
            </span>
          </div>

          <p className="text-sm md:text-base text-slate-100 font-medium leading-relaxed font-serif">
            {currentContextQuestion.prompt}
          </p>

          <div className="space-y-2.5 pt-2">
            {currentContextQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentContextQuestion.correctIndex;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (submittedQuiz) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectQuizAnswer(idx)}
                  disabled={submittedQuiz}
                  className={`w-full p-4 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span className="capitalize">{opt}</span>
                  {submittedQuiz && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {submittedQuiz && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {submittedQuiz && (
            <div className="pt-3 border-t border-slate-800 space-y-3 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-teal-300 font-semibold block mb-0.5">Educational Explanation:</strong>
                {currentContextQuestion.explanation}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectWord(currentContextQuestion.lessonId)}
                  className="text-xs text-teal-400 hover:text-teal-300 underline underline-offset-4"
                >
                  Review full lesson for this word →
                </button>

                <button
                  type="button"
                  onClick={handleNextQuizQuestion}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
