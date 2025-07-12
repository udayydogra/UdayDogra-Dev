import { Briefcase, Crown, Users, Calendar, Trophy } from "lucide-react"

export default function ExperienceSection() {
  const experience = [
    {
      title: "President",
      organization: "Coding Club",
      period: "Jan 2025 – Present",
      description:
        "Organized and led coding hackathons, technical quizzes, and alumni knowledge-sharing sessions. Mentored junior developers and coordinated peer-learning initiatives.",
      level: "Leadership",
      xp: 2000,
      achievements: ["Team Leader", "Event Organizer", "Mentor"],
      rarity: "legendary",
    },
    {
      title: "Member",
      organization: "Coding Club",
      period: "Jan 2023 – Dec 2024",
      description:
        "Assisted in logistics and planning of events, including bootcamps and workshops. Supported digital outreach and technical content creation.",
      level: "Contributor",
      xp: 1500,
      achievements: ["Team Player", "Event Support"],
      rarity: "epic",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500"
      case "epic":
        return "from-purple-500 to-pink-500"
      default:
        return "from-blue-500 to-cyan-500"
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500/50"
      case "epic":
        return "border-purple-500/50"
      default:
        return "border-blue-500/50"
    }
  }

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
            Leadership Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Experience Gained</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Mobile-first responsive layout */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
          {/* Timeline - Mobile first, Desktop left 1/3 */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                Timeline
              </h3>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.title} className="relative">
                    {index !== experience.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500" />
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-r ${getRarityColor(exp.rarity)} rounded-full`}>
                        {exp.rarity === "legendary" ? (
                          <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                        ) : (
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-bold text-xs sm:text-sm">{exp.period}</div>
                        <div className="text-gray-400 text-xs">{exp.level}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total XP */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                <div className="text-center">
                  <div className="text-green-400 font-bold text-sm sm:text-base">Total Leadership XP</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">3,500</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Details - Desktop right 2/3 */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {experience.map((exp) => (
              <div
                key={exp.title}
                className={`relative bg-black/20 backdrop-blur-sm border-2 ${getRarityBorder(exp.rarity)} rounded-xl p-4 sm:p-6 lg:p-8 hover:scale-105 transition-all duration-300 overflow-hidden group`}
              >
                {/* Rarity glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(exp.rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}
                />

                {/* Rarity badge */}
                <div
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r ${getRarityColor(exp.rarity)} text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold`}
                >
                  {exp.level}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 bg-gradient-to-r ${getRarityColor(exp.rarity)} rounded-lg`}>
                      <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.title}</h3>
                        <span className="text-xs sm:text-sm text-gray-400 bg-black/30 px-2 py-1 sm:px-3 sm:py-1 rounded-full mt-1 sm:mt-0 self-start">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-purple-400 font-medium text-base sm:text-lg mb-3 sm:mb-4">
                        {exp.organization}
                      </p>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{exp.description}</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-white font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                      Achievements Unlocked
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className={`px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r ${getRarityColor(exp.rarity)}/20 border border-current rounded-full text-xs sm:text-sm font-medium`}
                          style={{
                            color:
                              exp.rarity === "legendary" ? "#fbbf24" : exp.rarity === "epic" ? "#a855f7" : "#3b82f6",
                          }}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* XP Reward */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-bold text-sm sm:text-base">+{exp.xp} XP Earned</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Leadership Achievement */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 sm:p-8">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">👑</div>
                <div className="text-yellow-400 font-bold text-xl sm:text-2xl">Leadership Master</div>
                <div className="text-white text-base sm:text-lg">
                  Successfully led and contributed to coding community
                </div>
                <div className="text-gray-400 mt-2 text-sm sm:text-base">
                  Rare Achievement - Only 5% of players unlock this
                </div>
                <div className="mt-3 sm:mt-4 p-3 bg-black/30 rounded-lg">
                  <div className="text-yellow-400 font-bold text-sm sm:text-base">Bonus Rewards</div>
                  <div className="text-white text-xs sm:text-sm">+1000 Leadership XP | +500 Team XP | Mentor Badge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
