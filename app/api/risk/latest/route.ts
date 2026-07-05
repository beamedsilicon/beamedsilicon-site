import { NextResponse } from "next/server"
import { getAssessmentHistory, getLatestAssessment } from "@/lib/risk/generate"

export async function GET() {
  try {
    const [latest, history] = await Promise.all([getLatestAssessment(), getAssessmentHistory(30)])
    return NextResponse.json({ latest, history })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
