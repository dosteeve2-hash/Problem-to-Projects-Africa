"use client"

import { useEffect, useState } from "react"
import { loadResult } from "@/lib/session-store"
import { ProjectResultCard } from "./ProjectResultCard"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import type { GeneratedProjectResult } from "@/types"

type Props = {
  id: string
  isAuthenticated: boolean
}

export function ResultsClientFallback({ id, isAuthenticated }: Props) {
  const [result, setResult] = useState<GeneratedProjectResult | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const stored = loadResult(id)
    setResult(stored)
    setChecked(true)
  }, [id])

  if (!checked) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
          <AlertTriangle className="h-7 w-7 text-amber-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Résultat introuvable</h2>
        <p className="text-slate-400 text-sm max-w-sm mb-6">
          Ce résultat n'est plus disponible. Configure Supabase pour sauvegarder tes projets, ou génère-en un nouveau.
        </p>
        <Link
          href="/start"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition-colors"
        >
          Générer un nouveau projet
        </Link>
      </div>
    )
  }

  return (
    <ProjectResultCard
      result={result}
      projectId={id}
      isAuthenticated={isAuthenticated}
    />
  )
}
