import { notFound } from "next/navigation"
import { getGeneratedProject } from "@/lib/db/generated-projects"
import { createClient } from "@/lib/supabase/server"
import { ProjectResultCard } from "@/components/results/ProjectResultCard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { GeneratedProjectResult } from "@/types"

type ResultsPageProps = {
  params: Promise<{ id: string }>
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = await params

  let project: { id: string; result: GeneratedProjectResult } | null = null

  try {
    project = await getGeneratedProject(id)
  } catch {
    notFound()
  }

  if (!project) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Générer un nouveau projet
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Projet généré</span>
          </div>
        </div>

        <ProjectResultCard
          result={project.result}
          projectId={project.id}
          isAuthenticated={!!user}
        />
      </div>
    </div>
  )
}
