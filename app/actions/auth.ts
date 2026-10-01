"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ADMIN_COOKIE, createSessionToken, verifyPassword } from "@/lib/admin-session"

export async function loginAdmin(formData: FormData) {
  const password = (formData.get("password") as string) ?? ""

  // Constant-time check; rejects when ADMIN_PASSWORD is unset.
  if (!verifyPassword(password)) {
    return { error: "Access Denied: Invalid credentials." }
  }

  const token = createSessionToken()
  if (!token) {
    // No secret configured — refuse to mint a session rather than fail open.
    return { error: "Server misconfigured: admin sessions are disabled." }
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/sudo/dashboard")
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect("/sudo")
}
