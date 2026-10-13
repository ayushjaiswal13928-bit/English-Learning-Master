import React, { useState } from 'react';
import { GRAMMAR_RULES } from '../../data/roadmapData';
import { GrammarRuleItem } from '../../types';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, BookOpen, HelpCircle } from 'lucide-react';

interface GrammarModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [activeRuleId, setActiveRuleId] = useState<string>(GRAMMAR_RULES[0].id);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentRule =
    GRAMMAR_RULES.find((r) => r.id === activeRuleId) || GRAMMAR_RULES[0];

  const handleSelectRule = (id: string) => {
    setActiveRuleId(id);
    setSelectedQuizAnswer(null);
    setShowExplanation(false);
  };

  const handleQuizSelect = (index: number) => {
    setSelectedQuizAnswer(index);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 6 · व्याकरण के 15 मूल नियम
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Grammar Rules (व्याकरण के 15 ज़रूरी नियम)
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
          अंग्रेज़ी व्याकरण को एक साथ रटने के बजाय इन 15 नियमों को एक-एक करके समझें।
          प्रत्येक नियम के साथ व्यावहारिक उदाहरण और तुरंत हल करने योग्य प्रश्न दिए गए हैं।
        </p>
      </div>

      {/* 2-Zone Sandbox: Left Rule Navigator (15 rules), Right In-Depth Rule Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigator List (15 Rules) */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs max-h-[720px] overflow-y-auto space-y-1.5">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wide px-2 py-1 mb-1">
            15 नियम तालिका:
          </div>

          {GRAMMAR_RULES.map((rule) => {
            const isSelected = rule.id === activeRuleId;
            return (
              <button
                key={rule.id}
                onClick={() => handleSelectRule(rule.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50/70 border-stone-200/80 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span className="font-mono text-amber-500">#{rule.number}</span>
                    <span>{rule.titleEnglish}</span>
                  </div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {rule.titleHindi}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Rule Stage */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-mono font-bold text-amber-700">
              व्याकरण नियम #{currentRule.number}
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 mt-1">
              {currentRule.titleEnglish}
            </h3>
            <p className="text-sm font-semibold text-stone-600 mt-0.5">
              {currentRule.titleHindi}
            </p>

            <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 font-medium">
              💡 <strong>मूल सूत्र:</strong> {currentRule.keyRule}
            </div>

            <p className="text-sm text-stone-700 mt-4 leading-relaxed">
              {currentRule.explanationHindi}
            </p>
          </div>

          {/* Real world examples with audio */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-3">
              स्पष्ट उदाहरण (सुनने के लिए क्लिक करें):
            </h4>
            <div className="space-y-3">
              {currentRule.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 border border-stone-200 rounded-lg p-3.5 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-stone-900">
                      {ex.english}
                    </div>
                    <div className="text-xs text-stone-600">
                      {ex.hindi}
                    </div>
                  </div>

                  <button
                    onClick={() => speakText(ex.english, 0.85)}
                    className="p-2 bg-white hover:bg-amber-600 hover:text-white text-stone-700 border border-stone-200 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Concept Quiz */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
              <HelpCircle className="w-4 h-4" />
              <span>नियम #{currentRule.number} की तुरंत जांच (Mini Quiz)</span>
            </div>

            <p className="text-sm font-bold text-white">
              {currentRule.quiz.questionHindi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentRule.quiz.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === currentRule.quiz.correctIndex;

                let btnStyle = 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-800 text-white border-emerald-600 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-900/80 text-white border-rose-600';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleQuizSelect(idx)}
                    className={`p-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div
                className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                  selectedQuizAnswer === currentRule.quiz.correctIndex
                    ? 'bg-emerald-950/70 border border-emerald-600 text-emerald-200'
                    : 'bg-stone-800/90 border border-stone-700 text-stone-300'
                }`}
              >
                <strong>
                  {selectedQuizAnswer === currentRule.quiz.correctIndex
                    ? '✓ बिल्कुल सही उत्तर!'
                    : 'ध्यान दें:'}
                </strong>{' '}
                {currentRule.quiz.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
