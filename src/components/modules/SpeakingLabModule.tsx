import React, { useState, useRef, useEffect } from 'react';
import { SPEAKING_PROMPTS } from '../../data/roadmapData';
import {
  speakText,
  isSpeechRecognitionSupported,
  computeSimilarity,
} from '../../utils/speech';
import { Mic, MicOff, Volume2, CheckCircle2, RotateCcw, Award } from 'lucide-react';

interface SpeakingLabModuleProps {
  onComplete: () => void;
  isCompleted: boolean;
  onIncrementSpeakingPractice: () => void;
}

export const SpeakingLabModule: React.FC<SpeakingLabModuleProps> = ({
  onComplete,
  isCompleted,
  onIncrementSpeakingPractice,
}) => {
  const [activePromptIdx, setActivePromptIdx] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('');
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const currentPrompt = SPEAKING_PROMPTS[activePromptIdx];

  useEffect(() => {
    // Clean up recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleStartSpeaking = () => {
    setRecognitionError(null);
    setRecognizedTranscript('');
    setAccuracyScore(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionError(
        'आपके ब्राउज़र में सीधा स्पीच रिकग्निशन समर्थित नहीं है। आप नीचे ऑडियो सुनकर बोलकर अभ्यास कर सकते हैं।'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedTranscript(transcript);

        // compute score against target
        const score = computeSimilarity(transcript, currentPrompt.targetPhrase);
        setAccuracyScore(score);
        onIncrementSpeakingPractice();
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setRecognitionError(`माइक से आवाज़ नहीं पकड़ी गई (${event.error})। कृपया दोबारा प्रयास करें।`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setRecognitionError('माइक्रोफ़ोन प्रारंभ करने में समस्या हुई। कृपया अनुमति जांचें।');
    }
  };

  const handleStopSpeaking = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handlePlayTargetAudio = () => {
    speakText(currentPrompt.targetPhrase, 0.85);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              नियम 10 · मौखिक अभिव्यक्ति (Speaking)
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Speaking Lab (अंग्रेज़ी बोलना और उच्चारण जांच)
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
          अंग्रेज़ी सीखने का अंतिम उद्देश्य आत्मविश्वास से बोलना है। अपना परिचय देना, रोज़मर्रा के वाक्य बोलना,
          और <strong>माइक की सहायता से उच्चारण की सटीकता जाँचना</strong>।
        </p>
      </div>

      {/* Prompts Navigation */}
      <div className="flex flex-wrap gap-2">
        {SPEAKING_PROMPTS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePromptIdx(idx);
              setRecognizedTranscript('');
              setAccuracyScore(null);
              setRecognitionError(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              activePromptIdx === idx
                ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            ड्रिल {idx + 1}: {p.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Main Speaking Stage */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <span className="text-xs font-mono text-stone-400">
            {currentPrompt.title}
          </span>
          <h3 className="text-xl font-bold text-stone-900 mt-0.5">
            {currentPrompt.hindiPrompt}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            सुझाव: {currentPrompt.tips}
          </p>
        </div>

        {/* Target Phrase Box */}
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
              यह वाक्य बोलें (Target Sentence):
            </span>
            <button
              onClick={handlePlayTargetAudio}
              className="px-3 py-1.5 bg-white hover:bg-amber-600 hover:text-white text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>सही उच्चारण सुनें</span>
            </button>
          </div>

          <div className="text-xl font-extrabold text-stone-900 leading-relaxed">
            "{currentPrompt.targetPhrase}"
          </div>

          <div className="text-xs text-stone-600 font-medium">
            हिंदी अर्थ: {currentPrompt.hindiMeaning}
          </div>
        </div>

        {/* Live Mic Test Station */}
        <div className="p-6 bg-stone-900 text-stone-100 rounded-xl text-center space-y-4">
          <div className="text-xs text-stone-300">
            माइक बटन दबाएँ और ऊपर दिया गया वाक्य अंग्रेज़ी में स्पष्ट बोलें:
          </div>

          <div className="flex justify-center">
            {isListening ? (
              <button
                onClick={handleStopSpeaking}
                className="w-20 h-20 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-lg animate-pulse cursor-pointer"
              >
                <MicOff className="w-6 h-6" />
                <span className="text-[10px] font-bold">रोकें</span>
              </button>
            ) : (
              <button
                onClick={handleStartSpeaking}
                className="w-20 h-20 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-full flex flex-col items-center justify-center gap-1 transition-all shadow-lg cursor-pointer font-bold focus-visible:outline-none"
              >
                <Mic className="w-7 h-7" />
                <span className="text-[10px]">बोलें</span>
              </button>
            )}
          </div>

          {isListening && (
            <div className="text-xs text-amber-300 font-medium">
              माइक चालू है... कृपया वाक्य बोलें
            </div>
          )}

          {recognitionError && (
            <div className="text-xs text-rose-300 max-w-md mx-auto">
              {recognitionError}
            </div>
          )}

          {/* Results Feedback */}
          {recognizedTranscript && (
            <div className="bg-stone-800 border border-stone-700 rounded-xl p-4 text-left space-y-2 mt-4">
              <div className="text-xs text-stone-400">
                माइक ने क्या सुना (What was recognized):
              </div>
              <div className="text-sm font-semibold text-white">
                "{recognizedTranscript}"
              </div>

              {accuracyScore !== null && (
                <div className="pt-2 border-t border-stone-700 flex items-center justify-between">
                  <span className="text-xs text-stone-300">
                    उच्चारण सटीकता स्कोर (Pronunciation Accuracy):
                  </span>
                  <div className="flex items-center gap-1.5 font-mono font-black text-lg">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span
                      className={
                        accuracyScore >= 80
                          ? 'text-emerald-400'
                          : accuracyScore >= 50
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {accuracyScore}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
