import type { ImpactLevel } from "@/types"

type ImpactBadgeProps = {
  level: ImpactLevel
  explanation: string
  compact?: boolean
}

const levelConfig = {
  low: {
    label: "Impact limité",
    color: "text-slate-400",
    bg: "bg-slate-700/30 border-slate-700",
    dot: "bg-slate-400",
  },
  medium: {
    label: "Impact modéré",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
  },
  high: {
    label: "Fort impact",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    dot: "bg-purple-400",
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
      <p className="text-sm text-slate-400">{explanation}</p>
    </div>
  )
}
