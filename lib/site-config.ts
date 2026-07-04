/**
 * Single source of truth for the site's public origin.
 *
 * Previously this domain was hardcoded independently in app/layout.tsx,
 * app/sitemap.ts, app/feed.xml/route.ts, and (once correctly named)
 * app/robots.ts — four separate places that had to be kept in sync by
 * hand. NEXT_PUBLIC_BASE_URL existed in .env.local/.env.example but was
 * never actually read by any of them, and pointed at the wrong domain
 * (the old Vercel preview URL, not the live beamedsilicon.qzz.io site).
 *
 * The fallback below is the real production domain, so builds are
 * correct even with no env var set; staging/preview deploys can still
 * override it via NEXT_PUBLIC_BASE_URL.
 */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "")) || "https://beamedsilicon.qzz.io"