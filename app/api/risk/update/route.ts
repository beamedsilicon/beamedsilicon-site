import { NextRequest, NextResponse } from "next/server"
import { generateRiskAssessment } from "@/lib/risk/generate"

export const maxDuration = 300

/**
 * Triggered daily by Vercel Cron (see vercel.json). Vercel sends
 * "Authorization: Bearer <CRON_SECRET>" automatically when CRON_SECRET is set.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const assessment = await generateRiskAssessment()
    return NextResponse.json({
      ok: true,
      id: assessment.id,
      overallScore: assessment.overallScore,
      createdAt: assessment.createdAt,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
