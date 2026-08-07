import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { getLabs } from "@/lib/notion"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const labs = await getLabs()
  const labUrls: MetadataRoute.Sitemap = labs.map((l) => ({
    url: `${SITE_URL}/labs/${l.slug}`,
    lastModified: l.createdTime ? new Date(l.createdTime) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/labs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...labUrls,
  ]
}
