'use client';

import { CssBaseline, ThemeProvider, useMediaQuery, Box, Typography } from '@mui/material';
import { ScrollHandler } from '@/components/ScrollHandler';
import { useCustomTheme } from '@/hooks/useCustomTheme';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useCustomTheme();
  const isMobile = useMediaQuery(theme?.breakpoints.down('sm') ?? '(max-width:600px)');

  if (!theme) {
    return null; // テーマがロードされるまで何も表示しない
  }

  const logoSize = isMobile ? 'h5' : 'h2';
  const logoAlign = isMobile ? 'center' : 'left';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollHandler />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
          backgroundImage: `url('/images/workspace.jpg')`,
          backgroundSize: { xs: 'cover', sm: 'contain' },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: { xs: 'center bottom', sm: '8% center' },
        }}
      />
      <Box
        sx={{
          p: 1,
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '980px',
            marginX: { xs: 'auto', sm: 0 },
            left: { xs: 'auto', sm: '30%' },
            width: { xs: '100%', sm: '70%' },
          }}
        >
          <Typography variant={logoSize} align={logoAlign} sx={{ mt: { xs: 5, sm: 10 }, mb: 5 }}>
            Jun Murakami App Factory
          </Typography>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
