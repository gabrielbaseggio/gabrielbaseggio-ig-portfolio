"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

const sections = [
  { href: "/admin",              label: "Dashboard"    },
  { href: "/admin/profile",      label: "Profile"      },
  { href: "/admin/works",        label: "Works"        },
  { href: "/admin/skills",       label: "Skills"       },
  { href: "/admin/education",    label: "Education"    },
  { href: "/admin/posts",        label: "Posts"        },
  { href: "/admin/highlights",   label: "Highlights"   },
  { href: "/admin/translations", label: "Translations" },
]

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="py-2 flex-1">
      {sections.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="block px-4 py-2.5 text-sm transition-colors"
            style={{
              color: isActive ? "var(--white)" : "rgb(115,115,115)",
              backgroundColor: isActive ? "var(--s3)" : "transparent",
            }}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-3 text-xs text-neutral-600 hover:text-red-400 transition-colors"
    >
      Sign out
    </button>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname === "/admin/login") return <>{children}</>

  const activeLabel = sections.find((s) => s.href === pathname)?.label ?? "Admin"

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--s0)", color: "white" }}>

      {/* ── Mobile top bar ── */}
      <header
        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-40"
        style={{ backgroundColor: "var(--s1)", borderBottom: "1px solid var(--s6)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Admin</span>
          <span className="text-neutral-600">/</span>
          <span className="text-white text-sm font-medium">{activeLabel}</span>
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className="md:hidden fixed top-0 left-0 h-full z-40 flex flex-col w-56 transition-transform duration-200"
        style={{
          backgroundColor: "var(--s1)",
          borderRight: "1px solid var(--s6)",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--s6)" }}>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Admin</span>
        </div>
        <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} />
        <div style={{ borderTop: "1px solid var(--s6)" }}>
          <LogoutButton />
        </div>
      </aside>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex min-h-screen">
        <aside
          className="w-44 shrink-0 flex flex-col sticky top-0 h-screen"
          style={{ borderRight: "1px solid var(--s6)", backgroundColor: "var(--s1)" }}
        >
          <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--s6)" }}>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Admin</span>
          </div>
          <NavLinks pathname={pathname} />
          <div style={{ borderTop: "1px solid var(--s6)" }}>
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* ── Mobile main ── */}
      <main className="md:hidden p-4 pb-8">{children}</main>
    </div>
  )
}
