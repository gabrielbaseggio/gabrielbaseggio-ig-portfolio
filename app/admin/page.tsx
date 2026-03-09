import Link from "next/link"

const sections = [
  { href: "/admin/profile",      label: "Profile",      desc: "Name, bio, stats, email, GitHub"          },
  { href: "/admin/works",        label: "Works",        desc: "Job history, tech stack, highlights"       },
  { href: "/admin/skills",       label: "Skills",       desc: "Skill lists and grid cards with icons"     },
  { href: "/admin/education",    label: "Education",    desc: "Degree, GPA, honors"                       },
  { href: "/admin/posts",        label: "Posts",        desc: "Home page grid cards"                      },
  { href: "/admin/highlights",   label: "Highlights",   desc: "Story circles (icon, label, link)"         },
  { href: "/admin/translations", label: "Translations", desc: "All text in English and Spanish"           },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-white font-semibold text-base mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl p-4 transition-colors group"
            style={{
              backgroundColor: "var(--s3)",
              border: "1px solid var(--s6)",
            }}
          >
            <p className="text-white text-sm font-medium group-hover:text-[var(--gold)] transition-colors mb-1">
              {label}
            </p>
            <p className="text-neutral-500 text-xs leading-snug">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
