import React, { useState } from 'react';
import { TRANSLATION_DRILLS } from '../../data/roadmapData';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, ArrowRightLeft, Sparkles, RotateCcw } from 'lucide-react';

interface TranslationModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const TranslationModule: React.FC<TranslationModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [drillIdx, setDrillIdx] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [drillFeedback, setDrillFeedback] = useState<{
    correct: boolean;
    text: string;
  } | null>(null);

  const activeDrill = TRANSLATION_DRILLS[drillIdx];

  const handleAddWord = (w: string) => {
    if (drillFeedback?.correct) return;
    setSelectedWords([...selectedWords, w]);
  };

  const handleRemoveWord = (idx: number) => {
    if (drillFeedback?.correct) return;
    const next = [...selectedWords];
    next.splice(idx, 1);
    setSelectedWords(next);
    setDrillFeedback(null);
  };

  const handleCheck = () => {
    const candidate = selectedWords.join(' ').trim().toLowerCase().replace('.', '');
    const correct = activeDrill.englishCorrect.trim().toLowerCase().replace('.', '');

    if (candidate === correct) {
      setDrillFeedback({
        correct: true,
        text: `बिल्कुल सही अनुवाद! "${activeDrill.englishCorrect}"`,
      });
      speakText(activeDrill.englishCorrect, 0.85);
    } else {
      setDrillFeedback({
        correct: false,
        text: `गलत अनुवाद! सही वाक्य है: "${activeDrill.englishCorrect}"`,
      });
    }
  };

  const handleReset = () => {
    setSelectedWords([]);
    setDrillFeedback(null);
  };

  const handleNext = () => {
    setSelectedWords([]);
    setDrillFeedback(null);
    setDrillIdx((prev) => (prev + 1) % TRANSLATION_DRILLS.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 11 · द्विभाषी अनुवाद (Translation)
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Translation (हिंदी ⇄ English अनुवाद अभ्यास)
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
          हिंदी से अंग्रेज़ी में अनुवाद करते समय केवल एक-एक शब्द का शब्दशः (word-to-word) अनुवाद न करें,
          बल्कि अंग्रेज़ी वाक्य की संरचना (Subject + Verb + Object) को समझकर पूरा भाव व्यक्त करें।
        </p>
      </div>

      {/* Interactive Translation Builder */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wide">
            <ArrowRightLeft className="w-4 h-4 text-amber-700" />
            <span>अनुवाद अभ्यास #{drillIdx + 1}/{TRANSLATION_DRILLS.length}</span>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>खाली करें</span>
          </button>
        </div>

        {/* Source Hindi Box */}
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-amber-900">
            हिंदी वाक्य का अंग्रेज़ी में अनुवाद करें:
          </span>
          <div className="text-3xl font-black text-stone-900 mt-2">
            "{activeDrill.hindi}"
          </div>
          <div className="text-xs text-stone-600 mt-2 font-mono">
            {activeDrill.breakdown}
          </div>
        </div>

        {/* User Selected Words Container */}
        <div className="min-h-16 p-4 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/60 flex flex-wrap items-center gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-xs text-stone-400 italic">
              नीचे से शब्द चुनकर यहाँ सही क्रम में जोड़ें...
            </span>
          ) : (
            selectedWords.map((word, idx) => (
              <button
                key={word + idx}
                onClick={() => handleRemoveWord(idx)}
                className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-sm font-bold shadow-xs hover:bg-rose-700 transition-colors cursor-pointer"
                title="हटाएं"
              >
                {word} ✕
              </button>
            ))
          )}
        </div>

        {/* Available Word Tiles */}
        <div>
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
            शब्द विकल्प:
          </div>
          <div className="flex flex-wrap gap-2">
            {activeDrill.words.map((w, idx) => (
              <button
                key={w + idx}
                onClick={() => handleAddWord(w)}
                className="px-4 py-2 bg-white border border-stone-300 hover:border-amber-500 text-stone-800 font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                + {w}
              </button>
            ))}
          </div>
        </div>

        {/* Check & Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCheck}
            disabled={selectedWords.length === 0}
            className="px-5 py-2.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            अनुवाद जांचें
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
          >
            अगला वाक्य →
          </button>
        </div>

        {/* Feedback message */}
        {drillFeedback && (
          <div
            className={`p-4 rounded-xl text-xs font-medium space-y-1 ${
              drillFeedback.correct
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            <div className="font-bold">{drillFeedback.text}</div>
            <div className="text-stone-600">
              {activeDrill.hindi} = <strong>{activeDrill.englishCorrect}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
