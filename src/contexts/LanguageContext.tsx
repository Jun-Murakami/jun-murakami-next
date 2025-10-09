'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import {
  extractLanguage,
  type Language,
  SESSION_COOKIE_NAME,
  stringifySessionCookie,
} from '@/utils/languageSessionCookie';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  // This function should only run on client side, but fallback to 'en' for consistency
  if (typeof window === 'undefined') return 'en';

  const sessionValue = Cookies.get(SESSION_COOKIE_NAME);
  const sessionLanguage = extractLanguage(sessionValue);
  if (sessionLanguage) return sessionLanguage;

  const legacyCookie = Cookies.get('language');
  if (legacyCookie === 'ja' || legacyCookie === 'en') return legacyCookie;

  const ls = localStorage.getItem('language');
  if (ls === 'ja' || ls === 'en') return ls;

  const nav = navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  return nav || 'en';
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      // Default to 'en' instead of 'ja' when no initial language provided
      return initialLanguage ?? 'en';
    }
    return getInitialLanguage();
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.lang = language;

    const existingSession = Cookies.get(SESSION_COOKIE_NAME);
    const sessionPayload = stringifySessionCookie(language, existingSession);
    Cookies.set(SESSION_COOKIE_NAME, sessionPayload, {
      path: '/',
      sameSite: 'lax',
      expires: 365,
      secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
    });

    Cookies.remove('language', { path: '/' });
    localStorage.setItem('language', language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
