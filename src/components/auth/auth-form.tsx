"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const baseInputClasses =
  "w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:shadow-[0_0_0_4px_var(--ring)]";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Email et mot de passe requis.");
      return;
    }

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        setError(
          "Authentification indisponible : les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY ne sont pas définies.",
        );
        return;
      }

      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        setSuccess(
          "Compte cree. Verifie ton email pour confirmer ton inscription.",
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        router.push(redirect);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-foreground">Email</span>
        <input
          name="email"
          type="email"
          required
          className={baseInputClasses}
          placeholder="ton@email.com"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-foreground">Mot de passe</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className={baseInputClasses}
          placeholder="Minimum 6 caracteres"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-[rgba(180,63,32,0.18)] bg-[rgba(180,63,32,0.08)] px-4 py-3 text-sm text-foreground">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending
          ? "Chargement..."
          : mode === "login"
            ? "Se connecter"
            : "Creer un compte"}
      </button>
    </form>
  );
}
