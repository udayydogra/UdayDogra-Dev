"use client"

import { useEffect, useState } from "react"
import type { LabMeta } from "@/lib/notion"
import Spotlight from "./spotlight"
import Sidebar from "./sidebar"
import About from "./about"
import Skills from "./skills"
import Experience from "./experience"
import Projects from "./projects"
import Writing from "./writing"
import Contact from "./contact"
import SiteFooter from "./site-footer"

const SECTIONS = ["about", "skills", "experience", "projects", "writing"]

export default function Home({ labs, total }: { labs: LabMeta[]; total: number }) {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      <Spotlight />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
      <div className="lg:flex lg:justify-between lg:gap-12">
        <Sidebar activeSection={activeSection} />
        <main className="log-page pt-4 lg:w-[55%] lg:py-24" id="content">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Writing labs={labs} total={total} />
          <Contact />
          <SiteFooter />
        </main>
      </div>
      </div>
    </div>
  )
}
