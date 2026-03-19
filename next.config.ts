import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    turbo: {
      rules: {}
    }
  }
};

export default nextConfig;