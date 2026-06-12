"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { storeResult } from "@/lib/session-store"
import { CountrySelector } from "./CountrySelector"
import { SectorSelector } from "./SectorSelector"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import type { IntakePayload } from "@/types"

type Step = 1 | 2

export function IdeaForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [sector, setSector] = useState("")
  const [userLevel, setUserLevel] = useState<IntakePayload["user_level"]>("beginner")
  const [rawIdea, setRawIdea] = useState("")
  const [background, setBackground] = useState("")
  const [goal, setGoal] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!country) e.country = "Sélectionne ton pays"
    if (!sector) e.sector = "Sélectionne un secteur"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (!rawIdea.trim()) e.rawIdea = "Décris ton idée"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validateStep2()) return

    setLoading(true)
    setError(null)

    const payload: IntakePayload = {
      mode: "idea",
      country,
      city: city || undefined,
      sector,
      user_level: userLevel,
      background: background || undefined,
      raw_idea: rawIdea,
      goal: goal || undefined,
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la génération")
        return
      }

      storeResult(data.id, data.result)
      router.push(`/results/${data.id}`)
    } catch {
      setError("Erreur réseau. Vérifie ta connexion.")
    } finally {
      setLoading(false)
    }
  }

  const progressPercent = step === 1 ? 50 : 100

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono), monospace" }}>
          <span>Étape {step} sur 2</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full" style={{ background: "var(--bg3)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: "var(--green)" }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <CountrySelector value={country} onChange={setCountry} error={errors.country} />

          {country && (
            <Input
              label="Ville (optionnel)"
              placeholder="Ex: Ouagadougou, Dakar..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          )}

          <SectorSelector value={sector} onChange={setSector} error={errors.sector} />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text2)" }}>Ton niveau</label>
            <div className="grid grid-cols-3 gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map((level) => {
                const labels = { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" }
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUserLevel(level)}
                    className="rounded-xl border px-3 py-2.5 text-sm font-medium transition-all"
                    style={
                      userLevel === level
                        ? { borderColor: "var(--gold)", background: "rgba(240,168,50,0.1)", color: "var(--text)" }
                        : { borderColor: "var(--border2)", color: "var(--text2)" }
                    }
                  >
                    {labels[level]}
                  </button>
                )
              })}
            </div>
          </div>

          <Button onClick={() => validateStep1() && setStep(2)} className="w-full">
            Continuer
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Textarea
            label="Décris ton idée"
            placeholder="Ex: Je veux créer une app pour aider les tontines à gérer leurs membres et leurs collectes. Je vois que beaucoup de gens perdent de l'argent parce que les tontines sont gérées à la main..."
            value={rawIdea}
            onChange={(e) => setRawIdea(e.target.value)}
            rows={5}
            error={errors.rawIdea}
            hint="Pas besoin d'être précis. Plus tu es détaillé, meilleures sont les recommandations."
          />

          <Textarea
            label="Ton background (optionnel)"
            placeholder="Ex: Je suis étudiant, j'ai des bases en programmation, ma famille gère une tontine depuis 10 ans..."
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={3}
          />

          <Input
            label="Objectif principal (optionnel)"
            placeholder="Ex: Valider si c'est viable, générer des revenus, projet académique..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          {error && (
            <div className="rounded-xl px-4 py-3" style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)" }}>
              <p className="text-sm" style={{ color: "var(--red)" }}>{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
              Retour
            </Button>
            <Button
              onClick={handleSubmit}
              loading={loading}
              className="flex-1"
            >
              {loading ? "Analyse en cours..." : "Analyser mon idée"}
            </Button>
          </div>

          {loading && (
            <p className="text-center text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono), monospace" }}>
              L&apos;IA analyse ton idée... ~20 secondes
            </p>
          )}
        </div>
      )}
    </div>
  )
}
