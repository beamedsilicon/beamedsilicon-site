"use client"

/**
 * components/world-map.tsx
 *
 * Interactive world map with a pin for every country that hosts companies
 * tracked in lib/tiers.ts (the real dataset). Pin size scales with company
 * count.
 *
 * Interactivity:
 *  - Scroll / pinch to zoom (toward the cursor), drag to pan
 *  - Zoom in / out / reset buttons
 *  - Hovering a country with tracked companies highlights it and shows the
 *    tooltip; hovering a pin does the same
 *  - Clicking a pin (or highlighted country) jumps to the Supply Chain
 *    Explorer filtered by that region
 *
 * Rendered with d3-geo (Natural Earth projection) + topojson-client over
 * the world-atlas 110m dataset — no hand-drawn geography.
 */

import { useMemo, useRef, useState, useCallback, useEffect } from "react"
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

// world-atlas 110m property names → our country codes (for hover highlight)
const ATLAS_NAME_TO_CODE: Record<string, string> = {
  "United States of America": "US",
  Japan: "JP",
  China: "CN",
  Taiwan: "TW",
  Germany: "DE",
  "South Korea": "KR",
  "United Kingdom": "UK",
  Netherlands: "NL",
  Switzerland: "CH",
  France: "FR",
  Canada: "CA",
  Australia: "AU",
  Israel: "IL",
  Sweden: "SE",
  Malaysia: "MY",
  India: "IN",
  Singapore: "SG",
  Norway: "NO",
  Belgium: "BE",
  Austria: "AT",
  Italy: "IT",
  Chile: "CL",
  Russia: "RU",
  Finland: "FI",
  Turkey: "TR",
  "Saudi Arabia": "SA",
  Poland: "PL",
  Peru: "PE",
  Kazakhstan: "KZ",
  Indonesia: "ID",
  Denmark: "DK",
  Brazil: "BR",
}

const W = 960
const H = 470
const MIN_ZOOM = 1
const MAX_ZOOM = 8

interface CountryPin {
  code: string
  name: string
  count: number
  sample: string[]
  x: number
  y: number
  r: number
}

interface Transform {
  k: number
  tx: number
  ty: number
}

function clampTransform(t: Transform): Transform {
  const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, t.k))
  // Keep the map covering the viewport: 0 >= tx >= W - W*k
  const tx = Math.min(0, Math.max(W - W * k, t.tx))
  const ty = Math.min(0, Math.max(H - H * k, t.ty))
  return { k, tx, ty }
}

