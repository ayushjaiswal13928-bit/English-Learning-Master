import React, { useState } from 'react';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, Edit3, HelpCircle, AlertCircle } from 'lucide-react';

interface SpellingModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const MISSING_LETTER_CHALLENGES = [
  { prompt: 'B _ _ K', answer: 'BOOK', hint: 'किताब', missing: 'OO' },
  { prompt: 'F R _ _ N D', answer: 'FRIEND', hint: 'दोस्त (i before e)', missing: 'IE' },
  { prompt: 'A P _ _ E', answer: 'APPLE', hint: 'सेब (डबल P)', missing: 'PL' },
  { prompt: 'S C H _ _ L', answer: 'SCHOOL', hint: 'विद्यालय', missing: 'OO' },
  { prompt: 'W _ T E R', answer: 'WATER', hint: 'पानी', missing: 'A' },
  { prompt: 'T E A C H _ _', answer: 'TEACHER', hint: 'शिक्षक', missing: 'ER' },
];

const SPELLING_TRAPS = [
  {
    wrong: 'Frend',
    correct: 'Friend',
    reason: 'नियम: "i before e except after c"। इसलिए Friend में IE आता है।',
  },
  {
    wrong: 'Tommorow / Tommorrow',
    correct: 'Tomorrow',
    reason: 'याद रखें: एक M (m) और दो R (rr) होते हैं: To-mor-row।',
  },
  {
    wrong: 'Becoz / Becouse',
    correct: 'Because',
    reason: 'याद रखने का तरीका: Big Elephants Can Always Understand Small Elephants (BECAUSE)।',
  },
  {
    wrong: 'Recieve',
    correct: 'Receive',
    reason: 'C के बाद EI आता है (e before i after c) — इसलिए Receive सही है।',
  },
  {
    wrong: 'Untill',
    correct: 'Until',
    reason: 'Until में अंत में केवल एक "L" आता है, डबल LL नहीं।',
  },
];

const DICTATION_WORDS = [
  { word: 'Morning', hint: 'सुबह' },
  { word: 'Village', hint: 'गाँव' },
  { word: 'Beautiful', hint: 'सुंदर' },
  { word: 'Kitchen', hint: 'रसोई' },
  { word: 'Doctor', hint: 'चिकित्सक' },
];

