import { GraduationCap, Award, Calendar, Trophy, BookOpen } from "lucide-react"

export default function EducationSection() {
  const education = [
    {
      degree: "B.Tech in Computer Science",
      institution: "I.K. Gujral Punjab Technical University",
      period: "2022 – Present",
      grade: "CGPA: 7.8 / 10",
      level: "Advanced",
      xp: 3000,
      progress: 78,
    },
    {
      degree: "Class XII (CBSE)",
      institution: "CBSE Board",
      period: "2022",
      grade: "Percentage: 63%",
      level: "Completed",
      xp: 1200,
      progress: 100,
    },
    {
      degree: "Class X (CBSE)",
      institution: "CBSE Board",
      period: "2020",
      grade: "Percentage: 73.5%",
      level: "Completed",
      xp: 1000,
      progress: 100,
    },
  ]

  const certifications = [
    {
      title: "CyberSecurity Fundamentals",
      issuer: "A2IT",
      date: "Jul 2024",
      id: "A2ITMH-11001",
      rarity: "epic",
      xp: 800,
      category: "Security",
    },
    {
      title: "CyberSecurity and Network Defense",
      issuer: "C-DAC, Noida",
      date: "Oct 2024",
      id: "1566/330088/CG/(20)/2024",
      rarity: "legendary",
      xp: 1200,
      category: "Security",
    },
    {
      title: "React.js Frontend Development",
      issuer: "Internshala",
      date: "Aug 2024",
      id: "7brw416ce5ybIcsa",
      rarity: "epic",
      xp: 1000,
      category: "Development",
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

  const getGradeColor = (grade: string) => {
    if (grade.includes("7.8")) return "text-green-400"
    if (grade.includes("73.5")) return "text-blue-400"
    return "text-yellow-400"
  }

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Education & Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Mobile-first responsive layout */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          {/* Education - Mobile first, Desktop left 2/3 */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              Academic Journey
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={edu.degree}
                  className="bg-black/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-blue-400 font-medium mb-1 text-sm sm:text-base">{edu.institution}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          {edu.period}
                        </span>
                        <span className={`font-bold ${getGradeColor(edu.grade)}`}>{edu.grade}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right mt-3 sm:mt-0">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold mb-2 inline-block">
                        {edu.level}
                      </div>
                      <div className="text-yellow-400 font-bold text-xs sm:text-sm">+{edu.xp} XP</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                      <span>Progress</span>
                      <span>{edu.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${edu.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Education Achievement */}
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-3">🎓</div>
                  <div className="text-blue-400 font-bold text-lg sm:text-xl">Scholar</div>
                  <div className="text-white text-sm sm:text-base">Consistent Academic Performance</div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-2">Total Education XP: 5,200</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications - Desktop right 1/3 */}
          <div className="lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <Award className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className={`relative bg-black/20 backdrop-blur-sm border-2 ${getRarityBorder(cert.rarity)} rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 overflow-hidden group`}
                >
                  {/* Rarity glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(cert.rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}
                  />

                  {/* Rarity badge */}
                  <div
                    className={`absolute top-3 right-3 bg-gradient-to-r ${getRarityColor(cert.rarity)} text-black px-2 py-1 rounded-full text-xs font-bold`}
                  >
                    {cert.rarity.toUpperCase()}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4">
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight pr-12">
                        {cert.title}
                      </h4>
                      <p className="text-purple-400 font-medium text-xs sm:text-sm mb-1">{cert.issuer}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.date}</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs border border-purple-500/30">
                        {cert.category}
                      </span>
                    </div>

                    {/* XP Reward */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-bold text-xs sm:text-sm">+{cert.xp} XP</span>
                      </div>
                      <div className="text-xs text-gray-400">ID: {cert.id.slice(-6)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Certification Summary */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2">🏅</div>
                  <div className="text-purple-400 font-bold text-sm sm:text-base">Certified Expert</div>
                  <div className="text-white text-xs sm:text-sm">3 Professional Certifications</div>
                  <div className="text-gray-400 text-xs mt-2">Total: +3,000 XP</div>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4">
                <h4 className="text-white font-bold mb-3 text-center text-sm sm:text-base">Knowledge Stats</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Education XP</span>
                    <span className="text-blue-400 font-bold">5,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Certification XP</span>
                    <span className="text-purple-400 font-bold">3,000</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total Knowledge XP</span>
                      <span className="text-yellow-400 font-bold">8,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
