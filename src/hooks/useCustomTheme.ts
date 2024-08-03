'use client';
import { createTheme, Theme } from '@mui/material/styles';
import '@fontsource/m-plus-1p';
import '@fontsource-variable/urbanist';

const createCustomTheme = (): Theme => {

  const fontFamilySet = [
    '"Urbanist Variable"',
    '"M PLUS 1p"',
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
      body1: {
        fontSize: '17px',
        lineHeight: '1.7',
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
    },
  });

};

const theme = createCustomTheme();

export default theme;