# タスク: ssr-i18n-middleware

## 01. SSR有効化とFirebase統合
- [ ] `next.config.mjs` から `output: 'export'` を削除し、SSR/ISRを有効化
- [ ] Firebase Web Frameworks 統合を有効化（`firebase init hosting` -> Next.js）
- [ ] 画像最適化設定の見直し（`images.unoptimized` を必要に応じて削除）

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: Next.js/Firestore Hosting エンジニア
- Task: SSR/ISRの有効化とWeb Frameworks統合完了。`next.config.mjs`と`firebase.json`の整合。
- Restrictions: 既存のUI/ロジック変更なし。破壊的変更はしない。
- _Leverage: `next.config.mjs`, `firebase.json`
- _Requirements: 要件の「SSR有効化」「画像最適化」
- Success: `firebase deploy` 後にSSR応答が確認できる。

## 02. ミドルウェア追加（言語判定とcookie発行）
- [ ] ルート直下に `middleware.ts` を追加
- [ ] `Accept-Language` を解析し `language=ja|en` をcookieで保存（1年）
- [ ] 既存cookieがあれば尊重、`X-App-Language` ヘッダも付与

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: Next.js Middleware エンジニア
- Task: `middleware.ts` で言語決定とcookie発行。Edgeは使わずNodeランタイム。
- Restrictions: 全パス対象、認証やリダイレクトは行わない。
- _Leverage: `next/server` API
- _Requirements: 要件の「言語判定ミドルウェア」
- Success: 初回アクセスでcookieが設定され、ヘッダにも反映される。

## 03. `<html lang>` のSSR適用
- [ ] `src/app/layout.tsx` で `cookies()` を用いて `<html lang>` を設定
- [ ] cookie未設定時は `ja` フォールバック

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: App Router エンジニア
- Task: SSR時点で`<html lang>` を適切に出力。
- Restrictions: 既存のメタ情報やMUI初期化は維持。
- _Leverage: `next/headers`
- _Requirements: 要件の「SSRでの <html lang> 設定」
- Success: 初期描画から言語チラつきなし。

## 04. `LanguageContext` の同期初期化とcookie更新
- [ ] 初期化ロジックを `cookie > localStorage > navigator` 優先に変更
- [ ] 言語変更時に cookie と `document.documentElement.lang` を更新
- [ ] `LanguageProvider` の二重ラップを解消

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: React/状態管理エンジニア
- Task: クライアント側言語状態の同期整合。
- Restrictions: 既存の翻訳辞書やUIは変更しない。
- _Leverage: `src/contexts/LanguageContext.tsx`, `src/app/ClientLayout.tsx`, `src/app/layout.tsx`
- _Requirements: 要件の「クライアント側状態との整合」「Provider配置整理」
- Success: トグル後の再訪でも選択言語が維持。

## 05. GAイベントに言語を付加
- [ ] `sendGAEvent` 呼び出し箇所に `{ language }` を追加

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: フロントエンド計測エンジニア
- Task: SNS/Appカード等のイベントに`language`フィールドを追加。
- Restrictions: 既存イベント名/構造は維持。
- _Leverage: `src/app/page.tsx`
- _Requirements: 要件の「解析/計測」
- Success: 本番でイベントに言語が付く。

## 06. テスト/検証
- [ ] エミュレータでSSR/Middleware動作を確認
- [ ] ブラウザ言語切替で初期表示/`<html lang>` の一致を検証
- [ ] LighthouseでA11y/SEO確認

Prompt:
Implement the task for spec ssr-i18n-middleware, first run spec-workflow-guide to get the workflow guide then implement the task:
- Role: QA/パフォーマンステスト
- Task: 受け入れ基準の全確認。
- Restrictions: 本番トラフィックに影響を与えない形で検証。
- _Leverage: Firebase Emulator Suite, Lighthouse
- _Requirements: 要件の「受け入れ基準」「テスト計画」
- Success: 全項目が合格。


