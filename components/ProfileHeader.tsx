"use client"

import { useState } from "react"
import { Mail, Github, MapPin } from "lucide-react"
import StatBadge from "@/components/ui/StatBadge"
import { usePortfolioData } from "@/context/DataContext"
import { useLang } from "@/context/LangContext"

export default function ProfileHeader() {
  const { profile } = usePortfolioData()
  const { tr } = useLang()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="px-4 py-5">
      {/* Avatar preview modal */}
      {modalOpen && profile.avatar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setModalOpen(false)}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded-full object-cover"
            style={{ width: 280, height: 280 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Avatar + Stats Row */}
      <div className="flex items-center gap-6 mb-4">
        {/* Gold gradient ring */}
        <div
          className="rounded-full p-[2px] shrink-0"
          style={{
            background:
                    "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
        >
          <div className="rounded-full p-[2px]" style={{ backgroundColor: "var(--s1)" }}>
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover cursor-pointer"
                onClick={() => setModalOpen(true)}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--s5) 0%, var(--s9) 100%)",
                }}
              >
                <span className="text-white text-2xl font-bold select-none tracking-tight">
                  AB
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 flex justify-around">
          <StatBadge value={profile.stats.projects} label={tr.profile.stats.projects} />
          <StatBadge value={profile.stats.technologies} label={tr.profile.stats.technologies} />
          <StatBadge value={profile.stats.yearsExp} label={tr.profile.stats.yearsExp} />
        </div>
      </div>

      {/* Name & Bio */}
      <div className="mb-4 space-y-0.5">
        <h1 className="text-white font-semibold text-sm">{profile.name}</h1>
        <p className="text-neutral-300 text-sm">{tr.profile.role}</p>
        <p className="text-neutral-400 text-sm">{tr.profile.studies}</p>
        <p className="text-neutral-500 text-sm flex items-center gap-1.5">
          <MapPin size={11} className="shrink-0" strokeWidth={1.75} />
          {profile.location}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <a
          href={`mailto:${profile.email}`}
          className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-white text-sm font-medium transition-colors bg-[#1f1f1f] hover:bg-[#232323]"
        >
          <Mail size={15} strokeWidth={1.75} />
          {tr.profile.message}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-white text-sm font-medium transition-colors bg-[#1f1f1f] hover:bg-[#232323]"
        >
          <Github size={15} strokeWidth={1.75} />
          {tr.profile.github}
        </a>
      </div>
    </div>
  )
}
