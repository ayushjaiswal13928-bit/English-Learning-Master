/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { AppSettings, UserProgress } from '../../types';
import { playKidChime } from '../../utils/kidAudio';
import { UserAccount } from '../../utils/auth';
import {
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  Volume2,
  VolumeX,
  User,
  LogOut,
  Users,
  Sparkles,
  Database,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  progress: UserProgress;
  onResetProgress: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onLoadDemoPack: () => void;
  onImportProgress: (imported: UserProgress) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  progress,
  onResetProgress,
  currentUser,
  onLogout,
  onSwitchAccount,
  onLoadDemoPack,
  onImportProgress,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = () => {
    playKidChime('star');
    const backupData = {
      user: currentUser,
      progress,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-learning-${currentUser?.name || 'student'}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const importedProgress = parsed.progress || parsed;
        if (importedProgress && typeof importedProgress === 'object') {
          playKidChime('cheer');
          onImportProgress(importedProgress);
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 3500);
        } else {
          alert('फ़ाइल का प्रारूप अमान्य है।');
        }
      } catch (err) {
        alert('फ़ाइल पढ़ने में त्रुटि हुई।');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('क्या आप सचमुच सारा डेटा रीसेट करना चाहते हैं? आपकी सेव की गई प्रगति 0% हो जाएगी।')) {
      playKidChime('click');
      onResetProgress();
      alert('प्रगति रीसेट कर दी गई है!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* 1. Header (Matching Panel 15 of image.png) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚙️</span>
            <span>Settings</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
            15. Settings — भाषा, डार्क मोड, खाता प्रबंधन व डेटा बैकअप
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 0: User Account & Profile (Addressing Point 1 & Point 5) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>सक्रिय खाता (Active Account Profile)</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-User Isolated</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                {currentUser?.avatar || '👦'}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {currentUser?.name || 'Ayush'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 font-mono">
                  {currentUser?.email || 'ayush@example.com'}
                </p>
                <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100/70 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {currentUser?.isGuest ? 'Guest Learner' : 'Registered Student'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playKidChime('click');
                  onSwitchAccount();
                }}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Switch User</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playKidChime('click');
                  onLogout();
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out (लॉगआउट)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Language & Appearance (Matching Panel 15) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
            Language & Appearance (भाषा व स्वरूप)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Language dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Language (भाषा)
              </label>
              <select
                value={settings.language}
                onChange={(e) => {
                  playKidChime('click');
                  onUpdateSettings({ language: e.target.value as 'hi' | 'en' });
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="hi">Hindi (हिंदी)</option>
                <option value="en">English (अंग्रेज़ी)</option>
              </select>
            </div>

            {/* Dark Mode toggle switch */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Dark Mode (डार्क मोड)
              </label>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                  {settings.darkMode ? (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <span>{settings.darkMode ? 'ऑन (Dark)' : 'ऑफ (Light)'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    playKidChime('click');
                    onUpdateSettings({ darkMode: !settings.darkMode });
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    settings.darkMode ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </button>
              </div>
            </div>

            {/* Sound Effects toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Sound Chimes (ध्वनि प्रभाव)
              </label>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                  {settings.soundEffects ? (
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  )}
                  <span>{settings.soundEffects ? 'सक्रिय' : 'बंद'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    playKidChime('click');
                    onUpdateSettings({ soundEffects: !settings.soundEffects });
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    settings.soundEffects ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Data & Backup (Matching Panel 15) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span>Data & Backup (डेटा और बैकअप)</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Indexed LocalStorage • Offline Persistent
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            आप अपनी पढ़ाई की प्रगति को किसी भी डिवाइस पर ले जाने के लिए JSON फ़ाइल के रूप में डाउनलोड (Export) कर सकते हैं और कभी भी पुनः अपलोड (Import) कर सकते हैं।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Blue Export Data Button */}
            <button
              type="button"
              onClick={handleExportData}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export Data (डाउनलोड)</span>
            </button>

            {/* Import Data Button */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all border border-slate-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Upload className="w-4 h-4 text-slate-600" />
              <span>Import Data (अपलोड)</span>
            </button>

            {/* Load Demo Pack Button */}
            <button
              type="button"
              onClick={() => {
                if (confirm('डेमो डेटा लोड करने से प्रगति के नमूना आंकड़े (2 स्तर पूरे, 6 शब्द सीखे) लोड होंगे। क्या आप जारी रखना चाहते हैं?')) {
                  playKidChime('star');
                  onLoadDemoPack();
                  alert('डेमो प्रगति पैक लोड किया गया!');
                }
              }}
              className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>डेमो डेटा पैक (Preview Mode)</span>
            </button>

            {/* Red Clear Data Button */}
            <button
              type="button"
              onClick={handleClearData}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>0% रीसेट (Clear)</span>
            </button>
          </div>

          {copied && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>प्रगति फ़ाइल सुरक्षित रूप से डाउनलोड हो गई!</span>
            </div>
          )}

          {importSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>प्रगति फ़ाइल सफलतापूर्वक लोड और सिंक हो गई!</span>
            </div>
          )}
        </div>

        {/* Section 3: About (Matching Panel 15) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
            About (ऐप के बारे में)
          </h2>

          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900">
              English Learning Master
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Version 1.1.0 • PWA Enabled (Offline Ready) • Multi-User System
            </p>
            <p className="text-xs text-slate-600 pt-1 leading-relaxed">
              हिंदी भाषियों के लिए विशेष रूप से निर्मित सम्पूर्ण अंग्रेज़ी शिक्षण प्रणाली — Alphabet, Phonics, Reading, Spelling, Vocabulary, Grammar, Listening, Speaking, Translation और Unit Quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
