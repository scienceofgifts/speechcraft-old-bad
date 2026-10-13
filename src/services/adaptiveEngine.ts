import { PracticeSessionRecord, LearnerProfile } from '../types/speech';

export interface SkillProfile {
  id: string;
  name: string;
  category: string;
  strengthLevel: 'strong' | 'developing' | 'needs_practice' | 'unassessed';
  evidenceCount: number;
  recentScores: number[];
  strengths: string[];
  weaknesses: string[];
  trend: 'improving' | 'stable' | 'declining' | 'insufficient_data';
}

export interface PracticeRecommendation {
  id: string;
  skillId: string;
  skillName: string;
  title: string;
  description: string;
  targetModule: 'pronunciation' | 'fluency' | 'delivery' | 'vocabulary' | 'flirting' | 'conversation' | 'speech_analysis';
  targetPhrase?: string;
  targetId?: string;
  estimatedMinutes: number;
  successCriteria: string;
  reasoning: string;
}

export interface LearningInsightsSummary {
  skillsPracticed: string[];
  recurringDifficulties: string[];
  improvingSkills: string[];
  unassessedAreas: string[];
  recentCompletions: PracticeSessionRecord[];
}

export function generatePerformanceProfile(sessions: PracticeSessionRecord[], profile: LearnerProfile): SkillProfile[] {
  const pronSessions = sessions.filter(s => s.category === 'pronunciation' || s.title.toLowerCase().includes('pronun'));
  const fluencySessions = sessions.filter(s => s.category === 'fluency' || s.title.toLowerCase().includes('fluency'));
  const deliverySessions = sessions.filter(s => s.category === 'delivery' || s.category === 'warmup' || s.title.toLowerCase().includes('voice') || s.title.toLowerCase().includes('resonance'));
  const vocabSessions = sessions.filter(s => s.category === 'vocabulary' || s.category === 'vocab-builder' || s.title.toLowerCase().includes('vocab'));
  const flirtingSessions = sessions.filter(s => s.category === 'flirting' || s.title.toLowerCase().includes('flirt') || s.title.toLowerCase().includes('compliment'));
  const convSessions = sessions.filter(s => s.category === 'conversation' || s.title.toLowerCase().includes('roleplay') || s.title.toLowerCase().includes('practice'));

  const getProfile = (id: string, name: string, category: string, matchingSessions: PracticeSessionRecord[]): SkillProfile => {
    const count = matchingSessions.length;
    if (count === 0) {
      return {
        id,
        name,
        category,
        strengthLevel: 'unassessed',
        evidenceCount: 0,
        recentScores: [],
        strengths: [],
        weaknesses: [],
        trend: 'insufficient_data',
      };
    }

    const scores = matchingSessions.map(s => s.score || 80);
    const avgScore = scores.reduce((a, b) => a + b, 0) / count;
    
    let strengthLevel: SkillProfile['strengthLevel'] = 'developing';
    if (avgScore >= 88) strengthLevel = 'strong';
    else if (avgScore < 78) strengthLevel = 'needs_practice';

    const recentScores = scores.slice(0, 5);
    let trend: SkillProfile['trend'] = 'stable';
    if (recentScores.length >= 2) {
      if (recentScores[0] > recentScores[recentScores.length - 1] + 3) trend = 'improving';
      else if (recentScores[0] < recentScores[recentScores.length - 1] - 3) trend = 'declining';
    }

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    if (avgScore >= 85) strengths.push('Consistent clarity and steady execution across attempts.');
    else weaknesses.push('Occasional hesitation or articulation ambiguity requiring focus.');

    return {
      id,
      name,
      category,
      strengthLevel,
      evidenceCount: count,
      recentScores,
      strengths,
      weaknesses,
      trend,
    };
  };

  return [
    getProfile('pronunciation', 'Pronunciation & Articulation', 'Phonology', pronSessions),
    getProfile('fluency', 'Rhythm & Connected Speech', 'Fluency', fluencySessions),
    getProfile('delivery', 'Voice Resonance & Delivery', 'Voice', deliverySessions),
    getProfile('vocabulary', 'Vocabulary & Precision', 'Lexicon', vocabSessions),
    getProfile('flirting', 'Romantic & Social Expression', 'Social', flirtingSessions),
    getProfile('conversation', 'Conversational Fluency & Roleplay', 'Interaction', convSessions),
  ];
}

