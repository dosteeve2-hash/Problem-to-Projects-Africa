import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserProjects } from "@/lib/db/generated-projects"
import { SavedProjectsGrid } from "@/components/dashboard/SavedProjectsGrid"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import type { SavedProject } from "@/types"

export default async function DashboardPage() {
  const supabase = await createClient()

  if (!supabase) {
    redirect("/login?redirect=/dashboard")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/dashboard")
  }

  let projects: SavedProject[] = []
  try {
    const raw = await getUserProjects(user.id)
    projects = raw.map((p) => ({
      id: p.id as string,
      user_id: p.user_id as string,
      title: p.title as string,
      one_liner: p.one_liner as string,
      country: p.country as string,
      sector: p.sector as string,
      mode: p.mode as SavedProject["mode"],
      result: p.result as SavedProject["result"],
      created_at: p.created_at as string,
    }))
  } catch {
    projects = []
  }

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              Mes projets
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
              {projects.length} projet{projects.length !== 1 ? "s" : ""} généré{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link href="/start">
            <Button icon={<Plus className="h-4 w-4" />}>
              Nouveau projet
            </Button>
          </Link>
        </div>

        <SavedProjectsGrid projects={projects} />
      </div>
    </div>
  )
}
