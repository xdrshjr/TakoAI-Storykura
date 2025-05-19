import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    LLM_API_URL: process.env.LLM_API_URL,
    VIDEO_API_URL: process.env.VIDEO_API_URL,
  },
};

export default nextConfig;
