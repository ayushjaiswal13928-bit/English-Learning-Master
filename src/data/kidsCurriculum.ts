export interface KidWordItem {
  english: string;
  hindiPronunciation: string;
  hindiMeaning: string;
  emoji: string;
  soundFun: string;
}

export interface KidStageData {
  stageNumber: number;
  badge: string;
  titleHindi: string;
  titleEnglish: string;
  kidTagline: string;
  guruTeacherMessage: string;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
  };
  words: KidWordItem[];
  spellingGame: {
    promptEmoji: string;
    promptHindi: string;
    targetWord: string;
    hindiPronunciation: string;
    hintLetters: string[];
  }[];
  sentenceTrain?: {
    engine: string[]; // Subject: I, He, My Cat
    wagonAction: string[]; // Verb: likes, drinks, plays with
    wagonObject: string[]; // Object: milk, a ball, sweet apples
    correctExamples: {
      en: string;
      hi: string;
      pronunciation: string;
    }[];
  };
  story?: {
    title: string;
    titleHindi: string;
    lines: {
      en: string;
      hi: string;
      pronunciation: string;
    }[];
    moralHindi: string;
  };
  speakingPrompt: {
    phrase: string;
    hindiPronunciation: string;
    hindiMeaning: string;
    kidPraise: string;
  };
  starQuiz: {
    question: string;
    emoji: string;
    options: string[];
    correctIndex: number;
    funExplanation: string;
  }[];
}

