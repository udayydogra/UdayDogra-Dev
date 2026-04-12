"use client"

import { useState, useEffect } from "react"
import ScrollProgress from "@/components/scroll-progress"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import BugBountySection from "@/components/bug-bounty-section"
import WorkflowSection from "@/components/workflow-section"
import TerminalSection from "@/components/terminal-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

const SECTIONS = ["home", "about", "skills", "projects", "bugbounty", "workflow", "terminal", "contact"]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (const section of SECTIONS) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#030712]">
      <ScrollProgress />
      <Header activeSection={activeSection} />
      <BackToTop />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BugBountySection />
      <WorkflowSection />
      <TerminalSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
