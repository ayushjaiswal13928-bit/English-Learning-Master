import React from 'react';
import { KidStageData } from '../../data/kidsCurriculum';
import { playKidChime } from '../../utils/kidAudio';
import { Lock, Unlock, Star, Sparkles, ArrowRight } from 'lucide-react';

interface KidJourneyMapProps {
  stages: KidStageData[];
  unlockedStage: number;
  completedStages: number[];
  onSelectStage: (num: number) => void;
  onOpenTrainGame: () => void;
  onOpenQuickPlay: () => void;
  parentMode: boolean;
  onToggleParentMode: () => void;
}

export const KidJourneyMap: React.FC<KidJourneyMapProps> = ({
  stages,
  unlockedStage,
  completedStages,
  onSelectStage,
  onOpenTrainGame,
  onOpenQuickPlay,
  parentMode,
  onToggleParentMode,
}) => {
  const totalStars = completedStages.length * 3;

  return (
    <div className="space-y-8">
      {/* Cheerful Adventure Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-stone-950 rounded-3xl p-6 sm:p-8 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black text-stone-950">
            <Sparkles className="w-3.5 h-3.5" />
            <span>बच्चों का जादुई अंग्रेज़ी सफ़र (Kids English Adventure)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
            खेल-खेल में अंग्रेज़ी सीखें!
          </h2>
          <p className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
            हर पड़ाव पर प्यारे जानवर दोस्त, आवाज़ें, अक्षर जोड़ने का खेल और सुंदर कहानियाँ आपका इंतज़ार कर रही हैं!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="bg-white/95 px-5 py-3 rounded-2xl border-2 border-white shadow-xs text-center">
            <span className="text-[10px] font-black text-stone-500 uppercase block">
              कुल सितारे
            </span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-amber-600">
              <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
              <span>{totalStars}</span>
            </div>
          </div>

          <button
            onClick={() => {
              playKidChime('click');
              onToggleParentMode();
            }}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
              parentMode
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white/80 text-stone-800 border-white hover:bg-white'
            }`}
            title="माता-पिता और शिक्षकों के लिए सभी पड़ाव खोलने की सुविधा"
          >
            {parentMode ? '✓ शिक्षक मोड (सभी खुले)' : 'शिक्षक मोड: सब खोलो'}
          </button>
        </div>
      </div>

      {/* Quick Action Cards (Sentence Train & Daily 10-Min Play) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => {
            playKidChime('star');
            onOpenTrainGame();
          }}
          className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 rounded-3xl text-left transition-all hover:shadow-xs cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-2xl">🚂</span>
            <h4 className="text-base font-black text-stone-900 group-hover:text-blue-800 transition-colors">
              वाक्य की रेलगाड़ी (Sentence Train)
            </h4>
            <p className="text-xs text-stone-600">
              इंजन और डिब्बे जोड़कर खुद का वाक्य बनाओ!
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            playKidChime('star');
            onOpenQuickPlay();
          }}
          className="p-5 bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-amber-200 hover:border-amber-400 rounded-3xl text-left transition-all hover:shadow-xs cursor-pointer flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-2xl">⏱️</span>
            <h4 className="text-base font-black text-stone-900 group-hover:text-amber-800 transition-colors">
              10-मिनट का दैनिक जादुई खेल
            </h4>
            <p className="text-xs text-stone-600">
              रोज़ाना 10 मिनट में आवाज़, खेल और बोलचाल!
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Stepping Stones Adventure Grid */}
      <div className="space-y-3">
        <div className="text-xs font-black text-stone-500 uppercase tracking-wider px-1">
          6 जादुई पड़ाव (6 Adventure Stages):
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stages.map((stage) => {
            const isUnlocked = parentMode || stage.stageNumber <= unlockedStage;
            const isCompleted = completedStages.includes(stage.stageNumber);

            return (
              <div
                key={stage.stageNumber}
                className={`border-2 rounded-3xl p-6 shadow-xs transition-all flex flex-col justify-between group ${
                  isUnlocked
                    ? `${stage.colorScheme.bg} ${stage.colorScheme.border} hover:shadow-sm hover:scale-[1.01]`
                    : 'bg-stone-50 border-stone-200 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-black text-stone-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-black/5">
                      {stage.badge}
                    </span>

                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-[11px] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>जीत गए!</span>
                      </div>
                    ) : isUnlocked ? (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Unlock className="w-3 h-3 text-emerald-700" />
                        <span>खुला है</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>लॉक है</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-stone-900 group-hover:text-amber-800 transition-colors">
                    {stage.titleHindi}
                  </h3>
                  <p className="text-xs font-bold text-stone-500 mt-0.5">
                    {stage.titleEnglish}
                  </p>

                  <p className="text-xs text-stone-700 mt-2.5 font-medium leading-relaxed">
                    ✨ {stage.kidTagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500">
                    {stage.words.length} शब्द + खेल
                  </span>

                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        playKidChime('star');
                        onSelectStage(stage.stageNumber);
                      }
                    }}
                    disabled={!isUnlocked}
                    className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                      isUnlocked
                        ? 'bg-stone-900 hover:bg-amber-600 text-white active:scale-95'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{isCompleted ? 'फिर से खेलो' : 'चलो खेलें!'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
