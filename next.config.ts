import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["mukpic-image.s3.ap-northeast-2.amazonaws.com"], // 허용된 도메인 추가
  },
};

export default nextConfig;
