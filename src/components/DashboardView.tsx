import React, { useState } from 'react';
import { ModuleId, UserProgress } from '../types';
import { MODULES_METADATA } from '../data/roadmapData';
import { VOCABULARY_LIST } from '../data/roadmapData';
import { speakText, speakSlowly } from '../utils/speech';
import { playKidChime } from '../utils/kidAudio';
import { SentenceTrainGame } from './kids/SentenceTrainGame';
import {
  Sparkles,
  Flame,
  Star,
  CheckCircle2,
  Clock,
  Volume2,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Headphones,
  Mic,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
  Search,
  ExternalLink,
} from 'lucide-react';

interface DashboardViewProps {
  progress: UserProgress;
  onSelectModule: (id: ModuleId) => void;
  onOpenWorkout: () => void;
  onToggleModuleComplete: (id: ModuleId) => void;
  onToggleLearnedWord: (wordId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onSelectModule,
  onOpenWorkout,
  onToggleModuleComplete,
  onToggleLearnedWord,
}) => {
  // Level filter tab: 'all' | 'level1' | 'level2' | 'level3'
  const [filterTab, setFilterTab] = useState<'all' | 'level1' | 'level2' | 'level3'>('all');

  // Daily goals state
  const [dailyGoals, setDailyGoals] = useState<{ id: string; text: string; done: boolean; targetModule: ModuleId }[]>([
    { id: 'goal-1', text: 'ABC व Phonics ध्वनि का 5 मिनट अभ्यास', done: true, targetModule: 'alphabet' },
    { id: 'goal-2', text: '5 नए चित्र शब्द सीखें व उच्चारण सुनें', done: true, targetModule: 'vocabulary' },
    { id: 'goal-3', text: 'वाक्य रेलगाड़ी खेल में 1 राउंड जीतें', done: false, targetModule: 'sentence' },
    { id: 'goal-4', text: '3 दैनिक वाक्य बोलकर अभ्यास करें', done: false, targetModule: 'speaking' },
    { id: 'goal-5', text: 'गलती डायरी से 1 पुराना नियम दोहराएं', done: false, targetModule: 'mistakes' },
  ]);

  // Daily word flashcard state
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const currentWord = VOCABULARY_LIST[vocabIndex % VOCABULARY_LIST.length];

  // Quick word pronunciation tester
  const [customWord, setCustomWord] = useState<string>('Butterfly');

  const completedGoalsCount = dailyGoals.filter((g) => g.done).length;
  const goalPercentage = Math.round((completedGoalsCount / dailyGoals.length) * 100);

  const toggleGoal = (id: string) => {
    setDailyGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newDone = !g.done;
          if (newDone) playKidChime('star');
          else playKidChime('click');
          return { ...g, done: newDone };
        }
        return g;
      })
    );
  };

  const handleNextWord = () => {
    playKidChime('click');
    setVocabIndex((prev) => (prev + 1) % VOCABULARY_LIST.length);
  };

  const handlePrevWord = () => {
    playKidChime('click');
    setVocabIndex((prev) => (prev - 1 + VOCABULARY_LIST.length) % VOCABULARY_LIST.length);
  };

  // Structured Core Lesson Cards (matching the 8 key stages from user brief)
  const LESSON_CARDS: {
    id: ModuleId;
    levelTag: string;
    levelGroup: 'level1' | 'level2' | 'level3';
    titleHindi: string;
    titleEnglish: string;
    description: string;
    colorTheme: 'blue' | 'green' | 'amber' | 'purple' | 'rose' | 'teal' | 'indigo' | 'orange';
    badgeColor: string;
    icon: any;
    examples: string[];
    progressPercent: number;
    isCompleted: boolean;
  }[] = [
    {
      id: 'alphabet',
      levelTag: 'Level 1',
      levelGroup: 'level1',
      titleHindi: '1. ABC व वर्णमाला नियम',
      titleEnglish: 'Capital & Small Letters + Sounds',
      description: 'A-Z बड़े व छोटे अक्षर, अक्षरों के नाम और ध्वनियों में अंतर, Vowels (A, E, I, O, U) व Consonants।',
      colorTheme: 'blue',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: BookOpen,
      examples: ['A / a = ऐ / आ', 'B / b = ब', 'Vowels: 5', 'Consonants: 21'],
      progressPercent: progress.completedModules.includes('alphabet') ? 100 : (progress.levelScores[1] || 0),
      isCompleted: progress.completedModules.includes('alphabet'),
    },
    {
      id: 'phonics',
      levelTag: 'Level 2',
      levelGroup: 'level1',
      titleHindi: '2. Phonics व अक्षरों की आवाज़ें',
      titleEnglish: 'Short & Long Vowels, Blends & Silent Letters',
      description: 'Short Vowels (Cat, Pen), Long Vowels (Cake, Bike), Sh, Ch, Th, और Silent Letters (Knife = नाइफ)।',
      colorTheme: 'green',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Volume2,
      examples: ['Cat (ऐ)', 'Cake (ए)', 'Sh (श)', 'Knife (K silent)'],
      progressPercent: progress.completedModules.includes('phonics') ? 100 : (progress.levelScores[2] || 0),
      isCompleted: progress.completedModules.includes('phonics'),
    },
    {
      id: 'reading',
      levelTag: 'Level 3',
      levelGroup: 'level2',
      titleHindi: '3. शब्द पढ़ना (Reading Rules)',
      titleEnglish: '2 & 3 Letter Words, CVC & Syllables',
      description: 'ध्वनियों को जोड़कर शब्द पढ़ना: Am, In, Cat, Bat, Book, Milk, Apple और Word Patterns (at, an, it)।',
      colorTheme: 'amber',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      icon: Layers,
      examples: ['c + at = Cat', 'b + at = Bat', 'Ap-ple (2 syllables)'],
      progressPercent: progress.completedModules.includes('reading') ? 100 : (progress.levelScores[3] || 0),
      isCompleted: progress.completedModules.includes('reading'),
    },
    {
      id: 'spelling',
      levelTag: 'Level 4',
      levelGroup: 'level2',
      titleHindi: '4. वर्तनी व लेखन (Spelling & Writing)',
      titleEnglish: 'Look & Write + Phonics Dictation',
      description: 'देखकर शब्द लिखना, आवाज़ पहचानकर स्पेलिंग बनाना (Pen, Cup, Sun), और स्पेलिंग टेस्ट।',
      colorTheme: 'indigo',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Award,
      examples: ['Spelling Drills', 'Dictation Test', 'Double Letters (ee, oo)'],
      progressPercent: progress.completedModules.includes('spelling') ? 100 : (progress.levelScores[4] || 0),
      isCompleted: progress.completedModules.includes('spelling'),
    },
    {
      id: 'vocabulary',
      levelTag: 'Level 5',
      levelGroup: 'level2',
      titleHindi: '5. दैनिक शब्दकोश (Picture Vocabulary)',
      titleEnglish: 'Daily 5-10 Words with Audio & Hindi Meanings',
      description: 'फल, जानवर, परिवार, स्कूल व घर की वस्तुएं। हिंदी अर्थ, सरल उच्चारण और उदाहरण वाक्य।',
      colorTheme: 'rose',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: Sparkles,
      examples: ['Apple = सेब [ऐपल]', 'Water = पानी [वॉटर]', 'Book = किताब'],
      progressPercent: progress.completedModules.includes('vocabulary') ? 100 : (progress.levelScores[5] || 0),
      isCompleted: progress.completedModules.includes('vocabulary'),
    },
    {
      id: 'sentence',
      levelTag: 'Level 6',
      levelGroup: 'level3',
      titleHindi: '6. वाक्य निर्माण व रेलगाड़ी खेल',
      titleEnglish: 'Subject + Verb + Object Sentence Builder',
      description: 'छोटे-छोटे अर्थपूर्ण वाक्य बनाना: "This is a cat", "I drink milk", "He goes to school"।',
      colorTheme: 'purple',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: CheckCircle2,
      examples: ['Subject + Verb + Object', 'Sentence Train Game', 'Daily Phrases'],
      progressPercent: progress.completedModules.includes('sentence') ? 100 : (progress.levelScores[6] || 0),
      isCompleted: progress.completedModules.includes('sentence'),
    },
    {
      id: 'stories',
      levelTag: 'Level 7',
      levelGroup: 'level3',
      titleHindi: '7. कहानियाँ व सुनना (Stories & Audio Lab)',
      titleEnglish: 'Bilingual Illustrated Short Stories & Listening',
      description: 'आसान सचित्र कहानियाँ, Read-along ऑडियो, वाक्य का अर्थ समझना और Listening Quiz।',
      colorTheme: 'teal',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: Headphones,
      examples: ['The Thirsty Crow', 'My Pet Dog', 'Audio Playback'],
      progressPercent: progress.completedModules.includes('stories') ? 100 : (progress.levelScores[7] || 0),
      isCompleted: progress.completedModules.includes('stories'),
    },
    {
      id: 'speaking',
      levelTag: 'Level 8',
      levelGroup: 'level3',
      titleHindi: '8. बोलना व गलती सुधार डायरी',
      titleEnglish: 'Speaking Mic Practice & 6-Step Mistake Fixer',
      description: 'माइक्रोफोन से अपना परिचय दें, छोटे प्रश्न पूछें, और सामान्य गलतियों को हिंदी में समझकर सुधारें।',
      colorTheme: 'orange',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Mic,
      examples: ['Self Introduction', 'Mic Practice', 'Mistake Notebook'],
      progressPercent: progress.completedModules.includes('speaking') ? 100 : (progress.levelScores[8] || 0),
      isCompleted: progress.completedModules.includes('speaking'),
    },
  ];

  const filteredCards = LESSON_CARDS.filter((c) => {
    if (filterTab === 'all') return true;
    return c.levelGroup === filterTab;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO BANNER — Illustrated Edtech Style (matching reference image) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg p-6 sm:p-8 lg:p-10 border border-indigo-800/50">
        {/* Subtle decorative background stars / glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>द्विभाषी अंग्रेज़ी लर्निंग डैशबोर्ड • बच्चों व शुरुआती शिक्षार्थियों के लिए</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
              English Learning Master <br />
              <span className="text-amber-400 font-extrabold text-xl sm:text-2xl lg:text-3xl">
                खेल-खेल में अंग्रेज़ी सीखें (बिल्कुल शुरुआत से)
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              अक्षर (ABC) और Phonics की ध्वनियों से लेकर आसान शब्द पढ़ना, वर्तनी (Spelling), दैनिक शब्दकोश,
              वाक्य रेलगाड़ी और आत्मविश्वास से बोलना — सब कुछ सरल हिंदी में!
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playKidChime('star');
                  onSelectModule('alphabet');
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>आज का पाठ शुरू करें (ABC Rules)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playKidChime('star');
                  onOpenWorkout();
                }}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Clock className="w-4 h-4 text-amber-300" />
                <span>15 मिनट दैनिक रूटीन</span>
              </button>

              <button
                onClick={() => {
                  playKidChime('click');
                  onSelectModule('sentence');
                }}
                className="px-4 py-3 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🚂 वाक्य रेलगाड़ी खेल</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>8 व्यवस्थित स्तर</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>स्पष्ट हिंदी उच्चारण व ऑडियो</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>गलती सुधार नोटबुक</span>
              </span>
            </div>
          </div>

          {/* Right Hero Artwork — Child Reading an English Book (Warm Illustrated Style) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800/80 aspect-16/10">
              <img
                src="/src/assets/images/reference_dashboard.png"
                alt="Child reading an English book — EdTech Dashboard Illustration"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full text-xs">
                  <span className="bg-amber-400/90 text-slate-950 font-black px-2.5 py-1 rounded-lg">
                    ⭐ स्तर 1 & 2 सक्रिय
                  </span>
                  <span className="text-white/90 font-bold bg-black/40 px-2 py-1 rounded-lg backdrop-blur-xs">
                    आरव (Aarav) • उम्र 6+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS ROW — 4 Metric Cards (Stars, Streak, Words, Daily Goal) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Stars */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shrink-0">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              कुल अर्जित सितारे
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {340 + progress.completedModules.length * 20}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +25 आज
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2: Day Streak */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              दैनिक निरंतरता
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {progress.streakDays || 5}
              </span>
              <span className="text-xs font-bold text-slate-500">दिन लगातार</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Words Learned */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              सीखे गए शब्द
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                {progress.learnedWordIds.length + 42}
              </span>
              <span className="text-xs font-bold text-slate-500">/ 100 शब्द</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Daily Goal % */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              आज का लक्ष्य पूर्ण
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                {goalPercentage}%
              </span>
              <span className="text-xs font-bold text-slate-500">
                ({completedGoalsCount}/{dailyGoals.length})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN DASHBOARD GRID (Matching Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT MAIN COLUMN: Lessons & Curriculum Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lessons Header & Level Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📚</span>
                <span>सक्रिय पाठ व शिक्षण क्रम (Learning Path)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                बच्चे व शुरुआत करने वालों के लिए आसान से कठिन की ओर व्यवस्थित कदम
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => {
                  playKidChime('click');
                  setFilterTab('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                सभी स्तर
              </button>
              <button
                onClick={() => {
                  playKidChime('click');
                  setFilterTab('level1');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTab === 'level1'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                अक्षर व आवाज़ें
              </button>
              <button
                onClick={() => {
                  playKidChime('click');
                  setFilterTab('level2');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTab === 'level2'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                शब्द व वर्तनी
              </button>
              <button
                onClick={() => {
                  playKidChime('click');
                  setFilterTab('level3');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTab === 'level3'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                वाक्य व बोलना
              </button>
            </div>
          </div>

          {/* Structured Lesson Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-indigo-300"
                >
                  <div className="space-y-3">
                    {/* Header Row: Level Badge & Complete Status */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                      >
                        {card.levelTag}
                      </span>

                      {card.isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>पूर्ण (Passed)</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-bold text-slate-500">
                          {card.progressPercent}% पूर्ण
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-950 transition-colors">
                        {card.titleHindi}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {card.titleEnglish}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>

                    {/* Example chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {card.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action & Progress Bar */}
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-2.5">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          card.isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${card.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          playKidChime('star');
                          onSelectModule(card.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <span>{card.isCompleted ? 'दोहराएँ (Review)' : 'शुरू करें (Start)'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          speakText(card.titleEnglish);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="उच्चारण सुनें (Listen)"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Gamified Sentence Train Banner right inside the dashboard! */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-400/30">
                  🎮 मनोरंजक खेल (Kids Interactive Game)
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  वाक्य रेलगाड़ी खेल (Sentence Train Game)
                </h3>
                <p className="text-xs text-purple-200 mt-1 max-w-xl">
                  अंगरेज़ी के शब्दों को सही क्रम में जोड़ें (Subject + Verb + Object) और रेलगाड़ी के डिब्बे बनाकर तारे जीतें!
                </p>
              </div>

              <button
                onClick={() => {
                  playKidChime('star');
                  onSelectModule('sentence');
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shrink-0 cursor-pointer shadow-md active:scale-95"
              >
                रेलगाड़ी चलाएं 🚂
              </button>
            </div>

            {/* Embedded Sentence Train interactive preview */}
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <SentenceTrainGame onEarnStar={() => playKidChime('star')} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Panels as shown in reference image (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* PANEL 1: Daily Goal Checklist (आज का लक्ष्य) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🎯</span>
                <h3 className="text-sm font-black text-slate-900">
                  आज का दैनिक लक्ष्य (Daily Goals)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {completedGoalsCount}/{dailyGoals.length}
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    goal.done
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-semibold block leading-snug ${
                        goal.done ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {goal.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                playKidChime('star');
                onOpenWorkout();
              }}
              className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>15–20 मिनट रूटीन शुरू करें</span>
            </button>
          </div>

          {/* PANEL 2: Daily Vocabulary Card (दैनिक शब्दकोश फ़्लैशकार्ड) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">📖</span>
                <h3 className="text-sm font-black text-slate-900">
                  दैनिक शब्दकोश (Word of the Day)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {vocabIndex + 1}/{VOCABULARY_LIST.length}
              </span>
            </div>

            {/* Word Flashcard */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-center space-y-2">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {currentWord.word}
              </div>

              <div className="flex items-center justify-center gap-2 text-sm font-bold text-amber-900">
                <span>{currentWord.hindiMeaning}</span>
                <span className="text-xs font-normal text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  [{currentWord.pronunciationHindi}]
                </span>
              </div>

              <p className="text-xs text-slate-600 italic pt-1">
                "{currentWord.exampleSentenceEn}"
              </p>
              <p className="text-[11px] text-slate-500">
                ({currentWord.exampleSentenceHi})
              </p>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    playKidChime('click');
                    speakSlowly(currentWord.word);
                  }}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>धीमी आवाज़ में सुनो</span>
                </button>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handlePrevWord}
                className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                ← पिछला शब्द
              </button>
              <button
                onClick={() => {
                  playKidChime('star');
                  onSelectModule('vocabulary');
                }}
                className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                सभी 25+ शब्द देखें
              </button>
              <button
                onClick={handleNextWord}
                className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                अगला शब्द →
              </button>
            </div>
          </div>

          {/* PANEL 3: Kid's Mistake Helper Tip (दोस्त की सीख - Mistake Fixer) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">💡</span>
                <h3 className="text-sm font-black text-slate-900">
                  दोस्त की सीख (Mistake Fixer)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                सुझाव
              </span>
            </div>

            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider block">
                ❌ ऐसा न बोलें:
              </span>
              <p className="text-xs font-bold text-rose-950 font-mono">
                "He go to school."
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                ✅ ऐसे बोलें (Correct):
              </span>
              <p className="text-xs font-bold text-emerald-950 font-mono">
                "He goes to school."
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <strong>कारण:</strong> अंग्रेज़ी में He, She या एक व्यक्ति (Singular) के साथ verb में{' '}
              <strong className="text-indigo-600">-s</strong> या <strong className="text-indigo-600">-es</strong> जुड़ता है!
            </p>

            <button
              onClick={() => {
                playKidChime('star');
                onSelectModule('mistakes');
              }}
              className="w-full py-2 px-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50 border border-indigo-200 rounded-xl transition-all text-center cursor-pointer"
            >
              मेरी गलती सुधार डायरी खोलें (Mistakes Notebook) →
            </button>
          </div>

          {/* PANEL 4: Quick Audio Pronunciation Box (त्वरित ऑडियो आवाज़) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🗣️</span>
              <h3 className="text-sm font-black text-slate-900">
                त्वरित आवाज़ टूल (Pronounce Any Word)
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              किसी भी अंग्रेज़ी शब्द को टाइप करें और उसका साफ़ उच्चारण सुनें:
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="उदा. Elephant, Sun, Water..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => {
                  playKidChime('click');
                  speakSlowly(customWord);
                }}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                title="आवाज़ सुनें"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
              <span>सुझाव:</span>
              {['Elephant', 'Rainbow', 'Chocolate', 'Friend'].map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setCustomWord(w);
                    speakSlowly(w);
                  }}
                  className="text-indigo-600 hover:underline font-medium cursor-pointer"
                >
                  {w},
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
