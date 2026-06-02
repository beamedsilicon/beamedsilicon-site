"use client"

import { useMemo, useState } from "react"
import type { Company } from "@/lib/tiers"

interface CompanyChipProps {
  company: Company
  color: string
  cbg: string
  hidden: boolean
}

export function CompanyChip({ company, color, cbg, hidden }: CompanyChipProps) {
  const [name, cc, url] = company

  const sources = useMemo(() => {
    const domain = new URL(url).hostname.replace(/^www\./, "")
    return [
      `https://${domain}/favicon.ico`,
      `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ]
  }, [url])

  const [srcIndex, setSrcIndex] = useState(0)
  const failed = srcIndex >= sources.length
  const firstLetter = name.charAt(0).toUpperCase()

  return (
    <a
      className={`co-chip${hidden ? " hidden" : ""}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ["--tc" as string]: color, ["--tbg" as string]: cbg }}
    >
      {!failed ? (
        <span className="co-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sources[srcIndex] || "/placeholder.svg"}
            alt=""
            loading="lazy"
            width={18}
            height={18}
            onError={() => setSrcIndex((i) => i + 1)}
          />
        </span>
      ) : (
        // FIX: was always rendered with display:flex inline style even when not failed.
        // Now only rendered when failed === true, so CSS display:none on .co-logo-fb is irrelevant
        // (we simply don't render it). This removes the conflicting inline style entirely.
        <span
          className="co-logo-fb"
          style={{ ["--tc" as string]: color }}
          aria-hidden="true"
        >
          {firstLetter}
        </span>
      )}
      <span className="co-name">{name}</span>
      <em className="co-cc">{cc}</em>
      <span className="ext" aria-hidden="true">↗</span>
    </a>
  )
}