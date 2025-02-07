import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface AppGridCardProps {
  title: string;
  screenshot: StaticImageData;
  description: string;
  sectionId: string;
}

export function AppGridCard({ title, screenshot, description, sectionId }: AppGridCardProps) {
  return (
    <Card
      component={Link}
      href={`#${sectionId}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        textDecoration: 'none',
      }}
    >
      <CardMedia
        component='img'
        image={screenshot.src}
        alt={title}
        sx={{ height: 140, objectFit: 'cover', imageRendering: 'smooth' }}
      />
      <CardContent>
        <Typography variant='h6' component='div' gutterBottom sx={{ fontSize: '1.1rem' }}>
          {title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
