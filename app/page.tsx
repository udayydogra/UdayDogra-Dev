"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import GameStats from "@/components/game-stats"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [totalXP, setTotalXP] = useState(0)
  const [achievements, setAchievements] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    // Calculate total XP and achievements
    setTotalXP(8750) // Based on skills, projects, and experience
    setAchievements(12) // Total achievements unlocked

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Global Background Image - Ultra Responsive */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-image.jpg"
          alt="Portfolio Background"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Responsive dark overlay */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/45 md:bg-black/50 lg:bg-black/55 xl:bg-black/60" />
        {/* Responsive gaming gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50 sm:from-slate-900/60 sm:via-purple-900/40 sm:to-slate-900/60" />
      </div>

      {/* Content with responsive positioning */}
      <div className="relative z-10">
        <Header activeSection={activeSection} />
        <GameStats totalXP={totalXP} achievements={achievements} />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}
