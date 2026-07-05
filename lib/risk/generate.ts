import { generateText, Output } from "ai"
import { z } from "zod"
import { desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { riskAssessments, type RiskAssessment } from "@/lib/db/schema"
import { TIERS } from "@/lib/tiers"

const NEWS_API_KEY = process.env.NEWSDATA_API_KEY || "pub_75b628abdbd1493a94235040b3bccd39"
const NEWS_BASE = "https://newsdata.io/api/1/news"

const MODEL = "openai/gpt-5.4-mini"

/**
 * Queries designed to sweep the full supply chain for risk-relevant signals:
 * geopolitics/export controls, manufacturing, equipment, and raw materials.
 */
const RESEARCH_QUERIES = [
  '"semiconductor" AND ("export controls" OR "sanctions" OR "tariff" OR "Taiwan")',
  '"TSMC" OR "SMIC" OR "Samsung Foundry" OR "chip shortage"',
  '"ASML" OR "chip equipment" OR "lithography"',
  '"gallium" OR "germanium" OR "rare earth" OR "silicon wafer"',
]

interface Article {
  title: string
  description: string | null
  source: string
  link: string | null
  pubDate: string | null
}

async function fetchNews(query: string): Promise<Article[]> {
  const params = new URLSearchParams({
    apikey: NEWS_API_KEY,
    q: query,
    language: "en",
  })
  try {
    const res = await fetch(`${NEWS_BASE}?${params}`, { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data?.results)) return []
    return data.results.map(
      (r: Record<string, unknown>): Article => ({
        title: String(r.title ?? ""),
        description: typeof r.description === "string" ? r.description.slice(0, 300) : null,
        source: String(r.source_id ?? "unknown"),
        link: typeof r.link === "string" ? r.link : null,
        pubDate: typeof r.pubDate === "string" ? r.pubDate : null,
      }),
    )
  } catch {
    return []
  }
}

async function gatherResearch(): Promise<Article[]> {
  const batches = await Promise.all(RESEARCH_QUERIES.map(fetchNews))
  const seen = new Set<string>()
  const articles: Article[] = []
  for (const batch of batches) {
    for (const a of batch) {
      const key = a.title.toLowerCase().trim()
      if (!key || seen.has(key)) continue
      seen.add(key)
      articles.push(a)
    }
  }
  return articles.slice(0, 80)
}

const riskLevelSchema = z.enum(["low", "moderate", "elevated", "high", "critical"])

const assessmentSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall supply chain risk score, 0 (no risk) to 100 (crisis)"),
  overallLevel: riskLevelSchema,
  summary: z
    .string()
    .describe("Executive summary of the current semiconductor supply chain risk picture, 2-4 sentences"),
  tierScores: z
    .array(
      z.object({
        tier: z.number().min(1).max(7),
        score: z.number().min(0).max(100),
        level: riskLevelSchema,
        rationale: z.string().describe("1-2 sentence rationale specific to this tier"),
        trend: z.enum(["rising", "falling", "stable"]),
      }),
    )
    .length(7)
    .describe("One score per supply chain tier, tiers 1 through 7 in order"),
  regionScores: z
    .array(
      z.object({
        region: z.string().describe("Region name, e.g. Taiwan, South Korea, China, United States, Japan, Europe"),
        code: z.string().describe("Two-letter code: TW, KR, CN, US, JP, EU"),
        score: z.number().min(0).max(100),
        level: riskLevelSchema,
        rationale: z.string(),
      }),
    )
    .min(4)
    .max(6),
  keyEvents: z
    .array(
      z.object({
        title: z.string(),
        impact: z.enum(["high", "medium", "low"]),
        category: z
          .string()
          .describe("Short category, e.g. Export Controls, Geopolitics, Capacity, Materials, Natural Disaster"),
        summary: z.string().describe("1-2 sentences on why this matters for the supply chain"),
        affectedTiers: z.array(z.number().min(1).max(7)),
        source: z.string().describe("Source name of the underlying article"),
        sourceUrl: z.string().nullable().describe("URL of the underlying article, or null"),
      }),
    )
    .min(3)
    .max(8)
    .describe("The most consequential recent events, drawn from the provided articles"),
  outlook: z.string().describe("Forward-looking 30-90 day outlook, 2-3 sentences"),
})

const TIER_CONTEXT = TIERS.map(
  (t) => `Tier ${t.level}: ${t.name} — ${t.tag}. Examples: ${t.cos.slice(0, 6).map(([n]) => n).join(", ")}`,
).join("\n")

export async function generateRiskAssessment(): Promise<RiskAssessment> {
  const articles = await gatherResearch()

  const previous = await db
    .select()
    .from(riskAssessments)
    .orderBy(desc(riskAssessments.createdAt))
    .limit(1)

  const prev = previous[0]
  const prevContext = prev
    ? `Previous assessment (${prev.createdAt.toISOString().slice(0, 10)}): overall ${prev.overallScore}/100 (${prev.overallLevel}). Tier scores: ${prev.tierScores.map((t) => `T${t.tier}=${t.score}`).join(", ")}. Use this to judge trends — do not swing scores wildly without clear news justification.`
    : "No previous assessment exists. Establish a well-calibrated baseline."

  const articleDigest =
    articles.length > 0
      ? articles
          .map(
            (a, i) =>
              `[${i + 1}] ${a.title} (${a.source}${a.pubDate ? `, ${a.pubDate.slice(0, 10)}` : ""})${a.description ? ` — ${a.description}` : ""}${a.link ? ` | ${a.link}` : ""}`,
          )
          .join("\n")
      : "No fresh articles were retrieved. Base the assessment on structural, well-known supply chain conditions and note the reduced confidence."

  const { output } = await generateText({
    model: MODEL,
    output: Output.object({ schema: assessmentSchema }),
    system: `You are a semiconductor supply chain risk analyst producing a daily risk assessment for a public dashboard.

The supply chain is modeled in 7 tiers:
${TIER_CONTEXT}

Scoring calibration: 0-24 low, 25-44 moderate, 45-64 elevated, 65-84 high, 85-100 critical. A "normal" day in this industry — with its structural Taiwan concentration and ongoing US-China tech tensions — typically sits in the 35-55 range overall. Reserve high/critical for active disruptions (major export control escalations, conflict, earthquakes hitting fabs, critical material embargoes).

Be specific and evidence-driven: tie rationales and key events to the provided articles where possible. For key events, cite the actual article source and URL. Do not fabricate events not supported by the articles or well-established structural facts.`,
    prompt: `Today is ${new Date().toISOString().slice(0, 10)}.

${prevContext}

Recent news articles (${articles.length} sources):
${articleDigest}

Produce the daily semiconductor supply chain risk assessment.`,
  })

  const [inserted] = await db
    .insert(riskAssessments)
    .values({
      overallScore: Math.round(output.overallScore),
      overallLevel: output.overallLevel,
      summary: output.summary,
      tierScores: output.tierScores.map((t, i) => ({
        ...t,
        tier: t.tier || i + 1,
        score: Math.round(t.score),
        name: TIERS[i]?.name ?? `Tier ${i + 1}`,
      })),
      regionScores: output.regionScores.map((r) => ({ ...r, score: Math.round(r.score) })),
      keyEvents: output.keyEvents,
      outlook: output.outlook,
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
