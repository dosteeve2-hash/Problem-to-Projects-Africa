"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react"
import type { GeneratedProjectResult } from "@/types"
import { FeasibilityBadge } from "./FeasibilityBadge"
import { ImpactBadge } from "./ImpactBadge"
import { RoadmapTimeline } from "./RoadmapTimeline"
import { AlternativesList } from "./AlternativesList"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

type ProjectResultCardProps = {
  result: GeneratedProjectResult
  projectId: string
  isAuthenticated: boolean
}

export function ProjectResultCard({
  result,
  projectId,
  isAuthenticated,
}: ProjectResultCardProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleSave() {
    if (!isAuthenticated) {
      window.location.href = `/login?redirect=/results/${projectId}`
      return
    }

    setSaving(true)
    setSaveError(null)
    try {
      const res = await fetch("/api/save-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId }),
      })
      if (!res.ok) throw new Error("Erreur de sauvegarde")
      setSaved(true)
    } catch {
      setSaveError("Impossible de sauvegarder. Réessaie.")
    } finally {
      setSaving(false)
    }
  }

  async function handleShare() {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Hero card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0a832]/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f0e8] mb-2">
                {result.title}
              </h1>
              <p className="text-lg text-[#f7c060] font-medium">{result.one_liner}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                icon={<Share2 className="h-4 w-4" />}
              >
                {copied ? "Copié !" : "Partager"}
              </Button>
              <Button
                variant={saved ? "secondary" : "primary"}
                size="sm"
                onClick={handleSave}
                loading={saving}
                icon={saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              >
                {saved ? "Sauvegardé" : "Sauvegarder"}
              </Button>
            </div>
          </div>

          {saveError && (
            <p className="mt-2 text-xs text-[#ef4444]">{saveError}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <FeasibilityBadge level={result.feasibility.level} explanation="" compact />
            <ImpactBadge level={result.impact.level} explanation="" compact />
          </div>

          <div className="mt-6 rounded-xl bg-[#0c1528] border border-[#1f3054]/50 p-4">
            <h3 className="text-xs font-semibold text-[#4e5f82] uppercase tracking-wider mb-2">
              Problème résolu
            </h3>
            <p className="text-sm text-[#9ba8c4] leading-relaxed">{result.problem_statement}</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pourquoi ce projet */}
        <Card>
          <h2 className="text-base font-bold text-[#f5f0e8] mb-4">Pourquoi ce projet ?</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#4e5f82] font-semibold uppercase tracking-wider mb-1">
                Pourquoi maintenant
              </p>
              <p className="text-sm text-[#9ba8c4]">{result.why_now}</p>
            </div>
            <div>
              <p className="text-xs text-[#4e5f82] font-semibold uppercase tracking-wider mb-1">
                Fit local
              </p>
              <p className="text-sm text-[#9ba8c4]">{result.why_local_fit}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-[#4e5f82] font-semibold uppercase tracking-wider mb-2">
              Utilisateurs cibles
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.target_users.map((user, i) => (
                <Badge key={i} variant="slate">{user}</Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Faisabilité & Impact */}
        <div className="space-y-4">
          <Card>
            <h2 className="text-base font-bold text-[#f5f0e8] mb-3">Faisabilité</h2>
            <FeasibilityBadge level={result.feasibility.level} explanation={result.feasibility.explanation} />
          </Card>
          <Card>
            <h2 className="text-base font-bold text-[#f5f0e8] mb-3">Impact</h2>
            <ImpactBadge level={result.impact.level} explanation={result.impact.explanation} />
          </Card>
        </div>
      </div>

      {/* Stack & Requirements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-[#f5f0e8] mb-4">Stack recommandée</h2>
          <div className="flex flex-wrap gap-2">
            {result.recommended_stack.map((tech, i) => (
              <Badge key={i} variant="amber">{tech}</Badge>
            ))}
          </div>
          {result.non_technical_requirements.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-[#4e5f82] font-semibold uppercase tracking-wider mb-2">
                Prérequis non-techniques
              </p>
              <ul className="space-y-1">
                {result.non_technical_requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#9ba8c4]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1f3054] shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-base font-bold text-[#f5f0e8] mb-4">Scope MVP</h2>
          <ul className="space-y-2">
            {result.mvp_scope.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#f0a832]/20 border border-[#f0a832]/30 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0a832]" />
                </span>
                <span className="text-sm text-[#9ba8c4]">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Roadmap */}
      <Card>
        <h2 className="text-base font-bold text-[#f5f0e8] mb-6">
          Plan d&apos;action — 30 jours
        </h2>
        <RoadmapTimeline roadmap={result.roadmap_30_days} />
      </Card>

      {/* Next action */}
      <div className="rounded-2xl border border-[#f0a832]/30 bg-[#f0a832]/8 p-6">
        <p
          className="text-xs font-semibold text-[#f0a832] uppercase tracking-wider mb-2"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          ⚡ Ton prochain pas dès aujourd&apos;hui
        </p>
        <p className="text-base text-[#f5f0e8] font-medium">{result.next_best_action}</p>
      </div>

      {/* Skills to strengthen */}
      {result.skills_to_strengthen.length > 0 && (
        <Card>
          <h2 className="text-base font-bold text-[#f5f0e8] mb-3">
            Compétences à renforcer
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.skills_to_strengthen.map((skill, i) => (
              <Badge key={i} variant="blue">{skill}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Alternatives */}
      <Card>
        <h2 className="text-base font-bold text-[#f5f0e8] mb-4">Projets alternatifs</h2>
        <AlternativesList alternatives={result.project_alternatives} />
      </Card>
    </div>
  )
}
