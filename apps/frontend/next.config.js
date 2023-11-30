/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@turbostrapi/ui"],
};

module.exports = nextConfig;
