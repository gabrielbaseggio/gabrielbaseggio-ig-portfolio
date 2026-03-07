"use client"

import Link from "next/link"
import {
  Briefcase,
  Cpu,
  GraduationCap,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import { highlights } from "@/data/portfolio"
import { useLang } from "@/context/LangContext"

const iconMap: Record<string, LucideIcon> = {
  work: Briefcase,
  skills: Cpu,
  education: GraduationCap,
  about: UserRound,
}

export default function StoryHighlights() {
  const { tr } = useLang()

  const labelMap: Record<string, string> = {
    work: tr.highlights.work,
    skills: tr.highlights.skills,
    education: tr.highlights.education,
    about: tr.highlights.about,
  }

  return (
    <div className="px-4 py-4" style={{ borderTop: "1px solid var(--s7)" }}>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {highlights.map((item) => {
          const Icon = iconMap[item.id] ?? UserRound
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              {/* Instagram gradient ring */}
              <div
                className="rounded-full p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--s3)" }}
                >
                  <Icon size={20} strokeWidth={1.5} className="text-white" />
                </div>
              </div>
              <span className="text-white text-xs text-center max-w-[64px] truncate">
                {labelMap[item.id] ?? item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
