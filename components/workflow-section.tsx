"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: "🔭",
    title: "Recon",
    color: "cyan",
    borderColor: "border-cyan-400/40",
    titleColor: "text-cyan-400",
    tools: ["Subfinder", "Amass", "Shodan", "WHOIS"],
    desc: "Passive + active target discovery. Map attack surface before touching a single endpoint.",
  },
  {
    id: 2,
    icon: "🌐",
    title: "Enumeration",
    color: "blue",
    borderColor: "border-blue-400/40",
    titleColor: "text-blue-400",
    tools: ["Nmap", "httprobe", "httpx", "Wayback"],
    desc: "Subdomain probing, port scanning, JS file mining, endpoint discovery.",
  },
  {
    id: 3,
    icon: "💥",
    title: "Fuzzing",
    color: "yellow",
    borderColor: "border-yellow-400/40",
    titleColor: "text-yellow-400",
    tools: ["FFUF", "Gobuster", "ParamSpider", "Arjun"],
    desc: "Directory, parameter, and header fuzzing. Find what devs forgot to hide.",
  },
  {
    id: 4,
    icon: "⚔️",
    title: "Exploitation",
    color: "red",
    borderColor: "border-red-400/40",
    titleColor: "text-red-400",
    tools: ["Burp Suite", "SQLMap", "XSStrike", "Custom PoC"],
    desc: "Confirm and chain vulnerabilities. SSRF, IDOR, XSS, SQLi — test all identified vectors.",
  },
  {
    id: 5,
    icon: "📄",
    title: "Reporting",
    color: "green",
    borderColor: "border-green-400/40",
    titleColor: "text-green-400",
    tools: ["Markdown", "PoC Videos", "CVSS Score", "Remediation"],
    desc: "Clear, reproducible reports. Severity scoring, impact analysis, remediation steps.",
  },
]

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
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
    <section id="workflow" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// attack.workflow()</div>
          <h2 className="section-title">
            My Attack <span className="neon-text">Methodology</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Systematic, repeatable, documented. This is how I approach every target — not random, always structured.
          </p>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div
          className={`hidden lg:block transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-start flex-1">
                <div
                  className={`flex-1 card-dark border rounded-xl p-5 cursor-pointer transition-all duration-300 ${step.borderColor} ${
                    activeStep === step.id ? "scale-[1.03] shadow-lg shadow-cyan-400/10" : "hover:scale-[1.02]"
                  }`}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step number */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`mono text-xs ${step.titleColor} opacity-60`}>0{step.id}</div>
                    <div className={`flex-1 h-px opacity-20 ${step.borderColor.replace("border-", "bg-").replace("/40", "")}`} />
                  </div>

                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className={`font-bold text-base mb-2 ${step.titleColor}`}>{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{step.desc}</p>

                  <div className="flex flex-wrap gap-1">
                    {step.tools.map((t) => (
                      <span key={t} className="mono text-[10px] bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex items-center px-1 mt-8">
                    <ArrowRight className="h-4 w-4 text-cyan-400/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div
          className={`lg:hidden space-y-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {steps.map((step, i) => (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 ${step.borderColor} flex items-center justify-center flex-shrink-0`}>
                  <span className={`mono text-xs font-bold ${step.titleColor}`}>{step.id}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-gradient-to-b from-cyan-400/20 to-transparent" />
                )}
              </div>
              <div className={`card-dark border rounded-xl p-4 flex-1 mb-2 ${step.borderColor}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <h3 className={`font-bold ${step.titleColor}`}>{step.title}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-3">{step.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {step.tools.map((t) => (
                    <span key={t} className="mono text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy quote */}
        <div className="mt-12 card-dark rounded-xl p-6 border border-cyan-400/10 text-center">
          <p className="mono text-gray-400 text-sm">
            <span className="text-cyan-400">&gt;</span>{" "}
            "A vulnerability found is a vulnerability fixed. Systematic methodology beats random poking every time."
          </p>
        </div>
      </div>
    </section>
  )
}
