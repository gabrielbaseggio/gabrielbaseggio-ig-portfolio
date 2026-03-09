import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).highlights)
}

export async function PUT(request: NextRequest) {
  const highlights = await request.json()
  const data = await readPortfolio()
  data.highlights = highlights
  await writePortfolio(data)
  return NextResponse.json({ ok: true })
}
