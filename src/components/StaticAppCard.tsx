import GitHubIcon from '@mui/icons-material/GitHub';
import PolicyIcon from '@mui/icons-material/Policy';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Image, { type StaticImageData } from 'next/image';

import { NoteSmallLogoIcon, ZennLogoIcon } from '@/components/Icons';

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
  labels: {
    noteArticle: string;
    zennArticle: string;
    sourceCode: string;
    privacyPolicy: string;
  };
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
  labels,
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
              sx={{ mr: 2 }}
            >
              {labels.noteArticle}
            </Button>
          )}
          {zennUrl && (
            <Button
              component='a'
              href={zennUrl}
              target='_blank'
              startIcon={<ZennLogoIcon />}
              sx={{ mr: 2 }}
            >
              {labels.zennArticle}
            </Button>
          )}
          {gitHubUrl && (
            <Button component='a' href={gitHubUrl} target='_blank' startIcon={<GitHubIcon />} sx={{ mr: 2 }}>
              {labels.sourceCode}
            </Button>
          )}
          {policyUrl && (
            <Button component='a' href={policyUrl} startIcon={<PolicyIcon />}>
              {labels.privacyPolicy}
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
