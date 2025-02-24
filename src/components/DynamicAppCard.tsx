'use client';

import { useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { Box, Button, Tooltip, Divider, Typography, Popper, Fade, CircularProgress } from '@mui/material';
import Image from 'next/image';
import * as badges from '@/assets/badges';
import ReactMarkdown from 'react-markdown';

const clientId = process.env.NEXT_PUBLIC_GIT_HUB_APP_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GIT_HUB_APP_CLIENT_SECRET;

interface DynamicAppCardProps {
  gitHubRepo?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string | null;
  macAppleSiliconAppUrl?: string | null;
  macIntelAppUrl?: string | null;
  macUniversalAppUrl?: string | null;
}

const DynamicAppCard = ({
  gitHubRepo,
  appStoreUrl,
  googlePlayUrl,
  webAppUrl,
  windowsAppUrl,
  macAppleSiliconAppUrl,
  macIntelAppUrl,
  macUniversalAppUrl,
}: DynamicAppCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [latestRelease, setLatestRelease] = useState<{ version: string; body: string } | null>(null);
  const [replacedUrls, setReplacedUrls] = useState<{ [key: string]: string | undefined }>({});
  const [openReleaseLog, setOpenReleaseLog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNotice, setOpenNotice] = useState(false);
  const [anchorElPopper, setAnchorElPopper] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!gitHubRepo) return;
    const fetchLatestRelease = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/repos/${gitHubRepo}/releases/latest?client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await response.json();
        setLatestRelease({
          version: data.tag_name.replace('v', ''),
          body: data.body,
        });
        if (windowsAppUrl || macAppleSiliconAppUrl || macIntelAppUrl || macUniversalAppUrl) {
          setReplacedUrls({
            windowsAppUrl: windowsAppUrl?.replace(/{{version}}/g, data.tag_name.replace('v', '')),
            macAppleSiliconAppUrl: macAppleSiliconAppUrl?.replace(/{{version}}/g, data.tag_name.replace('v', '')),
            macIntelAppUrl: macIntelAppUrl?.replace(/{{version}}/g, data.tag_name.replace('v', '')),
            macUniversalAppUrl: macUniversalAppUrl?.replace(/{{version}}/g, data.tag_name.replace('v', '')),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestRelease();
  }, [gitHubRepo, windowsAppUrl, macAppleSiliconAppUrl, macIntelAppUrl, macUniversalAppUrl]);

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

  const handleNotice = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPopper(event.currentTarget);
    setOpenNotice((previousOpen) => !previousOpen);
  };

  const sendLogEvent = (eventName: string, eventParams?: string) => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      sendGAEvent('event', 'buttonClicked', { button_name: eventName, url: eventParams });
    } else {
      console.log('Event:', 'buttonClicked', { button_name: eventName, url: eventParams });
    }
  };

  const canBeOpen = openReleaseLog && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      {(appStoreUrl ||
        googlePlayUrl ||
        webAppUrl ||
        replacedUrls.windowsAppUrl ||
        replacedUrls.macAppleSiliconAppUrl ||
        replacedUrls.macIntelAppUrl ||
        replacedUrls.macUniversalAppUrl) && (
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
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={appStoreUrl}
                    target='_blank'
                    onClick={() => sendLogEvent('app_store_click', appStoreUrl)}
                  >
                    <Image src={badges.appleStore} alt='Apple App Store' height={45} />
                  </Button>
                </Tooltip>
              )}
              {googlePlayUrl && (
                <Tooltip title='Google Playで開く'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={googlePlayUrl}
                    target='_blank'
                    onClick={() => sendLogEvent('google_play_click', googlePlayUrl)}
                  >
                    <Image src={badges.googlePlay} alt='Google Play' height={45} />
                  </Button>
                </Tooltip>
              )}
              {webAppUrl && (
                <Tooltip title='Webアプリを開く'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={webAppUrl}
                    target='_blank'
                    onClick={() => sendLogEvent('web_app_click', webAppUrl)}
                  >
                    <Image src={badges.webApp} alt='Web App' height={45} />
                  </Button>
                </Tooltip>
              )}
              {replacedUrls.windowsAppUrl && (
                <Tooltip title='Windowsアプリをダウンロード'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={replacedUrls.windowsAppUrl}
                    download
                    onClick={() => sendLogEvent('windows_app_click', replacedUrls.windowsAppUrl)}
                  >
                    <Image src={badges.windows} alt='Windows' height={45} />
                  </Button>
                </Tooltip>
              )}
              {replacedUrls.macAppleSiliconAppUrl && (
                <Tooltip title='macOSアプリ(Apple Silicon/M1, M2, M3...)をダウンロード'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={replacedUrls.macAppleSiliconAppUrl}
                    download
                    onClick={() => sendLogEvent('mac_apple_silicon_app_click', replacedUrls.macAppleSiliconAppUrl)}
                  >
                    <Image src={badges.macAppleSilicon} alt='Apple Silicon Mac' height={45} />
                  </Button>
                </Tooltip>
              )}
              {replacedUrls.macIntelAppUrl && (
                <Tooltip title='macOSアプリ(Intel Mac)をダウンロード'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={replacedUrls.macIntelAppUrl}
                    download
                    onClick={() => sendLogEvent('mac_intel_app_click', replacedUrls.macIntelAppUrl)}
                  >
                    <Image src={badges.macIntel} alt='Intel Mac' height={45} />
                  </Button>
                </Tooltip>
              )}
              {replacedUrls.macUniversalAppUrl && (
                <Tooltip title='macOSアプリ(Universal)をダウンロード'>
                  <Button
                    sx={openAppStyle}
                    component='a'
                    href={replacedUrls.macUniversalAppUrl}
                    download
                    onClick={() => sendLogEvent('mac_universal_app_click', replacedUrls.macUniversalAppUrl)}
                  >
                    <Image src={badges.macUniversal} alt='Universal Mac' height={45} />
                  </Button>
                </Tooltip>
              )}
              {replacedUrls.windowsAppUrl && (
                <Button
                  variant='text'
                  size='small'
                  sx={{ mt: 2, textTransform: 'none' }}
                  onClick={(e) => {
                    sendLogEvent('windows_app_notice_click');
                    handleNotice(e);
                  }}
                >
                  ※Windows版のセキュリティ警告について
                </Button>
              )}
            </Box>
          </>
        )}
      {isLoading && <CircularProgress />}
      <Popper id={id} open={openNotice} anchorEl={anchorElPopper} transition placement='top'>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: 'rgba(50,50,50,0.3)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <Box sx={{ maxWidth: 900, height: 'auto' }}>
                <Image
                  src='/images/install-note-win.png'
                  alt='Install Note'
                  priority
                  width={900}
                  height={506}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Box>
              <Typography variant='body2'>
                Windowsの場合、インストール時にセキュリティ警告が表示されます。
                その際は「詳細情報」をクリックし、「実行」を選択してください。
                <br />
                <br />
              </Typography>
              <Typography variant='caption'>
                ※プログラムが未署名であることによる警告です。ソースコードを公開しているので、
                不安のある方はご自身でコードを確認の上ビルドしてください。(MacOS版は署名済み)
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DynamicAppCard;
