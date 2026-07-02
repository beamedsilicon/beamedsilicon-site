"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { TIERS } from "@/lib/tiers"
import { REGIONS, regionOf } from "@/lib/regions"
import { CompanyChip } from "@/components/company-chip"

export function SupplyChainExplorer() {
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState("")
  const [region, setRegion] = useState<string | null>(null)
  const [manualOpen, setManualOpen] = useState<Record<number, boolean>>({ 1: true })

  // Pick up ?region=… and #tier-N on arrival — and on same-page hash changes,
  // since clicking a footer link while already on "/" doesn't remount this component.
  useEffect(() => {
    const applyFromLocation = () => {
      const params = new URLSearchParams(window.location.search)
      const r = params.get("region")
      if (r && REGIONS.some((reg) => reg.key === r)) setRegion(r)

      const hash = window.location.hash.replace("#", "")
      const m = hash.match(/^tier-(\d)$/)
      if (m) setManualOpen((prev) => ({ ...prev, [Number(m[1])]: true }))
    }
    applyFromLocation()
    window.addEventListener("hashchange", applyFromLocation)
    return () => window.removeEventListener("hashchange", applyFromLocation)
  }, [])

  const q = query.toLowerCase().trim()
  const filtering = Boolean(q || region)

  const matches = (name: string, cc: string) => {
    if (q && !name.toLowerCase().includes(q)) return false
    if (region && regionOf(cc) !== region) return false
    return true
  }

  const { totalMatches } = useMemo(() => {
    if (!filtering) return { totalMatches: 0 }
    let total = 0
    for (const tier of TIERS) {
      total += tier.cos.filter(([n, cc]) => matches(n, cc)).length
    }
    return { totalMatches: total }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, region, filtering])

  const toggleTier = (level: number) => {
    if (filtering) return
    setManualOpen((prev) => ({ ...prev, [level]: !prev[level] }))
  }

  const setRegionFilter = (key: string | null) => {
    setRegion(key)
    const params = new URLSearchParams(window.location.search)
    if (key) params.set("region", key)
    else params.delete("region")
    const qs = params.toString()
    router.replace(`${pathname}${qs ? `?${qs}` : ""}#sc-map`, { scroll: false })
  }

  let note = ""
  if (filtering) {
    note = totalMatches ? `${totalMatches} result${totalMatches !== 1 ? "s" : ""} found` : "No results"
  }

  return (
    <section className="sc-section" id="sc-map">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-label">SUPPLY CHAIN EXPLORER</span>
          <div className="sec-rule" />
          <a href="/companies" className="sec-more">
            FULL DATABASE →
          </a>
        </div>
        <div className="sc-intro">
          <div className="sc-intro-title">The Complete Semiconductor Supply Chain</div>
          <p className="sc-intro-sub">
            350 critical companies across 7 tiers. Click any company chip to visit their official website. Search by
            name or filter by region to instantly find any company across all tiers.
          </p>
        </div>

        <div className="sc-search">
          <input
            type="text"
            placeholder="Search 350 companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search companies"
          />
          <span className="sc-search-note">{note}</span>
        </div>

        <div className="region-filter" role="group" aria-label="Filter by region">
          <button
            type="button"
            className={`region-chip${!region ? " active" : ""}`}
            aria-pressed={!region}
            onClick={() => setRegionFilter(null)}
          >
            ALL REGIONS
          </button>
          {REGIONS.map((r) => (
            <button
              key={r.key}
              type="button"
              className={`region-chip${region === r.key ? " active" : ""}`}
              aria-pressed={region === r.key}
              onClick={() => setRegionFilter(region === r.key ? null : r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div id="tier-container">
          {TIERS.map((tier, idx) => {
            const tierMatches = filtering ? tier.cos.filter(([n, cc]) => matches(n, cc)).length : 0
            const isOpen = filtering ? tierMatches > 0 : Boolean(manualOpen[tier.level])

            return (
              <Fragment key={tier.level}>
                <div className={`tier-panel${isOpen ? " open" : ""}`} id={`tier-${tier.level}`}>
                  <div
                    className="tier-hd"
                    onClick={() => toggleTier(tier.level)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={filtering}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleTier(tier.level)
                      }
                    }}
                  >
                    <div
                      className="tier-badge"
                      style={{ background: tier.cbg, color: tier.color, border: `1px solid ${tier.cbr}` }}
                    >
                      L{tier.level}
                    </div>
                    <div className="tier-info">
                      <div className="tier-name" style={{ color: tier.color }}>
                        {tier.name}
                      </div>
                      <div className="tier-tag">{tier.tag}</div>
                    </div>
                    <div
                      className="tier-cnt"
                      style={{ background: tier.cbg, color: tier.color, border: `1px solid ${tier.cbr}` }}
                    >
                      {tier.cos.length} companies
                    </div>
                    <div className="tier-arrow">↓</div>
                  </div>
                  <div className="tier-bd">
                    <p className="tier-desc">{tier.desc}</p>
                    {filtering && tierMatches === 0 ? (
                      <p className="tier-no-match">No companies match in this tier</p>
                    ) : (
                      <div className="co-grid">
                        {tier.cos.map((company) => {
                          const hidden = filtering ? !matches(company[0], company[1]) : false
                          return (
                            <CompanyChip
                              key={company[0]}
                              company={company}
                              color={tier.color}
                              cbg={tier.cbg}
                              hidden={hidden}
                            />
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {idx < TIERS.length - 1 && (
                  <div className="tier-conn">
                    <span>↓ SUPPLIES INTO</span>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}