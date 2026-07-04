import { TICKER_ITEMS, TIERS } from "@/lib/tiers"

// Was a hardcoded "350 COMPANIES" — lib/tiers.ts actually has 700 entries
// (confirmed by scripts/validate_data.py). Deriving it here means this
// label can't go stale again the way it already had.
const TOTAL_COMPANIES = TIERS.reduce((sum, t) => sum + t.cos.length, 0)

export function Ticker() {
  // Duplicate the list so the marquee loops seamlessly (matches the -50% keyframe).
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker">
      <div className="tick-label">{TOTAL_COMPANIES} COMPANIES</div>
      <div className="tick-track">
        {items.map(([company, note], i) => (
          <span className="tick-item" key={`${company}-${i}`}>
            {company} <span className="tick-sep">·</span> {note}
          </span>
        ))}
      </div>
    </div>
  )
}