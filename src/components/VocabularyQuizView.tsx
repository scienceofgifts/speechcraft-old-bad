import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { VocabularyItem } from '../types/speech';

interface VocabularyQuizViewProps {
  items: VocabularyItem[];
}

interface QuizQuestion {
  id: string;
  type: 'meaning' | 'completion' | 'situation';
  prompt: string;
  targetTerm: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const VocabularyQuizView: React.FC<VocabularyQuizViewProps> = ({ items }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate quiz questions from items
  useEffect(() => {
    if (!items || items.length < 4) return;

    const generated: QuizQuestion[] = [];
    // Shuffle items to get diverse questions
    const shuffled = [...items].sort(() => 0.5 - Math.random());

    shuffled.slice(0, 10).forEach((item, idx) => {
      // Distractors from other items
      const distractors = items
        .filter((i) => i.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const questionType = idx % 3;

      if (questionType === 0) {
        // Match Meaning
        const options = [item.meaning, ...distractors.map((d) => d.meaning)].sort(
          () => 0.5 - Math.random()
        );
        const correctIndex = options.indexOf(item.meaning);
        generated.push({
          id: `quiz-mean-${item.id}`,
          type: 'meaning',
          prompt: `What is the precise meaning of the American expression "${item.term}"?`,
          targetTerm: item.term,
          options,
          correctIndex,
          explanation: `"${item.term}" means: ${item.meaning}. Natural example: "${item.naturalExample}"`,
        });
      } else if (questionType === 1) {
        // Sentence Completion
        const sentenceWithBlank = item.naturalExample.replace(
          new RegExp(item.term, 'gi'),
          '__________'
        );
        const options = [item.term, ...distractors.map((d) => d.term)].sort(
          () => 0.5 - Math.random()
        );
        const correctIndex = options.indexOf(item.term);
        generated.push({
          id: `quiz-comp-${item.id}`,
          type: 'completion',
          prompt: `Complete the natural American sentence:\n\n"${sentenceWithBlank}"`,
          targetTerm: item.term,
          options,
          correctIndex,
          explanation: `The correct expression is "${item.term}". Meaning: ${item.meaning}`,
        });
      } else {
        // Situational Fit
        const options = [item.term, ...distractors.map((d) => d.term)].sort(
          () => 0.5 - Math.random()
        );
        const correctIndex = options.indexOf(item.term);
        generated.push({
          id: `quiz-sit-${item.id}`,
          type: 'situation',
          prompt: `Which professional or conversational expression best fits this situation?\n\nContext: ${item.speakingPrompt}`,
          targetTerm: item.term,
          options,
          correctIndex,
          explanation: `"${item.term}" is ideal for this situation. Register: ${item.register}.`,
        });
      }
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedOption(null);
    setIsSubmitted(false);
    setQuizFinished(false);
  }, [items]);

  if (!questions.length) {
    return (
      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
        <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-200">Preparing Quiz Questions...</h3>
        <p className="text-xs text-slate-400">Please ensure you have loaded vocabulary catalogue items.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    const isCorrect = idx === currentQ.correctIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    // Regenerate or reshuffle
    setQuestions([...questions].sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setSelectedOption(null);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score.correct / (score.total || 1)) * 100);
    return (
      <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-fadeIn">
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 border border-teal-500/40 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">Quiz Completed!</h2>
          <p className="text-sm text-slate-400">
            You scored <strong className="text-teal-400 font-bold">{score.correct}</strong> out of{' '}
            <strong className="text-slate-200">{score.total}</strong> ({percentage}%)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          {percentage >= 80
            ? '🏆 Outstanding mastery! You have a firm command of these American idioms and executive expressions.'
            : percentage >= 50
            ? '👍 Good progress! Review the study deck to solidify your recall of the trickier expressions.'
            : '📚 Keep practicing! Consistent review in the study deck and quizzes will boost your verbal precision.'}
        </div>

        <button
          onClick={handleRestartQuiz}
          className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Take Another Quiz Round
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Quiz Progress & Score Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-teal-400 uppercase tracking-wider">Active Recall Quiz</span>
          <span>•</span>
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="font-mono text-slate-300">
          Score: <strong className="text-teal-400">{score.correct}</strong> / {score.total}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase">
          {currentQ.type === 'meaning'
            ? 'Match Definition'
            : currentQ.type === 'completion'
            ? 'Sentence Completion'
            : 'Situational Fit'}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-relaxed whitespace-pre-line">
          {currentQ.prompt}
        </h3>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
            if (isSubmitted) {
              if (idx === currentQ.correctIndex) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
              } else if (selectedOption === idx) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
              } else {
                btnStyle = 'bg-slate-950/50 border-slate-900 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isSubmitted && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation on submit */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 block">
              Explanation & Insight
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-2"
              >
                {currentIndex + 1 < questions.length ? 'Next Question' : 'View Final Results'}{' '}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
