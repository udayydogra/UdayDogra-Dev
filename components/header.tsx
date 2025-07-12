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
    <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md border-b border-purple-500/30 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white drop-shadow-md">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
            <span className="hidden xs:inline">Uday Dogra</span>
            <span className="xs:hidden">UD</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg"
                    : "text-gray-200 hover:text-white hover:bg-white/20"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="capitalize">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/20"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-500/30 bg-black/40 backdrop-blur-sm rounded-b-lg">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:space-y-2 sm:gap-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 sm:gap-3 text-left px-3 py-2 sm:px-4 sm:py-3 text-gray-200 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <span>{item.icon}</span>
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
