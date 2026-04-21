import Link from "next/link";

import { FeatureCard } from "@/components/marketing/feature-card";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ModeCard } from "@/components/modes/mode-card";
import { burkinaFasoContext } from "@/lib/context/burkina-faso";
import { MVP_COUNTRY, MVP_MODES, PRODUCT_NAME, SUPPORTED_SECTORS } from "@/lib/product";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-primary">
            Burkina Faso first
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Transforme des competences, des idees et des problemes locaux en projets utiles.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {PRODUCT_NAME} aide les talents africains a choisir un projet realiste, prioritaire
            et executable dans leur contexte local, en commencant par le {MVP_COUNTRY}.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/modes"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-strong"
            >
              Commencer le diagnostic
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white/75 px-6 py-4 text-sm font-semibold text-foreground"
            >
              Voir comment ca marche
            </Link>
          </div>
        </div>

        <div className="rounded-[36px] border border-border bg-card-strong p-6 shadow-[var(--shadow)]">
          <div className="rounded-[28px] bg-primary p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Recommandation promise
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Un projet recommande, pas une idee vague.</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/85">
              <li>3 a 5 problemes ou pistes pertinents</li>
              <li>1 projet recommande avec logique de priorisation</li>
              <li>Un MVP suggere et une roadmap sur 30 jours</li>
              <li>Les competences a renforcer et le prochain pas concret</li>
            </ul>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SUPPORTED_SECTORS.map((sector) => (
              <div
                key={sector}
                className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm font-medium text-foreground"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Une logique simple: contexte, recommandation, execution.
          </h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Le moteur ne pousse pas de la tech pour faire de la tech. Il part du terrain, du
            profil utilisateur et des contraintes reelles avant de proposer un projet.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            eyebrow="Step 1"
            title="Comprendre le profil"
            description="Pays, niveau, domaine, competences, temps disponible et objectif servent de base a la recommandation."
          />
          <FeatureCard
            eyebrow="Step 2"
            title="Lire le contexte local"
            description="Le systeme ajoute la realite du Burkina Faso, les contraintes terrain et les secteurs prioritaires."
          />
          <FeatureCard
            eyebrow="Step 3"
            title="Proposer un projet executable"
            description="Le resultat priorise un projet faisable, explique pourquoi il est pertinent et fournit un plan de demarrage clair."
          />
        </div>
      </section>

      <section id="modes" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">3 modes MVP</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Trois points d&apos;entree, une seule sortie: un projet clair.
            </h2>
          </div>
          <Link href="/modes" className="text-sm font-semibold text-primary">
            Ouvrir la selection complete
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {MVP_MODES.map((mode) => (
            <ModeCard
              key={mode.slug}
              title={mode.title}
              description={mode.description}
              prompt={mode.prompt}
              href={`/intake?mode=${mode.slug}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Burkina Faso context
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Le produit commence volontairement avec un focus fort.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Une premiere version plus etroite permet de rendre les recommandations meilleures,
              plus utiles et plus credibles.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {burkinaFasoContext.realities.map((reality) => (
              <div key={reality} className="rounded-[24px] border border-border bg-white/80 p-5">
                <p className="text-sm leading-7 text-foreground">{reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
