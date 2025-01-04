import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ClientLayout from './ClientLayout';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Jun Murakami App Factory',
  description:
    '音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。',
  openGraph: {
    title: 'Jun Murakami App Factory',
    description:
      '音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。',
    images: [
      {
        url: 'https://jun-murakami.web.app/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jun Murakami App Factory',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jun Murakami App Factory',
    description:
      '音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。',
    images: ['https://jun-murakami.web.app/images/og-image.jpg'],
  },
  verification: {
    google: '3GwWqWw2uLj5JIVCyS2iXall-wS4GmPq8FQTDEQhU7Y',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = 'G-JK7QMBRBPV';

  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider>
          <GoogleAnalytics gaId={googleAnalyticsId} />
          <ClientLayout>{children}</ClientLayout>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
