import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */

// Content-Security-Policy. Note: script-src/style-src still allow 'unsafe-inline'
// because Next.js' app-router hydration bootstrap and Tailwind inject inline
// script/style. The stricter follow-up is a per-request nonce via middleware;
// everything else below (frame-ancestors, nosniff, etc.) is already strict.
// fonts.googleapis.com/gstatic.com are allowed for the classic theme's remote
// Inter @import in globals.css (editorial faces are self-hosted via next/font).
// React's dev server needs eval() for fast-refresh / callstack reconstruction;
// production never does, so 'unsafe-eval' is gated to development only.
const isDev = process.env.NODE_ENV !== "production"
const scriptSrc = isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'"

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
]

const nextConfig = {
  // Pin the workspace root so Turbopack ignores the stray ~/package-lock.json.
  turbopack: {
    root: __dirname,
  },
  // Re-enabled: let type errors (including security-relevant ones) fail the build.
  // (Next 16 removed the build-time `eslint` config key; run ESLint separately.)
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Drop the X-Powered-By: Next.js version-disclosure header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
