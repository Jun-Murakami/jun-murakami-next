import 'server-only';
import jwt from 'jsonwebtoken';

import dynamic from 'next/dynamic';

// Firebase Functions環境では、NEXT_PUBLIC_プレフィックスが期待通りに動作しない場合があるため
// サーバーサイド専用の環境変数名を使用
const clientId = process.env.NEXT_PUBLIC_GIT_HUB_APP_CLIENT_ID;
const privateKey = process.env.NEXT_PUBLIC_GIT_HUB_APP_PRIVATE_KEY;

// GitHub APIのレートリミットエラーをハンドリングするための型定義
interface GitHubApiError {
  message: string;
  documentation_url: string;
  status: string;
}

// リトライ機能付きのGitHub API呼び出し関数
async function fetchGitHubReleaseWithRetry(
  gitHubRepo: string,
  maxRetries: number = 3,
  retryDelay: number = 1000,
): Promise<{ version?: string; body?: string; error?: string }> {
  const payload = {
    iat: Math.floor(Date.now() / 1000) - 1 * 60, // Issues 60 seconds in the past
    exp: Math.floor(Date.now() / 1000) + 1 * 60, // Expires 10 minutes in the future
    iss: clientId,
  };

  // 環境変数が設定されていない場合のエラーハンドリング
  if (!privateKey) {
    console.error('GitHub App Private Key is not configured');
    return { error: 'GitHub App configuration is missing' };
  }

  if (!clientId) {
    console.error('GitHub App Client ID is not configured');
    return { error: 'GitHub App configuration is missing' };
  }

  const resultJwt = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
  });

  const uri = `https://api.github.com/app/installations`;
  const resultInstallation = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${resultJwt}`,
      accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const installations = await resultInstallation.json();

  const resultAccessToken = await fetch(installations[0]?.access_tokens_url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resultJwt}`,
      accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const accessToken = await resultAccessToken.json();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${gitHubRepo}/releases/latest`,
        {
          // キャッシュヘッダーを追加してAPI呼び出しを最適化
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'jun-murakami-next-app',
            Authorization: `Bearer ${accessToken.token}`,
          },
        },
      );

      // レスポンスステータスをチェック
      if (response.status !== 200) {
        const errorData: GitHubApiError = await response.json();

        // その他のエラー
        console.error(`GitHub API error for ${gitHubRepo}:`, errorData);
        return { error: `API error: ${errorData.message}` };
      }

      const data = await response.json();

      return {
        version: data.tag_name?.replace('v', ''),
        body: data.body,
      };
    } catch (error) {
      console.error(
        `Network error fetching GitHub release for ${gitHubRepo} (attempt ${attempt}):`,
        error,
      );

      // 最後の試行でない場合は待機してリトライ
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * attempt),
        );
        continue;
      }

      return {
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  return { error: 'Max retries exceeded' };
}

type ReplacedUrls = {
  windowsAppUrl: string | undefined;
  macAppleSiliconAppUrl: string | undefined;
  macIntelAppUrl: string | undefined;
  macUniversalAppUrl: string | undefined;
};

const DynamicAppCard = dynamic(() => import('@/components/DynamicAppCard'));

interface AppCardLoaderProps {
  gitHubRepo?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  webAppUrl?: string;
  windowsAppUrl?: string | null;
  macAppleSiliconAppUrl?: string | null;
  macIntelAppUrl?: string | null;
  macUniversalAppUrl?: string | null;
}

export const AppCardLoader = async ({
  gitHubRepo,
  appStoreUrl,
  googlePlayUrl,
  webAppUrl,
  windowsAppUrl,
  macAppleSiliconAppUrl,
  macIntelAppUrl,
  macUniversalAppUrl,
}: AppCardLoaderProps) => {
  let version: string | undefined;
  let body: string | undefined;
  let error: string | undefined;
  let replacedUrls: ReplacedUrls = {
    windowsAppUrl: undefined,
    macAppleSiliconAppUrl: undefined,
    macIntelAppUrl: undefined,
    macUniversalAppUrl: undefined,
  };

  // GitHubリポジトリが指定されている場合のみAPIを呼び出し
  if (gitHubRepo) {
    // リトライ機能付きのAPI呼び出し
    const result = await fetchGitHubReleaseWithRetry(gitHubRepo);

    if (result.error) {
      // エラーが発生した場合のログ出力
      console.error(
        `Failed to fetch release data for ${gitHubRepo}:`,
        result.error,
      );
      error = result.error;

      // エラーが発生した場合は、バージョン置換が必要なURLを無効にする
      // バージョン情報が取得できないため、URLをundefinedに設定
      replacedUrls = {
        windowsAppUrl: undefined,
        macAppleSiliconAppUrl: undefined,
        macIntelAppUrl: undefined,
        macUniversalAppUrl: undefined,
      };
    } else {
      // 成功した場合
      version = result.version;
      body = result.body;
      replacedUrls = {
        windowsAppUrl: windowsAppUrl?.replace(
          '{{version}}',
          version ?? 'latest',
        ),
        macAppleSiliconAppUrl: macAppleSiliconAppUrl?.replace(
          '{{version}}',
          version ?? 'latest',
        ),
        macIntelAppUrl: macIntelAppUrl?.replace(
          '{{version}}',
          version ?? 'latest',
        ),
        macUniversalAppUrl: macUniversalAppUrl?.replace(
          '{{version}}',
          version ?? 'latest',
        ),
      };
    }
  }

  return (
    <DynamicAppCard
      latestVersion={version}
      latestBody={body}
      gitHubRepo={gitHubRepo}
      appStoreUrl={appStoreUrl}
      googlePlayUrl={googlePlayUrl}
      webAppUrl={webAppUrl}
      windowsAppUrl={replacedUrls.windowsAppUrl}
      macAppleSiliconAppUrl={replacedUrls.macAppleSiliconAppUrl}
      macIntelAppUrl={replacedUrls.macIntelAppUrl}
      macUniversalAppUrl={replacedUrls.macUniversalAppUrl}
      // エラー情報を追加（DynamicAppCardでエラー表示が必要な場合）
      error={error}
    />
  );
};
