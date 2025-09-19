'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 初期言語を同期的に決定する関数
// 優先度: cookie > localStorage > navigator.language > 'ja'
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'ja';

  // cookie から取得（language=...）
  const cookiePair = document.cookie
    .split('; ')
    .find((row) => row.startsWith('language='));
  const cookieLang = (cookiePair?.split('=')[1] as Language | undefined) || undefined;
  if (cookieLang === 'ja' || cookieLang === 'en') return cookieLang;

  // localStorage から取得
  const ls = localStorage.getItem('language') as Language | null;
  if (ls === 'ja' || ls === 'en') return ls;

  // navigator から推定
  const nav = navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  return nav || 'ja';
}

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage?: Language }) {
  // SSRとCSRの初期値を一致させるため、サーバで検出した初期言語(initialLanguage)を優先
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return initialLanguage ?? 'ja';
    }
    return getInitialLanguage();
  });

  // 言語変更時の副作用: <html lang> と cookie, localStorage を更新
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      // 既存のクッキーを削除してから新しく設定
      Cookies.remove('language', { path: '/' });
      Cookies.set('language', language, {
        path: '/',
        sameSite: 'lax',
        expires: 365, // 365日
        secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
      });
      localStorage.setItem('language', language);
    }
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