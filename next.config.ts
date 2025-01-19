/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류 무시
  },
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
};

module.exports = nextConfig;