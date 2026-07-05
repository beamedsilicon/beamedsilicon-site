import { NextResponse } from "next/server"
import { generateRiskAssessment, getLatestAssessment, isStale } from "@/lib/risk/generate"

export const maxDuration = 300

/**
 * Public staleness fallback: only regenerates when the latest assessment is
 * missing or older than the staleness window, so it cannot be abused to
 * hammer the AI pipeline — repeat calls while fresh are cheap no-ops.
 */
export async function POST() {
  try {
    const latest = await getLatestAssessment()
    if (!isStale(latest)) {
      return NextResponse.json({ ok: true, refreshed: false, id: latest!.id })
    }
    const assessment = await generateRiskAssessment()
    return NextResponse.json({ ok: true, refreshed: true, id: assessment.id })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
