import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';

interface AppGridCardProps {
  title: string;
  screenshot: StaticImageData;
  description: string;
  sectionId: string;
  onClick: () => void;
}

export function AppGridCard({ title, screenshot, description, sectionId, onClick }: AppGridCardProps) {
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
      onClick={onClick}
    >
      <div style={{ position: 'relative', width: '100%', height: '140px' }}>
        <Image
          src={screenshot}
          alt={title}
          fill
          sizes='(max-width: 600px) 50vw, 25vw'
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
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
