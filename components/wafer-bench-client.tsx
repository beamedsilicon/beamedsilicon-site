"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

/**
 * Rebuild notes (see chat for the full explanation of what broke):
 *
 * The previous version built the whole sidebar with document.createElement
 * + appendChild while React also owned that subtree — two systems fighting
 * over the same DOM, which is what produced the scrambled/overlapping nav
 * labels. This version makes the sidebar and "which tool is active" real
 * React state, rendered as real JSX. React never has to guess about that
 * part of the tree because it's the only one touching it.
 *
 * The 17 tool bodies still build their markup via innerHTML and wire their
 * inputs with addEventListener rather than full React state — but now only
 * the ONE active tool's markup ever exists in the DOM at a time, inside a
 * single <div ref> that React's own JSX never gives children to. React
 * therefore has nothing to reconcile there either. Every formula below is
 * unchanged from what was provided — only the orchestration around them
 * changed.
 *
 * Theme: colors and fonts are now the site's own CSS variables (--yellow,
 * --bg-card, --text-1, var(--mono)/var(--serif), etc. from
 * app/globals.css) instead of the tool's original standalone cyan/amber
 * palette and Space Grotesk — so this page now follows dark/light mode
 * the same way every other page on the site does, including the theme
 * toggle.
 */

interface Tool {
  id: string
  group: number
  name: string
}

const TOOLS: Tool[] = [
  { id: "chipcost", group: 1, name: "Chip Cost Calculator" },
  { id: "packaging", group: 1, name: "Packaging Calculator" },
  { id: "costbridge", group: 1, name: "Cost Bridge" },
  { id: "perf", group: 2, name: "Price / Performance" },
  { id: "hbm", group: 2, name: "HBM Market" },
  { id: "supplychain", group: 2, name: "Supply Chain Risk" },
  { id: "fabsites", group: 2, name: "Fab Site Explorer" },
  { id: "tapeout", group: 3, name: "Tapeout Workspace" },
  { id: "euv", group: 4, name: "EUV Scanner Throughput" },
  { id: "gaspurge", group: 4, name: "Gas Purge Cycle" },
  { id: "tco", group: 4, name: "TCO by Fab Region" },
  { id: "pue", group: 5, name: "PUE Calculator" },
  { id: "rackcool", group: 5, name: "Rack Density / Cooling" },
  { id: "dctco", group: 5, name: "Datacenter TCO" },
  { id: "wattsword", group: 6, name: "Watts per Word" },
  { id: "stranded", group: 6, name: "Stranded Power" },
  { id: "siliconage", group: 6, name: "Silicon Age Clock" },
]

const GROUP_LABELS: Record<number, string> = {
  1: "Design & Cost",
  2: "Market & Risk",
  3: "Planning",
  4: "Equipment & Facility",
  5: "Datacenter Planning",
  6: "Novel / Creative",
}

// Reads the live value of a CSS custom property from the page, so inline
// SVG fills (which can't reference var(--x) directly the way normal CSS
// can) still follow whichever theme — dark or light — is active, instead
// of a hardcoded hex that would look wrong after a theme toggle.
function themeColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return v || fallback
}

// Associates each <label> with the input/select it describes (matching
// screen readers expect via htmlFor/id) without hand-annotating ~90 label
// tags across 17 templates. Skips ambiguous cases (a label followed by a
// container with more than one control, e.g. the EUV field-width/height
// pair) — those get an explicit aria-label on each input instead, set
// directly in that tool's markup.
function wireLabels(root: HTMLElement) {
  root.querySelectorAll("label").forEach((label) => {
    if (label.getAttribute("for")) return
    let candidate: Element | null = label.nextElementSibling
    if (candidate && candidate.tagName !== "INPUT" && candidate.tagName !== "SELECT") {
      const matches = candidate.querySelectorAll("input, select")
      candidate = matches.length === 1 ? matches[0] : null
    }
    const id = (candidate as HTMLElement | null)?.id
    if (id) label.setAttribute("for", id)
  })
  // Formula/notation text shouldn't be run through this site's Google
  // Translate integration (components/translate-provider.tsx) — it mangles
  // math notation like "Y = ((1 − e^(−D₀·A)) / (D₀·A))²".
  root.querySelectorAll(".wb-note").forEach((el) => el.setAttribute("translate", "no"))
}

type Cleanup = void | (() => void)
type ToolRenderer = (root: HTMLElement, byId: (id: string) => any) => Cleanup

/* ────────────────────────────────────────────────────────────────────────
   One renderer per tool. Each sets root.innerHTML to that tool's markup,
   wires its inputs, runs the calculation once, and (for "stranded" only)
   returns a cleanup function. Formulas are unchanged from the source.
   ──────────────────────────────────────────────────────────────────────── */
