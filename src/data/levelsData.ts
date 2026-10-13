import { LevelData } from '../types';

export const LEVELS_DATA: LevelData[] = [
  // ===================== LEVEL 1 =====================
  {
    levelNumber: 1,
    titleHindi: 'अक्षर और उनकी आवाज़',
    titleEnglish: 'Letters & Phonics Foundation',
    shortDesc: 'A-Z अक्षर, Vowels vs Consonants, और अक्षरों की असली ध्वनि (Sound) की समझ।',
    teacherNoteHindi:
      'नमस्ते! अंग्रेज़ी सीखने का पहला नियम है — अक्षरों को केवल रटना नहीं, बल्कि उनकी आवाज़ (Sound) को पहचानना। जैसे "H" का नाम "एच" है, लेकिन जब हम "Hat" बोलते हैं तो आवाज़ "ह" (हैट) निकलती है। शांत मन से हर शब्द का हिंदी उच्चारण पढ़ें और ऑडियो सुनें!',
    lessons: [
      {
        id: 'l1-vowels',
        title: '5 Vowels (स्वर) की आवाज़ें',
        subtitleHindi: 'A, E, I, O, U — मुख्य ध्वनियाँ',
        explanationHindi:
          'अंग्रेज़ी के 26 अक्षरों में से 5 मुख्य स्वर हैं: A, E, I, O, U। ये कंठ से सीधी निकलने वाली आवाज़ें हैं।',
        items: [
          {
            english: 'Apple',
            hindiPronunciation: 'ऐपल',
            hindiMeaning: 'सेब',
            phoneticBreakdown: 'A = ऐ (/æ/)',
          },
          {
            english: 'Egg',
            hindiPronunciation: 'एग',
            hindiMeaning: 'अंडा',
            phoneticBreakdown: 'E = ए (/e/)',
          },
          {
            english: 'Ink',
            hindiPronunciation: 'इंक',
            hindiMeaning: 'स्याही',
            phoneticBreakdown: 'I = इ (/ɪ/)',
          },
          {
            english: 'Ox',
            hindiPronunciation: 'ऑक्स',
            hindiMeaning: 'बैल',
            phoneticBreakdown: 'O = ऑ (/ɒ/)',
          },
          {
            english: 'Sun',
            hindiPronunciation: 'सन',
            hindiMeaning: 'सूरज',
            phoneticBreakdown: 'U = अ (/ʌ/)',
          },
        ],
      },
      {
        id: 'l1-blends',
        title: 'दो अक्षरों की संयुक्त आवाज़ें (Digraphs)',
        subtitleHindi: 'Sh, Ch, Th, Ph की ध्वनियाँ',
        explanationHindi:
          'जब दो अक्षर मिलते हैं तो एक नई आवाज़ बनती है: Sh = श, Ch = च, Th = थ/द, Ph = फ़।',
        items: [
          {
            english: 'Ship',
            hindiPronunciation: 'शिप',
            hindiMeaning: 'पानी का जहाज़',
            phoneticBreakdown: 'Sh = श',
          },
          {
            english: 'Chair',
            hindiPronunciation: 'चेयर',
            hindiMeaning: 'कुर्सी',
            phoneticBreakdown: 'Ch = च',
          },
          {
            english: 'Think',
            hindiPronunciation: 'थिंक',
            hindiMeaning: 'सोचना',
            phoneticBreakdown: 'Th = थ',
          },
          {
            english: 'Phone',
            hindiPronunciation: 'फ़ोन',
            hindiMeaning: 'फ़ोन',
            phoneticBreakdown: 'Ph = फ़',
          },
        ],
      },
      {
        id: 'l1-silent',
        title: 'Silent Letters (शांत अक्षर)',
        subtitleHindi: 'जो लिखे जाते हैं पर बोले नहीं जाते',
        explanationHindi:
          'अंग्रेज़ी में कुछ अक्षर केवल स्पेलिंग में होते हैं, उच्चारण में नहीं बोले जाते। जैसे Knife में K शांत (silent) है।',
        items: [
          {
            english: 'Knife',
            hindiPronunciation: 'नाइफ़',
            hindiMeaning: 'चाकू (K साइलेंट है)',
            phoneticBreakdown: 'K शांत रहता है',
          },
          {
            english: 'Write',
            hindiPronunciation: 'राइट',
            hindiMeaning: 'लिखना (W साइलेंट है)',
            phoneticBreakdown: 'W शांत रहता है',
          },
          {
            english: 'Walk',
            hindiPronunciation: 'वॉक',
            hindiMeaning: 'चलना (L साइलेंट है)',
            phoneticBreakdown: 'L शांत रहता है',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w1-1',
        promptHindi: 'सेब के लिए अंग्रेज़ी शब्द टाइप करें (उच्चारण: ऐपल)',
        targetEnglish: 'Apple',
        hindiPronunciation: 'ऐपल',
        hint: 'A-P-P-L-E',
        type: 'word',
      },
      {
        id: 'w1-2',
        promptHindi: 'सूरज के लिए अंग्रेज़ी शब्द टाइप करें (उच्चारण: सन)',
        targetEnglish: 'Sun',
        hindiPronunciation: 'सन',
        hint: 'S-U-N',
        type: 'word',
      },
      {
        id: 'w1-3',
        promptHindi: 'चाकू के लिए अंग्रेज़ी शब्द लिखें (K साइलेंट है: नाइफ़)',
        targetEnglish: 'Knife',
        hindiPronunciation: 'नाइफ़',
        hint: 'K-N-I-F-E',
        type: 'word',
      },
    ],
    speakingDrill: {
      phrase: 'A is for Apple, S is for Sun.',
      hindiPronunciation: 'ए इज़ फ़ॉर ऐपल, एस इज़ फ़ॉर सन।',
      hindiMeaning: 'A से Apple (सेब), S से Sun (सूरज)।',
      tipsHindi: 'स्पष्ट आवाज़ में बोलें। "ऐपल" और "सन" की आवाज़ पर ध्यान दें।',
    },
    levelTest: [
      {
        id: 't1-1',
        questionHindi: '"Knife" का सही हिंदी उच्चारण क्या है?',
        options: ['कनाइफ', 'नाइफ़', 'कनीफ'],
        correctIndex: 1,
        explanationHindi:
          'अंग्रेज़ी में K के बाद n आने पर K साइलेंट (शांत) रहता है, इसलिए इसे "नाइफ़" पढ़ते हैं।',
      },
      {
        id: 't1-2',
        questionHindi: 'अंग्रेज़ी वर्णमाला में Vowels (स्वर) कितने होते हैं?',
        options: ['3', '5 (A, E, I, O, U)', '7'],
        correctIndex: 1,
        explanationHindi:
          'अंग्रेज़ी में कुल 5 Vowels होते हैं: A, E, I, O, U। बाकी 21 Consonants (व्यंजन) हैं।',
      },
      {
        id: 't1-3',
        questionHindi: '"Ship" में Sh का उच्चारण किस हिंदी अक्षर के समान होता है?',
        options: ['स', 'श', 'च'],
        correctIndex: 1,
        explanationHindi:
          'S और H मिलकर "Sh" ध्वनि बनाते हैं जो हिंदी के "श" (तालव्य श) जैसी होती है (Ship = शिप)।',
      },
    ],
  },

  // ===================== LEVEL 2 =====================
  {
    levelNumber: 2,
    titleHindi: 'आसान शब्द पढ़ना',
    titleEnglish: 'Word Blending & Patterns',
    shortDesc: '2-3 अक्षरों के शब्द, Blending ध्वनि जोड़ना, और शब्द परिवार (-at, -an, -ug)।',
    teacherNoteHindi:
      'बधाई हो, आपने लेवल 1 पूरा किया! अब हम अक्षरों की आवाज़ों को जोड़कर शब्द बनाना सीखेंगे। इसे "Blending" कहते हैं। जैसे C (क) + A (ऐ) + T (ट) = CAT (कैट)। छोटे शब्दों को ज़ोर से बोलकर अभ्यास करें!',
    lessons: [
      {
        id: 'l2-short-words',
        title: '2-3 अक्षरों वाले मूलभूत शब्द',
        subtitleHindi: 'रोज़ काम आने वाले छोटे शब्द',
        explanationHindi:
          'इन छोटे शब्दों से हर अंग्रेज़ी वाक्य की शुरुआत होती है। इनके हिंदी अर्थ और उच्चारण को कंठस्थ करें।',
        items: [
          {
            english: 'Am',
            hindiPronunciation: 'ऐम',
            hindiMeaning: 'हूँ (जैसे: I am = मैं हूँ)',
          },
          {
            english: 'In',
            hindiPronunciation: 'इन',
            hindiMeaning: 'अंदर / में',
          },
          {
            english: 'On',
            hindiPronunciation: 'ऑन',
            hindiMeaning: 'ऊपर / पर',
          },
          {
            english: 'Pen',
            hindiPronunciation: 'पेन',
            hindiMeaning: 'कलम',
          },
          {
            english: 'Cup',
            hindiPronunciation: 'कप',
            hindiMeaning: 'प्याला / चाय का कप',
          },
        ],
      },
      {
        id: 'l2-word-families',
        title: 'Word Patterns (-at, -an, -ug परिवार)',
        subtitleHindi: 'समान ध्वनि वाले शब्द',
        explanationHindi:
          'एक जैसे अंतिम अक्षरों वाले शब्दों का उच्चारण बहुत आसान होता है। एक पैटर्न सीखें और 5 नए शब्द अपने आप बोलें!',
        items: [
          {
            english: 'Cat',
            hindiPronunciation: 'कैट',
            hindiMeaning: 'बिल्ली (C-at)',
          },
          {
            english: 'Bat',
            hindiPronunciation: 'बैट',
            hindiMeaning: 'बल्ला (B-at)',
          },
          {
            english: 'Fan',
            hindiPronunciation: 'फ़ैन',
            hindiMeaning: 'पंखा (F-an)',
          },
          {
            english: 'Van',
            hindiPronunciation: 'वैन',
            hindiMeaning: 'गाड़ी (V-an)',
          },
          {
            english: 'Mug',
            hindiPronunciation: 'मग',
            hindiMeaning: 'बड़ा कप / मग (M-ug)',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w2-1',
        promptHindi: 'बिल्ली के लिए अंग्रेज़ी शब्द टाइप करें (उच्चारण: कैट)',
        targetEnglish: 'Cat',
        hindiPronunciation: 'कैट',
        hint: 'C-A-T',
        type: 'word',
      },
      {
        id: 'w2-2',
        promptHindi: 'कलम के लिए अंग्रेज़ी शब्द टाइप करें (उच्चारण: पेन)',
        targetEnglish: 'Pen',
        hindiPronunciation: 'पेन',
        hint: 'P-E-N',
        type: 'word',
      },
      {
        id: 'w2-3',
        promptHindi: 'पंखा के लिए अंग्रेज़ी शब्द टाइप करें (उच्चारण: फ़ैन)',
        targetEnglish: 'Fan',
        hindiPronunciation: 'फ़ैन',
        hint: 'F-A-N',
        type: 'word',
      },
    ],
    speakingDrill: {
      phrase: 'A cat and a pen.',
      hindiPronunciation: 'अ कैट ऐंड अ पेन।',
      hindiMeaning: 'एक बिल्ली और एक कलम।',
      tipsHindi: 'धीमी और साफ़ आवाज़ में बोलें। "कैट" और "पेन" को स्पष्ट रखें।',
    },
    levelTest: [
      {
        id: 't2-1',
        questionHindi: 'अक्षरों C + A + T को मिलाकर कौन सा शब्द बनता है?',
        options: ['Cot (कॉट)', 'Cat (कैट)', 'Cut (कट)'],
        correctIndex: 1,
        explanationHindi:
          'C की ध्वनि "क", A की ध्वनि "ऐ", और T की ध्वनि "ट" मिलकर CAT (कैट) बनाते हैं।',
      },
      {
        id: 't2-2',
        questionHindi: '"On" का हिंदी अर्थ क्या है?',
        options: ['अंदर', 'पर / ऊपर', 'नीचे'],
        correctIndex: 1,
        explanationHindi:
          '"On" का अर्थ किसी सतह के ऊपर या पर होता है (जैसे: On the table = मेज़ पर)।',
      },
      {
        id: 't2-3',
        questionHindi: '-an परिवार का शब्द कौन सा है?',
        options: ['Fan (फ़ैन)', 'Mug (मग)', 'Bat (बैट)'],
        correctIndex: 0,
        explanationHindi:
          'Fan (फ़ैन) के अंत में "an" ध्वनि आती है (F + an = Fan)।',
      },
    ],
  },

  // ===================== LEVEL 3 =====================
  {
    levelNumber: 3,
    titleHindi: 'Spelling और लिखना',
    titleEnglish: 'Spelling Mastery & Dictation',
    shortDesc: 'Dictation (सुनकर लिखना), Missing Letters, और आम स्पेलिंग की गलतियों का सुधार।',
    teacherNoteHindi:
      'बहुत से लोग बोलते तो अच्छा हैं, लेकिन लिखते समय स्पेलिंग गलत कर देते हैं (जैसे Friend की जगह Frend)। इस लेवल में हम सही स्पेलिंग याद करने के नियम सीखेंगे और सुनकर टाइप करने का अभ्यास करेंगे!',
    lessons: [
      {
        id: 'l3-rules',
        title: 'स्पेलिंग के मुख्य नियम (Spelling Traps)',
        subtitleHindi: 'Frend नहीं, Friend लिखें!',
        explanationHindi:
          'अंग्रेज़ी में कुछ शब्द बार-बार गलत लिखे जाते हैं। इनके नियमों को एक बार समझ लें तो कभी गलती नहीं होगी।',
        items: [
          {
            english: 'Friend',
            hindiPronunciation: 'फ़्रेंड',
            hindiMeaning: 'दोस्त (i before e नियम: F-R-I-E-N-D)',
          },
          {
            english: 'Tomorrow',
            hindiPronunciation: 'टुमॉरो',
            hindiMeaning: 'आने वाला कल (एक M, दो R: T-O-M-O-R-R-O-W)',
          },
          {
            english: 'Because',
            hindiPronunciation: 'बिकॉज़',
            hindiMeaning: 'क्योंकि (B-E-C-A-U-S-E)',
          },
          {
            english: 'Receive',
            hindiPronunciation: 'रिसीव',
            hindiMeaning: 'प्राप्त करना (C के बाद EI आता है: R-E-C-E-I-V-E)',
          },
        ],
      },
      {
        id: 'l3-missing-patterns',
        title: 'Missing Letters पैटर्न',
        subtitleHindi: 'खाली जगह भरकर सही हिज्जे बनाना',
        explanationHindi:
          'शब्दों में स्वर (Vowels) को पहचानना सीखें ताकि लिखते समय कोई अक्षर छूटे नहीं।',
        items: [
          {
            english: 'Book',
            hindiPronunciation: 'बुक',
            hindiMeaning: 'किताब (B-O-O-K)',
          },
          {
            english: 'School',
            hindiPronunciation: 'स्कूल',
            hindiMeaning: 'विद्यालय (S-C-H-O-O-L)',
          },
          {
            english: 'Water',
            hindiPronunciation: 'वॉटर',
            hindiMeaning: 'पानी (W-A-T-E-R)',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w3-1',
        promptHindi: 'दोस्त की सही स्पेलिंग टाइप करें (Frend नहीं):',
        targetEnglish: 'Friend',
        hindiPronunciation: 'फ़्रेंड',
        hint: 'F-R-I-E-N-D',
        type: 'spelling_fix',
      },
      {
        id: 'w3-2',
        promptHindi: 'किताब की स्पेलिंग लिखें (B _ _ K):',
        targetEnglish: 'Book',
        hindiPronunciation: 'बुक',
        hint: 'B-O-O-K',
        type: 'missing_letter',
      },
      {
        id: 'w3-3',
        promptHindi: 'विद्यालय के लिए शब्द टाइप करें:',
        targetEnglish: 'School',
        hindiPronunciation: 'स्कूल',
        hint: 'S-C-H-O-O-L',
        type: 'word',
      },
    ],
    speakingDrill: {
      phrase: 'He is my best friend.',
      hindiPronunciation: 'ही इज़ माई बेस्ट फ़्रेंड।',
      hindiMeaning: 'वह मेरा सबसे अच्छा दोस्त है।',
      tipsHindi: '"Friend" को साफ़ "फ़्रेंड" बोलें, "फ़्रिंड" नहीं।',
    },
    levelTest: [
      {
        id: 't3-1',
        questionHindi: '"दोस्त" के लिए कौन सी स्पेलिंग सही है?',
        options: ['Frend', 'Friend', 'Freind'],
        correctIndex: 1,
        explanationHindi:
          'नियम "i before e" के अनुसार सही स्पेलिंग F-R-I-E-N-D (Friend) है।',
      },
      {
        id: 't3-2',
        questionHindi: '"Tomorrow" (आने वाला कल) में कितने M और R होते हैं?',
        options: ['दो M और एक R', 'एक M और दो R (Tomorrow)', 'दो M और दो R'],
        correctIndex: 1,
        explanationHindi:
          'Tomorrow में केवल एक M और दो R होते हैं: T-O-M-O-R-R-O-W।',
      },
      {
        id: 't3-3',
        questionHindi: 'B _ _ K में खाली जगह में कौन से अक्षर आएंगे?',
        options: ['EE (BEEK)', 'OO (BOOK)', 'AA (BAAK)'],
        correctIndex: 1,
        explanationHindi:
          'किताब के लिए सही स्पेलिंग B-O-O-K (बुक) है।',
      },
    ],
  },

  // ===================== LEVEL 4 =====================
  {
    levelNumber: 4,
    titleHindi: 'शब्द और रोज़मर्रा के वाक्य',
    titleEnglish: 'Daily Vocabulary & Phrases',
    shortDesc: 'परिवार, घर, खाना, समय और बाजार के ज़रूरी शब्द और छोटे व्यावहारिक वाक्य।',
    teacherNoteHindi:
      'अब हम ऐसे शब्द सीखेंगे जो हम हर रोज़ घर, बाज़ार और काम पर इस्तेमाल करते हैं। हर शब्द का हिंदी अर्थ और सटीक हिंदी उच्चारण याद करें, फिर दिए गए छोटे वाक्य को टाइप करके देखें!',
    lessons: [
      {
        id: 'l4-family-home',
        title: 'परिवार और घर (Family & Home)',
        subtitleHindi: 'रोज़मर्रा के रिश्ते और घर की चीज़ें',
        explanationHindi:
          'ये शब्द आपके रोज़ के वार्तालाप की बुनियाद हैं।',
        items: [
          {
            english: 'Mother',
            hindiPronunciation: 'मदर',
            hindiMeaning: 'माँ / माताजी',
          },
          {
            english: 'Father',
            hindiPronunciation: 'फ़ादर',
            hindiMeaning: 'पिताजी',
          },
          {
            english: 'Kitchen',
            hindiPronunciation: 'किचन',
            hindiMeaning: 'रसोईघर',
          },
          {
            english: 'Water',
            hindiPronunciation: 'वॉटर',
            hindiMeaning: 'पानी',
          },
        ],
      },
      {
        id: 'l4-daily-phrases',
        title: 'रोज़ काम आने वाले छोटे वाक्य',
        subtitleHindi: 'घर और बाज़ार में तुरंत बोलने वाले वाक्य',
        explanationHindi:
          'पूरे बड़े व्याकरण के नियमों में उलझे बिना इन छोटे वाक्यों को याद रखें।',
        items: [
          {
            english: 'I need water.',
            hindiPronunciation: 'आई नीड वॉटर।',
            hindiMeaning: 'मुझे पानी चाहिए।',
          },
          {
            english: 'Good morning.',
            hindiPronunciation: 'गुड मॉर्निंग।',
            hindiMeaning: 'शुभ प्रभात / नमस्ते।',
          },
          {
            english: 'How are you?',
            hindiPronunciation: 'हाउ आर यू?',
            hindiMeaning: 'आप कैसे हैं?',
          },
          {
            english: 'I am fine.',
            hindiPronunciation: 'आई ऐम फ़ाइन।',
            hindiMeaning: 'मैं ठीक हूँ।',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w4-1',
        promptHindi: '"मुझे पानी चाहिए" का अंग्रेज़ी वाक्य टाइप करें:',
        targetEnglish: 'I need water.',
        hindiPronunciation: 'आई नीड वॉटर।',
        hint: 'I need water.',
        type: 'sentence',
      },
      {
        id: 'w4-2',
        promptHindi: '"आप कैसे हैं?" अंग्रेज़ी में टाइप करें:',
        targetEnglish: 'How are you?',
        hindiPronunciation: 'हाउ आर यू?',
        hint: 'How are you?',
        type: 'sentence',
      },
      {
        id: 'w4-3',
        promptHindi: 'रसोईघर के लिए अंग्रेज़ी शब्द लिखें (किचन):',
        targetEnglish: 'Kitchen',
        hindiPronunciation: 'किचन',
        hint: 'K-I-T-C-H-E-N',
        type: 'word',
      },
    ],
    speakingDrill: {
      phrase: 'Good morning, I need water.',
      hindiPronunciation: 'गुड मॉर्निंग, आई नीड वॉटर।',
      hindiMeaning: 'शुभ प्रभात, मुझे पानी चाहिए।',
      tipsHindi: 'मुस्कुराकर आत्मविश्वास के साथ बोलें।',
    },
    levelTest: [
      {
        id: 't4-1',
        questionHindi: '"I need water" का सही हिंदी अर्थ क्या है?',
        options: ['मैं पानी पी रहा हूँ', 'मुझे पानी चाहिए', 'पानी ठंडा है'],
        correctIndex: 1,
        explanationHindi:
          '"Need" का अर्थ ज़रूरत या चाहिए होता है, इसलिए "I need water" = मुझे पानी चाहिए।',
      },
      {
        id: 't4-2',
        questionHindi: 'किसी से मिलने पर "आप कैसे हैं?" पूछने के लिए क्या कहेंगे?',
        options: ['Where are you?', 'How are you?', 'Who are you?'],
        correctIndex: 1,
        explanationHindi:
          '"How are you?" का अर्थ "आप कैसे हैं?" होता है।',
      },
      {
        id: 't4-3',
        questionHindi: '"Mother" का सही उच्चारण क्या है?',
        options: ['मोदर', 'मदर', 'माथर'],
        correctIndex: 1,
        explanationHindi:
          '"Mother" का सही उच्चारण "मदर" होता है।',
      },
    ],
  },

  // ===================== LEVEL 5 =====================
  {
    levelNumber: 5,
    titleHindi: 'Grammar और वाक्य बनाना',
    titleEnglish: 'Grammar Rules & S+V+O Structure',
    shortDesc: 'Subject + Verb + Object नियम, Is/Am/Are, Has/Have और नकारात्मक वाक्य।',
    teacherNoteHindi:
      'यह बहुत महत्वपूर्ण स्तर है! हिंदी में हम कहते हैं "मैं (Subject) खाना (Object) खाता हूँ (Verb)"। लेकिन अंग्रेज़ी में क्रम बदल जाता है: "Subject + Verb + Object" (I eat food)। यानी काम (Verb) हमेशा बीच में आता है!',
    lessons: [
      {
        id: 'l5-svo',
        title: 'वाक्य का स्वर्ण नियम (Subject + Verb + Object)',
        subtitleHindi: 'अंग्रेज़ी वाक्य बनाने का सीधा फ़ॉर्मूला',
        explanationHindi:
          '1. Subject (काम करने वाला) + 2. Verb (काम / क्रिया) + 3. Object (जिस पर काम हुआ)।',
        items: [
          {
            english: 'I eat food.',
            hindiPronunciation: 'आई ईट फ़ूड।',
            hindiMeaning: 'मैं खाना खाता हूँ। (I = Subject, Eat = Verb, Food = Object)',
          },
          {
            english: 'She reads books.',
            hindiPronunciation: 'शी रीड्स बुक्स।',
            hindiMeaning: 'वह किताबें पढ़ती है। (She एकवचन है, इसलिए Verb में s लगा)',
          },
          {
            english: 'They play cricket.',
            hindiPronunciation: 'दे प्ले क्रिकेट।',
            hindiMeaning: 'वे क्रिकेट खेलते हैं।',
          },
        ],
      },
      {
        id: 'l5-helping-verbs',
        title: 'Helping Verbs (Is, Am, Are & Has, Have)',
        subtitleHindi: 'सहायक क्रियाओं का सटीक प्रयोग',
        explanationHindi:
          'I के साथ हमेशा Am; He/She/It के साथ Is; You/We/They के साथ Are। किसी चीज़ के पास होने पर Singular के साथ Has, Plural/I के साथ Have।',
        items: [
          {
            english: 'I am happy.',
            hindiPronunciation: 'आई ऐम हैप्पी।',
            hindiMeaning: 'मैं खुश हूँ। (I के साथ am)',
          },
          {
            english: 'He is a doctor.',
            hindiPronunciation: 'ही इज़ अ डॉक्टर।',
            hindiMeaning: 'वह एक डॉक्टर है। (He के साथ is)',
          },
          {
            english: 'She has a car.',
            hindiPronunciation: 'शी हैज़ अ कार।',
            hindiMeaning: 'उसके पास एक कार है। (She के साथ has)',
          },
          {
            english: 'I do not know.',
            hindiPronunciation: 'आई डू नॉट नो।',
            hindiMeaning: 'मुझे नहीं पता। (नकारात्मक वाक्य)',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w5-1',
        promptHindi: '"मैं खुश हूँ" अंग्रेज़ी में टाइप करें (I के साथ am):',
        targetEnglish: 'I am happy.',
        hindiPronunciation: 'आई ऐम हैप्पी।',
        hint: 'I am happy.',
        type: 'sentence',
      },
      {
        id: 'w5-2',
        promptHindi: '"मुझे नहीं पता" अंग्रेज़ी में टाइप करें:',
        targetEnglish: 'I do not know.',
        hindiPronunciation: 'आई डू नॉट नो।',
        hint: 'I do not know.',
        type: 'sentence',
      },
      {
        id: 'w5-3',
        promptHindi: '"मेरे पास एक किताब है" टाइप करें (I have a book):',
        targetEnglish: 'I have a book.',
        hindiPronunciation: 'आई हैव अ बुक।',
        hint: 'I have a book.',
        type: 'sentence',
      },
    ],
    speakingDrill: {
      phrase: 'I am happy and I have a book.',
      hindiPronunciation: 'आई ऐम हैप्पी ऐंड आई हैव अ बुक।',
      hindiMeaning: 'मैं खुश हूँ और मेरे पास एक किताब है।',
      tipsHindi: '"Have" और "Happy" में "ह" की ध्वनि साफ़ निकालें।',
    },
    levelTest: [
      {
        id: 't5-1',
        questionHindi: 'अंग्रेज़ी वाक्य का सही क्रम क्या है?',
        options: [
          'Subject + Object + Verb (हिंदी क्रम)',
          'Subject + Verb + Object (S+V+O)',
          'Verb + Subject + Object',
        ],
        correctIndex: 1,
        explanationHindi:
          'अंग्रेज़ी में हमेशा Subject के तुरंत बाद Verb (क्रिया) आती है, और अंत में Object आता है (जैसे: I eat food)।',
      },
      {
        id: 't5-2',
        questionHindi: '"She ______ a new phone." में सही Helping Verb क्या आएगी?',
        options: ['have', 'has', 'are'],
        correctIndex: 1,
        explanationHindi:
          'She (तीसरा व्यक्ति एकवचन) के साथ हमेशा "has" आता है, "have" नहीं।',
      },
      {
        id: 't5-3',
        questionHindi: '"I is a student" में क्या गलती है?',
        options: [
          'कोई गलती नहीं है',
          'I के साथ हमेशा "am" आता है (I am a student)',
          'Student के आगे the आना चाहिए',
        ],
        correctIndex: 1,
        explanationHindi:
          'I के साथ वर्तमान काल में हमेशा "am" आता है, "is" कभी नहीं आता।',
      },
    ],
  },

  // ===================== LEVEL 6 =====================
  {
    levelNumber: 6,
    titleHindi: 'Paragraph पढ़ना और समझना',
    titleEnglish: 'Reading Passages & Comprehension',
    shortDesc: 'आसान कहानियाँ, एक-एक वाक्य का हिंदी अर्थ, और पढ़कर सवालों के जवाब देना।',
    teacherNoteHindi:
      'शाबाश! अब आप पूरे पैराग्राफ पढ़ने के स्तर पर आ चुके हैं। घबराएं नहीं — एक-एक वाक्य को धीरे-धीरे पढ़ें, उसका हिंदी उच्चारण और अर्थ देखें, और फिर उस पर पूछे गए प्रश्नों का उत्तर दें!',
    lessons: [
      {
        id: 'l6-story-farmer',
        title: 'कहानी 1: गाँव की एक सुनहरी सुबह (A Morning in the Village)',
        subtitleHindi: 'आसान ग्रामीण जीवन का वर्णन',
        explanationHindi:
          'प्रत्येक वाक्य को बोलकर पढ़ें और उसके नीचे दिए गए हिंदी अनुवाद से मिलान करें।',
        items: [
          {
            english: 'The sun rises in the east.',
            hindiPronunciation: 'द सन राइज़ेस इन द ईस्ट।',
            hindiMeaning: 'सूरज पूरब में उगता है।',
          },
          {
            english: 'Ramesh is a kind farmer.',
            hindiPronunciation: 'रमेश इज़ अ काइंड फ़ार्मर।',
            hindiMeaning: 'रमेश एक दयालु किसान है।',
          },
          {
            english: 'He wakes up early every morning.',
            hindiPronunciation: 'ही वेक्स अप अर्ली एव्री मॉर्निंग।',
            hindiMeaning: 'वह हर सुबह जल्दी उठता है।',
          },
          {
            english: 'He works hard in his green field.',
            hindiPronunciation: 'ही वर्क्स हार्ड इन हिज़ ग्रीन फ़ील्ड।',
            hindiMeaning: 'वह अपने हरे-भरे खेत में कड़ी मेहनत करता है।',
          },
        ],
      },
      {
        id: 'l6-story-job',
        title: 'कहानी 2: नई नौकरी का पहला दिन (My First Day at Job)',
        subtitleHindi: 'दफ्तर का माहौल और बातचीत',
        explanationHindi:
          'दफ्तर और कामकाज में उपयोग होने वाले सरल वाक्य।',
        items: [
          {
            english: 'Today was my first day at the office.',
            hindiPronunciation: 'टुडे वॉज़ माई फ़र्स्ट डे ऐट द ऑफ़िस।',
            hindiMeaning: 'आज दफ्तर में मेरा पहला दिन था।',
          },
          {
            english: 'My manager welcomed me with a smile.',
            hindiPronunciation: 'माई मैनेजर वेलकमड मी विद अ स्माइल।',
            hindiMeaning: 'मेरे मैनेजर ने मुस्कान के साथ मेरा स्वागत किया।',
          },
          {
            english: 'I learned how to send emails in English.',
            hindiPronunciation: 'आई लर्नड हाउ टू सेंड ईमेल्स इन इंग्लिश।',
            hindiMeaning: 'मैंने सीखा कि अंग्रेज़ी में ईमेल कैसे भेजते हैं।',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w6-1',
        promptHindi: '"सूरज पूरब में उगता है" अंग्रेज़ी में टाइप करें:',
        targetEnglish: 'The sun rises in the east.',
        hindiPronunciation: 'द सन राइज़ेस इन द ईस्ट।',
        hint: 'The sun rises in the east.',
        type: 'sentence',
      },
      {
        id: 'w6-2',
        promptHindi: '"रमेश एक दयालु किसान है" टाइप करें:',
        targetEnglish: 'Ramesh is a kind farmer.',
        hindiPronunciation: 'रमेश इज़ अ काइंड फ़ार्मर।',
        hint: 'Ramesh is a kind farmer.',
        type: 'sentence',
      },
    ],
    speakingDrill: {
      phrase: 'Ramesh is a hardworking farmer.',
      hindiPronunciation: 'रमेश इज़ अ हार्डवर्किंग फ़ार्मर।',
      hindiMeaning: 'रमेश एक मेहनती किसान है।',
      tipsHindi: '"Hardworking" और "Farmer" का उच्चारण साफ़ करें।',
    },
    levelTest: [
      {
        id: 't6-1',
        questionHindi: 'कहानी के अनुसार, सूरज कहाँ उगता है?',
        options: ['In the west (पश्चिम में)', 'In the east (पूरब में)', 'In the north (उत्तर में)'],
        correctIndex: 1,
        explanationHindi:
          'वाक्य था: "The sun rises in the east." यानी सूरज पूरब में उगता है।',
      },
      {
        id: 't6-2',
        questionHindi: 'रमेश क्या काम करता है?',
        options: ['Doctor (चिकित्सक)', 'Farmer (किसान)', 'Driver (चालक)'],
        correctIndex: 1,
        explanationHindi:
          'वाक्य था: "Ramesh is a kind farmer." यानी रमेश एक किसान है।',
      },
      {
        id: 't6-3',
        questionHindi: '"My manager welcomed me with a smile" का क्या अर्थ है?',
        options: [
          'मैनेजर ने मुझे डांटा',
          'मैनेजर ने मुस्कान के साथ मेरा स्वागत किया',
          'मैनेजर छुट्टी पर था',
        ],
        correctIndex: 1,
        explanationHindi:
          '"Welcomed with a smile" का अर्थ मुस्कान के साथ स्वागत करना होता है।',
      },
    ],
  },

  // ===================== LEVEL 7 =====================
  {
    levelNumber: 7,
    titleHindi: 'Listening और Speaking Lab',
    titleEnglish: 'Active Conversation & Voice Practice',
    shortDesc: 'अपना परिचय देना, बातचीत, और माइक से उच्चारण अभ्यास (अनुमानित मार्गदर्शन सहित)।',
    teacherNoteHindi:
      'अब आवाज़ खोलने का समय है! माइक बटन दबाकर बोलें। कृपया ध्यान रखें: माइक्रोफ़ोन से मिलने वाला प्रतिशत (Score) एक मार्गदर्शक अनुमान (Estimate) है। इंटरनेट, माइक की दूरी या परिवेश के शोर से स्कोर कम-ज़्यादा हो सकता है — इसे अंतिम निर्णय न मानें। मुख्य बात यह है कि आप बेझिझक बोल रहे हैं!',
    lessons: [
      {
        id: 'l7-self-intro',
        title: 'अपना परिचय देना (Self Introduction)',
        subtitleHindi: 'नाम, शहर और क्या करते हैं बताना',
        explanationHindi:
          'इंटरव्यू या किसी नए व्यक्ति से मिलते समय अपना परिचय कैसे दें:',
        items: [
          {
            english: 'Hello, my name is Rahul.',
            hindiPronunciation: 'हेलो, माई नेम इज़ राहुल।',
            hindiMeaning: 'नमस्ते, मेरा नाम राहुल है।',
          },
          {
            english: 'I live in Jaipur.',
            hindiPronunciation: 'आई लिव इन जयपुर।',
            hindiMeaning: 'मैं जयपुर में रहता हूँ।',
          },
          {
            english: 'I am learning English.',
            hindiPronunciation: 'आई ऐम लर्निंग इंग्लिश।',
            hindiMeaning: 'मैं अंग्रेज़ी सीख रहा हूँ।',
          },
        ],
      },
      {
        id: 'l7-daily-convo',
        title: 'दुकान या रास्ते में बातचीत (Practical Dialogue)',
        subtitleHindi: 'कीमत पूछना व मदद मांगना',
        explanationHindi:
          'बाज़ार में या स्टेशन पर अंग्रेज़ी में पूछने के लिए:',
        items: [
          {
            english: 'What is the price of this?',
            hindiPronunciation: 'व्हॉट इज़ द प्राइस ऑफ़ दिस?',
            hindiMeaning: 'इसकी क्या कीमत है?',
          },
          {
            english: 'Excuse me, can you help me?',
            hindiPronunciation: 'एक्सक्यूज़ मी, कैन यू हेल्प मी?',
            hindiMeaning: 'माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं?',
          },
          {
            english: 'Thank you very much.',
            hindiPronunciation: 'थैंक यू वेरी मच।',
            hindiMeaning: 'आपका बहुत-बहुत धन्यवाद।',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w7-1',
        promptHindi: '"मेरा नाम राहुल है" अंग्रेज़ी में टाइप करें:',
        targetEnglish: 'My name is Rahul.',
        hindiPronunciation: 'माई नेम इज़ राहुल।',
        hint: 'My name is Rahul.',
        type: 'sentence',
      },
      {
        id: 'w7-2',
        promptHindi: '"इसकी क्या कीमत है?" टाइप करें:',
        targetEnglish: 'What is the price of this?',
        hindiPronunciation: 'व्हॉट इज़ द प्राइस ऑफ़ दिस?',
        hint: 'What is the price of this?',
        type: 'sentence',
      },
    ],
    speakingDrill: {
      phrase: 'Hello, my name is Rahul and I live in Jaipur.',
      hindiPronunciation: 'हेलो, माई नेम इज़ राहुल ऐंड आई लिव इन जयपुर।',
      hindiMeaning: 'नमस्ते, मेरा नाम राहुल है और मैं जयपुर में रहता हूँ।',
      tipsHindi: 'धीमे और साफ़ बोलें। (माइक स्कोर केवल अभ्यास मार्गदर्शन के लिए है)',
    },
    levelTest: [
      {
        id: 't7-1',
        questionHindi: 'किसी से किसी चीज़ की कीमत पूछने के लिए कौन सा वाक्य सही है?',
        options: [
          'Where is this price?',
          'What is the price of this?',
          'Why is this price?',
        ],
        correctIndex: 1,
        explanationHindi:
          'कीमत पूछने के लिए सही प्रश्न "What is the price of this?" होता है।',
      },
      {
        id: 't7-2',
        questionHindi: '"Excuse me" का उपयोग हम कब करते हैं?',
        options: [
          'सोते समय',
          'विनम्रता से किसी का ध्यान खींचने या माफ़ी मांगने के लिए',
          'गुस्सा दिखाने के लिए',
        ],
        correctIndex: 1,
        explanationHindi:
          '"Excuse me" एक विनम्र शिष्टाचार शब्द है जिसका प्रयोग बातचीत शुरू करने या रास्ता मांगने में होता है।',
      },
      {
        id: 't7-3',
        questionHindi: '"I live in Delhi" का सही अर्थ क्या है?',
        options: ['मैं दिल्ली जा रहा हूँ', 'मैं दिल्ली में रहता हूँ', 'दिल्ली बहुत दूर है'],
        correctIndex: 1,
        explanationHindi:
          '"Live" का अर्थ रहना होता है, इसलिए वाक्य का अर्थ "मैं दिल्ली में रहता हूँ" है।',
      },
    ],
  },

  // ===================== LEVEL 8 =====================
  {
    levelNumber: 8,
    titleHindi: 'Revision और वास्तविक जीवन का अभ्यास',
    titleEnglish: 'Mastery, Review & Real Life Practice',
    shortDesc: 'पुरानी गलतियों का सुधार, 25-मिनट दैनिक रूटीन, और वास्तविक जीवन की चुनौतियाँ।',
    teacherNoteHindi:
      'हार्दिक बधाई! आप अंतिम स्तर (Level 8) पर पहुँच चुके हैं। अंग्रेज़ी में महारत हासिल करने का अंतिम रहस्य है — "नियमित दोहराव (Revision) और अपनी पुरानी गलतियों से सीखना"। यहाँ अपनी Mistake Notebook का रिविज़न करें और दैनिक 25-मिनट रूटीन का पालन करें!',
    lessons: [
      {
        id: 'l8-golden-review',
        title: '6-चरणीय गलती सुधार नियम (Mistake Fixer)',
        subtitleHindi: 'गलती को स्थाई ज्ञान में बदलना',
        explanationHindi:
          'हर गलती पर: 1. क्या लिखा → 2. सही उत्तर → 3. हिंदी में कारण → 4. आसान उदाहरण → 5. नए सवाल → 6. दोबारा टेस्ट।',
        items: [
          {
            english: 'Mistake: He go yesterday',
            hindiPronunciation: 'गलत: ही गो येस्टरडे',
            hindiMeaning: 'सुधार: He went yesterday (बीते कल के लिए 2nd form "went")',
          },
          {
            english: 'Mistake: She have a car',
            hindiPronunciation: 'गलत: शी हैव अ कार',
            hindiMeaning: 'सुधार: She has a car (तीसरे व्यक्ति एकवचन के साथ has)',
          },
          {
            english: 'Mistake: Frend',
            hindiPronunciation: 'गलत स्पेलिंग: फ़्रेंड',
            hindiMeaning: 'सुधार: Friend (i before e नियम)',
          },
        ],
      },
      {
        id: 'l8-routine',
        title: '25-मिनट दैनिक रूटीन (Daily Practice Routine)',
        subtitleHindi: 'रोज़ाना 5-5 मिनट के 5 अभ्यास',
        explanationHindi:
          '5 मिनट Phonics + 5 मिनट Reading + 5 मिनट Spelling + 5 मिनट Grammar + 5 मिनट Speaking।',
        items: [
          {
            english: 'Daily Practice makes you fluent.',
            hindiPronunciation: 'डेली प्रैक्टिस मेक्स यू फ्लूएंट।',
            hindiMeaning: 'रोज़ाना अभ्यास आपको धाराप्रवाह बनाता है।',
          },
        ],
      },
    ],
    writingDrills: [
      {
        id: 'w8-1',
        promptHindi: 'शुद्ध वाक्य टाइप करें: "He went yesterday."',
        targetEnglish: 'He went yesterday.',
        hindiPronunciation: 'ही वेंट येस्टरडे।',
        hint: 'He went yesterday.',
        type: 'sentence',
      },
      {
        id: 'w8-2',
        promptHindi: 'शुद्ध वाक्य लिखें: "She has a car."',
        targetEnglish: 'She has a car.',
        hindiPronunciation: 'शी हैज़ अ कार।',
        hint: 'She has a car.',
        type: 'sentence',
      },
    ],
    speakingDrill: {
      phrase: 'I can speak English with confidence now.',
      hindiPronunciation: 'आई कैन स्पीक इंग्लिश विद कॉन्फ़िडेंस नाऊ।',
      hindiMeaning: 'मैं अब आत्मविश्वास के साथ अंग्रेज़ी बोल सकता हूँ।',
      tipsHindi: 'गर्व और आत्मविश्वास के साथ इस वाक्य को बोलें!',
    },
    levelTest: [
      {
        id: 't8-1',
        questionHindi: 'बीते हुए कल (Yesterday) की बात करते समय क्रिया (Verb) का कौन सा रूप आता है?',
        options: ['1st form (go/eat)', '2nd form (went/ate)', 'ing रूप (going/eating)'],
        correctIndex: 1,
        explanationHindi:
          'Past Indefinite Tense में बीते हुए समय के लिए Verb की 2nd form (जैसे went, ate, saw) का प्रयोग होता है।',
      },
      {
        id: 't8-2',
        questionHindi: 'अंग्रेज़ी सीखने के लिए सबसे आवश्यक क्या है?',
        options: [
          'केवल एक दिन 10 घंटे पढ़ना',
          'रोज़ 20-25 मिनट नियमित अभ्यास और पुरानी गलतियों की दोहराई',
          'कठिन शब्दकोश रटना',
        ],
        correctIndex: 1,
        explanationHindi:
          'निरंतरता और नियमित 20-25 मिनट का अभ्यास ही व्यक्ति को बिना झिझक बोलना सिखाता है।',
      },
      {
        id: 't8-3',
        questionHindi: '"She has a car" में "has" क्यों आया?',
        options: [
          'क्योंकि She एकवचन (Singular) है',
          'क्योंकि Car बहुवचन है',
          'क्योंकि यह भूतकाल है',
        ],
        correctIndex: 0,
        explanationHindi:
          'He, She, It और एकवचन संज्ञाओं के साथ possession में हमेशा "has" आता है।',
      },
    ],
  },
];
