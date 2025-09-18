'use client';

import TranslateIcon from '@mui/icons-material/Translate';
import { Button, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  };

  return (
    <Button
      onClick={toggleLanguage}
      startIcon={<TranslateIcon />}
      sx={{
        textTransform: 'none',
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