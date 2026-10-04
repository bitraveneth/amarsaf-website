import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next treats localhost and 127.0.0.1 as different dev origins.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
