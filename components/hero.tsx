"use client"

import { useState, useEffect, useRef } from "react"

// ─── GLSL shaders (preserved exactly from hero) ───────────────────────────
const VERT = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv          = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = `
  uniform float uTime;
  uniform vec3  uColor;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float circuit(vec2 uv, float scale) {
    vec2 g = floor(uv*scale); vec2 fr = fract(uv*scale);
    float h = hash(g);
    float ln = (h > 0.5) ? step(0.47,fr.y)*(1.0-step(0.53,fr.y)) : step(0.47,fr.x)*(1.0-step(0.53,fr.x));
    float d = step(0.88, 1.0 - length(fr-0.5)*2.1);
    return max(ln,d);
  }
  void main() {
    vec3 vd = normalize(cameraPosition - vWorldPos);
    float rim = pow(1.0 - max(dot(vWorldNormal, vd), 0.0), 2.5);
    float c = max(circuit(vUv,22.0), circuit(vUv,11.0)*0.5);
    float py = fract(vUv.y*3.0 - uTime*0.18);
    float pulse = smoothstep(0.0,0.04,py)*smoothstep(0.12,0.06,py)*0.7;
    float lat = smoothstep(0.85,1.0, sin(vUv.y*3.14159*10.0+uTime*1.2)*0.5+0.5)*0.14;
    vec3 col = uColor*0.06 + uColor*c*0.48 + uColor*pulse + uColor*lat + vec3(1.0)*rim*0.38;
    gl_FragColor = vec4(col, 0.60 + c*0.28 + rim*0.38);
  }
`

// ─── Data ─────────────────────────────────────────────────────────────────
const TIERS = [
  { id:1, label:"FABLESS",    color:"#f5b731", radius:1.60, speed:0.0070, incDeg: 0,  cos:["NVIDIA","AMD","QUALCOMM","MEDIATEK"] },
  { id:2, label:"FOUNDRIES",  color:"#ff6b35", radius:1.88, speed:0.0062, incDeg:15,  cos:["TSMC","SAMSUNG","GLOBALFOUNDRIES","SMIC"] },
  { id:3, label:"EQUIPMENT",  color:"#4ecdc4", radius:2.14, speed:0.0055, incDeg:30,  cos:["ASML","LAM RESEARCH","APPLIED MATERIALS","TEL"] },
  { id:4, label:"SUBSYSTEMS", color:"#45b7d1", radius:2.40, speed:0.0048, incDeg:45,  cos:["ENTEGRIS","CMC MATERIALS","CABOT MICRO","BROOKS"] },
  { id:5, label:"COMPONENTS", color:"#7bed9f", radius:2.66, speed:0.0042, incDeg:60,  cos:["MURATA","TDK","YAGEO","KYOCERA"] },
  { id:6, label:"MATERIALS",  color:"#a29bfe", radius:2.92, speed:0.0036, incDeg:75,  cos:["SHIN-ETSU","SUMCO","AIR PRODUCTS","JSR"] },
  { id:7, label:"MINING",     color:"#fd79a8", radius:3.18, speed:0.0030, incDeg:90,  cos:["MP MATERIALS","LYNAS RARE EARTHS","ALBEMARLE","SQM"] },
]

const NODE_LOG = [
  { date:"20260624", text:"TSMC 1.4nm process node enters risk production phase" },
  { date:"20260618", text:"ASML EUV shipments resume to South Korean fabs" },
  { date:"20260612", text:"Rare earth export restrictions lifted for allied partners" },
  { date:"20260605", text:"NVIDIA Blackwell Ultra volume production confirmed" },
  { date:"20260528", text:"Samsung Gate-All-Around yield crosses 60% threshold" },
  { date:"20260521", text:"SMIC advanced node capacity expansion approved" },
  { date:"20260514", text:"Intel 18A enters high-volume manufacturing at Hillsboro" },
  { date:"20260507", text:"Helium supply disruption affects 23 equipment vendors" },
  { date:"20260430", text:"Tokyo Electron new EUV clean track system unveiled" },
  { date:"20260422", text:"Entegris CMP slurry shortage resolved after 6-week delay" },
]

