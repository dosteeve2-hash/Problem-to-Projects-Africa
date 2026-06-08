import Link from "next/link"
import { ArrowRight, Calendar, Globe, Layers } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { FeasibilityBadge } from "@/components/results/FeasibilityBadge"
import { ImpactBadge } from "@/components/results/ImpactBadge"
import { getCountryByCode } from "@/lib/context/countries"
import type { SavedProject } from "@/types"

type SavedProjectsGridProps = {
  projects: SavedProject[]
}

const modeLabels = {
  skills: "Skills",
  idea: "Idée",
  problem: "Problème",
}

export function SavedProjectsGrid({ projects }: SavedProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 py-20 px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
          <Layers className="h-6 w-6 text-amber-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Aucun projet sauvegardé</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-sm">
          Génère ton premier projet et sauvegarde-le pour le retrouver ici.
        </p>
        <Link
          href="/start"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors"
        >
          Créer mon premier projet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => {
        const country = getCountryByCode(project.country)
        return (
          <Link key={project.id} href={`/results/${project.id}`} className="group">
            <Card hoverable className="h-full flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xl">{country?.flag ?? "🌍"}</span>
                <Badge variant="slate">{modeLabels[project.mode]}</Badge>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 flex-1 mb-4">
                {project.one_liner}
              </p>

              <div className="space-y-2 mb-4">
                <FeasibilityBadge
                  level={project.result.feasibility.level}
                  explanation=""
                  compact
                />
                <ImpactBadge
                  level={project.result.impact.level}
                  explanation=""
                  compact
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {country?.name ?? project.country}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
