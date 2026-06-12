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
    color: "text-[#2dd4ff]",
    bg: "bg-[#2dd4ff]/10 border-[#2dd4ff]/20",
    dot: "bg-[#2dd4ff]",
  },
  high: {
    label: "Fort impact",
    color: "text-[#f0a832]",
    bg: "bg-[#f0a832]/10 border-[#f0a832]/20",
    dot: "bg-[#f0a832]",
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
