"use client"

/**
 * components/world-map.tsx
 *
 * World map with a pin for every country that hosts companies tracked in
 * lib/tiers.ts (the real dataset — 700 companies across 8 tiers). Pin size
 * scales with company count. Pins pulse gently and stagger in on load.
 * Hovering (or focusing) a pin shows the country, its company count, and a
 * sample of company names. Clicking a pin jumps to the Supply Chain
 * Explorer filtered by that country's region.
 *
 * Rendered with d3-geo (Natural Earth projection) + topojson-client over
 * the world-atlas 110m dataset — no hand-drawn geography.
 */

import { useMemo, useState } from "react"
import { geoNaturalEarth1, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import type { FeatureCollection, Geometry } from "geojson"
import worldData from "world-atlas/countries-110m.json"
import { TIERS } from "@/lib/tiers"
import { regionOf } from "@/lib/regions"

// ─── Country centroids (lng, lat) + display names ─────────────────────────
const COUNTRY_INFO: Record<string, { name: string; coords: [number, number] }> = {
  US: { name: "United States", coords: [-98.5, 39.5] },
  JP: { name: "Japan", coords: [138.2, 36.2] },
  CN: { name: "China", coords: [104.2, 35.8] },
  TW: { name: "Taiwan", coords: [121.0, 23.7] },
  DE: { name: "Germany", coords: [10.4, 51.1] },
  KR: { name: "South Korea", coords: [127.8, 36.5] },
  UK: { name: "United Kingdom", coords: [-1.5, 52.6] },
  NL: { name: "Netherlands", coords: [5.3, 52.2] },
  CH: { name: "Switzerland", coords: [8.2, 46.8] },
  FR: { name: "France", coords: [2.2, 46.6] },
  CA: { name: "Canada", coords: [-101.0, 56.1] },
  AU: { name: "Australia", coords: [134.5, -25.7] },
  IL: { name: "Israel", coords: [34.9, 31.4] },
  SE: { name: "Sweden", coords: [16.7, 62.8] },
  MY: { name: "Malaysia", coords: [102.2, 4.2] },
  IN: { name: "India", coords: [78.9, 21.8] },
  SG: { name: "Singapore", coords: [103.8, 1.35] },
  NO: { name: "Norway", coords: [8.5, 61.0] },
  BE: { name: "Belgium", coords: [4.6, 50.6] },
  AT: { name: "Austria", coords: [14.6, 47.6] },
  IT: { name: "Italy", coords: [12.6, 42.8] },
  CL: { name: "Chile", coords: [-71.4, -33.5] },
  RU: { name: "Russia", coords: [90.0, 60.0] },
  FI: { name: "Finland", coords: [26.0, 62.9] },
  TR: { name: "Turkey", coords: [35.2, 39.1] },
  SA: { name: "Saudi Arabia", coords: [45.1, 24.1] },
  PL: { name: "Poland", coords: [19.4, 52.1] },
  PE: { name: "Peru", coords: [-75.0, -9.9] },
  KZ: { name: "Kazakhstan", coords: [68.0, 48.2] },
  ID: { name: "Indonesia", coords: [113.9, -0.8] },
  DK: { name: "Denmark", coords: [10.0, 56.0] },
  BR: { name: "Brazil", coords: [-51.9, -10.8] },
}

const W = 960
const H = 470

interface CountryPin {
  code: string
  name: string
  count: number
  sample: string[]
  x: number
  y: number
  r: number
}

export function WorldMap() {
  const [active, setActive] = useState<CountryPin | null>(null)

  const { landPaths, pins } = useMemo(() => {
    const projection = geoNaturalEarth1()
      .scale(W / 5.4)
      .translate([W / 2, H / 2 + 18])
    const path = geoPath(projection)

    const topo = worldData as unknown as {
      type: "Topology"
      objects: { countries: object }
      arcs: unknown[]
    }
    const countries = feature(
      topo as never,
      topo.objects.countries as never,
    ) as unknown as FeatureCollection<Geometry, { name?: string }>

    const landPaths = countries.features
      .filter((f) => f.properties?.name !== "Antarctica")
      .map((f, i) => ({ d: path(f) ?? "", key: i }))

    // Aggregate the real company list per country
    const byCountry = new Map<string, string[]>()
    for (const tier of TIERS) {
      for (const [name, cc] of tier.cos) {
        const list = byCountry.get(cc) ?? []
        list.push(name)
        byCountry.set(cc, list)
      }
    }

    const max = Math.max(...Array.from(byCountry.values(), (v) => v.length))
    const pins: CountryPin[] = []
    for (const [code, companies] of byCountry) {
      const info = COUNTRY_INFO[code]
      if (!info) continue
      const pt = projection(info.coords)
      if (!pt) continue
      pins.push({
        code,
        name: info.name,
        count: companies.length,
        sample: companies.slice(0, 4),
        x: pt[0],
        y: pt[1],
        r: 3 + Math.sqrt(companies.length / max) * 11,
      })
    }
    // Draw small pins last so they stay hoverable above big ones
    pins.sort((a, b) => b.count - a.count)
    return { landPaths, pins }
  }, [])

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <style>{`
        @keyframes pin-pop {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pin-pulse {
          0%   { transform: scale(1);   opacity: .45; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .map-pin { animation: pin-pop .5s cubic-bezier(.34,1.56,.64,1) both; cursor: pointer; }
        .map-pin circle { transition: opacity .18s ease; }
        .map-pin:hover .pin-core, .map-pin:focus-visible .pin-core { opacity: 1; }
        .pin-ring {
          animation: pin-pulse 3.2s ease-out infinite;
          transform-origin: center;
          transform-box: fill-box;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .map-pin { animation: none; }
          .pin-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="World map showing the headquarters countries of all tracked semiconductor supply chain companies"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        {/* Land */}
        <g>
          {landPaths.map(({ d, key }) => (
            <path
              key={key}
              d={d}
              fill="var(--yellow-bg)"
              stroke="var(--border-md)"
              strokeWidth={0.5}
            />
          ))}
        </g>

        {/* Company pins */}
        <g>
          {pins.map((pin, i) => (
            <a
              key={pin.code}
              href={`/supply-chain?region=${regionOf(pin.code)}`}
              className="map-pin"
              style={{ animationDelay: `${0.3 + i * 0.05}s`, transformOrigin: `${pin.x}px ${pin.y}px` }}
              onMouseEnter={() => setActive(pin)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(pin)}
              onBlur={() => setActive(null)}
              aria-label={`${pin.name}: ${pin.count} ${pin.count === 1 ? "company" : "companies"}`}
            >
              <circle className="pin-ring" cx={pin.x} cy={pin.y} r={pin.r} fill="none" stroke="var(--yellow)" strokeWidth={1} />
              <circle className="pin-core" cx={pin.x} cy={pin.y} r={pin.r} fill="var(--yellow)" opacity={0.75} />
              <circle cx={pin.x} cy={pin.y} r={1.6} fill="var(--ink)" />
            </a>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {active && (
        <div
          style={{
            position: "absolute",
            left: `${(active.x / W) * 100}%`,
            top: `${(active.y / H) * 100}%`,
            transform: `translate(${active.x > W * 0.72 ? "-105%" : "12px"}, -50%)`,
            background: "var(--bg-card)",
            border: "1px solid var(--border-yellow)",
            borderRadius: "var(--r)",
            padding: "10px 14px",
            pointerEvents: "none",
            zIndex: 5,
            minWidth: 170,
            maxWidth: 240,
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", color: "var(--yellow)", textTransform: "uppercase" }}>
            {active.name}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-0)", lineHeight: 1.3 }}>
            {active.count} {active.count === 1 ? "company" : "companies"}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--text-1)", lineHeight: 1.5, marginTop: 2 }}>
            {active.sample.join(" · ")}
            {active.count > active.sample.length && ` +${active.count - active.sample.length} more`}
          </div>
        </div>
      )}
    </div>
  )
}
