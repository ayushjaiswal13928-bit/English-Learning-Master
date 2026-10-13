import React, { useState, useRef, useEffect } from 'react';
import { speakSlowly, isSpeechRecognitionSupported, computeSimilarity } from '../../utils/speech';
import { playKidChime } from '../../utils/kidAudio';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const SpeakingPracticeScreen: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const recognitionRef = useRef<any>(null);

  // Exact 5 sentences from Panel 11 of image.png:
  // • My name is Ayush.
  // • I am from Madhya Pradesh.
  // • I am 22 years old.
  // • I like English.
  // • Nice to meet you.
  const PRACTICE_SENTENCES = [
    { en: 'My name is Ayush.', hi: 'मेरा नाम आयुष है।' },
    { en: 'I am from Madhya Pradesh.', hi: 'मैं मध्य प्रदेश से हूँ।' },
    { en: 'I am 22 years old.', hi: 'मेरी उम्र 22 वर्ष है।' },
    { en: 'I like English.', hi: 'मुझे अंग्रेज़ी पसंद है।' },
    { en: 'Nice to meet you.', hi: 'आपसे मिलकर खुशी हुई।' },
  ];

  const currentSentence = PRACTICE_SENTENCES[activeSentenceIndex];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);
          setIsListening(false);

          const sim = computeSimilarity(spoken, currentSentence.en);
          if (sim >= 0.65) {
            playKidChime('cheer');
            setFeedback(`शानदार उच्चारण! (${Math.round(sim * 100)}% सटीकता)`);
          } else {
            playKidChime('click');
            setFeedback(`अच्छा प्रयास! (${Math.round(sim * 100)}% सटीकता) — दोबारा बोलकर देखें।`);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [currentSentence.en]);

  const toggleRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('आपके ब्राउज़र में माइक्रोफोन स्पीच रिकग्निशन उपलब्ध नहीं है। कृपया Chrome/Edge का उपयोग करें।');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedback('');
      playKidChime('click');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 11 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🗣️</span>
            <span>Speaking Practice</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            11. Speaking Practice — माइक्रोफोन से बोलकर उच्चारण का अभ्यास
          </p>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Matching Panel 11: Mic & Sentences on Left, Child "Let's Speak!" on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT COLUMN: Large Mic Circle + Sentences Checklist */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Big Tap to Speak Circle */}
          <div className="text-center space-y-3">
            <button
              onClick={toggleRecording}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center mx-auto transition-all cursor-pointer shadow-lg active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 ring-8 ring-blue-100'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>

            <div className="text-sm font-black text-slate-900">
              {isListening ? 'सुन रहा हूँ... बोलिए!' : 'Tap to speak'}
            </div>
          </div>

          {/* Try These Sentences Box (Exact 5 sentences matching Panel 11) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">
                Try these sentences (इन वाक्यों को बोलें):
              </h2>
              <span className="text-xs text-blue-600 font-bold">
                वाक्य {activeSentenceIndex + 1} / {PRACTICE_SENTENCES.length}
              </span>
            </div>

            <div className="space-y-2">
              {PRACTICE_SENTENCES.map((s, idx) => {
                const isActive = activeSentenceIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      playKidChime('click');
                      setActiveSentenceIndex(idx);
                      setTranscript('');
                      setFeedback('');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-50 border-blue-400 text-blue-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <div>
                        <div className="text-sm font-mono">{s.en}</div>
                        <div className="text-xs text-slate-400 font-normal">{s.hi}</div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSlowly(s.en);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg cursor-pointer"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transcript & Feedback */}
          {transcript && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-slate-500 block">आपने बोला:</span>
              <p className="text-sm font-mono font-bold text-slate-800">"{transcript}"</p>
              {feedback && (
                <p className="text-xs font-bold text-emerald-700 pt-1">{feedback}</p>
              )}
            </div>
          )}

          {/* Record Button (Matching Panel 11) */}
          <div className="pt-2 text-center">
            <button
              onClick={toggleRecording}
              className={`w-full py-3 rounded-xl font-black text-sm text-white transition-all shadow-xs cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isListening ? 'Stop Recording' : 'Record'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Cartoon Kid Character with "Let's Speak!" (Matching Panel 11) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 via-sky-50 to-blue-50 rounded-3xl p-6 sm:p-8 border border-blue-200 flex flex-col items-center justify-center text-center space-y-4">
          {/* Speech Bubble "Let's Speak!" */}
          <div className="relative bg-white px-5 py-2.5 rounded-2xl shadow-md border border-blue-200 font-black text-blue-700 text-sm tracking-wide">
            Let's Speak! 🗣️
            <div className="w-3 h-3 bg-white border-b border-r border-blue-200 transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
          </div>

          {/* Kid Character Avatar Illustration */}
          <div className="w-32 h-32 rounded-3xl bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-7xl">
            👦
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">
              बोलने से डरें नहीं!
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              गलतियाँ सीखने का पहला कदम हैं। रोज़ 5 मिनट ज़ोर से बोलने से आपकी जीभ अंग्रेज़ी शब्दों की आदी हो जाएगी।
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                playKidChime('star');
                speakSlowly(currentSentence.en);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>आदर्श उच्चारण सुनें</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
