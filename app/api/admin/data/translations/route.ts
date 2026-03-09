import { NextRequest, NextResponse } from "next/server"
import { readTranslations, writeTranslations } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json(await readTranslations())
}

export async function PUT(request: NextRequest) {
  try {
    const translations = await request.json()
    await writeTranslations(translations)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[admin/data/translations] PUT failed:", err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
