/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mukpic-image.s3.ap-northeast-2.amazonaws.com'], // 이미지 호스트 추가
  },
};

module.exports = nextConfig;