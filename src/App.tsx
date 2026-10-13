/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ModuleId, UserProgress, MistakeRecord, AppSettings } from './types';
import {
  loadProgress,
  saveProgress,
  getFreshUserProgress,
  DEMO_STARTER_PROGRESS,
} from './utils/storage';
import {
  getActiveUser,
  logoutUser,
  loginAsGuest,
  UserAccount,
} from './utils/auth';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './components/screens/LoginPage';
import { HomeDashboard } from './components/screens/HomeDashboard';
import { LessonsList } from './components/screens/LessonsList';
import { AlphabetLearning } from './components/screens/AlphabetLearning';
import { PhonicsRulesScreen } from './components/screens/PhonicsRulesScreen';
import { ReadingPracticeScreen } from './components/screens/ReadingPracticeScreen';
import { SpellingWritingScreen } from './components/screens/SpellingWritingScreen';
import { VocabularyScreen } from './components/screens/VocabularyScreen';
import { GrammarScreen } from './components/screens/GrammarScreen';
import { ListeningPracticeScreen } from './components/screens/ListeningPracticeScreen';
import { SpeakingPracticeScreen } from './components/screens/SpeakingPracticeScreen';
import { TranslationScreen } from './components/screens/TranslationScreen';
import { TestQuizScreen } from './components/screens/TestQuizScreen';
import { ProgressTrackingScreen } from './components/screens/ProgressTrackingScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { PwaMobileScreen } from './components/screens/PwaMobileScreen';
import { DashboardView } from './components/DashboardView';
import { DailyWorkoutModal } from './components/modules/DailyWorkoutModal';
import { playKidChime } from './utils/kidAudio';
import {
  Menu,
  Star,
  Flame,
  Clock,
  ArrowLeft,
  Home,
  BookOpen,
  Award,
  MoreHorizontal,
  Bell,
  Smartphone,
  Sparkles,
  LogOut,
  Users,
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getActiveUser());
  const [progress, setProgress] = useState<UserProgress>(() => {
    const active = getActiveUser();
    return loadProgress(active?.id);
  });
  const [activeModule, setActiveModule] = useState<ModuleId>('home');
  const [isDailyWorkoutOpen, setIsDailyWorkoutOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<AppSettings>({
    language: 'hi',
    darkMode: false,
    soundEffects: true,
  });

  // Persist progress per-user account whenever progress or user changes
  useEffect(() => {
    saveProgress(progress, currentUser?.id);
  }, [progress, currentUser?.id]);

  // Handle dark mode class on document element
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleToggleModuleComplete = (modId: ModuleId) => {
    playKidChime('star');
    setProgress((prev) => {
      const isAlready = prev.completedModules.includes(modId);
      const nextCompleted = isAlready
        ? prev.completedModules.filter((id) => id !== modId)
        : [...prev.completedModules, modId];
      return { ...prev, completedModules: nextCompleted };
    });
  };

  const handleToggleLearnedWord = (wordId: string) => {
    playKidChime('click');
    setProgress((prev) => {
      const isLearned = prev.learnedWordIds.includes(wordId);
      const nextLearned = isLearned
        ? prev.learnedWordIds.filter((id) => id !== wordId)
        : [...prev.learnedWordIds, wordId];
      return { ...prev, learnedWordIds: nextLearned };
    });
  };

  const handleResetProgress = () => {
    const emptyProgress = getFreshUserProgress();
    setProgress(emptyProgress);
    saveProgress(emptyProgress, currentUser?.id);
  };

  const handleLoadDemoPack = () => {
    setProgress(DEMO_STARTER_PROGRESS);
    saveProgress(DEMO_STARTER_PROGRESS, currentUser?.id);
  };

  const handleImportProgress = (imported: UserProgress) => {
    setProgress(imported);
    saveProgress(imported, currentUser?.id);
  };

  const handleCompleteWorkout = () => {
    playKidChime('cheer');
    setProgress((prev) => ({
      ...prev,
      completedWorkouts: (prev.completedWorkouts || 0) + 1,
      streakDays: prev.streakDays + 1,
      dailyWorkoutMinutesToday: (prev.dailyWorkoutMinutesToday || 0) + 15,
    }));
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveModule('login');
  };

  const handleSwitchAccount = () => {
    setActiveModule('login');
  };

  // Accurate stars calculation (0 for brand new user)
  const starsEarned =
    progress.completedModules.length * 20 +
    (progress.completedWorkouts || 0) * 10 +
    (progress.learnedWordIds.length || 0) * 5;

  // If user navigated to the standalone login page or is logged out
  if (activeModule === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          const loaded = loadProgress(user.id);
          setProgress(loaded);
          setActiveModule('home');
        }}
        onExploreAsGuest={() => {
          const guest = loginAsGuest();
          setCurrentUser(guest);
          setProgress(loadProgress('guest'));
          setActiveModule('home');
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex font-sans selection:bg-amber-200 ${
        settings.darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* 1. LEFT SIDEBAR (Sticky on desktop, drawer on mobile — matching image.png) */}
      <Sidebar
        currentModule={activeModule}
        onSelectModule={(id) => {
          playKidChime('click');
          if (id === 'daily_routine') {
            setIsDailyWorkoutOpen(true);
          } else {
            setActiveModule(id);
          }
        }}
        onOpenWorkout={() => {
          playKidChime('star');
          setIsDailyWorkoutOpen(true);
        }}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        completedCount={progress.completedModules.length}
        streakDays={progress.streakDays || 1}
        starsCount={starsEarned}
        userName={currentUser?.name || 'Ayush'}
        userAvatar={currentUser?.avatar || '👦'}
        onLogout={handleLogout}
      />

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-200">
        {/* Top Header Bar */}
        <header
          className={`sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 border-b backdrop-blur-md ${
            settings.darkMode
              ? 'bg-slate-900/90 border-slate-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="मेन्यू खोलें"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Greeting matching Panel 2 */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black">
                  {currentUser?.avatar || '👦'} Welcome, {currentUser?.name || 'Learner'}!
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  {currentUser?.isGuest ? 'Guest' : 'Student'}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                English Learning Master • 16-Screen Bilingual EdTech
              </p>
            </div>
          </div>

          {/* Quick Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{starsEarned}</span>
            </div>

            {/* Streak pill */}
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-black shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
              <span>{progress.streakDays || 1}d</span>
            </div>

            {/* Quick 15 min routine launcher */}
            <button
              onClick={() => {
                playKidChime('star');
                setIsDailyWorkoutOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">15 Min Routine</span>
              <span className="sm:hidden">15 Min</span>
            </button>

            {/* Account Switcher / Logout Button */}
            <button
              onClick={() => {
                playKidChime('click');
                setActiveModule('login');
              }}
              title="खाता बदलें या लॉगिन करें"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Breadcrumb / Back button when deep in a lesson */}
        {activeModule !== 'home' && activeModule !== 'full_roadmap' && (
          <div className="px-4 sm:px-6 lg:px-8 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                playKidChime('click');
                setActiveModule('home');
              }}
              className="flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>डैशबोर्ड पर वापस जाएं (Back to Home)</span>
            </button>

            <span className="font-mono text-slate-500 text-[11px] font-semibold capitalize">
              Active: {activeModule.replace('_', ' ')}
            </span>
          </div>
        )}

        {/* 3. DYNAMIC SCREEN ROUTER (All 16 Panels of image.png) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* SCREEN 2: Home Dashboard (Panel 2) */}
          {activeModule === 'home' && (
            <HomeDashboard
              userName={currentUser?.name || 'Ayush'}
              progress={progress}
              onSelectModule={(id) => {
                playKidChime('click');
                setActiveModule(id);
              }}
            />
          )}

          {/* SCREEN 3: Lessons List (Panel 3) */}
          {activeModule === 'lessons' && (
            <LessonsList
              onSelectLesson={(id) => {
                playKidChime('click');
                setActiveModule(id);
              }}
              completedModules={progress.completedModules}
            />
          )}

          {/* SCREEN 4: Alphabet Learning (Panel 4) */}
          {activeModule === 'alphabet' && (
            <AlphabetLearning
              onNextLesson={() => {
                handleToggleModuleComplete('alphabet');
                setActiveModule('phonics');
              }}
            />
          )}

          {/* SCREEN 5: Phonics Rules (Panel 5) */}
          {activeModule === 'phonics' && <PhonicsRulesScreen />}

          {/* SCREEN 6: Reading Practice (Panel 6) */}
          {activeModule === 'reading' && (
            <ReadingPracticeScreen
              onNext={() => {
                handleToggleModuleComplete('reading');
                setActiveModule('spelling');
              }}
            />
          )}

          {/* SCREEN 7: Spelling & Writing (Panel 7) */}
          {activeModule === 'spelling' && <SpellingWritingScreen />}

          {/* SCREEN 8: Vocabulary (Panel 8) */}
          {activeModule === 'vocabulary' && <VocabularyScreen />}

          {/* SCREEN 9: Grammar (Panel 9) */}
          {activeModule === 'grammar' && <GrammarScreen />}

          {/* SCREEN 10: Listening Practice (Panel 10) */}
          {activeModule === 'listening' && <ListeningPracticeScreen />}

          {/* SCREEN 11: Speaking Practice (Panel 11) */}
          {activeModule === 'speaking' && <SpeakingPracticeScreen />}

          {/* SCREEN 12: Translation (Panel 12) */}
          {activeModule === 'translation' && <TranslationScreen />}

          {/* SCREEN 13: Test / Quiz (Panel 13) */}
          {activeModule === 'test_quiz' && <TestQuizScreen />}

          {/* SCREEN 14: Progress Tracking (Panel 14) */}
          {activeModule === 'progress' && (
            <ProgressTrackingScreen progress={progress} />
          )}

          {/* SCREEN 15: Settings (Panel 15) */}
          {activeModule === 'settings' && (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={(newSettings) =>
                setSettings((prev) => ({ ...prev, ...newSettings }))
              }
              progress={progress}
              onResetProgress={handleResetProgress}
              currentUser={currentUser}
              onLogout={handleLogout}
              onSwitchAccount={handleSwitchAccount}
              onLoadDemoPack={handleLoadDemoPack}
              onImportProgress={handleImportProgress}
            />
          )}

          {/* SCREEN 16: Mobile View & PWA Install (Panel 16) */}
          {activeModule === 'pwa_mobile' && <PwaMobileScreen />}

          {/* Full Roadmap View / Fallback */}
          {activeModule === 'full_roadmap' && (
            <DashboardView
              progress={progress}
              onSelectModule={(id) => {
                playKidChime('click');
                setActiveModule(id);
              }}
              onOpenWorkout={() => {
                playKidChime('star');
                setIsDailyWorkoutOpen(true);
              }}
              onToggleModuleComplete={handleToggleModuleComplete}
              onToggleLearnedWord={handleToggleLearnedWord}
            />
          )}
        </main>

        {/* Mobile Fixed Bottom Navigation Bar (Matching Panel 16: Home | Lessons | Practice | More) */}
        <div className="lg:hidden sticky bottom-0 z-30 bg-white border-t border-slate-200 py-2 px-3 flex items-center justify-around shadow-lg">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveModule('home');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${
              activeModule === 'home' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              playKidChime('click');
              setActiveModule('lessons');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${
              activeModule === 'lessons' ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => {
              playKidChime('click');
              setActiveModule('reading');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${
              activeModule === 'reading' || activeModule === 'spelling'
                ? 'text-blue-600'
                : 'text-slate-500'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Practice</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500 cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>More</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-semibold text-slate-700">
              English Learning Master — अंग्रेज़ी सीखें (बिल्कुल शुरुआत से)
            </p>
            <div className="flex items-center gap-3 text-slate-500 text-xs">
              <span>Learn</span>
              <span>•</span>
              <span>Practice</span>
              <span>•</span>
              <span>Improve</span>
              <span>•</span>
              <span>PWA Ready</span>
            </div>
          </div>
        </footer>
      </div>

      {/* 15-Minute Daily Routine Workout Modal */}
      <DailyWorkoutModal
        isOpen={isDailyWorkoutOpen}
        onClose={() => setIsDailyWorkoutOpen(false)}
        onJumpToModule={(modId) => setActiveModule(modId)}
        onCompleteWorkout={handleCompleteWorkout}
      />
    </div>
  );
}
