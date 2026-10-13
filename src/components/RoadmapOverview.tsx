import React, { useState } from 'react';
import { MODULES_METADATA } from '../data/roadmapData';
import { ModuleId } from '../types';
import { ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface RoadmapOverviewProps {
  onSelectModule: (id: ModuleId) => void;
  completedModules: ModuleId[];
  onToggleComplete: (id: ModuleId) => void;
}

export const RoadmapOverview: React.FC<RoadmapOverviewProps> = ({
  onSelectModule,
  completedModules,
  onToggleComplete,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredModules = MODULES_METADATA.filter((m) => {
    if (m.id === 'full_roadmap') return false; // This is the overview itself
    if (filterCategory === 'all') return true;
    return m.category === filterCategory;
  });

  const progressPercent = Math.round(
    (completedModules.length / (MODULES_METADATA.length - 1)) * 100
  );

  return (
    <div className="space-y-8">
      {/* 15. English सीखने का सही क्रम (Sequential Flow Banner) */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>15. English सीखने का सही क्रम (The Ideal Learning Path)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              अक्षरों से वार्तालाप तक का वैज्ञानिक क्रम
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              अनावश्यक रटने के बजाय ध्वनियों से वाक्यों की ओर क्रमबद्ध बढ़ें:
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-stone-300 font-medium">आपकी कुल प्रगति:</span>
            <span className="text-base font-mono font-bold text-amber-400 tabular-nums">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Visual Sequential Flow Bar */}
        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-xs font-medium min-w-max">
            {[
              '1. Alphabet',
              '2. Letter Sounds',
              '3. Phonics',
              '4. Word Reading',
              '5. Spelling',
              '6. Vocabulary',
              '7. Basic Grammar',
              '8. Sentences',
              '9. Paragraph Reading',
              '10. Listening',
              '11. Speaking',
              '12. Advanced & Review',
            ].map((step, idx, arr) => (
              <React.Fragment key={step}>
                <span className="bg-stone-800 text-stone-200 px-3 py-1.5 rounded-xl border border-stone-700">
                  {step}
                </span>
                {idx < arr.length - 1 && (
                  <span className="text-amber-500 font-black">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">
            सभी 14 अभ्यास मॉड्युल्स (All Modules)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            किसी भी मॉड्यूल पर क्लिक करके सीधा उसका अध्ययन और इंटरएक्टिव अभ्यास शुरू करें
          </p>
        </div>

        {/* Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            सभी मॉड्युल्स
          </button>
          <button
            onClick={() => setFilterCategory('foundation')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'foundation'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            बुनियाद (1-2)
          </button>
          <button
            onClick={() => setFilterCategory('reading_spelling')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'reading_spelling'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            पढ़ना व स्पेलिंग (3-4, 8, 12)
          </button>
          <button
            onClick={() => setFilterCategory('grammar_vocab')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'grammar_vocab'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            व्याकरण व वाक्य (5-7)
          </button>
          <button
            onClick={() => setFilterCategory('conversation_mastery')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'conversation_mastery'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            वार्तालाप व सुधार (9-11, 13-14)
          </button>
        </div>
      </div>

      {/* Grid of 14 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((item) => {
          const isCompleted = completedModules.includes(item.id);

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group ${
                isCompleted
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-stone-200 hover:border-amber-500 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <div className="flex items-center gap-1.5 text-stone-500 font-bold">
                    <span className="text-amber-800 font-mono">चरण {item.stepNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-normal">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.durationEst}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleComplete(item.id)}
                    title={isCompleted ? 'पूरा हुआ चिह्नित हटाएं' : 'पूरा चिह्नित करें'}
                    className="cursor-pointer focus-visible:outline-none"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 transition-colors ${
                        isCompleted
                          ? 'text-emerald-600 fill-emerald-100'
                          : 'text-stone-300 hover:text-stone-400'
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-base font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.titleHindi}
                </h3>
                <p className="text-xs font-bold text-stone-500 mt-0.5">
                  {item.titleEnglish}
                </p>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed font-medium">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono">
                  Module #{item.stepNumber}
                </span>

                <button
                  onClick={() => onSelectModule(item.id)}
                  className="px-3.5 py-1.5 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-white rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <span>शुरू करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
