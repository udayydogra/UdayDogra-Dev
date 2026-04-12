"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, AlertCircle, Wrench, Cloud } from "lucide-react"

const skillGroups = [
  {
    title: "Web Fundamentals",
    icon: Globe,
    color: "cyan",
    borderColor: "border-cyan-400/30 hover:border-cyan-400/60",
    iconBg: "bg-cyan-400/10",
    iconColor: "text-cyan-400",
    tagClass: "tag-cyber",
    skills: ["HTTP / HTTPS", "Request Headers", "Cookies & Sessions", "TLS / SSL", "REST APIs", "OAuth 2.0", "CORS", "Same-Origin Policy"],
  },
  {
    title: "Vulnerabilities",
    icon: AlertCircle,
    color: "red",
    borderColor: "border-red-400/30 hover:border-red-400/60",
    iconBg: "bg-red-400/10",
    iconColor: "text-red-400",
    tagClass: "tag-red",
    skills: ["XSS (Reflected / Stored / DOM)", "SSRF", "IDOR", "SQL Injection", "CSRF", "XXE", "Open Redirect", "Business Logic Flaws"],
  },
  {
    title: "Security Tools",
    icon: Wrench,
    color: "green",
    borderColor: "border-green-400/30 hover:border-green-400/60",
    iconBg: "bg-green-400/10",
    iconColor: "text-green-400",
    tagClass: "tag-green",
    skills: ["Burp Suite", "Nmap", "FFUF", "Subfinder", "Kali Linux", "Metasploit", "Nikto", "Gobuster"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    color: "blue",
    borderColor: "border-blue-400/30 hover:border-blue-400/60",
    iconBg: "bg-blue-400/10",
    iconColor: "text-blue-400",
    tagClass: "",
    extraTagStyle: "bg-blue-400/10 border border-blue-400/30 text-blue-400 font-mono text-xs px-2.5 py-1 rounded inline-block",
    skills: ["Google Cloud Platform", "AWS Basics", "Linux (Kali / Ubuntu)", "Docker Basics", "Shell Scripting", "Python Scripting"],
  },
]

export default function SkillsSection() {
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
    <section id="skills" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 via-transparent to-transparent" />
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// skills.map()</div>
          <h2 className="section-title">
            Technical <span className="neon-text">Arsenal</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            No fluff. Real skills organized the way an AppSec engineer thinks.
          </p>
        </div>

        {/* Skills grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skillGroups.map((group, gi) => {
            const Icon = group.icon
            return (
              <div
                key={group.title}
                className={`card-dark border rounded-xl p-6 transition-all duration-300 ${group.borderColor}`}
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${group.iconBg}`}>
                    <Icon className={`h-5 w-5 ${group.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{group.title}</h3>
                    <span className={`mono text-xs ${group.iconColor} opacity-60`}>
                      {group.skills.length} skills
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={group.tagClass || group.extraTagStyle}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 card-dark rounded-xl p-5 border border-cyan-400/10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono text-xs text-gray-500 uppercase tracking-widest mr-2">Also know:</span>
            {["Python", "JavaScript", "C", "C++", "Flask", "PostgreSQL", "Git", "VS Code"].map((t) => (
              <span key={t} className="mono text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
