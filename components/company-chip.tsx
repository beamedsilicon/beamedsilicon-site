"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Company } from "@/lib/tiers"

interface CompanyChipProps {
  company: Company
  color: string
  cbg: string
  hidden: boolean
}

// OPTIONAL / not a bug fix: the chip worked before this, just not
// efficiently at scale. With 700 companies (see components/ticker.tsx),
// /companies mounts every chip at once, and each one used to kick off up
// to two favicon fetches (Google, then DuckDuckGo) immediately on mount —
// up to ~1,400 requests on first paint, including for chips a search
// filter has already hidden. This defers fetching until a chip is
// actually within ~200px of the viewport.
export function CompanyChip({ company, color, cbg, hidden }: CompanyChipProps) {
  const [name, cc, url] = company
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const [inView, setInView] = useState(false)

  const sources = useMemo(() => {
    const domain = new URL(url).hostname.replace(/^www\./, "")
    // NOTE: we deliberately do NOT fetch `https://${domain}/favicon.ico`
    // directly. Some company sites (e.g. ones behind certain enterprise
    // WAFs/CDNs) require TLS client-certificate auth on their root domain,
    // which makes the browser pop up an OS-level "Select a certificate"
    // dialog the instant we try to load their favicon in the background —
    // intrusive and blocking, with no way to suppress it from JS. Sticking
    // to third-party favicon services means we only ever talk to Google
    // and DuckDuckGo, never the 700 individual company origins.
    return [
      `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ]
  }, [url])

  // null = still resolving, "" = all failed, any string = resolved URL
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null)

  useEffect(() => {
    const el = linkRef.current
    if (!el || inView) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true) // no IO support — fall back to the old eager behavior
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  useEffect(() => {
    if (!inView) return
    let cancelled = false

    const tryNext = (i: number) => {
      if (cancelled) return
      if (i >= sources.length) {
        setResolvedSrc("")
        return
      }
      const img = new Image()
      img.onload = () => {
        if (!cancelled) setResolvedSrc(sources[i]!)
      }
      img.onerror = () => {
        if (!cancelled) tryNext(i + 1)
      }
      img.src = sources[i]!
    }

    tryNext(0)
    return () => {
      cancelled = true
    }
  }, [inView, sources])

  const firstLetter = name.charAt(0).toUpperCase()
  const showFallback = resolvedSrc === ""
  const showLogo = resolvedSrc !== null && resolvedSrc !== ""

  return (
    <a
      ref={linkRef}
      className={`co-chip${hidden ? " hidden" : ""}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ["--tc" as string]: color, ["--tbg" as string]: cbg }}
    >
      {showLogo ? (
        <span className="co-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resolvedSrc} alt="" />
        </span>
      ) : showFallback ? (
        <span className="co-logo-fb" style={{ ["--tc" as string]: color, display: "flex" }}>
          {firstLetter}
        </span>
      ) : (
        // Still resolving (or not yet in view) — neutral placeholder, same size as the logo
        <span className="co-logo-wrap" style={{ background: "transparent", border: "none" }} />
      )}
      {name}
      <em className="co-cc">{cc}</em>
      <span className="ext">↗</span>
    </a>
  )
}