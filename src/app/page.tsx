export const dynamic = 'force-dynamic';
export const revalidate = 0;

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import XIcon from '@mui/icons-material/X';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { AppCatalog } from '@/components/AppCatalog';
import DynamicMobileScrollButton from '@/components/DynamicMobileScrollButton';
import { GaEventBinder } from '@/components/GaEventBinder';
import {
  IMDbLogoIcon,
  NoteLogoIcon,
  VGMdbLogoIcon,
  WikiLogoIcon,
  ZennLogoIcon,
} from '@/components/Icons';
import { LegacyAnchorRedirect } from '@/components/LegacyAnchorRedirect';
import { ScrollToTopButton } from '@/components/ScrollToTop';
import {
  APP_BY_LEGACY_ANCHOR,
  APPS,
  type AppCategory,
} from '@/data/apps';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';
import { resolveServerLanguage } from '@/utils/serverLanguage';

export default async function HomePage() {
  const language = await resolveServerLanguage();
  const t = language === 'ja' ? ja : en;

  const socialLinks = [
    {
      title: t.social.note,
      url: 'https://note.com/junmurakami/',
      icon: <NoteLogoIcon fontSize="large" />,
    },
    {
      title: t.social.zenn,
      url: 'https://zenn.dev/jun_murakami',
      icon: <ZennLogoIcon fontSize="medium" />,
    },
    {
      title: t.social.twitter,
      url: 'https://twitter.com/jun_murakami',
      icon: <XIcon fontSize="medium" />,
    },
    {
      title: t.social.instagram,
      url: 'https://www.instagram.com/jun9989/',
      icon: <InstagramIcon fontSize="medium" />,
    },
    {
      title: t.social.github,
      url: 'https://github.com/Jun-Murakami',
      icon: <GitHubIcon fontSize="medium" />,
    },
    {
      title: t.social.imdb,
      url: 'https://www.imdb.com/name/nm2687359',
      icon: <IMDbLogoIcon fontSize="large" />,
    },
    {
      title: t.social.vgmdb,
      url: 'https://vgmdb.net/artist/3937',
      icon: <VGMdbLogoIcon fontSize="large" />,
    },
    {
      title: t.social.wikipedia,
      url: 'https://ja.wikipedia.org/wiki/%E6%9D%91%E4%B8%8A%E7%B4%94_(%E9%9F%B3%E6%A5%BD%E5%AE%B6)',
      icon: <WikiLogoIcon fontSize="medium" />,
    },
    {
      title: t.social.contact,
      url: '/contact',
      icon: <MailOutlineIcon fontSize="medium" />,
      internal: true,
    },
  ];

  const titleByLocaleKey: Record<string, string> = {};
  const descByLocaleKey: Record<string, string> = {};
  for (const app of APPS) {
    titleByLocaleKey[app.localeKey] = t.apps[app.localeKey].title;
    descByLocaleKey[app.localeKey] = t.apps[app.localeKey].description;
  }

  const categoryLabels: Record<AppCategory, string> = {
    tools: t.appCategories.tools,
    music: t.appCategories.music,
  };

  const anchorToSlug = Object.fromEntries(
    Object.entries(APP_BY_LEGACY_ANCHOR).map(([anchor, app]) => [
      anchor,
      app.slug,
    ]),
  );

  return (
    <>
      <GaEventBinder language={language} />
      <LegacyAnchorRedirect anchorToSlug={anchorToSlug} />

      <Typography variant="body2" sx={{ p: { xs: 1, sm: 0 } }}>
        {t.intro.text}
        <br />
        {t.introPortfolio.text}{' '}
        <Link href={t.introLink.url} target="_blank" rel="noopener noreferrer">
          {t.introLink.text}
        </Link>
      </Typography>

      <Box sx={{ mt: 0.5, mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
        {socialLinks.map((link) => (
          <Tooltip title={link.title} key={link.title}>
            <IconButton
              sx={{ height: { xs: 40, sm: 44 }, width: { xs: 40, sm: 44 } }}
              component="a"
              {...(link.internal ? {} : { target: '_blank' })}
              href={link.url}
              data-ga-sns={link.title}
            >
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <DynamicMobileScrollButton />

      <AppCatalog
        apps={APPS}
        texts={{
          titleByLocaleKey,
          descByLocaleKey,
          categoryLabels,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
        <Button
          variant={'outlined'}
          startIcon={<MailOutlineIcon />}
          component="a"
          href="/contact"
          sx={{
            mb: 10,
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {t.common.contact}
        </Button>
      </Box>
      <ScrollToTopButton />
    </>
  );
}
