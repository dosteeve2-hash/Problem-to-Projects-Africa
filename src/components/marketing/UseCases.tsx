"use client"

import Link from "next/link"
import { Wrench, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react"

const useCases = [
  {
    icon: Wrench,
    mode: "skills" as const,
    title: "J'ai des compétences",
    subtitle: "mais pas d'idée",
    description:
      "Tu sais coder, tu as des connaissances en agriculture, tu maîtrises Excel, tu parles 3 langues... P2P Africa identifie le projet qui valorise exactement ce que tu sais faire.",
    example: "Ex: développeur web + Ouagadougou → Plateforme de commandes pour restaurants locaux",
    accent: "var(--gold)",
    href: "/start/skills",
  },
  {
    icon: Lightbulb,
    mode: "idea" as const,
    title: "J'ai une idée",
    subtitle: "à valider",
    description:
      "Tu as une idée qui te trotte dans la tête. Est-ce que c'est viable ? Qui seraient tes clients ? Quel serait le bon modèle économique ? P2P Africa te donne une réponse structurée.",
    example: "Ex: \"Je veux créer une app pour les tontines\" → Analyse complète + MVP scope",
    accent: "var(--green)",
    href: "/start/idea",
  },
  {
    icon: AlertTriangle,
    mode: "problem" as const,
    title: "J'ai vu un problème",
    subtitle: "dans mon entourage",
    description:
      "Tu as observé quelque chose qui ne fonctionne pas — un manque, une inefficacité, une douleur récurrente. P2P Africa transforme cette observation en projet concret.",
    example: "Ex: \"Les agriculteurs de mon village n'ont pas accès à la météo\" → Projet SMS météo",
    accent: "var(--cyan)",
    href: "/start/problem",
  },
]

export function UseCases() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
          >
            Quel est ton point de départ ?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text2)" }}>
            Peu importe où tu en es, il y a un chemin. Choisis le mode qui correspond à ta situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon
            return (
              <Link
                key={uc.mode}
                href={uc.href}
                className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
                style={{ background: "var(--bg3)", border: "1px solid var(--border2)" }}
              >
                <div
                  className="inline-flex rounded-xl p-3"
                  style={{ background: uc.accent + "15", border: `1px solid ${uc.accent}25` }}
                >
                  <Icon className="h-6 w-6" style={{ color: uc.accent }} />
                </div>

                <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                  {uc.title}{" "}
                  <span style={{ color: "var(--text2)", fontWeight: 400, fontStyle: "normal" }}>{uc.subtitle}</span>
                </h3>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text2)" }}>
                  {uc.description}
                </p>

                <div
                  className="mt-4 rounded-lg p-3 text-xs"
                  style={{ background: uc.accent + "10", border: `1px solid ${uc.accent}20`, color: uc.accent, fontFamily: "var(--font-mono)" }}
                >
                  {uc.example}
                </div>

                <div
                  className="mt-4 flex items-center gap-1 text-sm font-medium transition-colors group-hover:opacity-80"
                  style={{ color: "var(--text3)" }}
                >
                  Essayer ce mode
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
