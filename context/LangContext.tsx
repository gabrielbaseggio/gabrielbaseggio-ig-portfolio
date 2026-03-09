"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Lang, TranslationShape, TranslationsData } from "@/lib/types"

export type Translations = TranslationShape

interface LangContextValue {
  lang: Lang
  tr: Translations
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({
  children,
  translations,
}: {
  children: ReactNode
  translations: TranslationsData
}) {
  const [lang, setLang] = useState<Lang>("en")

  return (
    <LangContext.Provider value={{ lang, tr: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LangProvider")
  return ctx
}
