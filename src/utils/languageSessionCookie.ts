export type Language = 'ja' | 'en';

export const SESSION_COOKIE_NAME = '__session';

type SessionCookieData = Record<string, unknown> & {
  language?: Language;
};

function isLanguage(value: unknown): value is Language {
  return value === 'ja' || value === 'en';
}

function parseJson(value: string): SessionCookieData | undefined {
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object') {
      return parsed as SessionCookieData;
    }
  } catch (_error) {
    // noop: fall through to other parsing strategies
  }
  return undefined;
}

function parseKeyValue(value: string): SessionCookieData | undefined {
  const [key, maybeLang] = value.split('=');
  if (key === 'language' && isLanguage(maybeLang)) {
    return { language: maybeLang };
  }
  return undefined;
}

export function parseSessionCookie(
  value: string | undefined | null,
): SessionCookieData {
  if (!value) return {};

  const decoded = decodeURIComponent(value);

  if (isLanguage(decoded)) {
    return { language: decoded };
  }

  const jsonResult = parseJson(decoded);
  if (jsonResult) {
    return jsonResult;
  }

  const kvResult = parseKeyValue(decoded);
  if (kvResult) {
    return kvResult;
  }

  return {};
}

export function extractLanguage(
  value: string | undefined | null,
): Language | undefined {
  const { language } = parseSessionCookie(value);
  if (isLanguage(language)) {
    return language;
  }
  return undefined;
}

export function stringifySessionCookie(
  language: Language,
  existingValue?: string | null,
): string {
  const current = parseSessionCookie(existingValue);
  return JSON.stringify({
    ...current,
    language,
  });
}
