"use client"

import { Mail, Github, Send, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[#030712]">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// contact.init()</div>
          <h2 className="section-title">
            Let's <span className="neon-text">Connect</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Recruiting for AppSec? Collaborating on security research? Open to serious opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-dark rounded-xl p-6 border border-cyan-400/10">
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-5">Contact Info</div>
              <div className="space-y-4">
                <a
                  href="mailto:udaydogra204@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-2.5 bg-cyan-400/10 border border-cyan-400/20 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm group-hover:neon-text transition-all">
                      udaydogra204@gmail.com
                    </div>
                    <div className="text-gray-500 text-xs mono">Primary contact</div>
                  </div>
                </a>

                <a
                  href="https://github.com/udayydogra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Github className="h-5 w-5 text-gray-300" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">github.com/udayydogra</div>
                    <div className="text-gray-500 text-xs mono">Projects &amp; code</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">India</div>
                    <div className="text-gray-500 text-xs mono">Open to remote &amp; on-site</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-green-400/10 border border-green-400/20 rounded-lg">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm flex items-center gap-2">
                      Available
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                    </div>
                    <div className="text-gray-500 text-xs mono">Actively looking for AppSec roles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What I'm looking for */}
            <div className="card-dark rounded-xl p-6 border border-white/5">
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-4">Looking For</div>
              <div className="space-y-2">
                {[
                  "Application Security Engineer roles",
                  "Bug Bounty collaboration",
                  "Security research partnerships",
                  "Pentest internships / contracts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Message form */}
          <div className="lg:col-span-7">
            <div className="card-dark rounded-xl p-8 border border-white/5">
              <div className="mono text-xs text-gray-500 uppercase tracking-widest mb-6">Send a message</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  window.location.href = "mailto:udaydogra204@gmail.com"
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mono text-xs text-gray-500 uppercase tracking-widest mb-2 block">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-gray-500 uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="mono text-xs text-gray-500 uppercase tracking-widest mb-2 block">Subject</label>
                  <input
                    type="text"
                    placeholder="AppSec role / Collaboration / Bug bounty"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="mono text-xs text-gray-500 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about the opportunity or project..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
