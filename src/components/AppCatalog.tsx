'use client';

import { Box, Grid, Typography } from '@mui/material';

import { AppGridCard } from '@/components/AppGridCard';
import type { AppCategory, AppDefinition } from '@/data/apps';

interface AppCatalogProps {
  apps: AppDefinition[];
  texts: {
    titleByLocaleKey: Record<string, string>;
    descByLocaleKey: Record<string, string>;
    categoryLabels: Record<AppCategory, string>;
  };
}

const categoryStyles: Record<
  AppCategory,
  { border: string; background: string }
> = {
  tools: {
    border: 'rgba(130, 177, 255, 0.45)',
    background:
      'linear-gradient(150deg, rgba(41, 98, 255, 0.28) 0%, rgba(13, 28, 64, 0.75) 55%, rgba(10, 19, 41, 0.0) 100%)',
  },
  music: {
    border: 'rgba(244, 143, 177, 0.4)',
    background:
      'linear-gradient(150deg, rgba(236, 64, 122, 0.28) 0%, rgba(79, 20, 53, 0.75) 55%, rgba(24, 8, 26, 0.0) 100%)',
  },
};

export function AppCatalog({ apps, texts }: AppCatalogProps) {
  const grouped: Record<AppCategory, AppDefinition[]> = {
    tools: [],
    music: [],
  };
  for (const app of apps) {
    grouped[app.category].push(app);
  }

  return (
    <Grid
      container
      spacing={2}
      className="digest-grid"
      sx={{
        mb: 6,
        alignItems: 'stretch',
      }}
    >
      {(['tools', 'music'] as const).map((category) => {
        const items = grouped[category];
        return (
          <Grid
            key={category}
            size={{ xs: 12, md: 6 }}
            sx={{
              display: 'flex',
              position: 'relative',
              '@media (hover: hover)': {
                '&:has(.app-card:hover)': {
                  zIndex: 5,
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1.5, md: 2 },
                p: { xs: 1.5, md: 2 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: categoryStyles[category].border,
                background: categoryStyles[category].background,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
                width: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 65%)',
                  pointerEvents: 'none',
                  borderRadius: 'inherit',
                  zIndex: 0,
                }}
              />
              <Typography
                variant="subtitle1"
                component="h2"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textAlign: { xs: 'center', md: 'left' },
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {texts.categoryLabels[category]}
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ position: 'relative', zIndex: 1 }}
              >
                {items.map((app) => (
                  <Grid
                    key={app.slug}
                    size={{ xs: 6, md: 6, lg: 4, xl: 3 }}
                    sx={{ display: 'flex' }}
                  >
                    <AppGridCard
                      title={texts.titleByLocaleKey[app.localeKey]}
                      screenshot={app.thumbnail}
                      description={texts.descByLocaleKey[app.localeKey]}
                      sectionId={app.slug}
                      href={`/apps/${app.slug}`}
                      data-ga-app={texts.titleByLocaleKey[app.localeKey]}
                      sx={{ flexGrow: 1 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
