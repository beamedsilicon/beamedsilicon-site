import { TICKER_ITEMS, TIERS } from "@/lib/tiers"

// Was a hardcoded "350 COMPANIES" — lib/tiers.ts actually has 700 entries
// (confirmed by scripts/validate_data.py). Deriving it here means this
// label can't go stale again the way it already had.
const TOTAL_COMPANIES = TIERS.reduce((sum, t) => sum + t.cos.length, 0)

// Map every tracked company name to its official site so each ticker entry
// links somewhere real instead of being dead text. Companies not found in
// the dataset fall back to the /companies directory.
const COMPANY_URLS = new Map<string, string>(
  TIERS.flatMap((t) => t.cos.map(([name, , url]) => [name, url] as const))
)

export function Ticker() {
  // Duplicate the list so the marquee loops seamlessly (matches the -50% keyframe).
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker">
      <div className="tick-label">{TOTAL_COMPANIES} COMPANIES</div>
      <div className="tick-track">
        {items.map(([company, note], i) => {
          const url = COMPANY_URLS.get(company)
          const external = Boolean(url)
          return (
            <a
              className="tick-item"
              key={`${company}-${i}`}
              href={url ?? "/companies"}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {company} <span className="tick-sep">·</span> {note}
            </a>
          )
        })}
      </div>
    </div>
  )
}