"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Zap, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") ?? "/dashboard"

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email.trim()) {
      setError("Entre ton adresse email")
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    })

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center">
        <div
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
          style={{ background: "rgba(34,217,138,0.1)", border: "1px solid rgba(34,217,138,0.2)" }}
        >
          <CheckCircle className="h-8 w-8" style={{ color: "var(--green)" }} />
        </div>
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          Vérifie ta boîte mail
        </h2>
        <p className="text-sm mb-2" style={{ color: "var(--text2)" }}>
          On a envoyé un lien de connexion à{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{email}</span>
        </p>
        <p className="text-xs" style={{ color: "var(--text3)" }}>
          Clique sur le lien dans l'email pour te connecter. Pas de mot de passe requis.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Adresse email"
        type="email"
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      {error && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)" }}
        >
          <p className="text-sm" style={{ color: "var(--red)" }}>{error}</p>
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Envoi en cours..." : "Recevoir le lien de connexion"}
      </Button>

      <p className="text-center text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
        Pas de mot de passe. Un lien magique sera envoyé à ton email.
      </p>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
            style={{ background: "var(--gold)" }}
          >
            <Zap className="h-6 w-6" style={{ color: "var(--bg)" }} />
          </div>
          <h1
            className="text-2xl font-extrabold mb-2"
            style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            Connexion à P2P Africa
          </h1>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            Connecte-toi pour sauvegarder et retrouver tes projets.
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ border: "1px solid var(--border2)", background: "var(--bg3)" }}
        >
          <Suspense fallback={<div className="text-sm" style={{ color: "var(--text2)" }}>Chargement...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
