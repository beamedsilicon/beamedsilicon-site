import type { TierScore } from "@/lib/db/schema"
import { LEVEL_COLORS } from "@/lib/risk/levels"
import { TIERS } from "@/lib/tiers"

const TREND_ARROWS = { rising: "▲", falling: "▼", stable: "—" } as const

export function TierRiskList({ tierScores }: { tierScores: TierScore[] }) {
  return (
    <div className="risk-tier-list">
      {tierScores.map((t) => {
        const tier = TIERS.find((x) => x.level === t.tier)
        const lc = LEVEL_COLORS[t.level]
        return (
          <div key={t.tier} className="risk-tier-row">
            <div
              className="risk-tier-badge"
              style={{ color: tier?.color, background: tier?.cbg, border: `1px solid ${tier?.cbr}` }}
            >
              T{t.tier}
            </div>
            <div className="risk-tier-main">
              <div className="risk-tier-top">
                <span className="risk-tier-name">{tier?.name ?? t.name}</span>
                <span
                  className="risk-tier-trend"
                  style={{
                    color: t.trend === "rising" ? "var(--red)" : t.trend === "falling" ? "var(--green)" : "var(--text-2)",
                  }}
                  title={`Trend: ${t.trend}`}
                >
                  {TREND_ARROWS[t.trend]} {t.trend}
                </span>
              </div>
              <div className="risk-tier-bar-track">
                <div
                  className="risk-tier-bar"
                  style={{ width: `${t.score}%`, background: lc.color }}
                />
              </div>
              <p className="risk-tier-rationale">{t.rationale}</p>
            </div>
            <div className="risk-tier-score" style={{ color: lc.color }}>
              {t.score}
            </div>
          </div>
        )
      })}
    </div>
  )
}
