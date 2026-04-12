"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const type = formData.get("type") as string
  
  if (!title || !content || !type) {
    throw new Error("Missing required fields")
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        type,
      },
    })
    
    revalidatePath("/")
    revalidatePath("/logs")
    return { success: true }
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { error: "A post with this title/slug already exists." }
    }
    return { error: "Failed to create post." }
  }
}

export async function getRecentPosts(): Promise<any[]> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      createdAt: true
    },
    take: 6
  })
  
  return posts.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString()
  }))
}

