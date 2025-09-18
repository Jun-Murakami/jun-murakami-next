'use client';

import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { ScrollHandler } from '@/components/ScrollHandler';
import theme from '@/hooks/useCustomTheme';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Typography
            sx={{
              mt: { xs: 5, sm: 10 },
              mb: 5,
              fontWeight: 300,
              fontSize: { xs: 25, sm: 63 },
              textAlign: { xs: 'center', sm: 'left' },
            }}
            component='h1'
          >
            Jun Murakami App Factory
          </Typography>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
