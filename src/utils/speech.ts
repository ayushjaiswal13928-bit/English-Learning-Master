/**
 * Utility for Speech Synthesis (Text-to-Speech) and Speech Recognition
 */

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const isSpeechRecognitionSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
};

export const speakText = (text: string, rate = 0.85, onEnd?: () => void) => {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported on this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // slightly slower for clear learner articulation
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang === 'en-US' && v.name.includes('Natural')) ||
      voices.find((v) => v.lang === 'en-US') ||
      voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
};

export const speakSlowly = (text: string, onEnd?: () => void) => {
  speakText(text, 0.7, onEnd);
};

export const speakHindi = (text: string, rate = 0.9) => {
  if (!isSpeechSynthesisSupported()) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.lang = 'hi-IN';

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.startsWith('hi'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Hindi speech error:', err);
  }
};

// Word similarity score computation (Levenshtein based normalized similarity)
export const computeSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.trim().toLowerCase().replace(/[^\w\s]/gi, '');
  const s2 = str2.trim().toLowerCase().replace(/[^\w\s]/gi, '');

  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;

  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(null));

  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  return similarity;
};
