'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useMediaQuery, Button, Box, IconButton, Typography, Tooltip, Popper, Fade, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NoteLogoIcon, IMDbLogoIcon, VGMdbLogoIcon, WikiLogoIcon } from '@/components/Icons';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import * as screenshots from '@/assets/screenshots';
import { AppCard } from '@/components/AppCard';
import { useGitHubReleases } from '@/hooks/useGitHubReleases';

export default function HomePage() {
  const [openNotice, setOpenNotice] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, releases } = useGitHubReleases();

  const handleNotice = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenNotice((previousOpen) => !previousOpen);
  };

  const canBeOpen = openNotice && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const socialLinks = [
    { title: 'note (ブログ記事など)', url: 'https://note.com/junmurakami/', icon: <NoteLogoIcon fontSize='large' /> },
    { title: 'X (Twitter)', url: 'https://twitter.com/jun_murakami', icon: <XIcon fontSize='medium' /> },
    { title: 'Instagram', url: 'https://www.instagram.com/jun9989/', icon: <InstagramIcon fontSize='medium' /> },
    { title: 'GitHub', url: 'https://github.com/Jun-Murakami', icon: <GitHubIcon fontSize='medium' /> },
    { title: 'IMDb (映画関連)', url: 'https://www.imdb.com/name/nm2687359', icon: <IMDbLogoIcon fontSize='large' /> },
    { title: 'VGMdb (ゲーム/アニメ音楽関連)', url: 'https://vgmdb.net/artist/3937', icon: <VGMdbLogoIcon fontSize='large' /> },
    {
      title: 'Wikipedia',
      url: 'https://ja.wikipedia.org/wiki/%E6%9D%91%E4%B8%8A%E7%B4%94_(%E9%9F%B3%E6%A5%BD%E5%AE%B6)',
      icon: <WikiLogoIcon fontSize='medium' />,
    },
  ];

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={75} />
        </Box>
      )}
      <Typography variant='body2' sx={{ p: { xs: 1, sm: 0 } }}>
        音楽ディレクター / プロデューサーの村上純 (高橋純)
        です。業務の合間に開発したアプリケーションや、音楽制作用のライブラリなどを配布しています。
      </Typography>

      <Box sx={{ mt: 1, mb: 5, textAlign: { xs: 'center', sm: 'left' } }}>
        {socialLinks.map((link) => (
          <Tooltip title={link.title} key={link.title}>
            <IconButton sx={{ height: 50, width: 50 }} onClick={() => window.open(link.url)}>
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {isMobile && (
        <Box sx={{ height: 'calc(100vh - 330px)', textAlign: 'center' }}>
          <IconButton
            sx={{ height: 50, width: 50 }}
            onClick={() => {
              const targetElement = document.querySelector('#wlsib');
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <KeyboardDoubleArrowDownIcon fontSize='large' />
          </IconButton>
        </Box>
      )}

      <AppCard
        appName='レンズ何持ってく？'
        sectionId='wlsib'
        screenshot={screenshots.wlsib}
        description={
          <>
            撮影や旅行・イベントの際に、どのレンズを持っていくかを決める時に役立つアプリです。
            <br />
            各種撮影条件を設定すると、撮影結果がどのように変わるかを視覚的にシミュレーションできます。iOS版、Android版もあります。
          </>
        }
        noteUrl='https://note.com/junmurakami/n/n36b1e198f287'
        gitHubUrl='https://github.com/Jun-Murakami/wlsib'
        policyUrl='/privacy-policy-wlsib'
        appStoreUrl='https://apps.apple.com/jp/app/%E3%83%AC%E3%83%B3%E3%82%BA%E4%BD%95%E6%8C%81%E3%81%A3%E3%81%A6%E3%81%8F/id6480391376'
        googlePlayUrl='https://play.google.com/store/apps/details?id=com.wlsib.app'
        webAppUrl='https://lensdore-c55ce.web.app/'
      />

      <AppCard
        appName='よみがなコンバーター'
        sectionId='yomigana'
        screenshot={screenshots.yomigana}
        description={
          <>
            丁寧に作ると意外に時間が掛かる、ボーカリスト用メロディ譜面(所謂「メロ譜」)の歌詞入力支援ツールです。
            <br />
            既に出来上がっている漢字交じりの歌詞カードを、メロ譜に適したひらがな＆カタカナに再変換し、
            SibeliusやFinale、MuseScoreといった譜面作成ソフトに流し込む使い方を想定しています。
            特にスペース区切りで歌詞を連続入力できる機能を持ったソフトで便利に使えると思います。
            ボーカロイドやAIシンガーの制作にも便利な「は」←→「わ」変換機能などを追加しています。
          </>
        }
        latestRelease={releases.YomiganaConverter}
        noteUrl='https://note.com/junmurakami/n/n35cd70b8dc12'
        gitHubUrl='https://github.com/Jun-Murakami/YomiganaConverter'
        webAppUrl='https://yomiganaconverterreact.web.app/'
        windowsAppUrl={
          releases.YomiganaConverter &&
          `https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v${releases.YomiganaConverter.version}/YomiganaConverter_v${releases.YomiganaConverter.version}_win.zip`
        }
        macAppleSiliconAppUrl={
          releases.YomiganaConverter &&
          `https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v${releases.YomiganaConverter.version}/YomiganaConverter_v${releases.YomiganaConverter.version}_mac_arm64.zip`
        }
        macIntelAppUrl={
          releases.YomiganaConverter &&
          `https://github.com/Jun-Murakami/YomiganaConverter/releases/download/v${releases.YomiganaConverter.version}/YomiganaConverter_v${releases.YomiganaConverter.version}_mac_x64.zip`
        }
        handleNotice={handleNotice}
      />

      <AppCard
        appName='Dropbox Sync Skipper'
        sectionId='dropbox-skipper'
        screenshot={screenshots.dropboxSkipper}
        description={
          <>
            ソースコードなどをDropboxで同期したいけど、特定のファイルやフォルダ（node_modules、distフォルダとか）は除外したい時に、条件を指定して一括で除外設定できるアプリです。
            <br />
            動作原理はDropboxの仕様に準じて、WindowsではNTFSの代替ファイルストリーム、MacOS/Linuxでは拡張属性を書き換えます。ファイルの内容自体は変更されませんが、自己責任でどうぞ。
            <br />
            <br />
            このアプリはサイズが小さいため、MacOS版はユニバーサルアプリ（一つのインストーラでAppleSilicon/Intel Mac両対応）です。
            <br />
            また、ソースコードとしてはLinuxも対応していますが、Dropboxのテストがほとんどできていないので、Linuxをお使いの方はご自分でビルドしてお使いください。（非常にシンプルなWailsアプリです）
          </>
        }
        zennUrl='https://zenn.dev/jun_murakami/articles/1dc9d0a2ffa3d6'
        noteUrl='https://note.com/junmurakami/n/n0911c5853082'
        gitHubUrl='https://github.com/Jun-Murakami/dropboxskipper'
        latestRelease={releases.dropboxskipper}
        windowsAppUrl={
          releases.dropboxskipper &&
          `https://github.com/Jun-Murakami/dropboxskipper/releases/download/v${releases.dropboxskipper.version}/DropboxSkipper-win64-installer-${releases.dropboxskipper.version}.exe`
        }
        macUniversalAppUrl={
          releases.dropboxskipper &&
          `https://github.com/Jun-Murakami/dropboxskipper/releases/download/v${releases.dropboxskipper.version}/DropboxSkipper-macOS-universal-${releases.dropboxskipper.version}.dmg`
        }
        handleNotice={handleNotice}
      />

      <AppCard
        appName='TaskTrees'
        sectionId='tasktrees'
        screenshot={screenshots.taskTrees}
        description={
          <>
            ツリー形式でタスクやメモを自由に作成し、整理できるアプリです。他の人とツリーを共有することもできます。iOS版、Android版もリリースしました。
          </>
        }
        latestRelease={releases['TaskTrees-Electron']}
        noteUrl='https://note.com/junmurakami/n/n651efffaf343'
        gitHubUrl='https://github.com/Jun-Murakami/TaskTrees'
        policyUrl='/privacy-policy-tasktrees'
        webAppUrl='https://tasktree-s.web.app/'
        appStoreUrl='https://apps.apple.com/jp/app/tasktrees/id6482979857'
        googlePlayUrl='https://play.google.com/store/apps/details?id=com.tasktrees.app'
        windowsAppUrl={
          releases['TaskTrees-Electron'] &&
          `https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v${releases['TaskTrees-Electron'].version}/TaskTrees-${releases['TaskTrees-Electron'].version}-setup_win_x64.exe`
        }
        macAppleSiliconAppUrl={
          releases['TaskTrees-Electron'] &&
          `https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v${releases['TaskTrees-Electron'].version}/TaskTrees-${releases['TaskTrees-Electron'].version}_mac_arm64.dmg`
        }
        macIntelAppUrl={
          releases['TaskTrees-Electron'] &&
          `https://github.com/Jun-Murakami/TaskTrees-Electron/releases/download/v${releases['TaskTrees-Electron'].version}/TaskTrees-${releases['TaskTrees-Electron'].version}_mac_x64.dmg`
        }
        handleNotice={handleNotice}
      />

      <AppCard
        appName='AI-Browser'
        sectionId='aiBrowser'
        screenshot={screenshots.aiBrowser}
        description={
          <>
            ChatGPT、Gemini、Claude、Phind、Perplexityに対応したチャットAI専用ブラウザです。縦に5つまで分割できる広いエディタで文章を切り貼りして、各サービスに直接プロンプトを送信できます。
            送信履歴から同じプロンプトを何度も呼び出して調整しながら複数のサービスに展開可能、一括送信もできます。Monaco
            Editor(VSCodeと同じエディタエンジン)を統合しているのでプログラマーの方もどうぞ。
          </>
        }
        latestRelease={releases['AI-Browser']}
        noteUrl='https://note.com/junmurakami/n/n5d674f5977e6'
        gitHubUrl='https://github.com/Jun-Murakami/AI-Browser'
        windowsAppUrl={
          releases['AI-Browser'] &&
          `https://github.com/Jun-Murakami/AI-Browser/releases/download/v${releases['AI-Browser'].version}/AI-Browser-${releases['AI-Browser'].version}-setup_win_x64.exe`
        }
        macAppleSiliconAppUrl={
          releases['AI-Browser'] &&
          `https://github.com/Jun-Murakami/AI-Browser/releases/download/v${releases['AI-Browser'].version}/AI-Browser-${releases['AI-Browser'].version}_mac_arm64.dmg`
        }
        macIntelAppUrl={
          releases['AI-Browser'] &&
          `https://github.com/Jun-Murakami/AI-Browser/releases/download/v${releases['AI-Browser'].version}/AI-Browser-${releases['AI-Browser'].version}_mac_x64.dmg`
        }
        handleNotice={handleNotice}
      />

      <AppCard
        appName='Cubase DrumMap Editor'
        sectionId='cubaseDMEditor'
        screenshot={screenshots.cubaseDMEditor}
        description={
          <>
            Cubase用のシンプルなドラムマップエディターです。.csvのインポートとエクスポートに対応し、ほかのソフトウェア(エクセルなど)で編集可能です。音源を制作されている方にも向いていると思います。
            <br />
            おまけで、１つのマップで複数の音源を切り替えて使用できる各種音源の自作マップを
            <a
              href='https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v1.0/DrumMaps20230810.zip'
              target='_blank'
            >
              こちら
            </a>
            からダウンロードできます。
          </>
        }
        latestRelease={releases.CubaseDrumMapEditor}
        noteUrl='https://note.com/junmurakami/n/n13650982fc7f'
        gitHubUrl='https://github.com/Jun-Murakami/CubaseDrumMapEditor'
        windowsAppUrl={
          releases.CubaseDrumMapEditor &&
          `https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v${releases.CubaseDrumMapEditor.version}/CubaseDrumMapEditor_v${releases.CubaseDrumMapEditor.version}_win.zip`
        }
        macAppleSiliconAppUrl={
          releases.CubaseDrumMapEditor &&
          `https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v${releases.CubaseDrumMapEditor.version}/CubaseDrumMapEditor_v${releases.CubaseDrumMapEditor.version}_mac_arm64.zip`
        }
        macIntelAppUrl={
          releases.CubaseDrumMapEditor &&
          `https://github.com/Jun-Murakami/CubaseDrumMapEditor/releases/download/v${releases.CubaseDrumMapEditor.version}/CubaseDrumMapEditor_v${releases.CubaseDrumMapEditor.version}_mac_x64.zip`
        }
        handleNotice={handleNotice}
      />

      <AppCard
        appName='Famitone 2A03'
        sectionId='famitone'
        screenshot={screenshots.famitone}
        description={
          <>
            ファミコン実機をサンプリングしたKONTAKT音源ライブラリです。
            <a href='https://github.com/Jun-Murakami/Famitone/releases/download/v1.0/Famitone2A03_v1.0.zip' target='_blank'>
              こちら
            </a>
            からダウンロードできます。
          </>
        }
        noteUrl='https://note.com/junmurakami/n/n1e525af59ada'
      />

      <Popper id={id} open={openNotice} anchorEl={anchorEl} transition placement='top'>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: 'rgba(50,50,50,0.3)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <Box sx={{ maxWidth: 900, height: 'auto' }}>
                <Image
                  src='/images/install-note-win.png'
                  alt='Install Note'
                  priority
                  width={900}
                  height={506}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Box>
              <Typography variant='body2'>
                Windowsの場合、インストール時にセキュリティ警告が表示されます。
                その際は「詳細情報」をクリックし、「実行」を選択してください。
                <br />
                <br />
              </Typography>
              <Typography variant='caption'>
                ※プログラムが未署名であることによる警告です。ソースコードを公開しているので、
                不安のある方はご自身でコードを確認の上ビルドしてください。(MacOS版は署名済み)
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
        <Button
          variant={'outlined'}
          startIcon={<MailOutlineIcon />}
          onClick={() => {
            window.location.href = '/contact';
          }}
          sx={{ mb: 10, backgroundColor: 'rgba(50, 50, 50, 0.5)', backdropFilter: 'blur(10px)' }}
        >
          お問い合わせ
        </Button>
      </Box>
    </>
  );
}
