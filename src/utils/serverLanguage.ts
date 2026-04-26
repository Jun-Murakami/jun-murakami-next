import 'server-only';
import { cookies, headers } from 'next/headers';

import {
  extractLanguage,
  SESSION_COOKIE_NAME,
} from '@/utils/languageSessionCookie';

import type { Language } from '@/utils/languageSessionCookie';

function isLanguage(value: string | null | undefined): value is Language {
  return value === 'ja' || value === 'en';
}

export async function resolveServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const sessionLanguage = extractLanguage(sessionValue);
  const legacyValue = cookieStore.get('language')?.value;
  const legacyLanguage =
    legacyValue === 'ja' || legacyValue === 'en' ? legacyValue : undefined;
  const headerStore = await headers();
  const forwardedLanguage = headerStore.get('x-app-language');
  const acceptLanguageHeader =
    headerStore.get('accept-language')?.toLowerCase() ?? '';
  const detectedLanguage = isLanguage(forwardedLanguage)
    ? forwardedLanguage
    : acceptLanguageHeader.startsWith('ja')
      ? 'ja'
      : acceptLanguageHeader
        ? 'en'
        : undefined;
  return sessionLanguage ?? legacyLanguage ?? detectedLanguage ?? 'ja';
}
