"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import ScrollProgress from "@/components/scroll-progress"
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
import FloatingNav from "@/components/floating-nav"
import ThemeToggle from "@/components/theme-toggle"
import BackToTop from "@/components/back-to-top"
import CursorTrail from "@/components/cursor-trail"
import AchievementsModal from "@/components/achievements-modal"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [showAchievements, setShowAchievements] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

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

  // Calculate total XP and achievements
  const totalXP = 25000 // Sum of all XP from projects, skills, education, etc.
  const totalAchievements = 15

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <LoadingScreen />
      <ScrollProgress />
      <CursorTrail />

      <Header activeSection={activeSection} />
      <FloatingNav activeSection={activeSection} />
      <ThemeToggle />
      <BackToTop />

      <GameStats totalXP={totalXP} achievements={totalAchievements} />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />

      <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
    </main>
  )
}
