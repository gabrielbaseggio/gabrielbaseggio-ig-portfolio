import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).posts)
}

export async function PUT(request: NextRequest) {
  const posts = await request.json()
  const data = await readPortfolio()
  data.posts = posts
  await writePortfolio(data)
  return NextResponse.json({ ok: true })
}
