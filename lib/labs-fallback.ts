// Local sample dataset used when NOTION_TOKEN / NOTION_DATABASE_ID are unset,
// so the site builds and the /labs section renders before the integration is
// wired up. These are real entries from the "Mastered Labs" Notion database
// (metadata only — full writeups come from Notion once connected).

import type { LabMeta } from "./notion"

function meta(
  partial: Pick<LabMeta, "title" | "vulnerability" | "platform" | "difficulty"> &
    Partial<LabMeta>,
): LabMeta {
  const slug = partial.title
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
  return {
    id: slug,
    slug,
    title: partial.title,
    vulnerability: partial.vulnerability,
    platform: partial.platform,
    severity: partial.severity ?? null,
    difficulty: partial.difficulty,
    cwe: partial.cwe ?? [],
    attackVector: partial.attackVector ?? null,
    confidence: partial.confidence ?? null,
    rootCause: partial.rootCause ?? [],
    technicalImpact: partial.technicalImpact ?? null,
    businessImpact: partial.businessImpact ?? null,
    notesReflection: partial.notesReflection ?? null,
    developerMistake: partial.developerMistake ?? null,
    secureFixStrategy: partial.secureFixStrategy ?? null,
    exploitPayload: partial.exploitPayload ?? null,
    detectionStrategy: partial.detectionStrategy ?? null,
    trustBoundary: partial.trustBoundary ?? null,
    bypassTechnique: partial.bypassTechnique ?? [],
    defenseObserved: partial.defenseObserved ?? [],
    writeup: partial.writeup ?? null,
    createdTime: partial.createdTime ?? "2026-04-01T00:00:00.000Z",
  }
}

export const FALLBACK_LABS: LabMeta[] = [
  meta({
    title: "SQL injection vulnerability in WHERE clause allowing retrieval of hidden data",
    vulnerability: ["SQL Injection"],
    platform: ["PortSwigger"],
    difficulty: "Apprentice",
    severity: "Medium",
    cwe: ["CWE-89"],
    confidence: "Strong",
    attackVector: "/filter?category=Gifts",
    createdTime: "2026-03-06T07:43:48.000Z",
  }),
  meta({
    title: "Blind SQL injection with conditional responses",
    vulnerability: ["SQL Injection"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Blind SQL injection with time delays",
    vulnerability: ["SQL Injection"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Stored DOM XSS",
    vulnerability: ["XSS"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Reflected XSS with AngularJS sandbox escape and CSP",
    vulnerability: ["XSS"],
    platform: ["PortSwigger"],
    difficulty: "Expert",
  }),
  meta({
    title: "SSRF with filter bypass via open redirection vulnerability",
    vulnerability: ["SSRF"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Blind SSRF with Shellshock exploitation",
    vulnerability: ["SSRF"],
    platform: ["PortSwigger"],
    difficulty: "Expert",
  }),
  meta({
    title: "Insecure direct object references",
    vulnerability: ["IDOR"],
    platform: ["PortSwigger"],
    difficulty: "Apprentice",
  }),
  meta({
    title: "Multi-step process with no access control on one step",
    vulnerability: ["Access Control"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Basic server-side template injection (code context)",
    vulnerability: ["SSTI"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "File path traversal, validation of file extension with null byte bypass",
    vulnerability: ["Path Traversal"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Infinite money logic flaw",
    vulnerability: ["Logic Flaw"],
    platform: ["PortSwigger"],
    difficulty: "Practitioner",
  }),
  meta({
    title: "Developing a custom gadget chain for Java deserialization",
    vulnerability: ["Deserialization"],
    platform: ["PortSwigger"],
    difficulty: "Expert",
  }),
  meta({
    title: "JWT authentication bypass via algorithm confusion with no exposed key",
    vulnerability: [],
    platform: ["PortSwigger"],
    difficulty: "Expert",
  }),
  meta({
    title: "Exploiting NoSQL operator injection to bypass authentication",
    vulnerability: [],
    platform: ["PortSwigger"],
    difficulty: "Apprentice",
  }),
  meta({
    title: "Web shell upload via race condition",
    vulnerability: [],
    platform: ["PortSwigger"],
    difficulty: "Expert",
  }),
]
