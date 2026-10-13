import React from 'react';
import { LEVELS_DATA } from '../data/levelsData';
import { LevelNumber } from '../types';
import {
  Lock,
  Unlock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Wifi,
  Award,
  BookOpen,
} from 'lucide-react';

interface LevelsHubProps {
  unlockedLevel: LevelNumber;
  completedLevels: LevelNumber[];
  levelScores: Record<LevelNumber, number>;
  onSelectLevel: (levelNum: LevelNumber) => void;
  onOpenWorkout: () => void;
  onOpenMistakeFixer: () => void;
  teacherMode: boolean;
  onToggleTeacherMode: () => void;
}

export const LevelsHub: React.FC<LevelsHubProps> = ({
  unlockedLevel,
  completedLevels,
  levelScores,
  onSelectLevel,
  onOpenWorkout,
  onOpenMistakeFixer,
  teacherMode,
  onToggleTeacherMode,
}) => {
  const totalCompleted = completedLevels.length;
  const progressPercent = Math.round((totalCompleted / 8) * 100);

  return (
    <div className="space-y-8">
      {/* Overview Progress & Mode Switcher */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>व्यवस्थित 8-स्तरीय पाठ्यक्रम (8 Structured Levels)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              शुरुआत से आत्मविश्वास तक का सफ़र
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              अक्षर से शुरू करके आसान शब्द, स्पेलिंग, रोज़मर्रा के वाक्य, व्याकरण और बोलने का अभ्यास।
              प्रत्येक स्तर पूरा करने और टेस्ट पास करने पर अगला स्तर खुलता है।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-xs text-stone-400 block">कुल प्रगति:</span>
              <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                {totalCompleted}/8 स्तर ({progressPercent}%)
              </span>
            </div>

            <button
              onClick={onToggleTeacherMode}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                teacherMode
                  ? 'bg-amber-400 text-stone-950 border-amber-400'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
              }`}
              title="परीक्षण या समीक्षा के लिए सभी स्तर अनलॉक करें"
            >
              {teacherMode ? '✓ अध्यापक मोड (सभी खुले)' : 'अध्यापक मोड: सभी स्तर खोलें'}
            </button>
          </div>
        </div>

        {/* Offline & Teacher Promise Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 pt-1">
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>ऑफ़लाइन तैयार: पाठ और आपकी प्रगति आपके ब्राउज़र में सुरक्षित सेव हैं</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenWorkout}
              className="text-amber-400 hover:underline cursor-pointer font-medium"
            >
              ⏱️ 25-मिनट दैनिक अभ्यास
            </button>
            <button
              onClick={onOpenMistakeFixer}
              className="text-stone-300 hover:text-white cursor-pointer"
            >
              📝 गलती सुधार डायरी
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 8 Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {LEVELS_DATA.map((item) => {
          const isUnlocked = teacherMode || item.levelNumber <= unlockedLevel;
          const isCompleted = completedLevels.includes(item.levelNumber);
          const score = levelScores[item.levelNumber] || 0;

          return (
            <div
              key={item.levelNumber}
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group ${
                isUnlocked
                  ? 'border-stone-200 hover:border-amber-500 hover:shadow-sm'
                  : 'border-stone-200/60 bg-stone-50/60 opacity-80'
              }`}
            >
              <div>
                {/* Level Tag & Status */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-stone-500">
                    LEVEL {item.levelNumber}
                  </span>

                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>उत्तीर्ण ({score}%)</span>
                    </div>
                  ) : isUnlocked ? (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Unlock className="w-3.5 h-3.5 text-amber-700" />
                      <span>खुला है</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                      <Lock className="w-3.5 h-3.5" />
                      <span>लॉक है</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.titleHindi}
                </h3>
                <p className="text-xs font-semibold text-stone-500 mt-0.5">
                  {item.titleEnglish}
                </p>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {item.lessons.length} पाठ + टेस्ट
                </span>

                <button
                  onClick={() => onSelectLevel(item.levelNumber)}
                  disabled={!isUnlocked}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isUnlocked
                      ? 'bg-stone-900 text-white hover:bg-amber-800 shadow-xs'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <span>{isCompleted ? 'दोहराएं' : 'शुरू करें'}</span>
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
