import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).profile)
}

export async function PUT(request: NextRequest) {
  try {
  const profile = await request.json()
  const data = await readPortfolio()
  data.profile = profile
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/profile] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
