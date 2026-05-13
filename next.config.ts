import type { NextConfig } from "next";

// On CF Pages we serve from root domain — no basePath needed.
// To deploy to GitHub Pages subfolder, set GH_PAGES=1 to enable basePath "/web".
const ghPages = process.env.GH_PAGES === "1";
const basePath = ghPages ? "/web" : "";

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
