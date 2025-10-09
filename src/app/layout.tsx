import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { M_PLUS_1p, Urbanist } from "next/font/google";
import { cookies, headers } from "next/headers";

import { FontLoadingScreen } from "@/components/FontLoadingScreen";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ScrollHandler } from "@/components/ScrollHandler";
import { FontLoadingProvider } from "@/contexts/FontLoadingContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import theme from "@/hooks/useCustomTheme";
import { extractLanguage, SESSION_COOKIE_NAME } from "@/utils/languageSessionCookie";

import type { Language } from "@/utils/languageSessionCookie";

// ThemeProvider/CssBaseline は ClientLayout 側で適用

import type { Metadata } from "next";

function isLanguage(value: string | null | undefined): value is Language {
  return value === "ja" || value === "en";
}

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

// next/font: 欧文 Urbanist、日本語 M PLUS 1p を読み込み、CSS 変数として公開
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

const mplus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-mplus1p",
});

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = "G-JK7QMBRBPV";
  // SSR 時点で cookie から言語を取得し、<html lang> を正しく設定する
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const sessionLanguage = extractLanguage(sessionValue);
  const legacyValue = cookieStore.get("language")?.value;
  const legacyLanguage = legacyValue === "ja" || legacyValue === "en" ? legacyValue : undefined;
  const headerStore = headers();
  const forwardedLanguage = headerStore.get("x-app-language");
  const acceptLanguageHeader = headerStore.get("accept-language")?.toLowerCase() ?? "";
  const detectedLanguage = isLanguage(forwardedLanguage)
    ? forwardedLanguage
    : acceptLanguageHeader.startsWith("ja")
      ? "ja"
      : acceptLanguageHeader
        ? "en"
        : undefined;
  const lang: Language = sessionLanguage ?? legacyLanguage ?? detectedLanguage ?? "ja";

  return (
    <html lang={lang} className={`${urbanist.variable} ${mplus1p.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* MUI 推奨: body 直下で全体を AppRouterCacheProvider でラップ */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <FontLoadingProvider>
              <LanguageProvider initialLanguage={lang}>
                <FontLoadingScreen />
                <LanguageToggle />
                <GoogleAnalytics gaId={googleAnalyticsId} />
                <ScrollHandler />
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh",
                    zIndex: -1,
                    backgroundImage: `url('/images/workspace.jpg')`,
                    backgroundSize: { xs: "cover", sm: "contain" },
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: { xs: "center bottom", sm: "8% center" },
                  }}
                />
                <Box
                  sx={{
                    p: 1,
                    width: "100%",
                    minHeight: "100vh",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      maxWidth: "980px",
                      marginX: { xs: "auto", sm: 0 },
                      left: { xs: "auto", sm: "30%" },
                      width: { xs: "100%", sm: "70%" },
                    }}
                  >
                    <Typography
                      sx={{
                        mt: { xs: 5, sm: 10 },
                        mb: 5,
                        fontWeight: 300,
                        fontSize: { xs: 25, sm: 63 },
                        textAlign: { xs: "center", sm: "left" },
                      }}
                      component='h1'
                    >
                      Jun Murakami App Factory
                    </Typography>
                    {children}
                  </Box>
                </Box>
              </LanguageProvider>
            </FontLoadingProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}




