import React, { useState } from 'react';
import { speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, CheckCircle2, RotateCcw, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';

export const TranslationScreen: React.FC = () => {
  const [direction, setDirection] = useState<'hi_to_en' | 'en_to_hi'>('hi_to_en');
  const [inputVal, setInputVal] = useState<string>('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Exact exercise matching Panel 12:
  // Example: मुझे पानी चाहिए। → I need water.
  // Translate this sentence: मैं स्कूल जाता हूँ। → I go to school.
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim().toLowerCase().replace(/[.!?]/g, '');
    if (clean === 'i go to school') {
      playKidChime('star');
      setFeedback('correct');
    } else {
      playKidChime('error');
      setFeedback('incorrect');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 12 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🔄</span>
            <span>Translation</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            12. Translation — हिंदी और अंग्रेज़ी के बीच अनुवाद का अभ्यास
          </p>
        </div>

        {/* 2 Toggle Tabs: Hindi → English | English → Hindi (Matching Panel 12) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setDirection('hi_to_en');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              direction === 'hi_to_en'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hindi → English
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setDirection('en_to_hi');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              direction === 'en_to_hi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English → Hindi
          </button>
        </div>
      </div>

      {/* 2. Main Translation Box (Matching Panel 12) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
        {/* Example Box (Matching Panel 12: Example: मुझे पानी चाहिए। → I need water.) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Example (उदाहरण):
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800">
              <span>मुझे पानी चाहिए।</span>
              <span className="text-slate-400">→</span>
              <span className="text-blue-600 font-mono">I need water.</span>
            </div>
          </div>

          <button
            onClick={() => {
              playKidChime('click');
              speakSlowly('I need water');
            }}
            className="p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 self-start sm:self-auto cursor-pointer"
            title="आवाज़ सुनें"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Exercise Prompt (Matching Panel 12: Translate this sentence: मैं स्कूल जाता हूँ।) */}
        <div className="space-y-4">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
            Translate this sentence (इस वाक्य का अनुवाद करें):
          </span>

          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              मैं स्कूल जाता हूँ।
            </h2>
          </div>

          {/* Form Input + Check Button (Matching Panel 12) */}
          <form onSubmit={handleCheck} className="space-y-4">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type English translation here... (उदा. I go to school.)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex items-center justify-between">
              {/* Word helper chips */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['I', 'go', 'to', 'school', 'eat', 'the'].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setInputVal((prev) => (prev ? `${prev} ${w}` : w))}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono rounded-lg cursor-pointer"
                  >
                    {w}
                  </button>
                ))}
              </div>

              {/* Green Check Button (Matching Panel 12) */}
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                Check
              </button>
            </div>
          </form>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs sm:text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span>शाबाश! 'I go to school.' बिल्कुल सही अनुवाद है!</span>
                <p className="text-xs font-normal text-emerald-700 mt-0.5">
                  Subject (I) + Verb (go) + Preposition (to) + Object (school).
                </p>
              </div>
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm font-bold">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span>पुनः प्रयास करें! सही उत्तर है: <strong>I go to school.</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
