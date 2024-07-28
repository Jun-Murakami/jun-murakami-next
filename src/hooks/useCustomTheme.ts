'use client';
import { useEffect, useState } from 'react';
import { createTheme, Theme } from '@mui/material/styles';
import '@fontsource/biz-udpgothic';
import '@fontsource/m-plus-1p';
import '@fontsource-variable/urbanist';

const createCustomTheme = (dpi: number): Theme => {
  let mainFont = '"BIZ UDPGothic"';

  if (dpi >= 1.5) {
    mainFont = '"M PLUS 1p"';
  }

  const fontFamilySet = [
    'Urbanist Variable',
    `${mainFont}`,
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',');

  let typographyStyles = {};
  if (dpi >= 1.5) {
    typographyStyles = {
      fontFamily: fontFamilySet,
    };
  } else {
    typographyStyles = {
      fontFamily: fontFamilySet,
      h3: {
        fontSize: '35px',
      },
      caption: {
        fontSize: '11px',
      },
    };
  }

  const breakpointsValues = {
    xs: 0,
    sm: 750,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const windowsScrollbarStylesDark = {
    '&::-webkit-scrollbar': {
      width: '10px',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 8px rgba(255,255,255,0.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#444',
      color: '#444',
      borderRadius: '5px',
    },
  };

  return createTheme({
    breakpoints: {
      values: breakpointsValues,
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#9c89ff',
      },
      secondary: {
        main: '#ef0a0a',
      },
    },
    typography: typographyStyles,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // ユーザーエージェントにWinを含むか、プラットフォームがWinから始まる場合にスクロールバーのスタイルを適用
          body: navigator.userAgent?.indexOf('Win') > 0 || navigator.platform.startsWith('Win') ? windowsScrollbarStylesDark : {},
          a: {
            color: '#9c89ff',
          },
          'a:hover': {
            color: '#ac99ff',
          },
          Paepr: {
            styleOverrides: {
              root: {
                backgroundColor: '#14151f',
              },
            },
          },
        },
      },
    },
  });

};

export const useCustomTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(createCustomTheme(window.devicePixelRatio));

    const updateDpi = () => {
      setTheme(createCustomTheme(window.devicePixelRatio));
    };

    window.addEventListener('resize', updateDpi);

    return () => {
      window.removeEventListener('resize', updateDpi);
    };
  }, []);

  return theme;
};