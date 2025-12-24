import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Boshqa sozlamalar bu yerda bo‘lishi mumkin
  typescript: {
    ignoreBuildErrors: true, // TypeScript xatolarini chetlab o'tadi
  },
};

export default nextConfig;
