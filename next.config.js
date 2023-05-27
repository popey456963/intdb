const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:id(A[0-9]*)',
        destination: `/search?q=id%3A:id`
      }
    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig)
