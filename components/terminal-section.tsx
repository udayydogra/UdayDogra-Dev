"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Github, ExternalLink, ImageOff } from "lucide-react"

type Tool = {
  key: string
  name: string
  tag: string
  blurb: string
  tech: string[]
  shots: { src: string; label: string }[]
  github?: string
  live?: string
}

const tools: Tool[] = [
  {
    key: "nielit",
    name: "NIELIT AppSec Platform",
    tag: "Security Training Platform",
    blurb:
      "Bilingual platform on a single ~5 GB VM — 22 OWASP-mapped hands-on vulnerability labs plus 16 scenario-based scam simulations. Server-scored, RBAC-as-data, tiered Docker execution.",
    tech: ["TypeScript", "React", "Express", "PostgreSQL", "Docker"],
    shots: [
      { src: "/tools/nielit-dashboard.png", label: "Dashboard" },
      { src: "/tools/nielit-container.png", label: "Live Container" },
      { src: "/tools/nielit-sqli.png", label: "SQLi Lab" },
      { src: "/tools/nielit-labs.png", label: "Lab Catalogue" },
      { src: "/tools/nielit-scam.png", label: "Scam Sim" },
    ],
    github: "https://github.com/udayydogra/nielit-appsec-cyber-awareness",
  },
  {
    key: "ultrafocus",
    name: "UltraFocus",
    tag: "Linux Security Tooling",
    blurb:
      "System-level distraction blocker for Linux — null-routes 60+ domains via /etc/hosts + iptables, runs a local Python intercept server on 80/443, and injects self-signed certs so blocked traffic redirects cleanly.",
    tech: ["Python", "Bash", "iptables", "SSL/TLS", "systemd"],
    shots: [{ src: "/tools/ultrafocus.png", label: "Focus page" }],
    github: "https://github.com/udayydogra/ultrafocus",
  },
  {
    key: "mantis",
    name: "MANTIS",
    tag: "Security SaaS · SAST/SCA",
    blurb:
      "Multi-tenant security-scanning SaaS — runs Semgrep, Gitleaks & Trivy in parallel least-privilege containers, normalizes findings to one OWASP-mapped schema, AI-enriches them, and serves org-scoped dashboards with Stripe billing.",
    tech: ["TypeScript", "Fastify", "Next.js", "BullMQ", "Docker"],
    shots: [],
    github: "https://github.com/udayydogra/mantis",
  },
  {
    key: "reconflow",
    name: "ReconFlow",
    tag: "Attack Surface Management",
    blurb:
      "Enterprise-grade bug-bounty automation — a unified recon pipeline from subdomain enumeration through probing, port scanning, Nuclei scanning, finding correlation, and professional reports, with continuous ASM.",
    tech: ["FastAPI", "PostgreSQL", "Nuclei", "subfinder", "Docker"],
    shots: [],
    github: "https://github.com/udayydogra/ReconFlow",
  },
]

export default function TerminalSection() {
  const [active, setActive] = useState(0)
  const [shot, setShot] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const tool = tools[active]
  const selectTool = (i: number) => { setActive(i); setShot(0) }

  return (
    <section id="terminal" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14">
          <div className="section-subtitle mb-3">// tools.built</div>
          <h2 className="section-title">
            Tools in <span className="neon-text">Action</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Security platforms and tooling I&apos;ve actually built — not just commands I ran.
          </p>
        </div>

        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Screenshot window */}
            <div className="lg:col-span-8">
              <div className="card-dark rounded-xl overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-400/5">
                {/* Title bar */}
                <div className="bg-gray-900/80 px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="mono text-xs text-gray-400">{tool.name}</span>
                  </div>
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer"
                       className="text-gray-500 hover:text-cyan-400 transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {/* Screenshot / placeholder */}
                <div className="relative bg-[#0d1117] aspect-[16/10]">
                  {tool.shots.length > 0 ? (
                    <Image
                      key={tool.shots[shot].src}
                      src={tool.shots[shot].src}
                      alt={`${tool.name} — ${tool.shots[shot].label}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority={active === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 cyber-grid">
                      <ImageOff className="h-8 w-8 text-gray-600 mb-3" />
                      <p className="mono text-xs text-gray-500 max-w-xs">
                        No screenshot yet — drop one in <span className="text-cyan-400">public/tools/</span> and it&apos;ll
                        appear here.
                      </p>
                      {tool.github && (
                        <a href={tool.github} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5 text-sm px-4 py-2 inline-flex items-center gap-2">
                          <Github className="h-4 w-4" /> View source
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Shot thumbnails */}
                {tool.shots.length > 1 && (
                  <div className="flex flex-wrap gap-2 bg-gray-900/60 px-4 py-3 border-t border-white/5">
                    {tool.shots.map((s, i) => (
                      <button
                        key={s.src}
                        onClick={() => setShot(i)}
                        className={`mono text-[0.7rem] px-3 py-1.5 rounded border transition-all ${
                          i === shot
                            ? "bg-cyan-400/10 border-cyan-400/50 text-cyan-400"
                            : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tool info */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <span className="tag-cyber">{tool.tag}</span>
                <h3 className="text-white font-bold text-2xl mt-3">{tool.name}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{tool.blurb}</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.tech.map((t) => (
                  <span key={t} className="tag-cyber">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                {tool.github && (
                  <a href={tool.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-4 py-2 inline-flex items-center gap-2">
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
                {tool.live && (
                  <a href={tool.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tool selector pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {tools.map((t, i) => (
              <button
                key={t.key}
                onClick={() => selectTool(i)}
                className={`mono text-xs px-4 py-2 rounded-lg border transition-all ${
                  active === i
                    ? "bg-cyan-400/10 border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
