import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  const { skills, skillCards } = await readPortfolio()
  return NextResponse.json({ skills, skillCards })
}

export async function PUT(request: NextRequest) {
  const { skills, skillCards } = await request.json()
  const data = await readPortfolio()
  data.skills = skills
  data.skillCards = skillCards
  await writePortfolio(data)
  return NextResponse.json({ ok: true })
}
