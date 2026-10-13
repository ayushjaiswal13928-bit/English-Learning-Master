import React, { useState, useRef } from 'react';
import { LevelData, TestQuestion, WritingDrillItem } from '../types';
import { speakText, computeSimilarity } from '../utils/speech';
import {
  Volume2,
  CheckCircle2,
  Lock,
  Unlock,
  RotateCcw,
  BookOpen,
  Edit3,
  Award,
  HelpCircle,
  Mic,
  MicOff,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';

interface LevelViewProps {
  level: LevelData;
  isUnlocked: boolean;
  isCompleted: boolean;
  score?: number;
  onPassLevel: (levelNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, scorePercent: number) => void;
  onNextLevel: () => void;
  onBackToMap: () => void;
}

export const LevelView: React.FC<LevelViewProps> = ({
  level,
  isUnlocked,
  isCompleted,
  score = 0,
  onPassLevel,
  onNextLevel,
  onBackToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'practice' | 'test'>('lessons');
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85);

  // Practice typing state
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [drillFeedback, setDrillFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
  }>({ status: 'idle', message: '' });

  // Speaking state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [speakingAccuracy, setSpeakingAccuracy] = useState<number | null>(null);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Test state
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);

  const activeDrill = level.writingDrills[drillIndex] || level.writingDrills[0];

  // Typing validation
  const handleVerifyTyping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    const normalizedInput = typedInput.trim().toLowerCase().replace(/[.!?]/g, '');
    const normalizedTarget = activeDrill.targetEnglish.trim().toLowerCase().replace(/[.!?]/g, '');

    if (normalizedInput === normalizedTarget) {
      setDrillFeedback({
        status: 'correct',
        message: `शाबाश! आपने बिल्कुल सही लिखा: "${activeDrill.targetEnglish}" (उच्चारण: ${activeDrill.hindiPronunciation})`,
      });
      speakText(activeDrill.targetEnglish, audioSpeed);
    } else {
      setDrillFeedback({
        status: 'wrong',
        message: `गलती हुई! आपने लिखा: "${typedInput.trim()}"। सही शब्द है: "${activeDrill.targetEnglish}" (${activeDrill.hint})`,
      });
    }
  };

  const handleNextDrill = () => {
    setTypedInput('');
    setDrillFeedback({ status: 'idle', message: '' });
    setDrillIndex((prev) => (prev + 1) % level.writingDrills.length);
  };

  // Speaking lab
  const handleStartSpeaking = () => {
    setMicNotice(null);
    setSpokenTranscript('');
    setSpeakingAccuracy(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicNotice(
        'आपके ब्राउज़र में सीधा स्पीच रिकग्निशन उपलब्ध नहीं है। आप नीचे दिए गए स्पीकर से सही उच्चारण सुनकर बोल सकते हैं।'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenTranscript(transcript);
        const sim = computeSimilarity(transcript, level.speakingDrill.phrase);
        setSpeakingAccuracy(sim);
      };
      recognition.onerror = (event: any) => {
        setIsListening(false);
        setMicNotice('माइक से आवाज़ नहीं पकड़ी गई। कृपया दोबारा बोलें।');
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setMicNotice('माइक प्रारंभ करने में समस्या हुई।');
    }
  };

  const handleStopSpeaking = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Level Test Evaluation
  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (isTestSubmitted) return;
    setTestAnswers({ ...testAnswers, [qIndex]: optionIndex });
  };

  const handleGradeTest = () => {
    if (Object.keys(testAnswers).length < level.levelTest.length) {
      alert('कृपया परीक्षा सबमिट करने से पहले सभी प्रश्नों के उत्तर दें।');
      return;
    }

    let correctCount = 0;
    level.levelTest.forEach((q, idx) => {
      if (testAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / level.levelTest.length) * 100);
    setIsTestSubmitted(true);

    if (percent >= 66) {
      onPassLevel(level.levelNumber, percent);
      speakText('Congratulations! You passed this level.', 0.9);
    }
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setIsTestSubmitted(false);
  };

  const currentScore = isTestSubmitted
    ? Math.round(
        (level.levelTest.filter((q, idx) => testAnswers[idx] === q.correctIndex).length /
          level.levelTest.length) *
          100
      )
    : score;

  if (!isUnlocked) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">
          Level {level.levelNumber} अभी लॉक है
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          इस स्तर को खोलने के लिए पहले <strong>Level {level.levelNumber - 1}</strong> के पाठ पूरे करें
          और उसकी स्तर परीक्षा (Test) में कम से कम 70% अंक प्राप्त करें।
        </p>
        <button
          onClick={onBackToMap}
          className="px-5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
        >
          ← वापस स्तर सूची पर जाएं
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <span className="font-mono">LEVEL {level.levelNumber} OF 8</span>
              <span aria-hidden="true">·</span>
              <span>{level.titleEnglish}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              {level.titleHindi}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              {level.shortDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>उत्तीर्ण ({score || 100}%)</span>
              </div>
            )}
            <button
              onClick={onBackToMap}
              className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              ← सभी 8 स्तर
            </button>
          </div>
        </div>

        {/* Teacher Persona Wisdom (हिंदी में समझाने वाला शिक्षक जैसा अनुभव) */}
        <div className="mt-5 p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <span className="text-base">👨‍🏫</span>
            <span>गुरुजी का मार्गदर्शन (Teacher's Advice):</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
            "{level.teacherNoteHindi}"
          </p>
        </div>
      </div>

      {/* 3 Step Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>1. पाठ व हिंदी उच्चारण</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'practice'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>2. लिखने व बोलने का अभ्यास</span>
        </button>

        <button
          onClick={() => setActiveTab('test')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'test'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>3. स्तर परीक्षा (Test to Unlock)</span>
        </button>
      </div>

      {/* TAB 1: LESSONS & HINDI PRONUNCIATION */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 bg-white p-3 rounded-xl border border-stone-200">
            <span>आवाज़ की गति (Audio Speed):</span>
            <div className="flex items-center gap-1.5">
              {[
                { label: '0.7x (धीमी)', val: 0.7 },
                { label: '0.85x', val: 0.85 },
                { label: '1.0x', val: 1.0 },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setAudioSpeed(s.val)}
                  className={`px-2 py-1 rounded text-xs cursor-pointer ${
                    audioSpeed === s.val
                      ? 'bg-amber-800 text-white font-bold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {level.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4"
            >
              <div className="border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  {lesson.subtitleHindi}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {lesson.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lesson.explanationHindi}
                </p>
              </div>

              {/* Items Grid with clear Hindi pronunciation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lesson.items.map((item) => (
                  <div
                    key={item.english}
                    className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl hover:border-amber-400 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="text-lg font-extrabold text-stone-900">
                        {item.english}
                      </div>

                      {/* Explicit Hindi Pronunciation (हिंदी उच्चारण) */}
                      <div className="text-xs font-bold text-amber-900 bg-amber-100/70 inline-block px-2 py-0.5 rounded">
                        उच्चारण: {item.hindiPronunciation}
                      </div>

                      <div className="text-xs text-stone-600 font-medium pt-0.5">
                        अर्थ: {item.hindiMeaning}
                      </div>

                      {item.phoneticBreakdown && (
                        <div className="text-[11px] text-stone-400 font-mono">
                          {item.phoneticBreakdown}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => speakText(item.english, audioSpeed)}
                      className="p-2 bg-white hover:bg-amber-600 hover:text-white text-stone-700 border border-stone-200 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('practice')}
              className="px-6 py-3 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>अगला कदम: लिखने व बोलने का अभ्यास करें →</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: WRITING & SPEAKING LAB */}
      {activeTab === 'practice' && (
        <div className="space-y-8">
          {/* Section A: Writing & Typing Practice */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800">
                  अभ्यास {drillIndex + 1} / {level.writingDrills.length}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  लिखने का अभ्यास (कीबोर्ड से टाइप करें)
                </h3>
              </div>
              <button
                onClick={handleNextDrill}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                अगला सवाल →
              </button>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-center">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                हिंदी संकेत:
              </span>
              <div className="text-xl font-black text-stone-900">
                "{activeDrill.promptHindi}"
              </div>
              <div className="text-xs text-amber-900 font-bold">
                (हिंदी उच्चारण: {activeDrill.hindiPronunciation})
              </div>
            </div>

            <form onSubmit={handleVerifyTyping} className="space-y-3">
              <label className="block text-xs font-bold text-stone-700">
                अंग्रेज़ी शब्द या वाक्य टाइप करें:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder={`यहाँ टाइप करें (संकेत: ${activeDrill.hint})...`}
                  className="flex-1 px-4 py-2.5 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  जांचें
                </button>
              </div>
            </form>

            {drillFeedback.status !== 'idle' && (
              <div
                className={`p-4 rounded-xl text-xs font-medium ${
                  drillFeedback.status === 'correct'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                {drillFeedback.message}
              </div>
            )}
          </div>

          {/* Section B: Speaking & Mic Practice with accuracy guidance */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-mono font-bold text-amber-800">
                मौखिक अभिव्यक्ति (Speaking)
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                बोलने का अभ्यास व आवाज़ मिलान
              </h3>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                  यह वाक्य बोलें:
                </span>
                <button
                  onClick={() => speakText(level.speakingDrill.phrase, audioSpeed)}
                  className="px-3 py-1 bg-white hover:bg-amber-600 hover:text-white text-stone-800 border border-stone-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>सही आवाज़ सुनें</span>
                </button>
              </div>

              <div className="text-xl font-extrabold text-stone-900">
                "{level.speakingDrill.phrase}"
              </div>
              <div className="text-xs text-amber-900 font-bold">
                हिंदी उच्चारण: {level.speakingDrill.hindiPronunciation}
              </div>
              <div className="text-xs text-stone-500">
                हिंदी अर्थ: {level.speakingDrill.hindiMeaning}
              </div>
            </div>

            {/* Speaking disclaimer */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-start gap-2.5 text-xs text-stone-600">
              <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <span>
                <strong>महत्वपूर्ण सूचना:</strong> माइक्रोफ़ोन से मिलने वाले प्रतिशत (Score) को एक सहायक अनुमान (Estimate) मानें। विभिन्न फोन या माइक में आवाज़ का फर्क हो सकता है। इसे परीक्षा का अंतिम निर्णय न मानें; मुख्य लक्ष्य बिना झिझक आवाज़ निकालना है!
              </span>
            </div>

            {/* Mic Button & Live Feedback */}
            <div className="p-6 bg-stone-900 text-stone-100 rounded-2xl text-center space-y-4">
              <div className="flex justify-center">
                {isListening ? (
                  <button
                    onClick={handleStopSpeaking}
                    className="w-16 h-16 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-lg animate-pulse cursor-pointer"
                  >
                    <MicOff className="w-5 h-5" />
                    <span className="text-[10px] font-bold">रोकें</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartSpeaking}
                    className="w-16 h-16 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-lg font-bold cursor-pointer"
                  >
                    <Mic className="w-6 h-6" />
                    <span className="text-[10px]">माइक चालू</span>
                  </button>
                )}
              </div>

              {isListening && (
                <div className="text-xs text-amber-300 font-medium">
                  माइक सुन रहा है... वाक्य स्पष्ट बोलें
                </div>
              )}

              {micNotice && (
                <div className="text-xs text-rose-300 max-w-md mx-auto">
                  {micNotice}
                </div>
              )}

              {spokenTranscript && (
                <div className="bg-stone-800 border border-stone-700 rounded-xl p-4 text-left space-y-2 mt-2">
                  <div className="text-xs text-stone-400">माइक ने क्या सुना:</div>
                  <div className="text-sm font-semibold text-white">
                    "{spokenTranscript}"
                  </div>

                  {speakingAccuracy !== null && (
                    <div className="pt-2 border-t border-stone-700 flex items-center justify-between text-xs">
                      <span className="text-stone-300">
                        अनुमानित उच्चारण सटीकता (Estimate):
                      </span>
                      <span className="font-mono font-bold text-amber-400 text-base">
                        {speakingAccuracy}%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setActiveTab('test')}
                className="px-6 py-3 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>3. अब स्तर परीक्षा (Test) दें और अगला लेवल खोलें →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LEVEL TEST (TEST TO UNLOCK NEXT LEVEL) */}
      {activeTab === 'test' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-800">
                स्तर परीक्षा · पास होने के लिए 70% आवश्यक
              </span>
              <h3 className="text-2xl font-black text-stone-900 mt-0.5">
                Level {level.levelNumber} ज्ञान परीक्षा
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                सभी प्रश्नों को ध्यान से पढ़ें। गलती होने पर विस्तृत हिंदी व्याख्या दी जाएगी।
              </p>
            </div>

            {isTestSubmitted && (
              <div className="text-right">
                <span className="text-xs text-stone-400 block">आपका प्राप्तांक</span>
                <span
                  className={`text-2xl font-black font-mono ${
                    currentScore >= 66 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {currentScore}%
                </span>
              </div>
            )}
          </div>

          {/* Questions list */}
          <div className="space-y-6">
            {level.levelTest.map((q, qIdx) => {
              const selectedOpt = testAnswers[qIdx];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3"
                >
                  <div className="text-sm font-bold text-stone-900">
                    {qIdx + 1}. {q.questionHindi}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let btnStyle = 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100';

                      if (isTestSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-stone-900 text-white border-stone-900';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`p-3 text-xs rounded-lg border text-left transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hindi Explanation: "केवल गलत न बताएं; सही उत्तर और हिंदी में कारण भी समझाएं" */}
                  {isTestSubmitted && (
                    <div
                      className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                          : 'bg-rose-50 text-rose-950 border border-rose-200'
                      }`}
                    >
                      <span className="font-bold block mb-0.5">
                        {isCorrect ? '✓ सही उत्तर!' : '✕ गलती का कारण समझें:'}
                      </span>
                      {q.explanationHindi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Test Submit / Results Deck */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            {!isTestSubmitted ? (
              <button
                onClick={handleGradeTest}
                className="px-6 py-3 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                परीक्षा सबमिट करें (Submit Test)
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                <div>
                  {currentScore >= 66 ? (
                    <div className="text-emerald-800 font-bold text-sm">
                      🎉 शाबाश! आपने यह स्तर उत्तीर्ण कर लिया है और अगला स्तर खुल चुका है!
                    </div>
                  ) : (
                    <div className="text-rose-700 font-bold text-xs">
                      कोई बात नहीं! कृपया पाठ दोबारा पढ़कर टेस्ट फिर से दें (70% आवश्यक)।
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetTest}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                  >
                    दोबारा टेस्ट दें ↺
                  </button>

                  {level.levelNumber < 8 && currentScore >= 66 && (
                    <button
                      onClick={onNextLevel}
                      className="px-5 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>अगला Level {level.levelNumber + 1} शुरू करें</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
