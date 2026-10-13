import React from 'react';
import { ModuleId, UserProgress } from '../../types';
import { playKidChime } from '../../utils/kidAudio';
import {
  Bell,
  BookOpen,
  FileCheck,
  Languages,
  Award,
  Trophy,
  ArrowRight,
  Sparkles,
  Flame,
  Star,
  CheckCircle2,
  ChevronRight,
  Target,
} from 'lucide-react';

interface HomeDashboardProps {
  userName: string;
  progress: UserProgress;
  onSelectModule: (id: ModuleId) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userName,
  progress,
  onSelectModule,
}) => {
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 14) * 100));

  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  const hindiDays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const todayDayName = hindiDays[new Date().getDay()];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* 1. TOP HEADER (Matching Panel 2: Welcome, Ayush! + Dynamic Live Date + Bell) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Welcome, {userName || 'Ayush'}!
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            आज कुछ नया सीखने का दिन है! (Today is a great day to learn!)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold font-mono border border-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Today: {todayFormatted} ({todayDayName})</span>
          </div>
          <button
            onClick={() => {
              playKidChime('click');
              alert(`🔔 दैनिक सूचना: आज ${todayFormatted} (${todayDayName}) का 15 मिनट अभ्यास शेष है!`);
            }}
            className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer relative"
            title="सूचनाएं (Notifications)"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 animate-ping" />
          </button>
        </div>
      </div>

      {/* 2. MOTIVATIONAL BANNER (Matching Panel 2: "Small steps every day lead to big success!") */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white p-6 sm:p-8 shadow-md">
        {/* Mountain and Flag Vector Styling */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform translate-x-10 translate-y-6">
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
            <polygon points="160,20 240,200 80,200" fill="white" />
            <polygon points="260,60 340,200 180,200" fill="white" />
            <polygon points="70,80 150,200 -10,200" fill="white" />
            <line x1="160" y1="20" x2="160" y2="2" stroke="#FDE047" strokeWidth="4" />
            <polygon points="160,2 190,12 160,22" fill="#FDE047" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>दैनिक प्रेरणा (Daily Motivation)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            “Small steps every day lead to big success!”
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            हर रोज़ केवल 15 मिनट अभ्यास करने से आप फर्राटेदार अंग्रेज़ी बोलना और लिखना सीख सकते हैं।
          </p>
        </div>
      </div>

      {/* 3. FOUR QUICK ACTION CARDS (Matching Panel 2 of image.png) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Lessons (पाठ सीखें) */}
        <button
          onClick={() => {
            playKidChime('star');
            onSelectModule('lessons');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-95"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              Lessons
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              पाठ सीखें
            </span>
          </div>
        </button>

        {/* Card 2: Spelling Test (शब्दों की जाँच) */}
        <button
          onClick={() => {
            playKidChime('star');
            onSelectModule('spelling');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-95"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
              Spelling Test
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              शब्दों की जाँच
            </span>
          </div>
        </button>

        {/* Card 3: Translation (अनुवाद) */}
        <button
          onClick={() => {
            playKidChime('star');
            onSelectModule('translation');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-95"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Languages className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 group-hover:text-purple-600 transition-colors">
              Translation
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              अनुवाद
            </span>
          </div>
        </button>

        {/* Card 4: My Progress (मेरी प्रगति) */}
        <button
          onClick={() => {
            playKidChime('star');
            onSelectModule('progress');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-95"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition-colors">
              My Progress
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              मेरी प्रगति
            </span>
          </div>
        </button>
      </div>

      {/* 4. TOTAL PROGRESS BAR (Matching Panel 2: आपकी कुल प्रगति + Trophy + Motivation) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
              🏆
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                आपकी कुल प्रगति (Overall Progress)
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                आगे बढ़ते रहो! आप कर सकते हो! (Keep going! You can do it!)
              </p>
            </div>
          </div>

          <span className="text-lg sm:text-xl font-mono font-black text-blue-600">
            {progressPercent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
          <span>{completedCount} / 14 स्तर पूरे हुए</span>
          <button
            onClick={() => onSelectModule('lessons')}
            className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>सभी पाठ देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. QUICK JUMP TO POPULAR LESSONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => {
            playKidChime('star');
            onSelectModule('alphabet');
          }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4.5 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              चरण 1
            </span>
            <h4 className="text-sm font-black text-slate-900 mt-1">
              Alphabet & Phonics
            </h4>
            <p className="text-xs text-slate-500">A to Z, अक्षर व ध्वनियाँ</p>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-500" />
        </div>

        <div
          onClick={() => {
            playKidChime('star');
            onSelectModule('phonics');
          }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4.5 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              चरण 2
            </span>
            <h4 className="text-sm font-black text-slate-900 mt-1">
              Phonics Rules
            </h4>
            <p className="text-xs text-slate-500">Short & Long Vowels, Blends</p>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-500" />
        </div>

        <div
          onClick={() => {
            playKidChime('star');
            onSelectModule('speaking');
          }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4.5 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              चरण 11
            </span>
            <h4 className="text-sm font-black text-slate-900 mt-1">
              Speaking Practice
            </h4>
            <p className="text-xs text-slate-500">माइक से बोलकर अभ्यास करें</p>
          </div>
          <ChevronRight className="w-5 h-5 text-purple-500" />
        </div>
      </div>
    </div>
  );
};
