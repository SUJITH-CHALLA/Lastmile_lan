import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
  output: 'standalone',        // faster builds on Vercel
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    workerThreads: false,      // disables worker threads that can hang
    cpus: 1                    // limits parallelism — prevents memory hang
  }
};

export default nextConfig;