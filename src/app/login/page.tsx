import Link from "next/link";
import { Suspense } from "react";

import { AuthForm } from "@/components/auth/auth-form";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Connexion
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">
            Connecte-toi a ton compte.
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            Accede a ton historique de recommandations et tes projets sauvegardes.
          </p>
          <div className="mt-8">
            <Suspense>
              <AuthForm mode="login" />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="font-semibold text-primary">
              Creer un compte
            </Link>
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
