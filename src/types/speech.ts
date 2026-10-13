export type AccentType = 'General American English' | 'Standard American (West Coast)' | 'Midwestern General American';

export type OnboardingStatus = 'not_started' | 'skipped' | 'in_progress' | 'completed';

export type ExerciseCategory =
  | 'pronunciation'
  | 'fluency'
  | 'delivery'
  | 'warmup'
  | 'articulation'
  | 'vocabulary'
  | 'vocab-builder'
  | 'conversation'
  | 'flirting'
  | 'assessment';

export interface Finding {
  category: 'pronunciation' | 'fluency' | 'delivery' | 'expression';
  issue: string;
  evidence: string;
  explanation: string;
  suggestedCorrection: string;
  targetedExercise: string;
  confidence?: 'high' | 'medium' | 'preliminary';
  timestampSeconds?: number | null;
}

export interface SpeechMetrics {
  estimatedWpm: number;
  fillerCount: number;
  detectedFillers: string[];
  clarityScore: number;
  pronunciationScore: number;
  pacingScore: number;
  fluencyScore: number;
}

export interface SpeechAnalysisResult {
  transcript: string;
  summary: string;
  metrics: SpeechMetrics;
  findings: Finding[];
  strengths: string[];
  priorityAreas: string[];
  nextExercises: string[];
  limitations?: string[];
  audioBlobUrl?: string;
  audioBase64?: string;
  recordedAt?: string;
}

export interface LearnerProfile {
  onboarded: boolean;
  onboardingStatus?: OnboardingStatus;
  dismissedAssessmentNotice?: boolean;
  name?: string;
  targetAccent: AccentType;
  dailyDurationMinutes: number;
  goals: string[];
  primaryWeaknesses: string[];
  preferredVoice: string;
  selectedGeminiModel?: string; // Configured Gemini Model (e.g. 'gemini-3.8-flash')
  assessmentCompleted: boolean;
  initialAssessment?: {
    date: string;
    overallSummary: string;
    priorityAreas: string[];
    scores: {
      pronunciation: number;
      fluency: number;
      articulation: number;
      pacing: number;
    };
  };
}

export interface PracticeSessionRecord {
  id: string;
  timestamp: string;
  title: string;
  category: ExerciseCategory;
  durationSeconds: number;
  transcript?: string;
  wpm?: number;
  fillerCount?: number;
  score?: number;
  summary?: string;
  audioSnippetBase64?: string; // Optional saved clip for comparison
  findingsSnippet?: string[];
}

export interface PronunciationLesson {
  id: string;
  title: string;
  targetSound: string;
  category: string;
  phoneticIpa: string;
  explanation: string;
  mouthMechanics: {
    tongue: string;
    lips: string;
    jawAndVocalCords: string;
  };
  commonMistakes: string;
  referenceAudioText: string;
  words: { word: string; phonetic: string; context: string }[];
  minimalPairs?: { pairA: string; pairB: string; difference: string }[];
  sentences: string[];
  tongueTwister?: string;
}

export interface VoiceDeliveryDrill {
  id: string;
  title: string;
  category: 'warmup' | 'breath' | 'articulation' | 'pacing' | 'inflection' | 'style' | 'confident' | 'emphasis';
  instructions: string;
  precaution?: string;
  targetPhrase: string;
  suggestedDurationSeconds: number;
  styles?: { name: string; description: string; tip: string }[];
}

export interface FluencyGymDrill {
  id: string;
  title: string;
  category: 'response-speed' | 'fillers' | 'thinking-english' | 'organizing' | 'concision' | 'expanding' | 'paraphrasing' | 'impromptu';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prepTimeSeconds: number;
  timeLimitSeconds: number;
  prompt: string;
  targetFocus: string;
  challengeRule: string;
  modelDemonstration: string;
}

export interface VocabularyItem {
  id: string;
  term: string;
  category: 'everyday' | 'concise-alternative' | 'collocation' | 'executive' | 'idiom' | 'disagreement';
  phonetic: string;
  meaning: string;
  vagueAlternative?: string;
  naturalExample: string;
  collocations: string[];
  register: string;
  speakingPrompt: string;
  status: 'new' | 'learning' | 'mastered';
  lastPracticed?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  tag: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learnerRole: string;
  coachRole: string;
  goal: string;
  contextDescription: string;
  initialCoachMessage: string;
  suggestedResponses: string[];
  keyPhrases: string[];
}

export interface DailyPlanItem {
  id: string;
  title: string;
  category: ExerciseCategory;
  targetDurationMinutes: number;
  instructions: string;
  targetText?: string;
  completed: boolean;
}

export interface DailySessionPlan {
  date: string;
  totalDurationMinutes: number;
  exercises: DailyPlanItem[];
  completedCount: number;
  isFinished: boolean;
}

// -------------------------------------------------------------
// Advanced Root-Based Vocabulary Builder Types
// -------------------------------------------------------------
export type DifficultyLevel = 'Foundational' | 'Intermediate' | 'Advanced' | 'Mastery';

