import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next treats localhost and 127.0.0.1 as different dev origins.
  allowedDevOrigins: ["127.0.0.1"],
  // Lets a production build sit beside the dev server on port 3010.
  distDir: process.env.SAF_DIST_DIR || ".next",
};

export default nextConfig;
