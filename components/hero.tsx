"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"

// ─── Tier configuration ────────────────────────────────────────────────────
// Each tier gets its own orbital ring with a distinct inclination, radius,
// speed, and design-system colour. Inclination goes from 0° (equatorial)
// to 90° (polar) so the rings fan out into a 3-D armillary-sphere shape.
const TIERS = [
  { id: 1, label: "FABLESS",    color: "#f5b731", radius: 1.60, speed: 0.0070, incDeg:  0 },
  { id: 2, label: "FOUNDRIES",  color: "#ff6b35", radius: 1.88, speed: 0.0062, incDeg: 15 },
  { id: 3, label: "EQUIPMENT",  color: "#4ecdc4", radius: 2.14, speed: 0.0055, incDeg: 30 },
  { id: 4, label: "SUBSYSTEMS", color: "#45b7d1", radius: 2.40, speed: 0.0048, incDeg: 45 },
  { id: 5, label: "COMPONENTS", color: "#7bed9f", radius: 2.66, speed: 0.0042, incDeg: 60 },
  { id: 6, label: "MATERIALS",  color: "#a29bfe", radius: 2.92, speed: 0.0036, incDeg: 75 },
  { id: 7, label: "MINING",     color: "#fd79a8", radius: 3.18, speed: 0.0030, incDeg: 90 },
] as const

// ─── Vertex shader ─────────────────────────────────────────────────────────
const VERT = /* glsl */ `
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

// ─── Fragment shader ────────────────────────────────────────────────────────
// Procedural circuit-board texture with:
//  • hash-based horizontal / vertical trace grid
//  • animated data-flow pulses
//  • latitude shimmer bands
//  • fresnel rim glow
const FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3  uColor;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float circuit(vec2 uv, float scale) {
    vec2  g    = floor(uv * scale);
    vec2  fr   = fract(uv * scale);
    float h    = hash(g);
    float line = (h > 0.5)
      ? step(0.47, fr.y) * (1.0 - step(0.53, fr.y))
      : step(0.47, fr.x) * (1.0 - step(0.53, fr.x));
    float dot  = step(0.88, 1.0 - length(fr - 0.5) * 2.1);
    return max(line, dot);
  }

  void main() {
    // Fresnel rim
    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    float rim     = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 2.5);

    // Circuit layers (fine + coarse)
    float c = max(circuit(vUv, 22.0), circuit(vUv, 11.0) * 0.5);

    // Animated data-flow pulses (3 scan lines per UV wrap)
    float py    = fract(vUv.y * 3.0 - uTime * 0.18);
    float pulse = smoothstep(0.0, 0.04, py) * smoothstep(0.12, 0.06, py) * 0.7;

    // Latitude shimmer
    float lat = smoothstep(0.85, 1.0,
      sin(vUv.y * 3.14159 * 10.0 + uTime * 1.2) * 0.5 + 0.5
    ) * 0.14;

    vec3 col   = uColor * 0.06
               + uColor * c * 0.48
               + uColor * pulse
               + uColor * lat
               + vec3(1.0) * rim * 0.38;

    float alpha = 0.60 + c * 0.28 + rim * 0.38;
    gl_FragColor = vec4(col, alpha);
  }
`

