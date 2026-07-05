/**
 * components/hero.tsx
 *
 * Homepage hero: headline + live-computed stats + a world map with a pin
 * for every country hosting companies tracked in lib/tiers.ts, plus a tier
 * legend built from the same real dataset.
 *
 * The previous version rendered a decorative Three.js sphere scene, a fake
 * "node log" of invented news items, a fabricated "$4.2T market cap"
 * figure, and a hardcoded 7-tier list that disagreed with the actual
 * 8-tier dataset. All of that has been removed — every number and company
 * name below is derived from lib/tiers.ts at build time.
 */

import { TIERS } from "@/lib/tiers"
import { WorldMap } from "@/components/world-map"

export function Hero() {
  // Real figures, computed from the dataset — nothing hardcoded or invented
  const totalCompanies = TIERS.reduce((sum, t) => sum + t.cos.length, 0)
  const countryCount = new Set(TIERS.flatMap((t) => t.cos.map(([, cc]) => cc))).size
  const tierCount = TIERS.length

  const stats: [string, string][] = [
    [String(totalCompanies), "COMPANIES"],
    [String(tierCount), "TIERS"],
    [String(countryCount), "COUNTRIES"],
  ]

  return (
    <section style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-0)" }}>
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        .hero-rise { animation: hero-rise .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-rise { animation: none; } }

        .hero-cta {
          display: inline-block;
          padding: .7rem 1.6rem;
          font-family: var(--mono);
          font-size: .66rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          border-radius: 100px;
          transition: var(--t);
        }
        .hero-cta-primary {
          background: var(--yellow);
          color: var(--ink);
          border: 1px solid var(--yellow);
          font-weight: 700;
        }
        .hero-cta-primary:hover { box-shadow: 0 0 20px var(--glow); transform: translateY(-1px); }
        .hero-cta-ghost {
          background: transparent;
          color: var(--text-1);
          border: 1px solid var(--border-md);
        }
        .hero-cta-ghost:hover { color: var(--ink); background: var(--text-0); border-color: var(--text-0); }

        /* Hairline stat cells — flush blocks separated by 1px seams */
        .hero-stat-row {
          display: inline-grid;
          grid-auto-flow: column;
          gap: 1px;
          background: var(--border-md);
          border: 1px solid var(--border-md);
        }
        .hero-stat-cell {
          background: var(--bg-0);
          padding: 1.1rem 1.8rem 1rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem 3rem;
          align-items: end;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        .hero-tier-legend {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem 1.4rem;
        }
      `}</style>

      <div className="wrap" style={{ padding: "56px 28px 48px" }}>
        <div className="hero-grid">
          {/* ── Headline + stats ── */}
          <div>
            <div
              className="hero-rise"
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".62rem",
                letterSpacing: ".3em",
                color: "var(--yellow)",
                marginBottom: "1.4rem",
              }}
            >
              SEMICONDUCTOR SUPPLY CHAIN INTELLIGENCE
            </div>

            <h1
              className="hero-rise"
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-.03em",
                color: "var(--text-0)",
                animationDelay: ".08s",
                textTransform: "uppercase",
              }}
            >
              Every tier of the silicon universe<span style={{ color: "var(--yellow)" }}>.</span>
            </h1>

            <p
              className="hero-rise"
              style={{
                marginTop: "1.4rem",
                fontSize: ".92rem",
                lineHeight: 1.7,
                color: "var(--text-1)",
                maxWidth: 460,
                animationDelay: ".16s",
              }}
            >
              {totalCompanies} companies mapped across {tierCount} supply chain tiers and{" "}
              {countryCount} countries — from rare-earth mining to finished silicon.
            </p>

            <div
              className="hero-rise"
              style={{ marginTop: "1.8rem", display: "flex", gap: ".7rem", flexWrap: "wrap", animationDelay: ".24s" }}
            >
              <a href="/supply-chain" className="hero-cta hero-cta-primary">
                Explore Companies
              </a>
              <a href="/markets" className="hero-cta hero-cta-ghost">
                Markets
              </a>
              <a href="/products" className="hero-cta hero-cta-ghost">
                Products
              </a>
            </div>

            <div className="hero-rise hero-stat-row" style={{ marginTop: "2.4rem", animationDelay: ".32s" }}>
              {stats.map(([value, label]) => (
                <div key={label} className="hero-stat-cell">
                  <div
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                      fontWeight: 500,
                      letterSpacing: "-.02em",
                      color: "var(--text-0)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".56rem",
                      letterSpacing: ".22em",
                      color: "var(--text-1)",
                      marginTop: ".45rem",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── World map with company pins ── */}
          <div className="hero-rise" style={{ animationDelay: ".2s" }}>
            <WorldMap />
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".56rem",
                letterSpacing: ".18em",
                color: "var(--text-2)",
                textAlign: "center",
                marginTop: ".6rem",
              }}
            >
              HQ LOCATIONS OF ALL {totalCompanies} TRACKED COMPANIES · PIN SIZE = COMPANY COUNT
            </div>
          </div>
        </div>

        {/* ── Tier legend (real dataset) ── */}
        <div
          className="hero-rise hero-tier-legend"
          style={{
            marginTop: "3rem",
            paddingTop: "1.4rem",
            borderTop: "1px solid var(--border)",
            animationDelay: ".4s",
          }}
        >
          {TIERS.map((tier) => (
            <a
              key={tier.level}
              href="/supply-chain"
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".45rem",
                fontFamily: "var(--mono)",
                fontSize: ".6rem",
                letterSpacing: ".1em",
                color: "var(--text-1)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: tier.color,
                  flexShrink: 0,
                }}
              />
              T{tier.level} {tier.name.toUpperCase()}
              <span style={{ color: "var(--text-2)" }}>({tier.cos.length})</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
