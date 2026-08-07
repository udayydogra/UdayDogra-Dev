"use client"

import { useState, useEffect } from "react"
import { Trophy, Zap, Star, X } from "lucide-react"

interface GameStatsProps {
  totalXP: number
  achievements: number
}

export default function GameStats({ totalXP, achievements }: GameStatsProps) {
  const [displayXP, setDisplayXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [isVisible, setIsVisible] = useState(true)

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

  if (!isVisible) return null

  return (
    <>
      {/* Mobile Stats - Ultra responsive bottom positioning with 5% spacing */}
      <div className="fixed bottom-2 left-[2.5%] right-[2.5%] sm:bottom-3 md:bottom-4 z-40 bg-black/20 sm:bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[5%]">
            {/* Level - Responsive */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              <span className="text-xs sm:text-sm font-bold">LVL {level}</span>
            </div>

            {/* XP - Responsive */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
              <span className="text-xs sm:text-sm">{displayXP.toLocaleString()}</span>
            </div>

            {/* Achievements - Responsive */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
              <span className="text-xs sm:text-sm">{achievements}</span>
            </div>
          </div>

          <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-white/10 rounded">
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Progress bar - mobile responsive */}
        <div className="mt-2 sm:mt-3">
          <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5 md:h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-500"
              style={{ width: `${(displayXP % 1000) / 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Stats - Ultra responsive positioning with 5% spacing */}
      <div className="fixed top-16 sm:top-18 md:top-20 lg:top-24 right-[2.5%] z-40 bg-black/20 sm:bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 xl:p-6 text-white hidden md:block">
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Level - Desktop responsive */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Star className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-yellow-400" />
            <span className="text-sm lg:text-base xl:text-lg font-bold">Level {level}</span>
          </div>

          {/* XP - Desktop responsive */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Zap className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-blue-400" />
            <span className="text-sm lg:text-base xl:text-lg">{displayXP.toLocaleString()} XP</span>
          </div>

          {/* Achievements - Desktop responsive */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Trophy className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-orange-400" />
            <span className="text-sm lg:text-base xl:text-lg">{achievements} Achievements</span>
          </div>

          {/* Progress to next level - Desktop responsive */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-xs sm:text-sm lg:text-base">
              <span>Next Level</span>
              <span>{((displayXP % 1000) / 10).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5 lg:h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 sm:h-2.5 lg:h-3 rounded-full transition-all duration-500"
                style={{ width: `${(displayXP % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
