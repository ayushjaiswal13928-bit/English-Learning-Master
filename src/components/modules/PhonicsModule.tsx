import React, { useState } from 'react';
import { PHONICS_RULES } from '../../data/roadmapData';
import { PhonicRule } from '../../types';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, Info, Sparkles } from 'lucide-react';

interface PhonicsModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const PhonicsModule: React.FC<PhonicsModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(PHONICS_RULES[0].id);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.8);

  const currentRule = PHONICS_RULES.find((r) => r.id === selectedRuleId) || PHONICS_RULES[0];

  const handleSpeakWord = (word: string) => {
    speakText(word, audioSpeed);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 2 · उच्चारण की नींव
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Phonics Rules (अक्षरों की असली आवाज़ें)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200">
              <span>गति:</span>
              <button
                onClick={() => setAudioSpeed(0.7)}
                className={`px-1.5 py-0.5 rounded ${audioSpeed === 0.7 ? 'bg-amber-600 text-white font-bold' : ''}`}
              >
                0.7x (धीमी)
              </button>
              <button
                onClick={() => setAudioSpeed(0.85)}
                className={`px-1.5 py-0.5 rounded ${audioSpeed === 0.85 ? 'bg-amber-600 text-white font-bold' : ''}`}
              >
                0.85x
              </button>
              <button
                onClick={() => setAudioSpeed(1.0)}
                className={`px-1.5 py-0.5 rounded ${audioSpeed === 1.0 ? 'bg-amber-600 text-white font-bold' : ''}`}
              >
                1.0x
              </button>
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
        </div>

        {/* Warning callout from prompt */}
        <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>विशेष ध्यान दें:</strong> अंग्रेज़ी में हर अक्षर की आवाज़ हर शब्द में एक जैसी नहीं होती।
            इसलिए रटने के बजाय Vowels के नियम (Short vs Long), दो अक्षरों के मेल (Blends) और Silent Letters को नियमपूर्वक समझें।
          </p>
        </div>
      </div>

      {/* Phonics Categories Selector */}
      <div className="flex flex-wrap gap-2">
        {PHONICS_RULES.map((rule) => {
          const isSelected = rule.id === selectedRuleId;
          return (
            <button
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {rule.title.split('(')[0]}
            </button>
          );
        })}
      </div>

      {/* Main Active Phonics Rule Display */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs font-semibold text-amber-700">ध्वनि नियम विश्लेषण</span>
          <h3 className="text-xl font-bold text-stone-900 mt-1">
            {currentRule.title}
          </h3>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            {currentRule.hindiExplanation}
          </p>
          <div className="mt-3 inline-block bg-stone-100 text-stone-800 text-xs font-mono font-medium px-3 py-1.5 rounded-md">
            ध्वनि पैटर्न: {currentRule.soundExample}
          </div>
        </div>

        {/* Example Word Grid with audio buttons */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">
            अभ्यास शब्द (सुनने और दोहराने के लिए क्लिक करें):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRule.examples.map((item) => (
              <div
                key={item.word}
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 hover:border-amber-400 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-stone-900">
                      {item.word}
                    </span>
                    {item.highlight && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5 font-medium">
                    {item.hindiMeaning}
                  </div>
                  <div className="text-[11px] text-stone-700 font-mono mt-1">
                    उच्चारण: {item.pronunciation}
                  </div>
                </div>

                <button
                  onClick={() => handleSpeakWord(item.word)}
                  className="p-2.5 bg-white hover:bg-amber-600 hover:text-white text-stone-700 border border-stone-200 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
                  title="उच्चारण सुनें"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Guide */}
        <div className="bg-stone-900 text-stone-100 rounded-xl p-5 mt-4">
          <h4 className="text-sm font-bold text-amber-400 mb-2">
            गुरुमंत्र (Pro Tip for Hindi Speakers):
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed">
            हिंदी में हम जैसा लिखते हैं वैसा ही पढ़ते हैं, लेकिन अंग्रेज़ी में <strong>Spelling और Sound</strong> में फर्क होता है।
            हमेशा शब्द को अक्षरों के नाम से नहीं (जैसे सी-ए-टी), बल्कि उनकी ध्वनियों से (क-ऐ-ट = कैट) मिलाकर पढ़ना सीखें!
          </p>
        </div>
      </div>
    </div>
  );
};
