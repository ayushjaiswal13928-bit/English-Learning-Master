/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserPlus,
  LogIn,
  KeyRound,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { playKidChime } from '../../utils/kidAudio';
import {
  registerUser,
  loginUser,
  loginAsGuest,
  getRegisteredUsers,
  UserAccount,
} from '../../utils/auth';

const HERO_IMAGE_URL = '/reference_dashboard.png';

interface LoginPageProps {
  onLoginSuccess: (user: UserAccount) => void;
  onExploreAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onExploreAsGuest,
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('ayush@example.com');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Status & Validation feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedAccounts, setSavedAccounts] = useState<UserAccount[]>([]);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const accounts = getRegisteredUsers();
    setSavedAccounts(accounts);
    if (accounts.length > 0 && !email) {
      setEmail(accounts[0].email);
    }
  }, []);

  const handleSelectQuickAccount = (acc: UserAccount) => {
    playKidChime('click');
    setEmail(acc.email);
    setName(acc.name);
    setIsSignUp(false);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isSignUp) {
      // 1. SIGN UP VALIDATION & REGISTRATION
      if (!name.trim()) {
        setErrorMessage('कृपया अपना नाम दर्ज करें');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('पासवर्ड कम से कम 6 अक्षरों का होना चाहिए');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('दोनों पासवर्ड मेल नहीं खाते! कृपया दोबारा जाँचें।');
        return;
      }

      const res = registerUser(name, email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'खाता बनाने में त्रुटि हुई');
        return;
      }

      playKidChime('cheer');
      setSuccessMessage('खाता सफलतापूर्वक बन गया! स्वागत है ' + (res.user?.name || ''));
      setTimeout(() => {
        if (res.user) onLoginSuccess(res.user);
      }, 700);
    } else {
      // 2. LOGIN WITH VERIFICATION
      const res = loginUser(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'लॉगिन असफल रहा');
        return;
      }

      playKidChime('cheer');
      setSuccessMessage(`लॉगिन सफल! स्वागत है ${res.user?.name}`);
      setTimeout(() => {
        if (res.user) onLoginSuccess(res.user);
      }, 500);
    }
  };

  const handleGuestClick = () => {
    playKidChime('click');
    const guest = loginAsGuest();
    onLoginSuccess(guest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* LEFT COLUMN: Illustrated Brand Hero */}
        <div className="lg:col-span-7 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-72 h-72 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          {/* Top Header Logo */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                  English Learning Master
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-blue-100">
                  अंग्रेज़ी सीखें — बिल्कुल शुरुआत से (Bilingual EdTech)
                </p>
              </div>
            </div>
          </div>

          {/* Center Graphic & Slogan (Robust image with SVG fallback) */}
          <div className="relative z-10 py-6 flex flex-col items-center text-center">
            <div className="relative max-w-xs w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-blue-900/40 aspect-4/3 mb-5 flex items-center justify-center">
              {!imageError ? (
                <img
                  src={HERO_IMAGE_URL}
                  alt="Child learning English"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                // Beautiful inline SVG banner fallback if file not in zip
                <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col items-center justify-center p-6 text-white text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-3xl mb-3 shadow-inner">
                    📖✨
                  </div>
                  <span className="text-sm font-black text-amber-300">
                    Bilingual English Learning
                  </span>
                  <span className="text-[11px] text-blue-100 mt-1">
                    अक्षर • शब्द • वाक्य • बोलना
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent flex items-end justify-center p-3 pointer-events-none">
                <span className="text-xs font-black text-amber-300 drop-shadow-md">
                  ✨ खेल-खेल में अंग्रेज़ी का सफ़र
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Better English <br />
              <span className="text-amber-300">Brighter Future</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-sm">
              हिंदी माध्यम से अक्षरों की आवाज़, वर्तनी, शब्द, वाक्य और बोलने का सम्पूर्ण अभ्यास।
            </p>
          </div>

          {/* Bottom 3 Pill Pillars */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-white">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span>Learn (सीखें)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Practice (अभ्यास)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse" />
              <span>Improve (सुधार)</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Real Auth Form Card */}
        <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between bg-white overflow-y-auto">
          <div className="space-y-5">
            {/* Top Mode Selector Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  playKidChime('click');
                  setIsSignUp(false);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  !isSignUp
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login (लॉगिन)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playKidChime('click');
                  setIsSignUp(true);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSignUp
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up (नया खाता)</span>
              </button>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. वास्तविक खाता प्रणाली (Real Authentication)</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isSignUp ? 'Create Student Account' : 'Welcome Back!'}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                {isSignUp
                  ? 'अपना नया खाता बनाएं — आपकी प्रगति सुरक्षित रहेगी'
                  : 'ईमेल और पासवर्ड से लॉगिन करें'}
              </p>
            </div>

            {/* Error & Success Feedback Banners */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name Input (Required for Sign Up) */}
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    विद्यार्थी का नाम (Full Name) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="उदा. आयुष शर्मा / Aarav"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  ईमेल पता (Email Address) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="text-slate-400 text-xs absolute left-3.5 top-1/2 -translate-y-1/2">
                    ✉️
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    पासवर्ड (Password) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">कम से कम 6 अक्षर</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? 'नया पासवर्ड (उदा. 123456)' : 'अपना पासवर्ड दर्ज करें'}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (only for Sign Up) */}
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    पासवर्ड की पुष्टि (Confirm Password) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="पासवर्ड दोबारा दर्ज करें"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Remember Me & Help */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>मुझे याद रखें (Remember me)</span>
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => {
                      playKidChime('click');
                      alert('डेमो पासवर्ड "123456" है या नया खाता बनाने के लिए Sign Up चुनें।');
                    }}
                    className="font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-98 mt-2"
              >
                <span>{isSignUp ? 'Sign Up (खाता बनाएं)' : 'Login (लॉगिन करें)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Switcher of Existing Accounts on this Device */}
            {savedAccounts.length > 0 && !isSignUp && (
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>डिवाइस पर सहेजे गए खाते (Quick Select):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedAccounts.slice(0, 3).map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelectQuickAccount(acc)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
                        email === acc.email
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{acc.avatar}</span>
                      <span>{acc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Fast Guest / Offline Mode Action */}
          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>सुरक्षित व ऑफ़लाइन तैयार</span>
            </span>
            <button
              type="button"
              onClick={handleGuestClick}
              className="text-blue-600 hover:text-blue-800 font-black hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Guest Mode (बिना खाते के देखें) →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
