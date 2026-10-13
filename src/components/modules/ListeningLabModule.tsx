import React, { useState } from 'react';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, RotateCcw, Headphones, HelpCircle } from 'lucide-react';

interface ListeningLabModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const LISTENING_WORD_CHALLENGES = [
  {
    audioWord: 'Ship',
    options: ['Sheep', 'Ship', 'Chip', 'Shop'],
    correctIndex: 1,
    hindiClue: 'पानी का जहाज़',
    audioRate: 0.85,
  },
  {
    audioWord: 'Pen',
    options: ['Pan', 'Pin', 'Pen', 'Pain'],
    correctIndex: 2,
    hindiClue: 'कलम (Short E sound)',
    audioRate: 0.85,
  },
  {
    audioWord: 'Cut',
    options: ['Cat', 'Cot', 'Cut', 'Kite'],
    correctIndex: 2,
    hindiClue: 'काटना (Short U sound)',
    audioRate: 0.85,
  },
  {
    audioWord: 'These',
    options: ['This', 'These', 'Those', 'Theme'],
    correctIndex: 1,
    hindiClue: 'ये सब (Long E sound)',
    audioRate: 0.85,
  },
];

const LISTENING_SENTENCE_CHALLENGES = [
  {
    audioSentence: 'Where are you going right now?',
    hindiMeaning: 'आप अभी कहाँ जा रहे हैं?',
    question: 'इस सवाल का सही जवाब क्या हो सकता है?',
    options: [
      'I am going to the market.',
      'Yes, I like apples.',
      'My name is Rahul.',
    ],
    correctIndex: 0,
  },
  {
    audioSentence: 'Please sit down and open your English book.',
    hindiMeaning: 'कृपया बैठ जाइए और अपनी अंग्रेज़ी की किताब खोलिए।',
    question: 'ऑडियो में क्या करने को कहा गया है?',
    options: [
      'घर जाने को',
      'बैठने और किताब खोलने को',
      'दौड़ लगाने को',
    ],
    correctIndex: 1,
  },
];

export const ListeningLabModule: React.FC<ListeningLabModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [wordIdx, setWordIdx] = useState<number>(0);
  const [selectedWordOption, setSelectedWordOption] = useState<number | null>(null);
  const [wordFeedback, setWordFeedback] = useState<boolean | null>(null);

  const [sentenceIdx, setSentenceIdx] = useState<number>(0);
  const [selectedSentenceOption, setSelectedSentenceOption] = useState<number | null>(null);
  const [sentenceFeedback, setSentenceFeedback] = useState<boolean | null>(null);

  const activeWordTest = LISTENING_WORD_CHALLENGES[wordIdx];
  const activeSentenceTest = LISTENING_SENTENCE_CHALLENGES[sentenceIdx];

  const handlePlayWord = () => {
    speakText(activeWordTest.audioWord, activeWordTest.audioRate);
  };

  const handleSelectWord = (idx: number) => {
    setSelectedWordOption(idx);
    const isCorrect = idx === activeWordTest.correctIndex;
    setWordFeedback(isCorrect);
  };

  const handlePlaySentence = () => {
    speakText(activeSentenceTest.audioSentence, 0.85);
  };

  const handleSelectSentence = (idx: number) => {
    setSelectedSentenceOption(idx);
    const isCorrect = idx === activeSentenceTest.correctIndex;
    setSentenceFeedback(isCorrect);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 9 · श्रवण शक्ति (Listening)
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Listening Lab (सुनकर समझने का अभ्यास)
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
          अंग्रेज़ी बोलने से पहले कानों को अंग्रेज़ी ध्वनियाँ पहचानने की आदत डालनी होती है।
          यहाँ आप <strong>Minimal Pairs (समान सुनाई देने वाले शब्दों में अंतर)</strong> और <strong>वाक्य सुनकर समझना</strong> सीखेंगे।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Word Sound Discrimination (Minimal Pairs) */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-stone-900">
                  स्तर 1: शब्द सुनकर पहचानें ({wordIdx + 1}/{LISTENING_WORD_CHALLENGES.length})
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                संकेत: {activeWordTest.hindiClue}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center my-4">
              <button
                onClick={handlePlayWord}
                className="p-4 bg-stone-900 hover:bg-stone-800 text-white rounded-full transition-colors cursor-pointer shadow-md inline-flex items-center justify-center focus-visible:outline-none"
              >
                <Volume2 className="w-8 h-8 text-amber-400" />
              </button>
              <div className="text-xs font-bold text-stone-800 mt-3">
                आवाज़ सुनने के लिए क्लिक करें
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                ध्यान से सुनें कि कौन सा शब्द बोला गया
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              {activeWordTest.options.map((opt, idx) => {
                const isSelected = selectedWordOption === idx;
                const isCorrect = idx === activeWordTest.correctIndex;

                let btnStyle = 'bg-white border-stone-200 hover:border-amber-400 text-stone-800';
                if (selectedWordOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectWord(idx)}
                    className={`p-3 text-base font-extrabold rounded-lg border text-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {wordFeedback !== null && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold text-center ${
                  wordFeedback
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {wordFeedback
                  ? `✓ शाबाश! आपने सही शब्द '${activeWordTest.audioWord}' पहचाना।`
                  : `✕ गलत! सही शब्द '${activeWordTest.audioWord}' था।`}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              onClick={() => {
                setSelectedWordOption(null);
                setWordFeedback(null);
                setWordIdx((prev) => (prev + 1) % LISTENING_WORD_CHALLENGES.length);
              }}
              className="px-3 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              अगला शब्द →
            </button>
          </div>
        </div>

        {/* Section 2: Sentence Comprehension */}
        <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-stone-900">
                  स्तर 2: वाक्य सुनकर समझें ({sentenceIdx + 1}/{LISTENING_SENTENCE_CHALLENGES.length})
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                ऑडियो सुनकर प्रश्न का उत्तर दें
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center my-4">
              <button
                onClick={handlePlaySentence}
                className="p-4 bg-amber-700 hover:bg-amber-800 text-white rounded-full transition-colors cursor-pointer shadow-md inline-flex items-center justify-center focus-visible:outline-none"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <div className="text-xs font-bold text-stone-800 mt-3">
                वाक्य सुनने के लिए क्लिक करें
              </div>
              <button
                onClick={handlePlaySentence}
                className="text-[11px] text-amber-800 underline mt-1 cursor-pointer"
              >
                दोबारा सुनें ↺
              </button>
            </div>

            <div className="text-xs font-bold text-stone-800 mb-2">
              {activeSentenceTest.question}
            </div>

            <div className="space-y-2 mb-4">
              {activeSentenceTest.options.map((opt, idx) => {
                const isSelected = selectedSentenceOption === idx;
                const isCorrect = idx === activeSentenceTest.correctIndex;

                let btnStyle = 'bg-white border-stone-200 hover:border-amber-400 text-stone-800';
                if (selectedSentenceOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectSentence(idx)}
                    className={`w-full p-2.5 text-xs text-left rounded-lg border transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {sentenceFeedback !== null && (
              <div className="p-3 bg-stone-100 rounded-lg text-xs space-y-1">
                <div className="font-bold text-stone-900">
                  सुनाई दिया वाक्य: "{activeSentenceTest.audioSentence}"
                </div>
                <div className="text-stone-600">
                  अर्थ: {activeSentenceTest.hindiMeaning}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              onClick={() => {
                setSelectedSentenceOption(null);
                setSentenceFeedback(null);
                setSentenceIdx((prev) => (prev + 1) % LISTENING_SENTENCE_CHALLENGES.length);
              }}
              className="px-3 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              अगला वाक्य →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
