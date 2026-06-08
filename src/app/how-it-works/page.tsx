import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { ArrowRight, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Choisis ton point de départ",
    description: "Trois modes selon ta situation : Skills, Idée ou Problème. Chaque mode pose des questions ciblées et pertinentes.",
    details: [
      "Mode Skills : tu décris tes compétences et outils maîtrisés",
      "Mode Idée : tu décris ton idée brute, même vague",
      "Mode Problème : tu décris ce que tu as observé comme problème",
    ],
  },
  {
    number: "02",
    title: "Renseigne ton contexte local",
    description: "Pays, ville, secteur d'intérêt, niveau. Ces informations permettent à l'IA de contextualiser chaque recommandation.",
    details: [
      "9 pays supportés avec contexte économique et culturel intégré",
      "Secteur d'activité parmi 14 options",
      "Niveau d'expérience pour calibrer la faisabilité",
    ],
  },
  {
    number: "03",
    title: "L'IA génère ton projet",
    description: "Claude analyse ton profil avec sa connaissance des réalités africaines et génère un projet complet en 30 secondes.",
    details: [
      "Titre, pitch, problème résolu, utilisateurs cibles",
      "Analyse de faisabilité et d'impact avec explications",
      "Stack technique ou ressources non-techniques recommandées",
    ],
  },
  {
    number: "04",
    title: "Reçois un plan d'action complet",
    description: "Pas juste une idée, un vrai plan. Avec le scope MVP, la roadmap semaine par semaine, et ton prochain pas concret.",
    details: [
      "Scope MVP avec les fonctionnalités essentielles",
      "Roadmap 30 jours, semaine par semaine",
      "Prochain pas à faire dès aujourd'hui",
      "Compétences à renforcer",
      "2 projets alternatifs si le premier ne convainc pas",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Comment ça marche
          </h1>
          <p className="text-lg text-slate-400">
            Un processus guidé en 4 étapes pour passer de l'idée au projet concret.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-extrabold text-sm shrink-0">
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px flex-1 mt-3 bg-slate-800" />
                )}
              </div>

              <Card className="flex-1 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-extrabold text-slate-800">{step.number}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-2">{step.title}</h2>
                    <p className="text-sm text-slate-400 mb-4">{step.description}</p>
                    <ul className="space-y-1.5">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/start">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Commencer maintenant
            </Button>
          </Link>
          <p className="mt-3 text-xs text-slate-600">Gratuit · Résultats en moins de 30 secondes</p>
        </div>
      </div>
    </div>
  )
}
