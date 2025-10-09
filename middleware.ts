// Next.js Middleware: locale detection and cookie synchronization
// - Prefer previously stored session language
// - Fall back to legacy `language` cookie
// - Finally fall back to the request Accept-Language header

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import {
  extractLanguage,
  SESSION_COOKIE_NAME,
  stringifySessionCookie,
} from '@/utils/languageSessionCookie';

function isLanguage(value: string | undefined): value is 'ja' | 'en' {
  return value === 'ja' || value === 'en';
}

export function middleware(req: NextRequest) {
  const sessionValue = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionLanguage = extractLanguage(sessionValue);

  const cookieLangValue = req.cookies.get('language')?.value;
  const cookieLang = isLanguage(cookieLangValue) ? cookieLangValue : undefined;

  let lang = sessionLanguage ?? cookieLang;

  if (!lang) {
    const accept = (req.headers.get('accept-language') || '').toLowerCase();
    lang = accept.startsWith('ja') ? 'ja' : 'en';
  }

  const resolvedLang = lang || 'ja';

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-app-language', resolvedLang);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (cookieLang !== resolvedLang) {
    res.cookies.set('language', resolvedLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: isProduction,
    });
  }

  const sessionPayload = stringifySessionCookie(resolvedLang, sessionValue);
  res.cookies.set(SESSION_COOKIE_NAME, sessionPayload, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: isProduction,
  });

  res.headers.set('Vary', 'Cookie');
  res.headers.set('Cache-Control', 'private, no-store, must-revalidate');
  res.headers.set('x-app-language', resolvedLang);

  return res;
}

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };
