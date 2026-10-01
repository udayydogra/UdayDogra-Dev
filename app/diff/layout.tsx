import type { Metadata } from "next"
import { Hanken_Grotesk } from "next/font/google"

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-diff",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Changeset · Uday Dogra",
  description:
    "Uday Dogra's portfolio rendered as a pull request: the vulnerabilities removed, the fixes added, and every implementation reviewed.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/diff" },
}

export default function DiffLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${hanken.variable} w-diff`}>{children}</div>
}
