import React from 'react';
import { Star, Flame, Sparkles, Train } from 'lucide-react';
import { playKidChime } from '../../utils/kidAudio';

interface KidNavbarProps {
  currentView: 'map' | 'stage' | 'train' | 'mistakes';
  onSelectView: (view: 'map' | 'train' | 'mistakes') => void;
  onOpenQuickPlay: () => void;
  stars: number;
  streakDays: number;
}

export const KidNavbar: React.FC<KidNavbarProps> = ({
  currentView,
  onSelectView,
  onOpenQuickPlay,
  stars,
  streakDays,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <button
          onClick={() => {
            playKidChime('click');
            onSelectView('map');
          }}
          className="text-left group cursor-pointer focus-visible:outline-none flex items-center gap-2"
        >
          <span className="text-2xl">✨</span>
          <span className="text-xl font-black tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            EngHindi नन्हे जादूगर
          </span>
        </button>

        {/* 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-black text-stone-600">
          <button
            onClick={() => {
              playKidChime('click');
              onSelectView('map');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'map' || currentView === 'stage'
                ? 'text-amber-700 font-black underline underline-offset-8 decoration-amber-500'
                : 'hover:text-stone-900'
            }`}
          >
            🗺️ जादुई नक्शा
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              onSelectView('train');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'train'
                ? 'text-amber-700 font-black underline underline-offset-8 decoration-amber-500'
                : 'hover:text-stone-900'
            }`}
          >
            🚂 वाक्य की रेलगाड़ी
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              onSelectView('mistakes');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'mistakes'
                ? 'text-amber-700 font-black underline underline-offset-8 decoration-amber-500'
                : 'hover:text-stone-900'
            }`}
          >
            📝 मेरी डायरी
          </button>
        </nav>

        {/* Rewards & 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-black">
            <span className="flex items-center gap-1 text-amber-900">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{stars} सितारे</span>
            </span>
            <span className="text-stone-300">|</span>
            <span className="flex items-center gap-1 text-stone-700">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streakDays} दिन</span>
            </span>
          </div>

          <button
            onClick={() => {
              playKidChime('star');
              onOpenQuickPlay();
            }}
            className="px-4 py-2 text-xs font-black text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-2xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            10-मिनट खेल शुरू करें ⏱️
          </button>
        </div>
      </div>
    </header>
  );
};
