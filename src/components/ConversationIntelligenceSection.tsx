import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  Info,
} from 'lucide-react';
import { PracticeSessionRecord } from '../types/speech';
import { analyzeConversationPatterns, ConversationPatternAnalysis } from '../services/apiService';

interface ConversationIntelligenceSectionProps {
  sessions: PracticeSessionRecord[];
  onStartPracticeExercise: (exerciseTitle: string, promptText: string) => void;
}

export const ConversationIntelligenceSection: React.FC<ConversationIntelligenceSectionProps> = ({
  sessions,
  onStartPracticeExercise,
}) => {
  const [analysis, setAnalysis] = useState<ConversationPatternAnalysis | null>(() => {
    try {
      const cached = localStorage.getItem('speechcraft_conv_intelligence');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const conversationSessions = sessions.filter(
    (s) => s.category === 'conversation' || s.category === 'flirting'
  );

  const handleRunAnalysis = async () => {
    if (conversationSessions.length === 0) {
      setError('Complete at least one conversation practice or roleplay session to unlock AI conversation intelligence insights.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeConversationPatterns(conversationSessions);
      setAnalysis(result);
      localStorage.setItem('speechcraft_conv_intelligence', JSON.stringify(result));
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to generate conversation intelligence analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                Phase 10L-F
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {conversationSessions.length} sessions analyzed
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-100 mt-0.5">
              Conversation Intelligence & Naturalness Evaluation
            </h3>
          </div>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-950/40 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing Transcripts...' : 'Evaluate Conversations'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {analysis?.insufficientEvidence && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{analysis.insufficientEvidence}</p>
        </div>
      )}

      {analysis && analysis.patterns && analysis.patterns.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.patterns.map((pat, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                      Confidence: {pat.confidence}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Trend: {pat.trend}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100">{pat.patternName}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{pat.explanation}</p>

                  {pat.examples && pat.examples.length > 0 && (
                    <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        Observed Examples from History
                      </span>
                      {pat.examples.map((ex, exIdx) => (
                        <p key={exIdx} className="text-xs text-slate-300 italic">
                          • "{ex}"
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Why it matters:</strong> {pat.whyItMatters}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] text-teal-300/90 font-medium">
                    Drill: {pat.recommendedExercise}
                  </span>
                  <button
                    onClick={() =>
                      onStartPracticeExercise(pat.patternName, pat.recommendedExercise)
                    }
                    className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow-sm"
                  >
                    Practice This Skill <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !isLoading && !error && !analysis ? (
        <div className="text-center py-10 space-y-3">
          <Sparkles className="w-8 h-8 text-teal-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-200">Ready to Evaluate Your Conversation Patterns</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Tap "Evaluate Conversations" above to analyze your completed dialogue history for recurring phrasing habits, follow-up pacing, and conversational naturalness.
          </p>
        </div>
      ) : null}
    </div>
  );
};
