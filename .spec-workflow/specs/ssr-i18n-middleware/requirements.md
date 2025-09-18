# 要件定義: ssr-i18n-middleware

## 概要
本仕様は、既存のNext.js静的エクスポート構成を、Firebase Hosting + Cloud Functions (v2) を用いたSSR構成へ移行し、ミドルウェアによる言語自動判定（日本語/英語）と初期表示からのロケール適用を実現するための要件を定義する。

## 背景/動機
- 現状は `output: 'export'` により静的サイトとして配信しているため、初回SSR時の言語最適化ができない。
- クライアント側で `navigator.language` を参照しているが、初期描画で意図しない言語が表示される瞬間的なチラつきが発生し得る。
- FirebaseでSSRが可能になったため、Accept-Languageを利用した初回リクエスト時の言語決定と `<html lang>` のSSR時点適用を行いたい。

## 目標（Goals）
- Next.jsのSSRをFirebase Hosting + Functions v2で有効化し、ページ初期表示からユーザーのOS/ブラウザ既定言語（ja/en）に自動切替する。
- ミドルウェアでAccept-Languageを用いて初回アクセス時に言語を決定し、`language` cookieを発行する。
- サーバサイドレンダリング時に `cookies()` を参照して `<html lang>` を適切に設定し、チラつきを解消する。
- 既存の言語トグル（`LanguageToggle`）でユーザー選択をcookie（および必要ならlocalStorage）に反映し、再訪時も一貫した言語で表示する。
- 既存UI/コンテンツ構造（App Router、MUI、`src/locales/{ja,en}.ts`）は維持し、破壊的変更を避ける。

## 非目標（Non-Goals）
- 多言語のルート分割（例: `/ja` `/en`）は行わない（単一ルートで言語切替）。
- 翻訳資産の大規模リファクタや、i18nライブラリ（next-intl等）への全面移行は行わない。
- CMS導入や言語追加（>2言語）は本スコープ外。

## 利用者ストーリー（User Stories）
- 初回訪問者として、ブラウザの言語が日本語なら、ページを開いた瞬間から日本語で読みたい。
- 英語環境の訪問者として、初回表示から英語で表示され、以後も英語が維持されてほしい。
- ユーザーとして、言語トグル操作後は再読み込み/再訪問でも選択言語が維持されてほしい。
- 管理者として、最小限の改修でSSR化し、SEO/A11yを改善したい。

## 機能要件（Functional Requirements）
1. SSR有効化
   - `next.config.mjs` から `output: 'export'` を除去し、SSRを有効化する。
   - Firebase CLIのWeb Frameworks統合を用いてデプロイする（Hosting + Functions v2）。
2. 言語判定ミドルウェア
   - `middleware.ts` を追加。
   - 既存cookie `language` が無ければ、`Accept-Language` を先頭優先で判定し `ja`/`en` を決定。
   - `language` cookie を `path=/`、`maxAge=1年`、`sameSite=lax`（本番は `secure: true`）で発行。
   - 必要に応じて `X-App-Language` ヘッダを付与（サーバー側ロギングやデバッグ用）。
3. SSRでの `<html lang>` 設定
   - `app/layout.tsx`（サーバコンポーネント）で `cookies()` を参照し、`<html lang={cookieLang}>` を出力。
   - cookie未設定時は `ja` をフォールバック（ミドルウェアですぐに設定される）。
4. クライアント側状態との整合
   - `LanguageContext` 初期値は cookie > localStorage > `navigator.language` の優先度で同期的に決定。
   - 言語トグル操作時は cookie（および互換性のためlocalStorage）を更新し、`<html lang>` もクライアント側で更新。
5. 画像最適化/静的資産
   - `next/image` の最適化を有効化（Hosting経由）。
   - 既存の `public/` 資産とOG画像は従来どおり配信。
6. エラールーティング/404
   - 既存の404/rewritesはWeb Frameworks統合の自動設定に合わせて移行。独自404はApp Routerの `not-found` を利用。
7. 解析/計測
   - GAに言語情報をイベントプロパティとして送信（SNS/Appカードクリックイベントに `language` を追加）。

## 技術要件（Technical Requirements）
- Firebase
  - プロジェクトはBlazeプラン。
  - Functions v2（Node.js 18+）でSSRを実行。必要なら `minInstances: 1` でコールドスタート緩和（コスト要）。
  - Firebase CLIのWeb Frameworks統合を使用（`firebase init hosting` → Framework=Next.js）。
- Next.js
  - App Router構成（現行通り）。
  - ミドルウェアはNodeランタイムで実行（Edge Runtimeは使用しない）。
  - `next.config.mjs` から `output: 'export'` を削除し、デフォルトのSSR/ISRを許容。
  - 画像最適化は標準設定を使用（既存の `images.unoptimized: true` は見直し可）。
- コードベース整合
  - `LanguageProvider` の二重ラップを解消し、アプリ全体で単一のProviderを保持。
  - i18n辞書 `src/locales/{ja,en}.ts` は現行スキーマを維持。

## パフォーマンス要件（Performance）
- コールドスタート時TTFB: 1〜3秒程度を許容（`minInstances`で短縮可能）。
- 再訪時TTFB: < 600ms（Hostingキャッシュ/近接PoPを期待）。
- FCP: < 1.8s（端末/回線に依存）。
- ページ初期表示での言語チラつきゼロ（サーバ側で `<html lang>` と文言が一致）。

## セキュリティ/プライバシー
- Cookie: `language` は機微情報ではないが、プライバシーポリシーにクッキー利用（言語保持）の追記を行う。
- `sameSite=lax`、本番は `secure: true`。
- EU等地域でのクッキー同意は不要な分類だが、既存の同意UI方針があれば準拠。

## アクセシビリティ/SEO
- `<html lang>` を正しく設定し、スクリーンリーダー互換性を改善。
- OG/Twitterカードは既存の日本語を維持。将来英語OGを出し分ける場合は別途検討。

## ロールアウト計画
1. ローカル: Firebase EmulatorでSSRを検証。
2. ステージング（任意）: テスト用プロジェクトにデプロイ。
3. 本番: 段階的リリース。モニタリングを強化（Functionsログ/GA）。
4. 必要に応じて `minInstances` を調整。

## 受け入れ基準（Acceptance Criteria）
- 初回アクセスでユーザーのブラウザ言語に応じたロケール（ja/en）でSSRされ、チラつきがない。
- 言語トグル操作後、再読み込み・別ページ遷移・再訪問でも選択言語が維持される。
- `<html lang>` が常に実表示言語と一致する。
- GAイベントに `language` が付与される。
- Lighthouseで国際化/アクセシビリティ項目が悪化していない。

## 既知のリスク
- Functionsのコールドスタートにより初回TTFBが長くなる場合がある。
- 画像最適化やMiddlewareの挙動により、まれにキャッシュ制御との整合が必要になる。

## 依存/前提
- FirebaseプロジェクトがBlazeプランであること。
- `firebase init hosting` によりWeb Frameworks統合が完了していること。


