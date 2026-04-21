import Link from "next/link";

import { IntakeForm } from "@/components/intake/intake-form";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

type IntakePageProps = {
  searchParams: Promise<{
    mode?: "skills" | "idea" | "problem";
  }>;
};

export default async function IntakePage({ searchParams }: IntakePageProps) {
  const { mode = "skills" } = await searchParams;

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Smart intake
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                Formulaire adaptatif pour le mode {mode}.
              </h1>
            </div>
            <Link href="/modes" className="text-sm font-semibold text-primary">
              Changer de mode
            </Link>
          </div>

          <div className="mt-8">
            <IntakeForm key={mode} mode={mode} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
