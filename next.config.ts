import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/bob-hair-helsinki', // Replace with your repository name if different
}

export default nextConfig
