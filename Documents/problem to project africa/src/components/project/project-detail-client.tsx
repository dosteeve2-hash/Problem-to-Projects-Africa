"use client";

import Link from "next/link";

import { projectCatalog } from "@/lib/recommendation/catalog";

type ProjectDetailClientProps = {
  projectId: string;
};

export function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const project = projectCatalog.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
        <h1 className="text-3xl font-semibold text-foreground">Projet introuvable.</h1>
        <p className="mt-4 text-base leading-8 text-muted">
          Ce projet n&apos;existe pas dans le catalogue actuel.
        </p>
        <Link
          href="/modes"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Lancer un diagnostic
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {project.sector}
          </span>
          <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.mode}
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{project.concept}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-8">
          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Probleme adresse</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.problem}</p>
          </div>

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Pertinence locale</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.localRelevance}</p>
          </div>

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">MVP suggere</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.mvpSummary}</p>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Fonctionnalites cles</h2>
            <div className="mt-5 grid gap-3">
              {project.topFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl bg-accent-soft px-4 py-3 text-sm text-foreground"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Competences a developper</h2>
            <div className="mt-5 grid gap-3">
              {project.skillsToLearn.map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-foreground"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Prochain pas concret</h2>
            <p className="mt-4 text-base leading-8 text-muted">{project.nextStep}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/intake?mode=${project.mode}`}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
        >
          Lancer un diagnostic avec ce mode
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white/75 px-6 py-4 text-sm font-semibold text-foreground"
        >
          Voir mon dashboard
        </Link>
      </div>
    </div>
  );
}
