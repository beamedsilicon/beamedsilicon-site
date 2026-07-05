import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export interface TierScore {
  tier: number
  name: string
  score: number
  level: RiskLevel
  rationale: string
  trend: "rising" | "falling" | "stable"
}

export interface RegionScore {
  region: string
  code: string
  score: number
  level: RiskLevel
  rationale: string
}

export interface KeyEvent {
  title: string
  impact: "high" | "medium" | "low"
  category: string
  summary: string
  affectedTiers: number[]
  source: string
  sourceUrl: string | null
}

export type RiskLevel = "low" | "moderate" | "elevated" | "high" | "critical"

export const riskAssessments = pgTable("risk_assessments", {
  id: serial("id").primaryKey(),
  overallScore: integer("overallScore").notNull(),
  overallLevel: text("overallLevel").notNull().$type<RiskLevel>(),
  summary: text("summary").notNull(),
  tierScores: jsonb("tierScores").notNull().$type<TierScore[]>(),
  regionScores: jsonb("regionScores").notNull().$type<RegionScore[]>(),
  keyEvents: jsonb("keyEvents").notNull().$type<KeyEvent[]>(),
  outlook: text("outlook").notNull(),
  sourcesAnalyzed: integer("sourcesAnalyzed").notNull().default(0),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
})

export type RiskAssessment = typeof riskAssessments.$inferSelect
