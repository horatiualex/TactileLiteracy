import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL 
  || process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN 
  || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '116.203.87.175',
      },
      {
        protocol: 'https',
        hostname: '116.203.87.175',
      },
      {
        protocol: 'http',
        hostname: 'scoala6vaslui.ro',
      },
      {
        protocol: 'https',
        hostname: 'scoala6vaslui.ro',
      },
      {
        protocol: 'http',
        hostname: 'www.scoala6vaslui.ro',
      },
      {
        protocol: 'https',
        hostname: 'www.scoala6vaslui.ro',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      ...[NEXT_PUBLIC_SERVER_URL].filter(Boolean).map((item) => {
        try {
          const url = new URL(item)
          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        } catch (e) {
          return null
        }
      }).filter(Boolean),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
