import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/bob-hair-helsinki',
  assetPrefix: '/bob-hair-helsinki/',
}

export default nextConfig
