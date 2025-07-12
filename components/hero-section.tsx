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
        {[...Array(window.innerWidth < 768 ? 15 : window.innerWidth < 1920 ? 30 : 50)].map((_, i) => (
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
        {/* Ultra responsive layout with 5% gaps */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[5%] items-center min-h-[60vh] lg:min-h-[70vh] xl:min-h-[75vh]">
          {/* Avatar Section - 40% width on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center space-y-3 sm:space-y-4 lg:space-y-6 xl:space-y-8 w-full">
            <div className="relative">
              {/* Responsive glowing ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse blur-sm sm:blur-md lg:blur-lg opacity-40 sm:opacity-50" />
              <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52 2xl:w-60 2xl:h-60 rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 border-white/20">
                <Image src="/My-profile.jpeg" alt="Uday Dogra Profile" fill className="object-cover" priority />
              </div>
              {/* Responsive level badge */}
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 lg:-bottom-3 lg:-right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 xl:px-4 xl:py-1.5 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg font-bold">
                LVL 9
              </div>
            </div>

            {/* Achievement Preview - Full width */}
            <div className="bg-black/30 sm:bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2.5 sm:p-3 lg:p-4 xl:p-5 w-full text-center">
              <div className="text-yellow-400 text-xs sm:text-sm lg:text-base font-bold mb-1 sm:mb-2">
                Latest Achievement
              </div>
              <div className="text-white text-xs sm:text-sm lg:text-base">🏆 React Master</div>
              <div className="text-gray-400 text-xs sm:text-sm">Completed React.js certification</div>
            </div>
          </div>

          {/* Content Section - 55% width on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10 text-center lg:text-left w-full">
            {/* Player Badge - Responsive */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg font-bold">
              <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
              <span className="hidden xs:inline">Player: Uday Dogra</span>
              <span className="xs:hidden">Player: UD</span>
            </div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6 xl:space-y-8">
              {/* Responsive heading */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-2 sm:mb-4 leading-tight drop-shadow-lg">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Uday</span>
                <br />
                <span className="text-white">Dogra</span>
              </h1>

              {/* Responsive typing animation */}
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-200 h-6 sm:h-8 lg:h-10 xl:h-12 drop-shadow-md">
                {typedText}
                <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
              </div>

              {/* Responsive stats cards with 5% gaps */}
              <div className="grid grid-cols-3 gap-[5%] mt-4 sm:mt-6 lg:mt-8 w-full max-w-2xl mx-auto lg:mx-0">
                <div className="bg-black/30 sm:bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-center">
                  <Code className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-purple-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white">
                    15+
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-300">Technologies</div>
                </div>
                <div className="bg-black/30 sm:bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-center">
                  <Rocket className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-blue-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white">
                    3
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-300">Projects</div>
                </div>
                <div className="bg-black/30 sm:bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-5 text-center">
                  <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-green-400 mx-auto mb-1 sm:mb-2" />
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white">
                    2+
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-300">Years Coding</div>
                </div>
              </div>
            </div>

            {/* Responsive contact links with 5% gaps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[5%] w-full">
              <a
                href="tel:+919478204726"
                className="flex items-center justify-center gap-1 sm:gap-2 bg-black/20 sm:bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <span className="hidden lg:inline">+91 94782 04726</span>
                <span className="lg:hidden">Phone</span>
              </a>
              <a
                href="mailto:Budaydogra204@gmail.com"
                className="flex items-center justify-center gap-1 sm:gap-2 bg-black/20 sm:bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <span>Email</span>
              </a>
              <a
                href="https://github.com/udayydogra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 sm:gap-2 bg-black/20 sm:bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-1 sm:gap-2 bg-black/20 sm:bg-black/30 backdrop-blur-sm border border-white/20 text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Responsive CTA button */}
            <button
              onClick={() => scrollToSection("about")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 font-bold text-sm sm:text-base lg:text-lg xl:text-xl shadow-lg"
            >
              Start Quest
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
