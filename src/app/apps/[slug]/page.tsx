export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AppGridCard } from '@/components/AppGridCard';
import { GaEventBinder } from '@/components/GaEventBinder';
import { ScrollToTopButton } from '@/components/ScrollToTop';
import { StaticAppCard } from '@/components/StaticAppCard';
import { APP_BY_SLUG, APPS, resolveLocalizedUrl } from '@/data/apps';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';
import { resolveServerLanguage } from '@/utils/serverLanguage';

interface AppPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = APP_BY_SLUG[slug];
  if (!app) return {};
  const language = await resolveServerLanguage();
  const t = language === 'ja' ? ja : en;
  const meta = t.apps[app.localeKey];
  const title = `${meta.title} | Jun Murakami App Factory`;
  return {
    title,
    description: meta.description,
    openGraph: {
      title,
      description: meta.description,
      locale: language === 'ja' ? 'ja_JP' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
    },
  };
}

export default async function AppDetailPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = APP_BY_SLUG[slug];
  if (!app) notFound();

  const language = await resolveServerLanguage();
  const t = language === 'ja' ? ja : en;
  const appText = t.apps[app.localeKey];

  // Build the description node. The demo link is intentionally omitted here
  // because the embedded iframe and "open in new tab" button below already
  // provide access to the demo.
  const description: React.ReactNode = (() => {
    if (app.manualDownloadUrl) {
      return (
        <>
          {appText.longDescription}
          <br />
          {t.common.downloadText}{' '}
          <a href={app.manualDownloadUrl} target="_blank" rel="noreferrer">
            {t.common.download}
          </a>
          .
        </>
      );
    }
    return appText.longDescription;
  })();

  const related = APPS.filter(
    (other) => other.category === app.category && other.slug !== app.slug,
  ).slice(0, 4);

  return (
    <>
      <GaEventBinder language={language} />

      <Box sx={{ mb: 2 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            {t.appPage.backToTop}
          </Button>
        </Link>
      </Box>

      <Box sx={{ maxWidth: { md: 980 }, mx: { md: 'auto' } }}>
      <StaticAppCard
        appName={appText.title}
        sectionId={app.slug}
        screenshot={app.screenshot}
        description={description}
        noteUrl={app.noteUrl}
        zennUrl={app.zennUrl}
        gitHubUrl={app.gitHubUrl}
        policyUrl={app.policyUrl}
        gitHubRepo={app.gitHubRepo}
        appStoreUrl={resolveLocalizedUrl(app.appStoreUrl, language)}
        googlePlayUrl={app.googlePlayUrl}
        webAppUrl={app.webAppUrl}
        windowsAppUrl={app.windowsAppUrl}
        macUniversalAppUrl={app.macUniversalAppUrl}
        windowsZipUrl={app.windowsZipUrl}
        macZipUrl={app.macZipUrl}
        linuxZipUrl={app.linuxZipUrl}
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      {app.demoUrl && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Desktop: title + small "open" button row, iframe below */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography variant="h6" component="h2">
              {t.appPage.demoTitle}
            </Typography>
            <Button
              component="a"
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNewIcon />}
            >
              {t.appPage.openDemo}
            </Button>
          </Box>
          <Box
            component="iframe"
            src={app.demoUrl}
            title={`${appText.title} demo`}
            loading="lazy"
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: '100%',
              minHeight: 840,
              border: 0,
              borderRadius: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />

          {/* Mobile: title + prominent full-width CTA, no iframe */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mb: 2, textAlign: 'center' }}
            >
              {t.appPage.demoTitle}
            </Typography>
            <Button
              component="a"
              href={app.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {t.appPage.openDemo}
            </Button>
          </Box>
        </Box>
      )}

      {related.length > 0 && (
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            {t.appPage.relatedTitle}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {related.map((other) => {
              const otherText = t.apps[other.localeKey];
              return (
                <Grid
                  key={other.slug}
                  size={{ xs: 6, sm: 6, md: 3 }}
                  sx={{ display: 'flex' }}
                >
                  <AppGridCard
                    title={otherText.title}
                    screenshot={other.thumbnail}
                    description={otherText.description}
                    sectionId={other.slug}
                    href={`/apps/${other.slug}`}
                    data-ga-app={otherText.title}
                    sx={{ flexGrow: 1 }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      </Box>

      <ScrollToTopButton />
    </>
  );
}
