import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getLabs, notionEnabled } from "@/lib/notion"
import LabsExplorer from "@/components/labs/labs-explorer"

// Always fresh: reflect Notion edits on the next page load.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Security Labs & Writeups",
  description:
    "Documented web-security labs by Uday Dogra — PortSwigger and beyond. Vulnerability class, root cause, exploitation path, and remediation for each finding.",
  alternates: { canonical: "/labs" },
}

export default async function LabsPage() {
  const labs = await getLabs()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
      <Link href="/editorial" className="link-accent mono inline-flex items-center gap-2 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to portfolio
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="text-3xl font-bold text-[var(--lightest-slate)] sm:text-4xl">
          Security Labs &amp; Writeups
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--slate)]">
          A structured knowledge base of web-security labs I&apos;ve worked through — each with the
          vulnerability class, root cause, exploitation path, and a concrete fix. Filter by
          vulnerability or difficulty.
        </p>
        {!notionEnabled && (
          <p className="mono mt-4 rounded-md border border-[var(--lightest-navy)] bg-[var(--light-navy)] px-4 py-2 text-xs text-[var(--slate)]">
            Showing sample data. Set <span className="text-[var(--accent)]">NOTION_TOKEN</span> and{" "}
            <span className="text-[var(--accent)]">NOTION_DATABASE_ID</span> to load live writeups.
          </p>
        )}
      </header>

      <LabsExplorer labs={labs} />
    </div>
  )
}
