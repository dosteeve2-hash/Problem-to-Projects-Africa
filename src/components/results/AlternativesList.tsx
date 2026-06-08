import Link from "next/link"
import { RefreshCw } from "lucide-react"

type Alternative = {
  title: string
  one_liner: string
}

type AlternativesListProps = {
  alternatives: Alternative[]
}

export function AlternativesList({ alternatives }: AlternativesListProps) {
  return (
    <div className="space-y-3">
      {alternatives.map((alt, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex items-start gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-bold text-slate-400">{i + 1}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{alt.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{alt.one_liner}</p>
          </div>
        </div>
      ))}

      <div className="mt-4 pt-4 border-t border-slate-800">
        <Link
          href="/start"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Générer un projet avec un autre contexte
        </Link>
      </div>
    </div>
  )
}
