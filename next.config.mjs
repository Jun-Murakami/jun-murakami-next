/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化を有効化（Firebase Hosting + FunctionsのSSR構成に合わせる）
  // コメント: unoptimized を削除し、標準の最適化パイプラインを使用
  trailingSlash: false,
  
  // メモリ使用量を削減するための最適化設定
  experimental: {
    // メモリ使用量を削減
    memoryBasedWorkersCount: true,
    // バンドルサイズを削減
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // ビルド時のメモリ制限を設定
  webpack: (config, { isServer }) => {
    if (isServer) {
      // サーバーサイドでのメモリ使用量を制限
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  
  // Turbopack設定（Next.js 16ではTurbopackがデフォルトのため明示的に設定）
  // 空の設定でTurbopackを使用することを明示
  turbopack: {},
};

export default nextConfig;
