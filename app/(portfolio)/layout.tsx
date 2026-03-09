export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--s0)" }}>
      <div
        className="max-w-[480px] mx-auto relative min-h-screen"
        style={{ backgroundColor: "var(--s1)" }}
      >
        {children}
      </div>
    </div>
  )
}
