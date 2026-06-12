"use client"

import { MessageSquare, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Décris ta situation",
    description:
      "Choisis ton mode d'entrée : compétences, idée brute ou problème observé. Réponds à quelques questions ciblées sur toi et ton contexte local.",
    accent: "var(--gold)",
  },
  {
    icon: Cpu,
    step: "02",
    title: "L'IA analyse ton contexte",
    description:
      "Claude analyse tes données avec une connaissance profonde des réalités économiques, sociales et infrastructurelles de ton pays.",
    accent: "var(--cyan)",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Reçois ton projet complet",
    description:
      "Titre, pitch, faisabilité, impact, stack recommandée, scope MVP et roadmap 30 jours. Un plan d'action concret pour démarrer aujourd'hui.",
    accent: "var(--green)",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24" style={{ background: "var(--bg2)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
          >
            De l'idée au projet en 3 étapes
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text2)" }}>
            Pas de théorie, pas de jargon. Un processus guidé qui produit des résultats concrets en moins de 2 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative">
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg3)",
                    border: `1px solid var(--border2)`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="rounded-xl p-3 shrink-0"
                      style={{ background: step.accent + "15", border: `1px solid ${step.accent}25` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: step.accent }} />
                    </div>
                    <span
                      className="text-4xl font-extrabold opacity-20"
                      style={{ color: step.accent, fontFamily: "var(--font-mono)" }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3
                    className="mt-4 text-lg font-bold"
                    style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text2)" }}>
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                    <div className="w-8 h-px" style={{ background: "var(--border2)" }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
