import Image, { StaticImageData } from 'next/image';
import dynamic from 'next/dynamic';
import { Box, Typography, Card, Divider, Button } from '@mui/material';
import { NoteSmallLogoIcon, ZennLogoIcon } from '@/components/Icons';
import GitHubIcon from '@mui/icons-material/GitHub';
import PolicyIcon from '@mui/icons-material/Policy';

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

const DynamicAppCard = dynamic<DynamicAppCardProps>(() => import('@/components/DynamicAppCard'));

interface StaticAppCardProps {
  appName: string;
  sectionId: string;
  screenshot: StaticImageData;
  description: React.ReactNode;
  noteUrl?: string;
  zennUrl?: string;
  gitHubUrl?: string;
  policyUrl?: string;
  gitHubRepo?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string | null;
  macAppleSiliconAppUrl?: string | null;
  macIntelAppUrl?: string | null;
  macUniversalAppUrl?: string | null;
}

export const StaticAppCard = ({
  appName,
  sectionId,
  screenshot,
  description,
  noteUrl,
  zennUrl,
  gitHubUrl,
  policyUrl,
  gitHubRepo,
  appStoreUrl,
  googlePlayUrl,
  webAppUrl,
  windowsAppUrl,
  macAppleSiliconAppUrl,
  macIntelAppUrl,
  macUniversalAppUrl,
}: StaticAppCardProps) => {
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
      {(noteUrl || zennUrl || gitHubUrl || policyUrl) && (
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
            <Button component='a' href={policyUrl} startIcon={<PolicyIcon />}>
              プライバシーポリシー
            </Button>
          )}
        </Box>
      )}
      <DynamicAppCard
        gitHubRepo={gitHubRepo}
        appStoreUrl={appStoreUrl}
        googlePlayUrl={googlePlayUrl}
        webAppUrl={webAppUrl}
        windowsAppUrl={windowsAppUrl}
        macAppleSiliconAppUrl={macAppleSiliconAppUrl}
        macIntelAppUrl={macIntelAppUrl}
        macUniversalAppUrl={macUniversalAppUrl}
      />
    </Card>
  );
};
