"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import type { RecommendationResult } from "@/lib/types/recommendation";

type StoredResult = {
  result: RecommendationResult;
  generatedAt: string;
};

export function ResultsClient() {
  const payload = useSyncExternalStore(
    () => () => undefined,
    () => {
      const raw = window.sessionStorage.getItem("problem-to-project-africa:result");
      if (!raw) return null;

      try {
        return JSON.parse(raw) as StoredResult;
      } catch {
        return null;
      }
    },
    () => null,
  );

  if (!payload) {
    return (
      <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
        <h1 className="text-3xl font-semibold text-foreground">Aucun resultat pour le moment.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Lance d&apos;abord un diagnostic depuis le formulaire pour generer une recommandation de projet.
        </p>
        <Link
          href="/modes"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Choisir un mode
        </Link>
      </div>
    );
  }

  const { result } = payload;
  const { recommendedProject } = result;

  return (
    <div className="grid gap-8">
      <Link
        href={`/project/${recommendedProject.id}`}
        className="block rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)] transition-shadow hover:shadow-[0_20px_60px_rgba(46,32,17,0.16)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          Recommended project
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground transition-colors hover:text-primary sm:text-5xl">
          {recommendedProject.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{recommendedProject.concept}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Feasibility</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {recommendedProject.feasibilityLevel}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Cost</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {recommendedProject.costLevel}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Complexity</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {recommendedProject.complexityLevel}
            </p>
          </div>
        </div>
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
          <h2 className="text-2xl font-semibold text-foreground">Pourquoi ce projet est pertinent</h2>
          <p className="mt-4 text-base leading-8 text-muted">{recommendedProject.whyItFits}</p>
          <p className="mt-4 text-base leading-8 text-muted">{recommendedProject.localWhy}</p>

          <h3 className="mt-8 text-xl font-semibold text-foreground">MVP suggere</h3>
          <p className="mt-3 text-base leading-8 text-muted">{recommendedProject.mvpSummary}</p>

          <h3 className="mt-8 text-xl font-semibold text-foreground">Top features</h3>
          <div className="mt-4 grid gap-3">
            {recommendedProject.topFeatures.map((feature) => (
              <div key={feature} className="rounded-2xl bg-accent-soft px-4 py-3 text-sm text-foreground">
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <section className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Problemes pertinents</h2>
            <div className="mt-5 grid gap-3">
              {result.relevantProblems.map((problem) => (
                <div key={problem} className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground">
                  {problem}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Prochain pas concret</h2>
            <p className="mt-4 text-base leading-8 text-muted">{recommendedProject.nextStep}</p>
          </section>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
          <h2 className="text-2xl font-semibold text-foreground">Roadmap 30 jours</h2>
          <div className="mt-6 grid gap-4">
            {Object.entries(recommendedProject.roadmap).map(([week, text]) => (
              <div key={week} className="rounded-[24px] bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{week}</p>
                <p className="mt-2 text-sm leading-7 text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <section className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Competences a renforcer</h2>
            <div className="mt-5 grid gap-3">
              {recommendedProject.skillsToLearn.map((skill) => (
                <div key={skill} className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-foreground">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Alternatives</h2>
            <div className="mt-5 grid gap-4">
              {result.ideas.slice(1).map((idea) => (
                <div key={idea.title} className="rounded-[24px] border border-border bg-white/80 p-5">
                  <p className="text-base font-semibold text-foreground">{idea.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{idea.concept}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
