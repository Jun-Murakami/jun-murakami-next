"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FontLoadingContextType = {
  isFontLoading: boolean;
};

const FontLoadingContext = createContext<FontLoadingContextType>({
  isFontLoading: true,
});

export function FontLoadingProvider({
  children,
}: { children: React.ReactNode }) {
  const [isFontLoading, setIsFontLoading] = useState(true);

  useEffect(() => {
    const checkFonts = async () => {
      try {
        // フォントの読み込みを待機
        await document.fonts.ready;
        setIsFontLoading(false);
      } catch (error) {
        console.error("Font loading error:", error);
        setIsFontLoading(false);
      }
    };

    checkFonts();
  }, []);

  return (
    <FontLoadingContext.Provider value={{ isFontLoading }}>
      {children}
    </FontLoadingContext.Provider>
  );
}

export const useFontLoading = () => useContext(FontLoadingContext);
