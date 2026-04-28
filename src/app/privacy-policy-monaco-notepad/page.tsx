import ReactMarkdown from 'react-markdown';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Button, Card, Divider, Typography } from '@mui/material';

const ppMarkdown = `
最終改定日: 2026年4月28日

Monaco Notepad（以下「当アプリ」）は、利用者のノートを端末内に保存し、利用者が任意でGoogle Drive同期を有効にした場合にのみ、利用者自身のGoogle Driveへ同期するノートアプリです。

## 1. サービス提供者による個人情報の収集

サービス提供者は、当アプリを通じて、利用者の氏名、住所、電話番号、メールアドレス、位置情報、利用履歴、広告識別子などの個人情報または利用データを収集しません。

当アプリには、広告、トラッキング、行動分析を目的とした機能はありません。

## 2. 端末内に保存されるデータ

当アプリは、アプリの機能を提供するため、以下のデータを利用者の端末内に保存します。

- ノート本文、タイトル、フォルダ、アーカイブ状態などのノートデータ
- アプリ設定
- 同期状態
- 競合解決のためのバックアップ
- デスクトップ版では、最近開いたファイルの履歴など、利用者がアプリ内で使用したローカル情報

これらのデータは、利用者の端末内またはOSが管理するアプリ用領域に保存されます。サービス提供者のサーバーへ送信されることはありません。

ノート本文は、当アプリ独自のエンドツーエンド暗号化またはゼロ知識暗号化によって保護されるものではありません。端末のロック、OSのデータ保護、端末バックアップ設定など、利用者の端末環境による保護に依存します。

モバイル版Androidでは、アプリデータがAndroid Auto Backupに含まれないよう設定しています。iOS、デスクトップOS、または利用者が利用するバックアップソフトウェアの設定によっては、端末内のアプリデータがOSまたはバックアップ機能の対象になる場合があります。

## 3. Google Drive同期

Google Drive同期は任意機能です。利用者がGoogle Driveへの接続を選択した場合、当アプリはGoogle OAuthを使用して、ノート同期に必要な権限を取得します。

モバイル版では、Google Drive APIのappDataFolderスコープを使用し、利用者のGoogle Drive内にある当アプリ専用のアプリデータ領域へノートデータを保存します。この領域は、通常のGoogle Drive画面には表示されず、当アプリからのみ利用されます。

当アプリがアクセスできるGoogle Drive上の領域は、この当アプリ専用のアプリデータ領域に限定されます。当アプリは、利用者の通常のマイドライブ内のファイル、フォルダ、写真、ドキュメント、その他のGoogle Driveデータを閲覧、取得、変更、削除することはできません。

Googleアカウントの認証情報およびアクセストークン等は、同期機能を提供するために端末内に保存されます。サービス提供者のサーバーへ送信されることはありません。

## 4. 第三者への提供

サービス提供者は、利用者のノート、個人情報、利用データを第三者へ提供しません。

Google Drive同期を有効にした場合、ノートデータは利用者自身のGoogleアカウント上のGoogle Driveに保存されます。この場合のデータの取り扱いには、Googleのプライバシーポリシーおよび利用規約も適用されます。

## 5. データの削除

当アプリでは、利用者が以下の操作を行うことができます。

- Google Driveとの接続解除
- Google Drive上の当アプリ同期データの削除
- 端末内に保存された当アプリデータの削除
- 競合バックアップの個別削除または全削除

アプリをアンインストールした場合、端末内のアプリデータはOSの仕様に従って削除されます。ただし、OSやバックアップ機能によって復元可能な場合があります。

## 6. お問い合わせ

本ポリシーに関するお問い合わせは、本サイトのお問い合わせフォームからご連絡ください。

サービス提供者 氏名: 村上純（高橋純）

--------------------------------

Last updated: April 28, 2026

Monaco Notepad (the "App") is a note-taking app that stores your notes on your device and, only when you choose to enable Google Drive sync, synchronizes them to your own Google Drive.

## 1. Personal Information Collected by the Service Provider

The service provider does not collect your name, address, phone number, email address, location information, usage history, advertising identifiers, or other personal or usage data through the App.

The App does not include advertising, tracking, or behavior analytics features.

## 2. Data Stored on Your Device

To provide its features, the App stores the following data on your device:

- Notes, titles, folders, archive state, and other note data
- App settings
- Sync state
- Conflict-resolution backups
- In the desktop version, local information used by the App, such as recently opened file history

This data is stored on your device or in an app-specific storage area managed by the operating system. It is not sent to the service provider's servers.

Note contents are not protected by the App's own end-to-end encryption or zero-knowledge encryption. Their protection depends on your device environment, such as device lock, operating system data protection, and backup settings.

On Android mobile, the App is configured so that app data is not included in Android Auto Backup. On iOS, desktop operating systems, or backup software used by you, local app data may be included in backups depending on your settings and operating system behavior.

## 3. Google Drive Sync

Google Drive sync is optional. If you choose to connect Google Drive, the App uses Google OAuth to request the permissions required for note synchronization.

On mobile, the App uses the Google Drive API appDataFolder scope and stores note data in the App's dedicated application data area within your Google Drive. This area is not normally visible in the Google Drive UI and is used only by the App.

On mobile, the App's access to Google Drive is limited to this App-specific application data area. The App cannot view, read, modify, or delete files, folders, photos, documents, or other Google Drive data in your regular My Drive.

On desktop, for compatibility and migration from older versions, the App may check, migrate, or delete App-specific data stored in Google Drive. In all cases, the App uses Google Drive only as needed for note synchronization.

Google authentication information and access tokens are stored on your device to provide the sync feature. They are not sent to the service provider's servers.

## 4. Sharing with Third Parties

The service provider does not share your notes, personal information, or usage data with third parties.

If you enable Google Drive sync, note data is stored in Google Drive under your own Google account. In that case, Google's Privacy Policy and Terms of Service also apply.

## 5. Data Deletion

The App allows you to:

- Disconnect Google Drive
- Delete the App's sync data stored in Google Drive
- Delete the App's data stored on your device
- Delete individual or all conflict backups

When you uninstall the App, local app data is deleted according to the operating system's behavior. However, it may be restorable depending on your OS or backup settings.

## 6. Contact

For questions about this policy, please contact us through the contact form on this website.

Service provider: Jun Murakami (Takahashi Jun)
  
`;

export default function PrivacyPolicyMonacoNotepad() {
  return (
    <>
      <Card
        sx={{
          p: 2,
          marginY: 4,
          backgroundColor: 'rgba(50, 50, 50, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h5">
          Monaco Notepad - プライバシーポリシー
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ textAlign: 'left' }}>
          <ReactMarkdown>{ppMarkdown}</ReactMarkdown>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
          <Button
            variant={'outlined'}
            startIcon={<MailOutlineIcon />}
            component={'a'}
            href={'/contact'}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(50, 50, 50, 0.5)',
              backdropFilter: 'blur(10px)',
            }}
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
          sx={{
            mb: 10,
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          戻る
        </Button>
      </Box>
    </>
  );
}
