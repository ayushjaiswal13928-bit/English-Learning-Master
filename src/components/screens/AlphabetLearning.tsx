import React, { useState } from 'react';
import { ALPHABET_DATA } from '../../data/roadmapData';
import { speakText, speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AlphabetLearningProps {
  onNextLesson?: () => void;
}

export const AlphabetLearning: React.FC<AlphabetLearningProps> = ({ onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'capital' | 'small' | 'vowels' | 'consonants'>('capital');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedLetter = ALPHABET_DATA[selectedIndex] || ALPHABET_DATA[0];

  // Colors for letters to match the rainbow grid in Panel 4
  const LETTER_COLORS = [
    'text-red-500',
    'text-orange-500',
    'text-blue-500',
    'text-emerald-500',
    'text-purple-500',
    'text-teal-500',
    'text-rose-500',
  ];

  const handleSelectLetter = (idx: number) => {
    playKidChime('click');
    setSelectedIndex(idx);
    const item = ALPHABET_DATA[idx];
    speakSlowly(item.capital);
  };

  const handlePrev = () => {
    playKidChime('click');
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : ALPHABET_DATA.length - 1));
  };

  const handleNext = () => {
    playKidChime('click');
    setSelectedIndex((prev) => (prev < ALPHABET_DATA.length - 1 ? prev + 1 : 0));
  };

  // Filter letters for grid depending on tab
  const displayedLetters = ALPHABET_DATA.filter((item) => {
    if (activeTab === 'vowels') return item.isVowel;
    if (activeTab === 'consonants') return !item.isVowel;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 4 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🔤</span>
            <span>Alphabet & Phonics</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            4. Alphabet Learning — बड़े व छोटे अक्षर, ध्वनियाँ और उदाहरण
          </p>
        </div>

        {/* 4 Tabs: Capital Letters | Small Letters | Vowels | Consonants (Matching Panel 4) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('capital');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'capital'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Capital Letters
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('small');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'small'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Small Letters
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('vowels');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'vowels'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vowels (5)
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('consonants');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'consonants'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Consonants (21)
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Matching Panel 4 of image.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Rainbow Letter Grid (A B C D E F G...) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-slate-100 pb-3">
            <span>अक्षर पर टैप करें (Tap a letter to see pronunciation):</span>
            <span className="text-blue-600 font-mono">
              {displayedLetters.length} अक्षरों की सूची
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2.5 sm:gap-3.5">
            {displayedLetters.map((item, idx) => {
              const originalIndex = ALPHABET_DATA.findIndex((a) => a.capital === item.capital);
              const isSelected = selectedIndex === originalIndex;
              const colorClass = LETTER_COLORS[idx % LETTER_COLORS.length];

              const letterDisplay =
                activeTab === 'small'
                  ? item.small
                  : activeTab === 'capital'
                  ? item.capital
                  : `${item.capital}`;

              return (
                <button
                  key={item.capital}
                  onClick={() => handleSelectLetter(originalIndex)}
                  className={`aspect-square rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105 ring-4 ring-blue-100'
                      : `bg-slate-50 hover:bg-slate-100 border-slate-200 ${colorClass}`
                  }`}
                >
                  {letterDisplay}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
            💡 <strong>याद रखें:</strong> Vowels (A, E, I, O, U) अंग्रेज़ी के स्वर हैं, जिनके बिना अधिकांश शब्द नहीं बन सकते!
          </div>
        </div>

        {/* RIGHT: Detail Card (Matching Panel 4: "A का उच्चारण", "A a", Apple icon, "Apple (æpl)", Audio button) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {selectedLetter.capital} का उच्चारण (Pronunciation of {selectedLetter.capital})
            </span>

            {/* Big Letters "A a" */}
            <div className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight font-sans">
              {selectedLetter.capital}{' '}
              <span className="text-blue-600 text-5xl sm:text-6xl">{selectedLetter.small}</span>
            </div>

            {/* Illustration Emoji / Graphic (Apple, Ball, Cat...) */}
            <div className="py-2">
              <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 flex items-center justify-center text-6xl shadow-xs">
                {selectedLetter.capital === 'A'
                  ? '🍎'
                  : selectedLetter.capital === 'B'
                  ? '⚽'
                  : selectedLetter.capital === 'C'
                  ? '🐱'
                  : selectedLetter.capital === 'D'
                  ? '🐶'
                  : selectedLetter.capital === 'E'
                  ? '🥚'
                  : selectedLetter.capital === 'F'
                  ? '🐟'
                  : selectedLetter.capital === 'G'
                  ? '🍇'
                  : selectedLetter.capital === 'H'
                  ? '🏠'
                  : selectedLetter.capital === 'I'
                  ? '🍦'
                  : selectedLetter.capital === 'J'
                  ? '🧃'
                  : selectedLetter.capital === 'K'
                  ? '🪁'
                  : selectedLetter.capital === 'L'
                  ? '🦁'
                  : selectedLetter.capital === 'M'
                  ? '🥭'
                  : selectedLetter.capital === 'N'
                  ? '🪺'
                  : selectedLetter.capital === 'O'
                  ? '🍊'
                  : selectedLetter.capital === 'P'
                  ? '✏️'
                  : selectedLetter.capital === 'Q'
                  ? '👑'
                  : selectedLetter.capital === 'R'
                  ? '🐰'
                  : selectedLetter.capital === 'S'
                  ? '☀️'
                  : selectedLetter.capital === 'T'
                  ? '🐯'
                  : selectedLetter.capital === 'U'
                  ? '☂️'
                  : selectedLetter.capital === 'V'
                  ? '🚐'
                  : selectedLetter.capital === 'W'
                  ? '🍉'
                  : selectedLetter.capital === 'X'
                  ? '📦'
                  : selectedLetter.capital === 'Y'
                  ? '🪀'
                  : '🦓'}
              </div>
            </div>

            {/* Word & Phonetic: Apple (æpl) / सेब */}
            <div className="space-y-1">
              <div className="text-2xl font-black text-slate-900">
                {selectedLetter.sampleWord}
              </div>
              <div className="text-xs font-mono text-slate-500">
                ({selectedLetter.phoneticExample}) • {selectedLetter.sampleHindi}
              </div>
              <div className="text-xs font-bold text-blue-600 bg-blue-50 py-1 px-3 rounded-full inline-block mt-1">
                आवाज़: {selectedLetter.hindiSound} ({selectedLetter.nameSound})
              </div>
            </div>

            {/* Audio Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playKidChime('click');
                  speakSlowly(`${selectedLetter.capital}. ${selectedLetter.sampleWord}`);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>शुद्ध आवाज़ सुनें (Listen Sound)</span>
              </button>
            </div>
          </div>

          {/* Bottom Navigation Buttons [← Previous] [Next →] (Matching Panel 4) */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              {selectedIndex + 1} / {ALPHABET_DATA.length}
            </span>

            <button
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
