import React, { useState } from 'react';
import { MistakeRecord } from '../../types';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, AlertOctagon, Plus, RotateCw, HelpCircle } from 'lucide-react';

interface MistakeCorrectionModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
  mistakes: MistakeRecord[];
  onToggleReviewed: (id: string) => void;
  onAddCustomMistake: (mistake: MistakeRecord) => void;
}

export const MistakeCorrectionModule: React.FC<MistakeCorrectionModuleProps> = ({
  onComplete,
  isCompleted,
  mistakes,
  onToggleReviewed,
  onAddCustomMistake,
}) => {
  const [selectedMistakeId, setSelectedMistakeId] = useState<string>(
    mistakes[0]?.id || ''
  );
  const [userFollowUpAnswers, setUserFollowUpAnswers] = useState<Record<number, number>>({});
  const [showFollowUpResults, setShowFollowUpResults] = useState<boolean>(false);

  // New mistake input state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTyped, setNewTyped] = useState<string>('');
  const [newCorrect, setNewCorrect] = useState<string>('');
  const [newReason, setNewReason] = useState<string>('');
  const [newExample, setNewExample] = useState<string>('');

  const activeMistake =
    mistakes.find((m) => m.id === selectedMistakeId) || mistakes[0];

  const handleSelectMistake = (id: string) => {
    setSelectedMistakeId(id);
    setUserFollowUpAnswers({});
    setShowFollowUpResults(false);
  };

  const handleSelectFollowUp = (qIdx: number, optIdx: number) => {
    setUserFollowUpAnswers({ ...userFollowUpAnswers, [qIdx]: optIdx });
  };

  const handleSaveCustomMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTyped.trim() || !newCorrect.trim()) return;

    const record: MistakeRecord = {
      id: `custom-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userTyped: newTyped.trim(),
      correctAnswer: newCorrect.trim(),
      ruleCategory: 'Custom Learner Note',
      reasonHindi: newReason.trim() || 'व्यक्तिगत अध्ययन नोटबुक से',
      easyExample: newExample.trim() || `Correct: ${newCorrect}`,
      followUpQuestions: [
        {
          question: `सही रूप क्या है: "${newCorrect}" या "${newTyped}"?`,
          options: [newTyped, newCorrect],
          correctIndex: 1,
        },
      ],
      reviewed: false,
    };

    onAddCustomMistake(record);
    setSelectedMistakeId(record.id);
    setShowAddModal(false);
    setNewTyped('');
    setNewCorrect('');
    setNewReason('');
    setNewExample('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 14 · गलती सुधार प्रणाली
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Mistake Correction System (6-चरणीय सुधार प्रणाली)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>अपनी गलती जोड़ें</span>
            </button>
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

        {/* 6-step framework formula */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 mt-6 text-xs text-stone-700">
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-rose-700 block">1. क्या लिखा</span>
            <span className="text-[10px] text-stone-500">आपकी गलती</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-emerald-700 block">2. सही उत्तर</span>
            <span className="text-[10px] text-stone-500">शुद्ध अंग्रेज़ी</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-amber-800 block">3. कारण हिंदी में</span>
            <span className="text-[10px] text-stone-500">नियम समझ</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-stone-900 block">4. आसान उदाहरण</span>
            <span className="text-[10px] text-stone-500">संदर्भ वाक्य</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-blue-700 block">5. 2–3 नए सवाल</span>
            <span className="text-[10px] text-stone-500">तुरंत अभ्यास</span>
          </div>
          <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg text-center">
            <span className="font-bold text-purple-700 block">6. दोबारा टेस्ट</span>
            <span className="text-[10px] text-stone-500">स्थायी याददाश्त</span>
          </div>
        </div>
      </div>

      {/* Main 2-Zone Stage */}
      {activeMistake ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Mistake List */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-2">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wide px-2 py-1">
              गलती सुधार डायरी ({mistakes.length} प्रविष्टियां):
            </div>

            {mistakes.map((m) => {
              const isSelected = m.id === selectedMistakeId;

              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMistake(m.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span className="line-through text-rose-400 font-mono">
                        {m.userTyped}
                      </span>
                      <span className="text-stone-400">→</span>
                      <span className={isSelected ? 'text-amber-400 font-bold' : 'text-emerald-700 font-bold'}>
                        {m.correctAnswer}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 truncate">
                      {m.ruleCategory}
                    </div>
                  </div>

                  {m.reviewed && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      Reviewed
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: 6-Step Breakdown Canvas for the Selected Mistake */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  {activeMistake.ruleCategory}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  विस्तृत गलती विश्लेषण व सुधार
                </h3>
              </div>

              <button
                onClick={() => onToggleReviewed(activeMistake.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  activeMistake.reviewed
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {activeMistake.reviewed ? '✓ दोहराया गया (Reviewed)' : 'दोहराया गया चिह्नित करें'}
              </button>
            </div>

            {/* 1. What was written vs 2. Correct answer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                  1. आपने क्या लिखा (Your Mistake):
                </span>
                <div className="text-lg font-bold text-rose-900 font-mono">
                  {activeMistake.userTyped}
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    2. सही उत्तर (Correct Answer):
                  </span>
                  <button
                    onClick={() => speakText(activeMistake.correctAnswer, 0.85)}
                    className="text-emerald-700 hover:text-emerald-900 p-0.5 cursor-pointer"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-lg font-bold text-emerald-950 font-mono">
                  {activeMistake.correctAnswer}
                </div>
              </div>
            </div>

            {/* 3. Reason explained in Hindi */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                3. गलती का कारण हिंदी में (Why it was wrong):
              </span>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {activeMistake.reasonHindi}
              </p>
            </div>

            {/* 4. Easy example */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                4. आसान उदाहरण (Clear Example):
              </span>
              <div className="text-sm font-bold text-stone-900">
                {activeMistake.easyExample}
              </div>
            </div>

            {/* 5. Follow-up Questions Drill */}
            <div className="pt-4 border-t border-stone-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>5. उसी नियम के नए अभ्यास सवाल (Follow-up Drills):</span>
                </span>
              </div>

              <div className="space-y-4">
                {activeMistake.followUpQuestions.map((q, qIdx) => {
                  const chosen = userFollowUpAnswers[qIdx];
                  return (
                    <div
                      key={qIdx}
                      className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-xs"
                    >
                      <div className="font-bold text-stone-900">
                        {qIdx + 1}. {q.question}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosen === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let btnStyle = 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100';
                          if (showFollowUpResults) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-stone-900 text-white border-stone-900';
                          }

                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelectFollowUp(qIdx, optIdx)}
                              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFollowUpResults(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  उत्तर जांचें (Verify Follow-ups)
                </button>
                <button
                  onClick={() => {
                    setUserFollowUpAnswers({});
                    setShowFollowUpResults(false);
                  }}
                  className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  दोबारा हल करें
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white border border-stone-200 rounded-xl text-stone-500 text-sm">
          कोई गलती दर्ज नहीं है। आप ऊपर "अपनी गलती जोड़ें" बटन से नई प्रविष्टि जोड़ सकते हैं।
        </div>
      )}

      {/* Add Custom Mistake Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              नई गलती दर्ज करें (Add Custom Mistake)
            </h3>
            <p className="text-xs text-stone-500">
              अपनी पढ़ाई या लेखन के दौरान हुई गलती को दर्ज करें ताकि उसका 6-चरणीय सुधार हो सके:
            </p>

            <form onSubmit={handleSaveCustomMistake} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  आपने क्या लिखा (गलत रूप):
                </label>
                <input
                  type="text"
                  required
                  value={newTyped}
                  onChange={(e) => setNewTyped(e.target.value)}
                  placeholder="e.g. He go yesterday"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  सही उत्तर (Correct English):
                </label>
                <input
                  type="text"
                  required
                  value={newCorrect}
                  onChange={(e) => setNewCorrect(e.target.value)}
                  placeholder="e.g. He went yesterday"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  गलती का कारण हिंदी में:
                </label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Yesterday के साथ Verb 2nd form आती है"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  आसान उदाहरण:
                </label>
                <input
                  type="text"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g. I went to school."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
                >
                  सहेजें (Save Mistake)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
