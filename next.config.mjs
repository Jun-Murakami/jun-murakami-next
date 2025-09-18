/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化を有効化（Firebase Hosting + FunctionsのSSR構成に合わせる）
  // コメント: unoptimized を削除し、標準の最適化パイプラインを使用
  trailingSlash: false,
};

export default nextConfig;
