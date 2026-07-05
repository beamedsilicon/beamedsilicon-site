import { desc } from "drizzle-orm"
import { db } from "@/lib/db"
import {
  riskAssessments,
  type KeyEvent,
  type RegionScore,
  type RiskAssessment,
  type TierScore,
} from "@/lib/db/schema"
import { levelForScore } from "@/lib/risk/levels"
import { TIERS } from "@/lib/tiers"

/**
 * Rule-based risk engine — zero paid services.
 *
 * Pipeline: fetch free Google News RSS feeds -> match articles against
 * weighted signal categories -> compute per-tier / per-region pressure on
 * top of structural baselines -> smooth against the previous assessment ->
 * persist a snapshot. Narrative text is template-generated from the
 * strongest signals so the dashboard stays fully populated.
 */

// ── News gathering (Google News RSS, free, no key) ──────────────────────

const RSS_QUERIES = [
  "semiconductor supply chain",
  "semiconductor export controls OR sanctions",
  "TSMC OR SMIC OR (Samsung foundry)",
  "ASML OR (chip equipment) OR lithography",
  "gallium OR germanium OR (rare earth) chip",
  "Taiwan chip OR fab",
]

interface Article {
  title: string
  source: string
  link: string | null
  pubDate: Date | null
}

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim()
}

function extract(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return m ? decodeEntities(m[1]) : null
}

async function fetchFeed(query: string): Promise<Article[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "user-agent": "Mozilla/5.0 (risk-monitor)" },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
    return items.map((item) => {
      const pub = extract(item, "pubDate")
      return {
        title: extract(item, "title") ?? "",
        source: extract(item, "source") ?? "unknown",
        link: extract(item, "link"),
        pubDate: pub ? new Date(pub) : null,
      }
    })
  } catch {
    return []
  }
}

async function gatherArticles(): Promise<Article[]> {
  const batches = await Promise.all(RSS_QUERIES.map(fetchFeed))
  const seen = new Set<string>()
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
  const articles: Article[] = []
  for (const batch of batches) {
    for (const a of batch) {
      const key = a.title.toLowerCase().replace(/\s+/g, " ").trim()
      if (!key || seen.has(key)) continue
      if (a.pubDate && a.pubDate.getTime() < cutoff) continue
      seen.add(key)
      articles.push(a)
    }
  }
  return articles.slice(0, 150)
}

// ── Signal categories ────────────────────────────────────────────────────

interface Category {
  name: string
  /** Regex fragments matched case-insensitively against article titles. */
  keywords: RegExp
  /** Points added per matching article (recency-weighted). */
  perHit: number
  /** Maximum pressure this category can contribute. */
  cap: number
  /** Which tiers this pressure applies to (1-7). */
  tiers: number[]
  /** Which region codes this pressure applies to. */
  regions: string[]
  impact: "high" | "medium" | "low"
  note: string
}

