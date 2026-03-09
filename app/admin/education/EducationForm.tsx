"use client"

import { useState } from "react"
import type { Education } from "@/lib/types"

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const cls = "w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none"
  const style = { border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      )}
    </div>
  )
}

export default function EducationForm({ initialData }: { initialData: Education }) {
  const [data, setData] = useState(initialData)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function set(field: keyof Education, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setStatus("saving")
    const clean = { ...data, honors: data.honors.map((s) => s.trim()).filter(Boolean) }
    const res = await fetch("/api/admin/data/education", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Education</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Institution"  value={data.institution} onChange={(v) => set("institution", v)} />
          <Field label="Short name"   value={data.shortName}   onChange={(v) => set("shortName", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Degree"       value={data.degree}      onChange={(v) => set("degree", v)} />
          <Field label="Period"       value={data.period}      onChange={(v) => set("period", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="GPA"          value={data.gpa}         onChange={(v) => set("gpa", v)} />
          <Field label="GPA rank"     value={data.gpaRank}     onChange={(v) => set("gpaRank", v)} />
        </div>
        <Field label="Description"    value={data.description} onChange={(v) => set("description", v)} multiline />
        <Field
          label="Honors (one per line)"
          value={data.honors.join("\n")}
          onChange={(v) => setData((prev) => ({ ...prev, honors: v.split("\n") }))}
          multiline
        />
      </div>
    </div>
  )
}
