import { NextRequest, NextResponse } from "next/server"

type SiModule = Record<string, { path: string; hex: string } | undefined>

function tryKey(si: SiModule, key: string): { found: true; path: string; color: string } | null {
  const icon = si[key]
  if (icon) return { found: true, path: icon.path, color: `#${icon.hex}` }
  return null
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")?.trim()
  if (!name || name.length < 2) return NextResponse.json({ found: false })

  const si = (await import("simple-icons")) as unknown as SiModule

  // Normalize: strip non-alphanumeric, lowercase
  const bare = name.replace(/[^a-z0-9]/gi, "").toLowerCase()
  const pascal = "si" + bare.charAt(0).toUpperCase() + bare.slice(1)

  // Try common transformations first
  const candidates = [
    pascal,
    "si" + bare,
    // e.g. "Node.js" → "siNodedotjs", "C++" → "siCplusplus"
    "si" + name.toLowerCase().replace(/\+/g, "plus").replace(/\./g, "dot").replace(/[^a-z0-9]/g, ""),
  ]

  for (const key of candidates) {
    const hit = tryKey(si, key)
    if (hit) return NextResponse.json(hit)
  }

  // Fall back to Claude Haiku
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default
    const client = new Anthropic()
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 32,
      messages: [
        {
          role: "user",
          content: `What is the exact camelCase export name from the 'simple-icons' npm package (v16) for the technology "${name}"? Reply with ONLY the key (e.g. "siKotlin") or "none" if unavailable.`,
        },
      ],
    })

    const suggested = (msg.content[0] as { text: string }).text.trim()
    if (suggested !== "none") {
      const hit = tryKey(si, suggested)
      if (hit) return NextResponse.json(hit)
    }
  } catch {
    // API unavailable — return not found
  }

  return NextResponse.json({ found: false })
}
