"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    return { error: "Access Denied: Invalid credentials." }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/sudo/dashboard")
}
