import GlassWorld from "@/components/worlds/glass-world"
import { getLabs } from "@/lib/notion"

export const revalidate = 60

export default async function GlassPage() {
  const labs = await getLabs()
  const featured = labs.slice(0, 6)
  return <GlassWorld labs={featured} total={labs.length} />
}
