import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ResultsClient } from "@/components/results/results-client";

export default function ResultsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ResultsClient />
      </section>
      <SiteFooter />
    </main>
  );
}
