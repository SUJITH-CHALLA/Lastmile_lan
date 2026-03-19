import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    turbo: undefined
  }
};

export default nextConfig;
