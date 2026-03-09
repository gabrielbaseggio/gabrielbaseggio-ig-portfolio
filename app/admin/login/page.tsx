"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      setError("Invalid password")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--s0)" }}
    >
      <div className="w-full max-w-sm mx-4">
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: "var(--s3)", border: "1px solid var(--s6)" }}
        >
          <p className="text-neutral-500 text-xs font-medium uppercase tracking-widest mb-5">
            Admin
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none"
              style={{
                border: "1px solid var(--s8)",
                backgroundColor: "var(--s4)",
              }}
              autoFocus
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-black transition-opacity"
              style={{
                backgroundColor: "var(--gold)",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
