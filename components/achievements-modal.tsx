"use client"
import { X, Trophy, Star } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

interface AchievementsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const achievements: Achievement[] = [
    {
      id: "first-project",
      title: "First Steps",
      description: "Complete your first project",
      icon: "🚀",
      rarity: "common",
      unlocked: true,
    },
    {
      id: "react-master",
      title: "React Master",
      description: "Master React.js framework",
      icon: "⚛️",
      rarity: "epic",
      unlocked: true,
    },
    {
      id: "ai-pioneer",
      title: "AI Pioneer",
      description: "Build an AI-powered application",
      icon: "🤖",
      rarity: "legendary",
      unlocked: true,
    },
    {
      id: "code-warrior",
      title: "Code Warrior",
      description: "Write 10,000 lines of code",
      icon: "⚔️",
      rarity: "rare",
      unlocked: true,
      progress: 8500,
      maxProgress: 10000,
    },
    {
      id: "team-leader",
      title: "Team Leader",
      description: "Lead a development team",
      icon: "👑",
      rarity: "legendary",
      unlocked: true,
    },
    {
      id: "full-stack",
      title: "Full Stack Developer",
      description: "Master both frontend and backend",
      icon: "🔧",
      rarity: "epic",
      unlocked: false,
      progress: 75,
      maxProgress: 100,
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Achievements</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-xl border-2 ${getRarityBorder(achievement.rarity)} ${
                  achievement.unlocked ? "opacity-100" : "opacity-50"
                } transition-all duration-300 hover:scale-105`}
              >
                {/* Rarity glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(achievement.rarity)} opacity-10 rounded-xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-bold text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-black`}
                    >
                      {achievement.rarity.toUpperCase()}
                    </div>
                  </div>

                  {/* Progress bar for incomplete achievements */}
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  <div className="mt-3 flex items-center gap-2">
                    {achievement.unlocked ? (
                      <>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-green-400 font-medium">Unlocked</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-500 font-medium">Locked</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
