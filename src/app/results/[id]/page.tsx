import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ResultDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ResultDetailPage({
  params,
}: ResultDetailPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: session } = await supabase
    .from("recommendation_sessions")
    .select(
      `
      id,
      mode,
      country,
      region,
      created_at,
      project_recommendations (
        id,
        title,
        concept,
        why_it_fits,
        local_why,
        feasibility_level,
        cost_level,
        complexity_level,
        mvp_summary,
        top_features,
        skills_to_learn,
        next_step,
        roadmap
      ),
      project_alternatives (
        id,
        title,
        concept,
        local_relevance
      )
    `
    )
    .eq("id", id)
    .single();

  if (!session) {
    return (
      <main className="min-h-screen">
        <SiteHeader />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h1 className="text-3xl font-semibold text-foreground">
              Resultat introuvable
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              Cette session de recommandation n&apos;existe pas ou a ete
              supprimee.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Retour au dashboard
            </Link>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const recommendations = (session.project_recommendations ?? []) as Array<{
    id: string;
    title: string;
    concept: string;
    why_it_fits: string;
    local_why: string;
    feasibility_level: string;
    cost_level: string;
    complexity_level: string;
    mvp_summary: string;
    top_features: string[];
    skills_to_learn: string[];
    next_step: string;
    roadmap: Record<string, string>;
  }>;

  const alternatives = (session.project_alternatives ?? []) as Array<{
    id: string;
    title: string;
    concept: string;
    local_relevance: string;
  }>;

  const recommended = recommendations[0];
  const date = new Date(session.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-accent hover:text-primary transition-colors"
          >
            &larr; Retour au dashboard
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {session.mode} mode
            </span>
            <span className="text-xs text-muted">{date}</span>
            <span className="text-xs text-muted">
              {session.country}
              {session.region ? `, ${session.region}` : ""}
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Resultats de recommandation.
          </h1>
        </div>

        {recommended ? (
          <div className="mt-10 grid gap-8">
            <Link
              href={`/project/${recommended.id}`}
              className="block rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)] transition-shadow hover:shadow-[0_20px_60px_rgba(46,32,17,0.16)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Projet recommande
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground transition-colors hover:text-primary sm:text-4xl">
                {recommended.title}
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {recommended.concept}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Faisabilite
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {recommended.feasibility_level}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Cout
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {recommended.cost_level}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Complexite
                  </p>
                  <p className="mt-2 text-base font-semibold text-foreground">
                    {recommended.complexity_level}
                  </p>
                </div>
              </div>
            </Link>

            <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
                <h2 className="text-2xl font-semibold text-foreground">
                  Pourquoi ce projet
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">
                  {recommended.why_it_fits}
                </p>
                <p className="mt-4 text-base leading-8 text-muted">
                  {recommended.local_why}
                </p>

                <h3 className="mt-8 text-xl font-semibold text-foreground">
                  MVP suggere
                </h3>
                <p className="mt-3 text-base leading-8 text-muted">
                  {recommended.mvp_summary}
                </p>
              </div>

              <div className="grid gap-8">
                <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Prochain pas
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted">
                    {recommended.next_step}
                  </p>
                  <Link
                    href={`/roadmap/${recommended.id}`}
                    className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
                  >
                    Voir le roadmap complet
                  </Link>
                </div>
              </div>
            </section>

            {alternatives.length > 0 && (
              <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
                <h2 className="text-2xl font-semibold text-foreground">
                  Alternatives
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {alternatives.map((alt) => (
                    <div
                      key={alt.id}
                      className="rounded-[24px] border border-border bg-white/80 p-5"
                    >
                      <p className="text-base font-semibold text-foreground">
                        {alt.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {alt.concept}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">
              Aucune recommandation
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Cette session n&apos;a pas encore de recommandation generee.
            </p>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
