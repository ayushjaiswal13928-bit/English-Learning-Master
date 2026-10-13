import React, { useState } from 'react';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

interface SentenceBuilderModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface SentenceDrill {
  id: string;
  hindi: string;
  targetWords: string[];
  correctSentence: string;
  type: 'Affirmative' | 'Negative' | 'Question';
  ruleNotes: string;
}

const SENTENCE_DRILLS: SentenceDrill[] = [
  {
    id: 'sd-1',
    hindi: 'मैं खाना खाता हूँ।',
    targetWords: ['I', 'eat', 'food'],
    correctSentence: 'I eat food.',
    type: 'Affirmative',
    ruleNotes: 'Subject (I) + Verb (eat) + Object (food)',
  },
  {
    id: 'sd-2',
    hindi: 'मैं खुश हूँ।',
    targetWords: ['I', 'am', 'happy'],
    correctSentence: 'I am happy.',
    type: 'Affirmative',
    ruleNotes: 'Subject (I) + Helping Verb (am) + Adjective (happy)',
  },
  {
    id: 'sd-3',
    hindi: 'मेरे पास एक किताब है।',
    targetWords: ['I', 'have', 'a', 'book'],
    correctSentence: 'I have a book.',
    type: 'Affirmative',
    ruleNotes: 'Subject (I) + Possession Verb (have) + Article (a) + Object (book)',
  },
  {
    id: 'sd-4',
    hindi: 'मुझे नहीं पता। (मुझे जानकारी नहीं है)',
    targetWords: ['I', 'do', 'not', 'know'],
    correctSentence: 'I do not know.',
    type: 'Negative',
    ruleNotes: 'Subject (I) + Helping Verb (do) + NOT + Base Verb (know)',
  },
  {
    id: 'sd-5',
    hindi: 'क्या आप अंग्रेज़ी बोलते हैं?',
    targetWords: ['Do', 'you', 'speak', 'English?'],
    correctSentence: 'Do you speak English?',
    type: 'Question',
    ruleNotes: 'Question Helper (Do) + Subject (you) + Verb (speak) + Language (English)?',
  },
];

const ERROR_SPOTS = [
  {
    wrong: 'I is going to school.',
    correct: 'I am going to school.',
    explanation: 'I के साथ हमेशा "am" आता है, "is" नहीं।',
  },
  {
    wrong: 'He do not like mangoes.',
    correct: 'He does not like mangoes.',
    explanation: 'He (एकवचन) के साथ negative में "does not" आता है।',
  },
  {
    wrong: 'She have two sisters.',
    correct: 'She has two sisters.',
    explanation: 'She (तीसरा व्यक्ति एकवचन) के साथ "has" का प्रयोग होता है।',
  },
];

