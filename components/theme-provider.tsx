'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Read `document.startViewTransition` through a local cast instead of
// `declare global { interface Document {...} }`. Some TypeScript/lib.dom.d.ts
// versions already declare this method themselves, and re-opening the
// global interface with different optionality is a hard compile error
// ("All declarations of 'startViewTransition' must have identical
// modifiers"). A local cast sidesteps that entirely.
function startThemeViewTransition(callback: () => void): boolean {
  if (typeof document === 'undefined') return false
  const docWithViewTransition = document as unknown as {
    startViewTransition?: (cb: () => void | Promise<void>) => unknown
  }
  if (typeof docWithViewTransition.startViewTransition !== 'function') return false
  docWithViewTransition.startViewTransition(callback)
  return true
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Default to dark mode as per user's current theme
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme)
      document.documentElement.classList.toggle('light', theme === 'light')
    }
  }, [theme, mounted])

  // `origin` is the screen position the toggle was clicked from (usually the
  // button itself) — it anchors the circular reveal animation defined in
  // globals.css via the --theme-toggle-x/y custom properties.
  const toggleTheme = (origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    if (typeof document === 'undefined') {
      setTheme(next)
      return
    }

    if (origin) {
      document.documentElement.style.setProperty('--theme-toggle-x', `${origin.x}px`)
      document.documentElement.style.setProperty('--theme-toggle-y', `${origin.y}px`)
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const usedViewTransition =
      !prefersReducedMotion && startThemeViewTransition(() => setTheme(next))

    if (!usedViewTransition) {
      setTheme(next)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return default values during SSR to prevent errors
    return { theme: 'dark' as Theme, toggleTheme: () => {} }
  }
  return context
}