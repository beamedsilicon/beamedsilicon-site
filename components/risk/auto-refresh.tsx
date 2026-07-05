"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * Staleness fallback: if the server rendered with stale (or no) data, kick
 * off a background regeneration and reload the page data once it lands.
 * The API is a no-op when data is fresh, so this is safe to fire.
 */
export function AutoRefresh({ stale }: { stale: boolean }) {
  const router = useRouter()
  const fired = useRef(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!stale || fired.current) return
    fired.current = true
    setUpdating(true)
    fetch("/api/risk/refresh", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok) router.refresh()
      })
      .catch(() => {})
      .finally(() => setUpdating(false))
  }, [stale, router])

  if (!stale) return null
  return (
    <div className="risk-updating" role="status">
      <span className="risk-updating-dot" aria-hidden="true" />
      {updating ? "Running fresh AI research — this page will update automatically…" : "Assessment refresh attempted."}
    </div>
  )
}