const CATEGORIES: Category[] = [
  {
    name: "Geopolitics",
    keywords:
      /taiwan strait|invasion|blockade|military (drill|exercise)|missile|warship|cross-strait|conflict escalat/i,
    perHit: 3,
    cap: 18,
    tiers: [1, 2, 3, 4, 5, 6, 7],
    regions: ["TW", "CN"],
    impact: "high",
    note: "cross-strait and geopolitical tension signals",
  },
  {
    name: "Export Controls",
    keywords:
      /export (control|ban|restrict|licen)|entity list|sanction|chip ban|tech restriction|blacklist/i,
    perHit: 2,
    cap: 14,
    tiers: [2, 3],
    regions: ["CN", "US"],
    impact: "high",
    note: "export control and sanctions activity",
  },
  {
    name: "Trade & Tariffs",
    keywords: /tariff|trade war|import dut|trade dispute|retaliat/i,
    perHit: 1.5,
    cap: 10,
    tiers: [1, 2, 7],
    regions: ["US", "CN"],
    impact: "medium",
    note: "tariff and trade policy friction",
  },
  {
    name: "Natural Disaster",
    keywords: /earthquake|typhoon|flood|drought|power (outage|cut)|fire at|wildfire near/i,
    perHit: 3,
    cap: 16,
    tiers: [2, 6],
    regions: ["TW", "JP"],
    impact: "high",
    note: "natural disaster and infrastructure disruption reports",
  },
  {
    name: "Capacity & Shortage",
    keywords:
      /shortage|sold out|capacity constraint|allocation|supply crunch|backlog|lead time|tight supply|supply squeeze/i,
    perHit: 1.5,
    cap: 12,
    tiers: [1, 2],
    regions: ["TW", "KR"],
    impact: "medium",
    note: "capacity constraints and shortage reports",
  },
  {
    name: "Materials",
    keywords:
      /gallium|germanium|rare earth|neon gas|photoresist|wafer suppl|critical mineral|graphite export/i,
    perHit: 2,
    cap: 12,
    tiers: [6, 7],
    regions: ["CN"],
    impact: "medium",
    note: "raw material and substrate supply signals",
  },
  {
    name: "Cyber & Operations",
    keywords: /cyberattack|ransomware|hacked|data breach|production (halt|halted)|shutdown|fab halt/i,
    perHit: 2.5,
    cap: 14,
    tiers: [2, 3],
    regions: ["TW", "KR"],
    impact: "high",
    note: "operational and cyber disruption reports",
  },
  {
    name: "Labor & Logistics",
    keywords: /strike|port congestion|shipping delay|logistics disruption|freight backlog/i,
    perHit: 1.5,
    cap: 8,
    tiers: [4, 5, 7],
    regions: ["US", "EU"],
    impact: "low",
    note: "labor action and logistics friction",
  },
]

// ── Structural baselines ─────────────────────────────────────────────────

const TIER_BASELINES: Record<number, { score: number; rationale: string }> = {
  1: { score: 30, rationale: "Design houses face indirect exposure through foundry allocation and export rules." },
  2: { score: 48, rationale: "Advanced-node manufacturing remains extremely concentrated in Taiwan and Korea." },
  3: { score: 40, rationale: "Equipment makers sit at the center of export control regimes; ASML is a single point of failure for EUV." },
  4: { score: 36, rationale: "Subsystem suppliers carry long lead times and concentrated customer bases." },
  5: { score: 34, rationale: "Precision component supply is specialized but geographically more distributed." },
  6: { score: 44, rationale: "Specialty gases, photoresists, and substrates have chronic sole-source chokepoints." },
  7: { score: 46, rationale: "Raw material refining is heavily concentrated in China, giving export-licensing leverage." },
}

const REGION_BASELINES: { region: string; code: string; score: number; rationale: string }[] = [
  { region: "Taiwan", code: "TW", score: 55, rationale: "Extreme fab concentration plus seismic and cross-strait exposure." },
  { region: "China", code: "CN", score: 50, rationale: "Bidirectional export controls and materials export-licensing leverage." },
  { region: "South Korea", code: "KR", score: 38, rationale: "Memory duopoly concentration; stable operating environment." },
  { region: "United States", code: "US", score: 33, rationale: "Capacity ramping onshore; policy and tariff uncertainty persists." },
  { region: "Japan", code: "JP", score: 32, rationale: "Materials and equipment strength; seismic risk is the main hazard." },
  { region: "Europe", code: "EU", score: 29, rationale: "ASML chokepoint is systemically critical but operationally stable." },
]

/** Weight of each tier in the overall score (manufacturing dominates). */
const TIER_WEIGHTS: Record<number, number> = { 1: 1, 2: 2.5, 3: 1.5, 4: 1, 5: 1, 6: 1.5, 7: 1.5 }

// ── Scoring engine ───────────────────────────────────────────────────────

interface CategoryResult {
  category: Category
  pressure: number
  hits: Article[]
}

