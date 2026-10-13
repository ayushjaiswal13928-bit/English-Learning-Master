import React from 'react';
import { ModuleId } from '../types';

interface NavbarProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  onOpenDailyWorkout: () => void;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  onSelectModule,
  onOpenDailyWorkout,
  streakDays,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => onSelectModule('full_roadmap')}
          className="text-left group cursor-pointer focus-visible:outline-none flex items-center gap-2"
        >
          <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
            EngHindi Shiksha
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectModule('full_roadmap')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentModule === 'full_roadmap'
                ? 'text-stone-950 font-bold underline underline-offset-8 decoration-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            15-चरणीय रोडमैप
          </button>
          <button
            onClick={() => onSelectModule('phonics')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentModule === 'phonics'
                ? 'text-stone-950 font-bold underline underline-offset-8 decoration-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Phonics व ध्वनियाँ
          </button>
          <button
            onClick={() => onSelectModule('grammar')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentModule === 'grammar'
                ? 'text-stone-950 font-bold underline underline-offset-8 decoration-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            15 व्याकरण नियम
          </button>
          <button
            onClick={() => onSelectModule('speaking')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentModule === 'speaking'
                ? 'text-stone-950 font-bold underline underline-offset-8 decoration-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Speaking & Mic
          </button>
          <button
            onClick={() => onSelectModule('mistakes')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentModule === 'mistakes'
                ? 'text-stone-950 font-bold underline underline-offset-8 decoration-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            गलती सुधार डायरी
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center text-xs font-semibold text-stone-600">
            <span>🔥 {streakDays} दिन स्ट्रीक</span>
          </div>
          <button
            onClick={onOpenDailyWorkout}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            20–30 मिनट दैनिक रूटीन
          </button>
        </div>
      </div>
    </header>
  );
};
