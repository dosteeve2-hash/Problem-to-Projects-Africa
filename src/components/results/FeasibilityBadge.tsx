import type { FeasibilityLevel } from "@/types"

type FeasibilityBadgeProps = {
  level: FeasibilityLevel
  explanation: string
  compact?: boolean
}

const levelConfig = {
  low: {
    label: "Faisabilité faible",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
  },
  medium: {
    label: "Faisabilité moyenne",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
  },
  high: {
    label: "Faisabilité élevée",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
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
      <p className="text-sm text-slate-400">{explanation}</p>
    </div>
  )
}
