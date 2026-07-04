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
          padding: .7rem 1.5rem;
          font-family: var(--mono);
          font-size: .68rem;
          letter-spacing: .16em;
          border-radius: var(--r);
          transition: var(--t);
        }
        .hero-cta-primary {
          background: var(--yellow);
          color: var(--ink);
          border: 1px solid var(--yellow);
          font-weight: 700;
        }
        .hero-cta-primary:hover { filter: brightness(1.12); }
        .hero-cta-ghost {
          background: transparent;
          color: var(--text-1);
          border: 1px solid var(--border-md);
        }
        .hero-cta-ghost:hover { color: var(--text-0); border-color: var(--border-yellow); }

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
                fontFamily: "var(--mono)",
                fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-.02em",
                color: "var(--text-0)",
                animationDelay: ".08s",
              }}
            >
              EVERY TIER OF THE SILICON UNIVERSE
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

            <div
              className="hero-rise"
              style={{ marginTop: "2.4rem", display: "flex", gap: "2.5rem", flexWrap: "wrap", animationDelay: ".32s" }}
            >
              {stats.map(([value, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                      fontWeight: 700,
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
                      marginTop: ".4rem",
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
