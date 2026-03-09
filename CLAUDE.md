# Portfolio — Project Reference

## Tech stack
- **Next.js 15** (App Router), **React 19**, **TypeScript 5**
- **Tailwind CSS v4** (PostCSS), **Framer Motion**, **Lucide React**, **Simple Icons**
- No database — data lives in JSON files

## Project structure

```
app/
  layout.tsx          # Root layout: LangProvider + DataProvider + BottomNav
  page.tsx            # Home (use client) — LangDropdown + ProfileHeader + StoryHighlights + PostGrid
  work/page.tsx       # Work history (use client)
  skills/page.tsx     # Skills page (use client)
  education/page.tsx  # Education page (use client)
  about/page.tsx      # About page (use client)
  admin/              # Admin panel (password protected)
    layout.tsx        # Sidebar nav (use client)
    login/page.tsx    # Login form
    page.tsx          # Dashboard
    profile/          # Profile editor
    works/            # Work items editor
    skills/           # Skills + skill cards editor
    education/        # Education editor
    posts/            # Post grid cards editor
    highlights/       # Story highlights editor
    translations/     # EN/ES translations editor
  api/admin/
    login/route.ts    # POST — issues admin_session cookie
    logout/route.ts   # POST — clears cookie
    data/*/route.ts   # GET/PUT for each data section

components/
  BottomNav.tsx       # Fixed bottom nav — hidden on /admin routes
  ProfileHeader.tsx   # Avatar, stats, name, CTA buttons
  StoryHighlights.tsx # Instagram-style story circles
  PostGrid.tsx        # Main grid (work/skills/education cards)
  LikeEasterEgg.tsx   # Easter egg at 55% scroll
  ui/HeartButton.tsx
  ui/StatBadge.tsx

context/
  LangContext.tsx     # Language switcher (en/es) — receives translations as prop from layout
  DataContext.tsx     # Portfolio data context — receives data as prop from layout

data/
  portfolio.ts        # Type re-exports only (no hardcoded data)
  json/
    portfolio.json    # All portfolio data (editable via admin)
    translations.json # EN + ES translations (editable via admin)

lib/
  types.ts            # All shared TypeScript interfaces
  adminData.ts        # Server-only: readPortfolio/writePortfolio/readTranslations/writeTranslations
  i18n.ts             # Type re-exports only
  techIcons.ts        # Map of tech name → SVG icon (simple-icons) or Lucide icon
```

## Data flow

1. `app/layout.tsx` (Server Component) reads both JSON files via `lib/adminData.ts`
2. Passes `portfolioData` to `<DataProvider>` and `translations` to `<LangProvider>`
3. Client components get data via `usePortfolioData()` and translations via `useLang()`
4. Admin writes to JSON via API routes → calls `revalidatePath` → layout re-reads on next request

## Key patterns

- **Data**: `usePortfolioData()` from `context/DataContext` — never import directly from `data/portfolio.ts`
- **Translations**: `useLang()` from `context/LangContext` — provides `{ lang, tr, setLang }`
- **Icons**: Story highlights use `LUCIDE_ICONS` map in `StoryHighlights.tsx` — icon stored as string name in JSON
- **Skill icons**: `techIconMap[name]` in `lib/techIcons.ts` — keyed by tech name string
- **Admin auth**: `ADMIN_PASSWORD` env var, `admin_session` httpOnly cookie, protected by `middleware.ts`
- **Dark theme**: CSS variables `--s0` (darkest) through `--s9` (lightest), `--gold` (#FFDC80), `--white`
- **Layout max-width**: 480px centered container

## Admin setup

Create `.env.local` (never commit):
```
ADMIN_PASSWORD=your_password_here
# Production only (Vercel KV):
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

### Local dev
JSON files are used directly. No KV setup needed.

### Production (Vercel)
Vercel's filesystem is read-only, so writes use **Vercel KV** (Redis).

1. Vercel Dashboard → project → **Storage** → **Create KV Store** → link to project
2. Run `vercel env pull .env.local` to get the KV env vars locally
3. Deploy — first read falls back to the bundled JSON; first admin save persists to KV

`lib/adminData.ts` auto-detects KV via the presence of `KV_REST_API_URL`.

## Adding content

- New skill card: Admin → Skills → Grid cards → Add (pick icon from techIconMap)
- New story: Admin → Highlights → Add (pick Lucide icon)
- New work item: Admin → Works + Admin → Translations (both EN and ES)
- New post card: Admin → Posts

## CSS variables (from globals.css)

| Var | Usage |
|-----|-------|
| `--s0` | Page background (darkest) |
| `--s1` | Content container |
| `--s3` | Cards |
| `--s4` | Input backgrounds |
| `--s6` | Borders |
| `--s8` | Subtle borders |
| `--gold` | `#FFDC80` — accent, buttons |
| `--white` | Near-white for text |