export const SentenceBuilderModule: React.FC<SentenceBuilderModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [activeDrillIndex, setActiveDrillIndex] = useState<number>(0);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    return [...SENTENCE_DRILLS[0].targetWords].sort(() => 0.5 - Math.random());
  });
  const [drillStatus, setDrillStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const activeDrill = SENTENCE_DRILLS[activeDrillIndex];

  const handlePickWord = (word: string, index: number) => {
    if (drillStatus === 'correct') return;
    setBuiltWords([...builtWords, word]);
    const nextAvailable = [...availableWords];
    nextAvailable.splice(index, 1);
    setAvailableWords(nextAvailable);
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (drillStatus === 'correct') return;
    const nextBuilt = [...builtWords];
    nextBuilt.splice(index, 1);
    setBuiltWords(nextBuilt);
    setAvailableWords([...availableWords, word]);
    setDrillStatus('idle');
  };

  const handleCheckSentence = () => {
    const candidate = builtWords.join(' ');
    const strippedCandidate = candidate.replace(/[.?]/g, '').trim().toLowerCase();
    const strippedCorrect = activeDrill.correctSentence.replace(/[.?]/g, '').trim().toLowerCase();

    if (strippedCandidate === strippedCorrect) {
      setDrillStatus('correct');
      speakText(activeDrill.correctSentence, 0.85);
    } else {
      setDrillStatus('wrong');
    }
  };

  const handleResetDrill = () => {
    setBuiltWords([]);
    setAvailableWords([...activeDrill.targetWords].sort(() => 0.5 - Math.random()));
    setDrillStatus('idle');
  };

  const handleNextDrill = () => {
    const nextIndex = (activeDrillIndex + 1) % SENTENCE_DRILLS.length;
    setActiveDrillIndex(nextIndex);
    setBuiltWords([]);
    setAvailableWords([...SENTENCE_DRILLS[nextIndex].targetWords].sort(() => 0.5 - Math.random()));
    setDrillStatus('idle');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 7 · वाक्य रचना
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Sentence Formation (वाक्य बनाना: Subject + Verb + Object)
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

        {/* Structure visualizer */}
        <div className="mt-5 p-4 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            अंग्रेज़ी वाक्य का स्वर्ण नियम (Golden Sequence):
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-extrabold">
            <span className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-lg border border-blue-200">
              1. Subject (कर्ता)
            </span>
            <span className="text-stone-400 font-bold">+</span>
            <span className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-200">
              2. Verb (क्रिया / काम)
            </span>
            <span className="text-stone-400 font-bold">+</span>
            <span className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-200">
              3. Object (कर्म / वस्तु)
            </span>
          </div>
          <div className="text-xs text-stone-600 mt-2">
            उदाहरण: <strong className="text-stone-900">I (Subject)</strong> + <strong className="text-stone-900">eat (Verb)</strong> + <strong className="text-stone-900">food (Object)</strong> = मैं खाना खाता हूँ।
          </div>
        </div>
      </div>

      {/* Interactive Drag/Tap Sentence Builder */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              अभ्यास: बिखरे शब्दों से सही वाक्य बनाएं ({activeDrillIndex + 1}/{SENTENCE_DRILLS.length})
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              शब्दों को सही क्रम (S + V + O) में जोड़ें
            </p>
          </div>
          <button
            onClick={handleResetDrill}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>रीसेट करें</span>
          </button>
        </div>

        {/* Hindi Prompt */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
          <span className="text-xs font-semibold text-amber-800 uppercase">
            हिंदी वाक्य:
          </span>
          <div className="text-2xl font-black text-stone-900 mt-1">
            "{activeDrill.hindi}"
          </div>
          <div className="text-xs text-stone-600 mt-1">
            प्रकार: {activeDrill.type} · {activeDrill.ruleNotes}
          </div>
        </div>

        {/* Builder Work Area */}
        <div className="min-h-16 p-4 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/50 flex flex-wrap items-center gap-2">
          {builtWords.length === 0 ? (
            <span className="text-xs text-stone-400 italic">
              नीचे दिए गए शब्दों पर क्लिक करके यहाँ वाक्य जोड़ें...
            </span>
          ) : (
            builtWords.map((word, idx) => (
              <button
                key={word + idx}
                onClick={() => handleRemoveWord(word, idx)}
                className="px-3.5 py-2 bg-stone-900 text-white rounded-lg text-sm font-bold shadow-xs hover:bg-rose-700 transition-colors cursor-pointer"
                title="हटाने के लिए क्लिक करें"
              >
                {word} ✕
              </button>
            ))
          )}
        </div>

        {/* Word Bank Chips */}
        <div>
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
            उपलब्ध शब्द बैंक:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {availableWords.map((word, idx) => (
              <button
                key={word + idx}
                onClick={() => handlePickWord(word, idx)}
                className="px-4 py-2 bg-white border border-stone-300 hover:border-amber-500 text-stone-800 font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                + {word}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCheckSentence}
            disabled={builtWords.length === 0}
            className="px-5 py-2.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
          >
            वाक्य जांचें (Verify)
          </button>

          <button
            onClick={handleNextDrill}
            className="px-4 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
          >
            अगला वाक्य →
          </button>
        </div>

        {/* Result Feedback */}
        {drillStatus === 'correct' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">✓ बिल्कुल सही वाक्य!</span>
              <button
                onClick={() => speakText(activeDrill.correctSentence, 0.85)}
                className="flex items-center gap-1 font-semibold text-emerald-800 hover:underline cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>उच्चारण सुनें</span>
              </button>
            </div>
            <p className="text-emerald-800">
              <strong>{activeDrill.correctSentence}</strong> = {activeDrill.hindi}
            </p>
          </div>
        )}

        {drillStatus === 'wrong' && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
            <span className="font-bold">क्रम में गलती है!</span> कृपया Subject + Verb + Object के क्रम को ध्यान में रखकर दोबारा प्रयास करें।
          </div>
        )}
      </div>

      {/* Spot the Error Section */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <h3 className="text-base font-bold text-stone-900">
            गलत वाक्य पहचानना और सुधारना (Spot & Fix Errors)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          सामान्य गलतियों को पहचानकर सही वाक्य बनाना सीखें:
        </p>

        <div className="space-y-3">
          {ERROR_SPOTS.map((err, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-rose-600 line-through">{err.wrong}</span>
                  <span className="text-stone-400">→</span>
                  <span className="text-emerald-700">{err.correct}</span>
                  <button
                    onClick={() => speakText(err.correct, 0.85)}
                    className="p-1 text-stone-400 hover:text-stone-800 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-stone-600 mt-1">
                  <strong>कारण:</strong> {err.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
