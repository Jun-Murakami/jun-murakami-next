'use client';
// 注意: このファイルはクライアント/サーバー両方からインポートされる可能性があります。
// MUIのテーマオブジェクト作成は副作用のない関数のみで構成し、
// フォントは next/font 側（app/layout.tsx）で読み込み、CSS変数で参照します。
import { createTheme, type Theme } from '@mui/material/styles';

const createCustomTheme = (): Theme => {
  // フォントは next/font で読み込み、CSS変数（--font-urbanist / --font-mplus1p）経由で参照する
  const fontFamilySet = [
    'var(--font-urbanist)',
    'var(--font-mplus1p)',
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
    // MUI v7: CSSテーマ変数を有効化（SSR時のフリッカー防止にも有効）
    cssVariables: true,
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
    typography: {
      fontFamily: fontFamilySet,
      h5: {
        fontWeight: 300,
      },
      body1: {
        fontWeight: 300,
        lineHeight: 1.7,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // ユーザーエージェントにWinを含むか、プラットフォームがWinから始まる場合にスクロールバーのスタイルを適用
          body: windowsScrollbarStylesDark,
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
      MuiTypography: {
        styleOverrides: {
          root: {
            transform: 'rotate(0.05deg)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });
};

const theme = createCustomTheme();

export default theme;