export interface VocabularyCatalogueItem {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  difficulty: DifficultyLevel;
  topicTags: string[];
  rootId?: string;
  hasDetailedLesson: boolean;
}

export type RootCluster =
  | 'The Human Personality'
  | 'Medicine and the Body'
  | 'Speech, Writing, and Language'
  | 'Seeing, Thinking, and Knowing'
  | 'Human Relationships, Power, and Society'
  | 'Science, Measurement, and Nature'
  | 'Mind, Emotion, and Behavior'
  | 'Movement, Action, and Change';

export interface WordSense {
  definition: string;
  isPrimary: boolean;
  contextNote?: string;
  example: string;
}

export interface SynonymDetail {
  word: string;
  nuance: string; // difference in intensity, connotation, formality, usage
}

export interface WordDistinction {
  alternativeWord: string;
  centralDifference: string;
  targetPreferredWhen: string;
  alternativePreferredWhen: string;
  commonMistake: string;
  targetExample: string;
  alternativeExample: string;
}

export interface MorphologicalForm {
  form: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  stressShiftNote?: string;
}

export interface MemoryAid {
  technique: 'root-breakdown' | 'semantic-hook' | 'sound-association' | 'visual-image' | 'contrast';
  explanation: string;
  isEtymological: boolean;
}

export interface PracticalExample {
  domain: 'Professional / Workplace' | 'Academic & Essay' | 'Journalism & Commentary' | 'Everyday Intellectual' | 'Literature & Rhetoric';
  sentence: string;
}

export interface SelfCheckQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'context-choice' | 'usage-correctness' | 'near-synonym' | 'word-form' | 'scenario-match' | 'root-to-meaning';
}

export interface DetailedWordLesson {
  id: string;
  word: string;
  partOfSpeech: string;
  syllables: string;
  phoneticIpa: string;
  stressPattern: string;
  difficulty: DifficultyLevel;
  register: string;
  frequency: string;
  shortGloss: string;
  definitions: WordSense[];
  etymology: {
    languageOfOrigin: string;
    historicalDevelopment: string;
    rootId: string;
    rootName: string;
    literalOriginalMeaning: string;
    modernConnection: string;
    disputedOrUncertain?: string;
  };
  synonyms: SynonymDetail[];
  antonyms: string[];
  distinctions: WordDistinction[];
  collocations: {
    verbs: string[];
    modifiers: string[];
    prepositions: string[];
    idiomaticFrames: string[];
    contrasts: { natural: string; awkward: string }[];
  };
  morphology: {
    baseRoot: string;
    forms: MorphologicalForm[];
  };
  memoryAids: MemoryAid[];
  practicalExamples: PracticalExample[];
  selfCheck: SelfCheckQuestion;
  cluster: RootCluster;
  tags: string[];
}

export type RootType = 'root' | 'prefix' | 'suffix';

export interface DerivedWordEntry {
  word: string;
  pos: string;
  briefDefinition: string;
  rootContribution?: string;
  lessonId?: string;
  catalogueId?: string;
}

export interface WordRootItem {
  id: string;
  root: string;
  type?: RootType;
  origin: 'Latin' | 'Greek' | 'Old French' | 'Germanic';
  meaning: string;
  pronunciationOrCombining: string;
  thematicCluster: RootCluster;
  anchorWord: string;
  derivedWordsList: DerivedWordEntry[];
  historicalInsight: string;
  semanticShiftNote?: string;
  notes?: string;
  variants?: string[];
  relatedRootIds?: string[];
  confusedWith?: string;
}

export interface ExpandedRootItem extends WordRootItem {
  type: RootType;
  originalForm?: string;
  variants?: string[];
  semanticShiftNote?: string;
  notes?: string;
  relatedRootIds?: string[];
}

export interface WordFamilyForm {
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  definition: string;
  phoneticIpa?: string;
  stressShiftNote?: string;
  example: string;
  catalogueId?: string;
  lessonId?: string;
}

export interface WordFamilyItem {
  id: string;
  familyHeadword: string;
  baseStem: string;
  cluster: RootCluster;
  forms: WordFamilyForm[];
  suffixPatternsNote: string;
  distinctionsAndMistakes?: {
    nearSynonymOrForm: string;
    keyDifference: string;
    commonMistake: string;
    collocationNote: string;
  };
  linkedCatalogueIds: string[];
}

export interface VocabBuilderProgress {
  exploredWordIds: string[];
  masteredWordIds: string[];
  learningWordIds: string[];
  starredWordIds: string[];
  rootsLearned: string[];
  exploredRootIds?: string[];
  masteredRootIds?: string[];
  exploredFamilyIds?: string[];
  masteredFamilyIds?: string[];
  quizScores: { totalAnswered: number; totalCorrect: number };
  lastStudiedDate?: string;
  flashcardIntervals?: Record<string, { intervalDays: number; nextReviewDate: string; repetitions: number }>;
}

