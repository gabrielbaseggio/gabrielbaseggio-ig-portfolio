import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"
import type { PortfolioData, TranslationsData } from "@/lib/types"

const PORTFOLIO_PATH = path.join(process.cwd(), "data/json/portfolio.json")
const TRANSLATIONS_PATH = path.join(process.cwd(), "data/json/translations.json")

// Use KV when the Vercel KV env vars are present (production),
// fall back to local JSON files in development.
const useKV = Boolean(process.env.KV_REST_API_URL)

function readFilePortfolio(): PortfolioData {
  return JSON.parse(fs.readFileSync(PORTFOLIO_PATH, "utf-8")) as PortfolioData
}

function readFileTranslations(): TranslationsData {
  return JSON.parse(fs.readFileSync(TRANSLATIONS_PATH, "utf-8")) as TranslationsData
}

function revalidateAll() {
  for (const p of ["/", "/work", "/skills", "/education", "/about"]) {
    revalidatePath(p)
  }
}

export async function readPortfolio(): Promise<PortfolioData> {
  if (useKV) {
    const { kv } = await import("@vercel/kv")
    const data = await kv.get<PortfolioData>("portfolio")
    // First request: KV is empty — seed from the bundled JSON
    return data ?? readFilePortfolio()
  }
  return readFilePortfolio()
}

export async function writePortfolio(data: PortfolioData): Promise<void> {
  if (useKV) {
    const { kv } = await import("@vercel/kv")
    await kv.set("portfolio", data)
  } else {
    fs.writeFileSync(PORTFOLIO_PATH, JSON.stringify(data, null, 2), "utf-8")
  }
  revalidateAll()
}

export async function readTranslations(): Promise<TranslationsData> {
  if (useKV) {
    const { kv } = await import("@vercel/kv")
    const data = await kv.get<TranslationsData>("translations")
    return data ?? readFileTranslations()
  }
  return readFileTranslations()
}

export async function writeTranslations(data: TranslationsData): Promise<void> {
  if (useKV) {
    const { kv } = await import("@vercel/kv")
    await kv.set("translations", data)
  } else {
    fs.writeFileSync(TRANSLATIONS_PATH, JSON.stringify(data, null, 2), "utf-8")
  }
  revalidateAll()
}
