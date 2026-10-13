import React, { useState } from 'react';
import { speakText } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

interface SentenceTrainProps {
  onEarnStar?: () => void;
}

export const SentenceTrainGame: React.FC<SentenceTrainProps> = ({ onEarnStar }) => {
  const [selectedEngine, setSelectedEngine] = useState<string>('I');
  const [selectedAction, setSelectedAction] = useState<string>('like');
  const [selectedObject, setSelectedObject] = useState<string>('apples');
  const [trainIsMoving, setTrainIsMoving] = useState<boolean>(false);

  const engines = [
    { en: 'I', hi: 'मैं' },
    { en: 'My cat', hi: 'मेरी बिल्ली' },
    { en: 'He', hi: 'वह (लड़का)' },
  ];

  // Helper to ensure correct verb agreement for kids
  const getActionOptions = (subject: string) => {
    if (subject === 'I') {
      return [
        { en: 'eat', hi: 'खाता हूँ' },
        { en: 'drink', hi: 'पीता हूँ' },
        { en: 'like', hi: 'पसंद करता हूँ' },
        { en: 'play with', hi: 'खेलता हूँ' },
      ];
    } else {
      return [
        { en: 'eats', hi: 'खाता/खाती है' },
        { en: 'drinks', hi: 'पीती है' },
        { en: 'likes', hi: 'पसंद करता/करती है' },
        { en: 'plays with', hi: 'खेलता/खेलती है' },
      ];
    }
  };

  const actionOptions = getActionOptions(selectedEngine);

  const objectOptions = [
    { en: 'warm milk', hi: 'गरम दूध 🥛' },
    { en: 'sweet apples', hi: 'मीठे सेब 🍎' },
    { en: 'a cute puppy', hi: 'प्यारा पिल्ला 🐶' },
    { en: 'a football', hi: 'गेंद ⚽' },
  ];

  const fullSentence = `${selectedEngine} ${selectedAction} ${selectedObject}.`;

  const handleRunTrain = () => {
    setTrainIsMoving(true);
    playKidChime('star');
    if (onEarnStar) onEarnStar();
    speakText(fullSentence, 0.8, () => {
      setTrainIsMoving(false);
    });
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
          <span>🚂 बच्चों की जादुई ट्रेन</span>
        </div>
        <h3 className="text-2xl font-black text-stone-900">
          वाक्य की रेलगाड़ी (Sentence Train Game)
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          इंजन, पहला डिब्बा और दूसरा डिब्बा जोड़कर खुद अपना अंग्रेज़ी वाक्य बनाएं!
          तीनों डिब्बे जुड़ते ही गाड़ी सीटी बजाकर चल पड़ेगी!
        </p>
      </div>

      {/* Visual Train Display */}
      <div
        className={`p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-stone-50 to-blue-50 border border-stone-200 transition-all ${
          trainIsMoving ? 'scale-[1.02] shadow-md ring-2 ring-amber-400' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          {/* Engine */}
          <div className="bg-amber-500 text-stone-950 font-black px-5 py-3 rounded-2xl border-2 border-amber-600 shadow-xs min-w-36">
            <span className="text-[10px] text-amber-900 block font-bold uppercase">
              🚂 1. इंजन (कौन?)
            </span>
            <span className="text-xl">{selectedEngine}</span>
          </div>

          <span className="text-amber-800 font-black text-xl hidden sm:inline">+</span>

          {/* Action Wagon */}
          <div className="bg-blue-500 text-white font-black px-5 py-3 rounded-2xl border-2 border-blue-600 shadow-xs min-w-36">
            <span className="text-[10px] text-blue-100 block font-bold uppercase">
              🚃 2. काम (क्या करता है?)
            </span>
            <span className="text-xl">{selectedAction}</span>
          </div>

          <span className="text-blue-800 font-black text-xl hidden sm:inline">+</span>

          {/* Object Wagon */}
          <div className="bg-emerald-500 text-white font-black px-5 py-3 rounded-2xl border-2 border-emerald-600 shadow-xs min-w-36">
            <span className="text-[10px] text-emerald-100 block font-bold uppercase">
              🚃 3. वस्तु (किस चीज़ के साथ?)
            </span>
            <span className="text-xl">{selectedObject}</span>
          </div>
        </div>

        {/* Assembled Sentence Banner */}
        <div className="mt-6 text-center space-y-1">
          <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">
            तैयार हुआ पूरा वाक्य:
          </div>
          <div className="text-2xl font-black text-stone-900">
            "{fullSentence}"
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 text-center">
          <button
            onClick={handleRunTrain}
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>गाड़ी चलाओ और आवाज़ सुनो! 🚂✨</span>
          </button>
        </div>
      </div>

      {/* Selectors for 3 Wagons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Wagon 1: Engine Subject */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 block text-center">
            1. इंजन चुनो (Subject):
          </span>
          <div className="space-y-1.5">
            {engines.map((item) => (
              <button
                key={item.en}
                onClick={() => {
                  setSelectedEngine(item.en);
                  // sync action
                  const nextActions = getActionOptions(item.en);
                  setSelectedAction(nextActions[0].en);
                  playKidChime('click');
                }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  selectedEngine === item.en
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.en}</span>
                <span className="text-[11px] opacity-80">{item.hi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wagon 2: Action Verb */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 block text-center">
            2. काम चुनो (Verb):
          </span>
          <div className="space-y-1.5">
            {actionOptions.map((item) => (
              <button
                key={item.en}
                onClick={() => {
                  setSelectedAction(item.en);
                  playKidChime('click');
                }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  selectedAction === item.en
                    ? 'bg-blue-500 text-white border-blue-600 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.en}</span>
                <span className="text-[11px] opacity-80">{item.hi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wagon 3: Object */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-700 block text-center">
            3. चीज़ चुनो (Object):
          </span>
          <div className="space-y-1.5">
            {objectOptions.map((item) => (
              <button
                key={item.en}
                onClick={() => {
                  setSelectedObject(item.en);
                  playKidChime('click');
                }}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                  selectedObject === item.en
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.en}</span>
                <span className="text-[11px] opacity-80">{item.hi}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
