'use client';

import TranslateIcon from '@mui/icons-material/Translate';
import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLang = language === 'ja' ? 'en' : 'ja';
    
    // 既存のクッキーを明示的に削除
    Cookies.remove('language', { path: '/' });
    
    // 新しいクッキーを設定（ドメインは指定しない）
    Cookies.set('language', nextLang, {
      path: '/',
      sameSite: 'lax',
      expires: 365,
      secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
    });
    
    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLang;
    }
    setLanguage(nextLang);
    
    // サーバーコンポーネントを再フェッチして文言を更新
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
      <Typography >
        {language === 'ja' ? 'to English' : 'to 日本語'}
      </Typography>
    </Button>
  );
} 