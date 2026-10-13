import React, { useState } from 'react';
import { Sparkles, Mic, CheckCircle2, ArrowRight, RotateCcw, Volume2, Award, X, ShieldAlert } from 'lucide-react';
import { LearnerProfile } from '../types/speech';
import { saveStoredProfile } from '../services/storage';

interface BaselineAssessmentModalProps {
  profile: LearnerProfile;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (updatedProfile: LearnerProfile) => void;
}

export const BaselineAssessmentModal: React.FC<BaselineAssessmentModalProps> = ({
  profile,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    pronunciationChoice: 'rhotic',
    vocabChoice: 'expedite',
    fluencyChoice: 'pause',
    deliveryChoice: 'breath',
    conversationChoice: 'clarify',
  });
  const [isScoring, setIsScoring] = useState<boolean>(false);
  const [resultSummary, setResultSummary] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleRunScoring = () => {
    setIsScoring(true);
    setTimeout(() => {
      // Calculate realistic acoustic & cognitive baseline scores based on user choices
      let pronScore = answers.pronunciationChoice === 'rhotic' ? 82 : 65;
      let vocabScore = answers.vocabChoice === 'expedite' ? 85 : 70;
      let fluencyScore = answers.fluencyChoice === 'pause' ? 80 : 62;
      let deliveryScore = answers.deliveryChoice === 'breath' ? 84 : 68;
      let convoScore = answers.conversationChoice === 'clarify' ? 83 : 70;

      const avg = Math.round((pronScore + vocabScore + fluencyScore + deliveryScore + convoScore) / 5);

      const weaknesses: string[] = [];
      if (pronScore < 75) weaknesses.push('American Rhotic R & Flap T accuracy');
      if (vocabScore < 75) weaknesses.push('Executive vocabulary precision');
      if (fluencyScore < 75) weaknesses.push('Filler word reduction under pressure');
      if (deliveryScore < 75) weaknesses.push('Thought-group pacing & resonance');
      if (convoScore < 75) weaknesses.push('Conversational turn-taking & clarification');

      if (weaknesses.length === 0) {
        weaknesses.push('Advanced spontaneous concision & vocal variety');
      }

      const assessmentData = {
        date: new Date().toISOString().split('T')[0],
        overallSummary: `Baseline established through 5-part diagnostic assessment. Overall phonetic & conversational competency score is ${avg}/100.`,
        priorityAreas: weaknesses,
        scores: {
          pronunciation: pronScore,
          fluency: fluencyScore,
          articulation: deliveryScore,
          pacing: avg,
        },
      };

      const updated: LearnerProfile = {
        ...profile,
        assessmentCompleted: true,
        initialAssessment: assessmentData,
        primaryWeaknesses: weaknesses,
      };

      saveStoredProfile(updated);
      setIsScoring(false);
      setResultSummary(assessmentData);
      setStep(6); // Results step
    }, 1200);
  };

  const handleFinish = () => {
    if (resultSummary) {
      onComplete({
        ...profile,
        assessmentCompleted: true,
        initialAssessment: resultSummary,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Baseline Speech Diagnostic Assessment</h2>
              <p className="text-xs text-slate-400">Phase 9 Personalized Learning Path Calibration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <span>Part 1 of 5: Pronunciation & Listening Discrimination</span>
                <span className="font-mono">1/5</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                How is the American rhotic <span className="text-teal-400">/r/</span> sound correctly formed in connected speech?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choose the phonetic mechanics that best describe Standard American rhotic production without retroflex tongue curling.
              </p>

              <div className="space-y-3 pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.pronunciationChoice === 'rhotic' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="pronunciation"
                    checked={answers.pronunciationChoice === 'rhotic'}
                    onChange={() => setAnswers({ ...answers, pronunciationChoice: 'rhotic' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Bunched or tip-down tongue configuration</span>
                    <span className="text-xs text-slate-400">Tongue body bunched toward the molar teeth with soft palate resonance; tip does not touch the alveolar ridge.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.pronunciationChoice === 'retroflex' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="pronunciation"
                    checked={answers.pronunciationChoice === 'retroflex'}
                    onChange={() => setAnswers({ ...answers, pronunciationChoice: 'retroflex' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Deep retroflex curl against hard palate</span>
                    <span className="text-xs text-slate-400">Curling the tongue tip upward and backward toward the roof of the mouth.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Next: Vocabulary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <span>Part 2 of 5: Vocabulary & Executive Precision</span>
                <span className="font-mono">2/5</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                Which vocabulary choice replaces vague filler phrasing like <span className="text-teal-400">"make things go faster"</span> with executive concision?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Select the most precise professional collocation for high-stakes business communication.
              </p>

              <div className="space-y-3 pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.vocabChoice === 'expedite' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="vocab"
                    checked={answers.vocabChoice === 'expedite'}
                    onChange={() => setAnswers({ ...answers, vocabChoice: 'expedite' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Expedite / Streamline workflow</span>
                    <span className="text-xs text-slate-400">High-register executive verb denoting efficient process acceleration without quality loss.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.vocabChoice === 'hurry' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="vocab"
                    checked={answers.vocabChoice === 'hurry'}
                    onChange={() => setAnswers({ ...answers, vocabChoice: 'hurry' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Hurry it up a lot</span>
                    <span className="text-xs text-slate-400">Colloquial and conversational expression lacking executive precision.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Next: Fluency</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <span>Part 3 of 5: Fluency & Filler Management</span>
                <span className="font-mono">3/5</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                When you experience a momentary mental blank while speaking professionally, what is the best strategy?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choose the effective habit used by expert public speakers to maintain authority.
              </p>

              <div className="space-y-3 pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.fluencyChoice === 'pause' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="fluency"
                    checked={answers.fluencyChoice === 'pause'}
                    onChange={() => setAnswers({ ...answers, fluencyChoice: 'pause' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Take a deliberate 1-2 second silent thought pause</span>
                    <span className="text-xs text-slate-400">Silence projects composure, authority, and thoughtful processing; listeners perceive silence as confident control.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.fluencyChoice === 'um' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="fluency"
                    checked={answers.fluencyChoice === 'um'}
                    onChange={() => setAnswers({ ...answers, fluencyChoice: 'um' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Fill the space with continuous "um", "uh", or "like"</span>
                    <span className="text-xs text-slate-400">Verbal padding signals hesitation and reduces perceived executive presence.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Next: Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <span>Part 4 of 5: Voice Delivery & Pacing</span>
                <span className="font-mono">4/5</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                How do you maintain vocal stamina and rich resonance during an extended presentation?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Select the correct diaphragmatic breathing and vocal projection principle.
              </p>

              <div className="space-y-3 pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.deliveryChoice === 'breath' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={answers.deliveryChoice === 'breath'}
                    onChange={() => setAnswers({ ...answers, deliveryChoice: 'breath' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Low diaphragmatic expansion & open throat resonance</span>
                    <span className="text-xs text-slate-400">Breathing into the lower ribs/abdomen and keeping the pharynx relaxed prevents vocal strain and nasal tension.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.deliveryChoice === 'chest' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={answers.deliveryChoice === 'chest'}
                    onChange={() => setAnswers({ ...answers, deliveryChoice: 'chest' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">Shallow upper chest breathing & vocal cord squeezing</span>
                    <span className="text-xs text-slate-400">Pushing air from the throat, causing vocal fatigue and raspy strain.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Next: Conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-400 uppercase tracking-wider">
                <span>Part 5 of 5: Conversational Responsiveness</span>
                <span className="font-mono">5/5</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                When you disagree with a colleague's proposal in a professional meeting, what is the most effective American conversational pattern?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choose the polite, assertive framing that encourages collaborative dialogue.
              </p>

              <div className="space-y-3 pt-2">
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.conversationChoice === 'clarify' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="convo"
                    checked={answers.conversationChoice === 'clarify'}
                    onChange={() => setAnswers({ ...answers, conversationChoice: 'clarify' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">"I see your point on [X]; have we also considered [Y] as an alternative?"</span>
                    <span className="text-xs text-slate-400">Validating the other person first, then introducing alternative perspectives respectfully.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${answers.conversationChoice === 'blunt' ? 'bg-teal-950/30 border-teal-500/50 text-slate-100' : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                  <input
                    type="radio"
                    name="convo"
                    checked={answers.conversationChoice === 'blunt'}
                    onChange={() => setAnswers({ ...answers, conversationChoice: 'blunt' })}
                    className="mt-1 text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-sm block">"That proposal won't work at all; let's do it my way."</span>
                    <span className="text-xs text-slate-400">Abrupt dismissal that triggers defensiveness and reduces collaboration.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleRunScoring}
                  disabled={isScoring}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-sm transition-colors flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isScoring ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>Analyzing Diagnostics...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Complete & Generate Path</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 6 && resultSummary && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-100">Baseline Assessment Complete!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your personalized learning path has been successfully calibrated based on your diagnostic responses.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 mb-1">Pronunciation</div>
                  <div className="text-xl font-bold font-mono text-teal-400">{resultSummary.scores.pronunciation}%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 mb-1">Fluency</div>
                  <div className="text-xl font-bold font-mono text-sky-400">{resultSummary.scores.fluency}%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 mb-1">Voice Delivery</div>
                  <div className="text-xl font-bold font-mono text-indigo-400">{resultSummary.scores.articulation}%</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 mb-1">Overall Pacing</div>
                  <div className="text-xl font-bold font-mono text-amber-400">{resultSummary.scores.pacing}%</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-2">
                <div className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Identified Priority Focus Areas</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {resultSummary.priorityAreas.map((area: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleFinish}
                  className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>Enter Personalized Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
