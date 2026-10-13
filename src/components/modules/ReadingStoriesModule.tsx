import React, { useState } from 'react';
import { READING_STORIES } from '../../data/roadmapData';
import { StoryItem } from '../../types';
import { speakText } from '../../utils/speech';
import { Volume2, CheckCircle2, Eye, EyeOff, HelpCircle, BookOpen } from 'lucide-react';

interface ReadingStoriesModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const ReadingStoriesModule: React.FC<ReadingStoriesModuleProps> = ({
  onComplete,
  isCompleted,
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
  const [showAllHindi, setShowAllHindi] = useState<boolean>(true);
  const [revealedSentenceIds, setRevealedSentenceIds] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const currentStory = READING_STORIES[selectedStoryIndex];

  const handleToggleSentenceHindi = (idx: number) => {
    if (revealedSentenceIds.includes(idx)) {
      setRevealedSentenceIds(revealedSentenceIds.filter((i) => i !== idx));
    } else {
      setRevealedSentenceIds([...revealedSentenceIds, idx]);
    }
  };

  const handleAnswerQuestion = (qIdx: number, optIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const handleSelectStory = (idx: number) => {
    setSelectedStoryIndex(idx);
    setQuizAnswers({});
    setShowQuizResults(false);
    setRevealedSentenceIds([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 8 · पठन व बोध
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Reading Practice (कहानियाँ व पैराग्राफ पढ़ना)
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
          छोटे शब्दों और छोटे वाक्यों से शुरू करके आसान कहानियाँ पढ़ें। हर वाक्य का हिंदी अर्थ समझें,
          ऑडियो उच्चारण सुनें और कहानी के बाद दिए गए समझ के सवालों के उत्तर दें।
        </p>
      </div>

      {/* Story Selector Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {READING_STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => handleSelectStory(idx)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                selectedStoryIndex === idx
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              कहानी {idx + 1}: {story.titleEnglish}
            </button>
          ))}
        </div>

        {/* Hindi visibility toggle */}
        <button
          onClick={() => setShowAllHindi(!showAllHindi)}
          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {showAllHindi ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>हिंदी सहायता छुपाएं (Self-Challenge)</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>सभी हिंदी अर्थ दिखाएं</span>
            </>
          )}
        </button>
      </div>

      {/* Story Stage */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-stone-400">
              स्तर: {currentStory.level}
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-0.5">
              {currentStory.titleEnglish}
            </h3>
            <p className="text-sm font-semibold text-amber-900">
              {currentStory.titleHindi}
            </p>
          </div>

          <button
            onClick={() => {
              const fullStory = currentStory.sentences.map((s) => s.en).join(' ');
              speakText(fullStory, 0.85);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>पूरी कहानी सुनें</span>
          </button>
        </div>

        {/* Sentence by sentence passage with individual audio and bilingual help */}
        <div className="space-y-3">
          {currentStory.sentences.map((sentence, idx) => {
            const isHindiVisible = showAllHindi || revealedSentenceIds.includes(idx);

            return (
              <div
                key={idx}
                className="p-4 bg-stone-50 hover:bg-stone-100/70 border border-stone-200/80 rounded-lg transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-base font-semibold text-stone-900 leading-snug">
                    {sentence.en}
                  </div>

                  {isHindiVisible ? (
                    <div className="text-xs text-stone-600 font-medium">
                      {sentence.hi}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleToggleSentenceHindi(idx)}
                      className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                    >
                      + हिंदी अर्थ देखें
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => speakText(sentence.en, 0.85)}
                    className="p-2 bg-white hover:bg-amber-600 hover:text-white text-stone-700 border border-stone-200 rounded-md transition-colors cursor-pointer"
                    title="इस वाक्य को सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comprehension Questions */}
        <div className="pt-6 border-t border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>कहानी समझ की जांच (Comprehension Questions):</span>
          </div>

          <div className="space-y-4">
            {currentStory.questions.map((q, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3 text-xs"
                >
                  <div className="font-bold text-stone-900 text-sm">
                    {qIdx + 1}. {q.question}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isCorrect = optIdx === q.correctIndex;

                      let btnClass = 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100';
                      if (showQuizResults) {
                        if (isCorrect) {
                          btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isChosen) {
                          btnClass = 'bg-rose-100 border-rose-400 text-rose-900';
                        }
                      } else if (isChosen) {
                        btnClass = 'bg-stone-900 text-white border-stone-900';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerQuestion(qIdx, optIdx)}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded border border-stone-200 mt-2">
                      <strong>व्याख्या:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setShowQuizResults(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              उत्तर जांचें (Check Comprehension)
            </button>
            <button
              onClick={() => {
                setQuizAnswers({});
                setShowQuizResults(false);
              }}
              className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              दोबारा हल करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
