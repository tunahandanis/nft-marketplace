/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AI_API_KEY: process.env.AI_API_KEY,
  },
}

module.exports = nextConfig
