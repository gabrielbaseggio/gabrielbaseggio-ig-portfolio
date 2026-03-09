"use client"

import Link from "next/link"
import { ChevronLeft, Mail, Hammer, Lightbulb, BookOpen, Users, type LucideIcon } from "lucide-react"
import { usePortfolioData } from "@/context/DataContext"
import { useLang } from "@/context/LangContext"

const traitIcons: LucideIcon[] = [Hammer, Lightbulb, BookOpen, Users]

export default function AboutPage() {
  const { profile } = usePortfolioData()
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
        <h1 className="text-white font-semibold text-sm tracking-tight">{tr.about.heading}</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Intro */}
        <div className="space-y-3">
          {tr.about.intro.map((paragraph, i) => (
            <p key={i} className="text-neutral-300 text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Traits */}
        <div>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-3">
            {tr.about.workStyleLabel}
          </p>
          <div className="space-y-2">
            {tr.about.traits.map(({ label, desc }, i) => {
              const Icon = traitIcons[i] ?? Hammer
              return (
                <div
                  key={label}
                  className="rounded-xl px-4 py-3 flex items-start gap-3"
                  style={{
                    backgroundColor: "var(--s3)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon
                    size={14}
                    className="mt-0.5 shrink-0"
                    strokeWidth={1.75}
                    style={{ color: "var(--white)" }}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-5 text-center space-y-3"
          style={{
            backgroundColor: "var(--s3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-white font-medium text-sm">{tr.about.ctaHeading}</p>
          <p className="text-neutral-500 text-xs">{tr.about.ctaSubtext}</p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: "var(--white)", border: "1px solid var(--s8)" }}
          >
            <Mail size={14} strokeWidth={2} />
            {tr.about.ctaButton}
          </a>
        </div>
      </div>
    </div>
  )
}
