import React, { useState } from 'react';
import { speakSlowly, speakText } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export const ReadingPracticeScreen: React.FC<{ onNext?: () => void }> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'words' | 'sentences' | 'paragraph' | 'story'>('words');
  const [selectedWord, setSelectedWord] = useState<string>('cat');

  // Exact 10 words from Panel 6:
  // cat, book, milk, plant, apple, sun, food, school, home, friend
  const WORD_LIST = [
    { word: 'cat', hindi: 'बिल्ली', phonetic: 'कैट' },
    { word: 'book', hindi: 'किताब', phonetic: 'बुक' },
    { word: 'milk', hindi: 'दूध', phonetic: 'मिल्क' },
    { word: 'plant', hindi: 'पौधा', phonetic: 'प्लांट' },
    { word: 'apple', hindi: 'सेब', phonetic: 'ऐपल' },
    { word: 'sun', hindi: 'सूरज', phonetic: 'सन' },
    { word: 'food', hindi: 'खाना', phonetic: 'फूड' },
    { word: 'school', hindi: 'विद्यालय', phonetic: 'स्कूल' },
    { word: 'home', hindi: 'घर', phonetic: 'होम' },
    { word: 'friend', hindi: 'दोस्त', phonetic: 'फ्रेंड' },
  ];

  const SENTENCES_LIST = [
    { en: 'This is a small cat.', hi: 'यह एक छोटी बिल्ली है।' },
    { en: 'I read an English book.', hi: 'मैं एक अंग्रेज़ी की किताब पढ़ता हूँ।' },
    { en: 'He drinks fresh milk every day.', hi: 'वह रोज़ ताज़ा दूध पीता है।' },
    { en: 'The sun rises in the east.', hi: 'सूरज पूर्व में उगता है।' },
    { en: 'She goes to school happily.', hi: 'वह खुशी-खुशी स्कूल जाती है।' },
  ];

  const handleWordClick = (w: string) => {
    playKidChime('click');
    setSelectedWord(w);
    speakSlowly(w);
  };

  const handlePlaySelected = () => {
    playKidChime('click');
    speakSlowly(selectedWord);
  };

  const currentWordObj = WORD_LIST.find((w) => w.word === selectedWord) || WORD_LIST[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 6 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📖</span>
            <span>Reading Practice</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            6. Reading Practice — आसान शब्द, वाक्य और कहानियाँ पढ़ना
          </p>
        </div>

        {/* 4 Tabs: Words | Sentences | Paragraph | Story (Matching Panel 6) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('words');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'words'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Words
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('sentences');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'sentences'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sentences
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('paragraph');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'paragraph'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paragraph
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('story');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Story
          </button>
        </div>
      </div>

      {/* 2. Main Reading Content (Matching Panel 6 layout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {activeTab === 'words' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Read the Words
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  किसी भी शब्द पर टैप करें और उसका शुद्ध उच्चारण सुनें:
                </p>
              </div>

              {/* Selected Word Hindi Pronunciation Badge */}
              <div className="bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-900 flex items-center gap-2">
                <span>चुना गया:</span>
                <span className="font-mono text-sm text-blue-700 font-black">{currentWordObj.word}</span>
                <span className="text-slate-500">[{currentWordObj.phonetic}]</span>
                <span className="text-slate-600">({currentWordObj.hindi})</span>
              </div>
            </div>

            {/* Exact 2 Rows of 5 words from Panel 6:
                Row 1: cat, book, milk, plant, apple
                Row 2: sun, food, school, home, friend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
              {WORD_LIST.map((item) => {
                const isSelected = selectedWord === item.word;
                return (
                  <button
                    key={item.word}
                    onClick={() => handleWordClick(item.word)}
                    className={`py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base border-2 transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm scale-102 ring-2 ring-blue-100'
                        : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {item.word}
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Row: Sound icon on left, Next button on right (Matching Panel 6) */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handlePlaySelected}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 transition-colors cursor-pointer flex items-center gap-2"
                title="आवाज़ सुनें"
              >
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold font-mono uppercase">{currentWordObj.word} सुनो</span>
              </button>

              <button
                onClick={() => {
                  playKidChime('star');
                  setActiveTab('sentences');
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Sentences */}
        {activeTab === 'sentences' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">
              Read Sentences (वाक्य पढ़ना)
            </h2>
            <div className="space-y-3">
              {SENTENCES_LIST.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm sm:text-base font-bold text-slate-900">{s.en}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.hi}</p>
                  </div>
                  <button
                    onClick={() => {
                      playKidChime('click');
                      speakSlowly(s.en);
                    }}
                    className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('paragraph')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                पैराग्राफ पढ़ें →
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Paragraph */}
        {activeTab === 'paragraph' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">
              Short Paragraph (छोटा पैराग्राफ)
            </h2>
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <p className="text-base text-slate-800 leading-relaxed font-serif">
                "The cat is on the mat. The sun is hot today. I drink fresh cold water and eat an apple. My friend comes to my home to play football."
              </p>
              <p className="text-xs text-slate-600 border-t border-blue-100 pt-2 font-medium">
                (बिल्ली चटाई पर है। आज धूप तेज और गर्म है। मैं ठंडा पानी पीता हूँ और सेब खाता हूँ। मेरा दोस्त मेरे घर फुटबॉल खेलने आता है।)
              </p>
              <button
                onClick={() => {
                  playKidChime('click');
                  speakText(
                    'The cat is on the mat. The sun is hot today. I drink fresh cold water and eat an apple. My friend comes to my home to play football.'
                  );
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>पूरा पैराग्राफ सुनें</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Story */}
        {activeTab === 'story' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">
              Short Story: The Thirsty Crow (प्यासा कौआ)
            </h2>
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                Once upon a time, a thirsty crow flew all over the fields looking for water. For a long time, he could not find any. He felt very weak. Suddenly, he saw a pitcher below. He flew down to see if there was any water inside. Yes, there was some water, but the pitcher was deep!
              </p>
              <button
                onClick={() => {
                  playKidChime('click');
                  speakText('Once upon a time, a thirsty crow flew all over the fields looking for water.');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>कहानी सुनें</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
