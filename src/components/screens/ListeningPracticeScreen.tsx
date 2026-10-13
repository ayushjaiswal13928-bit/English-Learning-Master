import React, { useState } from 'react';
import { speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, CheckCircle2, RotateCcw, AlertCircle, Headphones } from 'lucide-react';

export const ListeningPracticeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'letters' | 'words' | 'sentences' | 'questions'>('words');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Exact target word from Panel 10:
  // "cat (कैट)", options: cat, bat, rat, mat
  const targetWord = 'cat';
  const targetHindi = 'कैट';
  const options = ['cat', 'bat', 'rat', 'mat'];

  const handlePlayAudio = () => {
    playKidChime('click');
    setIsPlaying(true);
    speakSlowly(targetWord, () => setIsPlaying(false));
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    if (selectedOption === targetWord) {
      playKidChime('star');
      setFeedback('correct');
    } else {
      playKidChime('error');
      setFeedback('incorrect');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 10 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🎧</span>
            <span>Listening Practice</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            10. Listening Practice — ध्यान से सुनकर सही ध्वनि व शब्द पहचानें
          </p>
        </div>

        {/* 4 Tabs: A. Letters | B. Words | C. Sentences | D. Questions (Matching Panel 10) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('letters');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'letters'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            A. Letters
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('words');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'words'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            B. Words
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('sentences');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'sentences'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            C. Sentences
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('questions');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            D. Questions
          </button>
        </div>
      </div>

      {/* 2. Audio Player Card (Matching Panel 10: Big Sound Icon, Cat, Audio Bar 0:03/0:05, Quiz) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-center max-w-2xl mx-auto">
        {/* Big Audio Player Box */}
        <div className="space-y-4">
          <button
            onClick={handlePlayAudio}
            className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
              isPlaying
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title="आवाज़ सुनें"
          >
            <Volume2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </button>

          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {targetWord}
            </div>
            <div className="text-sm font-bold text-slate-400">
              ({targetHindi})
            </div>
          </div>

          {/* Audio Progress Bar (0:03 / 0:05) */}
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full w-3/5 rounded-full" />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>0:03</span>
              <span>0:05</span>
            </div>
          </div>
        </div>

        {/* Question: What did you hear? */}
        <div className="pt-4 border-t border-slate-100 space-y-4 text-left">
          <h2 className="text-base font-black text-slate-900 text-center">
            What did you hear? (आपने कौन-सा शब्द सुना?)
          </h2>

          {/* 4 Radio Options: cat, bat, rat, mat (Matching Panel 10) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            {options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all cursor-pointer text-center justify-center font-bold font-mono text-sm ${
                  selectedOption === opt
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="radio"
                  name="listenOption"
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={() => setSelectedOption(opt)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          {/* Blue Check Button (Matching Panel 10) */}
          <div className="text-center pt-2">
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Check
            </button>
          </div>

          {/* Feedback message */}
          {feedback === 'correct' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 text-xs sm:text-sm font-bold text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>बिल्कुल सही! आपने 'cat' (कैट) सुना। बहुत बढ़िया!</span>
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-center gap-2 text-rose-800 text-xs sm:text-sm font-bold text-center">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>गलत विकल्प! दोबारा ऑडियो सुनें और सही शब्द चुनें।</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
