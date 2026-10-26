import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next treats localhost and 127.0.0.1 as different dev origins.
  allowedDevOrigins: ["127.0.0.1"],
  // Lets a production build sit beside the dev server on port 3010.
  distDir: process.env.SAF_DIST_DIR || ".next",
  images: {
    qualities: [65, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
    unoptimized: process.env.SAF_IMAGE_UNOPTIMIZED === "1",
  },
};

export default nextConfig;