export const SpellingModule: React.FC<SpellingModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [missingIndex, setMissingIndex] = useState<number>(0);
  const [missingInput, setMissingInput] = useState<string>('');
  const [missingFeedback, setMissingFeedback] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  const [dictationIndex, setDictationIndex] = useState<number>(0);
  const [dictationInput, setDictationInput] = useState<string>('');
  const [dictationResult, setDictationResult] = useState<{
    checked: boolean;
    correct: boolean;
    message: string;
  } | null>(null);

  const activeMissing = MISSING_LETTER_CHALLENGES[missingIndex];
  const activeDictation = DICTATION_WORDS[dictationIndex];

  const handleCheckMissing = (e: React.FormEvent) => {
    e.preventDefault();
    if (missingInput.trim().toUpperCase() === activeMissing.answer) {
      setMissingFeedback({
        success: true,
        text: `शाबाश! सही शब्द है: ${activeMissing.answer} (${activeMissing.hint})`,
      });
      speakText(`Correct! ${activeMissing.answer}`, 0.9);
      setTimeout(() => {
        setMissingInput('');
        setMissingFeedback(null);
        setMissingIndex((prev) => (prev + 1) % MISSING_LETTER_CHALLENGES.length);
      }, 1500);
    } else {
      setMissingFeedback({
        success: false,
        text: `दोबारा कोशिश करें! सही उत्तर '${activeMissing.answer}' है।`,
      });
    }
  };

  const handlePlayDictation = () => {
    speakText(activeDictation.word, 0.8);
  };

  const handleCheckDictation = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect =
      dictationInput.trim().toLowerCase() === activeDictation.word.toLowerCase();
    setDictationResult({
      checked: true,
      correct: isCorrect,
      message: isCorrect
        ? `बिल्कुल सही! आपने सही spelling लिखी: ${activeDictation.word}`
        : `गलत spelling! सही उत्तर है: ${activeDictation.word} (हिंदी: ${activeDictation.hint})`,
    });
    if (isCorrect) {
      speakText(`Excellent! ${activeDictation.word}`, 0.9);
    }
  };

  const handleNextDictation = () => {
    setDictationInput('');
    setDictationResult(null);
    setDictationIndex((prev) => (prev + 1) % DICTATION_WORDS.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 4 · वर्तनी व हिज्जे
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Spelling और Writing Rules (सही हिज्जे लिखना)
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
          अंग्रेज़ी में अक्सर लोग गलत spelling लिखते हैं (जैसे Frend या Tommorow)।
          यहाँ हम <strong>Dictation (सुनकर लिखना)</strong>, <strong>Missing Letters</strong> और <strong>Spelling सुधार</strong> का सीधा अभ्यास करेंगे।
        </p>
      </div>

      {/* 2-Column Split: Missing Letters + Dictation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Letters Quiz */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-stone-900">
                  Missing Letters भरें ({missingIndex + 1}/{MISSING_LETTER_CHALLENGES.length})
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-medium">
                संकेत: {activeMissing.hint}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center my-3">
              <div className="text-3xl font-black tracking-widest text-stone-900 font-mono">
                {activeMissing.prompt}
              </div>
              <div className="text-xs text-stone-500 mt-2">
                पूरा सही शब्द टाइप करें (जैसे BOOK):
              </div>
            </div>

            <form onSubmit={handleCheckMissing} className="space-y-3">
              <input
                type="text"
                value={missingInput}
                onChange={(e) => setMissingInput(e.target.value)}
                placeholder="पूरा शब्द लिखें..."
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  जांचें (Check)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMissingIndex(
                      (prev) => (prev + 1) % MISSING_LETTER_CHALLENGES.length
                    )
                  }
                  className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  अगला शब्द →
                </button>
              </div>
            </form>

            {missingFeedback && (
              <div
                className={`mt-4 p-3 rounded-lg text-xs font-medium ${
                  missingFeedback.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {missingFeedback.text}
              </div>
            )}
          </div>
        </div>

        {/* Audio Dictation */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-stone-900">
                  Dictation (सुनकर शब्द लिखें - #{dictationIndex + 1})
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                ऑडियो सुनकर सटीक हिज्जे टाइप करें
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center my-3">
              <button
                type="button"
                onClick={handlePlayDictation}
                className="p-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors cursor-pointer shadow-md inline-flex items-center justify-center focus-visible:outline-none"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <div className="text-xs font-bold text-stone-700 mt-3">
                स्पीकर पर क्लिक करके शब्द सुनें
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                (अर्थ: {activeDictation.hint})
              </div>
            </div>

            <form onSubmit={handleCheckDictation} className="space-y-3">
              <input
                type="text"
                value={dictationInput}
                onChange={(e) => setDictationInput(e.target.value)}
                placeholder="सुनाई दिया शब्द टाइप करें..."
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors cursor-pointer"
                >
                  उत्तर जांचें
                </button>
                <button
                  type="button"
                  onClick={handleNextDictation}
                  className="px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  अगला डिक्टेशन →
                </button>
              </div>
            </form>

            {dictationResult && (
              <div
                className={`mt-4 p-3 rounded-lg text-xs font-medium ${
                  dictationResult.correct
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {dictationResult.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Common Spelling Traps Table */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 mb-2">
          आम तौर पर होने वाली गलत स्पेलिंग और उनका सही नियम (Spelling Traps)
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          हिंदी भाषियों द्वारा की जाने वाली 5 सबसे आम स्पेलिंग की गलतियाँ:
        </p>

        <div className="space-y-3">
          {SPELLING_TRAPS.map((trap) => (
            <div
              key={trap.correct}
              className="bg-stone-50 border border-stone-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-rose-600 line-through">
                  {trap.wrong}
                </span>
                <span className="text-stone-400 font-bold">→</span>
                <span className="text-base font-extrabold text-emerald-700">
                  {trap.correct}
                </span>
                <button
                  onClick={() => speakText(trap.correct, 0.8)}
                  className="text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-600 md:max-w-md">
                <strong>कारण:</strong> {trap.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
