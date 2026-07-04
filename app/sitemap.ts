import { MetadataRoute } from "next"
import { FULL_ARTICLES } from "@/lib/full-articles"
import { SITE_URL } from "@/lib/site-config"

/** "Jun 2, 2026" style strings → Date, falling back to `now` if unparsable. */
function parseArticleDate(raw: string, fallback: Date): Date {
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? fallback : d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const now  = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/markets`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/supply-chain`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/companies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/analysis`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/policy`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ]

  // Generated straight from FULL_ARTICLES rather than hand-typed, so this
  // list can never contain a slug that doesn't correspond to a real page
  // (see app/analysis/[slug]/page.tsx → getFullArticle), and can never be
  // missing an article that actually exists. The previous version had both
  // problems at once: 22 hand-typed slugs that 404'd, and 15 real articles
  // that were never listed at all — see scripts/validate_data.py.
  const analysisPages: MetadataRoute.Sitemap = FULL_ARTICLES.map((article) => ({
    url: `${base}/analysis/${article.slug}`,
    lastModified: parseArticleDate(article.date, now),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  // These reference /news/<slug> detail pages for the three hand-written
  // stories featured in components/latest-news.tsx. That route
  // (app/news/[slug]/page.tsx) wasn't present in the files reviewed —
  // confirm it actually exists in the repo before trusting these; if it
  // doesn't, these will 404 the exact same way the old /analysis/* entries
  // did, and should either get a real page or be removed from here (and
  // from the hrefs in components/latest-news.tsx).
  const newsPages: MetadataRoute.Sitemap = [
    { url: `${base}/news/hbm4-shortage-2026`, lastModified: new Date("2026-06-05"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/news/tsmc-2nm-cowos-2026`, lastModified: new Date("2026-05-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/news/match-act-duv-china-2026`, lastModified: new Date("2026-04-28"), changeFrequency: "monthly", priority: 0.8 },
  ]

  return [...staticPages, ...analysisPages, ...newsPages]
}