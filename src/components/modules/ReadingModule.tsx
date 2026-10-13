import React, { useState } from 'react';
import { WORD_FAMILIES } from '../../data/roadmapData';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, Split, BookOpen, Layers } from 'lucide-react';

interface ReadingModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const SHORT_WORDS = [
  { word: 'Am', hindi: 'हूँ', breakdown: 'a + m -> am' },
  { word: 'In', hindi: 'अंदर / में', breakdown: 'i + n -> in' },
  { word: 'On', hindi: 'पर / ऊपर', breakdown: 'o + n -> on' },
  { word: 'At', hindi: 'पर', breakdown: 'a + t -> at' },
  { word: 'Cat', hindi: 'बिल्ली', breakdown: 'c + a + t -> cat' },
  { word: 'Bat', hindi: 'बल्ला', breakdown: 'b + a + t -> bat' },
  { word: 'Pin', hindi: 'पिन', breakdown: 'p + i + n -> pin' },
  { word: 'Cup', hindi: 'प्याला', breakdown: 'c + u + p -> cup' },
  { word: 'Dog', hindi: 'कुत्ता', breakdown: 'd + o + g -> dog' },
];

const MEDIUM_WORDS = [
  { word: 'Book', hindi: 'किताब', breakdown: 'b + oo + k -> book' },
  { word: 'Milk', hindi: 'दूध', breakdown: 'm + i + l + k -> milk' },
  { word: 'Plant', hindi: 'पौधा', breakdown: 'p + l + a + n + t -> plant' },
  { word: 'Apple', hindi: 'सेब', breakdown: 'ap + ple -> apple' },
  { word: 'Clock', hindi: 'घड़ी', breakdown: 'c + l + o + ck -> clock' },
  { word: 'Train', hindi: 'रेलगाड़ी', breakdown: 't + r + ai + n -> train' },
];

const SYLLABLE_WORDS = [
  { word: 'Water', syllables: ['Wa', 'ter'], count: 2, hindi: 'पानी' },
  { word: 'Family', syllables: ['Fam', 'i', 'ly'], count: 3, hindi: 'परिवार' },
  { word: 'Beautiful', syllables: ['Beau', 'ti', 'ful'], count: 3, hindi: 'सुंदर' },
  { word: 'Today', syllables: ['To', 'day'], count: 2, hindi: 'आज' },
  { word: 'Computer', syllables: ['Com', 'pu', 'ter'], count: 3, hindi: 'संगणक' },
];

