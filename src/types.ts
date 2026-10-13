export type LevelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface HindiPronunciationItem {
  english: string;
  hindiPronunciation: string;
  hindiMeaning: string;
  phoneticBreakdown?: string;
  audioRate?: number;
}

export interface WritingDrillItem {
  id: string;
  promptHindi: string;
  targetEnglish: string;
  hindiPronunciation: string;
  hint: string;
  type: 'word' | 'sentence' | 'spelling_fix' | 'missing_letter';
}

export interface TestQuestion {
  id: string;
  questionHindi: string;
  englishPrompt?: string;
  options: string[];
  correctIndex: number;
  explanationHindi: string;
}

export interface LevelData {
  levelNumber: LevelNumber;
  titleHindi: string;
  titleEnglish: string;
  shortDesc: string;
  teacherNoteHindi: string;
  lessons: {
    id: string;
    title: string;
    subtitleHindi: string;
    explanationHindi: string;
    items: HindiPronunciationItem[];
  }[];
  writingDrills: WritingDrillItem[];
  speakingDrill: {
    phrase: string;
    hindiPronunciation: string;
    hindiMeaning: string;
    tipsHindi: string;
  };
  levelTest: TestQuestion[];
}

export type ModuleId =
  | 'login'          // 1. Login / Sign Up
  | 'home'           // 2. Home Dashboard
  | 'lessons'        // 3. Lessons List
  | 'alphabet'       // 4. Alphabet Learning
  | 'phonics'        // 5. Phonics Rules
  | 'reading'        // 6. Reading Practice
  | 'spelling'       // 7. Spelling & Writing
  | 'vocabulary'     // 8. Vocabulary
  | 'grammar'        // 9. Grammar
  | 'listening'      // 10. Listening Practice
  | 'speaking'       // 11. Speaking Practice
  | 'translation'    // 12. Translation
  | 'test_quiz'      // 13. Test / Quiz
  | 'progress'       // 14. Progress Tracking
  | 'settings'       // 15. Settings
  | 'pwa_mobile'     // 16. Mobile View (PWA)
  | 'sentence'
  | 'stories'
  | 'punctuation'
  | 'daily_routine'
  | 'mistakes'
  | 'full_roadmap';

export interface AppSettings {
  language: 'hi' | 'en';
  darkMode: boolean;
  soundEffects: boolean;
}

export interface UserAccount {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  level: string;
}

export interface ModuleMeta {
  id: ModuleId;
  stepNumber: number;
  titleHindi: string;
  titleEnglish: string;
  shortDesc: string;
  durationEst: string;
  badge: string;
  category: 'foundation' | 'reading_spelling' | 'grammar_vocab' | 'conversation_mastery';
}

export interface LetterItem {
  capital: string;
  small: string;
  nameSound: string;
  hindiSound: string;
  phoneticExample: string;
  isVowel: boolean;
  sampleWord: string;
  sampleHindi: string;
}

export interface PhonicRule {
  id: string;
  category: 'short_vowels' | 'long_vowels' | 'blends' | 'vowel_teams' | 'silent_letters';
  title: string;
  hindiExplanation: string;
  soundExample: string;
  examples: {
    word: string;
    hindiMeaning: string;
    pronunciation: string;
    highlight?: string;
  }[];
}

export interface WordFamily {
  pattern: string;
  hindiSound: string;
  words: {
    word: string;
    hindi: string;
    phonetic: string;
  }[];
}

export interface VocabWord {
  id: string;
  word: string;
  category: string;
  hindiMeaning: string;
  pronunciationHindi: string;
  partOfSpeech: string;
  exampleSentenceEn: string;
  exampleSentenceHi: string;
  learned?: boolean;
}

export interface GrammarRuleItem {
  id: string;
  number: number;
  titleEnglish: string;
  titleHindi: string;
  explanationHindi: string;
  keyRule: string;
  examples: {
    english: string;
    hindi: string;
    note?: string;
  }[];
  quiz: {
    questionHindi: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface StoryItem {
  id: string;
  titleEnglish: string;
  titleHindi: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate';
  sentences: {
    en: string;
    hi: string;
  }[];
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface MistakeRecord {
  id: string;
  timestamp: string;
  userTyped: string;
  correctAnswer: string;
  ruleCategory: string;
  reasonHindi: string;
  easyExample: string;
  followUpQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  reviewed: boolean;
}

export interface UserProgress {
  unlockedLevel: number;
  completedModules: ModuleId[];
  completedLevels: number[];
  levelScores: Record<number, number>;
  streakDays: number;
  lastActiveDate: string;
  mistakes: MistakeRecord[];
  learnedWordIds: string[];
  learnedWords: string[];
  dailyWorkoutMinutesToday: number;
  completedWorkouts: number;
  totalPronunciationsPracticed: number;
}
