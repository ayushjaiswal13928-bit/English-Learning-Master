import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface PunctuationModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const PUNCTUATION_CHALLENGES = [
  {
    raw: 'i live in delhi with my brother',
    corrected: 'I live in Delhi with my brother.',
    errors: [
      'शुरुआत में छोटा "i" नहीं, बड़ा "I" आएगा',
      'शहर के नाम "delhi" का "D" बड़ा होगा (Proper Noun)',
      'वाक्य के अंत में Full Stop (.) लगाना आवश्यक है',
    ],
  },
  {
    raw: 'what is your name',
    corrected: 'What is your name?',
    errors: [
      'शुरुआती अक्षर "W" बड़ा (Capital) होगा',
      'यह सवाल है, इसलिए अंत में Question Mark (?) आएगा',
    ],
  },
  {
    raw: 'ram and shyam are good friends',
    corrected: 'Ram and Shyam are good friends.',
    errors: [
      'व्यक्ति के नामों (Ram, Shyam) के पहले अक्षर बड़े होंगे',
      'अंत में Full Stop (.) लगेगा',
    ],
  },
];

export const PunctuationModule: React.FC<PunctuationModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    success: boolean;
    msg: string;
  } | null>(null);

  const activeChallenge = PUNCTUATION_CHALLENGES[challengeIdx];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === activeChallenge.corrected) {
      setFeedback({
        success: true,
        msg: 'शानदार! आपने सभी Capital letters और विराम चिह्न (Punctuation) बिल्कुल सही लगाए!',
      });
    } else {
      setFeedback({
        success: false,
        msg: `अपूर्ण सुधार! सही रूप: "${activeChallenge.corrected}"`,
      });
    }
  };

  const handleNext = () => {
    setUserInput('');
    setFeedback(null);
    setChallengeIdx((prev) => (prev + 1) % PUNCTUATION_CHALLENGES.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 12 · विराम चिह्न व शुद्धता
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Punctuation और Capitalization (विराम चिह्न व बड़े अक्षर)
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

        {/* 5 Core rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs text-stone-700">
          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-lg">
            <h4 className="font-bold text-stone-900 mb-1">1. Capital Letter</h4>
            <p className="text-stone-600 leading-relaxed">
              वाक्य का पहला अक्षर और अकेला 'I' (मैं) हमेशा बड़े अक्षर (Capital) में लिखा जाता है।
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-lg">
            <h4 className="font-bold text-stone-900 mb-1">2. Proper Nouns</h4>
            <p className="text-stone-600 leading-relaxed">
              किसी व्यक्ति, शहर, देश या नदी का नाम हमेशा Capital से शुरू होता है (e.g. Rahul, India)।
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-lg">
            <h4 className="font-bold text-stone-900 mb-1">3. Full Stop (.)</h4>
            <p className="text-stone-600 leading-relaxed">
              सामान्य वाक्य के समाप्त होने पर पूर्ण विराम के रूप में Full stop (.) अवश्य लगाएं।
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-lg">
            <h4 className="font-bold text-stone-900 mb-1">4. Question Mark (?)</h4>
            <p className="text-stone-600 leading-relaxed">
              किसी भी प्रश्न के अंत में प्रश्नवाचक चिह्न (?) का प्रयोग किया जाता है।
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sentence Doctor Challenge */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold text-stone-900">
            वाक्य सुधार अभ्यास (Sentence Doctor #{challengeIdx + 1}/{PUNCTUATION_CHALLENGES.length})
          </h3>
          <span className="text-xs text-stone-400">
            Capitalization और Punctuation की गलतियाँ सुधारें
          </span>
        </div>

        {/* Broken sentence showcase */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
          <span className="text-xs font-semibold text-rose-700 uppercase">
            अशुद्ध वाक्य (बिना Capital और Punctuation के):
          </span>
          <div className="text-2xl font-mono font-bold text-stone-800 mt-1">
            "{activeChallenge.raw}"
          </div>
        </div>

        {/* Input box */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              यहाँ शुद्ध करके लिखें (Capital letters और ., ? सही लगाएं):
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g. I live in Delhi with my brother."
              className="w-full px-4 py-3 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              सुधार जांचें (Verify)
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              अगला वाक्य →
            </button>
          </div>
        </form>

        {/* Feedback & Error breakdown */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs space-y-2 ${
              feedback.success
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-stone-50 text-stone-800 border border-stone-300'
            }`}
          >
            <div className="font-bold">{feedback.msg}</div>
            <div className="pt-2 border-t border-stone-200/60">
              <span className="font-bold text-stone-700 block mb-1">
                इस वाक्य के जरूरी नियम:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                {activeChallenge.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
