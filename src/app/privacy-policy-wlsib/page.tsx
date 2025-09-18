import ReactMarkdown from 'react-markdown';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, Card, Divider, Typography } from '@mui/material';

const ppMarkdown = `
当アプリは、利用者の個人情報を一切収集しません。

- 個人情報の収集  
  当アプリは、利用者の氏名、住所、電話番号、メールアドレスなどの個人を特定できる情報を収集することはありません。
- 利用データの収集  
  当アプリは、利用履歴、端末情報、IPアドレス、位置情報など、利用者のデータを一切収集しません。
- 第三者への提供  
  当アプリは、個人情報および利用データを収集しないため、第三者に提供することはありません。
  
  
  
サービス提供者 氏名：高橋純
  
  
`;

export default function PrivacyPolicyWlsib() {
  return (
    <>
      <Card sx={{ p: 2, marginY: 4, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}>
        <Typography variant='h5'>レンズ何持ってく？ - プライバシーポリシー</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='body1' sx={{ textAlign: 'left' }}>
          <ReactMarkdown>{ppMarkdown}</ReactMarkdown>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
          <Button
            variant={'outlined'}
            startIcon={<MailOutlineIcon />}
            component={'a'}
            href={'/contact'}
            sx={{ mb: 2, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}
          >
            お問い合わせ
          </Button>
        </Box>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
        <Button
          variant={'outlined'}
          startIcon={<ReplyIcon />}
          component={'a'}
          href={'/'}
          sx={{ mb: 10, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}
        >
          戻る
        </Button>
      </Box>
    </>
  );
}
