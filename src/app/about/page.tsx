import { Zap, Target, Globe, Users } from "lucide-react"
import { Card } from "@/components/ui/Card"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            À propos de P2P Africa
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Une plateforme née de la conviction que les talents africains ont tout ce qu'il
            faut pour bâtir des projets qui transforment leur continent.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 shrink-0">
                <Target className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3">La mission</h2>
                <p className="text-slate-400 leading-relaxed">
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
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 shrink-0">
                <Globe className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Pourquoi c'est différent</h2>
                <ul className="space-y-2 text-slate-400">
                  {[
                    "Contexte pays intégré : chaque recommandation tient compte des réalités locales (infrastructure, pouvoir d'achat, culture)",
                    "3 modes d'entrée : peu importe ton point de départ, il y a un chemin",
                    "Résultats actionnables : roadmap 30 jours, MVP scope, prochain pas concret",
                    "Non-technique friendly : les projets ne sont pas forcément des apps",
                    "Gratuit et sans compte : commence maintenant, sauvegarde plus tard",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Pour qui ?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: "Étudiants en informatique", desc: "Trouver un projet de fin d'études pertinent et local" },
                    { title: "Autodidactes", desc: "Valoriser ses compétences dans un projet concret" },
                    { title: "Entrepreneurs en herbe", desc: "Valider une idée avant d'investir du temps et de l'argent" },
                    { title: "Professionnels reconvertis", desc: "Explorer de nouvelles opportunités dans leur secteur" },
                  ].map((persona) => (
                    <div key={persona.title} className="rounded-lg bg-slate-800/40 p-3">
                      <p className="text-sm font-semibold text-white">{persona.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{persona.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 shrink-0">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-3">La tech derrière</h2>
                <p className="text-slate-400 leading-relaxed">
                  P2P Africa est propulsé par{" "}
                  <span className="text-amber-300 font-medium">Claude (Anthropic)</span>, l'un des
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
