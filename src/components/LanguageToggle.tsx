'use client';

import TranslateIcon from '@mui/icons-material/Translate';
import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useLanguage } from '@/contexts/LanguageContext';
import { SESSION_COOKIE_NAME, stringifySessionCookie } from '@/utils/languageSessionCookie';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = language === 'ja' ? 'en' : 'ja';

    Cookies.remove('language', { path: '/' });

    const existingSession = Cookies.get(SESSION_COOKIE_NAME);
    const sessionPayload = stringifySessionCookie(nextLang, existingSession);
    Cookies.set(SESSION_COOKIE_NAME, sessionPayload, {
      path: '/',
      sameSite: 'lax',
      expires: 365,
      secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
    });

    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLang;
    }
    setLanguage(nextLang);

    router.refresh();
  };

  return (
    <Button
      onClick={toggleLanguage}
      startIcon={<TranslateIcon />}
      sx={{
        position: 'fixed',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          backgroundColor: 'rgba(70, 70, 70, 0.7)',
        },
        px: 2,
        zIndex: 1000,
      }}
    >
      <Typography>
        {language === 'ja' ? 'to English' : 'to 日本語'}
      </Typography>
    </Button>
  );
}
