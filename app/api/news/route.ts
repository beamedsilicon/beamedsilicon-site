import { NextRequest, NextResponse } from "next/server"
import { TIERS } from "@/lib/tiers"

const API_KEY = "pub_75b628abdbd1493a94235040b3bccd39"
const BASE    = "https://newsdata.io/api/1/news"

/**
 * Consumer-brand companies that appear in Tier 1 as chip buyers/designers
 * but are so generically famous that tier-level queries return sports,
 * lifestyle, and finance noise instead of semiconductor news.
 * Excluded from tier queries only — company-specific search still works.
 */
const CONSUMER_BRANDS = new Set([
  "Apple", "Google", "Microsoft", "Meta Platforms",
  "Amazon Web Services", "Tesla", "Cisco Systems", "IBM",
])

/** Strip chars that break newsdata.io query parsing on the free plan */
function sanitise(name: string): string {
  return name
    .replace(/^the\s+/i, "")          // drop leading "The"
    .replace(/[^a-zA-Z0-9\s]/g, " ")  // periods, hyphens → space
    .replace(/\s+/g, " ")
    .trim()
}

function buildQuery(tier: string | null, company: string | null): string {
  // Direct company search — keep it simple, one quoted phrase
  if (company?.trim()) {
    return `"${sanitise(company.trim())}"`
  }

  if (tier && tier !== "all") {
    const t = TIERS.find(t => String(t.level) === tier)
    if (t) {
      const terms = t.cos
        .filter(([name]) => !CONSUMER_BRANDS.has(name))  // skip generic brands
        .slice(0, 5)
        .map(([name]) => `"${sanitise(name)}"`)
        .join(" OR ")
      return terms || '"semiconductor"'
    }
  }

  // "All" tab — broad industry sweep
  return '"semiconductor" OR "TSMC" OR "Nvidia" OR "ASML" OR "chip"'
}

export async function GET(req: NextRequest) {
  const sp      = new URL(req.url).searchParams
  const tier     = sp.get("tier")
  const company  = sp.get("company")
  const nextPage = sp.get("nextPage")

  const q = buildQuery(tier, company)

  const params = new URLSearchParams({
    apikey:   API_KEY,
    q,
    language: "en",
    // category omitted — causes 422 on free plan
  })
  if (nextPage) params.set("page", nextPage)

  try {
    const res = await fetch(`${BASE}?${params}`, {
      next: { revalidate: 900 },
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      return NextResponse.json(
        { status: "error", message: `newsdata.io ${res.status}`, detail },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ status: "error", message: msg }, { status: 500 })
  }
}