"use client"

import Link from "next/link"
import { site } from "@/lib/site"
import SocialLinks from "./social-links"

const NAV = [
  { id: "about", label: "About", ref: "01" },
  { id: "skills", label: "Skills", ref: "02" },
  { id: "experience", label: "Experience", ref: "03" },
  { id: "projects", label: "Projects", ref: "04" },
  { id: "writing", label: "Writing & Labs", ref: "05" },
]

export default function Sidebar({ activeSection }: { activeSection: string }) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:max-w-[520px] lg:flex-col lg:justify-between lg:py-24 py-12">
      <div>
        <h1 className="rise-in text-[2.7rem] font-extrabold leading-[1.05] tracking-tight text-[var(--lightest-slate)] sm:text-6xl">
          {site.name}
        </h1>

        <p className="mt-4 text-lg font-semibold text-[var(--accent)] sm:text-xl">
          {site.role}
        </p>

        <p className="mt-4 max-w-sm leading-relaxed text-[var(--slate)]">{site.tagline}</p>

        <p className="mono mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-[var(--slate)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {site.availability}
        </p>

        {/* Primary actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Download résumé
          </a>
          <a href={`mailto:${site.emails.primary}`} className="btn-line">
            Get in touch
          </a>
        </div>

        {/* In-page nav (desktop) */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page">
          <ul className="space-y-4">
            {NAV.map((item) => {
              const active = activeSection === item.id
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="group flex items-center py-1">
                    <span className={`mono mr-3 text-[0.7rem] transition-colors ${active ? "text-[var(--accent)]" : "text-[var(--slate)]/60"}`}>
                      {item.ref}
                    </span>
                    <span
                      className={`mr-4 h-px transition-all duration-200 ${
                        active
                          ? "w-16 bg-[var(--lightest-slate)]"
                          : "w-8 bg-[var(--lightest-navy)] group-hover:w-16 group-hover:bg-[var(--lightest-slate)]"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                        active
                          ? "text-[var(--lightest-slate)]"
                          : "text-[var(--slate)] group-hover:text-[var(--lightest-slate)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              )
            })}
            <li className="pt-1">
              <Link href="/labs" className="group flex items-center py-1">
                <span className="mono mr-3 text-[0.7rem] text-[var(--accent)]">→</span>
                <span className="mr-4 h-px w-8 bg-[var(--lightest-navy)] transition-all group-hover:w-16 group-hover:bg-[var(--accent)]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] transition-colors group-hover:text-[var(--accent-strong)]">
                  All Labs
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex items-center gap-5">
        <SocialLinks />
        <Link
          href="/"
          className="mono text-[0.7rem] uppercase tracking-widest text-[var(--slate)] transition-colors hover:text-[var(--accent)]"
        >
          ⇄ Switch view
        </Link>
      </div>
    </header>
  )
}
