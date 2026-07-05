import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RiskGauge } from "@/components/risk/risk-gauge"
import { TierRiskList } from "@/components/risk/tier-risk-list"
import { RegionRiskGrid } from "@/components/risk/region-risk-grid"
import { KeyEvents } from "@/components/risk/key-events"
import { TrendChart } from "@/components/risk/trend-chart"
import { AutoRefresh } from "@/components/risk/auto-refresh"
import { getAssessmentHistory, getLatestAssessment, isStale } from "@/lib/risk/generate"

export const metadata: Metadata = {
  title: "Supply Chain Risk Monitor",
  description:
    "AI-powered daily risk assessment of the global semiconductor supply chain — per-tier and per-region risk scores, key events, and trend history, updated automatically every day.",
}

export const dynamic = "force-dynamic"

function SectionHead({ label }: { label: string }) {
  return (
    <div className="sec-head">
      <span className="sec-label">{label}</span>
      <span className="sec-rule" />
    </div>
  )
}

export default async function RiskPage() {
  const [latest, history] = await Promise.all([getLatestAssessment(), getAssessmentHistory(30)])
  const stale = isStale(latest)

  return (
    <>
      <SiteHeader />
      <main>
        {/* PAGE HEADER */}
        <section
          style={{
            padding: "64px 0 48px",
            background: "var(--bg-0)",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--yellow-faint) 1px,transparent 1px)," +
                "linear-gradient(90deg,var(--yellow-faint) 1px,transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ width: 22, height: 1, background: "var(--yellow)", display: "block" }} />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "9.5px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: "var(--yellow)",
                }}
              >
                AUTONOMOUS DAILY ANALYSIS
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--mono)",
                fontSize: "clamp(1.8rem,4vw,3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                marginBottom: 14,
              }}
            >
              Risk <span style={{ color: "var(--yellow)" }}>Monitor</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1rem",
                fontWeight: 300,
                color: "var(--text-1)",
                maxWidth: 620,
                lineHeight: 1.75,
              }}
            >
              An AI analyst reads the day&apos;s semiconductor, geopolitics, and materials news, then scores
              risk across all 7 supply chain tiers and every major manufacturing region. Runs automatically
              every day — no human in the loop.
            </p>
            {latest && (
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "var(--text-2)",
                  marginTop: 20,
                  letterSpacing: "0.06em",
                }}
              >
                LAST UPDATED{" "}
                {latest.createdAt
                  .toISOString()
                  .replace("T", " ")
                  .slice(0, 16)}{" "}
                UTC · {latest.sourcesAnalyzed} SOURCES ANALYZED
              </p>
            )}
          </div>
        </section>

        <AutoRefresh stale={stale} />

        {!latest ? (
          <section className="wrap" style={{ padding: "72px 28px" }}>
            <div className="risk-pending">
              <h2>First assessment in progress</h2>
              <p>
                The AI research pipeline is generating its first risk assessment. This takes about a
                minute — the page will refresh automatically when it lands. Assessments then update
                automatically every day at 06:00 UTC.
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* OVERVIEW: gauge + summary */}
            <section style={{ padding: "56px 0", background: "var(--bg-1)" }}>
              <div className="wrap">
                <SectionHead label="CURRENT ASSESSMENT" />
                <div className="risk-overview">
                  <RiskGauge score={latest.overallScore} level={latest.overallLevel} />
                  <div className="risk-summary">
                    <h2 className="risk-summary-title">Executive Summary</h2>
                    <p className="risk-summary-text">{latest.summary}</p>
                    <h2 className="risk-summary-title" style={{ marginTop: 22 }}>
                      30–90 Day Outlook
                    </h2>
                    <p className="risk-summary-text">{latest.outlook}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* TREND */}
            <section style={{ padding: "56px 0", background: "var(--bg-0)", borderTop: "1px solid var(--border)" }}>
              <div className="wrap">
                <SectionHead label="RISK TREND" />
                <div className="risk-card">
                  <TrendChart history={history} />
                </div>
              </div>
            </section>

            {/* TIER SCORES */}
            <section style={{ padding: "56px 0", background: "var(--bg-1)", borderTop: "1px solid var(--border)" }}>
              <div className="wrap">
                <SectionHead label="RISK BY SUPPLY CHAIN TIER" />
                <TierRiskList tierScores={latest.tierScores} />
              </div>
            </section>

            {/* REGIONS */}
            <section style={{ padding: "56px 0", background: "var(--bg-0)", borderTop: "1px solid var(--border)" }}>
              <div className="wrap">
                <SectionHead label="RISK BY REGION" />
                <RegionRiskGrid regionScores={latest.regionScores} />
              </div>
            </section>

            {/* KEY EVENTS */}
            <section style={{ padding: "56px 0 72px", background: "var(--bg-1)", borderTop: "1px solid var(--border)" }}>
              <div className="wrap">
                <SectionHead label="KEY EVENTS DRIVING RISK" />
                <KeyEvents events={latest.keyEvents} />
              </div>
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
