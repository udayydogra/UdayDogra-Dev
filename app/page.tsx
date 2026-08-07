import Home from "@/components/portfolio/home"
import { getLabs } from "@/lib/notion"

export const revalidate = 3600

export default async function Page() {
  const labs = await getLabs()
  const featured = labs.slice(0, 4)
  return <Home labs={featured} total={labs.length} />
}
