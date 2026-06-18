"use client"

import { useEffect, useState } from "react"

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
]

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, string>,
          elementId: string
        ) => void
      }
    }
    googleTranslateElementInit?: () => void
  }
}

function applyLanguage(code: string) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo")
  if (!combo) return false

  combo.value = code === "en" ? "" : code
  combo.dispatchEvent(new Event("change"))
  return true
}

export function LanguageSelector() {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,de,ja,zh-CN,nl,ru,hi",
          autoDisplay: "false",
        },
        "google_translate_element"
      )
    }

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script")
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)
    } else {
      window.googleTranslateElementInit()
    }
  }, [])

  function handleChange(nextLanguage: string) {
    setLanguage(nextLanguage)

    if (applyLanguage(nextLanguage)) return

    const retry = window.setInterval(() => {
      if (applyLanguage(nextLanguage)) {
        window.clearInterval(retry)
      }
    }, 250)

    window.setTimeout(() => window.clearInterval(retry), 5000)
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