import type { RiskLevel } from "@/lib/db/schema"

/** Maps a risk level to the site's existing color tokens. */
export const LEVEL_COLORS: Record<RiskLevel, { color: string; bg: string; border: string }> = {
  low: { color: "var(--green)", bg: "rgba(170,255,0,0.08)", border: "rgba(170,255,0,0.28)" },
  moderate: { color: "var(--yellow)", bg: "var(--yellow-bg)", border: "var(--border-yellow)" },
  elevated: { color: "var(--amber)", bg: "var(--amber-bg)", border: "var(--border-amber)" },
  high: { color: "var(--red)", bg: "var(--red-bg)", border: "var(--border-red)" },
  critical: { color: "var(--red)", bg: "var(--red-bg)", border: "var(--red)" },
}

export function levelForScore(score: number): RiskLevel {
  if (score < 25) return "low"
  if (score < 45) return "moderate"
  if (score < 65) return "elevated"
  if (score < 85) return "high"
  return "critical"
}
