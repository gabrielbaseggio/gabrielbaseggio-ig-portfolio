"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import type { TranslationsData, TranslationShape, Lang } from "@/lib/types"

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
}) {
  const cls = "w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none"
  const style = { border: "1px solid var(--s8)", backgroundColor: "var(--s4)" }
  return (
    <div>
      <label className="block text-xs text-neutral-500 mb-1">{label}</label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={style} />
      )}
    </div>
  )
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--s6)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "var(--s2)" }}
      >
        <span className="text-white text-sm font-medium">{title}</span>
        {open
          ? <ChevronUp size={14} strokeWidth={2} className="text-neutral-500" />
          : <ChevronDown size={14} strokeWidth={2} className="text-neutral-500" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 space-y-3" style={{ backgroundColor: "var(--s1)" }}>
          {children}
        </div>
      )}
    </div>
  )
}

function LangPane({
  data,
  onChange,
}: {
  data: TranslationShape
  onChange: (updated: TranslationShape) => void
}) {
  function set(path: string[], value: string) {
    const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = updated
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]]
    obj[path[path.length - 1]] = value
    onChange(updated)
  }

  function setIndexed(path: string[], index: number, field: string, value: string) {
    const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let obj: any = updated
    for (const key of path) obj = obj[key]
    obj[index][field] = value
    onChange(updated)
  }

  function addWorkItem() {
    const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
    updated.work.items.push({ company: "", role: "", period: "", description: "", bullets: [""] })
    onChange(updated)
  }

  function removeWorkItem(i: number) {
    const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
    updated.work.items.splice(i, 1)
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {/* Nav */}
      <Section title="Nav">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["work", "skills", "education", "about"] as const).map((k) => (
            <Field key={k} label={k} value={data.nav[k]} onChange={(v) => set(["nav", k], v)} />
          ))}
        </div>
      </Section>

      {/* Profile */}
      <Section title="Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Role"    value={data.profile.role}    onChange={(v) => set(["profile", "role"], v)} />
          <Field label="Studies" value={data.profile.studies} onChange={(v) => set(["profile", "studies"], v)} />
          <Field label="Message button" value={data.profile.message} onChange={(v) => set(["profile", "message"], v)} />
          <Field label="GitHub button"  value={data.profile.github}  onChange={(v) => set(["profile", "github"], v)} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Field label="Projects stat"     value={data.profile.stats.projects}     onChange={(v) => set(["profile", "stats", "projects"], v)} />
          <Field label="Technologies stat" value={data.profile.stats.technologies} onChange={(v) => set(["profile", "stats", "technologies"], v)} />
          <Field label="Years Exp stat"    value={data.profile.stats.yearsExp}     onChange={(v) => set(["profile", "stats", "yearsExp"], v)} />
        </div>
      </Section>

      {/* Highlights */}
      <Section title="Highlights labels">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["work", "skills", "education", "about"] as const).map((k) => (
            <Field key={k} label={k} value={data.highlights[k]} onChange={(v) => set(["highlights", k], v)} />
          ))}
        </div>
      </Section>

      {/* PostGrid */}
      <Section title="Post grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Work label"      value={data.postGrid.work}      onChange={(v) => set(["postGrid", "work"], v)} />
          <Field label="Skills label"    value={data.postGrid.skills}    onChange={(v) => set(["postGrid", "skills"], v)} />
          <Field label="Education label" value={data.postGrid.education} onChange={(v) => set(["postGrid", "education"], v)} />
          <Field label="Less button"     value={data.postGrid.less}      onChange={(v) => set(["postGrid", "less"], v)} />
        </div>
        <p className="text-xs text-neutral-500 mt-1">Skill sections</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["languages", "frontend", "backend", "tools"] as const).map((k) => (
            <Field key={k} label={k} value={data.postGrid.skillSections[k]} onChange={(v) => set(["postGrid", "skillSections", k], v)} />
          ))}
        </div>
      </Section>

      {/* Posts */}
      <Section title="Post card labels">
        <div className="space-y-2">
          {Object.keys(data.posts).map((id) => {
            const p = data.posts[id]
            return (
              <div key={id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                <p className="text-xs text-neutral-500 pb-2">{id}</p>
                <Field label="subtitle" value={p.subtitle} onChange={(v) => { const u = JSON.parse(JSON.stringify(data)) as TranslationShape; u.posts[id].subtitle = v; onChange(u) }} />
                <Field label="detail"   value={p.detail ?? ""} onChange={(v) => { const u = JSON.parse(JSON.stringify(data)) as TranslationShape; u.posts[id].detail = v; onChange(u) }} />
              </div>
            )
          })}
        </div>
      </Section>

      {/* Work */}
      <Section title="Work items" defaultOpen>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-500">Translated job entries</span>
          <button
            type="button"
            onClick={addWorkItem}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-neutral-400 hover:text-white transition-colors"
            style={{ backgroundColor: "var(--s4)", border: "1px solid var(--s6)" }}
          >
            <Plus size={11} strokeWidth={2} /> Add
          </button>
        </div>
        {data.work.items.map((item, i) => (
          <div key={i} className="rounded-xl p-3 space-y-2 relative" style={{ border: "1px solid var(--s6)", backgroundColor: "var(--s2)" }}>
            <button
              onClick={() => removeWorkItem(i)}
              className="absolute top-2 right-2 text-neutral-600 hover:text-red-400 transition-colors"
            >
              <Trash2 size={12} strokeWidth={1.75} />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
              <Field label="Company"     value={item.company}     onChange={(v) => setIndexed(["work", "items"], i, "company", v)} />
              <Field label="Role"        value={item.role}        onChange={(v) => setIndexed(["work", "items"], i, "role", v)} />
            </div>
            <Field label="Period"        value={item.period}      onChange={(v) => setIndexed(["work", "items"], i, "period", v)} />
            <Field label="Description"   value={item.description} onChange={(v) => setIndexed(["work", "items"], i, "description", v)} multiline rows={2} />
            <Field
              label="Bullets (one per line)"
              value={item.bullets.join("\n")}
              onChange={(v) => {
                const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
                updated.work.items[i].bullets = v.split("\n")
                onChange(updated)
              }}
              multiline
              rows={4}
            />
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <Field label="Section heading"     value={data.work.heading}       onChange={(v) => set(["work", "heading"], v)} />
          <Field label="View on GitHub text" value={data.work.viewOnGitHub}  onChange={(v) => set(["work", "viewOnGitHub"], v)} />
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills page">
        <Field label="Heading" value={data.skills.heading} onChange={(v) => set(["skills", "heading"], v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["languages", "frontend", "backend", "tools"] as const).map((k) => (
            <Field key={k} label={k} value={data.skills.categories[k]} onChange={(v) => set(["skills", "categories", k], v)} />
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education page">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Heading"       value={data.education.heading}       onChange={(v) => set(["education", "heading"], v)} />
          <Field label="Degree"        value={data.education.degree}        onChange={(v) => set(["education", "degree"], v)} />
          <Field label="GPA label"     value={data.education.gpaLabel}      onChange={(v) => set(["education", "gpaLabel"], v)} />
          <Field label="GPA rank"      value={data.education.gpaRank}       onChange={(v) => set(["education", "gpaRank"], v)} />
          <Field label="Honors label"  value={data.education.honorsLabel}   onChange={(v) => set(["education", "honorsLabel"], v)} />
        </div>
        <Field label="Description" value={data.education.description} onChange={(v) => set(["education", "description"], v)} multiline />
        <Field
          label="Honors (one per line)"
          value={data.education.honors.join("\n")}
          onChange={(v) => {
            const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
            updated.education.honors = v.split("\n")
            onChange(updated)
          }}
          multiline
          rows={3}
        />
      </Section>

      {/* About */}
      <Section title="About page">
        <Field label="Heading"          value={data.about.heading}       onChange={(v) => set(["about", "heading"], v)} />
        <Field label="Work style label" value={data.about.workStyleLabel} onChange={(v) => set(["about", "workStyleLabel"], v)} />
        <Field
          label="Intro paragraphs (one per line)"
          value={data.about.intro.join("\n")}
          onChange={(v) => {
            const updated = JSON.parse(JSON.stringify(data)) as TranslationShape
            updated.about.intro = v.split("\n")
            onChange(updated)
          }}
          multiline
          rows={5}
        />
        <p className="text-xs text-neutral-500">Traits</p>
        {data.about.traits.map((trait, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Field label={`Trait ${i + 1} label`} value={trait.label} onChange={(v) => setIndexed(["about", "traits"], i, "label", v)} />
            <Field label="Description"             value={trait.desc}  onChange={(v) => setIndexed(["about", "traits"], i, "desc", v)} />
          </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="CTA heading" value={data.about.ctaHeading} onChange={(v) => set(["about", "ctaHeading"], v)} />
          <Field label="CTA subtext" value={data.about.ctaSubtext} onChange={(v) => set(["about", "ctaSubtext"], v)} />
          <Field label="CTA button"  value={data.about.ctaButton}  onChange={(v) => set(["about", "ctaButton"], v)} />
        </div>
      </Section>
    </div>
  )
}

export default function TranslationsForm({ initialData }: { initialData: TranslationsData }) {
  const [data, setData] = useState(initialData)
  const [activeLang, setActiveLang] = useState<Lang>("en")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function cleanLang(t: TranslationShape): TranslationShape {
    const clean = JSON.parse(JSON.stringify(t)) as TranslationShape
    clean.about.intro = clean.about.intro.map((s) => s.trim()).filter(Boolean)
    clean.education.honors = clean.education.honors.map((s) => s.trim()).filter(Boolean)
    clean.work.items = clean.work.items.map((item) => ({
      ...item,
      bullets: item.bullets.map((s) => s.trim()).filter(Boolean),
    }))
    return clean
  }

  async function handleSave() {
    setStatus("saving")
    const clean = { en: cleanLang(data.en), es: cleanLang(data.es) }
    const res = await fetch("/api/admin/data/translations", {
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
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold text-base">Translations</h1>
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--s6)" }}>
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLang(l)}
                className="px-4 py-1.5 text-xs font-medium transition-colors uppercase"
                style={{
                  backgroundColor: activeLang === l ? "var(--s5)" : "var(--s2)",
                  color: activeLang === l ? "var(--white)" : "rgb(115,115,115)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
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

      <div>
        <LangPane
          data={data[activeLang]}
          onChange={(updated) => setData((prev) => ({ ...prev, [activeLang]: updated }))}
        />
      </div>
    </div>
  )
}
