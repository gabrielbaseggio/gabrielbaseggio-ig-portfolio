"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  Cpu,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react"
import { posts, skillCards, type Post, type PostType, type SkillCategory } from "@/data/portfolio"
import { techIconMap } from "@/lib/techIcons"
import { useLang } from "@/context/LangContext"

const COLLAPSE_THRESHOLD = 3

interface Category {
  type: PostType
  labelKey: "work" | "skills" | "education"
  icon: LucideIcon
  href: string
}

const categories: Category[] = [
  { type: "work",      labelKey: "work",      icon: Briefcase,      href: "/work"      },
  { type: "skills",    labelKey: "skills",    icon: Cpu,            href: "/skills"    },
  { type: "education", labelKey: "education", icon: GraduationCap,  href: "/education" },
]

const skillSubCategories: { key: SkillCategory; labelKey: keyof typeof import("@/lib/i18n").t.en.postGrid.skillSections }[] = [
  { key: "languages", labelKey: "languages" },
  { key: "frontend",  labelKey: "frontend"  },
  { key: "backend",   labelKey: "backend"   },
  { key: "tools",     labelKey: "tools"     },
]

// ── Generic post card ────────────────────────────────────────────────────────
function PostCard({
  post,
  categoryIcon: Icon,
  subtitle,
  detail,
}: {
  post: Post
  categoryIcon: LucideIcon
  subtitle: string
  detail?: string
}) {
  return (
    <Link
      href={post.href}
      className="aspect-square relative flex items-center justify-center p-4 group"
      style={{ backgroundColor: "var(--s3)" }}
    >
      <Icon
        size={11}
        strokeWidth={1.75}
        className="absolute top-[10px] left-[10px] opacity-30 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--white)" }}
      />
      <div className="flex flex-col items-center text-center gap-[3px]">
        <span className="text-white font-semibold text-lg leading-none tracking-tight">
          {post.title}
        </span>
        <span className="text-neutral-400 text-[10px] font-medium leading-tight mt-1">
          {subtitle}
        </span>
        {detail && (
          <span className="text-neutral-600 text-[9px] leading-tight">{detail}</span>
        )}
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ outline: "1px solid rgba(255,220,128,0.25)", outlineOffset: "-1px" }}
      />
    </Link>
  )
}

// ── Skill card with brand icon ───────────────────────────────────────────────
function SkillCard({ name, displayName }: { name: string; displayName?: string }) {
  const icon = techIconMap[name]
  const label = displayName ?? name

  return (
    <div
      className="aspect-square relative flex items-center justify-center p-3 group cursor-default"
      style={{ backgroundColor: "var(--s3)" }}
    >
      {icon && (
        <div className="absolute top-[9px] left-[9px] opacity-50 group-hover:opacity-100 transition-opacity">
          {icon.type === "si" ? (
            <svg
              viewBox="0 0 24 24"
              width={11}
              height={11}
              fill={icon.color}
              aria-hidden="true"
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <icon.icon size={11} strokeWidth={1.75} style={{ color: icon.color }} />
          )}
        </div>
      )}
      <span className="text-neutral-200 text-[11px] font-medium text-center leading-tight tracking-tight">
        {label}
      </span>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ outline: "1px solid rgba(255,220,128,0.2)", outlineOffset: "-1px" }}
      />
    </div>
  )
}

// ── Skills section ────────────────────────────────────────────────────────────
function SkillsContent() {
  const { tr } = useLang()
  const [activeKey, setActiveKey] = useState<SkillCategory | null>("languages")

  return (
    <div>
      {skillSubCategories.map(({ key, labelKey }) => {
        const cards = skillCards.filter((s) => s.category === key)
        const isOpen = activeKey === key

        return (
          <div key={key} style={{ borderTop: "1px solid var(--s6)" }}>
            <button
              onClick={() => setActiveKey((prev) => (prev === key ? null : key))}
              className="w-full px-4 py-2.5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-[2px] h-3 rounded-full shrink-0 transition-opacity"
                  style={{
                    backgroundColor: "var(--white)",
                    opacity: isOpen ? 1 : 0.3,
                  }}
                />
                <span
                  className={`text-[10px] font-medium uppercase tracking-widest transition-colors ${
                    isOpen ? "text-white" : "text-neutral-500 group-hover:text-white"
                  }`}
                >
                  {tr.postGrid.skillSections[labelKey]}
                </span>
              </div>
              {isOpen ? (
                <ChevronUp size={11} strokeWidth={2} className="text-white" />
              ) : (
                <ChevronDown size={11} strokeWidth={2} className="text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              )}
            </button>

            {isOpen && (
              <div
                className="grid grid-cols-3"
                style={{ gap: "1px", backgroundColor: "var(--s7)" }}
              >
                {cards.map((skill) => (
                  <SkillCard key={skill.id} name={skill.name} displayName={skill.displayName} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Generic category section ──────────────────────────────────────────────────
function CategorySection({ type, labelKey, icon: Icon, href }: Category) {
  const { tr } = useLang()
  const categoryPosts = posts.filter((p) => p.type === type)
  const isSkills = type === "skills"

  const hasMore = !isSkills && categoryPosts.length > COLLAPSE_THRESHOLD
  const [expanded, setExpanded] = useState(false)

  const visiblePosts =
    hasMore && !expanded ? categoryPosts.slice(0, COLLAPSE_THRESHOLD) : categoryPosts
  const hiddenCount = categoryPosts.length - COLLAPSE_THRESHOLD

  return (
    <div style={{ borderTop: "1px solid var(--s7)" }}>
      {/* Section header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={href} className="flex items-center gap-2 group">
          <Icon
            size={14}
            strokeWidth={1.75}
            style={{ color: "var(--white)" }}
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-neutral-400 text-xs font-medium uppercase tracking-widest group-hover:text-white transition-colors">
            {tr.postGrid[labelKey]}
          </span>
        </Link>

        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-neutral-600 hover:text-neutral-300 transition-colors py-1 px-2 -mr-1 rounded-md text-xs"
            aria-label={expanded ? tr.postGrid.less : `+${hiddenCount}`}
          >
            {expanded ? (
              <>
                <span>{tr.postGrid.less}</span>
                <ChevronUp size={12} strokeWidth={2} />
              </>
            ) : (
              <>
                <span>{tr.postGrid.showMore(hiddenCount)}</span>
                <ChevronDown size={12} strokeWidth={2} />
              </>
            )}
          </button>
        )}
      </div>

      {isSkills ? (
        <SkillsContent />
      ) : (
        <div
          className="grid grid-cols-3"
          style={{ gap: "1px", backgroundColor: "var(--s7)" }}
        >
          {visiblePosts.map((post) => {
            const postTr = tr.posts[post.id as keyof typeof tr.posts] as { title?: string; subtitle: string; detail?: string } | undefined
            return (
              <PostCard
                key={post.id}
                post={{ ...post, title: postTr?.title ?? post.title }}
                categoryIcon={Icon}
                subtitle={postTr?.subtitle ?? post.subtitle}
                detail={"detail" in (postTr ?? {}) ? (postTr as { subtitle: string; detail?: string }).detail : post.detail}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function PostGrid() {
  return (
    <div>
      {categories.map((cat) => (
        <CategorySection key={cat.type} {...cat} />
      ))}
    </div>
  )
}
