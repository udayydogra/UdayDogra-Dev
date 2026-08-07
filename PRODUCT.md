# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **technical recruiters and hiring managers** screening for Application Security / Product Security roles (India, plus remote US / Europe / APAC). They arrive from LinkedIn or a résumé link, skim for 10–30 seconds on desktop or mobile, and decide whether to shortlist and reach out.

Secondary: **security peers and engineers** who read the lab writeups (the "/labs" knowledge base) — this audience also drives SEO discovery for AppSec / secure-code-review search terms.

## Product Purpose

A personal portfolio that establishes **Uday Dogra as a credible Application Security Engineer** and converts a skimming recruiter into an interview or contact. It doubles as an SEO-ranking, evergreen knowledge base of documented web-security labs. Success = recruiters reach out / shortlist him, and the site ranks for low-competition AppSec keywords.

## Positioning

Not a generic developer portfolio. Uday both **builds and breaks**: he ships real security platforms (a NIELIT AppSec training platform, MANTIS multi-tenant SAST/SCA SaaS, ReconFlow attack-surface-management engine) *and* documents methodology with a root-cause-to-fix writeup for every finding. The ethos is **evidence over claims** — "completion can't be forged", no inflated vuln counts, real repos.

## Operating Context

Recruiters skim fast, often mobile, mid-pipeline, comparing many candidates. They want, quickly: what he is, proof he can do the job, and a way to act (résumé / contact). The site is mid **domain migration `udaydogra.pro` → `udaydogra.com`**, so SEO/indexing correctness is a live constraint. Deploy target is a static/SSG Next.js host (Vercel-class).

## Capabilities and Constraints

- Next.js (App Router) + React + Tailwind; all portfolio content is data-driven from `lib/site.ts` (projects, skills, experience, education, certifications, socials).
- A **Notion-backed "Labs" blog** already exists (`/labs`, `/labs/[slug]`) with per-post SEO, canonical URLs, static params, and a fallback dataset when Notion creds are absent (16 sample lab writeups).
- SEO plumbing in place: `metadataBase`/canonical, OG/Twitter, JSON-LD Person, `robots.ts`, `sitemap.ts`. `SITE_URL = https://udaydogra.com`.
- **Must preserve through any redesign:** all product content and copy facts, the five real projects, skills/experience data, the Labs engine and its routes, the SEO/structured-data plumbing, accessibility, and the `/sudo` route (excluded from indexing).
- Résumé PDF (`/Uday-Dogra-Resume.pdf`) is referenced by a CTA but not yet added — a known placeholder.

## Brand Commitments

Real name **Uday Dogra**; handle **ud0g**. Socials: GitHub `udayydogra`, LinkedIn `in/udaydogra`, Instagram `UDAYYDOGRA` (Twitter/HackerOne/HackTheBox still placeholder). Voice is honest and technical, no hype or fabricated metrics. Only real, verifiable projects and credentials appear.

## Evidence on Hand

Real projects: NIELIT AppSec + Cyber-Awareness platform, MANTIS, ReconFlow, SynaptiFlow (live at synaptiflow.space), UltraFocus — all with real GitHub remotes. Certifications: C-DAC Noida (CyberSecurity & Network Defense), A2IT (CyberSecurity Fundamentals), Internshala (React.js). Education: B.Tech CSE, I.K. Gujral Punjab Technical University (CGPA 7.8). Profile photo `public/My-profile.jpeg`. 16 lab writeups (Notion/fallback). **Absent, do not fabricate:** CVEs, bug-bounty payouts, employment beyond the NIELIT role, client testimonials, résumé PDF.

## Product Principles

1. **Evidence over adjectives** — show real repos, real writeups, real credentials; never inflate.
2. **Respect the 15-second skim** — a recruiter must grasp role, proof, and next action almost immediately, on mobile.
3. **AppSec credibility is the aesthetic** — the work reads as rigorous security engineering, not decoration.
4. **Discoverable** — preserve and extend SEO/structured-data so the right people find it.
5. **Honest positioning** — early-career but substantive; confidence without overclaiming.

## Accessibility & Inclusion

General web accessibility: legible contrast, keyboard-navigable, semantic structure, responsive desktop/mobile. Bilingual-audience awareness exists at the project level (NIELIT) but the portfolio itself is English.
