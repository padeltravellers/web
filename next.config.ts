import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// GitHub Pages serves at /padeltravellers-web/ subfolder
const basePath = isProd ? "/web" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
