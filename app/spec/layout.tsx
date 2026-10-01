import type { Metadata } from "next"
import { Libre_Franklin } from "next/font/google"

const franklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-spec",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Specification · Uday Dogra",
  description:
    "Application Security Engineering Specification — the capabilities, reference implementations and verifiable evidence of Uday Dogra, rendered as a technical standard.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/spec" },
}

export default function SpecLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${franklin.variable} w-spec`}>{children}</div>
}
