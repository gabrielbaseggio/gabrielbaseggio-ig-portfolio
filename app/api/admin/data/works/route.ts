import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).works)
}

export async function PUT(request: NextRequest) {
  try {
  const works = await request.json()
  const data = await readPortfolio()
  data.works = works
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/works] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
