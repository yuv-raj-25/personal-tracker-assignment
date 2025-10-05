"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Avoid hydration mismatch
    return <div className="h-9 w-9 rounded-md border border-border" aria-hidden />
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-md"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {/* use placeholder icons to avoid extra deps */}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
      {isDark ? <img src="/simple-sun-icon.png" alt="" /> : <img src="/moon-icon.png" alt="" />}
    </Button>
  )
}
