import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).profile)
}

export async function PUT(request: NextRequest) {
  const profile = await request.json()
  const data = await readPortfolio()
  data.profile = profile
  await writePortfolio(data)
  return NextResponse.json({ ok: true })
}
