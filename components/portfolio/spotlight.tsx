"use client"

import { useEffect, useRef } from "react"

// Soft radial glow that tracks the pointer. Disabled for touch / reduced-motion.
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`)
        el.style.setProperty("--y", `${e.clientY}px`)
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden />
}
