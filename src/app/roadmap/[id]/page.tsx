import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RoadmapPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: project } = await supabase
    .from("project_recommendations")
    .select("id, title, concept, roadmap, mvp_summary, top_features, skills_to_learn, next_step")
    .eq("id", id)
    .single();

  if (!project) {
    return (
      <main className="min-h-screen">
        <SiteHeader />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h1 className="text-3xl font-semibold text-foreground">
              Roadmap introuvable
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
              Ce projet n&apos;existe pas ou a ete supprime.
            </p>
            <Link
              href="/explore"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Explorer les projets
            </Link>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const roadmap = project.roadmap as Record<string, string>;
  const weekLabels: Record<string, string> = {
    week1: "Semaine 1",
    week2: "Semaine 2",
    week3: "Semaine 3",
    week4: "Semaine 4",
  };

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col gap-3">
          <Link
            href={`/project/${id}`}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-accent hover:text-primary transition-colors"
          >
            &larr; Retour au projet
          </Link>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Roadmap 30 jours.
          </h1>
          <p className="text-lg text-muted">{project.title}</p>
        </div>

        <div className="mt-10 grid gap-8">
          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">
              Plan d&apos;execution
            </h2>
            <div className="mt-6 grid gap-6">
              {Object.entries(roadmap).map(([key, text], index) => (
                <div key={key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    {index < Object.keys(roadmap).length - 1 && (
                      <div className="mt-2 flex-1 w-px bg-border" />
                    )}
                  </div>
                  <div className="flex-1 rounded-[24px] bg-white/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {weekLabels[key] ?? key}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-foreground">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">
              MVP suggere
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              {project.mvp_summary}
            </p>

            {project.top_features && project.top_features.length > 0 && (
              <>
                <h3 className="mt-8 text-xl font-semibold text-foreground">
                  Top features
                </h3>
                <div className="mt-4 grid gap-3">
                  {project.top_features.map((feature: string) => (
                    <div
                      key={feature}
                      className="rounded-2xl bg-accent-soft px-4 py-3 text-sm text-foreground"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {project.skills_to_learn && project.skills_to_learn.length > 0 && (
            <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
              <h2 className="text-2xl font-semibold text-foreground">
                Competences a developper
              </h2>
              <div className="mt-5 grid gap-3">
                {project.skills_to_learn.map((skill: string) => (
                  <div
                    key={skill}
                    className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
            <h2 className="text-2xl font-semibold text-foreground">
              Prochain pas concret
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              {project.next_step}
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
