import {
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
}

export function AppGridCard({
  title,
  screenshot,
  description,
  sectionId,
  sx,
  ...rest
}: AppGridCardProps) {
  const baseSx: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
    textDecoration: 'none',
  };

  const combinedSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseSx, ...sx]
    : sx
      ? [baseSx, sx]
      : baseSx;

  return (
    <Card component={Link} href={`#${sectionId}`} sx={combinedSx} {...rest}>
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
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
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
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
