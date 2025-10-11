import localFont from 'next/font/local';

export const silka = localFont({
  src: [
    {
      path: './fonts/silka-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/silka-medium-webfont.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  display: 'swap',
  variable: '--font-silka',
});
