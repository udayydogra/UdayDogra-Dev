import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function LogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug }
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#030712] py-20 lg:py-28 text-gray-300">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <Link href="/#logs" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-mono text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> root@portfolio:~# cd ..
        </Link>
        
        <header className="mb-12 border-b border-cyan-900/50 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-2 py-0.5 rounded border font-mono ${post.type === 'lab' ? 'border-red-900/50 text-red-400 bg-red-950/30' : 'border-blue-900/50 text-blue-400 bg-blue-950/30'}`}>
              {post.type.toUpperCase()}
            </span>
            <span className="text-gray-500 font-mono text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{post.title}</h1>
        </header>

        <article className="prose prose-invert prose-cyan max-w-none prose-pre:bg-[#0a0e17] prose-pre:border prose-pre:border-cyan-900/30">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