export function WorldMap() {
  const [active, setActive] = useState<CountryPin | null>(null)
  const [transform, setTransform] = useState<Transform>({ k: 1, tx: 0, ty: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number; moved: boolean } | null>(null)

  const { landPaths, pins, pinByCode } = useMemo(() => {
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
      .map((f, i) => ({
        d: path(f) ?? "",
        key: i,
        code: ATLAS_NAME_TO_CODE[f.properties?.name ?? ""] ?? null,
      }))

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
    const pinByCode = new Map(pins.map((p) => [p.code, p]))
    return { landPaths, pins, pinByCode }
  }, [])

  // ─── Zoom / pan helpers ──────────────────────────────────────────────────

  /** Convert a client (mouse) position to un-transformed SVG coordinates. */
  const toSvgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    return {
      x: ((clientX - rect.left) / rect.width) * W,
      y: ((clientY - rect.top) / rect.height) * H,
    }
  }, [])

  const zoomBy = useCallback(
    (factor: number, cx = W / 2, cy = H / 2) => {
      setTransform((t) => {
        const k = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, t.k * factor))
        const scale = k / t.k
        // Zoom toward (cx, cy) in viewport space
        return clampTransform({
          k,
          tx: cx - (cx - t.tx) * scale,
          ty: cy - (cy - t.ty) * scale,
        })
      })
    },
    [],
  )

  // Wheel zoom needs a non-passive listener to preventDefault page scroll
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      const cx = ((e.clientX - rect.left) / rect.width) * W
      const cy = ((e.clientY - rect.top) / rect.height) * H
      zoomBy(e.deltaY < 0 ? 1.25 : 0.8, cx, cy)
    }
    svg.addEventListener("wheel", onWheel, { passive: false })
    return () => svg.removeEventListener("wheel", onWheel)
  }, [zoomBy])

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return
    const svg = svgRef.current
    if (!svg) return
    svg.setPointerCapture(e.pointerId)
    setTransform((t) => {
      dragRef.current = { x: e.clientX, y: e.clientY, tx: t.tx, ty: t.ty, moved: false }
      return t
    })
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const drag = dragRef.current
      if (!drag) return
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const dx = ((e.clientX - drag.x) / rect.width) * W
      const dy = ((e.clientY - drag.y) / rect.height) * H
      if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 3) drag.moved = true
      setTransform((t) => clampTransform({ k: t.k, tx: drag.tx + dx, ty: drag.ty + dy }))
    },
    [],
  )

  const onPointerUp = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    svgRef.current?.releasePointerCapture(e.pointerId)
    // Suppress the click that follows a drag so pins don't navigate accidentally
    if (dragRef.current?.moved) {
      const suppress = (ev: Event) => {
        ev.preventDefault()
        ev.stopPropagation()
      }
      svgRef.current?.addEventListener("click", suppress, { capture: true, once: true })
    }
    dragRef.current = null
  }, [])

  const onDoubleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const { x, y } = toSvgPoint(e.clientX, e.clientY)
      zoomBy(1.7, x, y)
    },
    [toSvgPoint, zoomBy],
  )

  const reset = useCallback(() => setTransform({ k: 1, tx: 0, ty: 0 }), [])

  const { k, tx, ty } = transform
  // Keep pins & strokes visually constant while zooming
  const inv = 1 / k
  // Tooltip position in viewport space (percentages of the rendered box)
  const tipX = active ? ((active.x * k + tx) / W) * 100 : 0
  const tipY = active ? ((active.y * k + ty) / H) * 100 : 0

  const zoomBtnStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-card)",
    border: "1px solid var(--border-md)",
    borderRadius: "var(--r)",
    color: "var(--text-0)",
    fontFamily: "var(--mono)",
    fontSize: 15,
    lineHeight: 1,
    cursor: "pointer",
    transition: "var(--t)",
  }

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
        .map-land { transition: fill .15s ease; }
        .map-land[data-active="true"] { fill: var(--yellow-bg-strong, var(--yellow-bg)); cursor: pointer; }
        .map-zoom-btn:hover { border-color: var(--border-yellow); color: var(--yellow); }
        @media (prefers-reduced-motion: reduce) {
          .map-pin { animation: none; }
          .pin-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Interactive world map showing the headquarters countries of all tracked semiconductor supply chain companies. Scroll to zoom, drag to pan."
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          cursor: dragRef.current ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        <g transform={`translate(${tx} ${ty}) scale(${k})`}>
          {/* Land — countries with tracked companies highlight on hover */}
          <g>
            {landPaths.map(({ d, key, code }) => {
              const pin = code ? pinByCode.get(code) : undefined
              return (
                <path
                  key={key}
                  className="map-land"
                  data-active={active !== null && pin !== undefined && active.code === pin.code}
                  d={d}
                  fill="var(--yellow-bg)"
                  stroke="var(--border-md)"
                  strokeWidth={0.5 * inv}
                  onMouseEnter={pin ? () => setActive(pin) : undefined}
                  onMouseLeave={pin ? () => setActive(null) : undefined}
                />
              )
            })}
          </g>

          {/* Company pins — sized in screen space (divided by zoom) */}
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
                <circle
                  className="pin-ring"
                  cx={pin.x}
                  cy={pin.y}
                  r={pin.r * inv}
                  fill="none"
                  stroke="var(--yellow)"
                  strokeWidth={1 * inv}
                />
                <circle className="pin-core" cx={pin.x} cy={pin.y} r={pin.r * inv} fill="var(--yellow)" opacity={0.75} />
                <circle cx={pin.x} cy={pin.y} r={1.6 * inv} fill="var(--ink)" />
              </a>
            ))}
          </g>
        </g>
      </svg>

      {/* Zoom controls */}
      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: 4,
        }}
      >
        <button type="button" className="map-zoom-btn" style={zoomBtnStyle} onClick={() => zoomBy(1.5)} aria-label="Zoom in">
          +
        </button>
        <button type="button" className="map-zoom-btn" style={zoomBtnStyle} onClick={() => zoomBy(1 / 1.5)} aria-label="Zoom out">
          −
        </button>
        <button
          type="button"
          className="map-zoom-btn"
          style={{ ...zoomBtnStyle, fontSize: 11, opacity: k === 1 ? 0.4 : 1 }}
          onClick={reset}
          aria-label="Reset zoom"
          disabled={k === 1}
        >
          ⟲
        </button>
      </div>

      {/* Zoom hint */}
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          fontFamily: "var(--mono)",
          fontSize: ".54rem",
          letterSpacing: ".16em",
          color: "var(--text-2)",
          pointerEvents: "none",
        }}
      >
        SCROLL TO ZOOM · DRAG TO PAN
      </div>

      {/* Tooltip */}
      {active && tipX >= 0 && tipX <= 100 && tipY >= 0 && tipY <= 100 && (
        <div
          style={{
            position: "absolute",
            left: `${tipX}%`,
            top: `${tipY}%`,
            transform: `translate(${tipX > 72 ? "-105%" : "12px"}, -50%)`,
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
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".12em",
              color: "var(--yellow)",
              textTransform: "uppercase",
            }}
          >
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
