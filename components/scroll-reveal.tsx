"use client"

/**
 * components/scroll-reveal.tsx
 *
 * Site-wide scroll-reveal motion system. Mounted once in the root layout.
 *
 * Instead of wrapping every section in a client component, this observes
 * existing elements by selector and reveals them as they scroll into view,
 * with a small stagger between siblings. Elements are only hidden AFTER
 * hydration (the `.rv` class is added from JS), so content is always
 * visible without JavaScript and to crawlers. Respects
 * prefers-reduced-motion by doing nothing at all.
 */

import { useEffect } from "react"

const SELECTORS = [
  ".sec-head",
  ".art-card",
  ".feat-card",
  ".nl-card",
  ".chip-list",
  ".tier-panel",
  ".sc-intro",
  ".sc-search",
  ".region-filter",
  ".ft-top",
].join(",")

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in")
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
    )

    const viewportCutoff = window.innerHeight * 0.92
    const els = document.querySelectorAll<HTMLElement>(SELECTORS)

    for (const el of els) {
      // Skip anything already on screen — hiding it post-hydration would flash.
      if (el.getBoundingClientRect().top < viewportCutoff) continue

      // Stagger siblings sharing a parent (e.g. cards in a grid).
      const parent = el.parentElement
      const idx = parent ? Array.prototype.indexOf.call(parent.children, el) : 0
      el.style.setProperty("--rv-d", `${Math.min(idx, 5) * 0.09}s`)
      el.classList.add("rv")
      io.observe(el)
    }

    return () => io.disconnect()
  }, [])

  return null
}
