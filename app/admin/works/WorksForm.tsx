"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import type { WorkItem } from "@/lib/types"

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
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      )}
    </div>
  )
}

const EMPTY_WORK: WorkItem = {
  company: "",
  role: "",
  period: "",
  description: "",
  tech: [],
  bullets: [],
  github: null,
}

export default function WorksForm({ initialData }: { initialData: WorkItem[] }) {
  const [works, setWorks] = useState(initialData)
  const [open, setOpen] = useState<number | null>(0)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function update(i: number, field: keyof WorkItem, value: unknown) {
    setWorks((prev) => prev.map((w, idx) => idx === i ? { ...w, [field]: value } : w))
  }

  function addWork() {
    setWorks((prev) => [...prev, { ...EMPTY_WORK }])
    setOpen(works.length)
  }

  function removeWork(i: number) {
    setWorks((prev) => prev.filter((_, idx) => idx !== i))
    setOpen(null)
  }

  async function handleSave() {
    setStatus("saving")
    const cleanWorks = works.map((w) => ({
      ...w,
      tech: w.tech.map((s) => s.trim()).filter(Boolean),
      bullets: w.bullets.map((s) => s.trim()).filter(Boolean),
    }))
    const res = await fetch("/api/admin/data/works", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanWorks),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Works</h1>
        <div className="flex gap-2">
          <button
            onClick={addWork}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            style={{ backgroundColor: "var(--s4)", border: "1px solid var(--s6)" }}
          >
            <Plus size={13} strokeWidth={2} /> Add
          </button>
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
      </div>

      <div className="space-y-2">
        {works.map((work, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--s6)", backgroundColor: "var(--s2)" }}
          >
            {/* Accordion header */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-white text-sm font-medium">
                {work.company || `Work ${i + 1}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeWork(i) }}
                  className="text-neutral-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} strokeWidth={1.75} />
                </button>
                {open === i
                  ? <ChevronUp size={14} strokeWidth={2} className="text-neutral-500" />
                  : <ChevronDown size={14} strokeWidth={2} className="text-neutral-500" />}
              </div>
            </button>

            {open === i && (
              <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid var(--s6)" }}>
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Company" value={work.company} onChange={(v) => update(i, "company", v)} />
                  <Field label="Role"    value={work.role}    onChange={(v) => update(i, "role", v)} />
                </div>
                <Field label="Period"      value={work.period}      onChange={(v) => update(i, "period", v)} />
                <Field label="Description" value={work.description} onChange={(v) => update(i, "description", v)} multiline />
                <Field
                  label="Tech stack (comma-separated)"
                  value={work.tech.join(", ")}
                  onChange={(v) => update(i, "tech", v.split(","))}
                />
                <Field
                  label="Bullets (one per line)"
                  value={work.bullets.join("\n")}
                  onChange={(v) => update(i, "bullets", v.split("\n"))}
                  multiline
                />
                <Field
                  label="GitHub URL (optional)"
                  value={work.github ?? ""}
                  onChange={(v) => update(i, "github", v || null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
