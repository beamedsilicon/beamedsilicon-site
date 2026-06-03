/**
 * GET /api/finance/quote?symbols=NVDA,ASML,TSM
 *
 * Returns real-time quote data for one or more ticker symbols.
 * Uses yahooFinance.quote() which accepts an array natively — a single
 * network call instead of N parallel quoteSummary calls, which avoids
 * Yahoo rate-limiting on large tier batches.
 *
 * Cached for 60 s to avoid rate-limiting on busy pages.
 *
 * Response shape:
 *   { quotes: QuoteResult[] }
 *   or on error:
 *   { error: string, code: number }
 */

import { NextRequest, NextResponse } from "next/server"
import yahooFinance, { fromCache, setCache, toApiError } from "@/lib/yahoo-finance"

const TTL_MS = 60_000

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const raw = searchParams.get("symbols") ?? ""

  if (!raw.trim()) {
    return NextResponse.json(
      { error: "Missing required query param: symbols", code: 400 },
      { status: 400 }
    )
  }

  // Dedupe, uppercase, no mutation of original array
  const symbols = [...new Set(
    raw.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean)
  )]

  if (symbols.length > 50) {
    return NextResponse.json(
      { error: "Maximum 50 symbols per request", code: 400 },
      { status: 400 }
    )
  }

  // Sort a copy for a stable cache key — never mutate the symbols array
  const cacheKey = `quote:${[...symbols].sort().join(",")}`
  const cached = fromCache<object[]>(cacheKey)
  if (cached) {
    return NextResponse.json({ quotes: cached, cached: true })
  }

  try {
    // FIX: yahooFinance.quote() accepts an array and makes ONE network request,
    // not N. This is far cheaper than N parallel quoteSummary() calls and
    // avoids Yahoo's per-IP rate limit on large batches.
    const raw = await yahooFinance.quote(symbols, {
      fields: [
        "symbol", "shortName", "longName", "currency",
        "regularMarketPrice", "regularMarketChange", "regularMarketChangePercent",
        "regularMarketVolume", "regularMarketOpen", "regularMarketDayHigh",
        "regularMarketDayLow", "marketCap", "fiftyTwoWeekHigh", "fiftyTwoWeekLow",
        "marketState", "fullExchangeName",
      ],
    })

    const results = (Array.isArray(raw) ? raw : [raw]).map((q) => ({
      symbol: q.symbol,
      shortName: q.shortName ?? q.longName ?? q.symbol,
      currency: q.currency ?? "USD",
      regularMarketPrice: q.regularMarketPrice ?? null,
      regularMarketChange: q.regularMarketChange ?? null,
      regularMarketChangePercent: q.regularMarketChangePercent ?? null,
      regularMarketVolume: q.regularMarketVolume ?? null,
      regularMarketOpen: q.regularMarketOpen ?? null,
      regularMarketDayHigh: q.regularMarketDayHigh ?? null,
      regularMarketDayLow: q.regularMarketDayLow ?? null,
      marketCap: q.marketCap ?? null,
      fiftyTwoWeekHigh: q.fiftyTwoWeekHigh ?? null,
      fiftyTwoWeekLow: q.fiftyTwoWeekLow ?? null,
      marketState: q.marketState ?? null,
      exchangeName: q.fullExchangeName ?? null,
    }))

    setCache(cacheKey, results, TTL_MS)
    return NextResponse.json({ quotes: results, cached: false })
  } catch (err) {
    const apiError = toApiError(err)
    return NextResponse.json(apiError, { status: apiError.code })
  }
}