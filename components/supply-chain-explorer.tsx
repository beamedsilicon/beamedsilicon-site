"use client"

import { Fragment, useCallback, useMemo, useState } from "react"
import { TIERS } from "@/lib/tiers"
import { CompanyChip } from "@/components/company-chip"

export function SupplyChainExplorer() {
  const [query, setQuery] = useState("")
  const [manualOpen, setManualOpen] = useState<Record<number, boolean>>({})

  const q = query.toLowerCase().trim()

  const { totalMatches } = useMemo(() => {
    if (!q) return { totalMatches: 0 }
    let total = 0
    for (const tier of TIERS) {
      total += tier.cos.filter(([n]) => n.toLowerCase().includes(q)).length
    }
    return { totalMatches: total }
  }, [q])

  // FIX: Wrap in useCallback so stable reference across renders
  const toggleTier = useCallback((level: number) => {
    // FIX: When searching, toggling is disabled. Previously this was silent —
    // now we simply guard here (cursor: default on the element signals this to users).
    if (q) return
    setManualOpen((prev) => ({ ...prev, [level]: !prev[level] }))
  }, [q])

  let note = ""
  if (q) {
    note = totalMatches ? `${totalMatches} result${totalMatches !== 1 ? "s" : ""} found` : "No results"
  }

  return (
    <section className="sc-section" id="sc-map">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-label">SUPPLY CHAIN EXPLORER</span>
          <div className="sec-rule" />
          <a href="#" className="sec-more">
            FULL DATABASE →
          </a>
        </div>
        <div className="sc-intro">
          <div className="sc-intro-title">The Complete Semiconductor Supply Chain</div>
          <p className="sc-intro-sub">
            350 critical companies across 7 tiers. Click any company chip to visit their official website. Search by
            name to instantly find any company across all tiers.
          </p>
        </div>
        <div className="sc-search">
          <input
            type="search"
            placeholder="Search 350 companies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search companies"
            // FIX: type="search" gives native clear button on mobile
          />
          {/* FIX: role="status" + aria-live so screen readers announce result counts */}
          <span className="sc-search-note" role="status" aria-live="polite">
            {note}
          </span>
        </div>

        <div id="tier-container">
          {TIERS.map((tier, idx) => {
            const tierMatches = q ? tier.cos.filter(([n]) => n.toLowerCase().includes(q)).length : 0
            const isOpen = q ? tierMatches > 0 : Boolean(manualOpen[tier.level])

            return (
              <Fragment key={tier.level}>
                <div className={`tier-panel${isOpen ? " open" : ""}`} id={`tier-${tier.level}`}>
                  <div
                    className="tier-hd"
                    onClick={() => toggleTier(tier.level)}
                    // FIX: Added aria-expanded for screen readers to announce open/closed state.
                    // Also aria-controls links the header to the body panel.
                    // When searching, aria-disabled signals the button is inactive.
                    role="button"
                    tabIndex={q ? -1 : 0}
                    aria-expanded={isOpen}
                    aria-controls={`tier-body-${tier.level}`}
                    aria-disabled={q ? "true" : undefined}
                    style={q ? { cursor: "default" } : undefined}
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
                      aria-hidden="true"
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
                      aria-label={`${tier.cos.length} companies`}
                    >
                      {tier.cos.length} companies
                    </div>
                    <div className="tier-arrow" aria-hidden="true">↓</div>
                  </div>
                  {/* FIX: Added id to match aria-controls on the header */}
                  <div className="tier-bd" id={`tier-body-${tier.level}`} role="region" aria-label={tier.name}>
                    <p className="tier-desc">{tier.desc}</p>
                    <div className="co-grid">
                      {tier.cos.map((company) => {
                        const hidden = q ? !company[0].toLowerCase().includes(q) : false
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
                  </div>
                </div>

                {idx < TIERS.length - 1 && (
                  <div className="tier-conn" aria-hidden="true">
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