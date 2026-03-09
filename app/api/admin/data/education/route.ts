import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).education)
}

export async function PUT(request: NextRequest) {
  try {
  const education = await request.json()
  const data = await readPortfolio()
  data.education = education
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/education] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
