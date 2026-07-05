import type { RiskLevel } from "@/lib/db/schema"
import { LEVEL_COLORS } from "@/lib/risk/levels"

export function RiskGauge({ score, level }: { score: number; level: RiskLevel }) {
  const { color } = LEVEL_COLORS[level]
  // Semicircle gauge: 180° arc, radius 80, centered at (100, 100)
  const angle = Math.PI * (1 - score / 100)
  const needleX = 100 + 80 * Math.cos(angle)
  const needleY = 100 - 80 * Math.sin(angle)
  const circumference = Math.PI * 80

  return (
    <div className="risk-gauge">
      <svg viewBox="0 0 200 118" role="img" aria-label={`Overall risk score ${score} out of 100, level ${level}`}>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--border-md)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 6px ${color === "var(--red)" ? "rgba(255,85,85,0.5)" : "var(--glow)"})` }}
        />
        <line x1="100" y1="100" x2={needleX} y2={needleY} stroke="var(--text-0)" strokeWidth="1.5" opacity="0.5" />
        <circle cx="100" cy="100" r="4" fill={color} />
      </svg>
      <div className="risk-gauge-score" style={{ color }}>
        {score}
      </div>
      <div className="risk-gauge-level" style={{ color }}>
        {level.toUpperCase()}
      </div>
    </div>
  )
}
