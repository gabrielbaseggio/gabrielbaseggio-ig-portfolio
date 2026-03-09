import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNav from "@/components/BottomNav"
import { LangProvider } from "@/context/LangContext"
import { DataProvider } from "@/context/DataContext"
import { readPortfolio } from "@/lib/adminData"
import { readTranslations } from "@/lib/adminData"

export const dynamic = "force-dynamic"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Axel Baseggio — Full Stack Developer",
  description:
    "Full Stack Developer · CS @ UNRC · Building scalable products that matter.",
  openGraph: {
    title: "Axel Baseggio — Full Stack Developer",
    description: "Full Stack Developer · CS @ UNRC · Building scalable products that matter.",
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const portfolioData = await readPortfolio()
  const translations = await readTranslations()

  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "var(--s0)" }}>
        <LangProvider translations={translations}>
          <DataProvider data={portfolioData}>
            {children}
            <BottomNav />
          </DataProvider>
        </LangProvider>
      </body>
    </html>
  )
}
