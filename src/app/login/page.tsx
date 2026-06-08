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
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Vérifie ta boîte mail</h2>
        <p className="text-slate-400 text-sm mb-2">
          On a envoyé un lien de connexion à{" "}
          <span className="text-amber-300 font-medium">{email}</span>
        </p>
        <p className="text-slate-500 text-xs">
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
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full">
        {loading ? "Envoi en cours..." : "Recevoir le lien de connexion"}
      </Button>

      <p className="text-center text-xs text-slate-600">
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
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 mb-4">
            <Zap className="h-6 w-6 text-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">
            Connexion à P2P Africa
          </h1>
          <p className="text-sm text-slate-400">
            Connecte-toi pour sauvegarder et retrouver tes projets.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <Suspense fallback={<div className="text-slate-400 text-sm">Chargement...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
