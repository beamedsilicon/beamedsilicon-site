import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TIERS } from "@/lib/tiers"
import { COMPANY_PRODUCTS } from "@/lib/products"

export const metadata: Metadata = {
  title: "Products",
  description:
    "What each company in the semiconductor supply chain actually makes — flagship product lines, by tier, with direct links to the official product page.",
}

const TIER_SHORT: Record<number, string> = {
  1: "Fabless", 2: "Foundries", 3: "Equipment",
  4: "Subsystems", 5: "Components", 6: "Materials", 7: "Mining",
}

export default function ProductsPage() {
  const totalProducts = COMPANY_PRODUCTS.reduce((sum, c) => sum + c.products.length, 0)
  const cataloguedCount = COMPANY_PRODUCTS.length
  let totalCompanies = 0
  for (const tier of TIERS) totalCompanies += tier.cos.length

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
            backgroundImage: "linear-gradient(rgba(255,215,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.025) 1px,transparent 1px)",
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
              What the Supply Chain{" "}
              <span style={{ color: "var(--yellow)" }}>Actually Makes</span>
            </h1>
            <p style={{
              fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 300,
              color: "var(--text-1)", maxWidth: 600, lineHeight: 1.75, marginBottom: 36,
            }}>
              Every company in our database does something specific — NXP designs automotive
              microcontrollers, Panasonic builds wire bonders, Sibelco mines the quartz. This is
              the flagship product line for each company we&apos;ve catalogued, linked straight to
              the official product page.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 44, flexWrap: "wrap" }}>
              {[
                { n: cataloguedCount, l: "COMPANIES CATALOGUED" },
                { n: totalProducts, l: "PRODUCT LINES LISTED" },
                { n: totalCompanies, l: "TOTAL COMPANIES TRACKED" },
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

        {/* COVERAGE NOTE */}
        <section style={{ padding: "20px 0", background: "var(--bg-1)", borderBottom: "1px solid var(--border)" }}>
          <div className="wrap">
            <p style={{
              fontFamily: "var(--mono)", fontSize: "10.5px",
              color: "var(--text-2)", lineHeight: 1.7,
            }}>
              Coverage in progress — {cataloguedCount} of {totalCompanies} companies catalogued so far.
              Companies without a product breakdown yet link straight to their official site below.
            </p>
          </div>
        </section>

        {/* TIER SECTIONS */}
        {TIERS.map((tier, idx) => {
          const cataloguedInTier = COMPANY_PRODUCTS.filter((c) => c.tier === tier.level)
          const cataloguedNames = new Set(cataloguedInTier.map((c) => c.company))
          const uncataloguedInTier = tier.cos.filter(([name]) => !cataloguedNames.has(name))

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
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 36 }}>
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
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 600,
                      padding: "3px 10px", borderRadius: 100,
                      background: tier.cbg, color: tier.color, border: `1px solid ${tier.cbr}`,
                    }}>
                      {cataloguedInTier.length} of {tier.cos.length} catalogued
                    </span>
                  </div>
                </div>

                {/* Catalogued companies — full product breakdown */}
                {cataloguedInTier.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: uncataloguedInTier.length ? 36 : 0 }}>
                    {cataloguedInTier.map((entry) => (
                      <div
                        key={entry.company}
                        style={{
                          background: "var(--bg-card)", border: "1px solid var(--border)",
                          borderRadius: "var(--rl)", padding: "22px 24px",
                        }}
                      >
                        <div style={{
                          fontFamily: "var(--mono)", fontSize: "13.5px", fontWeight: 600,
                          color: "var(--text-0)", marginBottom: 14,
                        }}>
                          {entry.company}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                          {entry.products.map((p) => (
                            <a
                              key={p.name}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="co-chip"
                              style={{
                                display: "flex", flexDirection: "column", alignItems: "flex-start",
                                gap: 4, padding: "12px 14px", height: "auto",
                                ["--tc" as string]: tier.color,
                                ["--tbg" as string]: tier.cbg,
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "11.5px", fontWeight: 600 }}>
                                  {p.name}
                                </span>
                                <span className="ext" style={{ marginLeft: "auto", opacity: 0.6 }}>↗</span>
                              </div>
                              <span style={{
                                fontFamily: "var(--sans)", fontSize: "10.5px",
                                color: "var(--text-2)", lineHeight: 1.4, fontWeight: 400,
                              }}>
                                {p.description}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Not-yet-catalogued companies — site link only */}
                {uncataloguedInTier.length > 0 && (
                  <div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600,
                      letterSpacing: "0.14em", color: "var(--text-2)", marginBottom: 12,
                    }}>
                      NOT YET CATALOGUED — VISIT SITE
                    </div>
                    <div className="co-grid">
                      {uncataloguedInTier.map(([name, , url]) => (
                        <a
                          key={name}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="co-chip"
                          style={{
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
                )}

              </div>
            </section>
          )
        })}

        {/* DISCLAIMER */}
        <section style={{ padding: "24px 0", background: "var(--bg-0)", borderTop: "1px solid var(--border)" }}>
          <div className="wrap">
            <p style={{
              fontFamily: "var(--mono)", fontSize: "10px",
              color: "var(--text-2)", lineHeight: 1.7, maxWidth: 720,
            }}>
              Product lines reflect each company&apos;s current flagship offerings and may change as
              products are discontinued or renamed. Links go to each company&apos;s official site.
              Most B2B suppliers in this database sell through direct sales contracts rather than
              e-commerce checkout — &quot;product page&quot; means where that conversation starts, not a cart.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}