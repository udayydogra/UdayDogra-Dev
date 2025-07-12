"use client"

import { useState, useEffect } from "react"
import { Code, Database, PenToolIcon as Tool, Star, Zap } from "lucide-react"

export default function SkillsSection() {
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({})

  const skills = {
    languages: [
      { name: "Python", level: 85, xp: 2500 },
      { name: "JavaScript", level: 80, xp: 2200 },
      { name: "C++", level: 70, xp: 1800 },
      { name: "C", level: 65, xp: 1500 },
    ],
    frontend: [
      { name: "HTML5", level: 90, xp: 2800 },
      { name: "CSS3", level: 85, xp: 2400 },
      { name: "React.js", level: 80, xp: 2200 },
      { name: "Next.js", level: 75, xp: 2000 },
    ],
    backend: [
      { name: "Python (Flask)", level: 70, xp: 1800 },
      { name: "Shell Scripting", level: 75, xp: 2000 },
      { name: "Tkinter", level: 65, xp: 1500 },
    ],
    databases: [
      { name: "PostgreSQL", level: 75, xp: 2000 },
      { name: "MySQL", level: 60, xp: 1200 },
    ],
    tools: [
      { name: "Git", level: 85, xp: 2400 },
      { name: "Linux", level: 80, xp: 2200 },
      { name: "VS Code", level: 90, xp: 2800 },
      { name: "Salesforce", level: 40, xp: 800 },
    ],
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const allSkills = Object.values(skills).flat()
      const skillLevels: Record<string, number> = {}

      allSkills.forEach((skill) => {
        skillLevels[skill.name] = skill.level
      })

      setAnimatedSkills(skillLevels)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getSkillColor = (level: number) => {
    if (level >= 80) return "from-green-500 to-emerald-600"
    if (level >= 60) return "from-blue-500 to-cyan-600"
    if (level >= 40) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-pink-600"
  }

  const getSkillRank = (level: number) => {
    if (level >= 80) return "Expert"
    if (level >= 60) return "Advanced"
    if (level >= 40) return "Intermediate"
    return "Beginner"
  }

  const skillCategories = [
    { title: "Languages", icon: Code, skills: skills.languages, color: "purple" },
    { title: "Frontend", icon: Code, skills: skills.frontend, color: "blue" },
    { title: "Backend", icon: Database, skills: skills.backend, color: "green" },
    { title: "Databases", icon: Database, skills: skills.databases, color: "orange" },
    { title: "Tools", icon: Tool, skills: skills.tools, color: "red" },
  ]

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
            Skill Tree
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Mobile-first responsive grid */}
        <div className="space-y-6 lg:grid lg:grid-cols-12 lg:gap-6 lg:space-y-0">
          {/* Main skills - Mobile stacked, Desktop left 2/3 */}
          <div className="lg:col-span-8 space-y-6">
            {skillCategories.slice(0, 3).map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.title}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm sm:text-base">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 hidden sm:inline">{getSkillRank(skill.level)}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                                    i < Math.floor(skill.level / 20) ? "text-yellow-400 fill-current" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                            <div
                              className={`h-2 sm:h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out relative`}
                              style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{skill.level}%</span>
                            <span>{skill.xp} XP</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Side skills and achievements - Desktop right 1/3 */}
          <div className="lg:col-span-4 space-y-6">
            {skillCategories.slice(3).map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.title}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium text-sm">{skill.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                                  i < Math.floor(skill.level / 20) ? "text-yellow-400 fill-current" : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="relative">
                          <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                            <div
                              className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out`}
                              style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{skill.level}%</span>
                            <span>{skill.xp} XP</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 sm:p-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">🏆</div>
                <div className="text-yellow-400 font-bold text-sm sm:text-base">Skill Master</div>
                <div className="text-white text-xs sm:text-sm">Unlocked 15+ technologies</div>
                <div className="text-gray-400 text-xs mt-2">+500 XP Bonus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
