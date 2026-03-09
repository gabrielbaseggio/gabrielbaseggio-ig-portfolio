"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { PortfolioData } from "@/lib/types"

const DataContext = createContext<PortfolioData | null>(null)

export function DataProvider({
  children,
  data,
}: {
  children: ReactNode
  data: PortfolioData
}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export function usePortfolioData(): PortfolioData {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("usePortfolioData must be used inside DataProvider")
  return ctx
}
