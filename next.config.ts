import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    qualities: [75, 85, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
