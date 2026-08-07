import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { LabMeta } from "@/lib/notion"
import LabCard from "@/components/labs/lab-card"

export default function Writing({ labs, total }: { labs: LabMeta[]; total: number }) {
  return (
    <section id="writing" className="scroll-mt-24 py-12 lg:py-24" aria-label="Writing">
      <h2 className="section-heading">
        <span className="num">05.</span> Writing &amp; Labs
      </h2>
      <p className="mb-8 max-w-lg text-[var(--slate)]">
        {total}+ documented security labs — each with the vulnerability class, root cause,
        exploitation path, and remediation. Pulled live from my research notes.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {labs.map((lab) => (
          <LabCard key={lab.slug} lab={lab} />
        ))}
      </div>

      <Link
        href="/labs"
        className="link-accent mono mt-8 inline-flex items-center gap-2 text-sm"
      >
        View all {total} labs <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
