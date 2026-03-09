import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).highlights)
}

export async function PUT(request: NextRequest) {
  try {
  const highlights = await request.json()
  const data = await readPortfolio()
  data.highlights = highlights
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/highlights] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
