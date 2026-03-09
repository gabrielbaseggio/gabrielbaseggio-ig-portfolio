"use client"

import { useState } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import {
  Briefcase, Cpu, GraduationCap, UserRound, Code2, Layers,
  Star, Zap, BookOpen, Globe, Heart, Camera, type LucideIcon,
} from "lucide-react"
import type { Highlight } from "@/lib/types"

const ICON_OPTIONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Briefcase",    Icon: Briefcase    },
  { name: "Cpu",          Icon: Cpu          },
  { name: "GraduationCap",Icon: GraduationCap},
  { name: "UserRound",    Icon: UserRound    },
  { name: "Code2",        Icon: Code2        },
  { name: "Layers",       Icon: Layers       },
  { name: "Star",         Icon: Star         },
  { name: "Zap",          Icon: Zap          },
  { name: "BookOpen",     Icon: BookOpen     },
  { name: "Globe",        Icon: Globe        },
  { name: "Heart",        Icon: Heart        },
  { name: "Camera",       Icon: Camera       },
]

const EMPTY_HIGHLIGHT: Highlight = { id: "", label: "", href: "/", icon: "Star" }

export default function HighlightsForm({ initialData }: { initialData: Highlight[] }) {
  const [items, setItems] = useState(initialData)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function update(i: number, field: keyof Highlight, value: string) {
    setItems((prev) => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h))
  }

  function move(i: number, dir: -1 | 1) {
    const next = [...items]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  function add() {
    setItems((prev) => [...prev, { ...EMPTY_HIGHLIGHT, id: `story-${Date.now()}` }])
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setStatus("saving")
    const res = await fetch("/api/admin/data/highlights", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Highlights</h1>
        <div className="flex gap-2">
          <button
            onClick={add}
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
        {items.map((item, i) => {
          const current = ICON_OPTIONS.find((o) => o.name === item.icon)
          const Icon = current?.Icon ?? Star

          return (
            <div
              key={item.id || i}
              className="rounded-xl p-4"
              style={{ border: "1px solid var(--s6)", backgroundColor: "var(--s2)" }}
            >
              <div className="flex items-start gap-3">
                {/* Order controls */}
                <div className="flex flex-col gap-1 pt-1">
                  <button onClick={() => move(i, -1)} className="text-neutral-600 hover:text-white transition-colors">
                    <ArrowUp size={12} strokeWidth={2} />
                  </button>
                  <button onClick={() => move(i, 1)} className="text-neutral-600 hover:text-white transition-colors">
                    <ArrowDown size={12} strokeWidth={2} />
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">ID</label>
                      <input
                        value={item.id}
                        onChange={(e) => update(i, "id", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
                        style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Label</label>
                      <input
                        value={item.label}
                        onChange={(e) => update(i, "label", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
                        style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Link</label>
                    <input
                      value={item.href}
                      onChange={(e) => update(i, "href", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
                      style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                    />
                  </div>

                  {/* Icon picker */}
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Icon</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ICON_OPTIONS.map(({ name, Icon: Ic }) => (
                        <button
                          key={name}
                          type="button"
                          title={name}
                          onClick={() => update(i, "icon", name)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: item.icon === name ? "var(--s6)" : "var(--s4)",
                            border: `1px solid ${item.icon === name ? "var(--gold)" : "var(--s7)"}`,
                            color: item.icon === name ? "var(--gold)" : "rgb(115,115,115)",
                          }}
                        >
                          <Ic size={14} strokeWidth={1.75} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview + delete */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--s3)" }}
                    >
                      <Icon size={16} strokeWidth={1.5} className="text-white" />
                    </div>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-neutral-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={13} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
