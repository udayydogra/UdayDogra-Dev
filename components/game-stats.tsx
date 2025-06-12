"use client"

import { useState, useEffect } from "react"
import { Trophy, Zap, Star } from "lucide-react"

interface GameStatsProps {
  totalXP: number
  achievements: number
}

export default function GameStats({ totalXP, achievements }: GameStatsProps) {
  const [displayXP, setDisplayXP] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    // Animate XP counter
    const interval = setInterval(() => {
      setDisplayXP((prev) => {
        if (prev < totalXP) {
          return Math.min(prev + 50, totalXP)
        }
        clearInterval(interval)
        return prev
      })
    }, 20)

    // Calculate level based on XP
    setLevel(Math.floor(totalXP / 1000) + 1)

    return () => clearInterval(interval)
  }, [totalXP])

  return (
    <div className="fixed top-20 right-4 z-40 bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 text-white">
      <div className="space-y-3">
        {/* Level */}
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-bold">Level {level}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          <span className="text-sm">{displayXP.toLocaleString()} XP</span>
        </div>

        {/* Achievements */}
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-400" />
          <span className="text-sm">{achievements} Achievements</span>
        </div>

        {/* Progress to next level */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Next Level</span>
            <span>{((displayXP % 1000) / 10).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(displayXP % 1000) / 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
