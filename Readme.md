# udaydogra.dev

> A personal Application Security portfolio showcasing security engineering projects, technical write-ups, research, architecture documents, automation platforms, and professional experience.

---

# Overview

udaydogra.dev is the central hub that brings together every project, research article, technical write-up, and learning milestone developed throughout this portfolio.

Rather than serving as a traditional personal website, it is designed as an interactive engineering portfolio where recruiters, hiring managers, and security engineers can explore projects exactly as they would internal engineering documentation.

Every project is fully documented with its architecture, threat model, implementation, demonstrations, source code, technical reports, and future roadmap.

The website represents the final deliverable of the entire Application Security roadmap.

---

# Vision

Create a portfolio that demonstrates engineering ability rather than simply listing technologies.

Every page should answer the following questions:

- What problem was solved?
- Why was the project built?
- How was it designed?
- How does it work?
- What security challenges were encountered?
- How were they solved?
- What did I learn?

The objective is to make the portfolio itself an extension of the projects.

---

# Project Goals

- Showcase all Application Security projects.
- Demonstrate engineering thinking.
- Publish technical research.
- Maintain a professional security blog.
- Provide architecture documentation.
- Present vulnerability write-ups.
- Host downloadable resumes.
- Serve as a single entry point for recruiters.

---

# Why This Project?

Most portfolios contain only screenshots and GitHub links.

A hiring manager cannot understand:

- Engineering decisions
- System architecture
- Security methodology
- Threat models
- Technical documentation

udaydogra.dev is designed to solve this by presenting every project with production-quality documentation similar to internal engineering documentation used at technology companies.

---

# High-Level Architecture

```text
                    Visitor
                       │
               Next.js Frontend
                       │
      ┌────────────────┼────────────────┐
      │                │                │
 Projects         Blog System      Resume
      │                │                │
      ├────────────────┼────────────────┤
      │                │                │
 Research      Architecture Docs   Contact
                       │
               Static Generation
                       │
                 Vercel Deployment
```

---

# Website Sections

## Home

Provides an overview of

- Professional Summary
- Featured Projects
- Technical Skills
- Latest Articles
- Contact Information

---

## Projects

Dedicated pages for every engineering project.

### Featured Projects

- AegisSOC
- SentinelForge
- BlackCart
- APIZero
- ReconFlow

Each project contains

- Overview
- Architecture
- Technology Stack
- Threat Model
- Screenshots
- Source Code
- Documentation
- Future Roadmap

---

## Technical Blog

A collection of articles covering

- Application Security
- API Security
- Secure Coding
- Threat Modeling
- DevSecOps
- Bug Bounty
- Detection Engineering
- Security Automation
- Cloud Security

Example articles

- Understanding IDOR
- How JWT Authentication Works
- Building a SOC Home Lab
- Threat Modeling in Practice
- Automating Application Security

---

## Research

Long-form technical research.

Topics include

- Secure Architecture
- API Security
- Modern Authentication
- OWASP Top 10
- OWASP API Security Top 10
- Cloud Security
- Kubernetes Security
- Supply Chain Security

---

## Architecture Library

A collection of system designs including

- Data Flow Diagrams
- Threat Models
- STRIDE Analysis
- ER Diagrams
- Infrastructure Diagrams
- CI/CD Pipelines
- Security Architectures

---

## Resume

Provides

- Online Resume
- Downloadable PDF
- Professional Experience
- Certifications
- Skills
- Projects
- Contact Information

---

## Contact

Methods for professional communication.

Includes

- LinkedIn
- GitHub
- Email
- Resume Download

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- TailwindCSS

---

## Content

- Markdown
- MDX

---

## Styling

- TailwindCSS
- Framer Motion

---

## Deployment

- Vercel

---

## Analytics

- Vercel Analytics
- Plausible Analytics (Future)

---

# Features

## Project Showcase

Every project page includes

- Overview
- Architecture
- Features
- Security Challenges
- Technical Decisions
- Lessons Learned
- Source Code
- Documentation

---

## Interactive Architecture

Visitors can explore

- System Diagrams
- Component Relationships
- Security Boundaries
- Data Flow
- Trust Zones

---

## Documentation Library

Includes

- Threat Models
- Security Reviews
- Design Decisions
- API Documentation
- Security Reports
- Technical Specifications

---

## Technical Writing

Articles include

- Security Research
- Walkthroughs
- Tutorials
- Vulnerability Analysis
- Detection Engineering
- DevSecOps

---

## Performance

The site is designed for

- Static Site Generation
- Fast Page Loads
- SEO Optimization
- Accessibility
- Mobile Responsiveness

---

# Repository Structure

```text
udaydogra.dev/

├── app/
│
├── components/
│
├── content/
│   ├── blog/
│   ├── research/
│   ├── projects/
│   └── documentation/
│
├── public/
│
├── styles/
│
├── lib/
│
├── docs/
│   ├── architecture/
│   ├── screenshots/
│   └── design/
│
├── scripts/
│
├── tests/
│
├── README.md
└── LICENSE
```

---

# Skills Demonstrated

## Software Engineering

- Next.js
- React
- TypeScript
- TailwindCSS
- Static Site Generation

## Technical Communication

- Technical Writing
- Architecture Documentation
- Security Documentation
- Research Writing
- Engineering Diagrams

## Application Security

- Threat Modeling
- Secure Architecture
- Secure Development Lifecycle
- Vulnerability Research
- Security Automation

## Professional Development

- Portfolio Engineering
- Documentation
- Resume Development
- Personal Branding

---

# Future Roadmap

Planned enhancements include:

- Interactive threat models
- Live project demos
- Embedded terminal simulations
- Interactive API explorer
- AI-powered search
- Dark/Light mode
- Reading progress tracking
- Newsletter
- RSS feed
- Multilingual support

---

# Learning Outcomes

Upon completion, this project will demonstrate the ability to:

- Present complex engineering projects professionally.
- Document technical systems clearly.
- Build a production-ready developer portfolio.
- Communicate security concepts effectively.
- Showcase full-stack engineering and Application Security expertise.
- Organize technical documentation for recruiters and interviewers.
- Create a centralized knowledge base for long-term professional growth.

---

# Long-Term Vision

The portfolio is intended to evolve beyond a personal website into a living knowledge base that grows alongside future projects, research, certifications, conference talks, and open-source contributions. It serves as the public face of an Application Security engineer's work, providing recruiters and fellow engineers with a clear view of technical depth, engineering discipline, and continuous learning.
