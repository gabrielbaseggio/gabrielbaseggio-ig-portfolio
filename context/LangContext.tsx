"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { t, type Lang } from "@/lib/i18n"

export type Translations = typeof t.en | typeof t.es

interface LangContextValue {
  lang: Lang
  tr: Translations
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  return (
    <LangContext.Provider value={{ lang, tr: t[lang] as Translations, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside LangProvider")
  return ctx
}
