import React, { useState, useEffect } from 'react';
import { ModuleId } from '../../types';
import { playKidChime } from '../../utils/kidAudio';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface DailyWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToModule: (moduleId: ModuleId) => void;
  onCompleteWorkout: () => void;
}

interface WorkoutSlot {
  id: string;
  moduleId: ModuleId;
  title: string;
  durationMinutes: number;
  hindiDescription: string;
}

const WORKOUT_SLOTS: WorkoutSlot[] = [
  {
    id: 'slot-1',
    moduleId: 'phonics',
    title: '1. Alphabet और Phonics (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: 'स्वर, व्यंजन, संयुक्त आवाज़ें (Sh, Ch) और Silent Letters दोहराएँ',
  },
  {
    id: 'slot-2',
    moduleId: 'reading',
    title: '2. Reading - शब्द व वाक्य पढ़ना (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: '2-5 अक्षरों के शब्द, Blending ध्वनि और -at, -an पैटर्न बोलकर पढ़ें',
  },
  {
    id: 'slot-3',
    moduleId: 'spelling',
    title: '3. Spelling और Writing - डिक्टेशन (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: 'सुनकर शब्द लिखें, Missing letters भरें और गलत स्पेलिंग सुधारें',
  },
  {
    id: 'slot-4',
    moduleId: 'sentence',
    title: '4. Grammar और Sentence Formation (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: 'Subject + Verb + Object का सही क्रम और 15 व्याकरण नियमों का अभ्यास',
  },
  {
    id: 'slot-5',
    moduleId: 'speaking',
    title: '5. Listening और Speaking (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: 'माइक पर वाक्य बोलें, आवाज़ रिकॉर्ड करके सुनें और आत्मविश्वास बढ़ाएं',
  },
  {
    id: 'slot-6',
    moduleId: 'mistakes',
    title: '6. पुरानी गलतियों की दोहराई (5 मिनट)',
    durationMinutes: 5,
    hindiDescription: 'अपनी Mistake Diary की पुरानी गलतियों का 6-चरणीय दोबारा टेस्ट दें',
  },
];

export const DailyWorkoutModal: React.FC<DailyWorkoutModalProps> = ({
  isOpen,
  onClose,
  onJumpToModule,
  onCompleteWorkout,
}) => {
  const [currentSlotIdx, setCurrentSlotIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSlotIds, setCompletedSlotIds] = useState<string[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      playKidChime('star');
      const slot = WORKOUT_SLOTS[currentSlotIdx];
      if (!completedSlotIds.includes(slot.id)) {
        setCompletedSlotIds([...completedSlotIds, slot.id]);
      }
      if (currentSlotIdx < WORKOUT_SLOTS.length - 1) {
        const nextIdx = currentSlotIdx + 1;
        setCurrentSlotIdx(nextIdx);
        setSecondsRemaining(5 * 60);
      } else {
        playKidChime('cheer');
        onCompleteWorkout();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, currentSlotIdx, completedSlotIds, onCompleteWorkout]);

  if (!isOpen) return null;

  const currentSlot = WORKOUT_SLOTS[currentSlotIdx];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-stone-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-amber-800 uppercase">
              13. Daily Practice और Revision (20–30 मिनट का रूटीन)
            </span>
            <h2 className="text-xl font-black text-stone-900 mt-0.5">
              रोज़ाना 5-5 मिनट के 6 अभ्यास स्लॉट्स
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stopwatch Deck */}
        <div className="p-6 bg-stone-900 text-stone-100 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400">
            <Clock className="w-4 h-4" />
            <span>
              अभ्यास {currentSlotIdx + 1} / {WORKOUT_SLOTS.length}: {currentSlot.title}
            </span>
          </div>

          <div className="text-5xl font-mono font-black tracking-wider text-white tabular-nums drop-shadow-xs">
            {formattedTime}
          </div>

          <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
            {currentSlot.hindiDescription}
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                playKidChime('click');
                setIsRunning(!isRunning);
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>रोकें (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>टाइमर शुरू करें!</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(5 * 60);
              }}
              className="px-3 py-2 text-xs font-bold text-stone-400 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentSlotIdx < WORKOUT_SLOTS.length - 1) {
                  setCurrentSlotIdx(currentSlotIdx + 1);
                  setSecondsRemaining(5 * 60);
                  setIsRunning(false);
                }
              }}
              className="px-3 py-2 text-xs font-bold text-stone-400 hover:text-white cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onJumpToModule(currentSlot.moduleId);
                onClose();
              }}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs rounded-xl border border-stone-700 transition-all cursor-pointer inline-flex items-center gap-1.5 ml-2"
            >
              <span>सीधा मॉड्यूल खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 practice slots checklist */}
        <div className="p-6 space-y-3">
          <div className="text-xs font-black text-stone-500 uppercase tracking-wide">
            6 अभ्यास स्लॉट्स चेकलिस्ट:
          </div>

          <div className="space-y-2">
            {WORKOUT_SLOTS.map((slot, idx) => {
              const isDone = completedSlotIds.includes(slot.id);
              const isCurrent = idx === currentSlotIdx;

              return (
                <div
                  key={slot.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    isCurrent
                      ? 'bg-amber-50 border-amber-400 font-bold text-stone-900'
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        if (completedSlotIds.includes(slot.id)) {
                          setCompletedSlotIds(completedSlotIds.filter((id) => id !== slot.id));
                        } else {
                          setCompletedSlotIds([...completedSlotIds, slot.id]);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isDone ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'
                        }`}
                      />
                    </button>
                    <div>
                      <span className="font-bold">{slot.title}</span>
                      <span className="text-[11px] text-stone-500 block">
                        {slot.hindiDescription}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400 font-bold">5 min</span>
                    <button
                      onClick={() => {
                        setCurrentSlotIdx(idx);
                        setSecondsRemaining(5 * 60);
                        setIsRunning(false);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                    >
                      चुनें
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 rounded-b-3xl flex items-center justify-between">
          <span className="text-xs font-bold text-stone-600">
            {completedSlotIds.length} / {WORKOUT_SLOTS.length} स्लॉट पूरे हुए!
          </span>
          <button
            onClick={() => {
              playKidChime('cheer');
              onCompleteWorkout();
              onClose();
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            आज का 30-मिनट अभ्यास पूर्ण चिह्नित करें ⭐
          </button>
        </div>
      </div>
    </div>
  );
};
