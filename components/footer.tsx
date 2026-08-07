"use client"

import Link from "next/link"
import { site } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="mono text-xs text-gray-600">
            <span className="text-cyan-400">$</span> echo &quot;Built by {site.name} — {site.role}&quot;
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              ⇄ switch view
            </Link>
            <span className="mono text-xs text-gray-700">© {new Date().getFullYear()} · {site.emails.primary}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
