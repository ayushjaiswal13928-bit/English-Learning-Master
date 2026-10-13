import React, { useState } from 'react';
import { ALPHABET_DATA } from '../../data/roadmapData';
import { LetterItem } from '../../types';
import { speakText } from '../../utils/speech';
import { Volume2, Play, CheckCircle2, RotateCcw } from 'lucide-react';

interface AlphabetModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const AlphabetModule: React.FC<AlphabetModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<LetterItem>(ALPHABET_DATA[0]);
  const [viewFilter, setViewFilter] = useState<'all' | 'vowels' | 'consonants'>('all');
  const [matchGameActive, setMatchGameActive] = useState<boolean>(false);
  const [matchScore, setMatchScore] = useState<number>(0);
  const [matchTarget, setMatchTarget] = useState<LetterItem>(ALPHABET_DATA[0]);
  const [matchOptions, setMatchOptions] = useState<string[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const filteredLetters = ALPHABET_DATA.filter((l) => {
    if (viewFilter === 'vowels') return l.isVowel;
    if (viewFilter === 'consonants') return !l.isVowel;
    return true;
  });

  const handlePlayLetterAudio = (letter: LetterItem) => {
    // Say the letter and sample word clearly
    speakText(`${letter.capital}. ${letter.sampleWord}`, 0.8);
  };

  const startMatchGame = () => {
    const randomTarget = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
    setMatchTarget(randomTarget);

    // generate 3 options: correct small letter + 2 random small letters
    const otherOptions = ALPHABET_DATA.filter((l) => l.capital !== randomTarget.capital)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((l) => l.small);

    const shuffled = [randomTarget.small, ...otherOptions].sort(() => 0.5 - Math.random());
    setMatchOptions(shuffled);
    setMatchGameActive(true);
    setFeedbackMsg(null);
  };

  const handleAnswerMatch = (ans: string) => {
    if (ans === matchTarget.small) {
      setMatchScore((prev) => prev + 1);
      setFeedbackMsg('शाबाश! सही उत्तर (Correct Match)');
      speakText(`Correct! ${matchTarget.capital} matches with small ${matchTarget.small}`, 0.9);
      setTimeout(() => {
        startMatchGame();
      }, 1200);
    } else {
      setFeedbackMsg(`गलत! ${matchTarget.capital} का छोटा अक्षर '${matchTarget.small}' है।`);
      speakText(`Try again. ${matchTarget.capital} matches with small ${matchTarget.small}`, 0.9);
    }
  };

  return (
    <div className="space-y-8">
      {/* Module Title & Core Principles */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 1 · बुनियादी वर्णमाला
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              ABC और Alphabet Rules (अक्षर और आवाज़)
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
            <span>{isCompleted ? 'मॉड्यूल पूरा हुआ (Completed)' : 'पूरा चिह्नित करें'}</span>
          </button>
        </div>

        {/* 4 Core Pillars from user roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-stone-50 border border-stone-200/60 rounded-lg p-4">
            <h4 className="text-sm font-bold text-stone-900">1. Capital vs Small</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              बड़े अक्षर (A–Z) वाक्य की शुरुआत और नामों में आते हैं। छोटे अक्षर (a–z) सामान्य लेखन में प्रयुक्त होते हैं।
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200/60 rounded-lg p-4">
            <h4 className="text-sm font-bold text-stone-900">2. नाम बनाम आवाज़ (Sound)</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              अक्षर का नाम 'H' (एच) है, पर उसकी आवाज़ 'ह' है (Hat = हैट)। नाम और ध्वनि के अंतर को समझना आवश्यक है।
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200/60 rounded-lg p-4">
            <h4 className="text-sm font-bold text-stone-900">3. Vowels (5 स्वर)</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              <strong>A, E, I, O, U</strong> — बिना किसी रुकावट के कंठ से निकलने वाली मुख्य ध्वनियाँ हैं।
            </p>
          </div>

          <div className="bg-stone-50 border border-stone-200/60 rounded-lg p-4">
            <h4 className="text-sm font-bold text-stone-900">4. Consonants (21 व्यंजन)</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              बाकी 21 अक्षर (B, C, D...) होंठ, जीभ और दाँत के स्पर्श से उच्चारित होते हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Letter Grid & Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 26 Letter Tiles */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-stone-900">
              अक्षर चुनें (किसी भी अक्षर पर क्लिक करके आवाज़ सुनें):
            </h3>
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg text-xs">
              <button
                onClick={() => setViewFilter('all')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  viewFilter === 'all' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                सभी (26)
              </button>
              <button
                onClick={() => setViewFilter('vowels')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  viewFilter === 'vowels' ? 'bg-white font-bold text-amber-700 shadow-xs' : 'text-stone-600'
                }`}
              >
                Vowels (5)
              </button>
              <button
                onClick={() => setViewFilter('consonants')}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  viewFilter === 'consonants' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Consonants (21)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5">
            {filteredLetters.map((item) => {
              const isSelected = selectedLetter.capital === item.capital;
              return (
                <button
                  key={item.capital}
                  onClick={() => {
                    setSelectedLetter(item);
                    handlePlayLetterAudio(item);
                  }}
                  className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900'
                  }`}
                >
                  <div className="text-xl font-bold tracking-tight">
                    {item.capital} <span className="text-sm font-normal text-stone-500">{item.small}</span>
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 mt-1">
                    {item.hindiSound.split('/')[0]}
                  </div>
                  {item.isVowel && (
                    <div className="text-[9px] font-bold text-amber-700 mt-0.5">
                      VOWEL
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Letter Inspector & Audio Practice */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs text-stone-400 font-mono">
                  {selectedLetter.isVowel ? 'स्वर (Vowel)' : 'व्यंजन (Consonant)'}
                </span>
                <div className="text-4xl font-extrabold text-stone-900 mt-1">
                  {selectedLetter.capital} {selectedLetter.small}
                </div>
              </div>

              <button
                onClick={() => handlePlayLetterAudio(selectedLetter)}
                className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors cursor-pointer shadow-xs focus-visible:outline-none"
                title="आवाज़ सुनें"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mt-5 text-sm">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">अक्षर का नाम (Letter Name):</span>
                <span className="font-semibold text-stone-900">{selectedLetter.nameSound}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">हिंदी ध्वनि (Hindi Sound):</span>
                <span className="font-bold text-amber-800">{selectedLetter.hindiSound}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">उच्चारण संकेत:</span>
                <span className="font-mono text-xs text-stone-700">{selectedLetter.phoneticExample}</span>
              </div>
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-200/60 mt-3">
                <div className="text-xs text-stone-500">उदाहरण शब्द (Sample Word):</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base font-bold text-stone-900">{selectedLetter.sampleWord}</span>
                  <span className="text-xs text-stone-600 font-medium">{selectedLetter.sampleHindi}</span>
                  <button
                    onClick={() => speakText(selectedLetter.sampleWord, 0.8)}
                    className="text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                  >
                    बोलें 🔊
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Capital-Small Matching Game */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-sm font-bold text-white">
                अभ्यास: Capital को Small से जोड़ें
              </h4>
              <span className="text-xs font-mono text-amber-400">स्कोर: {matchScore}</span>
            </div>

            {!matchGameActive ? (
              <div className="py-4 text-center">
                <p className="text-xs text-stone-300 mb-3">
                  बड़े अक्षर को उसके सही छोटे अक्षर से पहचानने का तेज़ अभ्यास करें।
                </p>
                <button
                  onClick={startMatchGame}
                  className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  क्विज़ शुरू करें
                </button>
              </div>
            ) : (
              <div className="py-3 space-y-4">
                <div className="text-center">
                  <span className="text-xs text-stone-400">यह बड़ा अक्षर है:</span>
                  <div className="text-4xl font-extrabold text-amber-400 mt-1">
                    {matchTarget.capital}
                  </div>
                  <p className="text-xs text-stone-300 mt-1">इसका सही छोटा अक्षर कौन सा है?</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {matchOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerMatch(opt)}
                      className="py-3 text-xl font-bold bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg text-white transition-colors cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {feedbackMsg && (
                  <div className="text-xs text-center font-medium text-amber-300">
                    {feedbackMsg}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
