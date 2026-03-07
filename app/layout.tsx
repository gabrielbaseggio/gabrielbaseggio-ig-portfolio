import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNav from "@/components/BottomNav"
import { LangProvider } from "@/context/LangContext"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "var(--s0)" }}>
        <LangProvider>
          <div className="min-h-screen" style={{ backgroundColor: "var(--s0)" }}>
            <div
              className="max-w-[480px] mx-auto relative min-h-screen"
              style={{ backgroundColor: "var(--s1)" }}
            >
              {children}
            </div>
          </div>
          <BottomNav />
        </LangProvider>
      </body>
    </html>
  )
}
