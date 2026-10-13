import React from 'react';
import { ModuleId } from '../types';
import {
  Home,
  BookOpen,
  Layers,
  FileCheck,
  Bookmark,
  Sparkles,
  Headphones,
  Mic,
  Languages,
  Award,
  Settings as SettingsIcon,
  Smartphone,
  LogIn,
  Volume2,
  CheckSquare,
  Clock,
  X,
  User,
  ChevronDown,
} from 'lucide-react';
import { playKidChime } from '../utils/kidAudio';

interface SidebarProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  onOpenWorkout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  completedCount: number;
  streakDays: number;
  starsCount: number;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  onOpenWorkout,
  isOpenMobile,
  onCloseMobile,
  completedCount,
  streakDays,
  starsCount,
  userName = 'Ayush',
  userAvatar = '👦',
  onLogout,
}) => {
  // Navigation structure strictly matching the 16 screens in image.png
  const primaryNavItems: {
    id: ModuleId;
    icon: any;
    label: string;
    labelHi: string;
    badge?: string;
  }[] = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      labelHi: 'डैशबोर्ड',
    },
    {
      id: 'lessons',
      icon: BookOpen,
      label: 'Lessons',
      labelHi: 'पाठ सूची',
      badge: '5 स्तर',
    },
    {
      id: 'alphabet',
      icon: Sparkles,
      label: 'Alphabet',
      labelHi: 'वर्णमाला',
      badge: 'A-Z',
    },
    {
      id: 'phonics',
      icon: Volume2,
      label: 'Phonics',
      labelHi: 'ध्वनियाँ',
    },
    {
      id: 'reading',
      icon: Layers,
      label: 'Reading',
      labelHi: 'शब्द पठन',
    },
    {
      id: 'spelling',
      icon: FileCheck,
      label: 'Spelling & Writing',
      labelHi: 'वर्तनी',
    },
    {
      id: 'vocabulary',
      icon: Bookmark,
      label: 'Vocabulary',
      labelHi: 'शब्दकोश',
    },
    {
      id: 'grammar',
      icon: BookOpen,
      label: 'Grammar',
      labelHi: 'व्याकरण',
    },
    {
      id: 'listening',
      icon: Headphones,
      label: 'Listening',
      labelHi: 'सुनकर समझना',
    },
    {
      id: 'speaking',
      icon: Mic,
      label: 'Speaking',
      labelHi: 'बोलना व माइक',
    },
    {
      id: 'translation',
      icon: Languages,
      label: 'Translation',
      labelHi: 'अनुवाद',
    },
    {
      id: 'test_quiz',
      icon: CheckSquare,
      label: 'Test / Quiz',
      labelHi: 'परीक्षा',
      badge: 'Quiz',
    },
    {
      id: 'progress',
      icon: Award,
      label: 'Progress',
      labelHi: 'मेरी प्रगति',
    },
    {
      id: 'settings',
      icon: SettingsIcon,
      label: 'Settings',
      labelHi: 'सेटिंग्स',
    },
    {
      id: 'pwa_mobile',
      icon: Smartphone,
      label: 'Mobile App (PWA)',
      labelHi: 'ऑफ़लाइन ऐप',
      badge: 'PWA 📲',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container — Deep navy edtech design matching image.png */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header + User Profile (Ayush - Learner) */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                playKidChime('click');
                onSelectModule('home');
                onCloseMobile();
              }}
              className="text-left group cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-white group-hover:text-blue-400 transition-colors block leading-tight">
                  English Learning Master
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block">
                  अंग्रेज़ी सीखें — बिल्कुल शुरुआत से
                </span>
              </div>
            </button>

            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Card matching Panel 2 of image.png: Ayush (Learner) with avatar */}
          <div
            onClick={() => {
              playKidChime('click');
              onSelectModule('login');
              onCloseMobile();
            }}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-white font-black text-xs shrink-0">
                {userAvatar || '👦'}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate group-hover:text-blue-300">
                  {userName || 'Ayush'}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Learner (विद्यार्थी)
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0" />
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider">
            पाठ्यक्रम व अभ्यास
          </div>

          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentModule === item.id ||
              (item.id === 'home' && currentModule === 'full_roadmap');

            return (
              <button
                key={item.id}
                onClick={() => {
                  playKidChime('click');
                  onSelectModule(item.id);
                  onCloseMobile();
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-600 text-white font-black shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold block truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] block truncate ${
                        isActive ? 'text-blue-100 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {item.labelHi}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Bar: Login / Switch User & 15-Minute Workout CTA */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
          {/* Quick 15 min routine launcher */}
          <button
            onClick={() => {
              playKidChime('star');
              onOpenWorkout();
              onCloseMobile();
            }}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>15 मिनट दैनिक रूटीन</span>
          </button>

          {/* Login / Sign Up Page Link */}
          <button
            onClick={() => {
              playKidChime('click');
              onSelectModule('login');
              onCloseMobile();
            }}
            className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login / Switch Account</span>
          </button>
        </div>
      </aside>
    </>
  );
};
