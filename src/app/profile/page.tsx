import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Profil
          </p>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Mon profil.
          </h1>
        </div>

        <div className="mt-10 grid gap-8">
          <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">Compte</h2>
            <div className="mt-6 grid gap-4">
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                <span className="text-sm text-muted">Email</span>
                <span className="text-sm font-medium text-foreground">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                <span className="text-sm text-muted">Membre depuis</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(user.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {profile ? (
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
              <h2 className="text-2xl font-semibold text-foreground">
                Informations
              </h2>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                  <span className="text-sm text-muted">Pays</span>
                  <span className="text-sm font-medium text-foreground">
                    {profile.country}
                  </span>
                </div>
                {profile.region && (
                  <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                    <span className="text-sm text-muted">Region</span>
                    <span className="text-sm font-medium text-foreground">
                      {profile.region}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                  <span className="text-sm text-muted">Domaine</span>
                  <span className="text-sm font-medium text-foreground">
                    {profile.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/80 px-5 py-4">
                  <span className="text-sm text-muted">Niveau</span>
                  <span className="text-sm font-medium text-foreground">
                    {profile.level}
                  </span>
                </div>
                {profile.skills && profile.skills.length > 0 && (
                  <div className="rounded-2xl bg-white/80 px-5 py-4">
                    <span className="text-sm text-muted">Competences</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
              <h2 className="text-2xl font-semibold text-foreground">
                Profil incomplet
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">
                Complete ton profil en faisant un diagnostic. Tes informations
                seront automatiquement sauvegardees.
              </p>
              <Link
                href="/modes"
                className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
              >
                Commencer un diagnostic
              </Link>
            </div>
          )}

          <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">
              Raccourcis
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard"
                className="rounded-2xl border border-border bg-white/80 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-white"
              >
                Mes recommandations
              </Link>
              <Link
                href="/modes"
                className="rounded-2xl border border-border bg-white/80 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-white"
              >
                Nouveau diagnostic
              </Link>
              <Link
                href="/explore"
                className="rounded-2xl border border-border bg-white/80 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-white"
              >
                Explorer les projets
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
