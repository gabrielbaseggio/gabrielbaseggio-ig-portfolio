"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { type Lang } from "@/lib/i18n"
import ProfileHeader from "@/components/ProfileHeader"
import StoryHighlights from "@/components/StoryHighlights"
import PostGrid from "@/components/PostGrid"

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
]

function LangDropdown() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find((l) => l.code === lang)!

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-semibold tracking-widest px-2.5 py-1 rounded-md transition-colors"
        style={{
          color: "var(--white)",
          backgroundColor: open ? "var(--s5)" : "var(--s4)",
          border: "1px solid var(--s8)",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown
          size={11}
          strokeWidth={2.5}
          className="transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-36 rounded-xl overflow-hidden z-50 py-1"
          style={{
            backgroundColor: "var(--s3)",
            border: "1px solid var(--s7)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {languages.map((l) => {
            const isActive = l.code === lang
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={isActive}
                onClick={() => { setLang(l.code); setOpen(false) }}
                className="w-full flex items-center justify-between px-3.5 py-2 text-sm transition-colors"
                style={{
                  color: isActive ? "var(--white)" : "rgb(163,163,163)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--s5)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span className="flex items-center gap-2">
                  <span>{l.flag}</span>
                  <span className="font-medium">{l.label}</span>
                </span>
                {isActive && <Check size={12} strokeWidth={2.5} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-30 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(14,14,14,0.96)",
          borderBottom: "1px solid var(--s6)",
        }}
      >
        <span className="text-white font-semibold text-base tracking-tight">
          axelbaseggio
        </span>
        <LangDropdown />
      </div>

      <ProfileHeader />
      <StoryHighlights />
      <PostGrid />
    </div>
  )
}
