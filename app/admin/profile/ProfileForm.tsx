"use client"

import { useState, useRef } from "react"
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new window.Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 400
      const ratio = Math.min(MAX / img.width, MAX / img.height, 1)
      const canvas = document.createElement("canvas")
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height)
      setData((prev) => ({ ...prev, avatar: canvas.toDataURL("image/jpeg", 0.85) }))
      URL.revokeObjectURL(img.src)
      // reset so the same file can be re-selected
      e.target.value = ""
    }
  }

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

      {/* Avatar upload */}
      <div className="mb-6">
        <p className="text-xs text-neutral-500 mb-3 uppercase tracking-widest">Profile Picture</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group relative rounded-full p-[2px] shrink-0 focus:outline-none"
            style={{
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <div className="rounded-full p-[2px]" style={{ backgroundColor: "var(--s1)" }}>
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--s5) 0%, var(--s9) 100%)" }}
                >
                  <span className="text-white text-2xl font-bold select-none tracking-tight">AB</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-semibold">Change</span>
            </div>
          </button>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="block text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: "var(--s3)", color: "var(--white)" }}
            >
              Upload photo
            </button>
            {data.avatar && (
              <button
                type="button"
                onClick={() => setData((prev) => ({ ...prev, avatar: "" }))}
                className="block text-xs text-neutral-500 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            )}
            <p className="text-xs text-neutral-600">JPG, PNG, WEBP — resized to 400×400</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
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
