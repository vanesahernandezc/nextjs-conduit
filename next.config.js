/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "http",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "api.realworld.io",
      },
    ],
  },
};

module.exports = nextConfig;
