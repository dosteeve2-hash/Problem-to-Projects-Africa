import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user's recommendation sessions with their recommendations
  const { data: sessions } = await supabase
    .from("recommendation_sessions")
    .select(`
      id,
      mode,
      country,
      region,
      created_at,
      project_recommendations (
        id,
        title,
        concept,
        feasibility_level,
        cost_level,
        complexity_level,
        mvp_summary,
        next_step
      )
    `)
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const hasData = sessions && sessions.length > 0;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Dashboard
          </p>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Historique des recommandations.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            Retrouve toutes tes recommandations de projets generees precedemment.
          </p>
        </div>

        <div className="mt-10">
          {!hasData ? (
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
              <h2 className="text-2xl font-semibold text-foreground">
                Aucune recommandation sauvegardee.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                Lance un diagnostic depuis le formulaire pour generer ta premiere
                recommandation de projet. Elle sera automatiquement sauvegardee ici.
              </p>
              <Link
                href="/modes"
                className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
              >
                Choisir un mode
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => {
                const rec = (
                  session.project_recommendations as Array<{
                    id: string;
                    title: string;
                    concept: string;
                    feasibility_level: string;
                    cost_level: string;
                    complexity_level: string;
                    mvp_summary: string;
                    next_step: string;
                  }>
                )?.[0];
                const date = new Date(session.created_at).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                );

                return (
                  <article
                    key={session.id}
                    className="flex flex-col gap-4 rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                          {session.mode} mode
                        </span>
                        <span className="text-xs text-muted">{date}</span>
                      </div>
                      <h2 className="mt-2 text-xl font-semibold text-foreground">
                        {rec?.title ?? "Recommandation"}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-sm leading-7 text-muted">
                        {rec?.concept ?? ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      <span className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold text-primary">
                        {rec?.feasibility_level ?? session.mode}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
