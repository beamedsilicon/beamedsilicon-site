import type { RiskAssessment } from "@/lib/db/schema"
import { LEVEL_COLORS, levelForScore } from "@/lib/risk/levels"

const W = 720
const H = 180
const PAD = { top: 16, right: 16, bottom: 28, left: 34 }

/** Simple SVG line chart of overall score over time (history arrives newest first). */
export function TrendChart({ history }: { history: RiskAssessment[] }) {
  if (history.length < 2) {
    return (
      <p className="risk-trend-empty">
        Trend history will appear here after a few daily updates have accumulated.
      </p>
    )
  }

  const points = [...history].reverse() // oldest → newest
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const x = (i: number) => PAD.left + (i / (points.length - 1)) * innerW
  const y = (score: number) => PAD.top + (1 - score / 100) * innerH

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.overallScore).toFixed(1)}`).join(" ")
  const latest = points[points.length - 1]
  const latestColor = LEVEL_COLORS[levelForScore(latest.overallScore)].color

  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="risk-trend-chart"
      role="img"
      aria-label={`Risk score trend across ${points.length} assessments, currently ${latest.overallScore}`}
    >
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={PAD.left} y1={y(v)} x2={W - PAD.right} y2={y(v)} stroke="var(--border)" strokeWidth="1" />
          <text x={PAD.left - 8} y={y(v) + 3} textAnchor="end" fontSize="9" fill="var(--text-2)" fontFamily="var(--mono)">
            {v}
          </text>
        </g>
      ))}
      <path d={path} fill="none" stroke={latestColor} strokeWidth="2" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={p.id} cx={x(i)} cy={y(p.overallScore)} r={i === points.length - 1 ? 4 : 2.5} fill={LEVEL_COLORS[levelForScore(p.overallScore)].color} />
      ))}
      <text x={x(0)} y={H - 8} textAnchor="start" fontSize="9" fill="var(--text-2)" fontFamily="var(--mono)">
        {fmt(points[0].createdAt)}
      </text>
      <text x={x(points.length - 1)} y={H - 8} textAnchor="end" fontSize="9" fill="var(--text-2)" fontFamily="var(--mono)">
        {fmt(latest.createdAt)}
      </text>
    </svg>
  )
}
