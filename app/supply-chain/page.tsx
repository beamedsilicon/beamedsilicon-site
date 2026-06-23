import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SupplyChainExplorer } from "@/components/supply-chain-explorer"
import { TIERS } from "@/lib/tiers"

export const metadata: Metadata = {
  title: "Supply Chain Explorer",
  description:
    "The complete 7-tier semiconductor supply chain — 350+ companies from quartz mines to AI accelerators. Search, filter, and navigate every critical company in the global chip ecosystem.",
}

export default function SupplyChainPage() {
  const allCodes = new Set<string>()
  let totalCompanies = 0
  for (const tier of TIERS) {
    for (const [, cc] of tier.cos) allCodes.add(cc)
    totalCompanies += tier.cos.length
  }
  const countryCount = allCodes.size

  return (
    <>
      <SiteHeader />
      <main>

        {/* PAGE HEADER */}
        <section style={{
          padding: "64px 0 48px", background: "var(--bg-0)",
          borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,215,0,0.025) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,215,0,0.025) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }} />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ width: 22, height: 1, background: "var(--yellow)", display: "block" }} />
              <span style={{
                fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600,
                letterSpacing: "0.22em", color: "var(--yellow)",
              }}>
                SEMICONDUCTOR INTELLIGENCE
              </span>
            </div>
            <h1 style={{
              fontFamily: "var(--mono)", fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 14,
            }}>
              Supply Chain{" "}
              <span style={{ color: "var(--yellow)" }}>Explorer</span>
            </h1>
            <p style={{
              fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300,
              color: "var(--text-1)", maxWidth: 560, lineHeight: 1.75, marginBottom: 36,
            }}>
              Every critical company across all 7 tiers — from the quartz mines of North
              Carolina to the AI accelerators in your data center. Click any company to visit
              their site, or search to locate any name instantly.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              {[
                { n: totalCompanies, l: "COMPANIES" },
                { n: 7,             l: "SUPPLY CHAIN TIERS" },
                { n: countryCount,  l: "COUNTRIES" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: "1.9rem", fontWeight: 600,
                    color: "var(--yellow)", lineHeight: 1,
                  }}>
                    {n}
                  </div>
                  <div style={{
                    fontSize: 11, color: "var(--text-2)",
                    letterSpacing: "0.06em", marginTop: 5,
                  }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIER NAV — jump links matching the tier panel IDs inside the explorer */}
        <nav
          aria-label="Jump to tier"
          style={{
            background: "var(--bg-1)", borderBottom: "1px solid var(--border)",
            overflowX: "auto", WebkitOverflowScrolling: "touch",
          }}
        >
          <div style={{ display: "flex", gap: 0, padding: "0 28px", minWidth: "max-content" }}>
            {TIERS.map(tier => (
              <a
                key={tier.level}
                href={`#tier-${tier.level}`}
                style={{
                  display: "block", padding: "14px 18px", textDecoration: "none",
                  fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600,
                  letterSpacing: "0.06em", whiteSpace: "nowrap",
                  color: tier.color, background: tier.cbg,
                  borderBottom: `2px solid ${tier.color}`,
                  borderRight: "1px solid var(--border)",
                  transition: "opacity .15s",
                }}
              >
                T{tier.level} · {tier.name.split(" ")[0]}
              </a>
            ))}
          </div>
        </nav>

        {/* EXPLORER */}
        <SupplyChainExplorer />

      </main>
      <SiteFooter />
    </>
  )
}