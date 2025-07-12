"use client"

import { useState, useEffect } from "react"
import { Mail, Github, Linkedin, ChevronDown, Gamepad2, Code, Rocket, Trophy } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [showAchievements, setShowAchievements] = useState(false)
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
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-image.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Responsive dark overlay */}
        <div className="absolute inset-0 bg-black/50 sm:bg-black/55 lg:bg-black/60" />
        {/* Gaming overlay with responsive gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/25 to-slate-900/30 sm:from-purple-900/40 sm:via-blue-900/30 sm:to-slate-900/40" />
      </div>

      {/* Animated particles - Responsive density */}
      <div className="absolute inset-0 z-10">
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768
              ? 15
              : typeof window !== "undefined" && window.innerWidth < 1920
                ? 30
                : 50,
          ),
        ].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 bg-white/20 sm:bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Maximum width container with 5% spacing */}
      <div className="w-full px-[2.5%] py-8 sm:py-12 lg:py-20 xl:py-24 relative z-20">
        {/* Mobile Layout (xs to md) */}
        <div className="block lg:hidden">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-sm opacity-40" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-3 border-white/20">
                  <Image src="/My-profile.jpeg" alt="Uday Dogra Profile" fill className="object-cover" priority />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  LVL 9
                </div>
              </div>
            </div>

            {/* Player Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              <Gamepad2 className="h-4 w-4" />
              <span>Player: Uday Dogra</span>
            </div>

            {/* Name and Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Uday</span>
                <br />
                <span className="text-white">Dogra</span>
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl text-gray-200 h-8">
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              </div>
            </div>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-center">
                <Code className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">15+</div>
                <div className="text-xs text-gray-300">Tech</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 text-center">
                <Rocket className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">3</div>
                <div className="text-xs text-gray-300">Projects</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 text-center">
                <Gamepad2 className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">2+</div>
                <div className="text-xs text-gray-300">Years</div>
              </div>
            </div>

            {/* Contact Links - Mobile */}
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:Budaydogra204@gmail.com"
                className="p-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/udayydogra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-bold"
            >
              Get In Touch
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Desktop Layout (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-[5%] items-center min-h-[70vh]">
          {/* Content Section - Left Side */}
          <div className="lg:col-span-7 space-y-8 xl:space-y-10">
            {/* Player Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full text-lg font-bold">
              <Gamepad2 className="h-6 w-6" />
              <span>Player: Uday Dogra</span>
            </div>

            {/* Name and Title */}
            <div className="space-y-6">
              <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Uday</span>
                <br />
                <span className="text-white">Dogra</span>
              </h1>
              <div className="text-3xl xl:text-4xl 2xl:text-5xl text-gray-200 h-12 xl:h-16">
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              </div>
            </div>

            {/* Stats Grid - Desktop */}
            <div className="grid grid-cols-3 gap-[5%] max-w-2xl">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <Code className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-300">Technologies</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <Rocket className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-gray-300">Projects</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <Gamepad2 className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">2+</div>
                <div className="text-gray-300">Years Coding</div>
              </div>
            </div>

            {/* Contact Links - Desktop */}
            <div className="flex space-x-4">
              <a
                href="mailto:Budaydogra204@gmail.com"
                className="flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                <span>Email Me</span>
              </a>
              <a
                href="https://github.com/udayydogra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all hover:scale-105"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105 font-bold text-xl shadow-lg"
            >
              Get In Touch
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>

          {/* Avatar Section - Right Side */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-lg opacity-50" />
              <div className="relative w-60 h-60 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 rounded-full overflow-hidden border-4 border-white/20">
                <Image src="/My-profile.jpeg" alt="Uday Dogra Profile" fill className="object-cover" priority />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-lg font-bold">
                LVL 9
              </div>
            </div>

            {/* Achievement Preview */}
            <div
              className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 w-full text-center hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setShowAchievements(true)}
            >
              <div className="text-yellow-400 text-lg font-bold mb-2 flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5" />
                Latest Achievement
              </div>
              <div className="text-white text-lg mb-1">🏆 React Master</div>
              <div className="text-gray-400">Completed React.js certification</div>
              <div className="text-purple-400 text-sm mt-2">Click to view all achievements</div>
            </div>
          </div>
        </div>

        {/* Ultra-wide Layout (2xl and up) */}
        <div className="hidden 2xl:block">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-9xl font-bold text-white/5 select-none pointer-events-none">DEVELOPER</div>
          </div>
        </div>
      </div>
    </section>
  )
}
