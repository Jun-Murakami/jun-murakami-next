'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Button,
  Divider,
  Fade,
  Popper,
  Tooltip,
  Typography,
} from '@mui/material';
import { sendGAEvent } from '@next/third-parties/google';
import Image from 'next/image';

import * as badges from '@/assets/badges';
import { useLanguage } from '@/contexts/LanguageContext';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';
interface DynamicAppCardProps {
  latestVersion?: string;
  latestBody?: string;
  gitHubRepo?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string | null;
  macAppleSiliconAppUrl?: string | null;
  macIntelAppUrl?: string | null;
  macUniversalAppUrl?: string | null;
  error?: string; // GitHub APIエラー情報を追加
}

type EventParams = Record<string, string>;

const DynamicAppCard = ({
  latestVersion,
  latestBody,
  appStoreUrl,
  googlePlayUrl,
  webAppUrl,
  windowsAppUrl,
  macAppleSiliconAppUrl,
  macIntelAppUrl,
  macUniversalAppUrl,
  error, // エラー情報を受け取る
}: DynamicAppCardProps) => {
  const { language } = useLanguage();
  const [openReleaseLog, setOpenReleaseLog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNotice, setOpenNotice] = useState(false);
  const [anchorElPopper, setAnchorElPopper] = useState<null | HTMLElement>(
    null,
  );

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

  const sendLogEvent = (eventName: string, eventParams?: EventParams) => {
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost'
    ) {
      // eventParamsがオブジェクトの場合、適切に文字列化する
      const paramsString = eventParams
        ? Object.entries(eventParams)
            .map(([key, value]) => `${key}:${value}`)
            .join(',')
        : '';
      sendGAEvent('event', `${eventName}_${paramsString}`);
    } else {
      console.log('Event:', eventName, eventParams);
    }
  };

  const canBeOpen = openReleaseLog && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      {/* エラーが発生した場合の表示 */}
      {error && (
        <Box
          sx={{ 
            mt: 1,
            p: 1,
            borderRadius: 1,
            bgcolor: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}
        >
          <Typography variant="caption" color="error">
            ⚠️ {language === 'ja' 
              ? '最新バージョン情報の取得に失敗しました。しばらく時間をおいてから再度お試しください。' 
              : 'Failed to fetch latest version information. Please try again later.'}
          </Typography>
        </Box>
      )}
      {(appStoreUrl ||
        googlePlayUrl ||
        webAppUrl ||
        windowsAppUrl ||
        macAppleSiliconAppUrl ||
        macIntelAppUrl ||
        macUniversalAppUrl) && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ marginY: 2 }}>

            
            {/* 正常にバージョン情報が取得できた場合の表示 */}
            {latestVersion && latestBody && !error && (
              <Box
                sx={{ mt: { xs: 0, sm: -2 }, mb: { xs: 0, sm: -2 }, ml: 0.5 }}
              >
                <Typography variant="caption">
                  {' '}
                  v{latestVersion} :{' '}
                  <Button onClick={handleReleaseLog}>Release Notes</Button>
                </Typography>
                <Popper
                  id={id}
                  open={openReleaseLog}
                  anchorEl={anchorEl}
                  transition
                  placement="top"
                >
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
                        <ReactMarkdown>{latestBody}</ReactMarkdown>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </Box>
            )}
            {appStoreUrl && (
              <Tooltip title="App Storeで開く">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={appStoreUrl}
                  target="_blank"
                  onClick={() =>
                    sendLogEvent('app_store_click', { url: appStoreUrl })
                  }
                >
                  <Image
                    src={badges.appleStore}
                    alt="Apple App Store"
                    height={45}
                  />
                </Button>
              </Tooltip>
            )}
            {googlePlayUrl && (
              <Tooltip title="Google Playで開く">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={googlePlayUrl}
                  target="_blank"
                  onClick={() =>
                    sendLogEvent('google_play_click', { url: googlePlayUrl })
                  }
                >
                  <Image
                    src={badges.googlePlay}
                    alt="Google Play"
                    height={45}
                  />
                </Button>
              </Tooltip>
            )}
            {webAppUrl && (
              <Tooltip title="Webアプリを開く">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={webAppUrl}
                  target="_blank"
                  onClick={() =>
                    sendLogEvent('web_app_click', { url: webAppUrl })
                  }
                >
                  <Image src={badges.webApp} alt="Web App" height={45} />
                </Button>
              </Tooltip>
            )}
            {windowsAppUrl && (
              <Tooltip title="Windowsアプリをダウンロード">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={windowsAppUrl}
                  download
                  onClick={() =>
                    sendLogEvent('windows_app_click', {
                      url: windowsAppUrl ?? '',
                    })
                  }
                >
                  <Image src={badges.windows} alt="Windows" height={45} />
                </Button>
              </Tooltip>
            )}
            {macAppleSiliconAppUrl && (
              <Tooltip title="macOSアプリ(Apple Silicon/M1, M2, M3...)をダウンロード">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={macAppleSiliconAppUrl}
                  download
                  onClick={() =>
                    sendLogEvent('mac_apple_silicon_app_click', {
                      url: macAppleSiliconAppUrl ?? '',
                    })
                  }
                >
                  <Image
                    src={badges.macAppleSilicon}
                    alt="Apple Silicon Mac"
                    height={45}
                  />
                </Button>
              </Tooltip>
            )}
            {macIntelAppUrl && (
              <Tooltip title="macOSアプリ(Intel Mac)をダウンロード">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={macIntelAppUrl}
                  download
                  onClick={() =>
                    sendLogEvent('mac_intel_app_click', {
                      url: macIntelAppUrl ?? '',
                    })
                  }
                >
                  <Image src={badges.macIntel} alt="Intel Mac" height={45} />
                </Button>
              </Tooltip>
            )}
            {macUniversalAppUrl && (
              <Tooltip title="macOSアプリ(Universal)をダウンロード">
                <Button
                  sx={openAppStyle}
                  component="a"
                  href={macUniversalAppUrl}
                  download
                  onClick={() =>
                    sendLogEvent('mac_universal_app_click', {
                      url: macUniversalAppUrl ?? '',
                    })
                  }
                >
                  <Image
                    src={badges.macUniversal}
                    alt="Universal Mac"
                    height={45}
                  />
                </Button>
              </Tooltip>
            )}
            {windowsAppUrl && (
              <Button
                variant="text"
                size="small"
                sx={{ mt: 2 }}
                onClick={(e) => {
                  sendLogEvent('windows_app_notice_click');
                  handleNotice(e);
                }}
              >
                {language === 'ja'
                  ? ja.common.windowsSecurityWarning
                  : en.common.windowsSecurityWarning}
              </Button>
            )}
          </Box>
        </>
      )}
      <Popper
        id={id}
        open={openNotice}
        anchorEl={anchorElPopper}
        transition
        placement="top"
      >
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
                  src={
                    language === 'ja'
                      ? '/images/install-note-win.png'
                      : '/images/install-note-win-en.png'
                  }
                  alt={
                    language === 'ja'
                      ? 'Install Note'
                      : 'Install Note (English)'
                  }
                  priority
                  width={900}
                  height={506}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Box>
              <Typography variant="body2">
                {language === 'ja'
                  ? ja.common.windowsSecurityWarningDescription
                  : en.common.windowsSecurityWarningDescription}
                <br />
                <br />
              </Typography>
              <Typography variant="caption">
                {language === 'ja'
                  ? ja.common.windowsSecurityWarningNote
                  : en.common.windowsSecurityWarningNote}
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DynamicAppCard;
