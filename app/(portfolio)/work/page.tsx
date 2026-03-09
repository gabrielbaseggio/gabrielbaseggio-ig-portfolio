"use client"

import Link from "next/link"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { usePortfolioData } from "@/context/DataContext"
import { useLang } from "@/context/LangContext"

export default function WorkPage() {
  const { works } = usePortfolioData()
  const { tr } = useLang()
  const items = tr.work.items.map((item, i) => ({ ...item, tech: works[i]?.tech ?? [], github: works[i]?.github }))

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
        <h1 className="text-white font-semibold text-sm tracking-tight">{tr.work.heading}</h1>
      </div>

      {/* Cards */}
      <div className="px-4 py-6 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--s3)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div style={{ height: "1px", backgroundColor: "var(--s8)" }} />

            <div className="p-5">
              {/* Company, role & period */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="text-white font-semibold text-sm">{item.company}</h2>
                <span
                  className="text-neutral-500 text-xs shrink-0 px-2 py-1 rounded-md"
                  style={{ backgroundColor: "var(--s6)" }}
                >
                  {item.period}
                </span>
              </div>
              <p className="text-neutral-500 text-xs mb-3">{item.role}</p>

              {/* Description */}
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Separator */}
              <div className="mb-4" style={{ height: "1px", backgroundColor: "var(--s6)" }} />

              {/* Bullets */}
              <ul className="space-y-1.5 mb-4">
                {item.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex items-start gap-2.5 text-neutral-300 text-sm">
                    <span className="text-neutral-600 mt-[5px] shrink-0 text-[8px]">●</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-neutral-300 px-2.5 py-1 rounded-full text-center"
                    style={{
                      backgroundColor: "var(--s4)",
                      border: "1px solid var(--s8)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub link if available */}
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={13} strokeWidth={1.75} />
                  {tr.work.viewOnGitHub}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
