"use client"

import { Shield, Award, BookOpen, Target } from "lucide-react"
import { aboutParagraphs, certifications, education } from "@/lib/site"

const traits = [
  { icon: Target, label: "Think like an attacker", sub: "Offensive-first mindset" },
  { icon: BookOpen, label: "Document like a pro", sub: "Clear, actionable writeups" },
  { icon: Shield, label: "AppSec-first approach", sub: "Secure by design thinking" },
  { icon: Award, label: "Continuous learner", sub: "Labs, CTFs, writeups" },
]

const certIcons = ["🛡️", "⚡", "💻", "🔐"]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[#030712]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14">
          <div className="section-subtitle mb-3">// about.me</div>
          <h2 className="section-title">
            Security Engineer.<br />
            <span className="neon-text">Not a generic dev.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Bio */}
          <div className="lg:col-span-7 space-y-6">
            {aboutParagraphs.map((p, i) => (
              <p key={i} className={i < 2 ? "text-gray-300 text-lg leading-relaxed" : "text-gray-400 text-base leading-relaxed"}>
                {p}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4 pt-4">
              {traits.map((t) => (
                <div key={t.label} className="card-dark rounded-xl p-4 flex items-start gap-3 group">
                  <div className="p-2 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                    <t.icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.label}</div>
                    <div className="text-gray-500 text-xs mono mt-0.5">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certs + Education */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-4">Certifications</div>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div key={cert.name} className="card-dark rounded-xl p-5 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{certIcons[i % certIcons.length]}</span>
                      <div>
                        <div className="text-white font-semibold text-sm leading-snug">{cert.name}</div>
                        <div className="text-gray-500 text-xs mono mt-1">{cert.org} · {cert.date}</div>
                        {cert.id && <span className="tag-cyber mt-2 inline-block">ID: {cert.id}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark rounded-xl p-5">
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-3">Education</div>
              {education.map((e) => (
                <div key={e.degree} className="flex items-start gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="text-white font-semibold">{e.degree}</div>
                    <div className="text-gray-500 text-sm mono mt-1">{e.org}</div>
                    <div className="text-gray-600 text-xs mono mt-1">
                      {e.period}{e.detail ? ` · ${e.detail}` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