// ─── Component ──────────────────────────────────────────────────────────────
export function Hero() {
  const canvasRef              = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme }      = useTheme()
  const [count, setCount]      = useState(0)

  // ── Counter animation: 0 → 700 ──────────────────────────────────────────
  useEffect(() => {
    const TARGET   = 700
    const DURATION = 2_200        // ms
    let   rafId: number
    const start    = performance.now()

    const tick = (now: number) => {
      const t     = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)          // cubic ease-out
      setCount(Math.round(eased * TARGET))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    const id = setTimeout(() => { rafId = requestAnimationFrame(tick) }, 400)
    return () => { clearTimeout(id); cancelAnimationFrame(rafId) }
  }, [])

  // ── Three.js scene ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isLight       = resolvedTheme === "light"
    const sphereColHex  = isLight ? "#0066ff" : "#f5b731"
    const bgColInt      = isLight ? 0xf5f0e8  : 0x08080f

    let cleanupFn: (() => void) | undefined

    const setup = async () => {
      const THREE = await import("three")

      // — Renderer —
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      renderer.setClearColor(bgColInt, 1)

      // — Scene & Camera —
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        45,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1, 100
      )
      camera.position.set(0, 0, 7)

      const clock = new THREE.Clock()

      // — Main sphere (GLSL circuit-board shader) —
      const sphereGeo = new THREE.SphereGeometry(1, 128, 128)
      const sphereMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value: 0 },
          uColor: { value: new THREE.Color(sphereColHex) },
        },
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent: true,
      })
      const sphere = new THREE.Mesh(sphereGeo, sphereMat)
      scene.add(sphere)

      // — Wireframe cage at 1.828× radius —
      const wireCage = new THREE.Mesh(
        new THREE.SphereGeometry(1.828, 32, 32),
        new THREE.MeshBasicMaterial({
          color:       isLight ? 0x0044bb : 0xf5b731,
          wireframe:   true,
          transparent: true,
          opacity:     0.045,
        })
      )
      scene.add(wireCage)

      // — 3 concentric BackSide glow layers for the core —
      const coreLayers = [
        { r: 0.38, a: 0.55 },
        { r: 0.58, a: 0.22 },
        { r: 0.78, a: 0.09 },
      ]
      coreLayers.forEach(({ r, a }) => {
        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(r, 32, 32),
          new THREE.MeshBasicMaterial({
            color:       isLight ? 0x0066ff : 0xf5b731,
            side:        THREE.BackSide,
            transparent: true,
            opacity:     a,
          })
        ))
      })

      // — 4 500-point star field —
      const starPos = new Float32Array(4_500 * 3)
      for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 90
      const starGeo = new THREE.BufferGeometry()
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
      scene.add(new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.032, transparent: true, opacity: 0.55 })
      ))

      // — 7 orbital particle rings —
      // Positions are pre-computed with inclination baked in so we can simply
      // rotate each ring around world-Y to produce clean orbital motion.
      const orbitRings = TIERS.map(tier => {
        const incRad   = (tier.incDeg * Math.PI) / 180
        const N        = 200
        const pos      = new Float32Array(N * 3)

        for (let j = 0; j < N; j++) {
          const theta    = (j / N) * Math.PI * 2
          pos[j * 3]     =  Math.cos(theta) * tier.radius
          pos[j * 3 + 1] = -Math.sin(theta) * Math.sin(incRad) * tier.radius
          pos[j * 3 + 2] =  Math.sin(theta) * Math.cos(incRad) * tier.radius
        }

        const geo  = new THREE.BufferGeometry()
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))

        const ring = new THREE.Points(geo, new THREE.PointsMaterial({
          color:      new THREE.Color(tier.color),
          size:       tier.id === 1 ? 0.055 : 0.040,
          transparent: true,
          opacity:    0.88,
          blending:   THREE.AdditiveBlending,
          depthWrite: false,
        }))

        scene.add(ring)
        return { mesh: ring, speed: tier.speed }
      })

      // — Lights —
      scene.add(new THREE.AmbientLight(0x111122, 0.4))

      const lightA = new THREE.PointLight(0xf5b731, 2.5, 12)
      lightA.position.set(3, 2, 4)
      scene.add(lightA)

      const lightB = new THREE.PointLight(0x0066ff, 2.0, 12)
      lightB.position.set(-3, -2, 3)
      scene.add(lightB)

      // — Mouse parallax state —
      let mouseX = 0, mouseY = 0
      let camX   = 0, camY   = 0

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener("mousemove", onMouseMove)

      // — Resize handler —
      const onResize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener("resize", onResize)

      // — Animation loop —
      let animId: number
      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Sphere: slow axial spin + shader time
        sphere.rotation.y          = t * 0.08
        sphereMat.uniforms.uTime.value = t

        // Cage: slow tumble
        wireCage.rotation.x = t * 0.042
        wireCage.rotation.y = t * 0.066

        // Orbital rings: each rotates around Y
        orbitRings.forEach(({ mesh, speed }) => { mesh.rotation.y += speed })

        // Point lights orbit around sphere
        lightA.position.x =  Math.cos(t * 0.48) * 4.5
        lightA.position.z =  Math.sin(t * 0.48) * 4.5
        lightB.position.x = -Math.cos(t * 0.48) * 4.5
        lightB.position.z = -Math.sin(t * 0.48) * 4.5

        // Camera parallax: smooth lerp toward cursor (±0.56x, ±0.3y)
        camX += (mouseX * 0.56 - camX) * 0.04
        camY += (-mouseY * 0.30 - camY) * 0.04
        camera.position.x = camX
        camera.position.y = camY
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()

      // — Cleanup closure —
      cleanupFn = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("resize", onResize)
        renderer.dispose()
        sphereGeo.dispose()
        sphereMat.dispose()
      }
    }

    setup().catch(console.error)
    return () => { cleanupFn?.() }
  }, [resolvedTheme])

  // ── Styles (new elements only — existing hero classes live in globals.css) ─
  const S = {
    section: {
      position:   "relative" as const,
      width:      "100%",
      minHeight:  "100dvh",
      overflow:   "hidden",
      display:    "flex",
      alignItems: "center",
    },
    canvas: {
      position: "absolute" as const,
      inset:    0,
      width:    "100%",
      height:   "100%",
    },
    scanlines: {
      position:        "absolute" as const,
      inset:           0,
      pointerEvents:   "none" as const,
      backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
      zIndex:          1,
    },
    corner: {
      position:   "absolute" as const,
      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
      fontSize:   "0.6rem",
      letterSpacing: "0.08em",
      opacity:    0.4,
      color:      "var(--yellow, #f5b731)",
      zIndex:     3,
    },
    vertLabel: {
      position:   "absolute" as const,
      left:       "1.2rem",
      top:        "50%",
      transform:  "translateX(-50%) translateY(-50%) rotate(-90deg)",
      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
      fontSize:   "0.55rem",
      letterSpacing: "0.22em",
      opacity:    0.3,
      color:      "var(--yellow, #f5b731)",
      whiteSpace: "nowrap" as const,
      zIndex:     3,
    },
    tierRings: {
      position:       "absolute" as const,
      bottom:         "2rem",
      left:           "50%",
      transform:      "translateX(-50%)",
      display:        "flex",
      gap:            "1.4rem",
      zIndex:         3,
      flexWrap:       "wrap" as const,
      justifyContent: "center",
    },
    tierItem: {
      display:    "flex",
      alignItems: "center",
      gap:        "0.4rem",
      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
      fontSize:   "0.58rem",
      letterSpacing: "0.1em",
      opacity:    0.7,
      color:      "currentColor",
    },
    tierDot: (color: string): React.CSSProperties => ({
      display:     "inline-block",
      width:       "6px",
      height:      "6px",
      borderRadius: "50%",
      background:  color,
      boxShadow:   `0 0 8px ${color}`,
      flexShrink:  0,
    }),
  }

  return (
    <section className="hero" style={S.section} aria-label="Beamed Silicon — supply chain universe">

      {/* ── Three.js canvas ──────────────────────────────────────────── */}
      <canvas ref={canvasRef} style={S.canvas} aria-hidden="true" />

      {/* ── Scanline depth texture ───────────────────────────────────── */}
      <div style={S.scanlines} aria-hidden="true" />

      {/* ── Corner technical readouts ────────────────────────────────── */}
      <div
        style={{ ...S.corner, top: "1.2rem", left: "1.5rem" }}
        aria-hidden="true"
      >
        SYS:SILICON-INTELLIGENCE-v2026.06
      </div>
      <div
        style={{ ...S.corner, bottom: "1.2rem", right: "1.5rem" }}
        aria-hidden="true"
      >
        NODE:ACTIVE · TIERS:7/7
      </div>

      {/* ── Left-edge vertical supply-chain label ────────────────────── */}
      <div style={S.vertLabel} aria-hidden="true">
        SUPPLY CHAIN INTELLIGENCE
      </div>

      {/* ── Main hero content ─────────────────────────────────────────── */}
      <div className="hero-inner" style={{ position: "relative", zIndex: 2, width: "100%" }}>

        {/*
          ── Headline (Haraguchi-style: fearless scale, deliberate negative space)
          Font size uses clamp so it scales from 320 px mobile → 4 K desktop.
          CSS classes are preserved from the original hero so global styles apply.
        */}
        <h1
          className="hero-headline"
          style={{
            fontSize:      "clamp(44px, 6.8vw, 96px)",
            fontWeight:    900,
            lineHeight:    0.92,
            letterSpacing: "-0.03em",
            margin:        0,
          }}
          aria-label="Every tier of the silicon universe"
        >
          <span style={{ display: "block" }}>EVERY TIER</span>
          <span style={{ display: "block" }}>OF THE</span>
          <span style={{ display: "block" }}>SILICON</span>
          <span style={{ display: "block" }}>UNIVERSE</span>
        </h1>

        {/* hero-sub paragraph — class name preserved; "350" updated to "700" */}
        <p className="hero-sub">
          700 companies mapped across 7 supply chain tiers — from rare-earth mining
          to finished silicon. Track capital, risk, and innovation across the full
          semiconductor stack.
        </p>

        {/* CTA buttons */}
        <div className="hero-cta">
          <Link href="/companies" className="btn btn-primary">
            Explore Companies
          </Link>
          <Link href="/markets" className="btn btn-ghost">
            Markets
          </Link>
          <Link href="/products" className="btn btn-ghost">
            Products
          </Link>
        </div>
      </div>

      {/*
        ── hero-stats: right-side monospace stats readout
        class names preserved (stat-n, stat-label) so existing CSS applies.
        The "stat-n" for companies now shows the animated counter.
      */}
      <div
        className="hero-stats"
        style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
        aria-label="Key statistics"
      >
        <div className="stat-item">
          <div className="stat-n">{count}</div>
          <div className="stat-label">COMPANIES</div>
        </div>
        <div className="stat-item">
          <div className="stat-n">7</div>
          <div className="stat-label">TIERS</div>
        </div>
        <div className="stat-item">
          <div className="stat-n">32+</div>
          <div className="stat-label">COUNTRIES</div>
        </div>
        <div className="stat-item">
          <div className="stat-n">24/7</div>
          <div className="stat-label">FREQUENCY</div>
        </div>
      </div>

      {/* ── Bottom tier ring indicators ───────────────────────────────── */}
      <div style={S.tierRings} aria-hidden="true">
        {TIERS.map(tier => (
          <div key={tier.id} style={S.tierItem}>
            <span style={S.tierDot(tier.color)} />
            <span>{tier.label}</span>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero