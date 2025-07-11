"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeTransition() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div 
      className="theme-transition"
      style={{
        background: resolvedTheme === 'dark' 
          ? 'hsl(222.2 84% 4.9%)' 
          : 'hsl(0 0% 100%)'
      }}
    />
  )
} 