// ─── Design tokens ────────────────────────────────────────────────────────
const BG      = "#08080f"
const ACCENT  = "#f5b731"
const TEXT    = "#e8e4dc"
const DIM     = "rgba(232,228,220,0.28)"
const DIMMER  = "rgba(232,228,220,0.10)"
const MONO    = "'JetBrains Mono','Fira Code','Cascadia Code','Consolas','Monaco','Courier New',monospace"

// ─── Global CSS ───────────────────────────────────────────────────────────
const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;overflow-x:hidden;background:${BG}}
  a{text-decoration:none;color:inherit;cursor:pointer}

  @keyframes marquee {from{transform:translateX(0)} to{transform:translateX(-50%)}}
  @keyframes pulse   {0%,100%{opacity:.2} 50%{opacity:.75}}
  @keyframes blink   {0%,100%{opacity:1}  50%{opacity:0}}

  .rv {
    opacity:0;
    transform:translateY(24px);
    transition:opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
  }
  .rv.on { opacity:1; transform:none; }

  .tier-row { cursor:default; transition:background .18s; }
  .tier-row:hover { background:rgba(255,255,255,.025); }
  .tier-accent {
    position:absolute; left:0; top:0; bottom:0; width:2px;
    opacity:0; transition:opacity .18s;
  }
  .tier-row:hover .tier-accent { opacity:1; }

  .log-row { transition:background .18s; }
  .log-row:hover { background:rgba(245,183,49,.04); }

  .cta-btn {
    display:inline-block;
    padding:.65rem 1.5rem;
    font-size:.58rem;
    letter-spacing:.18em;
    font-family:${MONO};
    transition:all .18s;
  }
  .cta-btn-primary {
    background:${ACCENT}; color:${BG}; border:1px solid ${ACCENT}; font-weight:700;
  }
  .cta-btn-primary:hover { background:#ffd060; border-color:#ffd060; }
  .cta-btn-ghost {
    background:transparent; color:${DIM}; border:1px solid rgba(232,228,220,.18);
  }
  .cta-btn-ghost:hover { color:${TEXT}; border-color:rgba(232,228,220,.4); }

  @media(max-width:640px){
    .hero-stats-right{display:none!important}
    .tier-cos{display:none!important}
    .hero-tier-dots{display:none!important}
    .manifesto{font-size:clamp(1.2rem,5vw,2.2rem)!important}
    .log-grid{grid-template-columns:1fr!important}
  }
`

// ─── Main component ───────────────────────────────────────────────────────
export function Hero() {
  // Added standard typing for the HTML5 canvas element reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [count, setCount]   = useState(0)
  const [blink, setBlink]   = useState(true)

  // Load JetBrains Mono
  useEffect(() => {
    const link = document.createElement("link")
    link.rel  = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700;800&display=swap"
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(id)
  }, [])

  // Counter 0 → 700
  useEffect(() => {
    let raf: number
    const t0 = performance.now()
    const run = (now: number) => {
      const t = Math.min((now - t0) / 2200, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 700))
      if (t < 1) raf = requestAnimationFrame(run)
    }
    const timer = setTimeout(() => { raf = requestAnimationFrame(run) }, 400)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [])

  // IntersectionObserver for .rv reveals
  useEffect(() => {
    const els = document.querySelectorAll(".rv")
    if (!els.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on") }),
      { threshold: 0.07 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // FIXED: Explicitly typed 'cleanup' to handle async assignment cleanly
    let cleanup: (() => void) | undefined;
    
    ;(async () => {
      const THREE = await import("three")

      const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      R.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      R.setSize(canvas.offsetWidth, canvas.offsetHeight)
      R.setClearColor(0x08080f, 1)

      const scene  = new THREE.Scene()
      const cam    = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
      cam.position.set(0, 0, 7)
      const clock  = new THREE.Clock()

      // Circuit-board sphere
      const sGeo = new THREE.SphereGeometry(1, 128, 128)
      const sMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value:0 }, uColor: { value: new THREE.Color(ACCENT) } },
        vertexShader: VERT, fragmentShader: FRAG, transparent: true,
      })
      const sphere = new THREE.Mesh(sGeo, sMat)
      scene.add(sphere)

      // Wireframe cage
      const cage = new THREE.Mesh(
        new THREE.SphereGeometry(1.828, 32, 32),
        new THREE.MeshBasicMaterial({ color:0xf5b731, wireframe:true, transparent:true, opacity:0.045 })
      )
      scene.add(cage)

      // Core glow layers
      ;[{ r:.38, a:.55 }, { r:.58, a:.22 }, { r:.78, a:.09 }].forEach(({ r, a }) =>
        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(r, 32, 32),
          new THREE.MeshBasicMaterial({ color:0xf5b731, side:THREE.BackSide, transparent:true, opacity:a })
        ))
      )

      // Star field
      const sp = new Float32Array(4500 * 3)
      for (let i = 0; i < sp.length; i++) sp[i] = (Math.random() - 0.5) * 90
      const sg = new THREE.BufferGeometry()
      sg.setAttribute("position", new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color:0xffffff, size:0.032, transparent:true, opacity:0.55 })))

      // Orbital rings (armillary sphere)
      const rings = TIERS.map(tier => {
        const inc = (tier.incDeg * Math.PI) / 180
        const N = 200, pos = new Float32Array(N * 3)
        for (let j = 0; j < N; j++) {
          const th = (j / N) * Math.PI * 2
          pos[j*3]   =  Math.cos(th) * tier.radius
          pos[j*3+1] = -Math.sin(th) * Math.sin(inc) * tier.radius
          pos[j*3+2] =  Math.sin(th) * Math.cos(inc) * tier.radius
        }
        const g = new THREE.BufferGeometry()
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
        const m = new THREE.Points(g, new THREE.PointsMaterial({
          color:new THREE.Color(tier.color), size: tier.id===1 ? 0.055 : 0.040,
          transparent:true, opacity:0.88,
          blending:THREE.AdditiveBlending, depthWrite:false,
        }))
        scene.add(m)
        return { m, speed:tier.speed }
      })

      // Lighting
      scene.add(new THREE.AmbientLight(0x111122, 0.4))
      const lA = new THREE.PointLight(0xf5b731, 2.5, 12); lA.position.set(3,2,4);   scene.add(lA)
      const lB = new THREE.PointLight(0x0066ff, 2.0, 12); lB.position.set(-3,-2,3); scene.add(lB)

      // Mouse parallax
      let mx=0, my=0, cx=0, cy=0
      const onMM = (e: MouseEvent) => { mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2 }
      const onRz = () => {
        const w=canvas.offsetWidth, h=canvas.offsetHeight
        R.setSize(w,h); cam.aspect=w/h; cam.updateProjectionMatrix()
      }
      window.addEventListener("mousemove", onMM)
      window.addEventListener("resize",    onRz)

      let aid: number
      const anim = () => {
        aid = requestAnimationFrame(anim)
        const t = clock.getElapsedTime()
        sphere.rotation.y = t * 0.08
        sMat.uniforms.uTime.value = t
        cage.rotation.x = t * 0.042; cage.rotation.y = t * 0.066
        rings.forEach(({ m, speed }) => { m.rotation.y += speed })
        lA.position.x = Math.cos(t*.48)*4.5; lA.position.z = Math.sin(t*.48)*4.5
        lB.position.x = -Math.cos(t*.48)*4.5; lB.position.z = -Math.sin(t*.48)*4.5
        cx += (mx*.56 - cx)*.04; cy += (-my*.30 - cy)*.04
        cam.position.x=cx; cam.position.y=cy; cam.lookAt(0,0,0)
        R.render(scene, cam)
      }
      anim()

      cleanup = () => {
        cancelAnimationFrame(aid)
        window.removeEventListener("mousemove", onMM)
        window.removeEventListener("resize",    onRz)
        R.dispose(); sGeo.dispose(); sMat.dispose()
      }
    })().catch(console.error)
    return () => cleanup?.()
  }, [])

  // Doubled for seamless marquee
  const T2 = [...TIERS, ...TIERS]

  const Dot = ({ color, size=6 }: { color: string; size?: number }) => (
    <span style={{ display:"inline-block", width:size, height:size, borderRadius:"50%", background:color, boxShadow:`0 0 8px ${color}`, flexShrink:0 }} />
  )

  const Divider = ({ delay="0s" }: { delay?: string }) => (
    <div style={{ height:1, margin:"0 2.5rem", background:`linear-gradient(90deg,transparent,${ACCENT},transparent)`, opacity:.18, animation:`pulse 5s ${delay} ease-in-out infinite` }} />
  )

  return (
    <div style={{ background:BG, color:TEXT, fontFamily:MONO, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ── Global CRT scanline layer ───────────────────────────── */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:500,
        backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.032) 2px,rgba(0,0,0,0.032) 4px)", opacity:.7 }}
        aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════════
          NAV — sticky, minimal
       ════════════════════════════════════════════════════════════ */}
      <nav style={{
        position:"sticky", top:0, zIndex:400,
        padding:"1.3rem 2rem",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        background:"rgba(8,8,15,.82)", backdropFilter:"blur(10px)",
        borderBottom:`1px solid ${DIMMER}`,
      }}>
        <div style={{ fontSize:".62rem", letterSpacing:".22em", color:ACCENT, fontWeight:700, opacity:.95 }}>
          BEAMED SILICON
        </div>
        <div style={{ display:"flex", gap:"2.4rem" }}>
          {["TIERS","MARKETS","COMPANIES","INTEL"].map(l => (
            <a key={l} href="#" style={{ fontSize:".55rem", letterSpacing:".18em", color:DIM, transition:"color .18s" }}
              onMouseEnter={e=>(e.target as HTMLAnchorElement).style.color=ACCENT}
              onMouseLeave={e=>(e.target as HTMLAnchorElement).style.color=DIM}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO — Three.js canvas, full viewport
       ════════════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", width:"100%", height:"calc(100vh - 50px)", overflow:"hidden" }}>
        <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} aria-hidden="true" />

        {/* Corner readouts */}
        <div style={{ position:"absolute", top:"1.2rem", left:"1.5rem", fontSize:".6rem", letterSpacing:".08em", opacity:.4, color:ACCENT, zIndex:3 }}>
          SYS:SILICON-INTELLIGENCE-v2026.06
        </div>
        <div style={{ position:"absolute", bottom:"1.2rem", right:"1.5rem", fontSize:".6rem", letterSpacing:".08em", opacity:.4, color:ACCENT, zIndex:3 }}>
          NODE:ACTIVE · TIERS:7/7
        </div>

        {/* Left vertical label */}
        <div style={{ position:"absolute", left:"1.2rem", top:"50%", transform:"translateX(-50%) translateY(-50%) rotate(-90deg)", fontSize:".55rem", letterSpacing:".22em", opacity:.3, color:ACCENT, whiteSpace:"nowrap", zIndex:3 }}>
          SUPPLY CHAIN INTELLIGENCE
        </div>

        {/* Main headline content */}
        <div style={{ position:"relative", zIndex:2, width:"100%", height:"100%", display:"flex", alignItems:"center", padding:"0 5vw" }}>
          <div>
            <h1 style={{ fontSize:"clamp(44px,6.8vw,96px)", fontWeight:900, lineHeight:.92, letterSpacing:"-.03em" }}>
              {["EVERY TIER","OF THE","SILICON","UNIVERSE"].map(w => (
                <span key={w} style={{ display:"block" }}>{w}</span>
              ))}
            </h1>
            <p style={{ marginTop:"2rem", fontSize:"clamp(.7rem,1.1vw,.9rem)", letterSpacing:".06em", color:"rgba(232,228,220,.48)", maxWidth:420, lineHeight:1.75, fontWeight:300 }}>
              700 companies mapped across 7 supply chain tiers — from rare-earth mining to finished silicon. Track capital, risk, and innovation across the full semiconductor stack.
            </p>
            <div style={{ marginTop:"2.4rem", display:"flex", gap:".8rem", flexWrap:"wrap" }}>
              <a href="#" className="cta-btn cta-btn-primary">Explore Companies</a>
              <a href="#" className="cta-btn cta-btn-ghost">Markets</a>
              <a href="#" className="cta-btn cta-btn-ghost">Products</a>
            </div>
          </div>
        </div>

        {/* Stats — right side */}
        <div className="hero-stats-right" style={{ position:"absolute", right:"2.5rem", top:"50%", transform:"translateY(-50%)", zIndex:2, display:"flex", flexDirection:"column", gap:"2rem" }}>
          {[[count,"COMPANIES"],["7","TIERS"],["32+","COUNTRIES"],["24/7","FREQUENCY"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"right" }}>
              <div style={{ fontSize:"clamp(1.2rem,2.5vw,2rem)", fontWeight:700, letterSpacing:"-.02em" }}>{n}</div>
              <div style={{ fontSize:".5rem", letterSpacing:".2em", color:DIM, marginTop:".2rem" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tier ring indicators — bottom center */}
        <div className="hero-tier-dots" style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"1.4rem", zIndex:3, flexWrap:"wrap", justifyContent:"center" }}>
          {TIERS.map(tier => (
            <div key={tier.id} style={{ display:"flex", alignItems:"center", gap:".4rem", fontSize:".58rem", letterSpacing:".1em", opacity:.7 }}>
              <Dot color={tier.color} />
              {tier.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TICKER — Haraguchi-style scrolling tier strip
       ════════════════════════════════════════════════════════════ */}
      <div style={{ overflow:"hidden", borderTop:`1px solid rgba(245,183,49,.14)`, borderBottom:`1px solid rgba(245,183,49,.14)`, background:"rgba(0,0,0,.25)", padding:".7rem 0", userSelect:"none" }}>
        <div style={{ display:"flex", width:"max-content", animation:"marquee 32s linear infinite" }}>
          {T2.map((tier, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:".8rem", padding:"0 3rem", fontSize:".6rem", letterSpacing:".22em", color:DIM, whiteSpace:"nowrap" }}>
              <Dot color={tier.color} size={5} />
              <span style={{ color:ACCENT, opacity:.5 }}>T{String(tier.id).padStart(2,"0")}</span>
              <span>—</span>
              <span>{tier.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          THE NUMBER — Haraguchi portrait-scale statement
       ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"14vh 8vw 10vh", minHeight:"65vh", display:"flex", alignItems:"center" }}>
        <div className="rv" style={{ width:"100%" }}>
          <div style={{ fontSize:".52rem", letterSpacing:".32em", color:ACCENT, opacity:.65, marginBottom:"2.4rem" }}>
            INTELLIGENCE SCOPE · 2026
          </div>
          <div style={{ fontSize:"clamp(6rem,17vw,16rem)", fontWeight:800, lineHeight:.84, letterSpacing:"-.045em", color:TEXT, marginBottom:"1.4rem" }}>
            {count}
          </div>
          <div style={{ fontSize:"clamp(1rem,2.6vw,2.8rem)", fontWeight:300, letterSpacing:".04em", color:DIM, lineHeight:1.2 }}>
            COMPANIES MAPPED<br />ACROSS THE FULL STACK
          </div>
          <div style={{ display:"flex", gap:"4rem", marginTop:"5rem", flexWrap:"wrap" }}>
            {[["7","TIERS"],["32+","COUNTRIES"],["$4.2T","MARKET CAP TRACKED"],["24/7","DATA FREQUENCY"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontSize:"clamp(1.4rem,3.2vw,3.2rem)", fontWeight:700, lineHeight:1, letterSpacing:"-.02em" }}>{v}</div>
                <div style={{ fontSize:".52rem", letterSpacing:".22em", color:DIM, marginTop:".5rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider delay=".5s" />

      {/* ═══════════════════════════════════════════════════════════
          MANIFESTO — editorial statement at fearless scale
       ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"12vh 8vw", display:"flex", alignItems:"center" }}>
        <p className="rv manifesto" style={{
          maxWidth:1000, fontSize:"clamp(1.3rem,3vw,3.6rem)",
          fontWeight:300, lineHeight:1.15, letterSpacing:".01em",
          color:"rgba(232,228,220,.46)",
        }}>
          THE SEMICONDUCTOR STACK IS THE{" "}
          <span style={{ color:TEXT, fontWeight:700 }}>MOST COMPLEX SUPPLY CHAIN</span>{" "}
          IN HUMAN HISTORY.{" "}
          <span style={{ color:ACCENT }}>SEVEN LAYERS. THIRTY-TWO COUNTRIES.</span>{" "}
          TRACKED IN REAL TIME.
        </p>
      </section>

      <Divider delay="1s" />

      {/* ═══════════════════════════════════════════════════════════
          TIERS — raw tabular breakdown
       ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"10vh 6vw 12vh" }}>
        {/* Section header */}
        <div className="rv" style={{ display:"flex", alignItems:"center", gap:"1.4rem", marginBottom:"3.5rem" }}>
          <span style={{ fontSize:".52rem", letterSpacing:".28em", color:ACCENT, opacity:.65, flexShrink:0 }}>SUPPLY CHAIN TIERS</span>
          <div style={{ flex:1, height:1, background:DIMMER }} />
        </div>

        {TIERS.map((tier, i) => (
          <div key={tier.id} className="rv tier-row" style={{
            display:"grid", gridTemplateColumns:"2.8rem 1fr auto",
            alignItems:"center", gap:"1.5rem 2.5rem",
            padding:"1.7rem 1rem 1.7rem 0", borderBottom:`1px solid ${DIMMER}`,
            position:"relative", transitionDelay:`${i*55}ms`,
          }}>
            {/* Hover accent bar */}
            <div className="tier-accent" style={{ background:tier.color }} />

            <div style={{ fontSize:".52rem", color:DIMMER, letterSpacing:".12em" }}>
              {String(tier.id).padStart(2,"0")}
            </div>

            <div>
              <div style={{ fontSize:"clamp(.95rem,2vw,1.7rem)", fontWeight:700, letterSpacing:".06em", lineHeight:1, marginBottom:".45rem", color:tier.color }}>
                {tier.label}
              </div>
              <div className="tier-cos" style={{ fontSize:".52rem", letterSpacing:".14em", color:DIM }}>
                {tier.cos.join(" · ")}
              </div>
            </div>

            <div style={{ width:64, height:2, borderRadius:1, background:tier.color, opacity:.55, boxShadow:`0 0 10px ${tier.color}` }} />
          </div>
        ))}
      </section>

      <Divider delay="1.5s" />

      {/* ═══════════════════════════════════════════════════════════
          NODE LOG — Haraguchi date-log format
       ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"10vh 8vw 12vh" }}>
        <div className="rv" style={{ display:"flex", alignItems:"center", gap:"1.4rem", marginBottom:"3.5rem" }}>
          <span style={{ fontSize:".52rem", letterSpacing:".28em", color:ACCENT, opacity:.65, flexShrink:0 }}>NODE LOG</span>
          <div style={{ flex:1, height:1, background:DIMMER }} />
          <span style={{ fontSize:".48rem", letterSpacing:".18em", color:DIM, flexShrink:0, animation:"pulse 4s ease-in-out infinite" }}>LIVE</span>
        </div>

        {NODE_LOG.map((entry, i) => (
          <div key={i} className="rv log-row log-grid" style={{
            display:"grid", gridTemplateColumns:"9rem 1fr",
            gap:"1rem 2.4rem", padding:"1rem 0.6rem",
            borderBottom:`1px solid ${DIMMER}`, alignItems:"baseline",
            transitionDelay:`${i*38}ms`,
          }}>
            <div style={{ fontSize:".58rem", letterSpacing:".1em", color:ACCENT, opacity:.55, fontVariantNumeric:"tabular-nums" }}>
              {entry.date}
            </div>
            <div style={{ fontSize:".76rem", letterSpacing:".05em", fontWeight:300, color:"rgba(232,228,220,.8)" }}>
              {entry.text}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
       ════════════════════════════════════════════════════════════ */}
      <footer style={{
        padding:"1.8rem 2.5rem",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        borderTop:`1px solid ${DIMMER}`, flexWrap:"wrap", gap:"1rem",
      }}>
        <div style={{ fontSize:".55rem", letterSpacing:".18em", color:DIM }}>
          BEAMED SILICON · ©2026 · ALL RIGHTS RESERVED
        </div>
        <div style={{ display:"flex", gap:"2rem" }}>
          {["TIERS","MARKETS","COMPANIES","INTEL"].map(l => (
            <a key={l} href="#" style={{ fontSize:".5rem", letterSpacing:".18em", color:DIMMER, transition:"color .18s" }}
              onMouseEnter={e=>(e.target as HTMLAnchorElement).style.color=DIM}
              onMouseLeave={e=>(e.target as HTMLAnchorElement).style.color=DIMMER}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize:".5rem", letterSpacing:".18em", color:ACCENT, opacity:.45, fontVariantNumeric:"tabular-nums" }}>
          SYS:ACTIVE · TIERS:7/7{blink ? "█" : "\u00a0"}
        </div>
      </footer>
    </div>
  )
}