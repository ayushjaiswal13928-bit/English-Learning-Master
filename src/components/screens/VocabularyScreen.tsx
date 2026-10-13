import React, { useState } from 'react';
import { speakSlowly, speakText } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, Search, Sparkles, BookOpen } from 'lucide-react';

export const VocabularyScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'family' | 'home' | 'food' | 'time' | 'numbers' | 'more'>('family');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Vocabulary Data exact table matching Panel 8 of image.png:
  // family | परिवार | (fæməli) | My family is small.
  // home   | घर     | (hoʊm)   | I go home.
  // food   | खाना   | (fuːd)   | I like food.
  // school | स्कूल   | (skuːl)  | I go to school.
  // friend | दोस्त   | (frend)  | He is my friend.
  const ALL_VOCAB = [
    {
      word: 'family',
      category: 'family',
      hindi: 'परिवार',
      pronunciation: '(fæməli)',
      example: 'My family is small.',
      exampleHi: 'मेरा परिवार छोटा है।',
    },
    {
      word: 'home',
      category: 'home',
      hindi: 'घर',
      pronunciation: '(hoʊm)',
      example: 'I go home.',
      exampleHi: 'मैं घर जाता हूँ।',
    },
    {
      word: 'food',
      category: 'food',
      hindi: 'खाना',
      pronunciation: '(fuːd)',
      example: 'I like food.',
      exampleHi: 'मुझे खाना पसंद है।',
    },
    {
      word: 'school',
      category: 'home',
      hindi: 'स्कूल',
      pronunciation: '(skuːl)',
      example: 'I go to school.',
      exampleHi: 'मैं स्कूल जाता हूँ।',
    },
    {
      word: 'friend',
      category: 'family',
      hindi: 'दोस्त',
      pronunciation: '(frend)',
      example: 'He is my friend.',
      exampleHi: 'वह मेरा दोस्त है।',
    },
    // Additional helpful words for tabs
    {
      word: 'mother',
      category: 'family',
      hindi: 'माता जी',
      pronunciation: '(mʌðər)',
      example: 'My mother is kind.',
      exampleHi: 'मेरी माँ दयालु हैं।',
    },
    {
      word: 'water',
      category: 'food',
      hindi: 'पानी',
      pronunciation: '(wɔːtər)',
      example: 'Drink clean water.',
      exampleHi: 'साफ़ पानी पियो।',
    },
    {
      word: 'morning',
      category: 'time',
      hindi: 'सुबह',
      pronunciation: '(mɔːrnɪŋ)',
      example: 'Good morning, teacher!',
      exampleHi: 'शुभ प्रभात, शिक्षक जी!',
    },
    {
      word: 'one',
      category: 'numbers',
      hindi: 'एक (१)',
      pronunciation: '(wʌn)',
      example: 'I have one book.',
      exampleHi: 'मेरे पास एक किताब है।',
    },
    {
      word: 'happy',
      category: 'more',
      hindi: 'खुश',
      pronunciation: '(hæpi)',
      example: 'I am very happy today.',
      exampleHi: 'मैं आज बहुत खुश हूँ।',
    },
  ];

  const filteredWords = ALL_VOCAB.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindi.includes(searchQuery);

    if (searchQuery) return matchesSearch;
    if (activeTab === 'family') return item.category === 'family' || item.word === 'family' || item.word === 'friend' || item.word === 'home' || item.word === 'food' || item.word === 'school';
    return item.category === activeTab;
  });

  const handlePlayWord = (word: string) => {
    playKidChime('click');
    speakSlowly(word);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 8 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🏷️</span>
            <span>Vocabulary</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            8. Vocabulary — दैनिक उपयोगी शब्द, हिंदी अर्थ, उच्चारण व उदाहरण वाक्य
          </p>
        </div>

        {/* 6 Category Tabs: Family | Home | Food | Time | Numbers | More (Matching Panel 8) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('family');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'family'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Family
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('home');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('food');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'food'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Food
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('time');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'time'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Time
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('numbers');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'numbers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Numbers
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('more');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'more'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            More
          </button>
        </div>
      </div>

      {/* 2. Vocabulary Table (Matching exact columns in Panel 8: Word | Hindi Meaning | Pronunciation | Example | 🔊) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-4 px-5">Word</th>
                <th className="py-4 px-5">Hindi Meaning</th>
                <th className="py-4 px-5">Pronunciation</th>
                <th className="py-4 px-5">Example</th>
                <th className="py-4 px-5 text-center">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredWords.map((row) => (
                <tr
                  key={row.word}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  {/* Word */}
                  <td className="py-4 px-5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {row.word}
                  </td>

                  {/* Hindi Meaning */}
                  <td className="py-4 px-5 text-slate-700 font-semibold">
                    {row.hindi}
                  </td>

                  {/* Pronunciation */}
                  <td className="py-4 px-5 text-slate-500 font-mono">
                    {row.pronunciation}
                  </td>

                  {/* Example */}
                  <td className="py-4 px-5 text-slate-600">
                    <div>{row.example}</div>
                    <div className="text-[11px] text-slate-400 font-normal">({row.exampleHi})</div>
                  </td>

                  {/* Audio 🔊 */}
                  <td className="py-4 px-5 text-center">
                    <button
                      onClick={() => handlePlayWord(row.word)}
                      className="p-2 rounded-xl text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer inline-flex items-center justify-center active:scale-90"
                      title="आवाज़ सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
