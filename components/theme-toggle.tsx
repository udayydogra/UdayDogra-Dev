"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Monitor } from "lucide-react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "dark"
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "system") {
      document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches)
    } else {
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
  }

  if (!mounted) return null

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-20 right-4 z-40 p-3 bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
    </button>
  )
}
