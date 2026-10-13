import { MistakeRecord, UserProgress } from '../types';

const BASE_STORAGE_KEY = 'enghindi_learning_progress_v3';

export const INITIAL_MISTAKES: MistakeRecord[] = [
  {
    id: 'm-1',
    timestamp: new Date().toISOString(),
    userTyped: 'Frend',
    correctAnswer: 'Friend',
    ruleCategory: 'Spelling Rule (i before e)',
    reasonHindi:
      'अंग्रेज़ी नियम "i before e except after c" के अनुसार "Friend" में "ie" आता है, केवल "e" नहीं।',
    easyExample: 'He is my best friend. (वह मेरा पक्का दोस्त है।)',
    followUpQuestions: [
      {
        question: 'सही spelling चुनें:',
        options: ['Freind', 'Friend', 'Frind'],
        correctIndex: 1,
      },
      {
        question: 'I have a good ______ (दोस्त).',
        options: ['frend', 'friend', 'freind'],
        correctIndex: 1,
      },
    ],
    reviewed: false,
  },
  {
    id: 'm-2',
    timestamp: new Date().toISOString(),
    userTyped: 'He go to market yesterday',
    correctAnswer: 'He went to the market yesterday',
    ruleCategory: 'Tense & Verb Form (Past Indefinite)',
    reasonHindi:
      'बीते हुए कल (Yesterday) के लिए Verb की 2nd form "went" का प्रयोग होता है, "go" का नहीं।',
    easyExample: 'I went to school yesterday. (मैं कल स्कूल गया था।)',
    followUpQuestions: [
      {
        question: 'She ______ (खाया) an apple yesterday.',
        options: ['eat', 'eats', 'ate'],
        correctIndex: 2,
      },
      {
        question: 'We ______ to the village last week.',
        options: ['go', 'went', 'gone'],
        correctIndex: 1,
      },
    ],
    reviewed: false,
  },
  {
    id: 'm-3',
    timestamp: new Date().toISOString(),
    userTyped: 'She have a pen',
    correctAnswer: 'She has a pen',
    ruleCategory: 'Subject-Verb Agreement (Has vs Have)',
    reasonHindi:
      'तीसरे व्यक्ति एकवचन (Singular: He, She, It, राम) के साथ "Has" आता है, "Have" नहीं।',
    easyExample: 'She has a book. vs They have books.',
    followUpQuestions: [
      {
        question: 'Rahul ______ two pens.',
        options: ['have', 'has', 'having'],
        correctIndex: 1,
      },
      {
        question: 'They ______ a big house.',
        options: ['has', 'have', 'is'],
        correctIndex: 1,
      },
    ],
    reviewed: false,
  },
];

/**
 * Clean 0% initial progress for brand new learners (Addressing Point 4)
 */
export const getFreshUserProgress = (): UserProgress => ({
  unlockedLevel: 1,
  completedModules: [],
  completedLevels: [],
  levelScores: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  mistakes: [],
  learnedWordIds: [],
  learnedWords: [],
  dailyWorkoutMinutesToday: 0,
  completedWorkouts: 0,
  totalPronunciationsPracticed: 0,
});

/**
 * Optional demo pack for previewing populated state
 */
export const DEMO_STARTER_PROGRESS: UserProgress = {
  unlockedLevel: 2,
  completedModules: ['alphabet', 'phonics'],
  completedLevels: [1],
  levelScores: { 1: 100, 2: 75, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  mistakes: INITIAL_MISTAKES,
  learnedWordIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'],
  learnedWords: ['Apple', 'Water', 'Mother', 'Book', 'School'],
  dailyWorkoutMinutesToday: 15,
  completedWorkouts: 4,
  totalPronunciationsPracticed: 28,
};

const getStorageKey = (userId?: string): string => {
  return userId ? `elm_progress_${userId}` : BASE_STORAGE_KEY;
};

export const loadProgress = (userId?: string): UserProgress => {
  if (typeof window === 'undefined') return getFreshUserProgress();
  try {
    const key = getStorageKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      // Return fresh clean progress for new user
      return getFreshUserProgress();
    }
    const parsed = JSON.parse(raw);
    return { ...getFreshUserProgress(), ...parsed };
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return getFreshUserProgress();
  }
};

export const saveProgress = (progress: UserProgress, userId?: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress', err);
  }
};
