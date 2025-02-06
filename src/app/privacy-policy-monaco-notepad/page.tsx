import { Typography, Box, Button, Card, Divider } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReactMarkdown from 'react-markdown';

const ppMarkdown = `
当アプリは、利用者の個人情報を一切収集しません。

- 個人情報の収集  
  当アプリは、利用者の氏名、住所、電話番号、メールアドレスなどの個人を特定できる情報を収集することはありません。
- 利用データの収集  
  当アプリは、利用履歴、端末情報、IPアドレス、位置情報など、利用者のデータを一切収集しません。
- 第三者への提供  
  当アプリは、個人情報および利用データを収集しないため、第三者に提供することはありません。
- データの保存  
  当アプリは、Google Driveを使用した同期機能を使用した場合に限り、利用者のアカウント内の専用のフォルダにデータを保存します。
  アプリが専用のデータフォルダ以外にアクセスすることはありません。
  
  
  
サービス提供者 氏名：村上純 (高橋純)


This app does not collect any personal information.

- Personal information collection  
  This app does not collect any personal information such as name, address, phone number, or email address.
- Data collection  
  This app does not collect any data such as usage history, device information, IP address, or location information.
- Third-party sharing  
  This app does not share any personal information or usage data with third parties.
- Data storage  
  This app only stores data in a dedicated folder in the user's account when using the sync feature with Google Drive.
  The app does not access any data outside of the dedicated data folder.


  
  Service provider: Jun Murakami (Takahashi Jun)
  
`;

export default function PrivacyPolicyMonacoNotepad() {
  return (
    <>
      <Card sx={{ p: 2, marginY: 4, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}>
        <Typography variant='h5'>Monaco Notepad - プライバシーポリシー</Typography>
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
