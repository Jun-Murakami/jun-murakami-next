// Next.js Middleware: 言語自動判定とcookie設定
// 目的:
// - 初回アクセス時に Accept-Language を用いて 'ja' または 'en' を推定
// - 'language' cookie が未設定であれば 1 年間の cookie を発行
// - 以降は cookie を優先し、安定したロケール選択を維持
// - レスポンスヘッダ 'x-app-language' にも反映（デバッグ/ログ用途）
// 注意:
// - ここでは標準Web APIのみを使用（Edge環境でも動作可能な書き方）

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 既に 'language' cookie がある場合はそれを優先
  const cookieLang = req.cookies.get('language')?.value;
  let lang = cookieLang;

  // cookie が無い場合は Accept-Language を簡易的に判定
  if (!lang) {
    const accept = (req.headers.get('accept-language') || '').toLowerCase();
    // シンプルに 'ja' 始まりを日本語とみなし、それ以外は英語
    lang = accept.startsWith('ja') ? 'ja' : 'en';
  }

  const res = NextResponse.next();

  // cookie 未設定の場合のみセット
  if (!cookieLang && lang) {
    // SameSite/Lax で 1 年間保持。https 環境では secure を付与
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookies.set('language', lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1年
      sameSite: 'lax',
      secure: isProduction, // 本番環境では自動的にsecureを有効化
    });
  }

  // キャッシュとバリアント制御（CDNがcookie差を認識するように）
  res.headers.set('Vary', 'Cookie');
  res.headers.set('Cache-Control', 'private, no-store, must-revalidate');
  // デバッグ/ロギング用途（任意）
  res.headers.set('x-app-language', lang || 'ja');

  return res;
}

// config を追加したい場合は以下を利用（今回は全パス対象のため省略可能）
// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };