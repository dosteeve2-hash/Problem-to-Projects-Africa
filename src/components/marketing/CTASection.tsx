import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-3xl p-12"
          style={{
            border: "1px solid rgba(212,175,55,0.2)",
            background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(10,22,40,0.9))",
          }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
          >
            Prêt à concrétiser ton projet ?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--text2)" }}>
            En 2 minutes, tu as un projet concret adapté à ta réalité. Gratuit, sans compte, sans bullshit.
          </p>
          <Link href="/start">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Transforme ton idée maintenant
            </Button>
          </Link>
          <p className="mt-4 text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
            Aucune carte de crédit requise · Résultats instantanés
          </p>
        </div>
      </div>
    </section>
  )
}
