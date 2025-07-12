"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Github, Linkedin, ChevronDown, Gamepad2, Code, Rocket } from "lucide-react"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Software Developer"

  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-slate-900/20" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Rule of thirds: Main content positioned in left 2/3, avatar in right 1/3 */}
        <div className="grid grid-cols-3 gap-8 items-center min-h-[60vh]">
          {/* Left 2/3 - Main content */}
          <div className="col-span-2 space-y-8">
            {/* Player Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              <Gamepad2 className="h-4 w-4" />
              Player: Uday Dogra
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Uday</span>
                <br />
                <span className="text-white">Dogra</span>
              </h1>

              {/* Typing animation */}
              <div className="text-xl md:text-2xl text-gray-300 h-8">
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              </div>

              {/* Stats Cards - Rule of thirds positioning */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                  <Code className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-xs text-gray-400">Technologies</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-center">
                  <Rocket className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center">
                  <Gamepad2 className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2+</div>
                  <div className="text-xs text-gray-400">Years Coding</div>
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919478204726"
                className="flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+91 94782 04726</span>
              </a>
              <a
                href="mailto:Budaydogra204@gmail.com"
                className="flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
              <a
                href="https://github.com/udayydogra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-black/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 font-bold"
            >
              Start Quest
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>

          {/* Right 1/3 - Avatar and Level Info */}
          <div className="col-span-1 flex flex-col items-center space-y-6">
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-lg opacity-50" />
          <img src="My-profile.jpeg"   className="relative w-78 h-78 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-6xl font-bold border-4 border-white/20">
                
              </img>
              {/* Level badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                LVL 9
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 w-full text-center">
              <div className="text-yellow-400 text-sm font-bold mb-2">Latest Achievement</div>
              <div className="text-white text-xs">🏆 React Master</div>
              <div className="text-gray-400 text-xs">Completed React.js certification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
