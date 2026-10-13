import React, { useState } from 'react';
import { ModuleId } from '../../types';
import { playKidChime } from '../../utils/kidAudio';
import {
  Search,
  BookOpen,
  Layers,
  FileCheck,
  Bookmark,
  Sparkles,
  ArrowRight,
  Headphones,
  Mic,
  Languages,
  CheckCircle2,
} from 'lucide-react';

interface LessonsListProps {
  onSelectLesson: (id: ModuleId) => void;
  completedModules: ModuleId[];
}

export const LessonsList: React.FC<LessonsListProps> = ({
  onSelectLesson,
  completedModules,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const LESSON_ITEMS: {
    id: ModuleId;
    num: number;
    title: string;
    subtitleHindi: string;
    topics: string;
    badgeColor: string;
  }[] = [
    {
      id: 'alphabet',
      num: 1,
      title: 'Alphabet & Phonics',
      subtitleHindi: 'अक्षर और ध्वनियाँ',
      topics: 'A to Z, Sounds, Vowels, Consonants',
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'reading',
      num: 2,
      title: 'Reading',
      subtitleHindi: 'शब्द व वाक्य पढ़ना',
      topics: 'Words, Sentences, Stories',
      badgeColor: 'bg-blue-500 text-white',
    },
    {
      id: 'spelling',
      num: 3,
      title: 'Spelling & Writing',
      subtitleHindi: 'वर्तनी व लेखन',
      topics: 'Dictation, Missing Letters, Correction',
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'vocabulary',
      num: 4,
      title: 'Vocabulary',
      subtitleHindi: 'दैनिक शब्दकोश',
      topics: 'Daily Words, Hindi Meaning, Examples',
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'grammar',
      num: 5,
      title: 'Grammar',
      subtitleHindi: 'व्याकरण नियम',
      topics: 'Nouns, Pronouns, Tenses, Articles',
      badgeColor: 'bg-indigo-500 text-white',
    },
    {
      id: 'listening',
      num: 6,
      title: 'Listening Practice',
      subtitleHindi: 'सुनकर समझना',
      topics: 'Letters, Words, Audio Quiz',
      badgeColor: 'bg-teal-500 text-white',
    },
    {
      id: 'speaking',
      num: 7,
      title: 'Speaking Practice',
      subtitleHindi: 'बोलना और उच्चारण',
      topics: 'Mic Practice, Daily Sentences, Self Introduction',
      badgeColor: 'bg-purple-500 text-white',
    },
    {
      id: 'translation',
      num: 8,
      title: 'Translation',
      subtitleHindi: 'अनुवाद अभ्यास',
      topics: 'Hindi ⇄ English Drills & Patterns',
      badgeColor: 'bg-cyan-500 text-white',
    },
    {
      id: 'test_quiz',
      num: 9,
      title: 'Test / Quiz',
      subtitleHindi: 'इकाई परीक्षा व प्रश्नोत्तरी',
      topics: 'Unit Test, Multiple Choice, Score Card',
      badgeColor: 'bg-emerald-600 text-white',
    },
  ];

  const filteredLessons = LESSON_ITEMS.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitleHindi.toLowerCase().includes(q) ||
      item.topics.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header & Search Bar (Matching Panel 3 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📚</span>
            <span>Lessons</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            आसान से कठिन तक — अंग्रेज़ी सीखें (Step-by-Step Curriculum)
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="पाठ खोजें (Search lessons)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sequential Lessons List (Matching Panel 3) */}
      <div className="space-y-3">
        {filteredLessons.map((item) => {
          const isDone = completedModules.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 group hover:border-blue-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Number Badge (1, 2, 3...) */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 shadow-xs ${item.badgeColor}`}
                >
                  {item.num}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-500">
                      ({item.subtitleHindi})
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>पूर्ण</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                    {item.topics}
                  </p>
                </div>
              </div>

              {/* Green "Start" Button (Matching Panel 3) */}
              <button
                onClick={() => {
                  playKidChime('star');
                  onSelectLesson(item.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
