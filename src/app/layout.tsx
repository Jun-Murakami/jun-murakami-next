import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies } from "next/headers";

import ClientLayout from "./ClientLayout";

import { FontLoadingScreen } from "@/components/FontLoadingScreen";
import { LanguageToggle } from "@/components/LanguageToggle";
import { FontLoadingProvider } from "@/contexts/FontLoadingContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// ThemeProvider/CssBaseline は ClientLayout 側で適用

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jun Murakami App Factory",
  description:
    "音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。",
  openGraph: {
    title: "Jun Murakami App Factory",
    description:
      "音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。",
    images: [
      {
        url: "https://jun-murakami.web.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jun Murakami App Factory",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jun Murakami App Factory",
    description:
      "音楽ディレクター / プロデューサーの村上純 (高橋純) です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。",
    images: ["https://jun-murakami.web.app/images/og-image.jpg"],
  },
  verification: {
    google: "3GwWqWw2uLj5JIVCyS2iXall-wS4GmPq8FQTDEQhU7Y",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = "G-JK7QMBRBPV";
  // SSR時点で cookie から言語を取得し、<html lang> を正しく設定する
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value === "en" ? "en" : "ja";

  return (
    <html lang={lang}>
      <body>
        <FontLoadingProvider>
          <LanguageProvider>
            <FontLoadingScreen />
            <LanguageToggle />
            <AppRouterCacheProvider>
              <GoogleAnalytics gaId={googleAnalyticsId} />
              <ClientLayout>{children}</ClientLayout>
            </AppRouterCacheProvider>
          </LanguageProvider>
        </FontLoadingProvider>
      </body>
    </html>
  );
}
