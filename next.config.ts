import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // ✅ Activer le mode strict React
  reactStrictMode: true,
  
  // ✅ Ne pas ignorer les erreurs TypeScript en production
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  // ✅ Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Protection contre le clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Empêche le MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Protection XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Contrôle du referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions policy (restrictif)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-inline/eval nécessaires pour Next.js
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  
  // ✅ Configuration des images sécurisée
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com', // Remplacer par vos domaines
      },
    ],
    // Désactiver l'optimisation en dev pour éviter les DoS
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
