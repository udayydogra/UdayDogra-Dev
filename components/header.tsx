"use client"

import { Shield } from "lucide-react"

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Bug Bounty", id: "bugbounty" },
  { label: "Workflow", id: "workflow" },
  { label: "Contact", id: "contact" },
]

interface HeaderProps {
  activeSection?: string
}

export default function Header({ activeSection }: HeaderProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-400/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <div className="p-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
              <Shield className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="mono font-bold text-white">
              ud<span className="text-cyan-400">0</span>g
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`mono text-xs px-3 py-2 rounded-lg transition-all ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="mailto:udaydogra204@gmail.com"
            className="btn-primary text-xs py-2 px-4 hidden sm:flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#030712] animate-pulse" />
            Hire Me
          </a>
        </div>
      </div>
    </header>
  )
}
