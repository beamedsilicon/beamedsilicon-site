'use client'

import { LANGUAGES, useTranslate, type LanguageCode } from '@/components/translate-provider'

export function LanguageSelector() {
  const { language, ready, setLanguage } = useTranslate()

  return (
    <div className="language-picker">
      <label className="sr-only" htmlFor="language-select">
        Translate website
      </label>
      <select
        id="language-select"
        aria-label="Translate website"
        value={language}
        disabled={!ready}
        onChange={(event) => setLanguage(event.target.value as LanguageCode)}
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}