/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "http://mysite.com",
    nextVar: "MyVar",
  },
}

module.exports = nextConfig