export const ReadingModule: React.FC<ReadingModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedFamilyPattern, setSelectedFamilyPattern] = useState<string>('-at');
  const [blendingStage, setBlendingStage] = useState<{
    word: string;
    parts: string[];
    currentStep: number;
  }>({
    word: 'CAT',
    parts: ['C (/क/)', 'A (/ऐ/)', 'T (/ट/)'],
    currentStep: 0,
  });

  const activeFamily =
    WORD_FAMILIES.find((f) => f.pattern === selectedFamilyPattern) || WORD_FAMILIES[0];

  const handleRunBlending = (word: string, parts: string[]) => {
    setBlendingStage({ word, parts, currentStep: 0 });
    // Play step by step
    speakText(word, 0.75);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 3 · पठन क्षमता
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              शब्द पढ़ना (Reading Rules & Blending)
            </h2>
          </div>
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

        <p className="text-sm text-stone-600 mt-4 leading-relaxed">
          अक्षरों की अलग-अलग आवाज़ों को एक साथ मिलाकर बोलना ही <strong>Blending</strong> कहलाता है।
          जब आप ध्वनियों को जोड़ना सीख जाते हैं, तो किसी भी नए अंग्रेज़ी शब्द को आसानी से पढ़ सकते हैं।
        </p>
      </div>

      {/* 1. Interactive Blending Machine */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-stone-900 mb-2">
          <Split className="w-4 h-4 text-amber-700" />
          <span>Interactive Sound Blending Engine (आवाज़ जोड़कर पढ़ना)</span>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          किसी भी शब्द पर क्लिक करके देखें कि अक्षर कैसे जुड़कर पूरा शब्द बनाते हैं:
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { w: 'CAT', p: ['C (/क/)', 'A (/ऐ/)', 'T (/ट/)'] },
            { w: 'BAT', p: ['B (/ब/)', 'A (/ऐ/)', 'T (/ट/)'] },
            { w: 'PIN', p: ['P (/प/)', 'I (/इ/)', 'N (/न/)'] },
            { w: 'MILK', p: ['M (/म/)', 'I (/इ/)', 'L (/ल/)', 'K (/क/)'] },
            { w: 'PLANT', p: ['PL (/प्ल/)', 'A (/ऐ/)', 'NT (/न्ट/)'] },
          ].map((item) => (
            <button
              key={item.w}
              onClick={() => handleRunBlending(item.w, item.p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                blendingStage.word === item.w
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {item.w}
            </button>
          ))}
        </div>

        {/* Blending stage box */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            ध्वनि विभाजन (Sound Decomposition)
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 flex-wrap">
            {blendingStage.parts.map((p, idx) => (
              <React.Fragment key={p}>
                <div className="bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm font-bold text-stone-800 shadow-xs">
                  {p}
                </div>
                {idx < blendingStage.parts.length - 1 && (
                  <span className="text-stone-400 font-bold">+</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-amber-700 font-bold text-xl">=</span>
            <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 text-lg font-black text-amber-900">
              {blendingStage.word}
            </div>
          </div>

          <button
            onClick={() => speakText(blendingStage.word, 0.75)}
            className="mt-2 px-4 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>पूरा शब्द सुनें ({blendingStage.word})</span>
          </button>
        </div>
      </div>

      {/* 2. Word Patterns / Families (-at, -an, -it, -op, -ug) */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              Common Word Patterns (समान ध्वनि वाले शब्द परिवार)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              पैटर्न पहचानने से आप एक साथ 10 नए शब्द बिना झिझक पढ़ सकते हैं
            </p>
          </div>

          {/* Pattern Buttons */}
          <div className="flex items-center gap-1.5">
            {WORD_FAMILIES.map((fam) => (
              <button
                key={fam.pattern}
                onClick={() => setSelectedFamilyPattern(fam.pattern)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  selectedFamilyPattern === fam.pattern
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {fam.pattern}
              </button>
            ))}
          </div>
        </div>

        {/* Word Grid for selected family */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeFamily.words.map((w) => (
            <div
              key={w.word}
              className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-center hover:border-amber-400 transition-colors"
            >
              <div className="text-lg font-extrabold text-stone-900">{w.word}</div>
              <div className="text-xs text-stone-500 mt-0.5">{w.hindi}</div>
              <button
                onClick={() => speakText(w.word, 0.8)}
                className="mt-2 text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>सुनें</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Syllables & Multi-letter Words */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Syllables Explanation */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900 mb-2">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Syllables (शब्द के बोलने वाले हिस्से पहचानना)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            बड़े शब्दों को एक बार में बोलने के बजाय उनके टुकड़े करके बोलें। ताली बजाकर शब्द के टुकड़े गिने जा सकते हैं:
          </p>

          <div className="space-y-2.5">
            {SYLLABLE_WORDS.map((item) => (
              <div
                key={item.word}
                className="bg-stone-50 border border-stone-200/80 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-stone-900 text-sm">{item.word}</span>
                    <span className="text-xs text-stone-400">→</span>
                    <div className="flex items-center gap-1">
                      {item.syllables.map((s, idx) => (
                        <span
                          key={s + idx}
                          className="bg-white border border-stone-200 px-1.5 py-0.5 rounded text-xs font-mono font-semibold text-amber-900"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    {item.hindi} ({item.count} Syllables)
                  </div>
                </div>

                <button
                  onClick={() => speakText(item.word, 0.8)}
                  className="p-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2-3 vs 4-5 Letter Words Showcase */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900 mb-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>छोटे और बड़े शब्दों का अभ्यास</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            रोज़ कम से कम 5 छोटे और 5 बड़े शब्द पढ़ने का अभ्यास अपनी आवाज़ में करें:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase">2–3 अक्षर</span>
              {SHORT_WORDS.slice(0, 5).map((w) => (
                <div
                  key={w.word}
                  onClick={() => speakText(w.word, 0.8)}
                  className="p-2 bg-stone-50 hover:bg-amber-50 rounded border border-stone-200/60 cursor-pointer flex justify-between items-center text-xs"
                >
                  <span className="font-bold text-stone-900">{w.word}</span>
                  <span className="text-stone-500">{w.hindi}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-400 uppercase">4–5 अक्षर</span>
              {MEDIUM_WORDS.slice(0, 5).map((w) => (
                <div
                  key={w.word}
                  onClick={() => speakText(w.word, 0.8)}
                  className="p-2 bg-stone-50 hover:bg-amber-50 rounded border border-stone-200/60 cursor-pointer flex justify-between items-center text-xs"
                >
                  <span className="font-bold text-stone-900">{w.word}</span>
                  <span className="text-stone-500">{w.hindi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
