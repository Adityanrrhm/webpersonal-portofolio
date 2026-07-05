import type { NextConfig } from "next";

const API_HOST = process.env.API_HOST || "localhost:8000";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${API_HOST}/api/:path*`,
      },
      {
        source: "/storage/:path*",
        destination: `http://${API_HOST}/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
