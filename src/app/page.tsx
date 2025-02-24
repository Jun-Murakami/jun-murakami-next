'use client';

import dynamic from 'next/dynamic';
import { Button, Box, IconButton, Typography, Tooltip, Grid2 } from '@mui/material';
import { NoteLogoIcon, IMDbLogoIcon, VGMdbLogoIcon, WikiLogoIcon } from '@/components/Icons';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import * as screenshots from '@/assets/screenshots';
import { StaticAppCard } from '@/components/StaticAppCard';
import { AppGridCard } from '@/components/AppGridCard';
import { ScrollToTopButton } from '@/components/ScrollToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { ja } from '@/locales/ja';
import { en } from '@/locales/en';

const DynamicMobileScrollButton = dynamic(() => import('@/components/DynamicMobileScrollButton'));

export default function HomePage() {
  const { language } = useLanguage();
  const t = language === 'ja' ? ja : en;

  const socialLinks = [
    { title: t.social.note, url: 'https://note.com/junmurakami/', icon: <NoteLogoIcon fontSize='large' /> },
    { title: t.social.twitter, url: 'https://twitter.com/jun_murakami', icon: <XIcon fontSize='medium' /> },
    { title: t.social.instagram, url: 'https://www.instagram.com/jun9989/', icon: <InstagramIcon fontSize='medium' /> },
    { title: t.social.github, url: 'https://github.com/Jun-Murakami', icon: <GitHubIcon fontSize='medium' /> },
    { title: t.social.imdb, url: 'https://www.imdb.com/name/nm2687359', icon: <IMDbLogoIcon fontSize='large' /> },
    {
      title: t.social.vgmdb,
      url: 'https://vgmdb.net/artist/3937',
      icon: <VGMdbLogoIcon fontSize='large' />,
    },
    {
      title: t.social.wikipedia,
      url: 'https://ja.wikipedia.org/wiki/%E6%9D%91%E4%B8%8A%E7%B4%94_(%E9%9F%B3%E6%A5%BD%E5%AE%B6)',
      icon: <WikiLogoIcon fontSize='medium' />,
    },
  ];

  const appGridItems = [
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
      title: t.apps.monacoNotepad.title,
      screenshot: screenshots.monacoNotepad_s,
      description: t.apps.monacoNotepad.description,
      sectionId: 'monacoNotepad',
    },
    {
      title: t.apps.yomigana.title,
      screenshot: screenshots.yomigana_s,
      description: t.apps.yomigana.description,
      sectionId: 'yomigana',
    },
    {
      title: t.apps.dropboxSkipper.title,
      screenshot: screenshots.dropboxSkipper_s,
      description: t.apps.dropboxSkipper.description,
      sectionId: 'dropbox-skipper',
    },
    {
      title: t.apps.taskTrees.title,
      screenshot: screenshots.taskTrees_s,
      description: t.apps.taskTrees.description,
      sectionId: 'tasktrees',
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
  ];

  return (
    <>
      <Typography variant='body2' sx={{ p: { xs: 1, sm: 0 } }}>
        {t.intro.text}
      </Typography>

      <Box sx={{ mt: 1, mb: 5, textAlign: { xs: 'center', sm: 'left' } }}>
        {socialLinks.map((link) => (
          <Tooltip title={link.title} key={link.title}>
            <IconButton sx={{ height: 50, width: 50 }} component='a' target='_blank' href={link.url}>
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <DynamicMobileScrollButton />

      <Grid2 container spacing={2} sx={{ mb: 10 }} className='digest-grid'>
        {appGridItems.map((app) => (
          <Grid2 size={{ xs: 6, md: 3 }} key={app.sectionId}>
            <AppGridCard {...app} />
          </Grid2>
        ))}
      </Grid2>

      <StaticAppCard
        appName={t.apps.wlsib.title}
        sectionId='wlsib'
        screenshot={screenshots.wlsib}
        description={t.apps.wlsib.longDescription}
        noteUrl='https://note.com/junmurakami/n/n36b1e198f287'
        gitHubUrl='https://github.com/Jun-Murakami/wlsib'
        policyUrl='/privacy-policy-wlsib'
        appStoreUrl='https://apps.apple.com/jp/app/%E3%83%AC%E3%83%B3%E3%82%BA%E4%BD%95%E6%8C%81%E3%81%A3%E3%81%A6%E3%81%8F/id6480391376'
        googlePlayUrl='https://play.google.com/store/apps/details?id=com.wlsib.app'
        webAppUrl='https://lensdore-c55ce.web.app/'
      />

      <StaticAppCard
        appName={t.apps.aiBrowser.title}
        sectionId='aiBrowser'
        screenshot={screenshots.aiBrowser}
        description={t.apps.aiBrowser.longDescription}
        gitHubRepo='Jun-Murakami/AI-Browser'
        noteUrl='https://note.com/junmurakami/n/n5d674f5977e6'
        gitHubUrl='https://github.com/Jun-Murakami/AI-Browser'
        windowsAppUrl='https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}-setup_win_x64.exe'
        macUniversalAppUrl='https://github.com/Jun-Murakami/AI-Browser/releases/download/v{{version}}/AI-Browser-{{version}}_mac_universal.dmg'
      />

      <StaticAppCard
        appName={t.apps.monacoNotepad.title}
        sectionId='monacoNotepad'
        screenshot={screenshots.monacoNotepad}
        policyUrl='/privacy-policy-monaco-notepad'
        description={t.apps.monacoNotepad.longDescription}
        gitHubRepo='Jun-Murakami/monaco-notepad'
        zennUrl='https://zenn.dev/jun_murakami/articles/e80016061b4df5'
        gitHubUrl='https://github.com/Jun-Murakami/monaco-notepad'
        windowsAppUrl='https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-win64-installer-{{version}}.exe'
        macUniversalAppUrl='https://github.com/Jun-Murakami/monaco-notepad/releases/download/v{{version}}/MonacoNotepad-mac-universal-{{version}}.dmg'
      />

      <StaticAppCard
        appName={t.apps.yomigana.title}
        sectionId='yomigana'
        screenshot={screenshots.yomigana}
        description={t.apps.yomigana.longDescription}
        gitHubRepo='Jun-Murakami/YomiganaConverter'
        noteUrl='https://note.com/junmurakami/n/n35cd70b8dc12'
        gitHubUrl='https://github.com/Jun-Murakami/YomiganaConverter'
        webAppUrl='https://yomiganaconverterreact.web.app/'
        windowsAppUrl='https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v{{version}}/YomiganaConverter_v{{version}}_win.zip'
        macAppleSiliconAppUrl='https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v{{version}}/YomiganaConverter_v{{version}}_mac_arm64.zip'
        macIntelAppUrl='https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v{{version}}/YomiganaConverter_v{{version}}_mac_x64.zip'
      />

      <StaticAppCard
        appName={t.apps.dropboxSkipper.title}
        sectionId='dropbox-skipper'
        screenshot={screenshots.dropboxSkipper}
        description={t.apps.dropboxSkipper.longDescription}
        zennUrl='https://zenn.dev/jun_murakami/articles/1dc9d0a2ffa3d6'
        noteUrl='https://note.com/junmurakami/n/n0911c5853082'
        gitHubUrl='https://github.com/Jun-Murakami/dropboxskipper'
        gitHubRepo='Jun-Murakami/dropboxskipper'
        windowsAppUrl='https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-win64-installer-{{version}}.exe'
        macUniversalAppUrl='https://github.com/Jun-Murakami/dropboxskipper/releases/download/v{{version}}/DropboxSkipper-macOS-universal-{{version}}.dmg'
      />

      <StaticAppCard
        appName={t.apps.taskTrees.title}
        sectionId='tasktrees'
        screenshot={screenshots.taskTrees}
        description={t.apps.taskTrees.longDescription}
        gitHubRepo='Jun-Murakami/TaskTrees-Electron'
        noteUrl='https://note.com/junmurakami/n/n651efffaf343'
        gitHubUrl='https://github.com/Jun-Murakami/TaskTrees'
        policyUrl='/privacy-policy-tasktrees'
        webAppUrl='https://tasktree-s.web.app/'
        appStoreUrl='https://apps.apple.com/jp/app/tasktrees/id6482979857'
        googlePlayUrl='https://play.google.com/store/apps/details?id=com.tasktrees.app'
        windowsAppUrl='https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v{{version}}/TaskTrees-{{version}}-setup_win_x64.exe'
        macUniversalAppUrl='https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v{{version}}/TaskTrees-{{version}}_mac_universal.dmg'
      />

      <StaticAppCard
        appName={t.apps.cubaseDMEditor.title}
        sectionId='cubaseDMEditor'
        screenshot={screenshots.cubaseDMEditor}
        description={
          <>
            {t.apps.cubaseDMEditor.longDescription}
            <br />
            {t.common.downloadText}{' '}
            <a
              href='https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v1.0/DrumMaps20230810.zip'
              target='_blank'
              rel="noreferrer"
            >
              {t.common.download}
            </a>.
          </>
        }
        gitHubRepo='Jun-Murakami/CubaseDrumMapEditor'
        noteUrl='https://note.com/junmurakami/n/n13650982fc7f'
        gitHubUrl='https://github.com/Jun-Murakami/CubaseDrumMapEditor'
        windowsAppUrl='https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_win.zip'
        macAppleSiliconAppUrl='https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_mac_arm64.zip'
        macIntelAppUrl='https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v{{version}}/CubaseDrumMapEditor_v{{version}}_mac_x64.zip'
      />

      <StaticAppCard
        appName={t.apps.famitone.title}
        sectionId='famitone'
        screenshot={screenshots.famitone}
        description={
          <>
            {t.apps.famitone.longDescription}
            <br />
            {t.common.downloadText}{' '}
            <a href='https://github.com/Jun-Murakami/Famitone/releases/download/v1.0/Famitone2A03_v1.0.zip' target='_blank' rel="noreferrer">
              {t.common.download}
            </a>.
          </>
        }
        noteUrl='https://note.com/junmurakami/n/n1e525af59ada'
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
        <Button
          variant={'outlined'}
          startIcon={<MailOutlineIcon />}
          component='a'
          href='/contact'
          sx={{ mb: 10, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}
        >
          {t.common.contact}
        </Button>
      </Box>
      <ScrollToTopButton />
    </>
  );
}
