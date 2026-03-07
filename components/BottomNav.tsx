"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Layers, BookOpen, User } from "lucide-react"
import { useLang } from "@/context/LangContext"

export default function BottomNav() {
  const pathname = usePathname()
  const { tr } = useLang()

  const navItems = [
    { icon: Home,     href: "/",          label: "Home"                  },
    { icon: Search,   href: "/work",       label: tr.nav.work             },
    { icon: Layers,   href: "/skills",     label: tr.nav.skills           },
    { icon: BookOpen, href: "/education",  label: tr.nav.education        },
    { icon: User,     href: "/about",      label: tr.nav.about            },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: "rgba(10,10,10,0.96)", borderTop: "1px solid var(--s6)" }}
    >
      <div className="max-w-[480px] mx-auto flex items-center justify-around py-3 px-2">
        {navItems.map(({ icon: Icon, href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-[48px] group"
              aria-label={label}
            >
              <Icon
                size={23}
                strokeWidth={isActive ? 2.25 : 1.5}
                style={isActive ? { color: "var(--white)" } : undefined}
                className={
                  isActive
                    ? ""
                    : "text-neutral-600 group-hover:text-neutral-400 transition-colors"
                }
              />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
