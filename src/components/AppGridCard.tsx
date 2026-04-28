'use client';

import {
  Box,
  Card,
  CardContent,
  type CardProps,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface AppGridCardProps extends Omit<CardProps, 'title' | 'children'> {
  title: string;
  screenshot: StaticImageData;
  description: string;
  sectionId: string;
  href?: string;
}

export function AppGridCard({
  title,
  screenshot,
  description,
  sectionId,
  href,
  sx,
  ...rest
}: AppGridCardProps) {
  const baseSx: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    transformOrigin: 'center bottom',
    transition:
      'transform 0.25s cubic-bezier(0.2, 0.7, 0.3, 1), box-shadow 0.25s, opacity 0.2s',
    willChange: 'transform',
    '@media (hover: hover)': {
      '&:hover': {
        transform: 'scale(1.22)',
        zIndex: 10,
        boxShadow: '0 18px 48px rgba(0, 0, 0, 0.55)',
        '& .app-card-base': {
          opacity: 0,
        },
        '& .app-card-overlay': {
          opacity: 1,
        },
      },
    },
  };

  const combinedSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseSx, ...sx]
    : sx
      ? [baseSx, sx]
      : baseSx;

  return (
    <Card
      component={Link}
      href={href ?? `#${sectionId}`}
      className="app-card"
      sx={combinedSx}
      {...rest}
    >
      <Box
        className="app-card-base"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          opacity: 1,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '140px' }}>
          <Image
            src={screenshot}
            alt={title}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ fontSize: '1.1rem' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              wordBreak: 'break-all',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Box>
      <Box
        className="app-card-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          backgroundColor: 'rgba(28, 28, 30, 0.96)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '140px',
            flexShrink: 0,
          }}
        >
          <Image
            src={screenshot}
            alt={title}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.3 }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.78rem',
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.9)',
              wordBreak: 'break-all',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
