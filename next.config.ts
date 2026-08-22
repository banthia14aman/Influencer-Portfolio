import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only, so the site is exported rather than
 * run on a server. Nothing here uses a server feature, so the export is
 * lossless.
 *
 * A project page lives at /<repo>/, not at the domain root, so assets need a
 * basePath. The workflow sets NEXT_PUBLIC_BASE_PATH; locally it is unset and
 * `npm run dev` keeps serving from /.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Pages has no image optimiser; serve the files as-is.
  images: { unoptimized: true },
  // emit /ask/index.html so the route resolves without a server rewrite
  trailingSlash: true,
};

export default nextConfig;
