"use client"

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="mono text-xs text-gray-600">
            <span className="text-cyan-400">$</span> echo "Built by Uday Dogra — AppSec Researcher"
          </div>
          <div className="mono text-xs text-gray-700">
            © 2025 · udaydogra204@gmail.com
          </div>
        </div>
      </div>
    </footer>
  )
}
