// Static export for GitHub Pages.
// Project page (github.io/Beyond-The-Frame): leave SITE_BASE_PATH unset.
// Custom domain at the root: set SITE_BASE_PATH to an empty string in the deploy workflow.
const basePath = process.env.SITE_BASE_PATH ?? "/Beyond-The-Frame";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
