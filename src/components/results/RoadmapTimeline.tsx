type RoadmapTimelineProps = {
  roadmap: {
    week_1: string[]
    week_2: string[]
    week_3: string[]
    week_4: string[]
  }
}

const weeks = [
  { key: "week_1" as const, label: "Semaine 1", color: "border-amber-500 bg-amber-500" },
  { key: "week_2" as const, label: "Semaine 2", color: "border-blue-500 bg-blue-500" },
  { key: "week_3" as const, label: "Semaine 3", color: "border-purple-500 bg-purple-500" },
  { key: "week_4" as const, label: "Semaine 4", color: "border-emerald-500 bg-emerald-500" },
]

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <div className="space-y-6">
      {weeks.map((week, idx) => (
        <div key={week.key} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 ${week.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}
            >
              {idx + 1}
            </div>
            {idx < weeks.length - 1 && (
              <div className="w-px flex-1 mt-2 bg-slate-800" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <h4 className="text-sm font-semibold text-white mb-2">{week.label}</h4>
            <ul className="space-y-1.5">
              {roadmap[week.key].map((action, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                  <span className="text-sm text-slate-400">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
