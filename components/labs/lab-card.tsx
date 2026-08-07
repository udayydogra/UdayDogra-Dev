import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { LabMeta } from "@/lib/notion"

const sevColor: Record<string, string> = {
  Critical: "text-[var(--signal)]",
  High: "text-[#f0a35e]",
  Medium: "text-[#e6c86a]",
  Low: "text-[var(--slate)]",
}

export default function LabCard({ lab }: { lab: LabMeta }) {
  return (
    <Link
      href={`/labs/${lab.slug}`}
      className="card-panel group block p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {lab.platform.map((p) => (
            <span key={p} className="mono text-[0.7rem] uppercase tracking-wider text-[var(--slate)]">
              {p}
            </span>
          ))}
          {lab.difficulty && (
            <span className="tag">{lab.difficulty}</span>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--slate)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
      </div>

      <h3 className="mt-3 font-semibold leading-snug text-[var(--lightest-slate)] group-hover:text-[var(--accent)] transition-colors">
        {lab.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {lab.vulnerability.map((v) => (
          <span key={v} className="tag">{v}</span>
        ))}
        {lab.severity && (
          <span className={`mono text-xs ${sevColor[lab.severity] ?? "text-[var(--slate)]"}`}>
            {lab.severity}
          </span>
        )}
        {lab.cwe.map((c) => (
          <span key={c} className="mono text-[0.7rem] text-[var(--slate)]">
            {c.split(":")[0]}
          </span>
        ))}
      </div>
    </Link>
  )
}
