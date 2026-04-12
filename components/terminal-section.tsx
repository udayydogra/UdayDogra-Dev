"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check } from "lucide-react"

const commands = [
  {
    prompt: "root@kali:~#",
    cmd: "subfinder -d target.com -silent | httprobe -c 50 | sort -u",
    output: [
      "https://api.target.com",
      "https://admin.target.com",
      "https://staging.target.com",
      "https://dev.target.com",
      "[+] 127 alive subdomains found",
    ],
    color: "text-cyan-400",
  },
  {
    prompt: "root@kali:~#",
    cmd: "ffuf -w /usr/share/wordlists/seclists/Discovery/Web-Content/common.txt -u https://target.com/FUZZ -mc 200,301,302 -t 50",
    output: [
      "/.git/config    [Status: 200, Size: 341]",
      "/backup.zip     [Status: 200, Size: 84231]",
      "/api/v1         [Status: 200, Size: 1204]",
      "[+] 23 interesting paths discovered",
    ],
    color: "text-green-400",
  },
  {
    prompt: "root@kali:~#",
    cmd: "nmap -sV -sC -p- --min-rate 5000 -oN full_scan.txt target.com",
    output: [
      "PORT   STATE SERVICE VERSION",
      "22/tcp open  ssh     OpenSSH 7.9",
      "80/tcp open  http    nginx 1.18",
      "443/tcp open https   nginx 1.18",
      "[+] Scan complete. Results: full_scan.txt",
    ],
    color: "text-yellow-400",
  },
  {
    prompt: "root@kali:~#",
    cmd: "sqlmap -u 'https://target.com/api/users?id=1' --dbs --batch --level=5",
    output: [
      "[*] Testing connection ...",
      "[+] Parameter 'id' is injectable",
      "[*] Backend DBMS: MySQL >= 8.0",
      "available databases: [users_db, admin_db, logs]",
      "[+] SQLi confirmed — data exfiltration possible",
    ],
    color: "text-red-400",
  },
]

export default function TerminalSection() {
  const [currentCmd, setCurrentCmd] = useState(0)
  const [displayedCmd, setDisplayedCmd] = useState("")
  const [showOutput, setShowOutput] = useState(false)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    const cmd = commands[currentCmd]
    setDisplayedCmd("")
    setShowOutput(false)
    setDisplayedLines([])

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < cmd.cmd.length) {
        setDisplayedCmd(cmd.cmd.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setShowOutput(true)
          cmd.output.forEach((line, li) => {
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, line])
            }, li * 150)
          })
          setTimeout(() => {
            setCurrentCmd((c) => (c + 1) % commands.length)
          }, cmd.output.length * 150 + 2500)
        }, 400)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [currentCmd, visible])

  const copyCmd = () => {
    navigator.clipboard.writeText(commands[currentCmd].cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="terminal" className="py-20 lg:py-28 relative bg-[#030712]" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="section-subtitle mb-3">// live_terminal.sh</div>
          <h2 className="section-title">
            Tools in <span className="neon-text">Action</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">
            Real commands from a real security workflow. This is what day-to-day reconnaissance looks like.
          </p>
        </div>

        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Terminal window */}
          <div className="card-dark rounded-xl overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-400/5 max-w-4xl mx-auto">
            {/* Title bar */}
            <div className="bg-gray-900/80 px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
                </div>
                <span className="mono text-xs text-gray-400">bash — root@kali — 80×24</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {commands.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentCmd(i)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                        i === currentCmd ? "bg-cyan-400" : "bg-gray-600 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <button onClick={copyCmd} className="flex items-center gap-1 mono text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? "copied" : "copy"}
                </button>
              </div>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0d1117] p-6 font-mono text-sm min-h-64">
              {/* Command line */}
              <div className="flex items-start gap-2 mb-3">
                <span className="text-cyan-400 flex-shrink-0">{commands[currentCmd].prompt}</span>
                <span className={`flex-1 break-all ${commands[currentCmd].color}`}>
                  {displayedCmd}
                  <span className="terminal-cursor text-white">▌</span>
                </span>
              </div>

              {/* Output */}
              {showOutput && (
                <div className="pl-0 space-y-1 text-green-300/80 text-xs">
                  {displayedLines.map((line, i) => (
                    <div key={i} className={line.startsWith("[+]") ? "text-green-400 font-semibold" : line.startsWith("[*]") ? "text-yellow-400" : "text-gray-400"}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Command selector pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {["Recon", "Fuzzing", "Scanning", "SQLi"].map((label, i) => (
              <button
                key={label}
                onClick={() => setCurrentCmd(i)}
                className={`mono text-xs px-4 py-2 rounded-lg border transition-all ${
                  currentCmd === i
                    ? "bg-cyan-400/10 border-cyan-400/50 text-cyan-400"
                    : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
