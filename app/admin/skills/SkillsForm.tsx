"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Trash2 } from "lucide-react"
import type { Skills, SkillCard, SkillCategory } from "@/lib/types"
import { techIconMap } from "@/lib/techIcons"

const CATEGORIES: SkillCategory[] = ["languages", "frontend", "backend", "tools"]
const KNOWN_TECHS = Object.keys(techIconMap)

type IconSearchResult = { found: true; path: string; color: string } | { found: false }

function IconPicker({
  value,
  iconPath,
  iconColor,
  onChange,
}: {
  value: string
  iconPath?: string
  iconColor?: string
  onChange: (name: string, iconPath: string | null, iconColor: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState<IconSearchResult | "searching" | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = KNOWN_TECHS.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  )
  const isCustom = search.trim().length > 0 &&
    !KNOWN_TECHS.some((t) => t.toLowerCase() === search.trim().toLowerCase())

  // Debounce icon search for custom names
  useEffect(() => {
    if (!isCustom) { setSearchResult(null); return }
    setSearchResult("searching")
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/admin/icon-search?name=${encodeURIComponent(search.trim())}`)
      const data: IconSearchResult = await res.json()
      setSearchResult(data)
    }, 500)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search, isCustom])

  function close() { setOpen(false); setSearch(""); setSearchResult(null) }

  function pickKnown(tech: string) {
    onChange(tech, null, null)
    close()
  }

  function pickCustom() {
    const name = search.trim()
    if (searchResult && searchResult !== "searching" && searchResult.found) {
      onChange(name, searchResult.path, searchResult.color)
    } else {
      onChange(name, null, null)
    }
    close()
  }

  // Resolve current display icon
  const displayIcon = iconPath
    ? { type: "si" as const, path: iconPath, color: iconColor ?? "#888" }
    : techIconMap[value]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white w-full text-left"
        style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
      >
        {value ? (
          <>
            {displayIcon && (
              <span className="shrink-0">
                {displayIcon.type === "si" ? (
                  <svg viewBox="0 0 24 24" width={12} height={12} fill={displayIcon.color}>
                    <path d={displayIcon.path} />
                  </svg>
                ) : (
                  <span style={{ color: displayIcon.color }}>●</span>
                )}
              </span>
            )}
            <span className="text-sm">{value}</span>
          </>
        ) : (
          <span className="text-neutral-500 text-sm">Select tech…</span>
        )}
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-64 rounded-xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: "var(--s3)",
            border: "1px solid var(--s7)",
            maxHeight: "260px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          <div className="p-2 shrink-0" style={{ borderBottom: "1px solid var(--s6)" }}>
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { if (isCustom) pickCustom(); else if (filtered[0]) pickKnown(filtered[0]) }
                if (e.key === "Escape") close()
              }}
              placeholder="Search or type custom…"
              className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
              style={{ backgroundColor: "var(--s4)", border: "1px solid var(--s6)" }}
            />
          </div>

          <div className="overflow-y-auto">
            {filtered.map((tech) => {
              const icon = techIconMap[tech]
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => pickKnown(tech)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-[var(--s5)] transition-colors"
                  style={{ color: tech === value ? "var(--white)" : "rgb(163,163,163)" }}
                >
                  <span className="w-4 flex justify-center shrink-0">
                    {icon.type === "si" ? (
                      <svg viewBox="0 0 24 24" width={12} height={12} fill={icon.color}>
                        <path d={icon.path} />
                      </svg>
                    ) : (
                      <icon.icon size={12} strokeWidth={1.75} style={{ color: icon.color }} />
                    )}
                  </span>
                  {tech}
                </button>
              )
            })}

            {isCustom && (
              <button
                type="button"
                onClick={pickCustom}
                disabled={searchResult === "searching"}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-[var(--s5)] transition-colors"
                style={{ color: "rgb(163,163,163)" }}
              >
                {searchResult === "searching" ? (
                  <span className="text-neutral-500 italic">Searching icon…</span>
                ) : searchResult && searchResult.found ? (
                  <>
                    <svg viewBox="0 0 24 24" width={12} height={12} fill={searchResult.color} className="shrink-0">
                      <path d={searchResult.path} />
                    </svg>
                    Use &ldquo;{search.trim()}&rdquo;
                  </>
                ) : (
                  <>
                    <span className="text-neutral-600">+</span>
                    Use &ldquo;{search.trim()}&rdquo; <span className="text-neutral-600">(no icon)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SkillsForm({
  initialSkills,
  initialCards,
}: {
  initialSkills: Skills
  initialCards: SkillCard[]
}) {
  const [skills, setSkills] = useState(initialSkills)
  const [cards, setCards] = useState(initialCards)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function updateSkillList(cat: SkillCategory, text: string) {
    setSkills((prev) => ({ ...prev, [cat]: text.split("\n") }))
  }

  function updateCard(i: number, field: keyof SkillCard, value: string) {
    setCards((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c))
  }

  function addCard() {
    setCards((prev) => [
      { id: `card-${Date.now()}`, name: "", category: "languages" as SkillCategory },
      ...prev,
    ])
  }

  function removeCard(i: number) {
    setCards((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setStatus("saving")
    const cleanSkills = Object.fromEntries(
      CATEGORIES.map((cat) => [cat, skills[cat].map((s) => s.trim()).filter(Boolean)])
    ) as unknown as typeof skills
    const res = await fetch("/api/admin/data/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: cleanSkills, skillCards: cards }),
    })
    setStatus(res.ok ? "saved" : "error")
    setTimeout(() => setStatus("idle"), 2000)
  }

  const statusLabel = { idle: "Save", saving: "Saving…", saved: "Saved", error: "Error" }[status]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white font-semibold text-base">Skills</h1>
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Skill lists */}
        <div className="flex-1 space-y-4">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Skill lists (one per line)</p>
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <label className="block text-xs text-neutral-500 mb-1 capitalize">{cat}</label>
              <textarea
                rows={5}
                value={skills[cat].join("\n")}
                onChange={(e) => updateSkillList(cat, e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none"
                style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
              />
            </div>
          ))}
        </div>

        {/* Skill cards */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Grid cards</p>
            <button
              onClick={addCard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-colors"
              style={{ backgroundColor: "var(--s4)", border: "1px solid var(--s6)" }}
            >
              <Plus size={12} strokeWidth={2} /> Add
            </button>
          </div>

          <div className="space-y-2">
            {cards.map((card, i) => (
              <div
                key={card.id}
                className="rounded-xl p-3 space-y-2"
                style={{ border: "1px solid var(--s6)", backgroundColor: "var(--s2)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <IconPicker
                      value={card.name}
                      iconPath={card.iconPath}
                      iconColor={card.iconColor}
                      onChange={(name, path, color) => {
                        setCards((prev) => prev.map((c, idx) => {
                          if (idx !== i) return c
                          return {
                            ...c,
                            name,
                            iconPath: path ?? undefined,
                            iconColor: color ?? undefined,
                            id: c.id.startsWith("card-")
                              ? name.toLowerCase().replace(/[^a-z0-9]/g, "-")
                              : c.id,
                          }
                        }))
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeCard(i)}
                    className="text-neutral-600 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 size={13} strokeWidth={1.75} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Display name</label>
                    <input
                      value={card.displayName ?? ""}
                      onChange={(e) => updateCard(i, "displayName", e.target.value)}
                      placeholder="(optional)"
                      className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
                      style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Category</label>
                    <select
                      value={card.category}
                      onChange={(e) => updateCard(i, "category", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-md text-xs text-white outline-none"
                      style={{ border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
