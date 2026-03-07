"use client"

import Link from "next/link"
import { ChevronLeft, Award } from "lucide-react"
import { education } from "@/data/portfolio"
import { useLang } from "@/context/LangContext"

export default function EducationPage() {
  const { tr } = useLang()

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
        <h1 className="text-white font-semibold text-sm tracking-tight">{tr.education.heading}</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Main education card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--s3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ height: "1px", backgroundColor: "var(--s8)" }} />
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="text-white font-semibold text-sm">
                {education.institution}
              </h2>
              <span
                className="text-neutral-500 text-xs shrink-0 px-2 py-1 rounded-md"
                style={{ backgroundColor: "var(--s6)" }}
              >
                {education.period}
              </span>
            </div>
            <p className="text-neutral-500 text-xs mb-4">{tr.education.degree}</p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {tr.education.description}
            </p>
          </div>
        </div>

        {/* GPA Stat */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            backgroundColor: "var(--s3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(45deg, rgb(240, 148, 51), rgb(230, 104, 60), rgb(220, 39, 67), rgb(204, 35, 102), rgb(188, 24, 136))",
            }}
          >
            <span className="text-black text-xl font-bold tracking-tight">A</span>
          </div>
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">{tr.education.gpaLabel}</p>
            <p
              className="font-bold text-2xl tracking-tight"
              style={{ color: "var(--white)" }}
            >
              {education.gpa}
            </p>
            <p className="text-neutral-500 text-xs mt-0.5">{tr.education.gpaRank}</p>
          </div>
        </div>

        {/* Honors */}
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-3 px-1">
            {tr.education.honorsLabel}
          </p>
          <div className="space-y-2">
            {tr.education.honors.map((honor) => (
              <div
                key={honor}
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{
                  backgroundColor: "var(--s3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Award
                  size={14}
                  className="shrink-0"
                  strokeWidth={1.75}
                  style={{ color: "var(--white)" }}
                />
                <span className="text-neutral-300 text-sm">{honor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
