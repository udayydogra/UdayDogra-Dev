import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Uday Dogra — Application Security Engineer. Choose a view of the portfolio: a clean editorial layout, or the interactive cyber-themed classic.",
}

const options = [
  {
    href: "/editorial",
    name: "Editorial",
    blurb: "Clean, minimal, recruiter-first. Near-black and gold, generous space, fast to skim.",
    swatches: ["#0b0d11", "#c6ccd5", "#f2c14e"],
    ring: "hover:border-[#f2c14e]/70",
    accent: "#f2c14e",
  },
  {
    href: "/classic",
    name: "Classic",
    blurb: "The interactive cyber / bug-bounty build — neon accents, terminal, animated sections.",
    swatches: ["#030712", "#00d9ff", "#00ff88"],
    ring: "hover:border-[#00d9ff]/70",
    accent: "#00d9ff",
  },
]

export default function ChooserPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0d11] px-6 py-16 text-[#c6ccd5]">
      <div className="w-full max-w-4xl">
        <header className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#838b98]">
            {site.role}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#f5f6f8] sm:text-6xl">
            {site.name}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[#838b98]">
            Same work, two ways to read it. Pick whichever you prefer — both are kept in sync.
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {options.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-200 hover:-translate-y-1 ${o.ring}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#f5f6f8]">{o.name}</h2>
                  <ArrowUpRight
                    className="h-5 w-5 text-[#838b98] transition-colors"
                    style={{ color: undefined }}
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b0]">{o.blurb}</p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                {o.swatches.map((c) => (
                  <span
                    key={c}
                    className="h-5 w-5 rounded-full border border-white/10"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <span
                  className="ml-auto font-mono text-xs uppercase tracking-widest"
                  style={{ color: o.accent }}
                >
                  Enter →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-[#5f6672]">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </main>
  )
}
