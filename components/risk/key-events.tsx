import type { KeyEvent } from "@/lib/db/schema"
import { TIERS } from "@/lib/tiers"

const IMPACT_CLASS = { high: "b-r", medium: "b-a", low: "b-c" } as const

export function KeyEvents({ events }: { events: KeyEvent[] }) {
  return (
    <div className="risk-events">
      {events.map((e, i) => (
        <article key={i} className="risk-event">
          <div className="risk-event-meta">
            <span className={`badge ${IMPACT_CLASS[e.impact]}`}>{e.impact.toUpperCase()} IMPACT</span>
            <span className="risk-event-cat">{e.category}</span>
          </div>
          <h3 className="risk-event-title">
            {e.sourceUrl ? (
              <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">
                {e.title}
              </a>
            ) : (
              e.title
            )}
          </h3>
          <p className="risk-event-summary">{e.summary}</p>
          <div className="risk-event-foot">
            <span className="risk-event-source">Source: {e.source}</span>
            <span className="risk-event-tiers">
              {e.affectedTiers.map((t) => {
                const tier = TIERS.find((x) => x.level === t)
                return (
                  <span key={t} style={{ color: tier?.color }} title={tier?.name}>
                    T{t}
                  </span>
                )
              })}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}
