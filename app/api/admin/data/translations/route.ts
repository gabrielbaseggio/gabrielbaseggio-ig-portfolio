import { NextRequest, NextResponse } from "next/server"
import { readTranslations, writeTranslations } from "@/lib/adminData"

export async function GET() {
  return NextResponse.json(await readTranslations())
}

export async function PUT(request: NextRequest) {
  const translations = await request.json()
  await writeTranslations(translations)
  return NextResponse.json({ ok: true })
}
