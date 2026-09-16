import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { DashboardInteractive } from "@/components/dashboard/dashboard-interactive";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Le middleware protège déjà /dashboard, mais il se court-circuite quand les
  // variables Supabase manquent. Sans ce garde, `user!.id` plantait la page.
  if (!user) redirect("/login?redirect=/dashboard");

  // Fetch user's recommendation sessions with their recommendations
  const { data: sessions } = await supabase
    .from("recommendation_sessions")
    .select(`
      id,
      mode,
      country,
      region,
      input_payload,
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
    .eq("user_id", user.id)
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
            Retrouve toutes tes recommandations de projets generees precedemment. Tu peux modifier les parametres et re-generer pour obtenir de meilleures recommandations.
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
            <div className="grid gap-8">
              {sessions.map((session) => {
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
                  <div key={session.id} className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {session.mode} mode
                      </span>
                      <span className="text-xs text-muted">{date}</span>
                    </div>
                    <DashboardInteractive session={session} />
                  </div>
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
