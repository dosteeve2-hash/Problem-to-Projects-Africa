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
    color: "amber" as const,
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
    color: "emerald" as const,
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
    color: "blue" as const,
    href: "/start/problem",
  },
]

const colorMap = {
  amber: {
    iconBg: "bg-amber-500/10 border border-amber-500/20",
    icon: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    hover: "hover:border-amber-500/40",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    hover: "hover:border-emerald-500/40",
  },
  blue: {
    iconBg: "bg-blue-500/10 border border-blue-500/20",
    icon: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    hover: "hover:border-blue-500/40",
  },
}

export function UseCases() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Quel est ton point de départ ?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Peu importe où tu en es, il y a un chemin. Choisis le mode qui correspond à ta situation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon
            const colors = colorMap[uc.color]
            return (
              <Link
                key={uc.mode}
                href={uc.href}
                className={`group block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-200 ${colors.hover} hover:bg-slate-800/60`}
              >
                <div className={`inline-flex rounded-xl p-3 ${colors.iconBg}`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {uc.title}{" "}
                  <span className="text-slate-400 font-normal">{uc.subtitle}</span>
                </h3>

                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {uc.description}
                </p>

                <div className={`mt-4 rounded-lg p-3 text-xs ${colors.badge}`}>
                  {uc.example}
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
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
