import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress static generation errors for pages that need DB access
  // during build time when no Supabase env vars are present
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
