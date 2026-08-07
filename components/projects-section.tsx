"use client"

import { useState, useEffect, useRef } from "react"
import { Github, ExternalLink, Tag } from "lucide-react"
import { projects } from "@/lib/site"

const badgeCycle = ["tag-cyber", "tag-red", "tag-green"]

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14">
          <div className="section-subtitle mb-3">// projects.filter(real)</div>
          <h2 className="section-title">
            What I&apos;ve <span className="neon-text">Built</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Security platforms and tooling with real-world applicability — each solves an actual problem.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((p, i) => {
            const badge = badgeCycle[i % badgeCycle.length]
            const href = p.live || p.github
            return (
              <div
                key={p.title}
                className="card-dark border rounded-xl p-6 group hover:scale-[1.01] transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div>
                    <span className={badge}>{p.category}</span>
                    <h3 className="text-white font-bold text-lg leading-tight mt-2">{p.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}
                         className="text-gray-600 hover:text-cyan-400 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {href && (
                      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}
                         className="text-gray-600 hover:text-cyan-400 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.description}</p>

                <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-lg px-3 py-2 mb-5 flex items-start gap-2">
                  <Tag className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs mono text-cyan-400">{p.relevance}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span key={t} className={badge}>{t}</span>
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
