"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { CountrySelector } from "./CountrySelector"
import { SectorSelector } from "./SectorSelector"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import type { IntakePayload } from "@/types"

type Step = 1 | 2 | 3

export function SkillsForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [sector, setSector] = useState("")
  const [userLevel, setUserLevel] = useState<IntakePayload["user_level"]>("beginner")
  const [background, setBackground] = useState("")
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [toolInput, setToolInput] = useState("")
  const [tools, setTools] = useState<string[]>([])
  const [timeAvailable, setTimeAvailable] = useState("")
  const [goal, setGoal] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})

  function addSkill() {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) {
      setSkills([...skills, s])
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill))
  }

  function addTool() {
    const t = toolInput.trim()
    if (t && !tools.includes(t)) {
      setTools([...tools, t])
      setToolInput("")
    }
  }

  function removeTool(tool: string) {
    setTools(tools.filter((t) => t !== tool))
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
    if (skills.length === 0) e.skills = "Ajoute au moins une compétence"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validateStep2()) return

    setLoading(true)
    setError(null)

    const payload: IntakePayload = {
      mode: "skills",
      country,
      city: city || undefined,
      sector,
      user_level: userLevel,
      background: background || undefined,
      skills,
      tools: tools.length ? tools : undefined,
      time_available: timeAvailable || undefined,
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

      router.push(`/results/${data.id}`)
    } catch {
      setError("Erreur réseau. Vérifie ta connexion.")
    } finally {
      setLoading(false)
    }
  }

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Étape {step} sur 3</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step 1 — Context */}
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
            <label className="text-sm font-medium text-slate-300">Ton niveau</label>
            <div className="grid grid-cols-3 gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map((level) => {
                const labels = { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" }
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUserLevel(level)}
                    className={[
                      "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                      userLevel === level
                        ? "border-amber-500 bg-amber-500/10 text-white"
                        : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white",
                    ].join(" ")}
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

      {/* Step 2 — Skills */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">
              Tes compétences <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Développement web, Comptabilité..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-1"
              />
              <Button onClick={addSkill} variant="secondary" size="md" icon={<Plus className="h-4 w-4" />}>
                Ajouter
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300"
                  >
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="text-amber-400 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.skills && <p className="text-xs text-red-400">{errors.skills}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">
              Outils que tu maîtrises (optionnel)
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Excel, Figma, Python, WhatsApp Business..."
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                className="flex-1"
              />
              <Button onClick={addTool} variant="secondary" size="md" icon={<Plus className="h-4 w-4" />}>
                Ajouter
              </Button>
            </div>
            {tools.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    {tool}
                    <button onClick={() => removeTool(tool)} className="text-slate-400 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Textarea
            label="Background / contexte (optionnel)"
            placeholder="Ex: Je suis étudiant en L3 info, j'ai fait un stage dans une PME locale..."
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={3}
          />

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
              Retour
            </Button>
            <Button onClick={() => validateStep2() && setStep(3)} className="flex-1">
              Continuer
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 — Goals */}
      {step === 3 && (
        <div className="space-y-6">
          <Input
            label="Temps disponible par semaine (optionnel)"
            placeholder="Ex: 10h/semaine, week-ends uniquement..."
            value={timeAvailable}
            onChange={(e) => setTimeAvailable(e.target.value)}
          />

          <Textarea
            label="Quel est ton objectif avec ce projet ? (optionnel)"
            placeholder="Ex: Trouver un projet de fin d'études, générer des revenus dans 6 mois, aider ma communauté..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
          />

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
              Retour
            </Button>
            <Button onClick={handleSubmit} loading={loading} className="flex-1">
              {loading ? "Génération en cours..." : "Générer mon projet"}
            </Button>
          </div>

          {loading && (
            <p className="text-center text-xs text-slate-500">
              L'IA analyse ton contexte... ~20 secondes
            </p>
          )}
        </div>
      )}
    </div>
  )
}
