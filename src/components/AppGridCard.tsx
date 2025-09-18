import { Card, CardContent, Typography } from '@mui/material';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

interface AppGridCardProps {
  title: string;
  screenshot: StaticImageData;
  description: string;
  sectionId: string;
  // data 属性など、任意の追加プロップを許容（例: data-ga-app）
  // コメント: サーバーコンポーネントからクライアントコンポーネントへ
  // 関数プロップ（onClick等）を渡すのは不可のため、
  // 計測は data 属性 + クライアント補助で行う方針に変更。
  [key: string]: unknown;
}

export function AppGridCard({ title, screenshot, description, sectionId, ...rest }: AppGridCardProps) {
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
      // コメント: data 属性（例: data-ga-app）等を受け取りたいのでスプレッド
      {...rest}
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
