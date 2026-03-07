interface StatBadgeProps {
  value: string | number
  label: string
}

export default function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="font-semibold text-lg leading-tight"
        style={{ color: "var(--white)" }}
      >
        {value}
      </span>
      <span className="text-neutral-500 text-xs">{label}</span>
    </div>
  )
}
