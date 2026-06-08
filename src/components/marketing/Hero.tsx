import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-medium text-amber-300">
            Propulsé par Claude AI · 9 pays africains
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Transforme tes compétences en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            projets qui changent l'Afrique
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Tu as des skills, une idée, ou tu vois un problème autour de toi ?{" "}
          <strong className="text-slate-200">P2P Africa</strong> analyse ton contexte local et génère un
          projet concret, réaliste et actionnable — adapté à ta réalité.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/start">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Commence maintenant
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button size="lg" variant="ghost">
              Voir comment ça marche
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-sm text-slate-600">
          Gratuit · Pas de compte requis · Résultats en 30 secondes
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-800 pt-12">
          {[
            { value: "3", label: "modes d'entrée", sub: "Skills, Idée, Problème" },
            { value: "9", label: "pays supportés", sub: "Afrique francophone & anglophone" },
            { value: "30j", label: "roadmap incluse", sub: "Plan d'action semaine par semaine" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-white">{stat.label}</span>
              <span className="mt-0.5 text-xs text-slate-500 hidden sm:block">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
