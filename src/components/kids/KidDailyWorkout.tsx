import React, { useState, useEffect } from 'react';
import { playKidChime } from '../../utils/kidAudio';
import { X, Play, Pause, RotateCcw, CheckCircle2, Clock, Star, ArrowRight } from 'lucide-react';

interface KidDailyWorkoutProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStage: (stageNum: number) => void;
  onCompleteWorkout: () => void;
}

interface KidSlot {
  id: string;
  stageNum: number;
  title: string;
  durationMinutes: number;
  emoji: string;
  kidHint: string;
}

const KID_SLOTS: KidSlot[] = [
  {
    id: 'k1',
    stageNum: 1,
    title: '1. अक्षरों और जानवरों की आवाज़ें 🐱',
    durationMinutes: 3,
    emoji: '🍎',
    kidHint: 'सेब (Apple), बिल्ली (Cat) की आवाज़ें सुनो',
  },
  {
    id: 'k2',
    stageNum: 2,
    title: '2. अक्षर जोड़ो और शब्द बनाओ 🧩',
    durationMinutes: 3,
    emoji: '🏏',
    kidHint: 'B + A + T = BAT (बैट) की पहेली खेलो',
  },
  {
    id: 'k3',
    stageNum: 5,
    title: '3. वाक्य की रेलगाड़ी चलाओ 🚂',
    durationMinutes: 3,
    emoji: '🚂',
    kidHint: 'इंजन और डिब्बे जोड़कर वाक्य बनाओ',
  },
  {
    id: 'k4',
    stageNum: 6,
    title: '4. प्यारी कहानी सुनो या बोलो 📖',
    durationMinutes: 2,
    emoji: '🦁',
    kidHint: 'शेर और नन्हे चूहे की कहानी का मज़ा लो',
  },
];

export const KidDailyWorkout: React.FC<KidDailyWorkoutProps> = ({
  isOpen,
  onClose,
  onJumpToStage,
  onCompleteWorkout,
}) => {
  const [currentSlotIdx, setCurrentSlotIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [doneSlotIds, setDoneSlotIds] = useState<string[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      playKidChime('star');
      const slot = KID_SLOTS[currentSlotIdx];
      if (!doneSlotIds.includes(slot.id)) {
        setDoneSlotIds([...doneSlotIds, slot.id]);
      }
      if (currentSlotIdx < KID_SLOTS.length - 1) {
        const nextIdx = currentSlotIdx + 1;
        setCurrentSlotIdx(nextIdx);
        setSecondsRemaining(KID_SLOTS[nextIdx].durationMinutes * 60);
      } else {
        playKidChime('cheer');
        onCompleteWorkout();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining, currentSlotIdx, doneSlotIds, onCompleteWorkout]);

  if (!isOpen) return null;

  const currentSlot = KID_SLOTS[currentSlotIdx];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-amber-300 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌟</span>
            <div>
              <span className="text-xs font-black text-amber-800 uppercase">
                10-मिनट का दैनिक जादुई खेल
              </span>
              <h3 className="text-lg font-black text-stone-900">
                Daily Kids English Play
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stopwatch Card */}
        <div className="p-6 bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 text-center space-y-3">
          <div className="text-xs font-black text-amber-950 uppercase tracking-wide">
            {currentSlot.emoji} खेल {currentSlotIdx + 1} / {KID_SLOTS.length}: {currentSlot.title}
          </div>

          <div className="text-5xl font-mono font-black tracking-wider text-white drop-shadow-xs">
            {formattedTime}
          </div>

          <p className="text-xs font-bold text-amber-950">
            {currentSlot.kidHint}
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                playKidChime('click');
                setIsRunning(!isRunning);
              }}
              className="px-5 py-2.5 bg-stone-950 hover:bg-stone-900 text-amber-300 font-black text-xs rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>रोकें</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>टाइमर शुरू करें! ✨</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(currentSlot.durationMinutes * 60);
              }}
              className="px-3 py-2 text-xs font-bold text-amber-950 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onJumpToStage(currentSlot.stageNum);
                onClose();
              }}
              className="px-4 py-2 bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1"
            >
              <span>पड़ाव पर जाओ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Little Steps */}
        <div className="p-6 space-y-2">
          <div className="text-xs font-black text-stone-500 uppercase tracking-wide">
            आज के 4 छोटे पड़ाव:
          </div>
          {KID_SLOTS.map((slot, idx) => {
            const isDone = doneSlotIds.includes(slot.id);
            const isCurrent = idx === currentSlotIdx;

            return (
              <div
                key={slot.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-400 font-bold'
                    : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{slot.emoji}</span>
                  <div>
                    <span className="font-black text-stone-900">{slot.title}</span>
                    <span className="text-[11px] text-stone-500 block">
                      {slot.kidHint}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-400 font-bold">
                    {slot.durationMinutes} min
                  </span>
                  <button
                    onClick={() => {
                      setCurrentSlotIdx(idx);
                      setSecondsRemaining(slot.durationMinutes * 60);
                      setIsRunning(false);
                    }}
                    className="px-2.5 py-1 text-[11px] font-black bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    चुनें
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 rounded-b-3xl flex items-center justify-between">
          <span className="text-xs font-bold text-stone-600">
            {doneSlotIds.length} / 4 खेल पूरे हुए!
          </span>
          <button
            onClick={() => {
              playKidChime('cheer');
              onCompleteWorkout();
              onClose();
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
          >
            खेल पूरा हुआ चिह्नित करें ⭐
          </button>
        </div>
      </div>
    </div>
  );
};
