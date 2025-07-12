"use client"

import { useState, useEffect } from "react"
import { Gamepad2, Code, Zap } from "lucide-react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-ping opacity-20" />
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-full">
            <Gamepad2 className="h-12 w-12 text-white animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Uday Dogra
            </span>
          </h1>
          <p className="text-gray-400">Initializing Portfolio...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Icons */}
        <div className="flex justify-center space-x-4">
          <Code className="h-6 w-6 text-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <Zap className="h-6 w-6 text-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <Gamepad2 className="h-6 w-6 text-green-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
