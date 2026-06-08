import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-slate-900/80 p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Prêt à concrétiser ton projet ?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            En 2 minutes, tu as un projet concret adapté à ta réalité. Gratuit, sans compte, sans bullshit.
          </p>
          <Link href="/start">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Transforme ton idée maintenant
            </Button>
          </Link>
          <p className="mt-4 text-xs text-slate-600">
            Aucune carte de crédit requise · Résultats instantanés
          </p>
        </div>
      </div>
    </section>
  )
}
