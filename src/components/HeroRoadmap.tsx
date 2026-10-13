import React from 'react';
import { ArrowRight, Volume2, Mic, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ModuleId } from '../types';

interface HeroRoadmapProps {
  onStartStep: (id: ModuleId) => void;
  onOpenWorkout: () => void;
  completedCount: number;
}

export const HeroRoadmap: React.FC<HeroRoadmapProps> = ({
  onStartStep,
  onOpenWorkout,
  completedCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span>हिंदी माध्यम से अंग्रेज़ी शिक्षण</span>
              <span aria-hidden="true">·</span>
              <span>15 संपूर्ण मॉड्युल्स</span>
              <span aria-hidden="true">·</span>
              <span>बिल्कुल शुरुआत से</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              English सीखने का पूरा रोडमैप <br />
              <span className="text-amber-800">(बिल्कुल शुरुआत से)</span>
            </h1>

            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
              <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                🎯 मुख्य उद्देश्य:
              </span>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                हिंदी जानने वाला व्यक्ति अंग्रेज़ी <strong>पढ़ना, लिखना, बोलना, सुनकर समझना</strong> और{' '}
                <strong>spelling की गलतियाँ सुधारना</strong> सीख सके।
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onStartStep('alphabet')}
                className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>मॉड्यूल 1 से शुरू करें (ABC Rules)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWorkout}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>20–30 मिनट दैनिक रूटीन टाइमर</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>15 इंटरएक्टिव मॉड्युल्स</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Volume2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>सरल हिंदी उच्चारण व ऑडियो</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>6-चरणीय गलती सुधार प्रणाली</span>
              </div>
            </div>
          </div>

          {/* Right Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/english_learning_hero_1791775792653.jpg"
                alt="हिंदी से अंग्रेज़ी सीखने का पूरा रोडमैप"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
