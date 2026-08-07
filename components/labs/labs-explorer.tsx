"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import type { LabMeta } from "@/lib/notion"
import LabCard from "./lab-card"

const DIFF_ORDER = ["Apprentice", "Practitioner", "Expert"]

export default function LabsExplorer({ labs }: { labs: LabMeta[] }) {
  const [query, setQuery] = useState("")
  const [vuln, setVuln] = useState<string | null>(null)
  const [diff, setDiff] = useState<string | null>(null)

  const vulnOptions = useMemo(() => {
    const set = new Set<string>()
    labs.forEach((l) => l.vulnerability.forEach((v) => set.add(v)))
    return Array.from(set).sort()
  }, [labs])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return labs.filter((l) => {
      if (q && !l.title.toLowerCase().includes(q)) return false
      if (vuln && !l.vulnerability.includes(vuln)) return false
      if (diff && l.difficulty !== diff) return false
      return true
    })
  }, [labs, query, vuln, diff])

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slate)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search labs…"
          className="w-full rounded-md border border-[var(--lightest-navy)] bg-[var(--light-navy)] py-2.5 pl-10 pr-4 text-sm text-[var(--lightest-slate)] placeholder:text-[var(--slate)] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="mono text-xs uppercase tracking-wider text-[var(--slate)]">Vuln:</span>
        <Chip active={vuln === null} onClick={() => setVuln(null)}>All</Chip>
        {vulnOptions.map((v) => (
          <Chip key={v} active={vuln === v} onClick={() => setVuln(vuln === v ? null : v)}>
            {v}
          </Chip>
        ))}
      </div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mono text-xs uppercase tracking-wider text-[var(--slate)]">Level:</span>
        <Chip active={diff === null} onClick={() => setDiff(null)}>All</Chip>
        {DIFF_ORDER.map((d) => (
          <Chip key={d} active={diff === d} onClick={() => setDiff(diff === d ? null : d)}>
            {d}
          </Chip>
        ))}
      </div>

      <p className="mono mb-5 text-xs text-[var(--slate)]">
        {filtered.length} of {labs.length} labs
      </p>

      {filtered.length === 0 ? (
        <p className="text-[var(--slate)]">No labs match those filters.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lab) => (
            <LabCard key={lab.slug} lab={lab} />
          ))}
        </div>
      )}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`mono rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]"
          : "border-[var(--lightest-navy)] text-[var(--slate)] hover:border-[var(--slate)] hover:text-[var(--light-slate)]"
      }`}
    >
      {children}
    </button>
  )
}
