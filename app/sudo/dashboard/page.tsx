import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createPost } from "@/app/actions/posts"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (session?.value !== "authenticated") {
    redirect("/sudo")
  }

  // Fetch recent posts
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  })

  return (
    <div className="min-h-screen bg-[#030712] text-gray-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">root@portfolio:~# dashboard</h1>
            <p className="text-xs text-gray-500 mt-1">Manage Labs and Blog Writeups</p>
          </div>
          <div className="text-sm bg-cyan-950/30 px-3 py-1 border border-cyan-900/50 rounded text-cyan-400">
            Session: Active
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Form */}
          <div className="card-dark border border-cyan-900/40 rounded-xl p-5 bg-black/40">
            <h2 className="text-lg font-bold text-cyan-400 mb-4">// target.create()</h2>
            <form action={async (fd) => { "use server"; await createPost(fd); }} className="space-y-4">
              <div>
                <label className="block text-xs mb-1 text-gray-400">Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  className="w-full bg-black/50 border border-cyan-900/40 rounded px-3 py-2 text-cyan-400 focus:outline-none focus:border-cyan-500" 
                />
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-400">Type:</label>
                <select 
                  name="type" 
                  className="w-full bg-black/50 border border-cyan-900/40 rounded px-3 py-2 text-cyan-400 focus:outline-none focus:border-cyan-500"
                >
                  <option value="lab">Lab Writeup</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-400">Content (Markdown):</label>
                <textarea 
                  name="content" 
                  rows={8}
                  required
                  className="w-full bg-black/50 border border-cyan-900/40 rounded px-3 py-2 text-cyan-400 focus:outline-none focus:border-cyan-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-cyan-950/30 text-cyan-400 font-mono text-sm border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-400/50 py-2 rounded transition-all"
              >
                EXECUTE ./save.sh
              </button>
            </form>
          </div>

          {/* Recent Records */}
          <div className="card-dark border border-cyan-900/40 rounded-xl p-5 bg-black/40 h-fit">
            <h2 className="text-lg font-bold text-cyan-400 mb-4">ls -la ./recent</h2>
            
            <div className="space-y-3">
              {posts.length === 0 ? (
                <div className="text-gray-500 text-sm">No records found.</div>
              ) : (
                posts.map((post: any) => (
                  <div key={post.id} className="border border-cyan-900/20 bg-black/20 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-200 truncate pr-2">{post.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${post.type === 'lab' ? 'border-red-900/50 text-red-400 bg-red-950/30' : 'border-blue-900/50 text-blue-400 bg-blue-950/30'}`}>
                        {post.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()} | /{post.slug}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
