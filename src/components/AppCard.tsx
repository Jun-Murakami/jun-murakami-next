'use client';
import { type ReactNode, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import GitHubIcon from '@mui/icons-material/GitHub';
import PolicyIcon from '@mui/icons-material/Policy';
import { Box, Button, Card, Divider, Fade, Popper, Tooltip, Typography } from '@mui/material';
import Image, { type StaticImageData } from 'next/image';

import * as badges from '@/assets/badges';
import { NoteSmallLogoIcon, ZennLogoIcon } from '@/components/Icons';

interface AppCardProps {
  appName: string;
  sectionId: string;
  screenshot: StaticImageData;
  description: ReactNode;
  latestRelease?: { version: string; body: string } | null;
  noteUrl?: string;
  zennUrl?: string;
  gitHubUrl?: string;
  policyUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string | null;
  macAppleSiliconAppUrl?: string | null;
  macIntelAppUrl?: string | null;
  macUniversalAppUrl?: string | null;
  handleNotice?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AppCard = ({
  appName,
  sectionId,
  screenshot,
  description,
  latestRelease,
  noteUrl,
  zennUrl,
  gitHubUrl,
  policyUrl,
  appStoreUrl,
  googlePlayUrl,
  webAppUrl,
  windowsAppUrl,
  macAppleSiliconAppUrl,
  macIntelAppUrl,
  macUniversalAppUrl,
  handleNotice,
}: AppCardProps) => {
  const [openReleaseLog, setOpenReleaseLog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAppStyle = {
    p: 0,
    mr: 2,
    mt: 2,
    '&:hover img': {
      opacity: 0.7,
    },
  };

  const handleReleaseLog = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenReleaseLog((previousOpen) => !previousOpen);
  };

  const canBeOpen = openReleaseLog && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <Card sx={{ p: 2, marginY: 4, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}>
      <Typography variant='h5' id={sectionId}>
        {appName}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ maxWidth: 500, mb: 2 }}>
        <Image
          src={screenshot}
          alt={appName}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Typography variant='body1'>{description}</Typography>
      {(noteUrl || gitHubUrl || policyUrl) && (
        <Box sx={{ marginY: 2 }}>
          {noteUrl && (
            <Button
              component='a'
              href={noteUrl}
              target='_blank'
              startIcon={<NoteSmallLogoIcon />}
              sx={{ textTransform: 'none', mr: 2 }}
            >
              noteの紹介記事
            </Button>
          )}
          {zennUrl && (
            <Button
              component='a'
              href={zennUrl}
              target='_blank'
              startIcon={<ZennLogoIcon />}
              sx={{ textTransform: 'none', mr: 2 }}
            >
              Zennの記事
            </Button>
          )}
          {gitHubUrl && (
            <Button component='a' href={gitHubUrl} target='_blank' startIcon={<GitHubIcon />} sx={{ mr: 2 }}>
              ソースコード
            </Button>
          )}
          {policyUrl && (
            <Button component='a' href={policyUrl} target='_blank' startIcon={<PolicyIcon />}>
              プライバシーポリシー
            </Button>
          )}
        </Box>
      )}
      {(appStoreUrl || googlePlayUrl || webAppUrl || windowsAppUrl || macAppleSiliconAppUrl || macIntelAppUrl) && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ marginY: 2 }}>
            {latestRelease && (
              <Box sx={{ mt: { xs: 0, sm: -2 }, mb: { xs: 0, sm: -2 }, ml: 0.5 }}>
                <Typography variant='caption'>
                  {' '}
                  v{latestRelease.version} :{' '}
                  <Button onClick={handleReleaseLog} sx={{ textTransform: 'none' }}>
                    Release Notes
                  </Button>
                </Typography>
                <Popper id={id} open={openReleaseLog} anchorEl={anchorEl} transition placement='top'>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Box
                        sx={{
                          border: 1,
                          p: 1,
                          borderRadius: 3,
                          bgcolor: 'rgba(50,50,50,0.3)',
                          backdropFilter: 'blur(10px)',
                          textAlign: 'left',
                          marginX: 2,
                        }}
                      >
                        <ReactMarkdown>{latestRelease.body}</ReactMarkdown>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </Box>
            )}
            {appStoreUrl && (
              <Tooltip title='App Storeで開く'>
                <Button sx={openAppStyle} component='a' href={appStoreUrl} target='_blank'>
                  <Image src={badges.appleStore} alt='Apple App Store' height={45} />
                </Button>
              </Tooltip>
            )}
            {googlePlayUrl && (
              <Tooltip title='Google Playで開く'>
                <Button sx={openAppStyle} component='a' href={googlePlayUrl} target='_blank'>
                  <Image src={badges.googlePlay} alt='Google Play' height={45} />
                </Button>
              </Tooltip>
            )}
            {webAppUrl && (
              <Tooltip title='Webアプリを開く'>
                <Button sx={openAppStyle} component='a' href={webAppUrl} target='_blank'>
                  <Image src={badges.webApp} alt='Web App' height={45} />
                </Button>
              </Tooltip>
            )}
            {windowsAppUrl && (
              <Tooltip title='Windowsアプリをダウンロード'>
                <Button sx={openAppStyle} component='a' href={windowsAppUrl} download>
                  <Image src={badges.windows} alt='Windows' height={45} />
                </Button>
              </Tooltip>
            )}
            {macAppleSiliconAppUrl && (
              <Tooltip title='macOSアプリ(Apple Silicon/M1, M2, M3...)をダウンロード'>
                <Button sx={openAppStyle} component='a' href={macAppleSiliconAppUrl} download>
                  <Image src={badges.macAppleSilicon} alt='Apple Silicon Mac' height={45} />
                </Button>
              </Tooltip>
            )}
            {macIntelAppUrl && (
              <Tooltip title='macOSアプリ(Intel Mac)をダウンロード'>
                <Button sx={openAppStyle} component='a' href={macIntelAppUrl} download>
                  <Image src={badges.macIntel} alt='Intel Mac' height={45} />
                </Button>
              </Tooltip>
            )}
            {macUniversalAppUrl && (
              <Tooltip title='macOSアプリ(Universal)をダウンロード'>
                <Button sx={openAppStyle} component='a' href={macUniversalAppUrl} download>
                  <Image src={badges.macUniversal} alt='Universal Mac' height={45} />
                </Button>
              </Tooltip>
            )}
            {windowsAppUrl && handleNotice && (
              <Button variant='text' size='small' sx={{ mt: 2, textTransform: 'none' }} onClick={handleNotice}>
                ※Windows版のセキュリティ警告について
              </Button>
            )}
          </Box>
        </>
      )}
    </Card>
  );
};
