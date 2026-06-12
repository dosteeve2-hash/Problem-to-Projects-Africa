import { Zap, Target, Globe, Users } from "lucide-react"
import { Card } from "@/components/ui/Card"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1
            className="text-4xl font-extrabold mb-4"
            style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            À propos de P2P Africa
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text2)" }}>
            Une plateforme née de la conviction que les talents africains ont tout ce qu'il
            faut pour bâtir des projets qui transforment leur continent.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl p-3 shrink-0" style={{ background: "rgba(240,168,50,0.1)", border: "1px solid rgba(240,168,50,0.2)" }}>
                <Target className="h-6 w-6" style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>La mission</h2>
                <p className="leading-relaxed" style={{ color: "var(--text2)" }}>
                  Problem to Project Africa aide les talents africains — étudiants, autodidactes,
                  entrepreneurs, professionnels — à transformer leurs compétences, idées ou
                  observations de problèmes locaux en projets concrets, réalistes et exécutables.
                  Pas de théorie abstraite. Des recommandations ancrées dans la réalité de chaque pays.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl p-3 shrink-0" style={{ background: "rgba(45,212,255,0.1)", border: "1px solid rgba(45,212,255,0.2)" }}>
                <Globe className="h-6 w-6" style={{ color: "var(--cyan)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>Pourquoi c&apos;est différent</h2>
                <ul className="space-y-2" style={{ color: "var(--text2)" }}>
                  {[
                    "Contexte pays intégré : chaque recommandation tient compte des réalités locales (infrastructure, pouvoir d'achat, culture)",
                    "3 modes d'entrée : peu importe ton point de départ, il y a un chemin",
                    "Résultats actionnables : roadmap 30 jours, MVP scope, prochain pas concret",
                    "Non-technique friendly : les projets ne sont pas forcément des apps",
                    "Gratuit et sans compte : commence maintenant, sauvegarde plus tard",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--cyan)" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl p-3 shrink-0" style={{ background: "rgba(34,217,138,0.1)", border: "1px solid rgba(34,217,138,0.2)" }}>
                <Users className="h-6 w-6" style={{ color: "var(--green)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>Pour qui ?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: "Étudiants en informatique", desc: "Trouver un projet de fin d'études pertinent et local" },
                    { title: "Autodidactes", desc: "Valoriser ses compétences dans un projet concret" },
                    { title: "Entrepreneurs en herbe", desc: "Valider une idée avant d'investir du temps et de l'argent" },
                    { title: "Professionnels reconvertis", desc: "Explorer de nouvelles opportunités dans leur secteur" },
                  ].map((persona) => (
                    <div key={persona.title} className="rounded-lg p-3" style={{ background: "var(--bg2)" }}>
                      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{persona.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text3)" }}>{persona.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl p-3 shrink-0" style={{ background: "rgba(240,168,50,0.1)", border: "1px solid rgba(240,168,50,0.2)" }}>
                <Zap className="h-6 w-6" style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>La tech derrière</h2>
                <p className="leading-relaxed" style={{ color: "var(--text2)" }}>
                  P2P Africa est propulsé par{" "}
                  <span style={{ color: "var(--gold2)", fontWeight: 600 }}>Claude (Anthropic)</span>, l&apos;un des
                  modèles d'IA les plus avancés au monde. Chaque génération intègre un contexte
                  pays riche — économie, infrastructure, opportunités, contraintes — pour produire
                  des recommandations réellement pertinentes et non des conseils génériques.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/start">
            <Button size="lg">Essayer maintenant</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
