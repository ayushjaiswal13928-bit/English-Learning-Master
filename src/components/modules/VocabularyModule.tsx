import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../../data/roadmapData';
import { VocabWord } from '../../types';
import { speakText, speakHindi } from '../../utils/speech';
import { Volume2, CheckCircle2, Bookmark, BookmarkCheck, Search } from 'lucide-react';

interface VocabularyModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
  learnedWordIds: string[];
  onToggleLearnedWord: (id: string) => void;
}

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  onComplete,
  isCompleted,
  learnedWordIds,
  onToggleLearnedWord,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'daily5' | 'learned'>('all');

  // Categories list
  const categories = [
    'all',
    'Family (परिवार)',
    'Home (घर)',
    'Food (खाना)',
    'Time & Numbers (समय)',
    'Farming (खेती)',
    'Market (बाजार)',
    'School & Job (स्कूल व नौकरी)',
  ];

  const filteredWords = VOCABULARY_LIST.filter((w) => {
    // Tab filter
    if (activeTab === 'daily5') {
      const daily5Ids = ['w1', 'w5', 'w8', 'w14', 'w17'];
      if (!daily5Ids.includes(w.id)) return false;
    }
    if (activeTab === 'learned') {
      if (!learnedWordIds.includes(w.id)) return false;
    }

    // Category filter
    if (activeCategory !== 'all' && w.category !== activeCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        w.word.toLowerCase().includes(q) ||
        w.hindiMeaning.toLowerCase().includes(q) ||
        w.pronunciationHindi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 5 · शब्द संपदा
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Vocabulary (शब्दों का ज्ञान - रोज़ 5-10 शब्द)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-600 font-medium">
              याद किए गए शब्द: <strong className="text-amber-700">{learnedWordIds.length}</strong>/{VOCABULARY_LIST.length}
            </span>
            <button
              onClick={onComplete}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'पूरा हुआ (Completed)' : 'पूरा चिह्नित करें'}</span>
            </button>
          </div>
        </div>

        {/* 5-Rule formula from user brief */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 text-xs text-stone-700">
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-stone-900 block">1. हिंदी अर्थ</span>
            <span className="text-stone-500 text-[11px]">सटीक मातृभाषा समझ</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-stone-900 block">2. सही Spelling</span>
            <span className="text-stone-500 text-[11px]">हिज्जे व बनावट</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-stone-900 block">3. उच्चारण (Audio)</span>
            <span className="text-stone-500 text-[11px]">ध्वनि सुनकर अभ्यास</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-stone-900 block">4. वाक्य प्रयोग</span>
            <span className="text-stone-500 text-[11px]">व्यावहारिक संदर्भ</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center col-span-2 md:col-span-1">
            <span className="font-bold text-stone-900 block">5. पुरानी दोहराई</span>
            <span className="text-stone-500 text-[11px]">स्पेसड रीविज़न</span>
          </div>
        </div>
      </div>

      {/* Control Deck: Search, Mode Tabs, and Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              सभी शब्द ({VOCABULARY_LIST.length})
            </button>
            <button
              onClick={() => setActiveTab('daily5')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'daily5'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ⭐ आज के 5 शब्द (Daily 5)
            </button>
            <button
              onClick={() => setActiveTab('learned')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === 'learned'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              याद किए हुए ({learnedWordIds.length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="शब्द या हिंदी खोजें..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat === 'all' ? 'सभी विषय' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWords.map((item) => {
          const isLearned = learnedWordIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                isLearned ? 'border-emerald-200 bg-emerald-50/20' : 'border-stone-200 hover:border-amber-400'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-stone-900">
                        {item.word}
                      </h3>
                      <button
                        onClick={() => speakText(item.word, 0.8)}
                        className="p-1.5 bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-700 rounded-md transition-colors cursor-pointer"
                        title="शब्द का उच्चारण सुनें"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                      <span>उच्चारण: <strong className="text-stone-800">{item.pronunciationHindi}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[11px] text-stone-400">{item.partOfSpeech}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleLearnedWord(item.id)}
                    className="cursor-pointer text-stone-400 hover:text-emerald-700 p-1"
                    title={isLearned ? 'याद किए गए से हटाएं' : 'याद हो गया चिह्नित करें'}
                  >
                    {isLearned ? (
                      <BookmarkCheck className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Meaning */}
                <div className="mt-3 py-2 px-3 bg-stone-50 rounded-lg border border-stone-200/60">
                  <span className="text-xs text-stone-500">हिंदी अर्थ:</span>
                  <div className="text-sm font-bold text-amber-900 mt-0.5">
                    {item.hindiMeaning}
                  </div>
                </div>

                {/* Example sentence */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                    <span>{item.exampleSentenceEn}</span>
                    <button
                      onClick={() => speakText(item.exampleSentenceEn, 0.85)}
                      className="text-stone-400 hover:text-stone-700 ml-1 p-0.5"
                      title="पूरा वाक्य सुनें"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {item.exampleSentenceHi}
                  </div>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>{item.category.split('(')[0]}</span>
                <button
                  onClick={() => onToggleLearnedWord(item.id)}
                  className={`text-[11px] font-semibold cursor-pointer ${
                    isLearned ? 'text-emerald-700' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isLearned ? '✓ याद है' : '+ याद हो गया'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
