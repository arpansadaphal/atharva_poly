// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   devIndicators: false,
//   images: {
//     formats: ['image/avif', 'image/webp'],
//     qualities: [60, 75, 85],
//     remotePatterns: [],
//   },
// }

// export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
    remotePatterns: [],
  },
  async headers() {
    return [
      // 1. Static JS/CSS/Fonts – Immutable 1-year caching (works on all hosts)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // 2. Images in /assets – 30-day caching
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
      // 3. Next.js optimized images – 1 day + 7 days stale-while-revalidate
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // 4. Global Security Headers (No Vercel-specific values!)
      {
       source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        // Relaxed CSP – allows everything needed for the globe
        { key: 'Content-Security-Policy', value: 
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: https: http:; " +        // added http: just in case
          "font-src 'self' data: https:; " +
          "connect-src 'self' https: http: data:; " +    // allow all HTTPS connections
          "base-uri 'self'; " +
          "form-action 'self';"
        },
      ],
      },
    ]
  },
}

export default nextConfig