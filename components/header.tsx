"use client"

import { useState } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"

interface HeaderProps {
  activeSection: string
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "experience", label: "Experience", icon: "🏆" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "contact", label: "Contact", icon: "📧" },
  ]

  return (
    <nav className="fixed top-0 w-screen bg-black/20 sm:bg-black/30 backdrop-blur-md border-b border-purple-500/30 z-50">
      {/* Maximum width container with 5% spacing */}
      <div className="w-full px-[2.5%]">
        <div className="flex justify-between items-center h-12 xs:h-14 sm:h-16 lg:h-18 xl:h-20">
          {/* Logo - Ultra responsive */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-white drop-shadow-md">
            <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 text-purple-400" />
            <span className="hidden xs:inline sm:hidden md:inline">Uday Dogra</span>
            <span className="xs:hidden sm:inline md:hidden">UD</span>
          </div>

          {/* Desktop Navigation with 5% gaps */}
          <div className="hidden lg:flex gap-[1%] lg:pe-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 lg:gap-2 xl:gap-2.5 px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 2xl:px-5 2xl:py-3 rounded-lg transition-all duration-200 text-xs lg:text-sm xl:text-base 2xl:text-lg ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg"
                    : "text-gray-200 hover:text-white hover:bg-white/20"
                }`}
              >
                <span className="text-xs lg:text-sm xl:text-base">{item.icon}</span>
                <span className="capitalize hidden xl:inline 2xl:inline">{item.label}</span>
                <span className="capitalize xl:hidden 2xl:hidden">{item.label.slice(0, 4)}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu button - Responsive */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/20"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation with 5% gaps */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-purple-500/30 bg-black/30 sm:bg-black/40 backdrop-blur-sm rounded-b-lg">
            <div className="grid grid-cols-2 gap-[5%] md:flex md:flex-col md:space-y-2 md:gap-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 sm:gap-3 text-left px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-gray-200 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base"
                >
                  <span className="text-sm sm:text-base">{item.icon}</span>
                  <span className="capitalize">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
