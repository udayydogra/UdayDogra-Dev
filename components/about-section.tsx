"use client"

import { useState, useEffect } from "react"
import { User, Target, Zap, Star } from "lucide-react"

export default function AboutSection() {
  const [stats, setStats] = useState({
    projects: 0,
    technologies: 0,
    experience: 0,
    achievements: 0,
  })

  const languages = ["English", "Hindi", "Punjabi"]
  const interests = ["Cybersecurity trends", "Open-source tools", "AI automation", "Emerging tech"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 3,
        technologies: 15,
        experience: 2,
        achievements: 12,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative">
      {/* Section overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-purple-900/80" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
            Player Profile
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            About The Player
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Mobile-first responsive layout */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0 items-start">
          {/* Stats Dashboard - Mobile first, Desktop left 1/3 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                Player Stats
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:space-y-0 sm:grid-cols-1 sm:gap-0 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 text-sm sm:text-base">Projects</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-400">{stats.projects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 text-sm sm:text-base">Technologies</span>
                  <span className="text-xl sm:text-2xl font-bold text-blue-400">{stats.technologies}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 text-sm sm:text-base">Experience</span>
                  <span className="text-xl sm:text-2xl font-bold text-purple-400">{stats.experience}+ Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 text-sm sm:text-base">Achievements</span>
                  <span className="text-xl sm:text-2xl font-bold text-yellow-400">{stats.achievements}</span>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <div className="text-xl sm:text-2xl">🏆</div>
                  <div>
                    <div className="text-yellow-400 font-bold text-xs sm:text-sm">Code Master</div>
                    <div className="text-gray-300 text-xs">Completed 3 major projects</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-xl sm:text-2xl">🎓</div>
                  <div>
                    <div className="text-blue-400 font-bold text-xs sm:text-sm">Certified Pro</div>
                    <div className="text-gray-300 text-xs">Earned 3 certifications</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <div className="text-xl sm:text-2xl">👑</div>
                  <div>
                    <div className="text-green-400 font-bold text-xs sm:text-sm">Leader</div>
                    <div className="text-gray-300 text-xs">Club President</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Desktop right 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 sm:p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-6 sm:mb-8">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-md">
                    Character Bio
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg">
                    Aspiring Software Developer with a strong foundation in object-oriented programming, full-stack web
                    development, and version control. Proficient in Python, JavaScript, and React, with hands-on
                    experience using PostgreSQL and Git. Built AI-powered and automation-based tools for note-taking,
                    Linux scripting, and UI development. Strong problem-solving ability, collaborative mindset, and
                    passion for clean, efficient code. Seeking to contribute to impactful projects.
                  </p>
                </div>
              </div>

              {/* Skills and Interests - Mobile responsive */}
              <div className="space-y-6 sm:space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                {/* Languages */}
                <div className="lg:col-span-1">
                  <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    Languages Known
                  </h4>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        className="flex items-center gap-2 p-2 bg-blue-500/20 rounded-lg border border-blue-500/30"
                      >
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                        <span className="text-blue-200 text-xs sm:text-sm">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="lg:col-span-2">
                  <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-400" />
                    Current Interests & Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center gap-2 p-3 bg-green-500/20 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
                      >
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                        <span className="text-green-200 text-xs sm:text-sm">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress to next level */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-bold text-sm sm:text-base">Next Level Progress</span>
                  <span className="text-purple-300 font-bold text-sm sm:text-base">Level 9 → 10</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-300 mt-1">
                  <span>7,500 / 10,000 XP</span>
                  <span>2,500 XP to go!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
