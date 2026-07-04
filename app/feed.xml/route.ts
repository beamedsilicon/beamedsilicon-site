import { NextResponse } from "next/server"
import { SITE_URL } from "@/lib/site-config"

const SITE = SITE_URL

// NOTE: the 4th item below links to /analysis/tsmc-2nm-cowos-constraint,
// which is not a real slug in lib/full-articles.ts (same class of bug the
// old app/sitemap.ts had — see scripts/validate_data.py). The homepage's
// FeaturedAnalysis card (components/featured-analysis.tsx) links to the
// exact same nonexistent slug, so this is currently a live 404 from two
// places at once. The closest real article on the same subject is
// "cowos-advanced-packaging-chiplets" — worth checking whether that's what
// this was meant to point at, or whether the article itself is just
// missing and needs writing.
const ITEMS = [
  {
    title: "HBM4 Shortage Set to Deepen: SK Hynix and Samsung Warn Supply Gap Persists into 2027",
    link: `${SITE}/news/hbm4-shortage-2026`,
    description:
      "SK Hynix and Samsung warn that HBM4 supply constraints will persist into 2027 as AI accelerator demand consumes a growing share of global DRAM output.",
    pubDate: "Fri, 05 Jun 2026 00:00:00 GMT",
  },
  {
    title: "TSMC's 2nm Ramp: CoWoS Yields Hit 98%, Five New Fabs Breaking Ground Simultaneously",
    link: `${SITE}/news/tsmc-2nm-cowos-2026`,
    description:
      "TSMC's advanced packaging yields exceed 98% in volume production as five new fabrication plants break ground in 2026.",
    pubDate: "Thu, 28 May 2026 00:00:00 GMT",
  },
  {
    title: "The MATCH Act: Washington Moves to Ban DUV Lithography Exports to China",
    link: `${SITE}/news/match-act-duv-china-2026`,
    description:
      "Proposed legislation targets ASML's DUV immersion systems, the last class of lithography equipment still legally flowing to Chinese fabs.",
    pubDate: "Tue, 28 Apr 2026 00:00:00 GMT",
  },
  {
    title:
      "TSMC's 2nm Bottleneck: Why CoWoS, Not the Wafer, Is Now the Constraint That Governs the AI Hardware Roadmap",
    link: `${SITE}/analysis/tsmc-2nm-cowos-constraint`,
    description:
      "A full trace of the AI chip supply chain from Spruce Pine quartz through EUV exposure and CoWoS assembly.",
    pubDate: "Thu, 28 May 2026 00:00:00 GMT",
  },
]

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const items = ITEMS.map(
    (it) => `
    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${it.link}</link>
      <guid>${it.link}</guid>
      <description>${escapeXml(it.description)}</description>
      <pubDate>${it.pubDate}</pubDate>
    </item>`
  ).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Beamed Silicon — Semiconductor Supply Chain Intelligence</title>
    <link>${SITE}</link>
    <description>350 companies, 7 supply chain tiers, from quartz mines to AI accelerators.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}