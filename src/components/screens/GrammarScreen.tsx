import React, { useState } from 'react';
import { speakSlowly } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Volume2, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export const GrammarScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<number>(8); // Default to 8: Tenses as in Panel 9
  const [tenseTab, setTenseTab] = useState<'present' | 'past' | 'future'>('present');

  // 10 Topics matching Panel 9 left sub-menu:
  // 1. Noun, 2. Pronoun, 3. Verb, 4. Adjective, 5. Adverb, 6. Articles, 7. Helping Verbs, 8. Tenses, 9. Subject-Verb Agreement, 10. Prepositions.
  const GRAMMAR_TOPICS = [
    { num: 1, title: 'Noun', hindi: 'संज्ञा' },
    { num: 2, title: 'Pronoun', hindi: 'सर्वनाम' },
    { num: 3, title: 'Verb', hindi: 'क्रिया' },
    { num: 4, title: 'Adjective', hindi: 'विशेषण' },
    { num: 5, title: 'Adverb', hindi: 'क्रिया विशेषण' },
    { num: 6, title: 'Articles', hindi: 'A, An, The' },
    { num: 7, title: 'Helping Verbs', hindi: 'Is, Am, Are' },
    { num: 8, title: 'Tenses', hindi: 'काल (समय)' },
    { num: 9, title: 'Subject-Verb Agreement', hindi: 'कर्ता-क्रिया तालमेल' },
    { num: 10, title: 'Prepositions', hindi: 'संबंधबोधक (In, On, At)' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 9 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📖</span>
            <span>Grammar</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            9. Grammar — 10 बुनियादी व्याकरण नियम ( सरल हिंदी व्याख्या के साथ)
          </p>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Matching Panel 9: Left Sub-Menu + Right Tense Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 10 Grammar Topics Sub-Menu */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <div className="px-3 py-2 text-xs font-black uppercase text-slate-400 tracking-wider">
            व्याकरण विषय (Topics)
          </div>

          {GRAMMAR_TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.num;
            return (
              <button
                key={topic.num}
                onClick={() => {
                  playKidChime('click');
                  setSelectedTopic(topic.num);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                  isSelected
                    ? 'bg-blue-50 text-blue-800 font-black border border-blue-200 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                }`}
              >
                <span>
                  {topic.num}. {topic.title}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  {topic.hindi}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Selected Topic Content Card (Matching Panel 9: Tenses with Present/Past/Future) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {selectedTopic === 8 ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Tenses (काल)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    क्रिया का समय: वर्तमान, भूतकाल और भविष्य
                  </p>
                </div>

                {/* 3 Tabs: Present | Past | Future (Matching Panel 9) */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => {
                      playKidChime('click');
                      setTenseTab('present');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      tenseTab === 'present'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => {
                      playKidChime('click');
                      setTenseTab('past');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      tenseTab === 'past'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Past
                  </button>
                  <button
                    onClick={() => {
                      playKidChime('click');
                      setTenseTab('future');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      tenseTab === 'future'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Future
                  </button>
                </div>
              </div>

              {/* Tense Explanation Box (Matching Panel 9 text) */}
              <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-2">
                <span className="text-xs font-black uppercase text-blue-700 tracking-wider">
                  {tenseTab === 'present' && 'Present Tense (वर्तमान काल)'}
                  {tenseTab === 'past' && 'Past Tense (भूतकाल)'}
                  {tenseTab === 'future' && 'Future Tense (भविष्यत काल)'}
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {tenseTab === 'present' && 'जो काम अभी हो रहा है या रोज़ होता है।'}
                  {tenseTab === 'past' && 'जो काम पहले बीत चुका है या हो चुका है।'}
                  {tenseTab === 'future' && 'जो काम आगे आने वाले समय में होगा।'}
                </p>
              </div>

              {/* Examples Box (Matching Panel 9: I eat food, She plays) */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Example (उदाहरण):
                </h3>

                {tenseTab === 'present' && (
                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          I eat food.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (मैं खाना खाता हूँ।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('I eat food')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          She plays.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (वह खेलती है।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('She plays')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {tenseTab === 'past' && (
                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          I ate food.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (मैंने खाना खाया था।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('I ate food')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          She played.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (वह खेली थी।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('She played')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {tenseTab === 'future' && (
                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          I will eat food.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (मैं खाना खाऊँगा।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('I will eat food')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-bold text-slate-900 font-mono">
                          She will play.
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          (वह खेलेगी।)
                        </span>
                      </div>
                      <button
                        onClick={() => speakSlowly('She will play')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Button (Matching Panel 9) */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    playKidChime('star');
                    if (tenseTab === 'present') setTenseTab('past');
                    else if (tenseTab === 'past') setTenseTab('future');
                    else setSelectedTopic(9);
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">
                {GRAMMAR_TOPICS.find((t) => t.num === selectedTopic)?.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                यह नियम अंग्रेज़ी भाषा की संरचना को समझने के लिए अत्यंत आवश्यक है।
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                <p className="font-bold text-slate-800">
                  उदाहरण वाक्य: "A boy runs in the park." (लड़का पार्क में दौड़ता है)
                </p>
              </div>
              <button
                onClick={() => setSelectedTopic(8)}
                className="px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl"
              >
                ← Tenses (काल) पर वापस जाएं
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
