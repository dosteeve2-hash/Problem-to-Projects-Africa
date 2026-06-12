"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { storeResult } from "@/lib/session-store"
import { CountrySelector } from "./CountrySelector"
import { SectorSelector } from "./SectorSelector"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import type { IntakePayload } from "@/types"

type Step = 1 | 2

export function ProblemForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [sector, setSector] = useState("")
  const [userLevel, setUserLevel] = useState<IntakePayload["user_level"]>("beginner")
  const [rawProblem, setRawProblem] = useState("")
  const [background, setBackground] = useState("")
  const [constraintInput, setConstraintInput] = useState("")
  const [constraints, setConstraints] = useState<string[]>([])

  const [errors, setErrors] = useState<Record<string, string>>({})

  function addConstraint() {
    const c = constraintInput.trim()
    if (c && !constraints.includes(c)) {
      setConstraints([...constraints, c])
      setConstraintInput("")
    }
  }

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!country) e.country = "Sélectionne ton pays"
    if (!sector) e.sector = "Sélectionne un secteur"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (!rawProblem.trim()) e.rawProblem = "Décris le problème observé"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validateStep2()) return

    setLoading(true)
    setError(null)

    const payload: IntakePayload = {
      mode: "problem",
      country,
      city: city || undefined,
      sector,
      user_level: userLevel,
      background: background || undefined,
      raw_problem: rawProblem,
      constraints: constraints.length ? constraints : undefined,
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
      <div className="space-y-2">
        <div className="flex justify-between text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
          <span>Étape {step} sur 2</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full" style={{ background: "var(--border2)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, background: "var(--gold)" }}
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
                    className="rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer"
                    style={userLevel === level ? {
                      border: "1px solid rgba(240,168,50,0.6)",
                      background: "rgba(240,168,50,0.1)",
                      color: "var(--text)",
                    } : {
                      border: "1px solid var(--border2)",
                      color: "var(--text2)",
                    }}
                  >
                    {labels[level]}
                  </button>
                )
              })}
            </div>
          </div>

          <Button
            onClick={() => validateStep1() && setStep(2)}
            className="w-full"
          >
            Continuer
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Textarea
            label="Décris le problème que tu as observé"
            placeholder="Ex: Dans mon village, les agriculteurs n'ont aucun accès aux prévisions météo. Ils plantent au mauvais moment et perdent leurs récoltes. J'ai vu ça toute ma vie et personne ne s'en occupe..."
            value={rawProblem}
            onChange={(e) => setRawProblem(e.target.value)}
            rows={5}
            error={errors.rawProblem}
            hint="Sois concret : qui souffre de ce problème, comment, et depuis quand ?"
          />

          <Textarea
            label="Ton background (optionnel)"
            placeholder="Ex: Je suis fils d'agriculteur, étudiant en agro, j'ai des bases en programmation..."
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={3}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text2)" }}>
              Tes contraintes personnelles (optionnel)
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Pas de budget, pas internet stable en zone rurale..."
                value={constraintInput}
                onChange={(e) => setConstraintInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addConstraint())}
                className="flex-1"
              />
              <Button onClick={addConstraint} variant="secondary" size="md" icon={<Plus className="h-4 w-4" />}>
                Ajouter
              </Button>
            </div>
            {constraints.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {constraints.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "var(--bg3)", border: "1px solid var(--border2)", color: "var(--text2)" }}
                  >
                    {c}
                    <button onClick={() => setConstraints(constraints.filter((x) => x !== c))} className="cursor-pointer">
                      <X className="h-3 w-3" style={{ color: "var(--text3)" }} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3"
              style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)" }}
            >
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
              {loading ? "Transformation en cours..." : "Transformer en projet"}
            </Button>
          </div>

          {loading && (
            <p className="text-center text-xs text-slate-500">
              L'IA analyse le problème... ~20 secondes
            </p>
          )}
        </div>
      )}
    </div>
  )
}
