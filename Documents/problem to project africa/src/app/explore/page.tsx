import Link from "next/link";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { projectCatalog } from "@/lib/recommendation/catalog";
import { SUPPORTED_SECTORS } from "@/lib/product";

export default function ExplorePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Explorer
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Catalogue de projets.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Parcours les {projectCatalog.length} projets du catalogue, filtres par secteur.
            Chaque projet est ancre dans le contexte du Burkina Faso.
          </p>
        </div>

        {SUPPORTED_SECTORS.map((sector) => {
          const projects = projectCatalog.filter(
            (p) => p.sector.toLowerCase() === sector.toLowerCase(),
          );
          if (projects.length === 0) return null;

          return (
            <div key={sector} className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground">{sector}</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/project/${project.id}`}
                    className="group flex flex-col gap-3 rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)] transition-shadow hover:shadow-[0_20px_60px_rgba(46,32,17,0.16)]"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {project.mode}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-7 text-muted">
                      {project.concept}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <SiteFooter />
    </main>
  );
}
