import {
  LearnerProfile,
  PracticeSessionRecord,
  VocabularyItem,
  DailySessionPlan,
  DailyPlanItem,
  SpeechAnalysisResult,
} from '../types/speech';
import { VOCABULARY_ITEMS } from '../data/vocabularyData';

import { DEFAULT_GEMINI_MODEL_ID, normalizeLegacyModelId } from '../config/modelConfig';

const PROFILE_KEY = 'speechcraft_profile';
const SESSIONS_KEY = 'speechcraft_sessions';
const VOCABULARY_KEY = 'speechcraft_vocabulary';
const DAILY_PLAN_KEY = 'speechcraft_daily_plan';

export const DEFAULT_PROFILE: LearnerProfile = {
  onboarded: false,
  onboardingStatus: 'not_started',
  dismissedAssessmentNotice: false,
  targetAccent: 'General American English',
  dailyDurationMinutes: 18,
  goals: [
    'Natural American English pronunciation & rhotic R',
    'Eliminating vocal fillers (um, uh, like)',
    'Executive vocal delivery & thought pauses',
    'Concise spontaneous expression',
  ],
  primaryWeaknesses: ['Filler words under pressure', 'Vowel contrasts & flap T', 'Speaking too quickly'],
  preferredVoice: 'Puck (Natural American Warmth)',
  selectedGeminiModel: DEFAULT_GEMINI_MODEL_ID,
  assessmentCompleted: false,
};

// -------------------------------------------------------------
// Profile Storage
// -------------------------------------------------------------
export function getStoredProfile(): LearnerProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      // Apply safe migration: normalize legacy/obsolete model IDs to active current models
      selectedGeminiModel: normalizeLegacyModelId(parsed.selectedGeminiModel || DEFAULT_GEMINI_MODEL_ID),
    };
  } catch (e) {
    console.error('Failed to read profile from storage:', e);
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: LearnerProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to storage:', e);
  }
}

// -------------------------------------------------------------
// Session Records Storage
// -------------------------------------------------------------
export function getStoredSessions(): PracticeSessionRecord[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read sessions:', e);
    return [];
  }
}

export function saveSessionRecord(record: PracticeSessionRecord): void {
  try {
    const existing = getStoredSessions();
    const updated = [record, ...existing].slice(0, 100); // keep recent 100
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save session record:', e);
  }
}

// -------------------------------------------------------------
// Vocabulary Storage
// -------------------------------------------------------------
export function getStoredVocabulary(): VocabularyItem[] {
  try {
    const raw = localStorage.getItem(VOCABULARY_KEY);
    if (!raw) {
      saveStoredVocabulary(VOCABULARY_ITEMS);
      return VOCABULARY_ITEMS;
    }
    const parsed: VocabularyItem[] = JSON.parse(raw);
    const storedMap = new Map(parsed.map((item) => [item.id, item]));
    const merged = VOCABULARY_ITEMS.map((item) => {
      const stored = storedMap.get(item.id);
      return stored
        ? { ...item, status: stored.status, lastPracticed: stored.lastPracticed }
        : item;
    });
    return merged;
  } catch (e) {
    console.error('Failed to read vocabulary:', e);
    return VOCABULARY_ITEMS;
  }
}

export function saveStoredVocabulary(items: VocabularyItem[]): void {
  try {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save vocabulary:', e);
  }
}

export function updateVocabularyStatus(id: string, status: 'new' | 'learning' | 'mastered'): void {
  const current = getStoredVocabulary();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status, lastPracticed: new Date().toISOString() } : item
  );
  saveStoredVocabulary(updated);
}

// -------------------------------------------------------------
// Daily Training Plan Generator & Storage
// -------------------------------------------------------------
export function generateDailyPlan(durationMinutes = 18): DailySessionPlan {
  const today = new Date().toISOString().split('T')[0];

  // Check if we already generated a plan for today
  try {
    const existing = localStorage.getItem(DAILY_PLAN_KEY);
    if (existing) {
      const parsed: DailySessionPlan = JSON.parse(existing);
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  // 18-minute session routine based on prompt requirements:
  // 1. Vocal warm-up: 2 minutes
  // 2. Articulation drills: 3 minutes
  // 3. American pronunciation and prosody: 4 minutes
  // 4. Fluency and filler reduction: 4 minutes
  // 5. Spontaneous speaking and review: 5 minutes
  const exercises: DailyPlanItem[] = [
    {
      id: 'step-1-warmup',
      title: 'Vocal Warm-Up & Relaxed Onset',
      category: 'warmup',
      targetDurationMinutes: 2,
      instructions:
        'Gentle lip trills and resonant humming. Warm up your vocal tract without throat tension.',
      targetText: 'Brrrrr (smooth pitch glide)... Mmm-ah. Good morning, feeling clear and ready.',
      completed: false,
    },
    {
      id: 'step-2-articulation',
      title: 'Articulation Drills & Consonant Agility',
      category: 'articulation',
      targetDurationMinutes: 3,
      instructions:
        'Practice crisp tongue-tip and alveolar contacts. Keep jaw loose and airflow uninterrupted.',
      targetText: 'Ta-da, ta-da, pa-ta-ka, pa-ta-ka. Six slick slim-seated sheep sleep side by side.',
      completed: false,
    },
    {
      id: 'step-3-pronunciation',
      title: 'American Rhotic R & Flap T Focus',
      category: 'pronunciation',
      targetDurationMinutes: 4,
      instructions:
        'Focus on bunched American /r/ and the intervocalic flap T [ɾ] in connected speech.',
      targetText: 'The team worked harder than ever to deliver a better bottle of water in the city.',
      completed: false,
    },
    {
      id: 'step-4-fluency',
      title: 'Fluency & Filler Reduction (30s Drill)',
      category: 'fluency',
      targetDurationMinutes: 4,
      instructions:
        'Speak continuously without "um", "uh", or verbal padding. Substitute silent pauses for fillers.',
      targetText: 'Describe your most productive focus habit and why it works so well.',
      completed: false,
    },
    {
      id: 'step-5-spontaneous',
      title: 'Spontaneous Speaking & Review',
      category: 'conversation',
      targetDurationMinutes: 5,
      instructions:
        'Speak extemporaneously for 60 seconds on a familiar subject with bottom-line-first structure.',
      targetText: 'If you had one extra hour of uninterrupted creative time every day, how would you spend it?',
      completed: false,
    },
  ];

  const plan: DailySessionPlan = {
    date: today,
    totalDurationMinutes: durationMinutes,
    exercises,
    completedCount: 0,
    isFinished: false,
  };

  try {
    localStorage.setItem(DAILY_PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to cache daily plan:', e);
  }

  return plan;
}

export function saveDailyPlan(plan: DailySessionPlan): void {
  try {
    localStorage.setItem(DAILY_PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save daily plan:', e);
  }
}

// -------------------------------------------------------------
// Data Export & Reset (Data Privacy Requirement)
// -------------------------------------------------------------
export function exportAllDataAsJson(): string {
  const data = {
    exportedAt: new Date().toISOString(),
    profile: getStoredProfile(),
    sessions: getStoredSessions(),
    vocabulary: getStoredVocabulary(),
  };
  return JSON.stringify(data, null, 2);
}

export function clearAllStoredData(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(SESSIONS_KEY);
    localStorage.removeItem(VOCABULARY_KEY);
    localStorage.removeItem(DAILY_PLAN_KEY);
  } catch (e) {
    console.error('Failed to clear stored data:', e);
  }
}