export function generateRecommendations(profiles: SkillProfile[], sessions: PracticeSessionRecord[]): PracticeRecommendation[] {
  const recommendations: PracticeRecommendation[] = [];

  const needsPractice = profiles.filter(p => p.strengthLevel === 'needs_practice' || p.strengthLevel === 'unassessed');
  const targetSkill = needsPractice[0] || profiles[0];

  if (targetSkill?.id === 'pronunciation') {
    recommendations.push({
      id: 'rec-pronun',
      skillId: 'pronunciation',
      skillName: 'Pronunciation & Articulation',
      title: 'Targeted Consonant & Vowel Drill',
      description: 'Practice crisp consonant articulation and vowel length in Pronunciation Lab using targeted minimal pairs.',
      targetModule: 'pronunciation',
      estimatedMinutes: 5,
      successCriteria: 'Achieve >85% pronunciation clarity score without clipping terminal consonants.',
      reasoning: 'Based on recent session history, tightening consonant endings will significantly elevate natural intelligibility.',
    });
  } else if (targetSkill?.id === 'fluency') {
    recommendations.push({
      id: 'rec-fluency',
      skillId: 'fluency',
      skillName: 'Rhythm & Connected Speech',
      title: 'Pacing & Thought-Group Pauses',
      description: 'Practice flowing thought-group phrasing in Fluency Gym to eliminate unnecessary mid-sentence pauses.',
      targetModule: 'fluency',
      estimatedMinutes: 6,
      successCriteria: 'Maintain steady 135–145 WPM pacing with zero filler words.',
      reasoning: 'Recent recordings indicated slight hesitation before complex clauses; smoothing connected speech will improve delivery flow.',
    });
  } else if (targetSkill?.id === 'delivery') {
    recommendations.push({
      id: 'rec-delivery',
      skillId: 'delivery',
      skillName: 'Voice Resonance & Delivery',
      title: 'Vocal Projection & Warmth Drills',
      description: 'Engage chest resonance and diaphragmatic breath support in Voice & Delivery Studio.',
      targetModule: 'delivery',
      estimatedMinutes: 5,
      successCriteria: 'Sustain full, rich vocal resonance and steady volume across exercises.',
      reasoning: 'Reinforcing vocal warmth ensures greater presence and emotional resonance during spoken exchanges.',
    });
  } else if (targetSkill?.id === 'vocabulary') {
    recommendations.push({
      id: 'rec-vocab',
      skillId: 'vocabulary',
      skillName: 'Vocabulary & Precision',
      title: 'Advanced Lexicon & Collocations Practice',
      description: 'Explore precise lexical items in Vocabulary Builder and practice using them in natural context.',
      targetModule: 'vocabulary',
      estimatedMinutes: 7,
      successCriteria: 'Successfully integrate 2 new precise lexical items into a spoken practice sentence.',
      reasoning: 'Expanding your active vocabulary repertoire adds nuance and descriptive precision to your conversations.',
    });
  } else {
    recommendations.push({
      id: 'rec-conv',
      skillId: 'conversation',
      skillName: 'Conversational Fluency & Roleplay',
      title: 'Immersive Social Roleplay Session',
      description: 'Practice spontaneous multi-turn dialogue in Flirting & Intimate Conversation Studio or Conversation Practice.',
      targetModule: 'conversation',
      estimatedMinutes: 8,
      successCriteria: 'Maintain natural conversational momentum and responsiveness for at least 4 turns.',
      reasoning: 'Practicing spontaneous conversational flow strengthens real-time responsiveness and delivery confidence.',
    });
  }

  recommendations.push({
    id: 'rec-secondary',
    skillId: 'flirting',
    skillName: 'Romantic & Social Expression',
    title: 'Compliment Craft & Subtlety Rehearsal',
    description: 'Practice delivering sophisticated, specific compliments with appropriate vocal warmth and timing.',
    targetModule: 'flirting',
    estimatedMinutes: 5,
    successCriteria: 'Deliver an original expression with unhurried pacing and steady delivery.',
    reasoning: 'Balanced practice across both technical phonology and expressive social conversation builds well-rounded spoken capability.',
  });

  return recommendations;
}

export function generateLearningInsights(profiles: SkillProfile[], sessions: PracticeSessionRecord[]): LearningInsightsSummary {
  const practiced = profiles.filter(p => p.evidenceCount > 0).map(p => p.name);
  const difficulties = profiles.filter(p => p.strengthLevel === 'needs_practice').map(p => p.name);
  const improving = profiles.filter(p => p.trend === 'improving').map(p => p.name);
  const unassessed = profiles.filter(p => p.strengthLevel === 'unassessed').map(p => p.name);

  return {
    skillsPracticed: practiced,
    recurringDifficulties: difficulties,
    improvingSkills: improving,
    unassessedAreas: unassessed,
    recentCompletions: sessions.slice(0, 5),
  };
}
