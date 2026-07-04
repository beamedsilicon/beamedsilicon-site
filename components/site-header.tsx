"use client"

import { useState } from "react"
import Link from "next/link"

import { LanguageSelector } from "@/components/language-selector"

// Single source for the nav items so the desktop bar and the mobile
// drawer can't drift apart from each other.
const NAV_ITEMS = [
  { href: "/news", label: "News" },
  { href: "/supply-chain", label: "Supply Chain" },
  { href: "/products", label: "Products" },
  { href: "/companies", label: "Companies" },
  { href: "/markets", label: "Markets" },
  { href: "/analysis", label: "Analysis" },
  { href: "/policy", label: "Policy" },
]

export function SiteHeader() {
  // globals.css already defines .nav-hamburger / .ham-bar / .mobile-nav /
  // .mobile-nav-links / .mobile-nav-cta, and hides .nav-links at
  // max-width:600px — but nothing ever rendered a hamburger button or a
  // drawer, so below 600px the site had no navigation at all. This wires
  // up that existing CSS; it doesn't add any new classes or styles.
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header>
      <div className="wrap">
        <nav>
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="5.5" y="5.5" width="7" height="7" rx="1" stroke="#f5b731" strokeWidth="1.2" />
                <line x1="9" y1="0" x2="9" y2="4.5" stroke="#f5b731" strokeWidth="1" />
                <line x1="9" y1="13.5" x2="9" y2="18" stroke="#f5b731" strokeWidth="1" />
                <line x1="0" y1="9" x2="4.5" y2="9" stroke="#f5b731" strokeWidth="1" />
                <line x1="13.5" y1="9" x2="18" y2="9" stroke="#f5b731" strokeWidth="1" />
                <line x1="2" y1="2" x2="5" y2="5" stroke="#f5b731" strokeWidth="0.8" opacity="0.45" />
                <line x1="13" y1="5" x2="16" y2="2" stroke="#f5b731" strokeWidth="0.8" opacity="0.45" />
                <line x1="5" y1="13" x2="2" y2="16" stroke="#f5b731" strokeWidth="0.8" opacity="0.45" />
                <line x1="13" y1="13" x2="16" y2="16" stroke="#f5b731" strokeWidth="0.8" opacity="0.45" />
              </svg>
            </div>
            <Link href="/" className="logo-name" aria-label="Beamed Silicon — home">
              <span className="logo-beamed">beamed</span><span className="logo-silicon">silicon</span>
            </Link>
          </div>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <LanguageSelector />
          <Link href="/#newsletter" className="btn-sub">
            CONTACT ME
          </Link>
          <button
            type="button"
            className="nav-hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={`ham-bar${mobileOpen ? " open" : ""}`} />
            <span className={`ham-bar${mobileOpen ? " open" : ""}`} />
            <span className={`ham-bar${mobileOpen ? " open" : ""}`} />
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="mobile-nav" id="mobile-nav-drawer">
          <ul className="mobile-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#newsletter" className="btn-sub mobile-nav-cta" onClick={() => setMobileOpen(false)}>
            CONTACT ME
          </Link>
        </div>
      )}
    </header>
  )
}