"use client"

import { useState, useEffect } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationId: number
    let trailId = 0

    const updateTrail = (e: MouseEvent) => {
      setIsVisible(true)
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      }

      setTrail((prev) => [...prev.slice(-10), newPoint])
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([])
    }

    document.addEventListener("mousemove", updateTrail)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateTrail)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: ((index + 1) / trail.length) * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        />
      ))}
    </div>
  )
}
