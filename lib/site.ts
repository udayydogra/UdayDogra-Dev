// Central site content & configuration.
// Edit personal data here; components read from this file.

export const SITE_URL = "https://udaydogra.com" // TODO: set to your real domain

export const site = {
  name: "Uday Dogra",
  handle: "ud0g",
  role: "Application Security Engineer",
  tagline:
    "I build and break modern web applications — secure code review, OWASP Top 10, threat modeling and DevSecOps automation, with a documented root-cause-to-fix methodology for every finding.",
  location: "India · open to remote (US / Europe / APAC) & on-site",
  availability: "Actively interviewing for Application Security / Product Security roles",
  resumeUrl: "/Uday-Dogra-Resume.pdf",
  emails: {
    primary: "workforudaydogra@gmail.com",
    secondary: "udaydogra204@gmail.com",
  },
  socials: {
    github: "https://github.com/udayydogra",
    linkedin: "https://www.linkedin.com/in/udaydogra/",
    instagram: "https://www.instagram.com/UDAYYDOGRA",
    twitter: "https://x.com/udaydogra", // TODO: confirm URL
    hackerone: "https://hackerone.com/udaydogra", // TODO: confirm URL
    hackthebox: "https://app.hackthebox.com/profile", // TODO: add profile id
  },
}

// Honest, verifiable stat line — no inflated "vulns found" claims.
export const currentFocus = [
  "Working through the PortSwigger Web Security Academy",
  "Preparing for the Burp Suite Certified Practitioner (BSCP)",
  "Building recon tooling & documenting lab writeups",
]

export const aboutParagraphs = [
  "I'm Uday Dogra, a B.Tech Computer Science graduate focused on Application Security and offensive web security. I don't just learn security — I apply it: digging into real applications, understanding why they break, and documenting findings with clarity.",
  "My approach is attacker-first. I study how web applications fail — through SSRF, IDOR, XSS, injection, access-control and business-logic flaws — and build a repeatable methodology to find them. Every lab ends with a root-cause analysis and a concrete remediation a dev team could actually action.",
  "I'm early in my security career and honest about it: I've systematically worked through much of the PortSwigger Web Security Academy, I'm preparing for the BSCP certification, and I'm building the habits — recon pipelines, structured note-taking, clean writeups — that the job actually rewards.",
]

export type Skill = { group: string; items: string[] }
export const skills: Skill[] = [
  {
    group: "Application Security",
    items: ["OWASP Top 10", "OWASP API Security Top 10", "Secure Code Review", "Threat Modeling", "Secure SDLC", "AuthN / AuthZ", "JWT / OAuth 2.0 / SAML", "Session Management"],
  },
  {
    group: "Security Testing & Tooling",
    items: ["Burp Suite", "OWASP ZAP", "Nuclei", "ffuf", "Nmap", "Semgrep", "Gitleaks", "Trivy", "CodeQL"],
  },
  {
    group: "Cloud & DevSecOps",
    items: ["AWS", "Docker", "Kubernetes", "IAM", "GitHub Actions CI/CD", "SAST / DAST / SCA", "Dependabot", "Container Security"],
  },
  {
    group: "Languages & Development",
    items: ["Python", "JavaScript", "TypeScript", "Go", "Bash", "React / Next.js", "Express / FastAPI", "PostgreSQL / Redis"],
  },
]

export type Experience = {
  role: string
  org: string
  period: string
  points: string[]
  tags: string[]
}
export const experience: Experience[] = [
  {
    role: "Application Security Engineer (Intern)",
    org: "NIELIT Haridwar",
    period: "2025",
    points: [
      "Built a bilingual Application Security training platform — 22 OWASP-mapped, hands-on vulnerability labs (SQLi, XSS, IDOR, SSRF, XXE) with server-side scoring so completion can't be forged.",
      "Designed a tiered, Docker-based sandbox so live per-user exploit containers stay isolated and cheap to run across 10 services.",
      "Implemented authentication and RBAC-as-data (4 roles, 20 permissions) with 65 authorization enforcement points across 70 API routes.",
      "Added a scenario-based cyber-awareness module (UPI, phishing, and 'digital arrest' fraud simulations) for non-technical users.",
    ],
    tags: ["AppSec", "TypeScript", "Docker", "RBAC", "PostgreSQL"],
  },
  {
    role: "President",
    org: "Coding Club",
    period: "Jan 2025 — Present",
    points: [
      "Organize and lead hackathons, technical quizzes, and alumni knowledge-sharing sessions.",
      "Mentor junior developers and coordinate peer-learning initiatives.",
    ],
    tags: ["Leadership", "Mentoring", "Events"],
  },
  {
    role: "Member",
    org: "Coding Club",
    period: "Jan 2023 — Dec 2024",
    points: [
      "Assisted in planning and logistics for bootcamps and workshops.",
      "Supported digital outreach and technical content creation.",
    ],
    tags: ["Teamwork", "Community"],
  },
]

