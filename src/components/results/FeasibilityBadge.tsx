import type { FeasibilityLevel } from "@/types"

type FeasibilityBadgeProps = {
  level: FeasibilityLevel
  explanation: string
  compact?: boolean
}

const levelConfig = {
  low: {
    label: "Faisabilité faible",
    color: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10 border-[#ef4444]/20",
    dot: "bg-[#ef4444]",
  },
  medium: {
    label: "Faisabilité moyenne",
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10 border-[#D4AF37]/20",
    dot: "bg-[#D4AF37]",
  },
  high: {
    label: "Faisabilité élevée",
    color: "text-[#22d98a]",
    bg: "bg-[#22d98a]/10 border-[#22d98a]/20",
    dot: "bg-[#22d98a]",
  },
}

export function FeasibilityBadge({ level, explanation, compact = false }: FeasibilityBadgeProps) {
  const config = levelConfig[level]

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </span>
    )
  }

  return (
    <div className={`rounded-xl border p-4 ${config.bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
      </div>
      <p className="text-sm text-[#9ba8c4]">{explanation}</p>
    </div>
  )
}
