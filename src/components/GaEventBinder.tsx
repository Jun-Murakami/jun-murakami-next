'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface GaEventBinderProps {
  language: 'ja' | 'en';
}

// ドキュメント全体のクリックを監視し、data属性に基づいてGAイベントを送信するクライアント補助
// - data-ga-sns="<title>"
// - data-ga-app="<appName>"
export function GaEventBinder({ language }: GaEventBinderProps) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const snsEl = target.closest('[data-ga-sns]') as HTMLElement | null;
      if (snsEl) {
        const title = snsEl.getAttribute('data-ga-sns') || '';
        sendGAEvent('event', 'sns_click', { sns_name: title, language });
        return;
      }

      const appEl = target.closest('[data-ga-app]') as HTMLElement | null;
      if (appEl) {
        const appName = appEl.getAttribute('data-ga-app') || '';
        sendGAEvent('event', 'app_card_click', { app_name: appName, language });
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [language]);

  return null;
}


