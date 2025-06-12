"use client"

import { useState } from "react"
import { ExternalLink, Trophy, Zap } from "lucide-react"

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects = [
    {
      id: "synaptiflow",
      title: "SynaptiFlow",
      subtitle: "AI Note-Taking Platform",
      year: "2024–2025",
      url: "https://www.synaptiflow.space",
      description:
        "Built an AI-driven productivity tool using React.js, PostgreSQL, Python, RAG. Designed document parser, implemented RAG-based semantic search, and developed backend APIs. Improved researcher workflow with structured data visualization.",
      tech: ["React.js", "PostgreSQL", "Python", "RAG"],
      difficulty: "Legendary",
      xpReward: 2500,
      achievement: "AI Pioneer",
      completionRate: 95,
      rarity: "legendary",
    },
    {
      id: "hackers-helper",
      title: "Hacker's Helper",
      subtitle: "Linux Automation Tool",
      year: "2024",
      description:
        "Created a GUI-based Linux script executor using Python, Tkinter, Shell Scripting. Enhanced automation and reduced repetitive task execution by 30%.",
      tech: ["Python", "Tkinter", "Shell Scripting"],
      difficulty: "Epic",
      xpReward: 1800,
      achievement: "Automation Master",
      completionRate: 100,
      rarity: "epic",
    },
    {
      id: "instagram-clone",
      title: "Instagram Clone",
      subtitle: "Front-End Project",
      year: "2023",
      description:
        "Developed a responsive Instagram interface using HTML, CSS. Practiced layout design and interactive elements.",
      tech: ["HTML", "CSS"],
      difficulty: "Rare",
      xpReward: 1200,
      achievement: "UI Craftsman",
      completionRate: 100,
      rarity: "rare",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500"
      case "epic":
        return "from-purple-500 to-pink-500"
      case "rare":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500/50"
      case "epic":
        return "border-purple-500/50"
      case "rare":
        return "border-blue-500/50"
      default:
        return "border-gray-500/50"
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Trophy className="h-4 w-4" />
            Quest Log
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Completed Quests</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Rule of thirds: Featured project takes 2/3, others take 1/3 */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Featured Project - 2/3 width */}
          <div className="col-span-2">
            <div
              className={`relative bg-black/20 backdrop-blur-sm border-2 ${getRarityBorder(projects[0].rarity)} rounded-xl p-8 hover:scale-105 transition-all duration-300 overflow-hidden group`}
              onMouseEnter={() => setHoveredProject(projects[0].id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Rarity glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(projects[0].rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Rarity badge */}
              <div
                className={`absolute top-4 right-4 bg-gradient-to-r ${getRarityColor(projects[0].rarity)} text-black px-3 py-1 rounded-full text-xs font-bold`}
              >
                {projects[0].difficulty}
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{projects[0].title}</h3>
                    <p className="text-purple-400 font-medium text-lg">{projects[0].subtitle}</p>
                  </div>
                  <span className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded">{projects[0].year}</span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-lg">{projects[0].description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Quest Progress</span>
                    <span>{projects[0].completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${getRarityColor(projects[0].rarity)} transition-all duration-1000`}
                      style={{ width: `${projects[0].completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Rewards */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Zap className="h-4 w-4" />
                      <span className="font-bold">+{projects[0].xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm">{projects[0].achievement}</span>
                    </div>
                  </div>

                  {projects[0].url && (
                    <a
                      href={projects[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium"
                    >
                      View Quest
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Side Projects - 1/3 width */}
          <div className="col-span-1 space-y-6">
            {projects.slice(1).map((project) => (
              <div
                key={project.id}
                className={`relative bg-black/20 backdrop-blur-sm border ${getRarityBorder(project.rarity)} rounded-xl p-6 hover:scale-105 transition-all duration-300 overflow-hidden group`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Rarity glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(project.rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}
                />

                {/* Rarity badge */}
                <div
                  className={`absolute top-3 right-3 bg-gradient-to-r ${getRarityColor(project.rarity)} text-black px-2 py-1 rounded-full text-xs font-bold`}
                >
                  {project.difficulty}
                </div>

                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-purple-400 font-medium text-sm">{project.subtitle}</p>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(project.rarity)}`}
                        style={{ width: `${project.completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Zap className="h-3 w-3" />
                      <span className="font-bold">+{project.xpReward}</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Trophy className="h-3 w-3" />
                      <span className="text-xs">{project.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Achievement Summary */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-green-400 font-bold">Quest Master</div>
                <div className="text-white text-sm">3/3 Quests Completed</div>
                <div className="text-gray-400 text-xs mt-2">Total: +5,500 XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