export type Education = { degree: string; org: string; period: string; detail?: string }
export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    org: "I.K. Gujral Punjab Technical University",
    period: "2022 — Present",
    detail: "CGPA 7.8 / 10",
  },
]

export type Cert = { name: string; org: string; date: string; id?: string }
export const certifications: Cert[] = [
  { name: "CyberSecurity & Network Defense", org: "C-DAC, Noida", date: "Oct 2024", id: "1566/330088/CG/(20)/2024" },
  { name: "CyberSecurity Fundamentals", org: "A2IT", date: "Jul 2024", id: "A2ITMH-11001" },
  { name: "React.js Frontend Development", org: "Internshala", date: "Aug 2024", id: "7brw416ce5ybIcsa" },
]

export type Project = {
  title: string
  category: string
  description: string
  relevance: string
  tools: string[]
  github?: string
  live?: string
}
export const projects: Project[] = [
  {
    title: "NIELIT AppSec + Cyber-Awareness Platform",
    category: "Security Training Platform",
    description:
      "A bilingual (EN / हिंदी) security-training platform running on a single ~5 GB VM. 38 labs — 22 hands-on OWASP-mapped vulnerability labs (SQLi, XSS, IDOR, SSRF, XXE…) you actually exploit against real targets, plus 16 scenario-based fraud simulations. Server-scored, RBAC-as-data (4 roles / 20 permissions), tiered Docker execution across 10 services.",
    relevance: "Flagship build — real vulnerable-app labs + scam sims; completion can't be forged.",
    tools: ["TypeScript", "React", "Express", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/udayydogra/nielit-appsec-cyber-awareness",
  },
  {
    title: "MANTIS",
    category: "Security SaaS · SAST/SCA",
    description:
      "A multi-tenant security-scanning SaaS. Ingests a GitHub repo, runs Semgrep, Gitleaks & Trivy in parallel least-privilege containers, normalizes every finding into one canonical OWASP-mapped schema (200+ CWEs), enriches it with AI (Gemini), and serves it through an org-scoped dashboard with RBAC, Stripe billing, and downloadable PDF reports.",
    relevance: "SAST + secret + dependency scanning, AI-enriched and multi-tenant.",
    tools: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "BullMQ", "Docker", "Stripe"],
    github: "https://github.com/udayydogra/mantis",
  },
  {
    title: "ReconFlow",
    category: "Attack Surface Management",
    description:
      "An enterprise-grade bug-bounty automation platform that unifies the full recon pipeline — subdomain enumeration → DNS → HTTP probing → port scanning → tech fingerprinting → endpoint discovery → Nuclei scanning → finding correlation → professional reports — into one continuously-monitoring ASM engine.",
    relevance: "Automates the entire recon-to-report pipeline.",
    tools: ["FastAPI", "PostgreSQL", "Redis", "Nuclei", "subfinder", "httpx", "Docker"],
    github: "https://github.com/udayydogra/ReconFlow",
  },
  {
    title: "SynaptiFlow",
    category: "AI · Full-Stack Platform",
    description:
      "An AI-driven note-taking and research productivity platform. Built a document parser, RAG-based semantic search over user notes, and the backend APIs — turning unstructured research into structured, searchable knowledge.",
    relevance: "Live product — synaptiflow.space.",
    tools: ["React.js", "PostgreSQL", "Python", "RAG", "REST APIs"],
    live: "https://www.synaptiflow.space",
  },
  {
    title: "UltraFocus",
    category: "Linux Security Tooling",
    description:
      "A system-level distraction blocker for Linux. Null-routes 60+ social/news/OTT domains via /etc/hosts + iptables, runs a local Python intercept server on ports 80/443, and injects self-signed certs into the trust store so blocked traffic redirects cleanly to a focus page — no browser warnings.",
    relevance: "Aggressive OS-level focus enforcement.",
    tools: ["Python", "Bash", "iptables", "DNS", "SSL/TLS", "systemd"],
    github: "https://github.com/udayydogra/ultrafocus",
  },
]
