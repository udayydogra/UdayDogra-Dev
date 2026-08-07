/*
  DIRECTION CONTRACT — Editorial Dark (replaced the Field Logbook direction, seed 841d0122, at the user's request)
  THESIS: a confident editorial dark portfolio for a security engineer; refuses the neon-terminal
    hacker cliché and the thematic-costume portfolio alike — authority through type, space and restraint.
  OWN-WORLD: near-black ground (#0b0d11), warm off-white text, a single gold accent (#f2c14e used
    sparingly); Archivo (extra-bold display) + JetBrains Mono; clean raised cards, hairline dividers,
    quiet index refs, generous whitespace.
  STORY: a recruiter reads name + role + résumé CTA at once, then skims skills, experience, projects
    and lab writeups as clean, confident sections.
  FIRST VIEWPORT: left column — large name, gold role line, one-line pitch, an availability line, a
    solid gold "Download résumé" + ghost "Get in touch"; right column, About opens.
  FORM: editorial dark / single-accent restraint.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
*/
import type { Metadata } from "next"
import { Archivo, JetBrains_Mono } from "next/font/google"
import { SITE_URL, site } from "@/lib/site"
import "./globals.css"

const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | Application Security Engineer`,
    template: `%s · ${site.name}`,
  },
  description:
    "Uday Dogra — Application Security Engineer specializing in secure code review, OWASP Top 10, API security, threat modeling, DevSecOps and cloud security. Security projects, automation tooling, and documented web-security lab writeups.",
  keywords: [
    "Uday Dogra",
    "Application Security Engineer",
    "Product Security Engineer",
    "application security",
    "AppSec",
    "secure code review",
    "OWASP Top 10",
    "API security",
    "threat modeling",
    "DevSecOps",
    "SAST",
    "DAST",
    "Semgrep",
    "CodeQL",
    "cloud security",
    "penetration testing",
    "web security",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${site.name} | Application Security Engineer`,
    description:
      "Application Security Engineer — secure code review, OWASP Top 10, API security, threat modeling, DevSecOps and security automation.",
    siteName: site.name,
    images: [{ url: "/My-profile.jpeg", width: 1200, height: 630, alt: `${site.name} — Application Security Engineer` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Application Security Engineer`,
    description:
      "Application Security Engineer — secure code review, OWASP Top 10, API security, threat modeling, DevSecOps.",
    images: ["/My-profile.jpeg"],
  },
  icons: { icon: "/favicon.svg" },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: SITE_URL,
  image: `${SITE_URL}/My-profile.jpeg`,
  jobTitle: "Application Security Engineer",
  description:
    "Application Security Engineer specializing in secure code review, OWASP Top 10, API security, threat modeling, DevSecOps and cloud security.",
  knowsAbout: [
    "Application Security",
    "Secure Code Review",
    "OWASP Top 10",
    "API Security",
    "Threat Modeling",
    "DevSecOps",
    "Cloud Security",
    "Penetration Testing",
  ],
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.instagram, site.socials.twitter],
}

// Build-surviving, greppable copy of the direction contract (seed key 841d0122).
const contractMarker =
  "<!-- impeccable:direction Editorial Dark (replaced Field Logbook 841d0122) · FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="theme-color" content="#0f2540" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: contractMarker }} />
        {children}
      </body>
    </html>
  )
}
