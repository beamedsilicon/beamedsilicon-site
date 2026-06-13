import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TIERS } from "@/lib/tiers"
import type { Company } from "@/lib/tiers"

export const metadata: Metadata = {
  title: "Companies",
  description:
    "All semiconductor companies across 7 supply chain tiers, organised by country of headquarters.",
}

// ── Country reference data ───────────────────────────────────────────────────
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  TW: "Taiwan",
  KR: "South Korea",
  JP: "Japan",
  CN: "China",
  DE: "Germany",
  NL: "Netherlands",
  CH: "Switzerland",
  UK: "United Kingdom",
  AT: "Austria",
  BE: "Belgium",
  CA: "Canada",
  FR: "France",
  NO: "Norway",
  SE: "Sweden",
  IL: "Israel",
  IT: "Italy",
  SG: "Singapore",
  AU: "Australia",
  CL: "Chile",
  BR: "Brazil",
  RU: "Russia",
  SA: "Saudi Arabia",
  IN: "India",
}

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸", TW: "🇹🇼", KR: "🇰🇷", JP: "🇯🇵",
  CN: "🇨🇳", DE: "🇩🇪", NL: "🇳🇱", CH: "🇨🇭",
  UK: "🇬🇧", AT: "🇦🇹", BE: "🇧🇪", CA: "🇨🇦",
  FR: "🇫🇷", NO: "🇳🇴", SE: "🇸🇪", IL: "🇮🇱",
  IT: "🇮🇹", SG: "🇸🇬", AU: "🇦🇺", CL: "🇨🇱",
  BR: "🇧🇷", RU: "🇷🇺", SA: "🇸🇦", IN: "🇮🇳",
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function groupByCountry(companies: Company[]): [string, Company[]][] {
  const map = new Map<string, Company[]>()
  for (const co of companies) {
    const cc = co[1]
    if (!map.has(cc)) map.set(cc, [])
    map.get(cc)!.push(co)
  }
  // Sort: most companies first; ties broken alphabetically by country name
  return [...map.entries()].sort((a, b) =>
    b[1].length !== a[1].length
      ? b[1].length - a[1].length
      : (COUNTRY_NAMES[a[0]] ?? a[0]).localeCompare(COUNTRY_NAMES[b[0]] ?? b[0])
  )
}

const TIER_SHORT: Record<number, string> = {
  1: "Fabless",
  2: "Foundries",
  3: "Equipment",
  4: "Subsystems",
  5: "Components",
  6: "Materials",
  7: "Mining",
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CompaniesPage() {
  // Global stats
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

        {/* ── PAGE HEADER ───────────────────────────────────────────────── */}
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
              Companies by{" "}
              <span style={{ color: "var(--yellow)" }}>Country &amp; Tier</span>
            </h1>
            <p style={{
              fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300,
              color: "var(--text-1)", maxWidth: 560, lineHeight: 1.75, marginBottom: 36,
            }}>
              Every company in our database, organised by supply chain tier then by country
              of headquarters. Click any name to visit the company&apos;s website.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 44 }}>
              {[
                { n: totalCompanies, l: "COMPANIES" },
                { n: 7,             l: "TIERS"     },
                { n: countryCount,  l: "COUNTRIES" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: "1.9rem", fontWeight: 600,
                    color: "var(--yellow)", lineHeight: 1,
                  }}>{n}</div>
                  <div style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.06em", marginTop: 5 }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIER NAV ─────────────────────────────────────────────────── */}
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
                T{tier.level} · {TIER_SHORT[tier.level]}
              </a>
            ))}
          </div>
        </nav>

        {/* ── TIER SECTIONS ────────────────────────────────────────────── */}
        {TIERS.map((tier, idx) => {
          const grouped = groupByCountry(tier.cos)

          return (
            <section
              key={tier.level}
              id={`tier-${tier.level}`}
              style={{
                padding: "56px 0",
                background: idx % 2 === 0 ? "var(--bg-0)" : "var(--bg-1)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="wrap">

                {/* Tier header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 44 }}>
                  <div style={{
                    width: 54, height: 54, borderRadius: 10, flexShrink: 0,
                    background: tier.cbg, border: `1px solid ${tier.cbr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 600, color: tier.color,
                  }}>
                    T{tier.level}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontFamily: "var(--mono)", fontSize: "1.1rem", fontWeight: 600,
                      color: tier.color, marginBottom: 6, lineHeight: 1.2,
                    }}>
                      {tier.name}
                    </h2>
                    <p style={{
                      fontFamily: "var(--serif)", fontSize: "0.875rem", fontWeight: 300,
                      color: "var(--text-1)", lineHeight: 1.7, maxWidth: 700, marginBottom: 10,
                    }}>
                      {tier.desc}
                    </p>
                    <div style={{ display: "flex", gap: 20 }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 600,
                        padding: "3px 10px", borderRadius: 100,
                        background: tier.cbg, color: tier.color, border: `1px solid ${tier.cbr}`,
                      }}>
                        {tier.cos.length} companies
                      </span>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 600,
                        padding: "3px 10px", borderRadius: 100,
                        background: "var(--bg-card)", color: "var(--text-1)",
                        border: "1px solid var(--border)",
                      }}>
                        {grouped.length} countries
                      </span>
                    </div>
                  </div>
                </div>

                {/* Countries */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {grouped.map(([cc, companies]) => (
                    <div key={cc}>

                      {/* Country header */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginBottom: 14, paddingBottom: 10,
                        borderBottom: `1px solid ${tier.cbr}`,
                      }}>
                        <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>
                          {COUNTRY_FLAGS[cc] ?? "🌐"}
                        </span>
                        <span style={{
                          fontFamily: "var(--mono)", fontSize: "12.5px", fontWeight: 600,
                          color: tier.color,
                        }}>
                          {COUNTRY_NAMES[cc] ?? cc}
                        </span>
                        <span style={{
                          fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600,
                          padding: "2px 9px", borderRadius: 100,
                          background: tier.cbg, color: tier.color, border: `1px solid ${tier.cbr}`,
                          marginLeft: 2,
                        }}>
                          {companies.length}
                        </span>
                        <span style={{
                          fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text-2)",
                          marginLeft: 4, letterSpacing: "0.06em",
                        }}>
                          {cc}
                        </span>
                      </div>

                      {/* Company chips */}
                      <div className="co-grid">
                        {companies.map(([name, , url]) => (
                          <a
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="co-chip"
                            style={{
                              paddingLeft: 10,
                              ["--tc" as string]: tier.color,
                              ["--tbg" as string]: tier.cbg,
                            }}
                          >
                            {name}
                            <span className="ext">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* ── FOOTER NOTE ──────────────────────────────────────────────── */}
        <section style={{ padding: "28px 0", background: "var(--bg-0)", borderTop: "1px solid var(--border)" }}>
          <div className="wrap">
            <p style={{
              fontFamily: "var(--mono)", fontSize: "10px",
              color: "var(--text-2)", lineHeight: 1.7, maxWidth: 720,
            }}>
              Country of headquarters as of database last update. Some companies operate globally
              or are subsidiaries — country reflects legal registration. Private companies included
              alongside publicly traded entities.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}