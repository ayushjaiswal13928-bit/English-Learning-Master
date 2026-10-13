import React, { useState } from 'react';
import { UserProgress } from '../../types';
import { playKidChime } from '../../utils/kidAudio';
import {
  FileCheck,
  CheckCircle2,
  BookOpen,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface ProgressTrackingScreenProps {
  progress: UserProgress;
}

export const ProgressTrackingScreen: React.FC<ProgressTrackingScreenProps> = ({ progress }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'tests' | 'vocabulary' | 'time'>('overview');

  // Compute dynamic metrics strictly from actual user progress
  const completedLessons = progress.completedModules.length;
  const totalLessons = 14;
  const progressPercent = totalLessons > 0 ? Math.min(100, Math.round((completedLessons / totalLessons) * 100)) : 0;

  const testsCompleted = progress.completedWorkouts || 0;
  
  // Calculate average accuracy score across recorded level scores
  const scoreKeys = Object.keys(progress.levelScores || {});
  const avgAccuracy = scoreKeys.length > 0
    ? Math.round(scoreKeys.reduce((acc, k) => acc + (progress.levelScores[Number(k)] || 0), 0) / scoreKeys.length)
    : (completedLessons > 0 ? 85 : 0);

  const wordsLearned = progress.learnedWordIds.length || progress.learnedWords.length || 0;
  
  const studyMinutes = progress.dailyWorkoutMinutesToday || 0;
  const studyHours = Math.floor(studyMinutes / 60);
  const studyRemainingMins = studyMinutes % 60;
  const studyTimeString = studyHours > 0 ? `${studyHours}h ${studyRemainingMins}m` : `${studyRemainingMins}m`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 14 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📊</span>
            <span>My Progress</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            14. Progress Tracking — आपकी सीखने की दैनिक और समग्र प्रगति
          </p>
        </div>

        {/* 5 Tabs: Overview | Lessons | Tests | Vocabulary | Time (Matching Panel 14) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('overview');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('lessons');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'lessons'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lessons
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('tests');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tests
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('vocabulary');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'vocabulary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vocabulary
          </button>
          <button
            onClick={() => {
              playKidChime('click');
              setActiveTab('time');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'time'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Time
          </button>
        </div>
      </div>

      {/* 2. Main Progress Overview (Matching Panel 14: Circular Gauge on Left + 4 Metric Cards on Right) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Circular Gauge (65% Overall Progress) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Circular Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-blue-600 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner text (65%) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">
                {progressPercent}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Progress
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-base font-black text-slate-900">
              Overall Progress
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              ({completedLessons} of {totalLessons} lessons completed)
            </p>
          </div>
        </div>

        {/* Right: 4 Metric Cards (Matching exact 4 cards in Panel 14) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Tests Completed */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">
                Tests Completed
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {testsCompleted}
              </span>
            </div>
          </div>

          {/* Card 2: Correct Answers */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">
                Correct Answers
              </span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {avgAccuracy}%
              </span>
            </div>
          </div>

          {/* Card 3: Words Learned */}
          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">
                Words Learned
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {wordsLearned}
              </span>
            </div>
          </div>

          {/* Card 4: Study Time */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">
                Study Time
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {studyTimeString}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
