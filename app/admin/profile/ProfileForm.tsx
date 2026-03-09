"use client"

import { useState } from "react"
import type { Profile } from "@/lib/types"

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
        style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
      />
    </div>
  )
}

export default function ProfileForm({ initialData }: { initialData: Profile }) {
  const [data, setData] = useState(initialData)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function setField(field: keyof Omit<Profile, "stats">, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function setStat(key: keyof Profile["stats"], value: string) {
    setData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: key === "technologies" ? value : Number(value) },
    }))
  }

  async function handleSave() {
    setStatus("saving")
    const res = await fetch("/api/admin/data/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Profile</h1>
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-black transition-opacity"
          style={{
            backgroundColor: status === "error" ? "#ef4444" : "var(--gold)",
            opacity: status === "saving" ? 0.6 : 1,
          }}
        >
          {statusLabel}
        </button>
      </div>

      <div className="space-y-4 max-w-2xl">
        <Field label="Name"     value={data.name}     onChange={(v) => setField("name", v)} />
        <Field label="Username" value={data.username} onChange={(v) => setField("username", v)} />
        <Field label="Bio"      value={data.bio}      onChange={(v) => setField("bio", v)} />
        <Field label="Location" value={data.location} onChange={(v) => setField("location", v)} />
        <Field label="Email"    value={data.email}    onChange={(v) => setField("email", v)} type="email" />
        <Field label="GitHub URL" value={data.github} onChange={(v) => setField("github", v)} />

        <div>
          <p className="text-xs text-neutral-500 mb-2 uppercase tracking-widest">Stats</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="Projects"     value={String(data.stats.projects)}     onChange={(v) => setStat("projects", v)} />
            <Field label="Technologies" value={data.stats.technologies}         onChange={(v) => setStat("technologies", v)} />
            <Field label="Years Exp"    value={String(data.stats.yearsExp)}     onChange={(v) => setStat("yearsExp", v)} />
          </div>
        </div>
      </div>
    </div>
  )
}
