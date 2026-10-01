import type { Metadata } from "next"
import Link from "next/link"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Uday Dogra — Application Security Engineer. Choose a view of the portfolio: a clean editorial layout, or the interactive cyber-themed classic.",
}

export default function ChooserPage() {
  return (
    <main className="chooser relative bg-black">
      {/* Editorial half */}
      <Link
        href="/editorial"
        aria-label="Open the editorial portfolio"
        className="chooser-panel group flex-col items-center justify-center bg-[#0b0d11] px-8 py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(242,193,78,0.14), transparent 70%)" }}
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#f2c14e]">01 · Editorial</p>
          <h2
            className="chooser-label mt-5 font-extrabold uppercase leading-[0.9] tracking-tight text-[#f5f6f8]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Editorial
          </h2>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#9aa3b0]">
            Clean, minimal, recruiter-first. Near-black and gold, generous space, fast to skim.
          </p>
          <span className="chooser-enter mt-8 inline-flex items-center gap-2 rounded-full border border-[#f2c14e] bg-[#f2c14e] px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-[#14110a]">
            Enter →
          </span>
        </div>
      </Link>

      {/* Classic half */}
      <Link
        href="/classic"
        aria-label="Open the classic portfolio"
        className="chooser-panel group cyber-grid flex-col items-center justify-center bg-[#030712] px-8 py-24 text-center"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(0,217,255,0.16), transparent 70%)" }}
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#00d9ff]">02 · Classic</p>
          <h2
            className="chooser-label mt-5 font-extrabold uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", textShadow: "0 0 24px rgba(0,217,255,0.35)" }}
          >
            Classic
          </h2>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-[#8aa0b4]">
            The interactive cyber / bug-bounty build — neon accents, terminal, animated sections.
          </p>
          <span className="chooser-enter mt-8 inline-flex items-center gap-2 rounded-full border border-[#00d9ff]/60 bg-[#00d9ff]/10 px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-[#00d9ff]">
            Enter →
          </span>
        </div>
      </Link>

      {/* Identity plate — crowns the seam at the top */}
      <div className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 md:top-10">
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/70 px-6 py-4 backdrop-blur-md">
          <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{site.name}</span>
          <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/60 sm:text-xs">
            {site.role}
          </span>
        </div>
      </div>

      {/* Footer note */}
      <p className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
        Same work · two ways to read it · kept in sync
      </p>
    </main>
  )
}
