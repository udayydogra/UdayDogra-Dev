import SpecWorld from "@/components/worlds/spec-world"
import { getLabs } from "@/lib/notion"

export const revalidate = 60

export default async function SpecPage() {
  const labs = await getLabs()
  const featured = labs.slice(0, 6)
  return <SpecWorld labs={featured} total={labs.length} />
}
