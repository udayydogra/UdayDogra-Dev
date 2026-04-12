"use client"

import { Shield, Award, BookOpen, Target } from "lucide-react"

const certs = [
  {
    title: "Ethical Hacking & Penetration Testing",
    issuer: "CDAC",
    icon: "🛡️",
    color: "border-cyan-400/30 hover:border-cyan-400/60",
    tag: "Offensive Security",
  },
  {
    title: "Port Exploitation using Metasploit",
    issuer: "A2IT",
    icon: "⚡",
    color: "border-red-400/30 hover:border-red-400/60",
    tag: "Exploitation",
  },
  {
    title: "React Web Development",
    issuer: "Internshala",
    icon: "💻",
    color: "border-blue-400/30 hover:border-blue-400/60",
    tag: "Frontend",
  },
]

const traits = [
  { icon: Target, label: "Think like an attacker", sub: "Offensive-first mindset" },
  { icon: BookOpen, label: "Document like a pro", sub: "Clear, actionable writeups" },
  { icon: Shield, label: "AppSec-first approach", sub: "Secure by design thinking" },
  { icon: Award, label: "Continuous learner", sub: "Labs, CTFs, writeups" },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[#030712]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// about.me</div>
          <h2 className="section-title">
            Security Researcher.<br />
            <span className="neon-text">Not a generic dev.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Bio */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm <span className="text-white font-semibold">Uday Dogra</span>, a B.Tech Computer Science graduate 
              with a sharp focus on <span className="neon-text font-semibold">Application Security</span> and 
              offensive web security. I don't just learn security — I apply it: digging into real applications, 
              finding real vulnerabilities, and documenting them with clarity.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My approach is attacker-first. I study how web applications break — through SSRF, IDOR, XSS, 
              injection attacks — and build methodologies to find them systematically. Every engagement ends 
              with a clean, professional report that a security team can actually action.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Currently active on <span className="text-white">HackTheBox</span> and{" "}
              <span className="text-white">PortSwigger Web Security Academy</span>, building recon pipelines 
              on cloud infrastructure, and pursuing bug bounty programs on{" "}
              <span className="text-white">HackerOne</span>.
            </p>

            {/* Trait grid */}
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
                {certs.map((cert) => (
                  <div
                    key={cert.title}
                    className={`card-dark rounded-xl p-5 border transition-all duration-300 ${cert.color}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm leading-snug">{cert.title}</div>
                        <div className="text-gray-500 text-xs mono mt-1">{cert.issuer}</div>
                        <span className="tag-cyber mt-2 inline-block">{cert.tag}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark rounded-xl p-5">
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-3">Education</div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <div className="text-white font-semibold">B.Tech Computer Science</div>
                  <div className="text-gray-500 text-sm mono mt-1">Computer Science & Engineering</div>
                  <div className="text-gray-600 text-xs mono mt-1">2021 – 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
