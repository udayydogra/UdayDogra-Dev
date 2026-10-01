import DiffWorld from "@/components/worlds/diff-world"
import { getLabs } from "@/lib/notion"

export const revalidate = 60

export default async function DiffPage() {
  const labs = await getLabs()
  const featured = labs.slice(0, 6)
  return <DiffWorld labs={featured} total={labs.length} />
}
