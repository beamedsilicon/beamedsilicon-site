'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const INCLUDED_LANGUAGES = LANGUAGES.map((l) => l.code).join(',')
const STORAGE_KEY = 'bs-language'

/**
 * Best-effort map from ISO 3166-1 alpha-2 country code to one of the
 * languages we offer. Countries not listed (US, UK, most of the world)
 * fall back to English — i.e. no translation is applied automatically.
 * Extend this freely; it only affects the *first-visit* guess.
 */
const COUNTRY_LANGUAGE: Partial<Record<string, LanguageCode>> = {
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  JP: 'ja',
  CN: 'zh-CN', HK: 'zh-CN', MO: 'zh-CN',
  NL: 'nl', BE: 'nl',
  RU: 'ru', BY: 'ru', KZ: 'ru',
  IN: 'hi',
}

interface TranslateContextType {
  /** Currently active language code. */
  language: LanguageCode
  /** True once the Google Translate widget has finished loading. */
  ready: boolean
  /** Switches the page language and remembers the choice for next time. */
  setLanguage: (code: LanguageCode) => void
}

const TranslateContext = createContext<TranslateContextType | undefined>(undefined)

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
 * a client-side route change — removeChild/insertBefore/replaceChild can
 * throw because the node Google moved is no longer where React expects it
 * ("Failed to execute 'removeChild' on 'Node'"). This makes those specific
 * mismatched calls a no-op instead of crashing the app. It only changes
 * behaviour for calls that would otherwise throw; every normal DOM
 * operation elsewhere in the app is completely unaffected. Applied once,
 * for the lifetime of the tab — NOT per page mount.
 */
function patchDomForTranslate() {
  if (typeof window === 'undefined' || window.__bsTranslatePatchApplied) return
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

  // Google also calls replaceChild on nodes it has already detached during
  // a translation pass — guard it the same way as the two above.
  const originalReplaceChild = Node.prototype.replaceChild
  Node.prototype.replaceChild = function <T extends Node>(
    this: Node,
    newChild: Node,
    oldChild: T
  ): T {
    if (oldChild.parentNode !== this) return oldChild
    return originalReplaceChild.call(this, newChild, oldChild) as T
  }
}

/** Google stores the active language in a `googtrans=/en/xx` cookie. */
function getCookieLanguage(): LanguageCode | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/)
  return (match?.[1] as LanguageCode | undefined) ?? null
}

function readStoredLanguage(): LanguageCode | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) return stored as LanguageCode
  } catch {
    // localStorage unavailable (private browsing, locked-down settings, etc.)
  }
  return getCookieLanguage()
}

function writeStoredLanguage(code: LanguageCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // ignore — translation still works for this session via Google's cookie
  }
}

function applyLanguage(code: LanguageCode): boolean {
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (!combo) return false
  combo.value = code === 'en' ? '' : code
  combo.dispatchEvent(new Event('change'))
  return true
}

/**
 * Free, no-API-key, CORS-enabled IP→country lookup. Swap this out for a
 * different provider if you'd rather not depend on geojs.io — the only
 * contract is "resolve to an ISO alpha-2 country code or null".
 */
async function detectLanguageFromCountry(): Promise<LanguageCode | null> {
  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 3500)
    const res = await fetch('https://get.geojs.io/v1/ip/country.json', {
      signal: controller.signal,
    })
    window.clearTimeout(timeout)
    if (!res.ok) return null
    const data = (await res.json()) as { country?: string }
    const cc = data.country?.toUpperCase()
    if (!cc) return null
    return COUNTRY_LANGUAGE[cc] ?? null
  } catch {
    return null
  }
}

/** Fallback when the geo-IP lookup is blocked, slow, or fails outright. */
function detectLanguageFromBrowser(): LanguageCode | null {
  if (typeof navigator === 'undefined') return null
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of candidates) {
    const lower = raw?.toLowerCase() ?? ''
    if (lower.startsWith('de')) return 'de'
    if (lower.startsWith('ja')) return 'ja'
    if (lower.startsWith('zh')) return 'zh-CN'
    if (lower.startsWith('nl')) return 'nl'
    if (lower.startsWith('ru')) return 'ru'
    if (lower.startsWith('hi')) return 'hi'
    if (lower.startsWith('en')) return 'en'
  }
  return null
}

export function TranslateProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [ready, setReady] = useState(false)
  const retryTimer = useRef<number | null>(null)
  const initialised = useRef(false)

  const clearRetry = useCallback(() => {
    if (retryTimer.current !== null) {
      window.clearInterval(retryTimer.current)
      retryTimer.current = null
    }
  }, [])

  const tryApply = useCallback(
    (code: LanguageCode) => {
      clearRetry()
      if (code === 'en' || applyLanguage(code)) return
      // The combo box may not exist yet right after init — keep trying
      // briefly rather than silently failing.
      retryTimer.current = window.setInterval(() => {
        if (applyLanguage(code)) clearRetry()
      }, 250)
      window.setTimeout(clearRetry, 6000)
    },
    [clearRetry]
  )

  // Load the Google widget exactly once for the lifetime of the app. This
  // provider lives in the root layout, which React/Next.js never remounts
  // during client-side navigation between pages — that persistence is what
  // stops the widget from being torn down and reinitialised (and DOM nodes
  // fought over) on every page change, which was the source of most of the
  // old glitchiness.
  useEffect(() => {
    patchDomForTranslate()

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: INCLUDED_LANGUAGES,
          autoDisplay: false,
        },
        'google_translate_element'
      )
      setReady(true)
    }

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    } else if (window.google?.translate) {
      window.googleTranslateElementInit()
    }

    return clearRetry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Once per visit: restore an explicit saved choice, or — if the visitor
  // has never picked one — guess from their country (falling back to their
  // browser's language setting) and apply it automatically. Whatever we
  // land on gets persisted, so this only ever runs once per browser.
  useEffect(() => {
    if (!ready || initialised.current) return
    initialised.current = true

    const saved = readStoredLanguage()
    if (saved) {
      setLanguageState(saved)
      if (saved !== 'en') tryApply(saved)
      return
    }

    let cancelled = false
    ;(async () => {
      const detected = (await detectLanguageFromCountry()) ?? detectLanguageFromBrowser() ?? 'en'
      if (cancelled) return
      setLanguageState(detected)
      writeStoredLanguage(detected)
      if (detected !== 'en') tryApply(detected)
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Re-apply the active language whenever the route changes. Next.js swaps
  // page content without a full reload, so freshly rendered text doesn't
  // get picked up by Google's widget on its own.
  useEffect(() => {
    if (!ready || !initialised.current || language === 'en') return
    const t = window.setTimeout(() => tryApply(language), 150)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ready])

  const setLanguage = useCallback(
    (code: LanguageCode) => {
      setLanguageState(code)
      writeStoredLanguage(code)
      tryApply(code)
    },
    [tryApply]
  )

  return (
    <TranslateContext.Provider value={{ language, ready, setLanguage }}>
      {children}
      <div id="google_translate_element" aria-hidden="true" />
    </TranslateContext.Provider>
  )
}

export function useTranslate() {
  const ctx = useContext(TranslateContext)
  if (!ctx) {
    // Default values if rendered outside the provider (shouldn't happen
    // since it's mounted in the root layout).
    return { language: 'en' as LanguageCode, ready: false, setLanguage: () => {} }
  }
  return ctx
}