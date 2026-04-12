"use client"

import { useState } from "react"
import { loginAdmin } from "@/app/actions/auth"

export default function SudoLogin() {
  const [error, setError] = useState<string | null>(null)
  
  async function handleSubmit(formData: FormData) {
    const result = await loginAdmin(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/50 border border-cyan-900/50 rounded-lg p-6 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="flex items-center gap-2 mb-6 text-cyan-400">
          <span className="text-xl">System Login v1.0.4</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-1 font-mono text-sm">
            <span className="text-gray-400">Welcome to restricted access shell.</span>
            <span className="text-gray-400">Please authenticate to continue.</span>
          </div>

          <form action={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-gray-500 font-mono text-xs mb-1">
                user@admin:~$ password:
              </label>
              <input
                type="password"
                name="password"
                className="w-full bg-black/50 border border-cyan-900/40 rounded px-3 py-2 text-cyan-400 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-xs font-mono bg-red-500/10 p-2 rounded border border-red-500/20">
                [!] {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-cyan-950/30 text-cyan-400 font-mono text-sm border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-400/50 py-2 rounded transition-all"
            >
              AUTHENTICATE_
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
