import type { ImpactLevel } from "@/types"

type ImpactBadgeProps = {
  level: ImpactLevel
  explanation: string
  compact?: boolean
}

const levelConfig = {
  low: {
    label: "Impact limité",
    color: "text-[#9ba8c4]",
    bg: "bg-[#1f3054]/30 border-[#1f3054]",
    dot: "bg-[#9ba8c4]",
  },
  medium: {
    label: "Impact modéré",
    color: "text-[#00BCD4]",
    bg: "bg-[#00BCD4]/10 border-[#00BCD4]/20",
    dot: "bg-[#00BCD4]",
  },
  high: {
    label: "Fort impact",
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10 border-[#D4AF37]/20",
    dot: "bg-[#D4AF37]",
  },
}

export function ImpactBadge({ level, explanation, compact = false }: ImpactBadgeProps) {
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
