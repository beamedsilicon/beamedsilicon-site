import Link from "next/link"

const TOPICS = [
  { label: "EUV Lithography", href: "/analysis/euv-lithography-physics" },
  { label: "High-NA EUV", href: "/analysis/high-na-euv-055" },
  { label: "Immersion Lithography", href: "/analysis/immersion-lithography-moores-law" },
  { label: "TSMC Foundry Model", href: "/analysis/morris-chang-founding-tsmc" },
  { label: "Advanced Packaging", href: "/analysis/cowos-advanced-packaging-chiplets" },
  { label: "HBM & Memory", href: "/analysis/hbm-memory-wall" },
  { label: "Panel-Level Packaging", href: "/analysis/panel-level-packaging-reticle-limit" },
  { label: "Silicon Shield", href: "/analysis/silicon-shield-geopolitics" },
  { label: "Japanese DRAM", href: "/analysis/japan-dram-rise-fall" },
  { label: "RISC-V", href: "/analysis/risc-v-maturity-model" },
  { label: "Semiconductor History", href: "/analysis/semiconductor-evolution-history" },
  { label: "IC Manufacturing", href: "/analysis/ic-manufacturing-packaging-fundamentals" },
  { label: "Power Management", href: "/analysis/power-management-regulators-pmics" },
  { label: "Embedded Power", href: "/analysis/power-supply-design-embedded" },
  { label: "Backside Power", href: "/analysis/ai-power-delivery-backside-network" },
  { label: "Wafer-Scale AI", href: "/analysis/wafer-scale-ai-power-challenge" },
  { label: "Energy Band Gap", href: "/analysis/semiconductor-energy-band-gap-physics" },
  { label: "Digital Power", href: "/analysis/digital-power-supply-control" },
]

export function Topics() {
  return (
    <section className="topics">
      <div className="wrap">
        <div className="topics-l">EXPLORE BY TOPIC</div>
        <div className="chip-list">
          {TOPICS.map((topic) => (
            <Link className="chip" href={topic.href} key={topic.href}>
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}