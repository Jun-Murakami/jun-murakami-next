"use client";

import { Box, CircularProgress } from "@mui/material";

import { useFontLoading } from "@/contexts/FontLoadingContext";

export function FontLoadingScreen() {
  const { isFontLoading } = useFontLoading();

  if (!isFontLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}
