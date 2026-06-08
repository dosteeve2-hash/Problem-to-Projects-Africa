import { MessageSquare, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Décris ta situation",
    description:
      "Choisis ton mode d'entrée : compétences, idée brute ou problème observé. Réponds à quelques questions ciblées sur toi et ton contexte local.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Cpu,
    step: "02",
    title: "L'IA analyse ton contexte",
    description:
      "Claude analyse tes données avec une connaissance profonde des réalités économiques, sociales et infrastructurelles de ton pays.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Reçois ton projet complet",
    description:
      "Titre, pitch, faisabilité, impact, stack recommandée, scope MVP et roadmap 30 jours. Un plan d'action concret pour démarrer aujourd'hui.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            De l'idée au projet en 3 étapes
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Pas de théorie, pas de jargon. Un processus guidé qui produit des résultats concrets en moins de 2 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative">
                <div className={`rounded-2xl border p-6 h-full ${step.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`rounded-xl border p-3 ${step.bg} shrink-0`}>
                      <Icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <span className={`text-4xl font-extrabold opacity-20 ${step.color}`}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {step.step !== "03" && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                    <div className="w-8 h-px bg-slate-700" />
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
