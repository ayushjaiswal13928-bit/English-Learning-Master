import React, { useState } from 'react';
import { speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, CheckCircle2, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';

export const SpellingWritingScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dictation' | 'missing' | 'correction' | 'practice'>('missing');

  // Exercise 1: Missing Letters state
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [missingFeedback, setMissingFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Exercise 2: Correction state
  const [correctionAnswer, setCorrectionAnswer] = useState<string>('');
  const [correctionFeedback, setCorrectionFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleCheckMissing = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().toUpperCase() === 'BOOK') {
      playKidChime('star');
      setMissingFeedback('correct');
    } else {
      playKidChime('error');
      setMissingFeedback('incorrect');
    }
  };

  const handleCheckCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctionAnswer.trim().toLowerCase() === 'friend') {
      playKidChime('star');
      setCorrectionFeedback('correct');
    } else {
      playKidChime('error');
      setCorrectionFeedback('incorrect');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 7 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>✍️</span>
            <span>Spelling & Writing</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            7. Spelling & Writing — वर्तनी, छूटे हुए अक्षर और डिक्टेशन अभ्यास
          </p>
        </div>

        {/* 4 Tabs: Dictation | Missing Letters | Correction | Practice (Matching Panel 7) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('dictation');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'dictation'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dictation
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('missing');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'missing'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Missing Letters
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('correction');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'correction'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Correction
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('practice');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice
          </button>
        </div>
      </div>

      {/* 2. Main Exercises (Matching Panel 7 cards) */}
      <div className="space-y-6">
        {/* Card 1: Missing Letters (Exact Panel 7: B _ _ K -> BOOK) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">
              Missing Letters (छूटे हुए अक्षर भरें)
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              अभ्यास 1
            </span>
          </div>

          {/* Big Prompt: B _ _ K -> BOOK */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="text-3xl sm:text-4xl font-mono font-black text-slate-800 tracking-widest">
              B <span className="text-blue-600">_ _</span> K
            </div>
            <span className="text-2xl text-slate-400">→</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-200">
              BOOK 📖
            </div>
          </div>

          {/* Form Input + Check Button (Matching Panel 7) */}
          <form onSubmit={handleCheckMissing} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the correct word... (उदा. BOOK)"
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Check
            </button>
          </form>

          {/* Feedback */}
          {missingFeedback === 'correct' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>शानदार! 'BOOK' सही उत्तर है। B + OO + K = Book (किताब)।</span>
            </div>
          )}
          {missingFeedback === 'incorrect' && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>दोबारा प्रयास करें! सही स्पेलिंग 'BOOK' (B-O-O-K) है।</span>
            </div>
          )}
        </div>

        {/* Card 2: Correct this spelling (Exact Panel 7: Frend -> Friend ✓) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900">
              Correct this spelling (गलत वर्तनी सुधारें)
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              अभ्यास 2
            </span>
          </div>

          {/* Comparison Card matching Panel 7: Frend -> Friend ✓ */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xl sm:text-2xl font-mono font-bold text-rose-500 line-through">
                Frend
              </span>
              <span className="text-xl text-slate-400">→</span>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 font-mono font-black text-xl">
                <span>Friend</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            <button
              onClick={() => {
                playKidChime('star');
                speakSlowly('Friend');
              }}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>उच्चारण सुनें</span>
            </button>
          </div>

          <form onSubmit={handleCheckCorrection} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={correctionAnswer}
              onChange={(e) => setCorrectionAnswer(e.target.value)}
              placeholder="Friend टाइप करके अभ्यास करें..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            />
            {/* Green Next Button (Matching Panel 7) */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Next
            </button>
          </form>

          {correctionFeedback === 'correct' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>बिल्कुल सही! 'i' हमेशा 'e' से पहले आता है: F-R-I-E-N-D!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
