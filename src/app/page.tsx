export const dynamic = 'force-dynamic';
export const revalidate = 0;

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import XIcon from '@mui/icons-material/X';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';

import * as screenshots from '@/assets/screenshots';
import { AppGridCard } from '@/components/AppGridCard';
import DynamicMobileScrollButton from '@/components/DynamicMobileScrollButton';
import { GaEventBinder } from '@/components/GaEventBinder';
import {
  IMDbLogoIcon,
  NoteLogoIcon,
  VGMdbLogoIcon,
  WikiLogoIcon,
  ZennLogoIcon,
} from '@/components/Icons';
import { ScrollToTopButton } from '@/components/ScrollToTop';
import { StaticAppCard } from '@/components/StaticAppCard';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';
import {
  extractLanguage,
  SESSION_COOKIE_NAME,
} from '@/utils/languageSessionCookie';

import type { Language } from '@/utils/languageSessionCookie';

function isLanguage(value: string | null | undefined): value is Language {
  return value === 'ja' || value === 'en';
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const sessionLanguage = extractLanguage(sessionValue);
  const legacyValue = cookieStore.get('language')?.value;
  const legacyLanguage =
    legacyValue === 'ja' || legacyValue === 'en' ? legacyValue : undefined;
  const headerStore = await headers();
  const forwardedLanguage = headerStore.get('x-app-language');
  const acceptLanguageHeader =
    headerStore.get('accept-language')?.toLowerCase() ?? '';
  const detectedLanguage = isLanguage(forwardedLanguage)
    ? forwardedLanguage
    : acceptLanguageHeader.startsWith('ja')
      ? 'ja'
      : acceptLanguageHeader
        ? 'en'
        : undefined;
  const language: Language =
    sessionLanguage ?? legacyLanguage ?? detectedLanguage ?? 'ja';
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
  ];

  const appGridItems = {
    tools: [
      {
        title: t.apps.wlsib.title,
        screenshot: screenshots.wlsib_s,
        description: t.apps.wlsib.description,
        sectionId: 'wlsib',
      },
      {
        title: t.apps.aiBrowser.title,
        screenshot: screenshots.aiBrowser_s,
        description: t.apps.aiBrowser.description,
        sectionId: 'aiBrowser',
      },
      {
        title: t.apps.lightroom2Resolve.title,
        screenshot: screenshots.lightroom2Resolve_s,
        description: t.apps.lightroom2Resolve.description,
        sectionId: 'lightroom2Resolve',
      },
      {
        title: t.apps.keyfit.title,
        screenshot: screenshots.keyfit_s,
        description: t.apps.keyfit.description,
        sectionId: 'keyfit',
      },
      {
        title: t.apps.taskTrees.title,
        screenshot: screenshots.taskTrees_s,
        description: t.apps.taskTrees.description,
        sectionId: 'tasktrees',
      },
      {
        title: t.apps.monacoNotepad.title,
        screenshot: screenshots.monacoNotepad_s,
        description: t.apps.monacoNotepad.description,
        sectionId: 'monacoNotepad',
      },
      {
        title: t.apps.dropboxSkipper.title,
        screenshot: screenshots.dropboxSkipper_s,
        description: t.apps.dropboxSkipper.description,
        sectionId: 'dropbox-skipper',
      },
    ],
    music: [
      {
        title: t.apps.mixCompare.title,
        screenshot: screenshots.mixCompare_s,
        description: t.apps.mixCompare.description,
        sectionId: 'mixCompare',
      },
      {
        title: t.apps.yomigana.title,
        screenshot: screenshots.yomigana_s,
        description: t.apps.yomigana.description,
        sectionId: 'yomigana',
      },
      {
        title: t.apps.cubaseDMEditor.title,
        screenshot: screenshots.cubaseDMEditor_s,
        description: t.apps.cubaseDMEditor.description,
        sectionId: 'cubaseDMEditor',
      },
      {
        title: t.apps.famitone.title,
        screenshot: screenshots.famitone_s,
        description: t.apps.famitone.description,
        sectionId: 'famitone',
      },
    ],
  } as const;

  const appCategories = [
    { key: 'tools', label: t.appCategories.tools, items: appGridItems.tools },
    { key: 'music', label: t.appCategories.music, items: appGridItems.music },
  ] as const;

  return (
    <>
      <GaEventBinder language={language} />

      <Typography variant="body2" sx={{ p: { xs: 1, sm: 0 } }}>
        {t.intro.text}
        <br />
        {t.introPortfolio.text}{' '}
        <Link href={t.introLink.url} target="_blank" rel="noopener noreferrer">
          {t.introLink.text}
        </Link>
      </Typography>

      <Box sx={{ mt: 1, mb: 5, textAlign: { xs: 'center', sm: 'left' } }}>
        {socialLinks.map((link) => (
          <Tooltip title={link.title} key={link.title}>
            <IconButton
              sx={{ height: { xs: 45, sm: 50 }, width: { xs: 45, sm: 50 } }}
              component="a"
              target="_blank"
              href={link.url}
              data-ga-sns={link.title}
            >
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <DynamicMobileScrollButton />

      <Grid
        container
        spacing={2}
        sx={{
          mb: 10,
          alignItems: 'stretch',
          position: 'relative',
        }}
        className="digest-grid"
      >
        {appCategories.map((category) => (
          <Grid
            key={category.key}
            size={{ xs: 12, md: 6 }}
            sx={{ display: 'flex' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1.5, md: 2 },
                p: { xs: 1.5, md: 2 },
                borderRadius: 3,
                border: '1px solid',
                borderColor:
                  category.key === 'tools'
                    ? 'rgba(130, 177, 255, 0.45)'
                    : 'rgba(244, 143, 177, 0.4)',
                background:
                  category.key === 'tools'
                    ? 'linear-gradient(150deg, rgba(41, 98, 255, 0.28) 0%, rgba(13, 28, 64, 0.75) 55%, rgba(10, 19, 41, 0.0) 100%)'
                    : 'linear-gradient(150deg, rgba(236, 64, 122, 0.28) 0%, rgba(79, 20, 53, 0.75) 55%, rgba(24, 8, 26, 0.0) 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
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
                {category.label}
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ position: 'relative', zIndex: 1 }}
              >
                {category.items.map((app) => (
                  <Grid
                    key={app.sectionId}
                    size={{ xs: 6, md: 6 }}
                    sx={{ display: 'flex' }}
                  >
                    <AppGridCard
                      {...app}
                      data-ga-app={app.title}
                      sx={{ flexGrow: 1 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 以下はそのままサーバで描画 */}
      <StaticAppCard
        appName={t.apps.wlsib.title}
        sectionId="wlsib"
        screenshot={screenshots.wlsib}
        description={t.apps.wlsib.longDescription}
        noteUrl="https://note.com/junmurakami/n/n36b1e198f287"
        gitHubUrl="https://github.com/Jun-Murakami/wlsib"
        policyUrl="/privacy-policy-wlsib"
        appStoreUrl="https://apps.apple.com/jp/app/%E3%83%AC%E3%83%B3%E3%82%BA%E4%BD%95%E6%8C%81%E3%81%A3%E3%81%A6%E3%81%8F/id6480391376"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.wlsib.app"
        webAppUrl="https://lensdore-c55ce.web.app/"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.aiBrowser.title}
        sectionId="aiBrowser"
        screenshot={screenshots.aiBrowser}
        description={t.apps.aiBrowser.longDescription}
        gitHubRepo="Jun-Murakami/AI-Browser"
        noteUrl="https://note.com/junmurakami/n/n5d674f5977e6"
        zennUrl="https://zenn.dev/jun_murakami/articles/3a885d936e8937"
        gitHubUrl="https://github.com/Jun-Murakami/AI-Browser"
        windowsAppUrl="https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}-setup_win_x64.exe"
        macUniversalAppUrl="https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}_mac_universal.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.lightroom2Resolve.title}
        sectionId="lightroom2Resolve"
        screenshot={screenshots.lightroom2Resolve}
        description={t.apps.lightroom2Resolve.longDescription}
        gitHubRepo="Jun-Murakami/LightroomToResolve"
        noteUrl="https://note.com/junmurakami/n/n2737001eaf88"
        gitHubUrl="https://github.com/Jun-Murakami/LightroomToResolve"
        windowsAppUrl="https://github.com/Jun-Murakami/LightroomToResolve/releases/download/v{{version}}/LightroomToResolve_{{version}}_windows.zip"
        macUniversalAppUrl="https://github.com/Jun-Murakami/LightroomToResolve/releases/download/v{{version}}/LightroomToResolve_{{version}}_macOS.pkg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.keyfit.title}
        sectionId="keyfit"
        screenshot={screenshots.keyfit}
        description={t.apps.keyfit.longDescription}
        gitHubRepo="Jun-Murakami/KeyFit"
        zennUrl="https://zenn.dev/jun_murakami/articles/b7502bd19a97db"
        gitHubUrl="https://github.com/Jun-Murakami/KeyFit"
        windowsAppUrl="https://github.com/Jun-Murakami/KeyFit/releases/download/v{{version}}/KeyFit_{{version}}_x64_en-US.msi"
        macUniversalAppUrl="https://github.com/Jun-Murakami/KeyFit/releases/download/v{{version}}/KeyFit_{{version}}_universal.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.mixCompare.title}
        sectionId="mixCompare"
        screenshot={screenshots.mixCompare}
        description={t.apps.mixCompare.longDescription}
        gitHubRepo="Jun-Murakami/MixCompare"
        zennUrl="https://zenn.dev/jun_murakami/articles/f9b3227fadfe7e"
        gitHubUrl="https://github.com/Jun-Murakami/MixCompare"
        windowsAppUrl="https://github.com/Jun-Murakami/MixCompare/releases/download/v3.0.0/MixCompare_3.0.0_Windows_Setup.exe"
        macUniversalAppUrl="https://github.com/Jun-Murakami/MixCompare/releases/download/v3.0.0/MixCompare_3.0.0_macOS.pkg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.yomigana.title}
        sectionId="yomigana"
        screenshot={screenshots.yomigana}
        description={t.apps.yomigana.longDescription}
        noteUrl="https://note.com/junmurakami/n/n35cd70b8dc12"
        gitHubUrl="https://github.com/Jun-Murakami/yomigana3"
        webAppUrl="https://yomiganaconverterreact.web.app/"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.taskTrees.title}
        sectionId="tasktrees"
        screenshot={screenshots.taskTrees}
        description={t.apps.taskTrees.longDescription}
        gitHubRepo="Jun-Murakami/TaskTrees-Electron"
        noteUrl="https://note.com/junmurakami/n/n651efffaf343"
        gitHubUrl="https://github.com/Jun-Murakami/TaskTrees"
        policyUrl="/privacy-policy-tasktrees"
        webAppUrl="https://tasktree-s.web.app/"
        appStoreUrl="https://apps.apple.com/jp/app/tasktrees/id6482979857"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.tasktrees.app"
        windowsAppUrl="https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v{{version}}/TaskTrees-{{version}}-setup_win_x64.exe"
        macUniversalAppUrl="https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v{{version}}/TaskTrees-{{version}}_mac_universal.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.dropboxSkipper.title}
        sectionId="dropbox-skipper"
        screenshot={screenshots.dropboxSkipper}
        description={t.apps.dropboxSkipper.longDescription}
        zennUrl="https://zenn.dev/jun_murakami/articles/1dc9d0a2ffa3d6"
        noteUrl="https://note.com/junmurakami/n/n0911c5853082"
        gitHubUrl="https://github.com/Jun-Murakami/dropboxskipper"
        gitHubRepo="Jun-Murakami/dropboxskipper"
        windowsAppUrl="https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-win64-installer-{{version}}.exe"
        macUniversalAppUrl="https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-macOS-universal-{{version}}.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.monacoNotepad.title}
        sectionId="monacoNotepad"
        screenshot={screenshots.monacoNotepad}
        policyUrl="/privacy-policy-monaco-notepad"
        description={t.apps.monacoNotepad.longDescription}
        gitHubRepo="Jun-Murakami/monaco-notepad"
        zennUrl="https://zenn.dev/jun_murakami/articles/e80016061b4df5"
        gitHubUrl="https://github.com/Jun-Murakami/monaco-notepad"
        windowsAppUrl="https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-win64-installer-{{version}}.exe"
        macUniversalAppUrl="https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-mac-universal-{{version}}.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.cubaseDMEditor.title}
        sectionId="cubaseDMEditor"
        screenshot={screenshots.cubaseDMEditor}
        description={
          <>
            {t.apps.cubaseDMEditor.longDescription}
            <br />
            {t.common.downloadText}{' '}
            <a
              href="https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v1.0/DrumMaps20230810.zip"
              target="_blank"
              rel="noreferrer"
            >
              {t.common.download}
            </a>
            .
          </>
        }
        gitHubRepo="Jun-Murakami/CubaseDrumMapEditor"
        noteUrl="https://note.com/junmurakami/n/n13650982fc7f"
        gitHubUrl="https://github.com/Jun-Murakami/CubaseDrumMapEditor"
        windowsAppUrl="https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_win.zip"
        macUniversalAppUrl="https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_mac.dmg"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
        }}
      />

      <StaticAppCard
        appName={t.apps.famitone.title}
        sectionId="famitone"
        screenshot={screenshots.famitone}
        description={
          <>
            {t.apps.famitone.longDescription}
            <br />
            {t.common.downloadText}{' '}
            <a
              href="https://github.com/Jun-Murakami/Famitone/releases/download/v1.0/Famitone2A03_v1.0.zip"
              target="_blank"
              rel="noreferrer"
            >
              {t.common.download}
            </a>
            .
          </>
        }
        noteUrl="https://note.com/junmurakami/n/n1e525af59ada"
        labels={{
          noteArticle: t.common.noteArticle,
          zennArticle: t.common.zennArticle,
          sourceCode: t.common.sourceCode,
          privacyPolicy: t.common.privacyPolicy,
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
