import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ModeCard } from "@/components/modes/mode-card";
import { MVP_MODES } from "@/lib/product";

export default function ModesPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Mode selection
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
            Choisis ton point de depart.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">
            Chaque mode adapte ensuite le formulaire et la logique de recommandation a ta
            situation actuelle.
          </p>
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
      <SiteFooter />
    </main>
  );
}
