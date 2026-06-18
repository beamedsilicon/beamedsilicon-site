import { NextRequest, NextResponse } from "next/server"
import YahooFinance from "yahoo-finance2"

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] })

const responseCache = new Map<string, { payload: unknown; exp: number }>()
const RESPONSE_TTL = 60_000

export async function GET(req: NextRequest) {
  const symbols = new URL(req.url).searchParams.get("symbols")
  if (!symbols) {
    return NextResponse.json({ error: "symbols param required" }, { status: 400 })
  }

  const symbolList = symbols.split(",").map(s => s.trim()).filter(Boolean)
  if (!symbolList.length) {
    return NextResponse.json({ error: "no symbols provided" }, { status: 400 })
  }

  const cacheKey = symbolList.slice().sort().join(",")

  const hit = responseCache.get(cacheKey)
  if (hit && hit.exp > Date.now()) {
    return NextResponse.json(hit.payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "HIT",
      },
    })
  }

  try {
    const raw = await yahooFinance.quote(symbolList)
    const quotes = Array.isArray(raw) ? raw : [raw]

    const payload = quotes
      .filter(q => q.regularMarketPrice != null)
      .map(q => ({
        symbol:     q.symbol,
        name:       q.shortName || q.longName || q.symbol,
        price:      q.regularMarketPrice!,
        change:     q.regularMarketChange        ?? 0,
        changePct:  q.regularMarketChangePercent ?? 0,
        marketCap:  q.marketCap                 ?? null,
        currency:   q.currency                  ?? "USD",
        dayHigh:    q.regularMarketDayHigh      ?? null,
        dayLow:     q.regularMarketDayLow       ?? null,
        week52High: q.fiftyTwoWeekHigh           ?? null,
        week52Low:  q.fiftyTwoWeekLow            ?? null,
        volume:     q.regularMarketVolume        ?? null,
      }))

    responseCache.set(cacheKey, { payload, exp: Date.now() + RESPONSE_TTL })

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Yahoo Finance request failed"
    const status = /429|too many/i.test(msg) ? 429 : 502
    return NextResponse.json(
      { error: msg },
      {
        status,
        headers: status === 429 ? { "Retry-After": "60" } : {},
      },
    )
  }
}