function scoreCategories(articles: Article[]): CategoryResult[] {
  const now = Date.now()
  return CATEGORIES.map((category) => {
    const hits = articles.filter((a) => category.keywords.test(a.title))
    let pressure = 0
    for (const a of hits) {
      const ageH = a.pubDate ? (now - a.pubDate.getTime()) / 3.6e6 : 96
      const recency = ageH <= 48 ? 1 : 0.5
      pressure += category.perHit * recency
    }
    return { category, pressure: Math.min(category.cap, pressure), hits }
  })
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

/** Blend toward previous score to avoid day-to-day whiplash. */
function smooth(computed: number, prev: number | undefined): number {
  return prev === undefined ? clamp(computed) : clamp(0.65 * computed + 0.35 * prev)
}

function trendFor(score: number, prev: number | undefined): TierScore["trend"] {
  if (prev === undefined) return "stable"
  if (score - prev >= 3) return "rising"
  if (prev - score >= 3) return "falling"
  return "stable"
}

function buildKeyEvents(results: CategoryResult[]): KeyEvent[] {
  const events: KeyEvent[] = []
  const usedTitles = new Set<string>()
  const active = [...results].filter((r) => r.hits.length > 0).sort((a, b) => b.pressure - a.pressure)
  for (const r of active) {
    const fresh = [...r.hits].sort(
      (a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0),
    )
    for (const article of fresh.slice(0, 2)) {
      const key = article.title.toLowerCase()
      if (usedTitles.has(key)) continue
      usedTitles.add(key)
      events.push({
        title: article.title,
        impact: r.pressure >= r.category.cap * 0.6 ? r.category.impact : "low",
        category: r.category.name,
        summary: `Flagged by the ${r.category.name.toLowerCase()} signal monitor (${r.hits.length} related ${r.hits.length === 1 ? "report" : "reports"} this week) — ${r.category.note}.`,
        affectedTiers: r.category.tiers.slice(0, 4),
        source: article.source,
        sourceUrl: article.link,
      })
      if (events.length >= 8) return events
    }
    if (events.length >= 8) break
  }
  return events
}

function buildSummary(overall: number, results: CategoryResult[], sources: number): string {
  const top = [...results].sort((a, b) => b.pressure - a.pressure).filter((r) => r.pressure > 0)
  const level = levelForScore(overall)
  const lead = `Automated signal analysis of ${sources} news reports places overall semiconductor supply chain risk at ${overall}/100 (${level}).`
  if (top.length === 0) {
    return `${lead} No acute disruption signals were detected this cycle; the score reflects structural concentration risk in Taiwan-centric manufacturing and China-centric materials refining.`
  }
  const drivers = top
    .slice(0, 3)
    .map((r) => `${r.category.name.toLowerCase()} (${r.hits.length} ${r.hits.length === 1 ? "report" : "reports"})`)
    .join(", ")
  return `${lead} The strongest active pressure ${top.length === 1 ? "signal is" : "signals are"} ${drivers}, layered on top of structural concentration in Taiwan-centric manufacturing and China-centric materials refining.`
}

function buildOutlook(results: CategoryResult[], prevOverall: number | undefined, overall: number): string {
  const top = [...results].sort((a, b) => b.pressure - a.pressure).filter((r) => r.pressure > 0)
  const direction =
    prevOverall === undefined
      ? "This is the baseline assessment; direction will be established over the coming updates."
      : overall - prevOverall >= 3
        ? "Aggregate risk is trending up versus the previous assessment."
        : prevOverall - overall >= 3
          ? "Aggregate risk is easing versus the previous assessment."
          : "Aggregate risk is broadly stable versus the previous assessment."
  const watch =
    top.length > 0
      ? `Watch items for the next 30-90 days: ${top
          .slice(0, 3)
          .map((r) => r.category.name.toLowerCase())
          .join(", ")}.`
      : "Watch items for the next 30-90 days: export control announcements, advanced packaging capacity, and cross-strait developments."
  return `${direction} ${watch} Scores update automatically each day as new signals arrive.`
}

// ── Main entry point ─────────────────────────────────────────────────────

export async function generateRiskAssessment(): Promise<RiskAssessment> {
  const articles = await gatherArticles()
  const results = scoreCategories(articles)

  const previous = await db
    .select()
    .from(riskAssessments)
    .orderBy(desc(riskAssessments.createdAt))
    .limit(1)
  const prev = previous[0]

  const tierScores: TierScore[] = TIERS.map((t) => {
    const baseline = TIER_BASELINES[t.level] ?? { score: 35, rationale: "Structural baseline." }
    // Scale summed pressure: each tier feels a fraction of every matching category.
    const pressure = results
      .filter((r) => r.category.tiers.includes(t.level))
      .reduce((sum, r) => sum + r.pressure * 0.6, 0)
    const prevScore = prev?.tierScores.find((p) => p.tier === t.level)?.score
    const score = smooth(baseline.score + pressure, prevScore)
    const topDriver = results
      .filter((r) => r.category.tiers.includes(t.level) && r.pressure > 0)
      .sort((a, b) => b.pressure - a.pressure)[0]
    const rationale = topDriver
      ? `${baseline.rationale} Current pressure: ${topDriver.category.note} (${topDriver.hits.length} ${topDriver.hits.length === 1 ? "report" : "reports"}).`
      : `${baseline.rationale} No acute signals detected this cycle.`
    return {
      tier: t.level,
      name: t.name,
      score,
      level: levelForScore(score),
      rationale,
      trend: trendFor(score, prevScore),
    }
  })

  const regionScores: RegionScore[] = REGION_BASELINES.map((r) => {
    const pressure = results
      .filter((c) => c.category.regions.includes(r.code))
      .reduce((sum, c) => sum + c.pressure * 0.5, 0)
    const prevScore = prev?.regionScores.find((p) => p.code === r.code)?.score
    const score = smooth(r.score + pressure, prevScore)
    const topDriver = results
      .filter((c) => c.category.regions.includes(r.code) && c.pressure > 0)
      .sort((a, b) => b.pressure - a.pressure)[0]
    const rationale = topDriver
      ? `${r.rationale} Active signal: ${topDriver.category.note}.`
      : r.rationale
    return { region: r.region, code: r.code, score, level: levelForScore(score), rationale }
  })

  const totalWeight = tierScores.reduce((s, t) => s + (TIER_WEIGHTS[t.tier] ?? 1), 0)
  const overallScore = clamp(
    tierScores.reduce((s, t) => s + t.score * (TIER_WEIGHTS[t.tier] ?? 1), 0) / totalWeight,
  )

  const [inserted] = await db
    .insert(riskAssessments)
    .values({
      overallScore,
      overallLevel: levelForScore(overallScore),
      summary: buildSummary(overallScore, results, articles.length),
      tierScores,
      regionScores,
      keyEvents: buildKeyEvents(results),
      outlook: buildOutlook(results, prev?.overallScore, overallScore),
      sourcesAnalyzed: articles.length,
    })
    .returning()

  return inserted
}

/** Latest assessment, or null if none exists yet. */
export async function getLatestAssessment(): Promise<RiskAssessment | null> {
  const rows = await db
    .select()
    .from(riskAssessments)
    .orderBy(desc(riskAssessments.createdAt))
    .limit(1)
  return rows[0] ?? null
}

/** Recent history for trend charting (newest first). */
export async function getAssessmentHistory(limit = 30): Promise<RiskAssessment[]> {
  return db
    .select()
    .from(riskAssessments)
    .orderBy(desc(riskAssessments.createdAt))
    .limit(limit)
}

const STALE_MS = 36 * 60 * 60 * 1000

export function isStale(assessment: RiskAssessment | null): boolean {
  if (!assessment) return true
  return Date.now() - assessment.createdAt.getTime() > STALE_MS
}
