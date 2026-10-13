import { VocabBuilderProgress } from '../types/speech';

const VOCAB_BUILDER_KEY = 'speechcraft_vocab_builder_progress_v1';

export const DEFAULT_VOCAB_PROGRESS: VocabBuilderProgress = {
  exploredWordIds: [
    'lesson-egocentric',
    'lesson-altruistic',
    'lesson-loquacious',
    'lesson-pragmatic',
  ],
  masteredWordIds: ['lesson-altruistic'],
  learningWordIds: ['lesson-egocentric', 'lesson-loquacious'],
  starredWordIds: ['lesson-loquacious', 'lesson-pragmatic'],
  rootsLearned: ['root-ego', 'root-alter', 'root-vert', 'root-loqu'],
  quizScores: {
    totalAnswered: 8,
    totalCorrect: 7,
  },
  lastStudiedDate: new Date().toISOString(),
  flashcardIntervals: {
    'lesson-altruistic': { intervalDays: 3, nextReviewDate: new Date(Date.now() + 86400000 * 2).toISOString(), repetitions: 2 },
    'lesson-egocentric': { intervalDays: 1, nextReviewDate: new Date(Date.now() + 86400000).toISOString(), repetitions: 1 },
  },
};

export function getVocabBuilderProgress(): VocabBuilderProgress {
  try {
    const raw = localStorage.getItem(VOCAB_BUILDER_KEY);
    if (!raw) {
      saveVocabBuilderProgress(DEFAULT_VOCAB_PROGRESS);
      return DEFAULT_VOCAB_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_VOCAB_PROGRESS,
      ...parsed,
      exploredWordIds: Array.isArray(parsed.exploredWordIds) ? parsed.exploredWordIds : DEFAULT_VOCAB_PROGRESS.exploredWordIds,
      masteredWordIds: Array.isArray(parsed.masteredWordIds) ? parsed.masteredWordIds : DEFAULT_VOCAB_PROGRESS.masteredWordIds,
      learningWordIds: Array.isArray(parsed.learningWordIds) ? parsed.learningWordIds : DEFAULT_VOCAB_PROGRESS.learningWordIds,
      starredWordIds: Array.isArray(parsed.starredWordIds) ? parsed.starredWordIds : DEFAULT_VOCAB_PROGRESS.starredWordIds,
      rootsLearned: Array.isArray(parsed.rootsLearned) ? parsed.rootsLearned : DEFAULT_VOCAB_PROGRESS.rootsLearned,
    };
  } catch (e) {
    console.error('Failed to read vocab builder progress:', e);
    return DEFAULT_VOCAB_PROGRESS;
  }
}

export function saveVocabBuilderProgress(progress: VocabBuilderProgress): void {
  try {
    localStorage.setItem(VOCAB_BUILDER_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save vocab builder progress:', e);
  }
}

export function markWordExplored(wordId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.exploredWordIds.includes(wordId)) {
    current.exploredWordIds.push(wordId);
    if (!current.learningWordIds.includes(wordId) && !current.masteredWordIds.includes(wordId)) {
      current.learningWordIds.push(wordId);
    }
    current.lastStudiedDate = new Date().toISOString();
    saveVocabBuilderProgress(current);
  }
  return current;
}

export function toggleStarWord(wordId: string): boolean {
  const current = getVocabBuilderProgress();
  const exists = current.starredWordIds.includes(wordId);
  if (exists) {
    current.starredWordIds = current.starredWordIds.filter((id) => id !== wordId);
  } else {
    current.starredWordIds.push(wordId);
  }
  saveVocabBuilderProgress(current);
  return !exists;
}

export function updateWordMastery(wordId: string, status: 'learning' | 'mastered'): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (status === 'mastered') {
    if (!current.masteredWordIds.includes(wordId)) {
      current.masteredWordIds.push(wordId);
    }
    current.learningWordIds = current.learningWordIds.filter((id) => id !== wordId);
  } else {
    if (!current.learningWordIds.includes(wordId)) {
      current.learningWordIds.push(wordId);
    }
    current.masteredWordIds = current.masteredWordIds.filter((id) => id !== wordId);
  }
  if (!current.exploredWordIds.includes(wordId)) {
    current.exploredWordIds.push(wordId);
  }
  current.lastStudiedDate = new Date().toISOString();
  saveVocabBuilderProgress(current);
  return current;
}

