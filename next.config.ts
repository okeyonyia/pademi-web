import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async redirects() {
    return [
      {
        source: "/events/:path*", // Matches /events and /events/anything
        destination: "/download-app",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://pademi.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
