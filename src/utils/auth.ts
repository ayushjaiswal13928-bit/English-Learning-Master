/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProgress } from '../types';
import { getFreshUserProgress } from './storage';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  avatar: string;
  role: 'student' | 'kid' | 'guest';
  isGuest?: boolean;
}

const ACCOUNTS_STORAGE_KEY = 'elm_registered_users_v1';
const CURRENT_SESSION_KEY = 'elm_active_user_id_v1';

// Starter demo user for convenience if user wants to quick-test
const DEMO_ACCOUNT: UserAccount = {
  id: 'user_ayush',
  name: 'Ayush',
  email: 'ayush@example.com',
  passwordHash: btoa('123456'), // Simple reversible base64 hash for client offline storage
  createdAt: '2026-05-10T10:00:00.000Z',
  avatar: '👦',
  role: 'student',
};

/**
 * Get all registered user accounts from local database
 */
export const getRegisteredUsers = (): UserAccount[] => {
  if (typeof window === 'undefined') return [DEMO_ACCOUNT];
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      // Seed default demo user so testing is instant
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([DEMO_ACCOUNT]));
      return [DEMO_ACCOUNT];
    }
    const accounts: UserAccount[] = JSON.parse(raw);
    if (!Array.isArray(accounts) || accounts.length === 0) {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([DEMO_ACCOUNT]));
      return [DEMO_ACCOUNT];
    }
    return accounts;
  } catch (err) {
    console.error('Failed to read accounts database', err);
    return [DEMO_ACCOUNT];
  }
};

/**
 * Save users list to storage
 */
const saveRegisteredUsers = (users: UserAccount[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save accounts', err);
  }
};

/**
 * Get active logged-in user
 */
export const getActiveUser = (): UserAccount | null => {
  if (typeof window === 'undefined') return DEMO_ACCOUNT;
  try {
    const activeId = localStorage.getItem(CURRENT_SESSION_KEY);
    if (!activeId) {
      // Check if remember me has demo user, otherwise return DEMO_ACCOUNT
      return DEMO_ACCOUNT;
    }
    if (activeId === 'guest') {
      return {
        id: 'guest',
        name: 'Guest Learner',
        email: 'guest@offline.local',
        passwordHash: '',
        createdAt: new Date().toISOString(),
        avatar: '🎒',
        role: 'guest',
        isGuest: true,
      };
    }
    const users = getRegisteredUsers();
    const user = users.find((u) => u.id === activeId);
    return user || DEMO_ACCOUNT;
  } catch (err) {
    console.error('Failed to get active user', err);
    return DEMO_ACCOUNT;
  }
};

/**
 * Set active user session
 */
export const setActiveSession = (userId: string | null) => {
  if (typeof window === 'undefined') return;
  if (!userId) {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  } else {
    localStorage.setItem(CURRENT_SESSION_KEY, userId);
  }
};

/**
 * Real Register / Sign Up with full validation
 */
export const registerUser = (
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string; user?: UserAccount } => {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  // Validations
  if (!cleanName || cleanName.length < 2) {
    return {
      success: false,
      error: 'कृपया अपना पूरा नाम लिखें (कम से कम 2 अक्षर)',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      success: false,
      error: 'कृपया सही ईमेल पता दर्ज करें (उदा. student@example.com)',
    };
  }

  if (!cleanPassword || cleanPassword.length < 6) {
    return {
      success: false,
      error: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
    };
  }

  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return {
      success: false,
      error: 'इस ईमेल से खाता पहले से मौजूद है! कृपया लॉगिन करें।',
    };
  }

  const avatars = ['👦', '👧', '🌟', '🚀', '🦊', '🐼', '🦁', '🦉'];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

  const newUser: UserAccount = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: cleanName,
    email: cleanEmail,
    passwordHash: btoa(cleanPassword),
    createdAt: new Date().toISOString(),
    avatar: randomAvatar,
    role: 'student',
  };

  const updated = [...users, newUser];
  saveRegisteredUsers(updated);
  setActiveSession(newUser.id);

  // Initialize clean 0% fresh progress for this new user in storage
  const freshProgress = getFreshUserProgress();
  localStorage.setItem(`elm_progress_${newUser.id}`, JSON.stringify(freshProgress));

  return { success: true, user: newUser };
};

/**
 * Real Login with credential verification
 */
export const loginUser = (
  email: string,
  password: string
): { success: boolean; error?: string; user?: UserAccount } => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    return {
      success: false,
      error: 'कृपया अपना ईमेल पता दर्ज करें',
    };
  }

  if (!cleanPassword) {
    return {
      success: false,
      error: 'कृपया पासवर्ड दर्ज करें',
    };
  }

  const users = getRegisteredUsers();
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return {
      success: false,
      error: 'यह ईमेल पंजीकृत नहीं है। कृपया पहले Sign Up करें।',
    };
  }

  const inputHash = btoa(cleanPassword);
  if (user.passwordHash !== inputHash) {
    return {
      success: false,
      error: 'गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।',
    };
  }

  setActiveSession(user.id);
  return { success: true, user };
};

/**
 * Guest Login (Instant exploration without credentials)
 */
export const loginAsGuest = (): UserAccount => {
  const guestUser: UserAccount = {
    id: 'guest',
    name: 'Guest Learner',
    email: 'guest@offline.local',
    passwordHash: '',
    createdAt: new Date().toISOString(),
    avatar: '🎒',
    role: 'guest',
    isGuest: true,
  };
  setActiveSession('guest');
  return guestUser;
};

/**
 * Logout current active user
 */
export const logoutUser = () => {
  setActiveSession(null);
};
