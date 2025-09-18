# 設計: ssr-i18n-middleware

## 1. アーキテクチャ全体像
Firebase Hosting をフロントのエントリポイントとし、Next.jsのSSR/ISRは Cloud Functions for Firebase (v2, Node 18+) が担当する。Hosting の Web Frameworks 統合により、SSR関数は自動的に配線され、静的資産はHostingから配信される。言語自動判定は Next.js の `middleware.ts` で行い、`language` cookie を発行して SSR 階層（`app/layout.tsx`）に伝播する。

```
Client -> Firebase Hosting -> (rewrite) -> Functions v2 (SSR for Next.js)
                                 |-> Static assets (public/.next/static)

middleware.ts: Accept-Language -> cookie(language)
layout.tsx(SC): cookies() -> <html lang> 決定
LanguageContext(CC): cookie/localStorage/navigator の順で初期化
```

## 2. 変更対象と方針
- `next.config.mjs`
  - `output: 'export'` を削除し、SSR/ISRを使用可能にする。
  - 画像最適化を有効化（現状 `images.unoptimized: true` は再検討。Firebaseの最適化を使うなら外す）。

- `firebase.json`
  - Web Frameworks統合の生成内容を採用（既存の `public: "out"` ベースは不要に）。
  - 404/rewritesは自動設定に従う。独自404はApp Router側で対応。

- 追加ファイル `middleware.ts`
  - `Accept-Language` を解釈し、`language=ja|en` を cookie で保存（1年）。
  - 既存cookieがある場合はそれを尊重。

- `src/app/layout.tsx`
  - サーバコンポーネントで `cookies()` を読み、`<html lang>` を設定。
  - 既存の `LanguageProvider` の重複ラップを解消（`ClientLayout` 側からは除去）。

- `src/contexts/LanguageContext.tsx`
  - 初期state決定ロジックを `cookie > localStorage > navigator` 優先へ。
  - `setLanguage` 時に cookie と `document.documentElement.lang` を更新。

- 計測箇所（`src/app/page.tsx` 等）
  - GAイベント発火時のパラメータに `language` を付与。

## 3. ミドルウェア設計
```ts
// middleware.ts（Nodeランタイム）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieLang = req.cookies.get('language')?.value;
  let lang = cookieLang;

  if (!lang) {
    const accept = req.headers.get('accept-language') || '';
    lang = accept.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  }

  const res = NextResponse.next();

  if (!cookieLang && lang) {
    res.cookies.set('language', lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      // 本番デプロイ時は secure: true を推奨（https前提）
    });
  }

  res.headers.set('x-app-language', lang || 'ja');
  return res;
}
```

## 4. サーバコンポーネントでの `<html lang>` 設定
```tsx
// src/app/layout.tsx 抜粋（サーバ）
import { cookies } from 'next/headers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value === 'en') ? 'en' : 'ja';
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
```

## 5. LanguageContext 初期化
```ts
// src/contexts/LanguageContext.tsx 抜粋（クライアント）
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ja';
  // cookie優先
  const cookie = document.cookie.split('; ').find(v => v.startsWith('language='));
  const cookieLang = cookie?.split('=')[1] as Language | undefined;
  if (cookieLang === 'ja' || cookieLang === 'en') return cookieLang;
  const saved = localStorage.getItem('language') as Language | null;
  if (saved) return saved;
  return navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
};

const [language, setLanguage] = useState<Language>(getInitialLanguage());

useEffect(() => {
  document.documentElement.lang = language;
}, [language]);

const handleSetLanguage = (lang: Language) => {
  setLanguage(lang);
  localStorage.setItem('language', lang);
  document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
};
```

## 6. Providerの配置整理
- `src/app/layout.tsx` 側で `LanguageProvider` を1度だけラップする。
- `ClientLayout.tsx` 側の重複ラップは削除。

## 7. Firebase/デプロイ設計
- Firebase CLI の Web Frameworks 統合を使用（`firebase init hosting` -> Framework=Next.js）。
- Functions v2 ランタイム: Node 18 以上。
- パフォーマンス要件に応じて `minInstances` を設定。
- `firebase deploy` にてHostingとFunctionsへ一括反映。

## 8. テレメトリ/GA
- 既存の `sendGAEvent()` 呼び出しに `language` を付加。
  例: `sendGAEvent('event', 'sns_click', { sns_name, language })`

## 9. テスト計画
- ローカル: `firebase emulators:start` でSSR/Middlewareの動作確認。
- ブラウザ言語を切替（ja/en）して初期表示の言語と `<html lang>` を確認。
- 言語トグル後の再訪維持を確認（cookie/localStorage）。
- Lighthouseでアクセシビリティ/SEOが悪化していないか確認。

## 10. ロールバック戦略
- 既存静的配信へ戻す場合は `output: 'export'` を復元し、Hostingの `public: "out"` に戻す。ただしSSR機能は無効化される。


