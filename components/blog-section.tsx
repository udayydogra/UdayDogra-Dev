"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getRecentPosts } from "@/app/actions/posts"

type PostDTO = {
  id: string
  title: string
  slug: string
  type: string
  createdAt: string
}

export default function BlogSection() {
  const [posts, setPosts] = useState<PostDTO[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    getRecentPosts().then(res => {
      setPosts(res)
    })
  }, [])

  if (!mounted || posts.length === 0) {
    return null; // hide section if no posts or not mounted yet
  }

  return (
    <section id="logs" className="py-20 lg:py-28 relative bg-[#030712]">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 text-center">
          <div className="section-subtitle mb-3 justify-center">// tail -f /var/log/syslog</div>
          <h2 className="section-title">
            Writeups <span className="neon-text">&amp; Labs</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            My daily security research, bug bounty findings, and CTF lab walkthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/logs/${post.slug}`}
              className="card-dark border rounded-xl p-6 group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${post.type === 'lab' ? 'border-red-900/50 text-red-500 bg-red-950/30' : 'border-blue-900/50 text-blue-400 bg-blue-950/30'}`}>
                  {post.type.toUpperCase()}
                </span>
                <span className="text-gray-600 font-mono text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <div className="flex items-center text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm mt-4">
                [ cat {post.slug}.md <ArrowRight className="w-4 h-4 ml-2 inline" /> ]
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
