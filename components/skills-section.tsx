"use client"

import { useState, useEffect, useRef } from "react"
import { ShieldCheck, Bug, Cloud, Code2 } from "lucide-react"
import { skills } from "@/lib/site"

const styles = [
  { icon: ShieldCheck, borderColor: "border-cyan-400/30 hover:border-cyan-400/60", iconBg: "bg-cyan-400/10", iconColor: "text-cyan-400", tagClass: "tag-cyber" },
  { icon: Bug, borderColor: "border-red-400/30 hover:border-red-400/60", iconBg: "bg-red-400/10", iconColor: "text-red-400", tagClass: "tag-red" },
  { icon: Cloud, borderColor: "border-blue-400/30 hover:border-blue-400/60", iconBg: "bg-blue-400/10", iconColor: "text-blue-400", tagClass: "tag-green" },
  { icon: Code2, borderColor: "border-green-400/30 hover:border-green-400/60", iconBg: "bg-green-400/10", iconColor: "text-green-400", tagClass: "tag-green" },
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
        <div className="mb-14">
          <div className="section-subtitle mb-3">// skills.map()</div>
          <h2 className="section-title">
            Technical <span className="neon-text">Arsenal</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            No fluff. Real skills organized the way an AppSec engineer thinks.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skills.map((group, gi) => {
            const s = styles[gi % styles.length]
            const Icon = s.icon
            return (
              <div
                key={group.group}
                className={`card-dark border rounded-xl p-6 transition-all duration-300 ${s.borderColor}`}
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${s.iconBg}`}>
                    <Icon className={`h-5 w-5 ${s.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{group.group}</h3>
                    <span className={`mono text-xs ${s.iconColor} opacity-60`}>
                      {group.items.length} skills
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className={s.tagClass}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
