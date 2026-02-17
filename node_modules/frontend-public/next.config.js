/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false
  },
  turbopack: {
    root: __dirname
  },
  async rewrites() {
    return [
      {
        source: "/evaluation/:path*",
        destination: "http://localhost:3000/evaluation/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
