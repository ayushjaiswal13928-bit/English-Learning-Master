import React, { useState } from 'react';
import { playKidChime } from '../../utils/kidAudio';
import { CheckCircle2, ArrowRight, RotateCcw, Award } from 'lucide-react';

export const TestQuizScreen: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(2); // Default to Question 3 as in Panel 13 (0-indexed 2)
  const [selectedOption, setSelectedOption] = useState<string>('A'); // Default selected A
  const [score, setScore] = useState<number>(3);
  const [showResult, setShowResult] = useState<boolean>(true); // Show Correct! badge as in Panel 13

  const QUESTIONS = [
    {
      q: '1. What is the sound of letter "A" in Cat?',
      options: [
        { key: 'A', text: 'ऐ (æ)' },
        { key: 'B', text: 'ओ (o)' },
        { key: 'C', text: 'ई (ee)' },
        { key: 'D', text: 'ऊ (oo)' },
      ],
      correct: 'A',
    },
    {
      q: '2. Which word has a silent letter?',
      options: [
        { key: 'A', text: 'Cat' },
        { key: 'B', text: 'Knife' },
        { key: 'C', text: 'Pen' },
        { key: 'D', text: 'Sun' },
      ],
      correct: 'B',
    },
    // Question 3 matching Panel 13:
    {
      q: '1. What is the correct spelling?',
      options: [
        { key: 'A', text: 'Book' },
        { key: 'B', text: 'Buk' },
        { key: 'C', text: 'Boke' },
        { key: 'D', text: 'Bokk' },
      ],
      correct: 'A',
    },
    {
      q: '4. Fill in the blank: "He _____ to school every day."',
      options: [
        { key: 'A', text: 'go' },
        { key: 'B', text: 'goes' },
        { key: 'C', text: 'going' },
        { key: 'D', text: 'gone' },
      ],
      correct: 'B',
    },
  ];

  const q = QUESTIONS[currentQIndex] || QUESTIONS[0];

  const handleSelect = (key: string) => {
    setSelectedOption(key);
    if (key === q.correct) {
      playKidChime('star');
      setShowResult(true);
    } else {
      playKidChime('error');
      setShowResult(false);
    }
  };

  const handleNext = () => {
    playKidChime('click');
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption('');
      setShowResult(false);
    } else {
      alert(`🎉 टेस्ट समाप्त! आपका स्कोर: ${score + 1}/4`);
      setCurrentQIndex(0);
      setSelectedOption('');
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 13: Unit Test — Question 3 of 10) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📝</span>
            <span>Unit Test</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            13. Test / Quiz — बहुविकल्पीय प्रश्नोत्तरी व मूल्यांकन
          </p>
        </div>

        {/* Question Counter Pill (Question 3 of 10 matching Panel 13) */}
        <div className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
          Question {currentQIndex + 1} of 10
        </div>
      </div>

      {/* 2. Question & Options Card (Matching Panel 13 layout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
        {/* Question text */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {q.q}
          </h2>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            सही विकल्प का चयन करें (Choose the correct option):
          </p>
        </div>

        {/* Layout: Options on left, Correct Badge & Next Question on right (Matching Panel 13) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Options Column (A. Book, B. Buk, C. Boke, D. Bokk) */}
          <div className="md:col-span-7 space-y-3">
            {q.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrectOpt = opt.key === q.correct;

              return (
                <label
                  key={opt.key}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer font-bold text-sm ${
                    isSelected
                      ? isCorrectOpt
                        ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 ring-2 ring-emerald-200'
                        : 'border-rose-400 bg-rose-50 text-rose-950'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="quizRadio"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="font-mono">{opt.key}.</span>
                  <span>{opt.text}</span>
                </label>
              );
            })}
          </div>

          {/* Right Column: Correct! Result Card + Next Question Button (Matching Panel 13) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
            {showResult && selectedOption === q.correct ? (
              <div className="space-y-3">
                {/* Green Correct Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-black text-base shadow-xs">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>Correct!</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  शानदार जवाब! आपका उत्तर शत-प्रतिशत सही है।
                </p>
              </div>
            ) : (
              <p className="text-xs font-semibold text-slate-400">
                उत्तर जांचने के लिए किसी विकल्प पर क्लिक करें
              </p>
            )}

            {/* Blue Next Question Button (Matching Panel 13) */}
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