export function markRootLearned(rootId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.rootsLearned.includes(rootId)) {
    current.rootsLearned.push(rootId);
    saveVocabBuilderProgress(current);
  }
  return current;
}

export function markRootExplored(rootId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.exploredRootIds) current.exploredRootIds = [];
  if (!current.exploredRootIds.includes(rootId)) {
    current.exploredRootIds.push(rootId);
    saveVocabBuilderProgress(current);
  }
  return current;
}

export function toggleRootMastery(rootId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.masteredRootIds) current.masteredRootIds = [];
  if (!current.rootsLearned.includes(rootId)) current.rootsLearned.push(rootId);

  if (current.masteredRootIds.includes(rootId)) {
    current.masteredRootIds = current.masteredRootIds.filter((id) => id !== rootId);
  } else {
    current.masteredRootIds.push(rootId);
  }

  saveVocabBuilderProgress(current);
  return current;
}

export function markFamilyExplored(familyId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.exploredFamilyIds) current.exploredFamilyIds = [];
  if (!current.exploredFamilyIds.includes(familyId)) {
    current.exploredFamilyIds.push(familyId);
    saveVocabBuilderProgress(current);
  }
  return current;
}

export function toggleFamilyMastery(familyId: string): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.masteredFamilyIds) current.masteredFamilyIds = [];

  if (current.masteredFamilyIds.includes(familyId)) {
    current.masteredFamilyIds = current.masteredFamilyIds.filter((id) => id !== familyId);
  } else {
    current.masteredFamilyIds.push(familyId);
  }

  saveVocabBuilderProgress(current);
  return current;
}

export function recordSelfCheckScore(wordId: string, isCorrect: boolean): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  current.quizScores.totalAnswered += 1;
  if (isCorrect) {
    current.quizScores.totalCorrect += 1;
    // auto elevate to learning/mastered
    if (!current.masteredWordIds.includes(wordId)) {
      if (!current.learningWordIds.includes(wordId)) {
        current.learningWordIds.push(wordId);
      }
    }
  }
  current.lastStudiedDate = new Date().toISOString();
  saveVocabBuilderProgress(current);
  return current;
}

export function recordFlashcardRating(
  wordId: string,
  rating: 'again' | 'hard' | 'good' | 'easy'
): VocabBuilderProgress {
  const current = getVocabBuilderProgress();
  if (!current.flashcardIntervals) {
    current.flashcardIntervals = {};
  }

  const existing = current.flashcardIntervals[wordId] || {
    intervalDays: 1,
    nextReviewDate: new Date().toISOString(),
    repetitions: 0,
  };

  let nextInterval = 1;
  if (rating === 'again') {
    nextInterval = 1;
    existing.repetitions = 0;
  } else if (rating === 'hard') {
    nextInterval = Math.max(1, Math.round(existing.intervalDays * 1.2));
    existing.repetitions += 1;
  } else if (rating === 'good') {
    nextInterval = Math.max(2, Math.round(existing.intervalDays * 2));
    existing.repetitions += 1;
    if (existing.repetitions >= 2 && !current.masteredWordIds.includes(wordId)) {
      current.masteredWordIds.push(wordId);
      current.learningWordIds = current.learningWordIds.filter((id) => id !== wordId);
    }
  } else if (rating === 'easy') {
    nextInterval = Math.max(4, Math.round(existing.intervalDays * 3));
    existing.repetitions += 2;
    if (!current.masteredWordIds.includes(wordId)) {
      current.masteredWordIds.push(wordId);
      current.learningWordIds = current.learningWordIds.filter((id) => id !== wordId);
    }
  }

  const nextDate = new Date(Date.now() + nextInterval * 86400000).toISOString();
  current.flashcardIntervals[wordId] = {
    intervalDays: nextInterval,
    nextReviewDate: nextDate,
    repetitions: existing.repetitions,
  };
  current.lastStudiedDate = new Date().toISOString();

  saveVocabBuilderProgress(current);
  return current;
}
