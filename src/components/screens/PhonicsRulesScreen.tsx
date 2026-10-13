import React, { useState } from 'react';
import { speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, Sparkles, Info, CheckCircle2 } from 'lucide-react';

export const PhonicsRulesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'short_vowels' | 'long_vowels' | 'consonants' | 'digraphs'>('short_vowels');

  // Short Vowel data matching Panel 5 exactly:
  // a: Cat (कैट), e: Pen (पेन), i: Sit (सिट), o: Hot (हॉट), u: Cup (कप)
  const SHORT_VOWEL_ITEMS = [
    { vowel: 'a', word: 'Cat', hindiWord: 'कैट', meaning: 'बिल्ली', color: 'border-red-200 bg-red-50/50 text-red-600' },
    { vowel: 'e', word: 'Pen', hindiWord: 'पेन', meaning: 'कलम', color: 'border-blue-200 bg-blue-50/50 text-blue-600' },
    { vowel: 'i', word: 'Sit', hindiWord: 'सिट', meaning: 'बैठना', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-600' },
    { vowel: 'o', word: 'Hot', hindiWord: 'हॉट', meaning: 'गर्म', color: 'border-orange-200 bg-orange-50/50 text-orange-600' },
    { vowel: 'u', word: 'Cup', hindiWord: 'कप', meaning: 'प्याला', color: 'border-purple-200 bg-purple-50/50 text-purple-600' },
  ];

  const LONG_VOWEL_ITEMS = [
    { vowel: 'a_e', word: 'Cake', hindiWord: 'केक', meaning: 'केक', color: 'border-red-200 bg-red-50/50 text-red-600' },
    { vowel: 'e_e', word: 'These', hindiWord: 'दीज़', meaning: 'ये सब', color: 'border-blue-200 bg-blue-50/50 text-blue-600' },
    { vowel: 'i_e', word: 'Bike', hindiWord: 'बाइक', meaning: 'साइकिल', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-600' },
    { vowel: 'o_e', word: 'Home', hindiWord: 'होम', meaning: 'घर', color: 'border-orange-200 bg-orange-50/50 text-orange-600' },
    { vowel: 'u_e', word: 'Cute', hindiWord: 'क्यूट', meaning: 'प्यारा', color: 'border-purple-200 bg-purple-50/50 text-purple-600' },
  ];

  const CONSONANT_ITEMS = [
    { letter: 'B b', sound: 'ब', word: 'Bat', hindiWord: 'बैट' },
    { letter: 'C c', sound: 'क / स', word: 'Cat / City', hindiWord: 'कैट / सिटी' },
    { letter: 'D d', sound: 'ड / द', word: 'Dog', hindiWord: 'डॉग' },
    { letter: 'F f', sound: 'फ़', word: 'Fish', hindiWord: 'फ़िश' },
    { letter: 'G g', sound: 'ग / ज', word: 'Goat / Gym', hindiWord: 'गोट / जिम' },
  ];

  const DIGRAPH_ITEMS = [
    { blend: 'Sh', sound: 'श', word: 'Ship', hindiWord: 'शिप', meaning: 'पानी का जहाज़' },
    { blend: 'Ch', sound: 'च', word: 'Chair', hindiWord: 'चेयर', meaning: 'कुर्सी' },
    { blend: 'Th', sound: 'थ / द', word: 'Think / This', hindiWord: 'थिंक / दिस', meaning: 'सोचना / यह' },
    { blend: 'Ph', sound: 'फ़', word: 'Phone', hindiWord: 'फ़ोन', meaning: 'दूरभाष' },
    { blend: 'Wh', sound: 'व', word: 'White', hindiWord: 'व्हाइट', meaning: 'सफ़ेद' },
  ];

  const handlePlaySound = (word: string) => {
    playKidChime('click');
    speakSlowly(word);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 5 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🔊</span>
            <span>Phonics Rules</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            5. Phonics Rules — अक्षरों की आवाज़ें, Vowels और Blends
          </p>
        </div>

        {/* 4 Tabs: Short Vowels | Long Vowels | Consonant Sounds | Digraphs (Matching Panel 5) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('short_vowels');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'short_vowels'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Short Vowels
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('long_vowels');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'long_vowels'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Long Vowels
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
            Consonant Sounds
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('digraphs');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'digraphs'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Digraphs (Sh, Ch)
          </button>
        </div>
      </div>

      {/* 2. Main Phonics Card Grid (Matching Panel 5 of image.png) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            {activeTab === 'short_vowels' && 'Short Vowel Sounds (ह्रस्व स्वर ध्वनि)'}
            {activeTab === 'long_vowels' && 'Long Vowel Sounds (दीर्घ स्वर ध्वनि)'}
            {activeTab === 'consonants' && 'Consonant Sounds (व्यंजन ध्वनियाँ)'}
            {activeTab === 'digraphs' && 'Digraphs — दो अक्षरों की संयुक्त आवाज़'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            कार्ड पर टैप करके या स्पीकर बटन दबाकर शुद्ध आवाज़ सुनें:
          </p>
        </div>

        {/* 5 Cards Row (Matching exact 5 columns in Panel 5) */}
        {activeTab === 'short_vowels' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {SHORT_VOWEL_ITEMS.map((item) => (
              <div
                key={item.vowel}
                onClick={() => handlePlaySound(item.word)}
                className={`rounded-2xl p-5 border-2 text-center transition-all cursor-pointer hover:shadow-md hover:scale-103 space-y-3 ${item.color}`}
              >
                {/* Big vowel symbol 'a', 'e', 'i', 'o', 'u' */}
                <div className="text-4xl sm:text-5xl font-black font-sans">
                  {item.vowel}
                </div>

                <div className="space-y-0.5">
                  <div className="text-lg font-black text-slate-900">
                    {item.word}
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    ({item.hindiWord})
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySound(item.word);
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-xs hover:bg-slate-100 flex items-center justify-center mx-auto text-slate-700 transition-colors cursor-pointer"
                  title="सुनें"
                >
                  <Volume2 className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Long Vowels Grid */}
        {activeTab === 'long_vowels' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {LONG_VOWEL_ITEMS.map((item) => (
              <div
                key={item.word}
                onClick={() => handlePlaySound(item.word)}
                className={`rounded-2xl p-5 border-2 text-center transition-all cursor-pointer hover:shadow-md hover:scale-103 space-y-3 ${item.color}`}
              >
                <div className="text-2xl sm:text-3xl font-black font-mono">
                  {item.vowel}
                </div>
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-slate-900">{item.word}</div>
                  <div className="text-xs font-bold text-slate-500">({item.hindiWord})</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySound(item.word);
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-xs hover:bg-slate-100 flex items-center justify-center mx-auto text-slate-700 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Consonant Sounds */}
        {activeTab === 'consonants' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {CONSONANT_ITEMS.map((item) => (
              <div
                key={item.letter}
                onClick={() => handlePlaySound(item.word)}
                className="rounded-2xl p-5 border-2 border-slate-200 bg-slate-50 text-center transition-all cursor-pointer hover:shadow-md hover:border-blue-400 space-y-3"
              >
                <div className="text-3xl font-black text-blue-600 font-sans">{item.letter}</div>
                <div className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                  आवाज़: {item.sound}
                </div>
                <div className="text-base font-black text-slate-900">{item.word}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySound(item.word);
                  }}
                  className="w-9 h-9 rounded-full bg-white shadow-xs hover:bg-blue-50 flex items-center justify-center mx-auto text-blue-600"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Digraphs */}
        {activeTab === 'digraphs' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {DIGRAPH_ITEMS.map((item) => (
              <div
                key={item.blend}
                onClick={() => handlePlaySound(item.word)}
                className="rounded-2xl p-5 border-2 border-purple-200 bg-purple-50/50 text-center transition-all cursor-pointer hover:shadow-md hover:scale-103 space-y-3"
              >
                <div className="text-3xl font-black text-purple-700 font-sans">{item.blend}</div>
                <div className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                  आवाज़: {item.sound}
                </div>
                <div className="text-base font-black text-slate-900">{item.word}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySound(item.word);
                  }}
                  className="w-9 h-9 rounded-full bg-white shadow-xs hover:bg-purple-100 flex items-center justify-center mx-auto text-purple-600"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 3. Bottom Note (Matching Panel 5 exact text: "Note: अंग्रेज़ी में हर अक्षर की आवाज़ हर शब्द में एक जैसी नहीं होती।") */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-blue-900 font-semibold">
          <Info className="w-5 h-5 text-blue-600 shrink-0" />
          <span>
            <strong>Note:</strong> अंग्रेज़ी में हर अक्षर की आवाज़ हर शब्द में एक जैसी नहीं होती। इसलिए शब्दों को उनकी ध्वनियों और नियमों के साथ सीखना सबसे सही तरीका है।
          </span>
        </div>
      </div>
    </div>
  );
};
