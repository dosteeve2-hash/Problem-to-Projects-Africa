import { createClient } from "@/lib/supabase/server"
import { getGeneratedProject } from "@/lib/db/generated-projects"
import { ProjectResultCard } from "@/components/results/ProjectResultCard"
import { ResultsClientFallback } from "@/components/results/ResultsClientFallback"
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
    // DB not available — will fall back to sessionStorage on client
  }

  const supabase = await createClient()
  let user = null
  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user
  }

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-sm transition-colors mb-6"
            style={{ color: "var(--text3)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Générer un nouveau projet
          </Link>

          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(34,217,138,0.1)", border: "1px solid rgba(34,217,138,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--green)", fontFamily: "var(--font-mono), monospace" }}>Projet généré</span>
          </div>
        </div>

        {project ? (
          <ProjectResultCard
            result={project.result}
            projectId={project.id}
            isAuthenticated={!!user}
          />
        ) : (
          // DB not configured — load from sessionStorage on the client
          <ResultsClientFallback id={id} isAuthenticated={!!user} />
        )}
      </div>
    </div>
  )
}
