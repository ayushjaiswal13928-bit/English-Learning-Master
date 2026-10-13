import React from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { playKidChime } from '../../utils/kidAudio';
import {
  Smartphone,
  Download,
  Wifi,
  WifiOff,
  CheckCircle2,
  Share2,
  PlusSquare,
  Home,
  BookOpen,
  Award,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react';

export const PwaMobileScreen: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleInstallClick = async () => {
    playKidChime('star');
    const success = await install();
    if (success) {
      alert('🎉 बधाई हो! English Learning Master आपके फ़ोन/कंप्यूटर में इनस्टॉल हो चुका है!');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 16 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📱</span>
            <span>Mobile View & PWA Install</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            16. Mobile View (PWA Install) — फ़ोन पर ऐप की तरह चलाएं और ऑफ़लाइन सीखें
          </p>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Matching Panel 16: Phone Mockup on Left + Install Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: Smartphone Mockup with Bottom Bar (Home, Lessons, Practice, More) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[300px] h-[580px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col justify-between">
            {/* Phone Speaker Notch */}
            <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-2" />

            {/* Simulated Mobile Screen Content */}
            <div className="bg-slate-50 flex-1 rounded-[32px] overflow-hidden flex flex-col justify-between border border-slate-200 text-xs">
              {/* Mobile Top Header */}
              <div className="bg-blue-600 text-white p-3.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-blue-200">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    <span>100%</span>
                  </div>
                </div>
                <div className="font-black text-xs">English Learning Master</div>
                <div className="text-[10px] text-blue-100">Welcome, Ayush!</div>
              </div>

              {/* Mobile Main Body */}
              <div className="p-3 space-y-2.5 flex-1 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[11px] font-bold">
                  “Small steps every day lead to big success!”
                </div>

                {/* 4 Mini Cards */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-800 text-center">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    📘 Lessons
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    ✏️ Spelling
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    🔤 Translate
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    🏆 Progress
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[10px] font-bold text-amber-900">
                  ⭐ कुल प्रगति: 65% पूर्ण
                </div>
              </div>

              {/* Mobile Bottom Navigation Bar (Matching Panel 16: Home | Lessons | Practice | More) */}
              <div className="bg-white border-t border-slate-200 p-2 flex items-center justify-around text-[10px] font-bold text-slate-500">
                <div className="flex flex-col items-center text-blue-600">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-900">
                  <BookOpen className="w-4 h-4" />
                  <span>Lessons</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-900">
                  <Award className="w-4 h-4" />
                  <span>Practice</span>
                </div>
                <div className="flex flex-col items-center hover:text-slate-900">
                  <MoreHorizontal className="w-4 h-4" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* RIGHT COLUMN: Install Card (Matching Panel 16: Install करें + Blue Install App Button) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Download className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Install करें (PWA Web App)
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed">
              App को Install करें और Offline भी इस्तेमाल करें!
            </p>
          </div>

          {/* Offline Features Pill List */}
          <div className="space-y-2.5 py-2 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>बिना इंटरनेट के भी सारे पाठ और शब्दकोश उपलब्ध रहेंगे।</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>फ़ोन की होम स्क्रीन पर एक क्लिक में ऐप की तरह खुलेगा।</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>कोई अतिरिक्त डाउनलोड या प्ले स्टोर की ज़रूरत नहीं।</span>
            </div>
          </div>

          {/* Big Blue Install App Button (Matching Panel 16) */}
          <div className="pt-2">
            <button
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>Install App (ऐप इनस्टॉल करें)</span>
            </button>
          </div>

          {/* iOS Safari Guide if user is on Apple iPhone/iPad */}
          {isIOS && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
              <span className="font-bold text-slate-800 block">
                iPhone / iPad पर इनस्टॉल करने का तरीका:
              </span>
              <p className="text-slate-600">
                1. Safari ब्राउज़र में नीचे दिए गए <strong>Share बटन (⎋)</strong> पर टैप करें।
                <br />
                2. सूची में से <strong>'Add to Home Screen' (⊕ होम स्क्रीन में जोड़ें)</strong> चुनें।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
