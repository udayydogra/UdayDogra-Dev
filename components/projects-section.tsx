"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Tag } from "lucide-react"

const projects = [
  {
    id: 1,
    emoji: "🎯",
    title: "SSRF Recon Setup",
    badge: "Bug Bounty",
    badgeColor: "tag-red",
    description:
      "Built a HackerOne-style recon methodology for SSRF detection. Set up Burp Collaborator-equivalent (interactsh) for out-of-band detection, combined with paramspider and custom nuclei templates to automate SSRF probing across subdomains.",
    relevance: "Real-world bug bounty methodology — not just theory",
    tools: ["Burp Suite", "interactsh", "ParamSpider", "Nuclei", "Python", "Bash"],
    toolClass: "tag-red",
  },
  {
    id: 2,
    emoji: "⚙️",
    title: "Burp Suite Pro-Level Workflow",
    badge: "AppSec Tooling",
    badgeColor: "tag-cyber",
    description:
      "Engineered a professional Burp Suite workflow without a Pro license. Built custom active scan extensions, integrated SQLmap + FFUF output into Burp project files, and set up scope-aware automated scanning with match-and-replace rules.",
    relevance: "Professional pentest workflow on a community license",
    tools: ["Burp Suite CE", "FFUF", "SQLMap", "Jython Extensions", "Intruder"],
    toolClass: "tag-cyber",
  },
  {
    id: 3,
    emoji: "☁️",
    title: "Kali Linux on Google Cloud",
    badge: "Cloud Lab",
    badgeColor: "tag-green",
    description:
      "Deployed and configured a persistent, high-performance Kali Linux instance on GCP. Set up SSH tunneling, VNC remote access, automated tool installation, and configured firewall rules for safe pentesting without residential IP exposure.",
    relevance: "Cloud-based pentest lab — scales with testing needs",
    tools: ["Google Cloud", "Kali Linux", "SSH", "VNC", "Firewall Rules", "Bash"],
    toolClass: "tag-green",
  },
  {
    id: 4,
    emoji: "🔍",
    title: "Python Web Scraper + GUI",
    badge: "Recon Tooling",
    badgeColor: "tag-cyber",
    description:
      "Developed a multi-threaded Python web scraper with a Tkinter GUI for structured recon. Features URL harvesting, form extraction, parameter enumeration, and export to JSON/CSV — useful for pre-engagement reconnaissance.",
    relevance: "Recon automation — speeds up target enumeration",
    tools: ["Python", "Tkinter", "BeautifulSoup", "Requests", "Threading"],
    toolClass: "tag-cyber",
  },
  {
    id: 5,
    emoji: "📋",
    title: "Advanced Note-Taking App",
    badge: "Productivity",
    badgeColor: "tag-green",
    description:
      "Built a structured note-taking application tailored for security research — with PDF import/export, vulnerability templates, evidence screenshot embedding, and markdown support. Organizes findings by severity and vector.",
    relevance: "Professional vulnerability documentation — report-ready output",
    tools: ["Python", "Tkinter", "PyMuPDF", "SQLite", "Markdown"],
    toolClass: "tag-green",
  },
]

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
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// projects.filter(real)</div>
          <h2 className="section-title">
            What I've <span className="neon-text">Built</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Security-focused projects with real-world applicability. Each one solves an actual problem in the offensive security workflow.
          </p>
        </div>

        {/* Project grid — first 3 in row, last 2 centered */}
        <div
          className={`space-y-5 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 100} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:px-[12.5%]">
            {projects.slice(3).map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={(i + 3) * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, delay }: { project: (typeof projects)[0]; delay: number }) {
  return (
    <div
      className="card-dark border rounded-xl p-6 group hover:scale-[1.01] transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{p.emoji}</span>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{p.title}</h3>
            <span className={p.badgeColor}>{p.badge}</span>
          </div>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.description}</p>

      {/* Real-world relevance */}
      <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-lg px-3 py-2 mb-5 flex items-start gap-2">
        <Tag className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
        <span className="text-xs mono text-cyan-400">{p.relevance}</span>
      </div>

      {/* Tool tags */}
      <div className="flex flex-wrap gap-1.5">
        {p.tools.map((t) => (
          <span key={t} className={p.toolClass}>{t}</span>
        ))}
      </div>
    </div>
  )
}
