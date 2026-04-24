"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthButton() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <span className="h-9 w-20 animate-pulse rounded-full bg-muted-soft" />
    );
  }

  if (!user) {
    return (
      <a
        href="/login"
        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        Connexion
      </a>
    );
  }

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted">
        {user.email?.split("@")[0]}
      </span>
      <button
        onClick={handleLogout}
        className="rounded-full border border-border bg-white/75 px-3 py-1.5 text-xs font-semibold text-foreground"
      >
        Deconnexion
      </button>
    </div>
  );
}
