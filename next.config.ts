import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't leak the framework in response headers.
  poweredByHeader: false,
  // Gzip/Brotli compression for served assets.
  compress: true,
  // Fail the production build on type errors (safety net alongside CI).
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
