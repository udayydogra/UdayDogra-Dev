import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE)

  // Reject anything but a valid, unexpired, server-signed token.
  if (!verifySessionToken(session?.value)) {
    redirect("/sudo")
  }



  return (
    <div className="min-h-screen bg-[#030712] text-gray-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">root@portfolio:~# dashboard</h1>
            <p className="text-xs text-gray-500 mt-1">Sudo access granted</p>
          </div>
          <div className="text-sm bg-cyan-950/30 px-3 py-1 border border-cyan-900/50 rounded text-cyan-400">
            Session: Active
          </div>
        </header>

        <div className="card-dark border border-cyan-900/40 rounded-xl p-5 bg-black/40">
          <h2 className="text-lg font-bold text-cyan-400 mb-4">// System Status</h2>
          <div className="text-gray-500 text-sm mt-4">
            Everything is running normally.
          </div>
        </div>
      </div>
    </div>
  )
}
