"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
] as const

const INCLUDED_LANGUAGES = LANGUAGES.map((l) => l.code).join(",")
const STORAGE_KEY = "bs-language"

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void
      }
    }
    googleTranslateElementInit?: () => void
    __bsTranslatePatchApplied?: boolean
  }
}

/**
 * Google's website-translate widget rewrites live DOM text nodes directly.
 * When React later reconciles those same nodes — most commonly right after
 * a client-side route change — removeChild/insertBefore can throw because
 * the node Google moved is no longer where React expects it to be
 * ("Failed to execute 'removeChild' on 'Node'"). This makes those specific
 * mismatched calls a no-op instead of crashing the app. It only changes
 * behaviour for calls that would otherwise throw; every normal DOM
 * operation elsewhere in the app is completely unaffected.
 */
function patchDomForTranslate() {
  if (typeof window === "undefined" || window.__bsTranslatePatchApplied) return
  window.__bsTranslatePatchApplied = true

  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child
    return originalRemoveChild.call(this, child) as T
  }

  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode
    return originalInsertBefore.call(this, newNode, referenceNode) as T
  }
}

/** Google stores the active language in a `googtrans=/en/xx` cookie. */
function getCookieLanguage(): string {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/)
  return match?.[1] ?? "en"
}

function readStoredLanguage(): string {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return stored
  } catch {
    // localStorage unavailable (private browsing, locked-down settings, etc.)
  }
  return getCookieLanguage()
}

function writeStoredLanguage(code: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // ignore — translation still works for this session via Google's cookie
  }
}

function applyLanguage(code: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo")
  if (!combo) return false

  combo.value = code === "en" ? "" : code
  combo.dispatchEvent(new Event("change"))
  return true
}

export function LanguageSelector() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("en")
  const [ready, setReady] = useState(false)
  const retryTimer = useRef<number | null>(null)

  const clearRetry = useCallback(() => {
    if (retryTimer.current !== null) {
      window.clearInterval(retryTimer.current)
      retryTimer.current = null
    }
  }, [])

  const tryApply = useCallback(
    (code: string) => {
      clearRetry()
      if (applyLanguage(code)) return
      // The combo box may not exist yet right after init — keep trying
      // briefly rather than silently failing.
      retryTimer.current = window.setInterval(() => {
        if (applyLanguage(code)) clearRetry()
      }, 250)
      window.setTimeout(clearRetry, 6000)
    },
    [clearRetry]
  )

  // Patch the DOM, restore any previously chosen language, and load the
  // Google widget script (or re-init it if it was already loaded by an
  // earlier mount of this component on a different page).
  useEffect(() => {
    patchDomForTranslate()

    const saved = readStoredLanguage()
    if (saved !== "en") setLanguage(saved)

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: INCLUDED_LANGUAGES,
          autoDisplay: false,
        },
        "google_translate_element"
      )
      setReady(true)
    }

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script")
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)
    } else if (window.google?.translate) {
      window.googleTranslateElementInit()
    }

    return clearRetry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-apply the active language whenever the route changes. Next.js swaps
  // page content without a full reload, so freshly rendered text doesn't
  // get picked up by Google's widget on its own.
  useEffect(() => {
    if (!ready || language === "en") return
    const t = window.setTimeout(() => tryApply(language), 200)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ready])

  function handleChange(nextLanguage: string) {
    setLanguage(nextLanguage)
    writeStoredLanguage(nextLanguage)
    tryApply(nextLanguage)
  }

  return (
    <div className="language-picker">
      <label className="sr-only" htmlFor="language-select">
        Translate website
      </label>
      <select
        id="language-select"
        aria-label="Translate website"
        value={language}
        onChange={(event) => handleChange(event.target.value)}
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
      <div id="google_translate_element" aria-hidden="true" />
    </div>
  )
}