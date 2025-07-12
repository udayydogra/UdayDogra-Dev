"use client"

import { useState, useEffect } from "react"
import { Home, User, Zap, Briefcase, GraduationCap, Mail, Trophy } from "lucide-react"

interface FloatingNavProps {
  activeSection: string
}

export default function FloatingNav({ activeSection }: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false)

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Zap, label: "Skills" },
    { id: "projects", icon: Trophy, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-2">
        <div className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title={item.label}
              >
                <IconComponent className="h-5 w-5" />

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">{item.label}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
