// Next.js Middleware: 言語自動判定とcookie設定
// 目的:
// - 初回アクセス時に Accept-Language を用いて 'ja' または 'en' を推定
// - '__session' cookie が未設定であれば 1 年間の cookie を発行
// - 以降は cookie を優先し、安定したロケール選択を維持
// - レスポンスヘッダ 'x-app-language' にも反映（デバッグ/ログ用途）
// 注意:
// - ここでは標準Web APIのみを使用（Edge環境でも動作可能な書き方）

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = '__session';

// Simple language extraction from session cookie
function extractLanguageFromCookie(cookieValue: string | undefined): 'ja' | 'en' | undefined {
  if (!cookieValue) return undefined;
  
  try {
    const decoded = decodeURIComponent(cookieValue);
    
    // Check if it's just 'ja' or 'en'
    if (decoded === 'ja' || decoded === 'en') {
      return decoded;
    }
    
    // Check if it's JSON with language property
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed === 'object' && (parsed.language === 'ja' || parsed.language === 'en')) {
      return parsed.language;
    }
    
    // Check if it's key=value format
    const [key, value] = decoded.split('=');
    if (key === 'language' && (value === 'ja' || value === 'en')) {
      return value;
    }
  } catch (_error) {
    // Fall through
  }
  
  return undefined;
}

export function middleware(req: NextRequest) {
  // Check __session cookie first, then legacy language cookie
  const sessionValue = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionLang = extractLanguageFromCookie(sessionValue);
  const legacyLang = req.cookies.get('language')?.value;
  
  let lang = sessionLang ?? (legacyLang === 'ja' || legacyLang === 'en' ? legacyLang : undefined);

  // cookie が無い場合は Accept-Language を簡易的に判定
  if (!lang) {
    const accept = (req.headers.get('accept-language') || '').toLowerCase();
    // シンプルに 'ja' 始まりを日本語とみなし、それ以外は英語
    lang = accept.startsWith('ja') ? 'ja' : 'en';
  }

  const res = NextResponse.next();

  // Set __session cookie if not already set with detected language
  if (!sessionLang && lang) {
    const isProduction = process.env.NODE_ENV === 'production';
    const sessionPayload = JSON.stringify({ language: lang });
    res.cookies.set(SESSION_COOKIE_NAME, sessionPayload, {
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
  res.headers.set('x-app-language', lang || 'en');

  return res;
}

// config を追加したい場合は以下を利用（今回は全パス対象のため省略可能）
// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };
