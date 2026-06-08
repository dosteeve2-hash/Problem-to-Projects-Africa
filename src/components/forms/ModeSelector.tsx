import Link from "next/link"
import { Wrench, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react"

const modes = [
  {
    href: "/start/skills",
    icon: Wrench,
    title: "J'ai des compétences",
    subtitle: "mais pas encore d'idée précise",
    description:
      "Tu as des skills concrets — développement, agriculture, commerce, design, langues... P2P Africa trouve le projet qui correspond exactement à ce que tu sais faire.",
    tag: "Mode Skills",
    color: "amber" as const,
  },
  {
    href: "/start/idea",
    icon: Lightbulb,
    title: "J'ai une idée",
    subtitle: "et je veux la valider",
    description:
      "Tu as une idée qui germe. P2P Africa l'analyse sous l'angle de la faisabilité, de l'impact local, et te propose un plan pour la concrétiser.",
    tag: "Mode Idée",
    color: "emerald" as const,
  },
  {
    href: "/start/problem",
    icon: AlertTriangle,
    title: "J'ai observé un problème",
    subtitle: "dans mon entourage ou ma communauté",
    description:
      "Tu as vu quelque chose qui ne fonctionne pas. P2P Africa transforme cette observation en projet concret avec un modèle économique viable.",
    tag: "Mode Problème",
    color: "blue" as const,
  },
]

const colorMap = {
  amber: {
    iconWrap: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-400",
    tag: "bg-amber-500/10 text-amber-300",
    hover: "hover:border-amber-500/50",
  },
  emerald: {
    iconWrap: "bg-emerald-500/10 border-emerald-500/20",
    icon: "text-emerald-400",
    tag: "bg-emerald-500/10 text-emerald-300",
    hover: "hover:border-emerald-500/50",
  },
  blue: {
    iconWrap: "bg-blue-500/10 border-blue-500/20",
    icon: "text-blue-400",
    tag: "bg-blue-500/10 text-blue-300",
    hover: "hover:border-blue-500/50",
  },
}

export function ModeSelector() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {modes.map((mode) => {
        const Icon = mode.icon
        const colors = colorMap[mode.color]
        return (
          <Link
            key={mode.href}
            href={mode.href}
            className={`group block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-200 ${colors.hover} hover:bg-slate-800/60`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`rounded-xl border p-3 ${colors.iconWrap}`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors.tag}`}>
                {mode.tag}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">{mode.title}</h3>
            <p className="text-sm text-slate-400 mb-3">{mode.subtitle}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{mode.description}</p>

            <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-slate-400 group-hover:text-white transition-colors">
              Choisir ce mode
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
