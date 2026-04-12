"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"

const platforms = [
  {
    name: "HackTheBox",
    icon: "🟢",
    level: "Script Kiddie → Hacker",
    progress: 42,
    color: "cyan",
    barColor: "from-cyan-400 to-blue-500",
    machines: 8,
    challenges: 15,
    rank: "Hacker",
  },
  {
    name: "PortSwigger Web Security Academy",
    icon: "🔴",
    level: "Practitioner",
    progress: 65,
    color: "red",
    barColor: "from-red-400 to-orange-500",
    machines: 0,
    challenges: 42,
    rank: "Practitioner",
  },
]

const writeup = {
  title: "Reflected XSS via Parameter Pollution",
  severity: "Medium",
  severityColor: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  target: "PortSwigger Lab — DOM-Based XSS",
  cve: "CWE-79",
  steps: [
    { step: "Recon", detail: "Identified URL parameter reflected in response without encoding" },
    { step: "Probe", detail: 'Injected <script>alert(1)</script> — filtered by WAF' },
    { step: "Bypass", detail: "Used event handler payload: \"><img src=x onerror=alert(1)>" },
    { step: "Exploit", detail: "Confirmed execution — extracted session cookie via document.cookie" },
    { step: "Report", detail: "PoC documented with impact: session hijacking / account takeover" },
  ],
}

export default function BugBountySection() {
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

  return (
    <section id="bugbounty" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/8 to-transparent" />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// bug_bounty.status</div>
          <h2 className="section-title">
            Bug Bounty <span className="neon-text">&amp; Labs</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Active on bug bounty platforms and security labs. Building a track record of real vulnerability finds.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Platform cards */}
          <div className="lg:col-span-5 space-y-5">
            {platforms.map((p) => (
              <div key={p.name} className="card-dark rounded-xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{p.name}</div>
                      <span className="mono text-xs text-gray-500">{p.level}</span>
                    </div>
                  </div>
                  <div className="card-dark rounded-lg px-3 py-1.5 text-center">
                    <div className={`font-bold text-sm ${p.color === "cyan" ? "text-cyan-400" : "text-red-400"}`}>
                      {p.rank}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${p.barColor} transition-all duration-1000`}
                    style={{ width: visible ? `${p.progress}%` : "0%" }}
                  />
                </div>
                <div className="flex justify-between text-xs mono text-gray-500 mb-4">
                  <span>Progress</span>
                  <span className={p.color === "cyan" ? "text-cyan-400" : "text-red-400"}>{p.progress}%</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {p.machines > 0 && (
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <div className="text-white font-bold">{p.machines}</div>
                      <div className="text-xs mono text-gray-500">Machines</div>
                    </div>
                  )}
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{p.challenges}</div>
                    <div className="text-xs mono text-gray-500">Challenges</div>
                  </div>
                </div>
              </div>
            ))}

            {/* HackerOne badge */}
            <div className="card-dark rounded-xl p-5 border border-cyan-400/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🏹</span>
                <div>
                  <div className="text-white font-bold text-sm">HackerOne</div>
                  <span className="mono text-xs text-gray-500">Bug Bounty Programs</span>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Actively hunting on public programs. Current focus: SSRF, IDOR in modern SaaS targets.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="tag-cyber">SSRF</span>
                <span className="tag-cyber">IDOR</span>
                <span className="tag-cyber">Auth bypass</span>
              </div>
            </div>
          </div>

          {/* Sample writeup */}
          <div className="lg:col-span-7">
            <div className="card-dark rounded-xl overflow-hidden border border-white/5">
              {/* Writeup header */}
              <div className="bg-gray-900/60 px-6 py-4 border-b border-white/5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="mono text-xs text-gray-400">vulnerability_writeup.md</span>
                  </div>
                  <span className={`mono text-xs border px-2 py-0.5 rounded ${writeup.severityColor}`}>
                    {writeup.severity} Severity
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-white font-bold text-lg">{writeup.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="mono text-xs text-gray-500">{writeup.target}</span>
                    <span className="tag-cyber">{writeup.cve}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {writeup.steps.map((s, i) => (
                    <div key={s.step} className="flex gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                        <span className="mono text-xs text-cyan-400 font-bold">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="mono text-xs text-cyan-400 font-semibold uppercase tracking-wide">
                            {s.step}
                          </span>
                          <ChevronRight className="h-3 w-3 text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-sm">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-400/5 border border-green-400/20 rounded-lg p-4">
                  <div className="mono text-xs text-green-400 font-semibold mb-1">📝 Impact Assessment</div>
                  <p className="text-gray-400 text-sm">
                    Session hijacking possible → Full account takeover. Affected all users with modern browsers.
                    No user interaction required beyond visiting a crafted URL.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs mono text-gray-600 pt-2 border-t border-white/5">
                  <span>PortSwigger XSS Lab Series — Practice Writeup</span>
                  <span className="text-cyan-400">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
