"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { usePortfolioData } from "@/context/DataContext"
import { useLang } from "@/context/LangContext"
import type { Skills } from "@/lib/types"

export default function SkillsPage() {
  const { skills } = usePortfolioData()
  const { tr } = useLang()

  const categories: { label: string; key: keyof Skills }[] = [
    { label: tr.skills.categories.languages, key: "languages" },
    { label: tr.skills.categories.frontend,  key: "frontend"  },
    { label: tr.skills.categories.backend,   key: "backend"   },
    { label: tr.skills.categories.tools,     key: "tools"     },
  ]

  return (
    <div className="pb-24">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 sticky top-0 backdrop-blur-md z-30"
        style={{
          backgroundColor: "rgba(14,14,14,0.96)",
          borderBottom: "1px solid var(--s6)",
        }}
      >
        <Link
          href="/"
          className="text-neutral-400 hover:text-white transition-colors"
          aria-label="Back"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="text-white font-semibold text-sm tracking-tight">{tr.skills.heading}</h1>
      </div>

      <div className="px-4 py-6 space-y-7">
        {categories.map(({ label, key }) => (
          <div key={key}>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-[3px] h-4 rounded-full"
                style={{ backgroundColor: "var(--white)" }}
              />
              <h2 className="text-neutral-400 text-xs font-medium uppercase tracking-widest">
                {label}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills[key].map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-neutral-200 px-3 py-1.5 rounded-full transition-colors hover:text-white"
                  style={{
                    backgroundColor: "var(--s3)",
                    border: "1px solid var(--s8)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
