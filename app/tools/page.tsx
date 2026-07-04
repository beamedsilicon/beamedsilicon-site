import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WaferBenchClient } from "@/components/wafer-bench-client"

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Wafer Bench — 17 free engineering calculators for the semiconductor supply chain: chip cost, packaging yield, HBM market sizing, EUV scanner throughput, datacenter TCO, and more.",
}

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Shorter than the other page headers on purpose — people landing
            on a tools page want the tools, not a paragraph of copy first. */}
        <section
          style={{
            padding: "40px 0 32px",
            background: "var(--bg-0)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="wrap">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ width: 22, height: 1, background: "var(--yellow)", display: "block" }} />
              <span
                style={{
                  fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600,
                  letterSpacing: "0.22em", color: "var(--yellow)",
                }}
              >
                WAFER BENCH
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--mono)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 10,
              }}
            >
              Supply Chain <span style={{ color: "var(--yellow)" }}>Engineering Tools</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 300,
                color: "var(--text-1)", maxWidth: 640, lineHeight: 1.7,
              }}
            >
              17 free calculators covering chip cost, packaging yield, market sizing,
              equipment throughput, and datacenter economics — built for engineers and
              analysts, not just readers.
            </p>
          </div>
        </section>

        <WaferBenchClient />
      </main>
      <SiteFooter />
    </>
  )
}
