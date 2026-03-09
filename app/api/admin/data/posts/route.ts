import { NextRequest, NextResponse } from "next/server"
import { readPortfolio, writePortfolio } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json((await readPortfolio()).posts)
}

export async function PUT(request: NextRequest) {
  try {
  const posts = await request.json()
  const data = await readPortfolio()
  data.posts = posts
  await writePortfolio(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[admin/data/posts] PUT failed:`, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
