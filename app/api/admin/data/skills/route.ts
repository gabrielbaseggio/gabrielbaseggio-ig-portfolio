import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  const { skills, skillCards } = await readPortfolio()
  return NextResponse.json({ skills, skillCards })
}

export async function PUT(request: NextRequest) {
  try {
  const { skills, skillCards } = await request.json()
  const data = await readPortfolio()
  data.skills = skills
  data.skillCards = skillCards
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/skills] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
