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
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ border: "1px solid var(--border)", background: "var(--bg3)" }}
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--bg2)" }}>
            <span className="text-xs font-bold" style={{ color: "var(--text3)", fontFamily: "var(--font-mono), monospace" }}>{i + 1}</span>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{alt.title}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>{alt.one_liner}</p>
          </div>
        </div>
      ))}

      <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
        <Link
          href="/start"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: "var(--text3)" }}
        >
          <RefreshCw className="h-4 w-4" />
          Générer un projet avec un autre contexte
        </Link>
      </div>
    </div>
  )
}
