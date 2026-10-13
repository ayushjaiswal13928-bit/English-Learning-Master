import React, { useState, useRef } from 'react';
import { KidStageData } from '../../data/kidsCurriculum';
import { speakText, computeSimilarity } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { SentenceTrainGame } from './SentenceTrainGame';
import {
  Volume2,
  CheckCircle2,
  Star,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Mic,
  MicOff,
  Smile,
  BookOpen,
} from 'lucide-react';

interface KidStageViewProps {
  stage: KidStageData;
  isUnlocked: boolean;
  isCompleted: boolean;
  onPassStage: (stageNum: number, starsEarned: number) => void;
  onBackToMap: () => void;
  onNextStage?: () => void;
}

export const KidStageView: React.FC<KidStageViewProps> = ({
  stage,
  isUnlocked,
  isCompleted,
  onPassStage,
  onBackToMap,
  onNextStage,
}) => {
  const [activeTab, setActiveTab] = useState<'listen' | 'spelling' | 'story' | 'speak' | 'starQuiz'>('listen');
  const [audioRate, setAudioRate] = useState<number>(0.75); // Slower, cheerful rate for kids

  // Spelling puzzle state
  const [spellingIndex, setSpellingIndex] = useState<number>(0);
  const [assembledLetters, setAssembledLetters] = useState<string[]>([]);
  const [spellingWon, setSpellingWon] = useState<boolean>(false);

  // Speaking state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [spokenScore, setSpokenScore] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const activeSpelling = stage.spellingGame[spellingIndex] || stage.spellingGame[0];

  // Spelling Game logic: letter block tap
  const handleAddLetter = (char: string) => {
    if (spellingWon) return;
    playKidChime('click');
    const nextAssembled = [...assembledLetters, char];
    setAssembledLetters(nextAssembled);

    // check if matches target
    const currentWord = nextAssembled.join('');
    if (currentWord === activeSpelling.targetWord) {
      setSpellingWon(true);
      playKidChime('cheer');
      speakText(`Superb! ${activeSpelling.targetWord}`, audioRate);
    }
  };

  const handleClearLetters = () => {
    setAssembledLetters([]);
    setSpellingWon(false);
  };

  const handleNextSpelling = () => {
    setAssembledLetters([]);
    setSpellingWon(false);
    setSpellingIndex((prev) => (prev + 1) % stage.spellingGame.length);
  };

  // Speaking logic
  const handleStartMic = () => {
    setSpokenText('');
    setSpokenScore(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('माइक उपलब्ध नहीं है। आप नीचे दिए गए स्पीकर से सुनकर बोल सकते हैं!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setSpokenText(transcript);
        const sim = computeSimilarity(transcript, stage.speakingPrompt.phrase);
        setSpokenScore(sim);
        playKidChime('star');
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleStopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Quiz Evaluation
  const handleAnswerQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    playKidChime('click');
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length < stage.starQuiz.length) {
      alert('कृपया सभी सवालों के उत्तर चुनिए!');
      return;
    }

    let correctCount = 0;
    stage.starQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    setQuizSubmitted(true);
    if (correctCount >= 1) {
      playKidChime('cheer');
      onPassStage(stage.stageNumber, 3);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Playful Stage Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${stage.colorScheme.bg} ${stage.colorScheme.border} shadow-xs`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
              <span className="bg-white/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                {stage.badge}
              </span>
              <span>{stage.titleEnglish}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {stage.titleHindi}
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              ✨ {stage.kidTagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100/90 px-3 py-1.5 rounded-xl border border-amber-300">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>3 सितारे जीते!</span>
              </div>
            )}
            <button
              onClick={onBackToMap}
              className="px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 rounded-xl transition-colors border border-stone-200 cursor-pointer"
            >
              ← जादुई नक्शा
            </button>
          </div>
        </div>

        {/* Guru / Teacher's Loving Advice */}
        <div className="mt-4 p-4 bg-white/90 rounded-2xl border border-black/5 flex items-start gap-3">
          <span className="text-2xl mt-0.5">🦉</span>
          <div>
            <span className="text-xs font-bold text-amber-900 block">
              गुरुजी की प्यारी बात (Teacher's Love):
            </span>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium mt-0.5">
              "{stage.guruTeacherMessage}"
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('listen')}
          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'listen'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>1. सुनो और सीखो 🎧</span>
        </button>

        <button
          onClick={() => setActiveTab('spelling')}
          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'spelling'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>2. अक्षर जोड़ो खेल 🧩</span>
        </button>

        {stage.story && (
          <button
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'story'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <span>3. कहानी सुनो 📖</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('speak')}
          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'speak'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>4. बोलो मेरे साथ 🎙️</span>
        </button>

        <button
          onClick={() => setActiveTab('starQuiz')}
          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'starQuiz'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <span>5. सितारे जीतो ⭐</span>
        </button>
      </div>

      {/* TAB 1: LISTEN & LEARN WORDS WITH EMOJIS & HINDI PRONUNCIATION */}
      {activeTab === 'listen' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-600 bg-white p-3.5 rounded-2xl border border-stone-200">
            <span>आवाज़ की गति:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setAudioRate(0.7)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                  audioRate === 0.7 ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                धीमी 🐢
              </button>
              <button
                onClick={() => setAudioRate(0.85)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                  audioRate === 0.85 ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                सामान्य 🐰
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stage.words.map((item) => (
              <div
                key={item.english}
                className="bg-white border-2 border-stone-200 hover:border-amber-400 p-5 rounded-3xl shadow-xs transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{item.emoji}</span>
                    <button
                      onClick={() => {
                        playKidChime('star');
                        speakText(item.english, audioRate);
                      }}
                      className="p-3 bg-amber-100 group-hover:bg-amber-500 group-hover:text-white text-amber-900 rounded-2xl transition-all cursor-pointer shadow-xs active:scale-95"
                      title="आवाज़ सुनें"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                      {item.english}
                    </h3>
                    <div className="text-xs font-black text-amber-900 bg-amber-50 inline-block px-2.5 py-1 rounded-lg border border-amber-200 mt-1">
                      उच्चारण: {item.hindiPronunciation}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-stone-700">
                    अर्थ: {item.hindiMeaning}
                  </p>

                  <p className="text-xs text-stone-500 font-medium">
                    💡 {item.soundFun}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* If Stage 5 has sentence train */}
          {stage.sentenceTrain && (
            <SentenceTrainGame
              onEarnStar={() => playKidChime('star')}
            />
          )}

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('spelling')}
              className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-black text-sm rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>चलो अब खेलें और स्पेलिंग बनाएं! 🧩 →</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: SPELLING PUZZLE & LETTER BLOCKS GAME */}
      {activeTab === 'spelling' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-800">
                खेल {spellingIndex + 1} / {stage.spellingGame.length}
              </span>
              <h3 className="text-xl font-black text-stone-900">
                अक्षर चुनकर शब्द बनाओ!
              </h3>
            </div>
            <button
              onClick={handleNextSpelling}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              अगला शब्द →
            </button>
          </div>

          {/* Picture and prompt */}
          <div className="p-6 bg-stone-50 border border-stone-200 rounded-3xl text-center space-y-2">
            <div className="text-5xl">{activeSpelling.promptEmoji}</div>
            <div className="text-xl font-black text-stone-900">
              {activeSpelling.promptHindi}
            </div>
            <div className="text-xs text-amber-900 font-bold">
              उच्चारण: "{activeSpelling.hindiPronunciation}"
            </div>
          </div>

          {/* Assembled Word Slot */}
          <div className="p-5 border-2 border-dashed border-stone-300 rounded-3xl min-h-20 flex items-center justify-center gap-3 bg-stone-50/50">
            {assembledLetters.length === 0 ? (
              <span className="text-xs sm:text-sm text-stone-400 font-medium">
                नीचे दिए गए अक्षरों पर क्लिक करके यहाँ जोड़ें...
              </span>
            ) : (
              assembledLetters.map((char, idx) => (
                <div
                  key={char + idx}
                  className="w-12 h-14 bg-amber-400 border-2 border-amber-500 rounded-2xl text-2xl font-black text-stone-950 flex items-center justify-center shadow-xs"
                >
                  {char}
                </div>
              ))
            )}
          </div>

          {/* Letter Block Choices */}
          <div className="space-y-2 text-center">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wide">
              अक्षर चुनो:
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {activeSpelling.hintLetters.map((char, idx) => (
                <button
                  key={char + idx}
                  onClick={() => handleAddLetter(char)}
                  className="w-12 h-14 bg-white border-2 border-stone-300 hover:border-amber-500 active:scale-95 rounded-2xl text-xl font-black text-stone-900 transition-all shadow-xs cursor-pointer"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleClearLetters}
              className="px-4 py-2.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              दोबारा कोशिश करें ↺
            </button>
            <button
              onClick={() => speakText(activeSpelling.targetWord, audioRate)}
              className="px-4 py-2.5 text-xs font-bold text-stone-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4 text-amber-800" />
              <span>शब्द सुनो</span>
            </button>
          </div>

          {/* Win announcement */}
          {spellingWon && (
            <div className="p-5 bg-emerald-100 border-2 border-emerald-300 rounded-3xl text-center space-y-2 animate-bounce">
              <span className="text-3xl">🌟🎉</span>
              <div className="text-lg font-black text-emerald-950">
                शाबाश! आपने सही शब्द बना दिया: {activeSpelling.targetWord}!
              </div>
              <button
                onClick={handleNextSpelling}
                className="px-5 py-2 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
              >
                अगली पहेली खेलो →
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STORY TIME (For Stage 6) */}
      {activeTab === 'story' && stage.story && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4 text-center">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase">
              📖 कहानी का समय
            </span>
            <h2 className="text-2xl font-black text-stone-900 mt-1">
              {stage.story.title}
            </h2>
            <p className="text-sm font-bold text-amber-900">
              {stage.story.titleHindi}
            </p>
          </div>

          {/* Lines */}
          <div className="space-y-3">
            {stage.story.lines.map((line, idx) => (
              <div
                key={idx}
                className="p-4 bg-stone-50 hover:bg-amber-50/60 border border-stone-200 rounded-2xl transition-colors flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-base font-extrabold text-stone-900">
                    {line.en}
                  </div>
                  <div className="text-xs font-bold text-amber-900">
                    उच्चारण: {line.pronunciation}
                  </div>
                  <div className="text-xs text-stone-600 font-medium">
                    अर्थ: {line.hi}
                  </div>
                </div>

                <button
                  onClick={() => {
                    playKidChime('click');
                    speakText(line.en, audioRate);
                  }}
                  className="p-2.5 bg-white hover:bg-amber-500 hover:text-white text-stone-700 border border-stone-200 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Moral */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <span className="text-xs font-black text-amber-950 block">
              💡 कहानी की प्यारी सीख:
            </span>
            <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1">
              {stage.story.moralHindi}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: SPEAK WITH ME (KIDS MIC CLUB) */}
      {activeTab === 'speak' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-center">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase">
              🎙️ बोलो मेरे साथ
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-0.5">
              अपनी प्यारी आवाज़ में बोलो!
            </h3>
          </div>

          {/* Target Phrase Box */}
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl space-y-2">
            <div className="text-xs text-stone-500 font-bold uppercase">
              यह वाक्य बोलने की कोशिश करो:
            </div>
            <div className="text-2xl font-black text-stone-900">
              "{stage.speakingPrompt.phrase}"
            </div>
            <div className="text-sm font-bold text-amber-900">
              उच्चारण: {stage.speakingPrompt.hindiPronunciation}
            </div>
            <div className="text-xs text-stone-600">
              अर्थ: {stage.speakingPrompt.hindiMeaning}
            </div>

            <button
              onClick={() => speakText(stage.speakingPrompt.phrase, audioRate)}
              className="mt-2 px-4 py-2 bg-white hover:bg-amber-100 text-stone-900 font-bold text-xs rounded-xl border border-stone-200 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>सही आवाज़ सुनो</span>
            </button>
          </div>

          {/* Big Mic Button */}
          <div className="p-6 bg-stone-900 text-stone-100 rounded-3xl space-y-4">
            <div className="text-xs text-stone-300">
              माइक बटन दबाओ और खुलकर बोलो! (गलत होने पर भी सितारे मिलेंगे!)
            </div>

            <div className="flex justify-center">
              {isListening ? (
                <button
                  onClick={handleStopMic}
                  className="w-20 h-20 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-xl animate-pulse cursor-pointer"
                >
                  <MicOff className="w-7 h-7" />
                  <span className="text-[10px] font-bold">रोकें</span>
                </button>
              ) : (
                <button
                  onClick={handleStartMic}
                  className="w-20 h-20 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-xl font-black cursor-pointer active:scale-95"
                >
                  <Mic className="w-8 h-8" />
                  <span className="text-[10px]">बोलें 🎙️</span>
                </button>
              )}
            </div>

            {spokenText && (
              <div className="p-4 bg-stone-800 rounded-2xl text-left space-y-1">
                <div className="text-xs text-stone-400">आपकी प्यारी आवाज़:</div>
                <div className="text-base font-bold text-white">"{spokenText}"</div>
                {spokenScore !== null && (
                  <div className="text-xs text-amber-400 font-bold pt-1">
                    🌟 {stage.speakingPrompt.kidPraise}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: STAR QUIZ TO WIN 3 STARS AND UNLOCK NEXT STAGE */}
      {activeTab === 'starQuiz' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4 text-center">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase">
              ⭐ सितारा परीक्षा
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-1">
              3 सुनहरे सितारे जीतो!
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              सवालों के सही उत्तर चुनो और अगला जादुई पड़ाव खोलो!
            </p>
          </div>

          <div className="space-y-5">
            {stage.starQuiz.map((q, qIdx) => {
              const chosen = quizAnswers[qIdx];
              const isRight = chosen === q.correctIndex;

              return (
                <div
                  key={qIdx}
                  className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3"
                >
                  <div className="flex items-center gap-2 text-base font-black text-stone-900">
                    <span className="text-2xl">{q.emoji}</span>
                    <span>
                      {qIdx + 1}. {q.question}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      let btnStyle = 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-500 text-stone-950 border-amber-600 font-bold';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer text-left ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold leading-relaxed ${
                        isRight
                          ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                          : 'bg-amber-50 text-amber-950 border border-amber-200'
                      }`}
                    >
                      {q.funExplanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                जादू की छड़ी घुमाओ और सितारे पाओ! ⭐✨
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-emerald-900 font-black text-lg">
                  🎉 वाह नन्हे चैंपियन! आपने यह पड़ाव पूरा कर लिया है!
                </div>
                {onNextStage && (
                  <button
                    onClick={onNextStage}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-black text-sm rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>अगले पड़ाव पर चलें 🚀 →</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
