"use client"

import { useState, useEffect } from "react"
import { Shield, ChevronDown, Github, Mail, Terminal, FileDown } from "lucide-react"
import Image from "next/image"
import { site, currentFocus, projects, certifications } from "@/lib/site"

const roles = [site.role, "Secure Code Review", "Threat Modeling", "DevSecOps Automation"]

const stats = [
  { val: `${projects.length}`, label: "Projects", color: "text-cyan-400" },
  { val: `${certifications.length}`, label: "Certifications", color: "text-green-400" },
  { val: "BSCP", label: "In Progress", color: "text-red-400" },
]

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      }))
    )
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: NodeJS.Timeout
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => { setTypedText(current.slice(0, charIndex + 1)); setCharIndex((c) => c + 1) }, 80)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => { setTypedText(current.slice(0, charIndex - 1)); setCharIndex((c) => c - 1) }, 40)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false); setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.08)_0%,transparent_70%)]" />

      <div className="absolute inset-0 z-10">
        {particles.map((p, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-40"
               style={{ left: p.left, top: p.top, animationDelay: p.delay, animation: `float ${p.duration} ease-in-out infinite` }} />
        ))}
      </div>

      <div className="relative z-20 w-full px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto">

          {/* Mobile */}
          <div className="block lg:hidden space-y-8 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl scale-110 animate-glow" />
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-cyan-400/40">
                  <Image src="/My-profile.jpeg" alt={site.name} fill className="object-cover" priority />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="mono text-xs text-green-400 uppercase tracking-widest">Actively interviewing</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-none">
                Uday<span className="neon-text"> Dogra</span>
              </h1>
              <div className="h-10 flex items-center justify-center">
                <span className="text-lg text-gray-400 mono">{typedText}<span className="terminal-cursor text-cyan-400">|</span></span>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">{site.tagline}</p>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="card-dark rounded-lg p-3 text-center">
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-gray-500 mono mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => scrollTo("projects")} className="btn-primary text-sm px-5 py-2.5">View Work</button>
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-5 py-2.5">Résumé</a>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="mono text-sm text-green-400 uppercase tracking-widest">Actively interviewing · AppSec / Product Security</span>
              </div>

              <div className="space-y-3">
                <div className="mono text-cyan-400 text-sm tracking-widest uppercase opacity-80">&gt; init_portfolio --mode=offensive</div>
                <h1 className="text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                  Breaking<br />
                  <span className="neon-text glitch-text">Applications</span><br />
                  <span className="text-gray-300 text-5xl xl:text-6xl">Before Hackers Do</span>
                </h1>
              </div>

              <div className="h-8 flex items-center">
                <Shield className="h-5 w-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-xl text-gray-300 mono">{typedText}<span className="terminal-cursor text-cyan-400">|</span></span>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{site.tagline}</p>

              <div className="grid grid-cols-3 gap-5 max-w-lg">
                {stats.map((s) => (
                  <div key={s.label} className="card-dark rounded-xl p-5 text-center hover:scale-105 transition-transform">
                    <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-gray-500 mono mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => scrollTo("projects")} className="btn-primary flex items-center gap-2">
                  <Terminal className="h-4 w-4" /> View Work
                </button>
                <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Résumé
                </a>
                <a href={`mailto:${site.emails.primary}`} className="p-3 card-dark rounded-lg hover:scale-105 transition-all flex items-center justify-center" aria-label="Email">
                  <Mail className="h-5 w-5 text-gray-400" />
                </a>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 card-dark rounded-lg hover:scale-105 transition-all flex items-center justify-center" aria-label="GitHub">
                  <Github className="h-5 w-5 text-gray-400" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-3xl scale-110 animate-glow" />
                <div className="absolute inset-[-12px] rounded-full border border-dashed border-cyan-400/20 animate-spin-slow" />
                <div className="relative w-64 h-64 xl:w-72 xl:h-72 rounded-full overflow-hidden border-2 border-cyan-400/30">
                  <Image src="/My-profile.jpeg" alt={site.name} fill className="object-cover" priority />
                </div>
                <div className="absolute bottom-2 right-2 bg-green-400 rounded-full w-6 h-6 border-2 border-[#030712] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-900" />
                </div>
              </div>

              {/* Currently card — honest, no invented metrics */}
              <div className="card-dark rounded-xl p-5 w-full max-w-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span className="mono text-xs text-cyan-400 uppercase tracking-widest">Currently</span>
                </div>
                <ul className="space-y-2.5">
                  {currentFocus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-400 mono leading-relaxed">
                      <span className="text-cyan-400 mt-px">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
            <span className="mono text-xs text-gray-500">scroll</span>
            <ChevronDown className="h-4 w-4 text-gray-500 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
