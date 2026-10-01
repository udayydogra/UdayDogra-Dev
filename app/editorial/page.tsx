import type { Metadata } from "next"
import Home from "@/components/portfolio/home"
import { getLabs } from "@/lib/notion"

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: "/editorial" },
}

export default async function EditorialPage() {
  const labs = await getLabs()
  const featured = labs.slice(0, 4)
  return <Home labs={featured} total={labs.length} />
}