export const KIDS_CURRICULUM: KidStageData[] = [
  // STAGE 1: अक्षर और जानवरों के दोस्त
  {
    stageNumber: 1,
    badge: 'पड़ाव 1',
    titleHindi: 'अक्षर और आवाज़ों की दुनिया',
    titleEnglish: 'Magic Letters & Sounds',
    kidTagline: 'हर अक्षर की एक जादुई आवाज़ होती है!',
    guruTeacherMessage:
      'नमस्ते नन्हे दोस्त! अंग्रेज़ी के 26 अक्षर असल में 26 नन्हे जादूगर हैं। हर अक्षर का एक नाम होता है और एक प्यारी आवाज़ होती है। जैसे "A" बोलता है "ऐ" (ऐपल) और "B" बोलता है "ब" (बॉल)। चलो मिलकर सुनते हैं!',
    colorScheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      accent: 'text-amber-800',
    },
    words: [
      {
        english: 'Apple',
        hindiPronunciation: 'ऐपल',
        hindiMeaning: 'सेब 🍎',
        emoji: '🍎',
        soundFun: 'A बोलता है "ऐ" (ऐ-ऐ-ऐपल)',
      },
      {
        english: 'Ball',
        hindiPronunciation: 'बॉल',
        hindiMeaning: 'गेंद ⚽',
        emoji: '⚽',
        soundFun: 'B बोलता है "ब" (ब-ब-बॉल)',
      },
      {
        english: 'Cat',
        hindiPronunciation: 'कैट',
        hindiMeaning: 'बिल्ली 🐱',
        emoji: '🐱',
        soundFun: 'C बोलता है "क" (क-क-कैट)',
      },
      {
        english: 'Dog',
        hindiPronunciation: 'डॉग',
        hindiMeaning: 'कुत्ता 🐶',
        emoji: '🐶',
        soundFun: 'D बोलता है "ड" (ड-ड-डॉग)',
      },
      {
        english: 'Egg',
        hindiPronunciation: 'एग',
        hindiMeaning: 'अंडा 🥚',
        emoji: '🥚',
        soundFun: 'E बोलता है "ए" (ए-ए-एग)',
      },
      {
        english: 'Fish',
        hindiPronunciation: 'फ़िश',
        hindiMeaning: 'मछली 🐟',
        emoji: '🐟',
        soundFun: 'F बोलता है "फ़" (फ़-फ़-फ़िश)',
      },
    ],
    spellingGame: [
      {
        promptEmoji: '🍎',
        promptHindi: 'सेब (ऐपल)',
        targetWord: 'APPLE',
        hindiPronunciation: 'ऐपल',
        hintLetters: ['A', 'P', 'P', 'L', 'E', 'B', 'T'],
      },
      {
        promptEmoji: '🐱',
        promptHindi: 'बिल्ली (कैट)',
        targetWord: 'CAT',
        hindiPronunciation: 'कैट',
        hintLetters: ['C', 'A', 'T', 'O', 'G'],
      },
      {
        promptEmoji: '⚽',
        promptHindi: 'गेंद (बॉल)',
        targetWord: 'BALL',
        hindiPronunciation: 'बॉल',
        hintLetters: ['B', 'A', 'L', 'L', 'K', 'S'],
      },
    ],
    speakingPrompt: {
      phrase: 'A is for Apple, B is for Ball.',
      hindiPronunciation: 'ए इज़ फ़ॉर ऐपल, बी इज़ फ़ॉर बॉल।',
      hindiMeaning: 'A से Apple और B से Ball होता है।',
      kidPraise: 'वाह! आपकी आवाज़ कितनी साफ़ और मीठी है!',
    },
    starQuiz: [
      {
        question: 'बिल्ली (Cat) को अंग्रेज़ी में कैसे बोलते हैं?',
        emoji: '🐱',
        options: ['कैट (Cat)', 'डॉग (Dog)', 'बैट (Bat)'],
        correctIndex: 0,
        funExplanation: 'बिल्कुल सही! C से Cat (कैट) होता है जो म्याऊं बोलती है!',
      },
      {
        question: 'A अक्षर की जादुई आवाज़ क्या है?',
        emoji: '🍎',
        options: ['ब', 'ऐ (जैसे ऐपल)', 'म'],
        correctIndex: 1,
        funExplanation: 'शाबाश! A बोलता है "ऐ" जैसे Apple में!',
      },
    ],
  },

  // STAGE 2: छोटे शब्द जोड़ो और पढ़ो (Word Blending Blocks)
  {
    stageNumber: 2,
    badge: 'पड़ाव 2',
    titleHindi: 'अक्षर जोड़ो, शब्द बनाओ',
    titleEnglish: 'Word Building & Blending',
    kidTagline: 'अक्षरों को मिलाओ, नया शब्द पाओ!',
    guruTeacherMessage:
      'क्या आपको पता है? जब दो-तीन अक्षर एक साथ हाथ पकड़ते हैं, तो एक नया शब्द बन जाता है! जैसे B (ब) + A (ऐ) + T (ट) = BAT (बल्ला)। इसे बोलना एक मज़ेदार खेल जैसा है!',
    colorScheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      accent: 'text-emerald-800',
    },
    words: [
      {
        english: 'Bat',
        hindiPronunciation: 'बैट',
        hindiMeaning: 'बल्ला 🏏',
        emoji: '🏏',
        soundFun: 'B + A + T = BAT',
      },
      {
        english: 'Pen',
        hindiPronunciation: 'पेन',
        hindiMeaning: 'कलम 🖊️',
        emoji: '🖊️',
        soundFun: 'P + E + N = PEN',
      },
      {
        english: 'Sun',
        hindiPronunciation: 'सन',
        hindiMeaning: 'सूरज ☀️',
        emoji: '☀️',
        soundFun: 'S + U + N = SUN',
      },
      {
        english: 'Cup',
        hindiPronunciation: 'कप',
        hindiMeaning: 'प्याला ☕',
        emoji: '☕',
        soundFun: 'C + U + P = CUP',
      },
      {
        english: 'Hat',
        hindiPronunciation: 'हैट',
        hindiMeaning: 'टोपी 🎩',
        emoji: '🎩',
        soundFun: 'H + A + T = HAT',
      },
      {
        english: 'Mug',
        hindiPronunciation: 'मग',
        hindiMeaning: 'मग 🥛',
        emoji: '🥛',
        soundFun: 'M + U + G = MUG',
      },
    ],
    spellingGame: [
      {
        promptEmoji: '☀️',
        promptHindi: 'सूरज (सन)',
        targetWord: 'SUN',
        hindiPronunciation: 'सन',
        hintLetters: ['S', 'U', 'N', 'P', 'E'],
      },
      {
        promptEmoji: '🖊️',
        promptHindi: 'कलम (पेन)',
        targetWord: 'PEN',
        hindiPronunciation: 'पेन',
        hintLetters: ['P', 'E', 'N', 'A', 'T'],
      },
      {
        promptEmoji: '🎩',
        promptHindi: 'टोपी (हैट)',
        targetWord: 'HAT',
        hindiPronunciation: 'हैट',
        hintLetters: ['H', 'A', 'T', 'O', 'T'],
      },
    ],
    speakingPrompt: {
      phrase: 'The bright Sun shines in the sky.',
      hindiPronunciation: 'द ब्राइट सन शाइन्स इन द स्काई।',
      hindiMeaning: 'आसमान में चमकता हुआ सूरज!',
      kidPraise: 'अद्भुत! आप तो बहुत तेज़ी से सीख रहे हैं!',
    },
    starQuiz: [
      {
        question: 'P + E + N को जोड़ने पर क्या शब्द बनता है?',
        emoji: '🖊️',
        options: ['पेन (Pen)', 'पैन (Pan)', 'पिन (Pin)'],
        correctIndex: 0,
        funExplanation: 'P + E + N मिलकर बनता है PEN (पेन = कलम)!',
      },
      {
        question: 'सूरज को अंग्रेज़ी में क्या कहते हैं?',
        emoji: '☀️',
        options: ['Moon', 'Sun (सन)', 'Star'],
        correctIndex: 1,
        funExplanation: 'बिलकुल ठीक! S-U-N यानी SUN = सूरज!',
      },
    ],
  },

  // STAGE 3: जादुई E और छुपे रुस्तम अक्षर (Magic E & Silent Ninjas)
  {
    stageNumber: 3,
    badge: 'पड़ाव 3',
    titleHindi: 'जादुई E और छुपे रुस्तम अक्षर',
    titleEnglish: 'Magic E & Secret Letters',
    kidTagline: 'कुछ अक्षर जादुई होते हैं और कुछ छुपे रुस्तम!',
    guruTeacherMessage:
      'यह सबसे मज़ेदार जादू है! जब शब्द के पीछे "Magic E" आ जाता है, तो आगे वाला स्वर अपना नाम बोलने लगता है (जैसे C-A-K-E = केक)! और कुछ अक्षर "छुपे रुस्तम निंजा" होते हैं — लिखे जाते हैं पर आवाज़ नहीं निकालते, जैसे Knife (नाइफ़) में K चुप रहता है!',
    colorScheme: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      accent: 'text-purple-800',
    },
    words: [
      {
        english: 'Cake',
        hindiPronunciation: 'केक',
        hindiMeaning: 'स्वादिष्ट केक 🎂',
        emoji: '🎂',
        soundFun: 'Magic E ने A से उसका नाम बुलवाया!',
      },
      {
        english: 'Bike',
        hindiPronunciation: 'बाइक',
        hindiMeaning: 'साइकिल / बाइक 🚲',
        emoji: '🚲',
        soundFun: 'B-I-K-E = बाइक',
      },
      {
        english: 'Home',
        hindiPronunciation: 'होम',
        hindiMeaning: 'प्यारा घर 🏡',
        emoji: '🏡',
        soundFun: 'H-O-M-E = होम',
      },
      {
        english: 'Knife',
        hindiPronunciation: 'नाइफ़',
        hindiMeaning: 'चाकू 🔪 (K चुप रहता है)',
        emoji: '🔪',
        soundFun: 'K शांत रहता है: नाइफ़!',
      },
      {
        english: 'Friend',
        hindiPronunciation: 'फ़्रेंड',
        hindiMeaning: 'पक्का दोस्त 🤝',
        emoji: '🤝',
        soundFun: 'F-R-I-E-N-D (Frend नहीं!)',
      },
    ],
    spellingGame: [
      {
        promptEmoji: '🎂',
        promptHindi: 'केक (C-A-K-E)',
        targetWord: 'CAKE',
        hindiPronunciation: 'केक',
        hintLetters: ['C', 'A', 'K', 'E', 'B', 'P'],
      },
      {
        promptEmoji: '🤝',
        promptHindi: 'दोस्त (F-R-I-E-N-D)',
        targetWord: 'FRIEND',
        hindiPronunciation: 'फ़्रेंड',
        hintLetters: ['F', 'R', 'I', 'E', 'N', 'D', 'O'],
      },
      {
        promptEmoji: '🏡',
        promptHindi: 'घर (H-O-M-E)',
        targetWord: 'HOME',
        hindiPronunciation: 'होम',
        hintLetters: ['H', 'O', 'M', 'E', 'S', 'T'],
      },
    ],
    speakingPrompt: {
      phrase: 'He is my best friend.',
      hindiPronunciation: 'ही इज़ माई बेस्ट फ़्रेंड।',
      hindiMeaning: 'वह मेरा सबसे अच्छा दोस्त है।',
      kidPraise: 'सुपरस्टार! आपकी अंग्रेज़ी बहुत प्यारी लग रही है!',
    },
    starQuiz: [
      {
        question: 'Knife (चाकू) में कौन सा अक्षर चुप (Silent) रहता है?',
        emoji: '🔪',
        options: ['K अक्षर', 'N अक्षर', 'E अक्षर'],
        correctIndex: 0,
        funExplanation: 'बिल्कुल सही! Knife में K निंजा की तरह चुप रहता है और हम इसे "नाइफ़" बोलते हैं!',
      },
      {
        question: 'दोस्त के लिए सही स्पेलिंग कौन सी है?',
        emoji: '🤝',
        options: ['Frend', 'Friend (फ़्रेंड)', 'Frind'],
        correctIndex: 1,
        funExplanation: 'शाबाश! F-R-I-E-N-D (Friend) सही स्पेलिंग है!',
      },
    ],
  },

  // STAGE 4: मेरी दुनिया के प्यारे शब्द (My Family, Toys & Food)
  {
    stageNumber: 4,
    badge: 'पड़ाव 4',
    titleHindi: 'मेरी दुनिया — परिवार, खाना और खिलौने',
    titleEnglish: 'My World: Family, Food & Fun',
    kidTagline: 'मेरे अपने घर के सबसे प्यारे शब्द!',
    guruTeacherMessage:
      'हम हर रोज़ अपनी माँ से बात करते हैं, दूध पीते हैं, खिलौनों से खेलते हैं। चलो इन सभी प्यारी चीज़ों को अंग्रेज़ी में बोलना सीखें!',
    colorScheme: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      accent: 'text-rose-800',
    },
    words: [
      {
        english: 'Mother',
        hindiPronunciation: 'मदर',
        hindiMeaning: 'मेरी प्यारी माँ ❤️',
        emoji: '❤️',
        soundFun: 'मदर',
      },
      {
        english: 'Father',
        hindiPronunciation: 'फ़ादर',
        hindiMeaning: 'पापा 👨',
        emoji: '👨',
        soundFun: 'फ़ादर',
      },
      {
        english: 'Milk',
        hindiPronunciation: 'मिल्क',
        hindiMeaning: 'मीठा दूध 🥛',
        emoji: '🥛',
        soundFun: 'मिल्क',
      },
      {
        english: 'Water',
        hindiPronunciation: 'वॉटर',
        hindiMeaning: 'साफ़ पानी 💧',
        emoji: '💧',
        soundFun: 'वॉटर',
      },
      {
        english: 'Doll',
        hindiPronunciation: 'डॉल',
        hindiMeaning: 'गुड़िया 🧸',
        emoji: '🧸',
        soundFun: 'डॉल',
      },
      {
        english: 'Book',
        hindiPronunciation: 'बुक',
        hindiMeaning: 'किताब 📚',
        emoji: '📚',
        soundFun: 'बुक',
      },
    ],
    spellingGame: [
      {
        promptEmoji: '🥛',
        promptHindi: 'दूध (मिल्क)',
        targetWord: 'MILK',
        hindiPronunciation: 'मिल्क',
        hintLetters: ['M', 'I', 'L', 'K', 'T', 'O'],
      },
      {
        promptEmoji: '📚',
        promptHindi: 'किताब (बुक)',
        targetWord: 'BOOK',
        hindiPronunciation: 'बुक',
        hintLetters: ['B', 'O', 'O', 'K', 'L', 'P'],
      },
      {
        promptEmoji: '💧',
        promptHindi: 'पानी (वॉटर)',
        targetWord: 'WATER',
        hindiPronunciation: 'वॉटर',
        hintLetters: ['W', 'A', 'T', 'E', 'R', 'S'],
      },
    ],
    speakingPrompt: {
      phrase: 'I drink warm milk every day.',
      hindiPronunciation: 'आई ड्रिंक वॉर्म मिल्क एव्री डे।',
      hindiMeaning: 'मैं रोज़ाना गरम दूध पीता हूँ।',
      kidPraise: 'लाजवाब! आप तो बड़े होकर खूब अंग्रेज़ी बोलेंगे!',
    },
    starQuiz: [
      {
        question: 'दूध को अंग्रेज़ी में क्या कहते हैं?',
        emoji: '🥛',
        options: ['Water', 'Milk (मिल्क)', 'Juice'],
        correctIndex: 1,
        funExplanation: 'शाबाश! Milk मतलब दूध होता है जो ताकत देता है!',
      },
      {
        question: 'माँ को प्यार से क्या बोलते हैं?',
        emoji: '❤️',
        options: ['Mother (मदर)', 'Sister', 'Friend'],
        correctIndex: 0,
        funExplanation: 'बिल्कुल सही! Mother मतलब माँ होता है!',
      },
    ],
  },

  // STAGE 5: वाक्य की रेलगाड़ी (Sentence Train Game)
  {
    stageNumber: 5,
    badge: 'पड़ाव 5',
    titleHindi: 'वाक्य की रेलगाड़ी (Sentence Train)',
    titleEnglish: 'Sentence Train Game',
    kidTagline: 'इंजन और डिब्बे जोड़ो, पूरा वाक्य बनाओ!',
    guruTeacherMessage:
      'सोचो कि एक वाक्य एक छुक-छुक रेलगाड़ी है! इंजन है "कौन?" (I / He / Ram)। पहला डिब्बा है "क्या काम कर रहा है?" (plays / eats / drinks)। और दूसरा डिब्बा है "किस चीज़ के साथ?" (football / milk / an apple)। तीनों डिब्बे जुड़ते ही गाड़ी चल पड़ती है!',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      accent: 'text-blue-800',
    },
    words: [
      {
        english: 'I play football.',
        hindiPronunciation: 'आई प्ले फ़ुटबॉल।',
        hindiMeaning: 'मैं फ़ुटबॉल खेलता हूँ। ⚽',
        emoji: '⚽',
        soundFun: 'I + play + football',
      },
      {
        english: 'I eat an apple.',
        hindiPronunciation: 'आई ईट ऐन ऐपल।',
        hindiMeaning: 'मैं सेब खाता हूँ। 🍎',
        emoji: '🍎',
        soundFun: 'I + eat + an apple',
      },
      {
        english: 'My cat drinks milk.',
        hindiPronunciation: 'माई कैट ड्रिंक्स मिल्क।',
        hindiMeaning: 'मेरी बिल्ली दूध पीती है। 🐱',
        emoji: '🐱',
        soundFun: 'My cat + drinks + milk',
      },
      {
        english: 'I love my family.',
        hindiPronunciation: 'आई लव माई फ़ैमिली।',
        hindiMeaning: 'मुझे अपने परिवार से प्यार है। ❤️',
        emoji: '❤️',
        soundFun: 'I + love + my family',
      },
    ],
    sentenceTrain: {
      engine: ['I (मैं)', 'He (वह लड़का)', 'My cat (मेरी बिल्ली)'],
      wagonAction: ['drinks (पीती है)', 'eats (खाता है)', 'likes (पसंद करता है)'],
      wagonObject: ['warm milk (गरम दूध)', 'sweet apples (मीठे सेब)', 'toys (खिलौने)'],
      correctExamples: [
        {
          en: 'I drink milk.',
          hi: 'मैं दूध पीता हूँ।',
          pronunciation: 'आई ड्रिंक मिल्क।',
        },
        {
          en: 'He eats an apple.',
          hi: 'वह सेब खाता है।',
          pronunciation: 'ही ईट्स ऐन ऐपल।',
        },
        {
          en: 'My cat plays with a ball.',
          hi: 'मेरी बिल्ली गेंद से खेलती है।',
          pronunciation: 'माई कैट प्लेज़ विद अ बॉल।',
        },
      ],
    },
    spellingGame: [
      {
        promptEmoji: '⚽',
        promptHindi: 'खेलना (P-L-A-Y)',
        targetWord: 'PLAY',
        hindiPronunciation: 'प्ले',
        hintLetters: ['P', 'L', 'A', 'Y', 'S', 'T'],
      },
      {
        promptEmoji: '🍎',
        promptHindi: 'खाना (E-A-T)',
        targetWord: 'EAT',
        hindiPronunciation: 'ईट',
        hintLetters: ['E', 'A', 'T', 'O', 'M'],
      },
    ],
    speakingPrompt: {
      phrase: 'I play with my ball and I am very happy.',
      hindiPronunciation: 'आई प्ले विद माई बॉल ऐंड आई ऐम वेरी हैप्पी।',
      hindiMeaning: 'मैं अपनी गेंद से खेलता हूँ और बहुत खुश हूँ।',
      kidPraise: 'शानदार! आपने पूरा बड़ा वाक्य बोल दिया!',
    },
    starQuiz: [
      {
        question: '"I eat food" में काम (Verb) कौन सा शब्द है?',
        emoji: '🍽️',
        options: ['I (मैं)', 'eat (खाना)', 'food (भोजन)'],
        correctIndex: 1,
        funExplanation: 'बिल्कुल सही! "Eat" का मतलब खाना (काम/क्रिया) होता है!',
      },
      {
        question: 'वाक्य की रेलगाड़ी में सबसे आगे कौन आता है?',
        emoji: '🚂',
        options: ['काम करने वाला (Subject जैसे I या He)', 'डिब्बे', 'फुल स्टॉप'],
        correctIndex: 0,
        funExplanation: 'शाबाश! इंजन सबसे आगे होता है — यानी Subject (I / He / Ram)!',
      },
    ],
  },

  // STAGE 6: प्यारी कहानियाँ (Kid Story Time)
  {
    stageNumber: 6,
    badge: 'पड़ाव 6',
    titleHindi: 'कहानियों का जादुई संसार',
    titleEnglish: 'Magic Bedtime & Animal Stories',
    kidTagline: 'प्यारी कहानियाँ सुनो और नई बातें सीखो!',
    guruTeacherMessage:
      'कहानी सुनना सबको अच्छा लगता है! इस पड़ाव में हम प्यारी-प्यारी छोटी कहानियाँ एक-एक लाइन करके सुनेंगे। हर लाइन का हिंदी अर्थ समझेंगे और कहानी से सीख लेंगे!',
    colorScheme: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      accent: 'text-indigo-800',
    },
    words: [
      {
        english: 'Lion',
        hindiPronunciation: 'लायन',
        hindiMeaning: 'जंगल का राजा शेर 🦁',
        emoji: '🦁',
        soundFun: 'लायन',
      },
      {
        english: 'Mouse',
        hindiPronunciation: 'माउस',
        hindiMeaning: 'नन्हा चूहा 🐭',
        emoji: '🐭',
        soundFun: 'माउस',
      },
      {
        english: 'Tree',
        hindiPronunciation: 'ट्री',
        hindiMeaning: 'हरा-भरा पेड़ 🌳',
        emoji: '🌳',
        soundFun: 'ट्री',
      },
      {
        english: 'Kind',
        hindiPronunciation: 'काइंड',
        hindiMeaning: 'दयालु ❤️',
        emoji: '❤️',
        soundFun: 'काइंड',
      },
    ],
    story: {
      title: 'The Lion and the Tiny Mouse',
      titleHindi: 'शेर और नन्हा चूहा',
      lines: [
        {
          en: 'A big lion was sleeping under a tree.',
          hi: 'एक बड़ा शेर पेड़ के नीचे सो रहा था।',
          pronunciation: 'अ बिग लायन वॉज़ स्लीपिंग अंडर अ ट्री।',
        },
        {
          en: 'A tiny mouse came and played on his nose.',
          hi: 'एक नन्हा चूहा आया और उसकी नाक पर खेलने लगा।',
          pronunciation: 'अ टाइनी माउस केम ऐंड प्लेड ऑन हिज़ नोज़।',
        },
        {
          en: 'The lion woke up with a big roar!',
          hi: 'शेर जोर की दहाड़ के साथ जाग गया!',
          pronunciation: 'द लायन वोक अप विद अ बिग रोर!',
        },
        {
          en: 'The tiny mouse said: "Please forgive me, I will help you one day!"',
          hi: 'चूहा बोला: "कृपया मुझे छोड़ दो, मैं एक दिन आपकी मदद करूँगा!"',
          pronunciation: 'द टाइनी माउस सेड: "प्लीज़ फ़ॉरगिव मी, आई विल हेल्प यू वन डे!"',
        },
        {
          en: 'The kind lion laughed and let the mouse go.',
          hi: 'दयालु शेर हँसा और उसने चूहे को जाने दिया।',
          pronunciation: 'द काइंड लायन लाफ़्ड ऐंड लेट द माउस गो।',
        },
        {
          en: 'Soon, the lion was caught in a hunter\'s net.',
          hi: 'कुछ दिनों बाद, शेर शिकारी के जाल में फँस गया।',
          pronunciation: 'सून, द लायन वॉज़ कॉट इन अ हंटर्स नेट।',
        },
        {
          en: 'The brave little mouse chewed the net with his sharp teeth.',
          hi: 'नन्हे बहादुर चूहे ने अपने तेज़ दाँतों से जाल काट दिया।',
          pronunciation: 'द ब्रेव लिटिल माउस च्यूड द नेट विद हिज़ शार्प टीथ।',
        },
        {
          en: 'They became best friends forever!',
          hi: 'वे हमेशा के लिए पक्के दोस्त बन गए!',
          pronunciation: 'दे बिकेम बेस्ट फ़्रेंड्स फ़ॉरएवर!',
        },
      ],
      moralHindi: 'सीख: कोई भी छोटा या बड़ा नहीं होता; दयालुता का फल हमेशा मीठा होता है!',
    },
    spellingGame: [
      {
        promptEmoji: '🦁',
        promptHindi: 'शेर (लायन)',
        targetWord: 'LION',
        hindiPronunciation: 'लायन',
        hintLetters: ['L', 'I', 'O', 'N', 'T', 'G'],
      },
      {
        promptEmoji: '🐭',
        promptHindi: 'चूहा (माउस)',
        targetWord: 'MOUSE',
        hindiPronunciation: 'माउस',
        hintLetters: ['M', 'O', 'U', 'S', 'E', 'R'],
      },
    ],
    speakingPrompt: {
      phrase: 'A kind heart is the best heart.',
      hindiPronunciation: 'अ काइंड हार्ट इज़ द बेस्ट हार्ट।',
      hindiMeaning: 'एक दयालु दिल सबसे प्यारा दिल होता है।',
      kidPraise: 'अरे वाह! आपने तो इतनी सुंदर बात बोली!',
    },
    starQuiz: [
      {
        question: 'शेर को जाल से किसने बचाया?',
        emoji: '🐭',
        options: ['नन्हे चूहे (Mouse) ने', 'हाथी ने', 'बिल्ली ने'],
        correctIndex: 0,
        funExplanation: 'बिलकुल सही! नन्हे चूहे ने अपने दाँतों से जाल काटकर शेर को बचाया!',
      },
      {
        question: '"Tree" का हिंदी अर्थ क्या है?',
        emoji: '🌳',
        options: ['पेड़', 'घास', 'फूल'],
        correctIndex: 0,
        funExplanation: 'शाबाश! Tree का मतलब पेड़ होता है!',
      },
    ],
  },
];