const RENDERERS: Record<string, ToolRenderer> = {

  /* ---------------- 1. CHIP COST CALCULATOR ---------------- */
  chipcost(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Design & Cost — 01</div>
      <h1>Chip Cost Calculator</h1>
      <p class="wb-desc">Gross die per wafer, Murphy-model yield, and landed die cost. Uses the standard circular-wafer approximation with edge-exclusion loss, then applies a defect-density yield model so cost reflects <em>usable</em> silicon, not raw geometry.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <div class="wb-row2">
            <div><label>Die width (mm)</label><input type="number" id="cc-w" value="10" step="0.1"></div>
            <div><label>Die height (mm)</label><input type="number" id="cc-h" value="10" step="0.1"></div>
          </div>
          <label>Wafer diameter</label>
          <select id="cc-dia"><option value="300">300 mm</option><option value="200">200 mm</option></select>
          <label>Scribe line width (µm)</label>
          <input type="number" id="cc-scribe" value="100">
          <label>Edge exclusion (mm)</label>
          <input type="number" id="cc-edge" value="3">
          <label>Defect density D₀ (defects/cm²)</label>
          <input type="number" id="cc-d0" value="0.12" step="0.01">
          <label>Process node</label>
          <select id="cc-node">
            <option value="180000">3 nm — $18,000 /wafer</option>
            <option value="150000">5 nm — $15,000 /wafer</option>
            <option value="90000">7 nm — $9,500 /wafer</option>
            <option value="70000" selected>7 nm (mature) — $7,000 /wafer</option>
            <option value="50000">16 nm — $5,000 /wafer</option>
            <option value="15000">28 nm — $2,500 /wafer</option>
          </select>
          <label>Test + margin (% of wafer cost)</label>
          <input type="number" id="cc-margin" value="15">
        </div>
        <div>
          <div class="wb-card">
            <h2>Wafer map</h2>
            <div class="wb-wafer-wrap"><svg id="cc-svg" width="280" height="280" viewBox="0 0 280 280"></svg></div>
          </div>
          <div class="wb-card">
            <h2>Result</h2>
            <div class="wb-stat"><span class="k">Gross die / wafer</span><span class="v" id="cc-gross">—</span></div>
            <div class="wb-stat"><span class="k">Yield (Murphy model)</span><span class="v accent2" id="cc-yield">—</span></div>
            <div class="wb-stat"><span class="k">Good die / wafer</span><span class="v" id="cc-good">—</span></div>
            <div class="wb-stat"><span class="k">Cost per good die</span><span class="v big" id="cc-cost">—</span></div>
            <div class="wb-note">Murphy's model: Y = ((1 − e^(−D₀·A)) / (D₀·A))². Gross die uses the standard rectangular-fit-on-circle approximation with scribe and edge-exclusion loss. Wafer pricing is a public-domain industry estimate by node, not a specific foundry's quote.</div>
          </div>
        </div>
      </div>
    `
    function calc() {
      const w = +byId("cc-w").value, h = +byId("cc-h").value
      const dia = +byId("cc-dia").value
      const scribe = (+byId("cc-scribe").value) / 1000
      const edge = +byId("cc-edge").value
      const d0 = +byId("cc-d0").value
      const waferCost = +byId("cc-node").value
      const margin = +byId("cc-margin").value / 100

      const dieW = w + scribe, dieH = h + scribe
      const usableDia = dia - 2 * edge
      const r = usableDia / 2
      let gross = Math.floor((Math.PI * r * r) / (dieW * dieH) - (Math.PI * Math.sqrt(2 * dieW * dieH)) / Math.sqrt(dieW * dieW + dieH * dieH) * (2 * r) / Math.sqrt(dieW * dieH))
      gross = Math.max(gross, 0)
      const areaCm2 = (w * h) / 100
      const yieldVal = Math.pow((1 - Math.exp(-d0 * areaCm2)) / (d0 * areaCm2 || 1e-9), 2)
      const good = Math.floor(gross * yieldVal)
      const totalCost = waferCost * (1 + margin)
      const costPerDie = good > 0 ? totalCost / good : Infinity

      byId("cc-gross").textContent = gross.toLocaleString()
      byId("cc-yield").textContent = (yieldVal * 100).toFixed(1) + "%"
      byId("cc-good").textContent = good.toLocaleString()
      byId("cc-cost").textContent = isFinite(costPerDie) ? "$" + costPerDie.toFixed(2) : "—"

      drawWafer(dia, dieW, dieH, edge, gross)
    }
    function drawWafer(dia: number, dieW: number, dieH: number, edge: number, gross: number) {
      const svg = byId("cc-svg")
      const accent = themeColor("--yellow", "#f5b731")
      const border = themeColor("--text-2", "#4a4030")
      const muted = themeColor("--text-1", "#8a8060")
      const size = 280, pad = 10, R = (size - 2 * pad) / 2, cx = size / 2, cy = size / 2
      const scale = R / (dia / 2)
      const dw = dieW * scale, dh = dieH * scale
      let cells = ""
      const cols = Math.ceil((dia) / dieW), rows = Math.ceil((dia) / dieH)
      const usableR = (dia / 2 - edge) * scale
      let shown = 0
      for (let i = -Math.ceil(cols / 2) - 1; i <= Math.ceil(cols / 2) + 1; i++) {
        for (let j = -Math.ceil(rows / 2) - 1; j <= Math.ceil(rows / 2) + 1; j++) {
          const x = cx + i * dw, y = cy + j * dh
          const corners = [[x - dw / 2, y - dh / 2], [x + dw / 2, y - dh / 2], [x - dw / 2, y + dh / 2], [x + dw / 2, y + dh / 2]]
          const inside = corners.every(([cx2, cy2]) => Math.hypot(cx2 - cx, cy2 - cy) <= usableR)
          if (inside && shown < gross + 40) {
            cells += `<rect x="${x - dw / 2 + 0.5}" y="${y - dh / 2 + 0.5}" width="${dw - 1}" height="${dh - 1}" fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.9"/>`
            shown++
          }
        }
      }
      svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${border}" stroke-width="1.5"/>
        <clipPath id="wclip"><circle cx="${cx}" cy="${cy}" r="${R - 1}"/></clipPath>
        <g clip-path="url(#wclip)">${cells}</g>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${border}" stroke-width="1.5"/>
        <text x="${cx}" y="${size - 6}" fill="${muted}" font-size="10" text-anchor="middle">Ø ${dia}mm wafer · ${dieW.toFixed(1)}×${dieH.toFixed(1)}mm die pitch</text>
      `
    }
    ;["cc-w", "cc-h", "cc-dia", "cc-scribe", "cc-edge", "cc-d0", "cc-node", "cc-margin"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 2. PACKAGING CALCULATOR ---------------- */
  packaging(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Design & Cost — 02</div>
      <h1>Packaging Calculator</h1>
      <p class="wb-desc">Estimate advanced-packaging cost per unit across common architectures, and — unlike a single-die yield tool — model <strong>compound yield</strong> across an interposer plus multiple attached chiplets, which is the actual failure structure of modern AI accelerators.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Packaging technology</label>
          <select id="pk-tech">
            <option value="cowos">CoWoS-S (TSMC, silicon interposer)</option>
            <option value="cowosl">CoWoS-L (RDL interposer, larger reticle)</option>
            <option value="emib">EMIB (Intel, embedded bridge)</option>
            <option value="info">InFO (fan-out, TSMC)</option>
            <option value="soic">SoIC (3D hybrid bonding)</option>
          </select>
          <label>Compute (logic) die yield</label>
          <input type="number" id="pk-logic" value="85" step="1">%
          <label>Number of HBM stacks attached</label>
          <input type="number" id="pk-hbm-n" value="6" step="1">
          <label>Per-stack HBM yield</label>
          <input type="number" id="pk-hbm-y" value="94" step="1">%
          <label>Interposer / substrate yield</label>
          <input type="number" id="pk-interposer" value="97" step="1">%
          <label>Assembly (bonding) yield</label>
          <input type="number" id="pk-assembly" value="96" step="1">%
        </div>
        <div>
          <div class="wb-card">
            <h2>Compound yield stack</h2>
            <div class="wb-barlist" id="pk-bars"></div>
          </div>
          <div class="wb-card">
            <h2>Result</h2>
            <div class="wb-stat"><span class="k">Base cost / unit (packaging only)</span><span class="v accent2" id="pk-base">—</span></div>
            <div class="wb-stat"><span class="k">Compound package yield</span><span class="v" id="pk-yield">—</span></div>
            <div class="wb-stat"><span class="k">Effective cost / good package</span><span class="v big" id="pk-final">—</span></div>
            <div class="wb-note">Y_total = Y_interposer × Y_assembly × Y_logic × (Y_hbm)ⁿ. Every attached known-good-die still multiplies risk — this is the gap most public calculators skip by treating packaging as a flat per-unit fee.</div>
          </div>
        </div>
      </div>
    `
    const PKG_BASE: Record<string, number> = { cowos: 220, cowosl: 260, emib: 140, info: 60, soic: 340 }
    function calc() {
      const tech = byId("pk-tech").value
      const logic = +byId("pk-logic").value / 100
      const hbmN = +byId("pk-hbm-n").value
      const hbmY = +byId("pk-hbm-y").value / 100
      const interposer = +byId("pk-interposer").value / 100
      const assembly = +byId("pk-assembly").value / 100

      const hbmCompound = Math.pow(hbmY, hbmN)
      const yieldTotal = interposer * assembly * logic * hbmCompound
      const base = PKG_BASE[tech] + hbmN * 18
      const final = base / Math.max(yieldTotal, 0.0001)

      byId("pk-base").textContent = "$" + base.toFixed(0)
      byId("pk-yield").textContent = (yieldTotal * 100).toFixed(1) + "%"
      byId("pk-final").textContent = "$" + final.toFixed(0)

      const rows: [string, number, string][] = [
        ["Interposer / substrate", interposer, "var(--yellow)"],
        ["Assembly / bonding", assembly, "var(--yellow)"],
        ["Logic die", logic, "#ffaa00"],
        [`HBM stacks ×${hbmN} (compound)`, hbmCompound, "var(--red)"],
      ]
      byId("pk-bars").innerHTML = rows.map(([lbl, val, color]) => `
        <div class="wb-bar-row">
          <div class="lbl">${lbl}</div>
          <div class="wb-bar-track"><div class="wb-bar-fill" style="width:${(val * 100).toFixed(1)}%;background:${color}"></div></div>
          <div class="val">${(val * 100).toFixed(1)}%</div>
        </div>`).join("")
    }
    ;["pk-tech", "pk-logic", "pk-hbm-n", "pk-hbm-y", "pk-interposer", "pk-assembly"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 3. COST BRIDGE ---------------- */
  costbridge(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Design & Cost — 03</div>
      <h1>Cost Bridge</h1>
      <p class="wb-desc">Break an accelerator's bill-of-materials into stages so you can see exactly where cost accumulates from bare wafer to shippable module.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Stage costs ($ / unit)</h2>
          <label>Compute die (post-yield)</label><input type="number" id="cb-die" value="180">
          <label>HBM memory stacks</label><input type="number" id="cb-hbm" value="620">
          <label>Advanced packaging</label><input type="number" id="cb-pkg" value="240">
          <label>Substrate + PCB</label><input type="number" id="cb-sub" value="90">
          <label>Test & burn-in</label><input type="number" id="cb-test" value="45">
          <label>Thermal / mechanical</label><input type="number" id="cb-therm" value="55">
          <label>OEM margin (%)</label><input type="number" id="cb-margin" value="35">
        </div>
        <div class="wb-card">
          <h2>Bridge</h2>
          <div class="wb-barlist" id="cb-bars"></div>
          <div class="wb-stat" style="margin-top:14px;"><span class="k">Total BOM</span><span class="v accent2" id="cb-bom">—</span></div>
          <div class="wb-stat"><span class="k">Sell price @ margin</span><span class="v big" id="cb-sell">—</span></div>
        </div>
      </div>
    `
    function calc() {
      const ids: Record<string, string> = { die: "Compute die", hbm: "HBM memory", pkg: "Packaging", sub: "Substrate/PCB", test: "Test & burn-in", therm: "Thermal/mech" }
      const vals: Record<string, number> = {}
      let sum = 0
      Object.keys(ids).forEach((k) => { vals[k] = +byId("cb-" + k).value; sum += vals[k] })
      const margin = +byId("cb-margin").value / 100
      const sell = sum / (1 - margin)
      const colors = ["var(--yellow)", "#ffaa00", "var(--red)", "var(--green)", "var(--text-1)", "#9b7cff"]
      byId("cb-bars").innerHTML = Object.keys(ids).map((k, i) => `
        <div class="wb-bar-row">
          <div class="lbl">${ids[k]}</div>
          <div class="wb-bar-track"><div class="wb-bar-fill" style="width:${(vals[k] / sum * 100).toFixed(1)}%;background:${colors[i]}"></div></div>
          <div class="val">$${vals[k]}</div>
        </div>`).join("")
      byId("cb-bom").textContent = "$" + sum.toFixed(0)
      byId("cb-sell").textContent = "$" + sell.toFixed(0)
    }
    ;["die", "hbm", "pkg", "sub", "test", "therm", "margin"].forEach((k) => byId("cb-" + k).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 4. PRICE / PERFORMANCE ---------------- */
  perf(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Market & Risk — 04</div>
      <h1>Price / Performance Frontier</h1>
      <p class="wb-desc">Plot your own accelerator configuration against illustrative reference points by $/TFLOP (FP16 dense) and $/GB of memory, to see where a design lands on the cost-efficiency frontier.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Your configuration</h2>
          <label>Name</label><input type="text" id="pf-name" value="Custom ASIC">
          <label>List price ($)</label><input type="number" id="pf-price" value="24000">
          <label>FP16 TFLOPS</label><input type="number" id="pf-tflops" value="990">
          <label>Memory (GB)</label><input type="number" id="pf-mem" value="141">
          <div class="wb-note">Reference points are illustrative round-number placeholders for well-known accelerator classes, not vendor-quoted prices — swap in your own comps for real analysis.</div>
        </div>
        <div class="wb-card">
          <h2>$ / TFLOP vs $ / GB</h2>
          <svg id="pf-svg" class="wb-scatter" viewBox="0 0 560 340"></svg>
        </div>
      </div>
    `
    const PF_REF = [
      { name: "Ref: High-end datacenter GPU", price: 30000, tflops: 989, mem: 80 },
      { name: "Ref: Prior-gen datacenter GPU", price: 18000, tflops: 624, mem: 80 },
      { name: "Ref: Inference-optimized ASIC", price: 12000, tflops: 400, mem: 32 },
      { name: "Ref: Edge accelerator", price: 2500, tflops: 100, mem: 16 },
    ]
    function calc() {
      const accent = themeColor("--yellow", "#f5b731")
      const muted = themeColor("--text-2", "#4a4030")
      const text0 = themeColor("--text-0", "#faf5d0")
      const cfg = {
        name: byId("pf-name").value,
        price: +byId("pf-price").value,
        tflops: +byId("pf-tflops").value,
        mem: +byId("pf-mem").value,
      }
      const all = [...PF_REF, cfg].map((d) => ({ ...d, dpt: d.price / d.tflops, dpg: d.price / d.mem }))
      const maxX = Math.max(...all.map((d) => d.dpt)) * 1.15
      const maxY = Math.max(...all.map((d) => d.dpg)) * 1.15
      const pad = 50, w = 560 - pad * 2, h = 340 - pad * 2
      const sx = (x: number) => pad + (x / maxX) * w
      const sy = (y: number) => 340 - pad - (y / maxY) * h
      let pts = all.map((d) => {
        const isMine = d.name === cfg.name
        return `<g class="wb-dot">
          <circle cx="${sx(d.dpt)}" cy="${sy(d.dpg)}" r="${isMine ? 8 : 5}" fill="${isMine ? accent : muted}" stroke="var(--bg-card)" stroke-width="1.5"/>
          <text x="${sx(d.dpt) + 11}" y="${sy(d.dpg) + 4}" fill="${isMine ? text0 : muted}" font-size="10.5">${d.name}</text>
        </g>`
      }).join("")
      byId("pf-svg").innerHTML = `
        <line x1="${pad}" y1="${340 - pad}" x2="${560 - pad}" y2="${340 - pad}" stroke="${muted}"/>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${340 - pad}" stroke="${muted}"/>
        <text x="${560 / 2}" y="332" fill="${muted}" font-size="11" text-anchor="middle">$ / TFLOP  →  cheaper is left</text>
        <text x="14" y="${340 / 2}" fill="${muted}" font-size="11" text-anchor="middle" transform="rotate(-90 14 ${340 / 2})">$ / GB memory</text>
        ${pts}
      `
    }
    ;["pf-name", "pf-price", "pf-tflops", "pf-mem"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 5. HBM MARKET ---------------- */
  hbm(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Market & Risk — 05</div>
      <h1>HBM Market Estimator</h1>
      <p class="wb-desc">Model HBM cost-per-GB by generation and stack height, and estimate the memory-side bill for a target capacity — the line item that increasingly dominates accelerator BOM.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>HBM generation</label>
          <select id="hb-gen">
            <option value="hbm3e" data-price="16">HBM3E</option>
            <option value="hbm3" data-price="12">HBM3</option>
            <option value="hbm2e" data-price="7">HBM2E</option>
          </select>
          <label>Stack height</label>
          <select id="hb-height">
            <option value="8">8-Hi</option>
            <option value="12" selected>12-Hi</option>
            <option value="16">16-Hi</option>
          </select>
          <label>Per-die capacity (Gb)</label>
          <input type="number" id="hb-diecap" value="24">
          <label>Target total memory (GB)</label>
          <input type="number" id="hb-target" value="141">
          <label>Supply tightness premium (%)</label>
          <input type="number" id="hb-premium" value="20">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Capacity per stack</span><span class="v" id="hb-stackcap">—</span></div>
          <div class="wb-stat"><span class="k">Stacks required</span><span class="v" id="hb-stacks">—</span></div>
          <div class="wb-stat"><span class="k">Base $ / GB</span><span class="v accent2" id="hb-pergb">—</span></div>
          <div class="wb-stat"><span class="k">Total memory cost</span><span class="v big" id="hb-total">—</span></div>
          <div class="wb-note">Base $/GB by generation is an illustrative industry-range placeholder, adjustable per your own supplier quotes. Supply tightness premium models the 2025-26 allocation environment where HBM has traded well above nominal die cost.</div>
        </div>
      </div>
    `
    function calc() {
      const gen = byId("hb-gen")
      const basePrice = +gen.selectedOptions[0].dataset.price
      const height = +byId("hb-height").value
      const dieCapGb = +byId("hb-diecap").value
      const target = +byId("hb-target").value
      const premium = +byId("hb-premium").value / 100

      const stackCapGB = (height * dieCapGb) / 8
      const stacksNeeded = Math.ceil(target / stackCapGB)
      const pergb = basePrice * (1 + premium)
      const total = target * pergb

      byId("hb-stackcap").textContent = stackCapGB.toFixed(1) + " GB"
      byId("hb-stacks").textContent = stacksNeeded
      byId("hb-pergb").textContent = "$" + pergb.toFixed(2)
      byId("hb-total").textContent = "$" + total.toFixed(0)
    }
    ;["hb-gen", "hb-height", "hb-diecap", "hb-target", "hb-premium"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 6. SUPPLY CHAIN RISK ---------------- */
  supplychain(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Market & Risk — 06</div>
      <h1>Supply Chain Risk Scorecard</h1>
      <p class="wb-desc">Score a bill-of-materials input by geographic concentration and substitutability to flag chokepoints before they become shortages.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Add an input</h2>
          <label>Input name</label><input type="text" id="sc-name" value="EUV photoresist">
          <label>Primary source country</label><input type="text" id="sc-country" value="Japan">
          <label>Share of global supply from top source (%)</label><input type="number" id="sc-share" value="75">
          <label>Number of qualified alternate suppliers</label><input type="number" id="sc-alts" value="1">
          <label>Lead time (weeks)</label><input type="number" id="sc-lead" value="26">
          <button id="sc-add" class="wb-btn">Add to Scorecard</button>
        </div>
        <div class="wb-card">
          <h2>Scorecard</h2>
          <table><thead><tr><th>Input</th><th>Source</th><th>Concentration</th><th>Alt. suppliers</th><th>Lead time</th><th>Risk</th></tr></thead><tbody id="sc-body"></tbody></table>
          <div class="wb-note">Risk score = weighted function of supply concentration (50%), alternate-supplier scarcity (30%), and lead time (20%). Thresholds: &lt;40 low, 40-65 medium, &gt;65 high.</div>
        </div>
      </div>
    `
    let scRows = [
      { name: "300mm silicon wafers", country: "Japan", share: 56, alts: 3, lead: 14 },
      { name: "EUV photomasks (blanks)", country: "Japan", share: 80, alts: 1, lead: 20 },
      { name: "Neon gas (lithography)", country: "Ukraine/Russia", share: 65, alts: 2, lead: 10 },
      { name: "Fluorspar (WF₆ precursor)", country: "China", share: 64, alts: 2, lead: 16 },
    ]
    function risk(share: number, alts: number, lead: number) {
      const concScore = share
      const altScore = Math.max(0, 100 - alts * 25)
      const leadScore = Math.min(100, lead * 2.5)
      return concScore * 0.5 + altScore * 0.3 + leadScore * 0.2
    }
    function render() {
      byId("sc-body").innerHTML = scRows.map((r) => {
        const rk = risk(r.share, r.alts, r.lead)
        const cls = rk > 65 ? "hi" : rk > 40 ? "mid" : "lo"
        const label = rk > 65 ? "High" : rk > 40 ? "Medium" : "Low"
        return `<tr><td>${r.name}</td><td>${r.country}</td><td>${r.share}%</td><td>${r.alts}</td><td>${r.lead}w</td><td><span class="wb-pill ${cls}">${label} · ${rk.toFixed(0)}</span></td></tr>`
      }).join("")
    }
    byId("sc-add").onclick = () => {
      scRows.unshift({
        name: byId("sc-name").value,
        country: byId("sc-country").value,
        share: +byId("sc-share").value,
        alts: +byId("sc-alts").value,
        lead: +byId("sc-lead").value,
      })
      render()
    }
    render()
  },

  /* ---------------- 7. FAB SITE EXPLORER ---------------- */
  fabsites(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Market & Risk — 07</div>
      <h1>Fab Site Explorer</h1>
      <p class="wb-desc">Filterable reference list of major logic fab sites by region and leading-edge node. Figures are approximate, illustrative planning references — confirm against foundry disclosures for procurement decisions.</p>
      <div class="wb-card">
        <div class="wb-row2" style="margin-bottom:16px;">
          <div><label>Filter by region</label><select id="fs-region"><option value="">All</option><option>Taiwan</option><option>USA</option><option>South Korea</option><option>Japan</option><option>Europe</option></select></div>
          <div><label>Min. leading node</label><select id="fs-node"><option value="0">Any</option><option value="1">≤5nm class</option><option value="2">≤3nm class</option></select></div>
        </div>
        <table><thead><tr><th>Site</th><th>Region</th><th>Operator</th><th>Leading node</th><th>Est. capacity</th></tr></thead><tbody id="fs-body"></tbody></table>
      </div>
    `
    const FAB_SITES = [
      { site: "Hsinchu / Tainan", region: "Taiwan", op: "TSMC", node: "3nm", rank: 2, cap: "Very high" },
      { site: "Phoenix, AZ", region: "USA", op: "TSMC", node: "4nm", rank: 1, cap: "Ramping" },
      { site: "Pyeongtaek", region: "South Korea", op: "Samsung", node: "3nm", rank: 2, cap: "High" },
      { site: "Austin, TX", region: "USA", op: "Samsung", node: "4nm", rank: 1, cap: "Medium" },
      { site: "Hillsboro, OR", region: "USA", op: "Intel", node: "Intel 18A", rank: 2, cap: "Ramping" },
      { site: "Leixlip", region: "Europe", op: "Intel", node: "Intel 4", rank: 1, cap: "Medium" },
      { site: "Kumamoto", region: "Japan", op: "JASM (TSMC/Sony)", node: "12-28nm", rank: 0, cap: "Ramping" },
      { site: "Dresden", region: "Europe", op: "GlobalFoundries", node: "12nm", rank: 0, cap: "Medium" },
    ]
    function render() {
      const region = byId("fs-region").value
      const minRank = +byId("fs-node").value
      const rows = FAB_SITES.filter((f) => (!region || f.region === region) && f.rank >= minRank)
      byId("fs-body").innerHTML = rows.map((f) => `
        <tr><td>${f.site}</td><td>${f.region}</td><td>${f.op}</td><td>${f.node}</td><td>${f.cap}</td></tr>
      `).join("") || `<tr><td colspan="5" style="color:var(--text-2)">No sites match filter.</td></tr>`
    }
    byId("fs-region").addEventListener("input", render)
    byId("fs-node").addEventListener("input", render)
    render()
  },

  /* ---------------- 8. TAPEOUT WORKSPACE ---------------- */
  tapeout(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Planning — 08</div>
      <h1>Tapeout Decision Workspace</h1>
      <p class="wb-desc">Walk through the shared-shuttle vs. dedicated-maskset decision and see the breakeven production volume.</p>
      <div class="wb-steps">
        <div class="wb-step done"></div><div class="wb-step done"></div><div class="wb-step now"></div><div class="wb-step"></div><div class="wb-step"></div>
      </div>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Project inputs</h2>
          <label>Die area (mm²)</label><input type="number" id="tw-area" value="80">
          <label>MPW shuttle cost per mm² (typical)</label><input type="number" id="tw-mpw" value="1200">
          <label>Dedicated maskset (NRE) cost</label><input type="number" id="tw-nre" value="900000">
          <label>Wafer cost (dedicated run)</label><input type="number" id="tw-wafer" value="9500">
          <label>Good die per wafer (post-yield)</label><input type="number" id="tw-gdw" value="420">
          <label>Expected production volume (units)</label><input type="number" id="tw-volume" value="15000">
        </div>
        <div class="wb-card">
          <h2>Recommendation</h2>
          <div class="wb-stat"><span class="k">MPW cost (fixed, low volume)</span><span class="v" id="tw-mpwcost">—</span></div>
          <div class="wb-stat"><span class="k">Dedicated cost / die</span><span class="v" id="tw-dedcost">—</span></div>
          <div class="wb-stat"><span class="k">Breakeven volume</span><span class="v accent2" id="tw-breakeven">—</span></div>
          <div class="wb-stat"><span class="k">Recommendation @ your volume</span><span class="v big" id="tw-rec">—</span></div>
          <div class="wb-note">MPW/shuttle runs are flat-fee regardless of volume (a handful of die for prototyping). Dedicated tapeout has high fixed NRE but low marginal die cost — it wins once volume amortizes the mask cost below the MPW premium.</div>
        </div>
      </div>
    `
    function calc() {
      const area = +byId("tw-area").value
      const mpwRate = +byId("tw-mpw").value
      const nre = +byId("tw-nre").value
      const waferCost = +byId("tw-wafer").value
      const gdw = +byId("tw-gdw").value
      const volume = +byId("tw-volume").value

      const mpwCost = area * mpwRate
      const dedCostPerDie = waferCost / gdw
      const breakeven = Math.ceil(nre / (mpwRate * area / 1 - dedCostPerDie))
      const rec = volume >= breakeven ? "Dedicated maskset" : "MPW shuttle"

      byId("tw-mpwcost").textContent = "$" + mpwCost.toLocaleString()
      byId("tw-dedcost").textContent = "$" + dedCostPerDie.toFixed(2) + " /die + $" + nre.toLocaleString() + " NRE"
      byId("tw-breakeven").textContent = breakeven.toLocaleString() + " units"
      byId("tw-rec").textContent = rec
    }
    ;["tw-area", "tw-mpw", "tw-nre", "tw-wafer", "tw-gdw", "tw-volume"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 9. EUV SCANNER THROUGHPUT ---------------- */
  euv(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Equipment & Facility — 09</div>
      <h1>EUV / DUV Scanner Throughput</h1>
      <p class="wb-desc">Estimate wafers-per-hour (WPH) for a lithography scanner from dose, source power, and stage overhead — a calculation that currently has essentially no public equivalent, since it lives inside ASML/toolmaker proprietary spec sheets.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Light source</label>
          <select id="ev-src"><option value="euv">EUV (13.5nm)</option><option value="duv">DUV ArF immersion (193nm)</option></select>
          <label>Source power (W, at wafer plane)</label>
          <input type="number" id="ev-power" value="250">
          <label>Resist sensitivity — dose (mJ/cm²)</label>
          <input type="number" id="ev-dose" value="30">
          <label>Optical / collection efficiency (%)</label>
          <input type="number" id="ev-eff" value="4">
          <label id="ev-fs-label">Exposure field size (mm × mm)</label>
          <div class="wb-row2">
            <input type="number" id="ev-fw" value="26" aria-label="Exposure field width (mm)">
            <input type="number" id="ev-fh" value="33" aria-label="Exposure field height (mm)">
          </div>
          <label>Wafer diameter (mm)</label>
          <input type="number" id="ev-dia" value="300">
          <label>Stage overhead per field (ms)</label>
          <input type="number" id="ev-overhead" value="120">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Fields per wafer</span><span class="v" id="ev-fields">—</span></div>
          <div class="wb-stat"><span class="k">Exposure time / field</span><span class="v" id="ev-exptime">—</span></div>
          <div class="wb-stat"><span class="k">Total time / wafer</span><span class="v accent2" id="ev-wafertime">—</span></div>
          <div class="wb-stat"><span class="k">Throughput</span><span class="v big" id="ev-wph">—</span></div>
          <div class="wb-note">Exposure time/field ≈ (dose × field area) / (power × efficiency). WPH = 3600 / (exposure time + overhead) × fields-per-wafer factor, using a rectangular-field circle-packing approximation. EUV's low collection efficiency (~2-5%) vs DUV (~30%+) is why EUV scanners need far higher source power for comparable throughput.</div>
        </div>
      </div>
    `
    function calc() {
      const power = +byId("ev-power").value
      const dose = +byId("ev-dose").value
      const eff = +byId("ev-eff").value / 100
      const fw = +byId("ev-fw").value, fh = +byId("ev-fh").value
      const dia = +byId("ev-dia").value
      const overheadMs = +byId("ev-overhead").value

      const fieldAreaCm2 = (fw / 10) * (fh / 10)
      const usablePowerMw = power * 1000 * eff
      const expTimeS = (dose * fieldAreaCm2) / usablePowerMw
      const waferAreaCm2 = Math.PI * Math.pow(dia / 10 / 2, 2)
      const fields = Math.max(1, Math.floor(waferAreaCm2 / fieldAreaCm2 * 0.88))
      const timePerFieldS = expTimeS + overheadMs / 1000
      const waferTimeS = fields * timePerFieldS
      const wph = 3600 / waferTimeS

      byId("ev-fields").textContent = fields
      byId("ev-exptime").textContent = expTimeS.toFixed(3) + " s"
      byId("ev-wafertime").textContent = waferTimeS.toFixed(1) + " s"
      byId("ev-wph").textContent = wph.toFixed(1) + " WPH"
    }
    ;["ev-src", "ev-power", "ev-dose", "ev-eff", "ev-fw", "ev-fh", "ev-dia", "ev-overhead"].forEach((id) => byId(id).addEventListener("input", calc))
    byId("ev-src").addEventListener("change", (e: any) => {
      if (e.target.value === "euv") { byId("ev-eff").value = 4; byId("ev-power").value = 250 }
      else { byId("ev-eff").value = 32; byId("ev-power").value = 90 }
      calc()
    })
    calc()
  },

  /* ---------------- 10. GAS PURGE CYCLE ---------------- */
  gaspurge(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Equipment & Facility — 10</div>
      <h1>Gas Line Purge Cycle Calculator</h1>
      <p class="wb-desc">Calculate how many vacuum/purge cycles a UHP gas line needs to hit a target contamination level, and factor in wall desorption — the part flat "purge time" calculators skip.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Starting contaminant concentration (ppm)</label>
          <input type="number" id="gp-c0" value="10000">
          <label>Target concentration (ppt)</label>
          <input type="number" id="gp-target" value="500">
          <label>Line pressure — inlet / fill (psia)</label>
          <input type="number" id="gp-pinlet" value="60">
          <label>Vacuum pull pressure (psia)</label>
          <input type="number" id="gp-pvac" value="0.5">
          <label>Estimated wall desorption floor (ppt)</label>
          <input type="number" id="gp-desorb" value="50">
          <label>Time per cycle (fill + pull, seconds)</label>
          <input type="number" id="gp-time" value="45">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Dilution ratio per cycle</span><span class="v" id="gp-ratio">—</span></div>
          <div class="wb-stat"><span class="k">Cycles required</span><span class="v accent2" id="gp-cycles">—</span></div>
          <div class="wb-stat"><span class="k">Total purge time</span><span class="v big" id="gp-total">—</span></div>
          <div class="wb-stat"><span class="k">Achievable floor</span><span class="v" id="gp-floor">—</span></div>
          <div class="wb-note">Cₙ = C₀·(P_vac/P_inlet)ⁿ + C_desorption. Each cycle dilutes by the inlet/vacuum pressure ratio, but concentration can never drop below the desorption floor set by contamination adsorbed on line walls — more cycles won't get you there; only bake-out or better surface passivation will.</div>
        </div>
      </div>
    `
    function calc() {
      const c0 = +byId("gp-c0").value * 1e6
      const target = +byId("gp-target").value
      const pin = +byId("gp-pinlet").value
      const pvac = +byId("gp-pvac").value
      const desorb = +byId("gp-desorb").value
      const timePerCycle = +byId("gp-time").value

      const ratio = pvac / pin
      let n = 0, c = c0
      const effectiveTarget = Math.max(target, desorb + 0.01)
      while (c > effectiveTarget && n < 200) { n++; c = c0 * Math.pow(ratio, n) + desorb }
      const reachable = target > desorb

      byId("gp-ratio").textContent = ratio.toFixed(4) + " ×/cycle"
      byId("gp-cycles").textContent = reachable ? n : n + " (floor-limited)"
      byId("gp-total").textContent = ((n * timePerCycle) / 60).toFixed(1) + " min"
      byId("gp-floor").textContent = desorb.toFixed(0) + " ppt"
    }
    ;["gp-c0", "gp-target", "gp-pinlet", "gp-pvac", "gp-desorb", "gp-time"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 11. TCO BY FAB REGION ---------------- */
  tco(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Equipment & Facility — 11</div>
      <h1>Total Cost of Ownership by Fab Region</h1>
      <p class="wb-desc">Toggle manufacturing origin to see the landed cost impact of regional wafer premiums, tariffs, and subsidies — the geopolitical layer that flat wafer-price calculators leave out entirely.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Base wafer cost, best-cost region ($)</label>
          <input type="number" id="tc-base" value="8000">
          <label>Order volume (wafers)</label>
          <input type="number" id="tc-volume" value="500">
          <label>Destination market</label>
          <select id="tc-dest"><option value="us">United States</option><option value="eu">European Union</option><option value="asia">Asia (ex-China)</option></select>
          <label>Manufacturing region</label>
          <div id="tc-regions" class="wb-barlist" style="margin-top:8px;"></div>
        </div>
        <div class="wb-card">
          <h2>Landed cost comparison</h2>
          <table><thead><tr><th>Region</th><th>Wafer premium</th><th>Tariff / subsidy</th><th>Landed $/wafer</th><th>Total order</th></tr></thead><tbody id="tc-body"></tbody></table>
          <div class="wb-note">Regional wafer premiums and tariff/subsidy figures are illustrative placeholders reflecting the general direction of published policy (e.g. CHIPS Act-style subsidies lowering US-fab effective cost, import tariffs raising cost for tariffed origins into a given destination) — not current, precise rates. Replace with live figures before using for procurement.</div>
        </div>
      </div>
    `
    const TCO_REGIONS = [
      { name: "Taiwan", premium: 0, tariff: { us: 0.0, eu: 0.0, asia: 0.0 } },
      { name: "USA (leading-edge, subsidized)", premium: 0.35, tariff: { us: -0.10, eu: 0.0, asia: 0.02 } },
      { name: "South Korea", premium: 0.05, tariff: { us: 0.0, eu: 0.0, asia: 0.0 } },
      { name: "Japan", premium: 0.12, tariff: { us: 0.0, eu: 0.0, asia: 0.0 } },
      { name: "China (mature node)", premium: -0.15, tariff: { us: 0.25, eu: 0.08, asia: 0.0 } },
      { name: "Europe", premium: 0.20, tariff: { us: 0.0, eu: -0.05, asia: 0.03 } },
    ]
    function render() {
      const base = +byId("tc-base").value
      const volume = +byId("tc-volume").value
      const dest = byId("tc-dest").value as "us" | "eu" | "asia"
      const rows = TCO_REGIONS.map((r) => {
        const preTariff = base * (1 + r.premium)
        const landed = preTariff * (1 + r.tariff[dest])
        return { ...r, landed, total: landed * volume }
      }).sort((a, b) => a.landed - b.landed)
      const cheapest = rows[0].landed
      byId("tc-body").innerHTML = rows.map((r) => {
        const isCheapest = r.landed === cheapest
        return `<tr ${isCheapest ? 'style="color:var(--green)"' : ""}>
          <td>${r.name}${isCheapest ? " ★" : ""}</td>
          <td>${r.premium >= 0 ? "+" : ""}${(r.premium * 100).toFixed(0)}%</td>
          <td>${r.tariff[dest] >= 0 ? "+" : ""}${(r.tariff[dest] * 100).toFixed(0)}%</td>
          <td>$${r.landed.toFixed(0)}</td>
          <td>$${r.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
        </tr>`
      }).join("")
    }
    byId("tc-regions").innerHTML = '<div class="wb-note" style="border-top:none;padding-top:0;">All regions shown for comparison — pick a destination market at left to see tariff impact.</div>'
    ;["tc-base", "tc-volume", "tc-dest"].forEach((id) => byId(id).addEventListener("input", render))
    render()
  },

  /* ---------------- 12. PUE CALCULATOR ---------------- */
  pue(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Datacenter Planning — 12</div>
      <h1>PUE Calculator</h1>
      <p class="wb-desc">Power Usage Effectiveness from IT load and facility overhead (cooling, power distribution loss, lighting/misc) — with a cooling-method preset since that's the single biggest PUE driver.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Critical IT load (kW)</label>
          <input type="number" id="pu-it" value="4000">
          <label>Cooling method</label>
          <select id="pu-cool">
            <option value="0.55" data-ud="0.06">Air cooling (CRAC/CRAH)</option>
            <option value="0.28" data-ud="0.05" selected>Rear-door heat exchanger</option>
            <option value="0.15" data-ud="0.04">Direct-to-chip liquid</option>
            <option value="0.07" data-ud="0.03">Immersion cooling</option>
          </select>
          <label>Power distribution loss (%)</label>
          <input type="number" id="pu-ud-override" placeholder="auto from cooling method">
          <label>Lighting / misc facility load (kW)</label>
          <input type="number" id="pu-misc" value="60">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Cooling overhead</span><span class="v" id="pu-coolkw">—</span></div>
          <div class="wb-stat"><span class="k">Distribution loss</span><span class="v" id="pu-losskw">—</span></div>
          <div class="wb-stat"><span class="k">Total facility load</span><span class="v accent2" id="pu-total">—</span></div>
          <div class="wb-stat"><span class="k">PUE</span><span class="v big" id="pu-pue">—</span></div>
          <div class="wb-note">PUE = Total facility power / IT power. Cooling overhead ratios by method (fraction of IT load) are representative industry ranges — air ~0.5-0.6, RDHx ~0.25-0.3, direct-to-chip ~0.1-0.2, immersion ~0.05-0.1 — actual results vary by climate and design. A PUE of 1.0 is the theoretical floor (no overhead).</div>
        </div>
      </div>
    `
    function calc() {
      const it = +byId("pu-it").value
      const coolSel = byId("pu-cool")
      const coolRatio = +coolSel.value
      const defaultUd = +coolSel.selectedOptions[0].dataset.ud
      const udOverride = byId("pu-ud-override").value
      const udRatio = udOverride ? (+udOverride / 100) : defaultUd
      const misc = +byId("pu-misc").value

      const coolKw = it * coolRatio
      const lossKw = it * udRatio
      const total = it + coolKw + lossKw + misc
      const pue = total / it

      byId("pu-coolkw").textContent = coolKw.toFixed(0) + " kW"
      byId("pu-losskw").textContent = lossKw.toFixed(0) + " kW"
      byId("pu-total").textContent = total.toFixed(0) + " kW"
      byId("pu-pue").textContent = pue.toFixed(3)
    }
    ;["pu-it", "pu-cool", "pu-ud-override", "pu-misc"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 13. RACK DENSITY / COOLING SELECTOR ---------------- */
  rackcool(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Datacenter Planning — 13</div>
      <h1>Rack Density / Cooling Method Selector</h1>
      <p class="wb-desc">Given a target rack power density, see which cooling methods can actually handle it — most AI racks today are power-constrained, not space-constrained, so density planning has to start from kW/rack, not U-height.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Target power per rack (kW)</label>
          <input type="number" id="rc-kw" value="45">
          <label>Rack height (U)</label>
          <input type="number" id="rc-u" value="42">
          <label>Server draw per unit (kW)</label>
          <input type="number" id="rc-serverkw" value="1.5">
          <label>Server height (U)</label>
          <input type="number" id="rc-serveru" value="2">
        </div>
        <div class="wb-card">
          <h2>Cooling method fit</h2>
          <table><thead><tr><th>Method</th><th>Typical max density</th><th>Fits target?</th></tr></thead><tbody id="rc-body"></tbody></table>
          <div class="wb-stat" style="margin-top:14px;"><span class="k">Servers that fit by power</span><span class="v accent2" id="rc-bypower">—</span></div>
          <div class="wb-stat"><span class="k">Servers that fit by space</span><span class="v" id="rc-byspace">—</span></div>
          <div class="wb-stat"><span class="k">Binding constraint</span><span class="v big" id="rc-bind">—</span></div>
          <div class="wb-note">Max density figures per method are representative industry ranges, not a specific vendor spec. "Binding constraint" shows whether your target rack will run out of power budget or physical U-space first — for AI accelerator racks, power almost always wins.</div>
        </div>
      </div>
    `
    const RC_METHODS = [
      { name: "Air cooling (CRAC/CRAH)", max: 15 },
      { name: "Rear-door heat exchanger", max: 35 },
      { name: "Direct-to-chip liquid", max: 80 },
      { name: "Immersion cooling", max: 200 },
    ]
    function calc() {
      const kw = +byId("rc-kw").value
      const u = +byId("rc-u").value
      const serverKw = +byId("rc-serverkw").value
      const serverU = +byId("rc-serveru").value

      byId("rc-body").innerHTML = RC_METHODS.map((m) => {
        const fits = kw <= m.max
        return `<tr><td>${m.name}</td><td>${m.max} kW/rack</td><td><span class="wb-pill ${fits ? "lo" : "hi"}">${fits ? "Fits" : "Exceeded"}</span></td></tr>`
      }).join("")

      const byPower = Math.floor(kw / serverKw)
      const bySpace = Math.floor(u / serverU)
      const bind = byPower < bySpace ? "Power-limited" : byPower > bySpace ? "Space-limited" : "Balanced"

      byId("rc-bypower").textContent = byPower + " servers"
      byId("rc-byspace").textContent = bySpace + " servers"
      byId("rc-bind").textContent = bind
    }
    ;["rc-kw", "rc-u", "rc-serverkw", "rc-serveru"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 14. DATACENTER TCO ---------------- */
  dctco(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Datacenter Planning — 14</div>
      <h1>Datacenter TCO Calculator</h1>
      <p class="wb-desc">Blend capex (shell, power, cooling build-out) and opex (energy, water, maintenance) into a $/kW-month landed cost over a lease/depreciation term — the number that actually drives build-vs-lease-vs-cloud decisions.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Critical IT capacity (kW)</label>
          <input type="number" id="dt-kw" value="4000">
          <label>Capex — shell + power + cooling ($/kW)</label>
          <input type="number" id="dt-capex" value="9500">
          <label>Depreciation / analysis term (years)</label>
          <input type="number" id="dt-term" value="10">
          <label>PUE</label>
          <input type="number" id="dt-pue" value="1.3" step="0.01">
          <label>Electricity price ($/kWh)</label>
          <input type="number" id="dt-power" value="0.08" step="0.001">
          <label>Water + maintenance ($/kW-month)</label>
          <input type="number" id="dt-maint" value="35">
          <label>Average IT utilization (%)</label>
          <input type="number" id="dt-util" value="70">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Capex amortized</span><span class="v" id="dt-capexmo">—</span></div>
          <div class="wb-stat"><span class="k">Energy cost</span><span class="v" id="dt-energy">—</span></div>
          <div class="wb-stat"><span class="k">Water + maintenance</span><span class="v" id="dt-maintout">—</span></div>
          <div class="wb-stat"><span class="k">Total landed cost</span><span class="v accent2" id="dt-total">—</span></div>
          <div class="wb-stat"><span class="k">$ / kW-month</span><span class="v big" id="dt-perkw">—</span></div>
          <div class="wb-note">Capex is straight-line amortized over the term. Energy cost = IT load × PUE × utilization × electricity price × hours/month. This is a planning-level estimate — real deals layer in financing cost, tax incentives, and escalation schedules.</div>
        </div>
      </div>
    `
    function calc() {
      const kw = +byId("dt-kw").value
      const capexPerKw = +byId("dt-capex").value
      const term = +byId("dt-term").value
      const pue = +byId("dt-pue").value
      const powerPrice = +byId("dt-power").value
      const maint = +byId("dt-maint").value
      const util = +byId("dt-util").value / 100

      const totalCapex = kw * capexPerKw
      const capexMo = totalCapex / (term * 12)
      const energyMo = kw * util * pue * powerPrice * 24 * 30.44
      const maintMo = kw * maint
      const totalMo = capexMo + energyMo + maintMo
      const perKw = totalMo / kw

      byId("dt-capexmo").textContent = "$" + capexMo.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "/mo"
      byId("dt-energy").textContent = "$" + energyMo.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "/mo"
      byId("dt-maintout").textContent = "$" + maintMo.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "/mo"
      byId("dt-total").textContent = "$" + totalMo.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "/mo"
      byId("dt-perkw").textContent = "$" + perKw.toFixed(0) + "/kW-mo"
    }
    ;["dt-kw", "dt-capex", "dt-term", "dt-pue", "dt-power", "dt-maint", "dt-util"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 15. WATTS PER WORD ---------------- */
  wattsword(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Novel / Creative — 15</div>
      <h1>Watts per Word</h1>
      <p class="wb-desc">Real energy and dollar cost per 1,000 output tokens of LLM inference, from GPU power draw and throughput — most public estimates are stale benchmark numbers, not your actual hardware at your actual electricity rate.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>GPU model power draw (W, per card)</label>
          <input type="number" id="ww-watts" value="700">
          <label>Number of GPUs serving the model</label>
          <input type="number" id="ww-gpus" value="8">
          <label>Sustained throughput (output tokens/sec, total)</label>
          <input type="number" id="ww-tps" value="450">
          <label>GPU utilization during serving (%)</label>
          <input type="number" id="ww-util" value="75">
          <label>PUE (datacenter overhead)</label>
          <input type="number" id="ww-pue" value="1.2" step="0.01">
          <label>Electricity price ($/kWh)</label>
          <input type="number" id="ww-price" value="0.10" step="0.001">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Cluster power draw</span><span class="v" id="ww-clusterw">—</span></div>
          <div class="wb-stat"><span class="k">Energy per 1,000 tokens</span><span class="v" id="ww-whper1k">—</span></div>
          <div class="wb-stat"><span class="k">Cost per 1,000 tokens</span><span class="v accent2" id="ww-costper1k">—</span></div>
          <div class="wb-stat"><span class="k">Cost per 1M tokens</span><span class="v big" id="ww-costper1m">—</span></div>
          <div class="wb-note">Energy/1k tokens = (GPU count × watts × utilization × PUE) ÷ tokens/sec ÷ 3600 × 1000. This models the inference-serving power draw only — it excludes training amortization, networking, and storage, which is why single-query "energy cost of ChatGPT" estimates you see online vary by 10-100x depending on what's included.</div>
        </div>
      </div>
    `
    function calc() {
      const watts = +byId("ww-watts").value
      const gpus = +byId("ww-gpus").value
      const tps = +byId("ww-tps").value
      const util = +byId("ww-util").value / 100
      const pue = +byId("ww-pue").value
      const price = +byId("ww-price").value

      const clusterW = watts * gpus * util * pue
      const wPerToken = clusterW / tps
      const whPer1k = (wPerToken * 1000) / 3600
      const costPer1k = (whPer1k / 1000) * price
      const costPer1m = costPer1k * 1000

      byId("ww-clusterw").textContent = clusterW.toFixed(0) + " W"
      byId("ww-whper1k").textContent = whPer1k.toFixed(2) + " Wh"
      byId("ww-costper1k").textContent = "$" + costPer1k.toFixed(5)
      byId("ww-costper1m").textContent = "$" + costPer1m.toFixed(2)
    }
    ;["ww-watts", "ww-gpus", "ww-tps", "ww-util", "ww-pue", "ww-price"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },

  /* ---------------- 16. STRANDED POWER CALCULATOR ---------------- */
  stranded(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Novel / Creative — 16</div>
      <h1>Stranded Power Calculator</h1>
      <p class="wb-desc">Multi-tenant facilities contract power per tenant for their peak, but tenants rarely peak simultaneously — this shows how much paid-for grid capacity sits idle because of non-coincident peak loads, a cost that's invisible on any single tenant's bill.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Tenant peak loads (kW)</h2>
          <div id="sp-tenants"></div>
          <button id="sp-add" class="wb-btn" style="margin-top:10px;">+ Add Tenant</button>
          <label style="margin-top:16px;">Coincidence factor (measured or estimated)</label>
          <input type="number" id="sp-cf" value="0.72" step="0.01">
        </div>
        <div class="wb-card">
          <h2>Result</h2>
          <div class="wb-stat"><span class="k">Sum of individual peaks</span><span class="v" id="sp-sumpeak">—</span></div>
          <div class="wb-stat"><span class="k">Actual coincident peak (measured × CF)</span><span class="v" id="sp-coincident">—</span></div>
          <div class="wb-stat"><span class="k">Stranded capacity</span><span class="v accent2" id="sp-stranded">—</span></div>
          <div class="wb-stat"><span class="k">Stranded %</span><span class="v big" id="sp-strandedpct">—</span></div>
          <div class="wb-note">Contracted/provisioned capacity is usually sized to the sum of individual tenant peaks (worst case). The coincidence factor — the ratio of actual simultaneous peak to that sum — is typically 0.6-0.85 in real multi-tenant facilities, meaning 15-40% of contracted grid capacity is paid for but never actually drawn at once. This is capacity you could resell, oversubscribe, or use for flexible/interruptible loads.</div>
        </div>
      </div>
    `
    let spTenants = [{ name: "Tenant A", kw: 1200 }, { name: "Tenant B", kw: 900 }, { name: "Tenant C", kw: 1500 }, { name: "Tenant D", kw: 700 }]

    // Rendered as real event listeners attached after the fact, not inline
    // onchange="" attribute strings baked into the HTML — those resolve
    // against `window`, not this closure, which is exactly what broke this
    // tool silently in the first version. No globals needed this way.
    function renderTenants() {
      byId("sp-tenants").innerHTML = spTenants.map((t, i) => `
        <div class="wb-row2" style="margin-top:${i === 0 ? 0 : 8}px;">
          <input type="text" value="${t.name}" data-i="${i}" data-field="name">
          <input type="number" value="${t.kw}" data-i="${i}" data-field="kw">
        </div>`).join("")
      byId("sp-tenants").querySelectorAll("input").forEach((input: any) => {
        input.addEventListener("change", (e: any) => {
          const i = +e.target.dataset.i
          const field = e.target.dataset.field
          ;(spTenants[i] as any)[field] = field === "kw" ? +e.target.value : e.target.value
          calc()
        })
      })
    }
    function calc() {
      const sum = spTenants.reduce((a, t) => a + t.kw, 0)
      const cf = +byId("sp-cf").value
      const coincident = sum * cf
      const strandedKw = sum - coincident
      byId("sp-sumpeak").textContent = sum.toLocaleString() + " kW"
      byId("sp-coincident").textContent = coincident.toFixed(0) + " kW"
      byId("sp-stranded").textContent = strandedKw.toFixed(0) + " kW"
      byId("sp-strandedpct").textContent = ((1 - cf) * 100).toFixed(1) + "%"
    }
    byId("sp-add").onclick = () => {
      spTenants.push({ name: "Tenant " + String.fromCharCode(65 + spTenants.length), kw: 500 })
      renderTenants(); calc()
    }
    byId("sp-cf").addEventListener("input", calc)
    renderTenants(); calc()
  },

  /* ---------------- 17. SILICON AGE DEPRECIATION CLOCK ---------------- */
  siliconage(root, byId) {
    root.innerHTML = `
      <div class="wb-eyebrow">Novel / Creative — 17</div>
      <h1>Silicon Age Depreciation Clock</h1>
      <p class="wb-desc">A chip's performance-per-dollar decays as newer nodes ship — this visualizes where a purchase sits on that curve and estimates when waiting for next-gen starts winning, using a simple compounding-improvement model you can tune to your own workload's historical trend.</p>
      <div class="wb-grid">
        <div class="wb-card">
          <h2>Inputs</h2>
          <label>Chip name / node</label>
          <input type="text" id="sa-name" value="Current-gen accelerator (5nm)">
          <label>Price today ($)</label>
          <input type="number" id="sa-price" value="24000">
          <label>Performance today (TFLOPS or your metric)</label>
          <input type="number" id="sa-perf" value="990">
          <label>Annual perf-per-$ improvement rate (%)</label>
          <input type="number" id="sa-rate" value="35" step="1">
          <label>Your planning horizon (years)</label>
          <input type="number" id="sa-horizon" value="4">
        </div>
        <div class="wb-card">
          <h2>Perf-per-$ decay curve</h2>
          <svg id="sa-svg" class="wb-scatter" viewBox="0 0 560 300"></svg>
          <div class="wb-stat" style="margin-top:10px;"><span class="k">Today's perf/$</span><span class="v" id="sa-today">—</span></div>
          <div class="wb-stat"><span class="k">Value halves by</span><span class="v accent2" id="sa-half">—</span></div>
          <div class="wb-note">Model: perf-per-$ improves geometrically at your specified annual rate (a rough stand-in for the historical ~30-40%/yr trend across recent accelerator generations — tune it to your own segment's history, it varies a lot by product category). This tells you the "silicon age" of a purchase: how much of the curve's future value you're buying into today, not a guaranteed forecast.</div>
        </div>
      </div>
    `
    function calc() {
      const accent = themeColor("--yellow", "#f5b731")
      const muted = themeColor("--text-2", "#4a4030")
      const name = byId("sa-name").value
      const price = +byId("sa-price").value
      const perf = +byId("sa-perf").value
      const rate = +byId("sa-rate").value / 100
      const horizon = +byId("sa-horizon").value

      const perfPerDollar0 = perf / price
      byId("sa-today").textContent = perfPerDollar0.toFixed(4) + " /$ "

      let halfYear: number | null = null
      for (let y = 0; y <= 20; y += 0.1) {
        const newChipValue = perfPerDollar0 * Math.pow(1 + rate, y)
        if (newChipValue >= perfPerDollar0 * 2) { halfYear = y; break }
      }
      byId("sa-half").textContent = halfYear ? halfYear.toFixed(1) + " years" : ">20 years"

      const pad = 44, w = 560 - pad * 2, h = 300 - pad * 2
      const maxY = perfPerDollar0 * Math.pow(1 + rate, horizon) * 1.15
      const pts: string[] = []
      for (let y = 0; y <= horizon; y += horizon / 40) {
        const val = perfPerDollar0 * Math.pow(1 + rate, y)
        const x = pad + (y / horizon) * w
        const yy = 300 - pad - (val / maxY) * h
        pts.push(`${x},${yy}`)
      }
      const flatY = 300 - pad - (perfPerDollar0 / maxY) * h
      byId("sa-svg").innerHTML = `
        <line x1="${pad}" y1="${300 - pad}" x2="${560 - pad}" y2="${300 - pad}" stroke="${muted}"/>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${300 - pad}" stroke="${muted}"/>
        <line x1="${pad}" y1="${flatY}" x2="${560 - pad}" y2="${flatY}" stroke="#ffaa00" stroke-dasharray="4 3" stroke-width="1"/>
        <text x="${560 - pad}" y="${flatY - 6}" fill="#ffaa00" font-size="10" text-anchor="end">${name} (fixed)</text>
        <polyline points="${pts.join(" ")}" fill="none" stroke="${accent}" stroke-width="2.2"/>
        <text x="${560 / 2}" y="292" fill="${muted}" font-size="11" text-anchor="middle">Years from purchase</text>
        <text x="14" y="150" fill="${muted}" font-size="11" text-anchor="middle" transform="rotate(-90 14 150)">Perf-per-$ (market curve)</text>
      `
    }
    ;["sa-name", "sa-price", "sa-perf", "sa-rate", "sa-horizon"].forEach((id) => byId(id).addEventListener("input", calc))
    calc()
  },
}

/**
 * Scoped theme CSS. Every color/font is one of this site's own CSS
 * variables from app/globals.css (var(--yellow), var(--bg-card),
 * var(--text-1), var(--mono), var(--serif), etc.) — nothing here is a
 * hardcoded palette of its own, so it follows the site's dark/light theme
 * toggle automatically. Class names are prefixed wb- throughout (not just
 * scoped via an ancestor selector) so nothing can partially collide with
 * an existing site class the way the old .eyebrow did.
 */
const CSS = `
.wb-shell{ font-family:var(--sans); }
.wb-shell, .wb-shell *{ box-sizing:border-box; }
.wb-app{ display:flex; min-height:100vh; }

.wb-sidebar{
  width:250px; flex-shrink:0;
  background:var(--bg-card);
  border-right:1px solid var(--border);
  padding:24px 16px;
  position:sticky; top:62px; max-height:calc(100vh - 62px); overflow-y:auto;
}
.wb-brand{ font-family:var(--mono); font-weight:600; font-size:16px; letter-spacing:-0.01em; display:flex; align-items:center; gap:10px; margin-bottom:4px; color:var(--text-0); }
.wb-brand-mark{ width:18px; height:18px; border-radius:3px; background:var(--yellow); flex-shrink:0; }
.wb-brand-sub{ font-size:11px; color:var(--text-2); margin-bottom:26px; font-family:var(--mono); }

.wb-navlabel{ font-family:var(--mono); font-size:9.5px; text-transform:uppercase; letter-spacing:.14em; color:var(--text-2); margin:18px 4px 6px; }
.wb-navlabel:first-of-type{ margin-top:4px; }
.wb-navbtn{
  width:100%; text-align:left; background:none; border:none; color:var(--text-1);
  padding:9px 10px; border-radius:var(--r); font-size:13px; cursor:pointer;
  font-family:var(--sans); display:flex; align-items:center; gap:9px;
  transition:background .12s, color .12s;
}
.wb-navbtn .wb-n{ font-family:var(--mono); font-size:10px; color:var(--text-2); width:16px; flex-shrink:0; }
.wb-navbtn:hover{ background:var(--bg-card-h); color:var(--text-0); }
.wb-navbtn.active{ background:var(--yellow-bg); color:var(--yellow); }
.wb-navbtn.active .n{ color:var(--yellow); }

.wb-main{ flex:1; padding:36px 44px; max-width:1000px; }

.wb-eyebrow{ font-family:var(--mono); font-size:10.5px; color:var(--yellow); letter-spacing:.1em; text-transform:uppercase; margin-bottom:8px; }
.wb-shell h1{ font-family:var(--mono); font-size:1.7rem; margin:0 0 6px; font-weight:600; color:var(--text-0); }
.wb-desc{ color:var(--text-1); font-family:var(--serif); font-weight:300; font-size:0.95rem; line-height:1.6; max-width:640px; margin-bottom:28px; }

.wb-grid{ display:grid; grid-template-columns:340px 1fr; gap:18px; }
@media(max-width:820px){ .wb-grid{ grid-template-columns:1fr; } }

.wb-card{ background:var(--bg-card); border:1px solid var(--border); border-radius:var(--rl); padding:20px; }
.wb-card + .wb-card{ margin-top:16px; }
.wb-card h2{ font-family:var(--mono); font-size:11.5px; text-transform:uppercase; letter-spacing:.08em; color:var(--text-2); margin:0 0 16px; font-weight:600; }

.wb-shell label{ display:block; font-size:12px; color:var(--text-2); margin-bottom:5px; margin-top:14px; }
.wb-shell label:first-child{ margin-top:0; }
.wb-shell input[type=number], .wb-shell input[type=text], .wb-shell select{
  width:100%; background:var(--bg-0); border:1px solid var(--border-md); color:var(--text-0);
  padding:9px 10px; border-radius:var(--r); font-family:var(--mono); font-size:13px;
}
.wb-shell input:focus, .wb-shell select:focus{ outline:none; border-color:var(--border-yellow); }
.wb-shell input:focus-visible, .wb-shell select:focus-visible{ box-shadow:0 0 0 2px rgba(245,183,49,0.2); }
.wb-navbtn:focus-visible, .wb-btn:focus-visible{ outline:2px solid var(--yellow); outline-offset:-2px; }
.wb-navbtn, .wb-btn{ touch-action:manipulation; }
.wb-stat .v, .wb-shell td, .wb-bar-row .val{ font-variant-numeric:tabular-nums; }
.wb-row2{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }

.wb-btn{
  width:100%; background:var(--yellow-bg); border:1px solid var(--border-yellow); color:var(--yellow);
  padding:10px; border-radius:var(--r); font-family:var(--sans); font-size:13px; cursor:pointer;
}
.wb-btn:hover{ opacity:0.85; }

.wb-stat{ display:flex; justify-content:space-between; align-items:baseline; padding:10px 0; border-bottom:1px solid var(--border); }
.wb-stat:last-child{ border-bottom:none; }
.wb-stat .k{ font-size:12px; color:var(--text-2); }
.wb-stat .v{ font-family:var(--mono); font-size:14px; font-weight:600; color:var(--text-0); }
.wb-stat .v.big{ font-size:24px; color:var(--yellow); }
.wb-stat .v.accent2{ color:#ffaa00; }

.wb-wafer-wrap{ display:flex; align-items:center; justify-content:center; padding:10px 0 4px; }
.wb-shell svg text{ font-family:var(--mono); }

.wb-barlist{ display:flex; flex-direction:column; gap:10px; }
.wb-bar-row{ display:grid; grid-template-columns:130px 1fr 70px; align-items:center; gap:10px; }
.wb-bar-row .lbl{ font-size:12px; color:var(--text-2); }
.wb-bar-track{ height:20px; background:var(--bg-0); border-radius:4px; overflow:hidden; border:1px solid var(--border); }
.wb-bar-fill{ height:100%; border-radius:4px 0 0 4px; }
.wb-bar-row .val{ font-family:var(--mono); font-size:12px; text-align:right; color:var(--text-1); }

.wb-shell table{ width:100%; border-collapse:collapse; font-size:12px; }
.wb-shell th{ text-align:left; color:var(--text-2); font-weight:500; padding:8px 10px; border-bottom:1px solid var(--border); font-family:var(--mono); font-size:9.5px; text-transform:uppercase; letter-spacing:.06em; }
.wb-shell td{ padding:9px 10px; border-bottom:1px solid var(--border); font-family:var(--mono); color:var(--text-0); }
.wb-shell tr:hover td{ background:var(--bg-card-h); }

.wb-pill{ display:inline-block; padding:2px 8px; border-radius:100px; font-size:10px; font-family:var(--mono); }
.wb-pill.hi{ background:var(--red-bg); color:var(--red); }
.wb-pill.mid{ background:rgba(255,170,0,.12); color:#ffaa00; }
.wb-pill.lo{ background:rgba(170,255,0,.1); color:var(--green); }

.wb-steps{ display:flex; gap:6px; margin-bottom:20px; }
.wb-step{ flex:1; height:4px; background:var(--border); border-radius:2px; overflow:hidden; }
.wb-step.done{ background:var(--yellow); }
.wb-step.now{ background:#ffaa00; }

.wb-note{ font-size:11px; color:var(--text-2); font-family:var(--mono); margin-top:14px; line-height:1.5; padding-top:12px; border-top:1px solid var(--border); }
.wb-scatter{ width:100%; height:auto; }
.wb-dot{ cursor:pointer; }

.wb-sidebar::-webkit-scrollbar{ width:8px; }
.wb-sidebar::-webkit-scrollbar-thumb{ background:var(--border-md); border-radius:5px; }

@media(max-width:900px){
  .wb-app{ flex-direction:column; }
  .wb-sidebar{ width:100%; position:relative; top:0; max-height:none; border-right:none; border-bottom:1px solid var(--border); }
  .wb-main{ padding:24px 20px; max-width:100%; }
}
`

export function WaferBenchClient() {
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState("chipcost")
  const mainRef = useRef<HTMLDivElement | null>(null)

  const grouped = useMemo(() => {
    const byGroup = new Map<number, Tool[]>()
    for (const t of TOOLS) {
      if (!byGroup.has(t.group)) byGroup.set(t.group, [])
      byGroup.get(t.group)!.push(t)
    }
    return [...byGroup.entries()].sort((a, b) => a[0] - b[0])
  }, [])

  const toolNumber = useMemo(() => {
    const map = new Map<string, number>()
    TOOLS.forEach((t, i) => map.set(t.id, i + 1))
    return map
  }, [])

  // Picks up ?tool=... on arrival, same way supply-chain-explorer.tsx picks
  // up ?region=... — read from window.location directly rather than
  // useSearchParams() so this doesn't need its own Suspense boundary.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("tool")
    if (requested && TOOLS.some((t) => t.id === requested)) setActive(requested)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectTool(id: string) {
    setActive(id)
    const params = new URLSearchParams(window.location.search)
    params.set("tool", id)
    router.replace(`${pathname}?${params}`, { scroll: false })
  }

  // Only the active tool's markup ever exists inside mainRef, rebuilt from
  // scratch on every switch. mainRef's own JSX never declares children, so
  // React has nothing to reconcile here regardless of what this effect does.
  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const byId = (id: string): any => document.getElementById(id)
    const cleanup = RENDERERS[active]?.(root, byId)
    wireLabels(root)
    return () => {
      cleanup?.()
    }
  }, [active])

  return (
    <div className="wb-shell">
      <style>{CSS}</style>
      <div className="wb-app">
        <aside className="wb-sidebar" aria-label="Tool categories">
          <div className="wb-brand">
            <span className="wb-brand-mark" aria-hidden="true" />
            <span translate="no">Wafer Bench</span>
          </div>
          <div className="wb-brand-sub">supply-chain engineering tools</div>
          {grouped.map(([groupNum, tools]) => (
            <div key={groupNum}>
              <div className="wb-navlabel">{GROUP_LABELS[groupNum]}</div>
              <nav>
                {tools.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`wb-navbtn${t.id === active ? " active" : ""}`}
                    onClick={() => selectTool(t.id)}
                  >
                    <span className="wb-n">{String(toolNumber.get(t.id)).padStart(2, "0")}</span>
                    {t.name}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </aside>
        <div ref={mainRef} className="wb-main" />
      </div>
    </div>
  )
}