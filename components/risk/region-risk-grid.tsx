import type { RegionScore } from "@/lib/db/schema"
import { LEVEL_COLORS } from "@/lib/risk/levels"

export function RegionRiskGrid({ regionScores }: { regionScores: RegionScore[] }) {
  return (
    <div className="risk-region-grid">
      {regionScores.map((r) => {
        const lc = LEVEL_COLORS[r.level]
        return (
          <div key={r.code} className="risk-region-card" style={{ borderColor: lc.border }}>
            <div className="risk-region-head">
              <span className="risk-region-code" style={{ color: lc.color, background: lc.bg }}>
                {r.code}
              </span>
              <span className="risk-region-name">{r.region}</span>
              <span className="risk-region-score" style={{ color: lc.color }}>
                {r.score}
              </span>
            </div>
            <p className="risk-region-rationale">{r.rationale}</p>
          </div>
        )
      })}
    </div>
  )
}
