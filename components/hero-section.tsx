"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Github, Linkedin, ChevronDown, Gamepad2, Code, Rocket } from "lucide-react"
import Image from "next/image"

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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/background-image.jpg" alt="Background" fill className="object-cover" priority quality={85} />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gaming overlay with gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-slate-900/40" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-20">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[60vh]">
          {/* Mobile: Avatar first, Desktop: Right 1/3 */}
          <div className="order-1 lg:order-2 lg:col-span-1 flex flex-col items-center space-y-4 lg:space-y-6">
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-lg opacity-50" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/20">
                <Image src="/My-profile.jpeg" alt="Uday Dogra Profile" fill className="object-cover" priority />
              </div>
              {/* Level badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                LVL 9
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 sm:p-4 w-full max-w-xs text-center">
              <div className="text-yellow-400 text-xs sm:text-sm font-bold mb-1 sm:mb-2">Latest Achievement</div>
              <div className="text-white text-xs">🏆 React Master</div>
              <div className="text-gray-400 text-xs">Completed React.js certification</div>
            </div>
          </div>

          {/* Mobile: Content second, Desktop: Left 2/3 */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Player Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
              <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4" />
              Player: Uday Dogra
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Uday</span>
                <br />
                <span className="text-white">Dogra</span>
              </h1>

              {/* Typing animation */}
              <div className="text-lg sm:text-xl lg:text-2xl text-gray-200 h-8 drop-shadow-md">
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              </div>

              {/* Stats Cards - Mobile responsive */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8 max-w-md mx-auto lg:mx-0">
                <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2 sm:p-4 text-center">
                  <Code className="h-4 w-4 sm:h-6 sm:w-6 text-purple-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">15+</div>
                  <div className="text-xs text-gray-300">Technologies</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2 sm:p-4 text-center">
                  <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-gray-300">Projects</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-2 sm:p-4 text-center">
                  <Gamepad2 className="h-4 w-4 sm:h-6 sm:w-6 text-green-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">2+</div>
                  <div className="text-xs text-gray-300">Years Coding</div>
                </div>
              </div>
            </div>

            {/* Contact Links - Mobile responsive */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4">
              <a
                href="tel:+919478204726"
                className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">+91 94782 04726</span>
                <span className="sm:hidden">Phone</span>
              </a>
              <a
                href="mailto:Budaydogra204@gmail.com"
                className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Email</span>
              </a>
              <a
                href="https://github.com/udayydogra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 font-bold text-sm sm:text-base shadow-lg"
            >
              Start Quest
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
