export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-purple-500/30 text-white py-8 relative">
      {/* Maximum width container with 5% spacing */}
      <div className="w-full px-[2.5%]">
        <div className="text-center">
          <p className="text-gray-400">© 2025 Uday Dogra. Built with Next.js, Tailwind CSS, and lots of ⚡ energy.</p>
          <p className="text-purple-400 text-sm mt-2">
            🎮 Thanks for visiting my portfolio! Keep coding and stay awesome! 🚀
          </p>
        </div>
      </div>
    </footer>
  )
}
