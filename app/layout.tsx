import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslateProvider } from "@/components/translate-provider"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SITE_URL } from "@/lib/site-config"
import "./globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"], weight: ["300", "400", "500"],
  variable: "--font-plex-sans", display: "swap",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["400", "500", "600"],
  variable: "--font-plex-mono", display: "swap",
})
const sourceSerif = Source_Serif_4({
  subsets: ["latin"], weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif", display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beamed Silicon — Semiconductor Supply Chain Intelligence",
    template: "%s | Beamed Silicon",
  },
  description:
    "The definitive semiconductor intelligence platform. 350 companies, 7 supply chain tiers — from quartz mines to AI accelerators. Real-time stock prices, supply chain risk analysis, and weekly industry deep dives.",
  keywords: [
    "semiconductor supply chain", "chip supply chain", "TSMC", "ASML", "Nvidia",
    "HBM memory", "semiconductor stocks", "semiconductor news", "CoWoS packaging",
    "semiconductor equipment", "fabless chip designers", "semiconductor market",
    "chip shortage", "CHIPS Act", "EUV lithography", "semiconductor intelligence",
    "semiconductor analysis", "foundry", "SMIC", "Applied Materials", "Lam Research",
  ],
  authors: [{ name: "Beamed Silicon Intelligence" }],
  creator: "Beamed Silicon Intelligence",
  publisher: "Beamed Silicon Intelligence",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Beamed Silicon",
    title: "Beamed Silicon — Semiconductor Supply Chain Intelligence",
    description:
      "350 companies. 7 supply chain tiers. From quartz mines to AI accelerators. Real-time stock data, supply chain maps, and expert analysis — updated daily.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beamed Silicon — Semiconductor Supply Chain Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beamed Silicon — Semiconductor Supply Chain Intelligence",
    description:
      "350 companies. 7 supply chain tiers. Real-time semiconductor stocks, supply chain maps, and expert analysis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a00",
  width: "device-width",
  initialScale: 1,
}

// JSON-LD structured data
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Beamed Silicon",
  // Including the bare domain as a fallback alternate gives Google's site-name
  // system a safe option to land on if it isn't confident enough to pick the
  // brand name outright — recommended for newer/lower-authority domains.
  alternateName: ["Beamed Silicon Intelligence", "beamedsilicon.qzz.io"],
  url: SITE_URL,
  description: "Semiconductor supply chain intelligence — 350 companies, 7 tiers, from quartz mines to AI accelerators.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Beamed Silicon Intelligence",
  alternateName: ["Beamed Silicon", "beamedsilicon.qzz.io"],
  url: SITE_URL,
  description:
    "Semiconductor supply chain intelligence platform covering 350 companies across 7 tiers from raw material extraction to fabless chip design.",
  // External profile(s) corroborating this is a real, distinct entity —
  // Google's site-name confidence partly depends on "how the site is
  // referenced across the web." Add any other verified profiles you have.
  sameAs: ["https://x.com/beamedsilicon"],
  knowsAbout: [
    "Semiconductor supply chain",
    "Chip manufacturing",
    "EUV lithography",
    "HBM memory",
    "Semiconductor stocks",
    "Foundry technology",
    "Export controls",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteLd, jsonLd]) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TranslateProvider>
            {children}
          </TranslateProvider>
          <ScrollReveal />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
