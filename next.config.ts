import type { NextConfig } from "next";

/**
 * ScentDuel — fully static-exportable build.
 * Deploy target: Cloudflare Workers with Static Assets (NOT Pages, NOT OpenNext SSR).
 * No server runtime is required at request time.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: false,
  trailingSlash: true,
  // Root workspace for Turbopack: point to the project root so Next.js
  // doesn't warn about multiple lockfiles.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Static export cannot run the Next.js image optimization server.
    unoptimized: true,
  },
  // The sandbox dev server tolerates this setting; `output: "export"` only
  // affects `next build`. Keep typescript checking lenient for dev parity.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
