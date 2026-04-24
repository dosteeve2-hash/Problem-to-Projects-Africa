import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Alert } from "@/components/ui/design-system";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: Intégrer avec Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });

      // Simulation pour démo
      if (!email || !password) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      // Redirection après succès
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Problem to Project Africa"
            width={60}
            height={60}
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-primary-800">
            Problem to Project
          </h1>
          <p className="text-neutral-600 text-sm">
            Transformez vos idées en projets viables
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Titre */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">Se Connecter</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Accédez à votre compte et continuez votre parcours
            </p>
          </div>

          {/* Erreur */}
          {error && (
            <Alert variant="error" title="Erreur">
              {error}
            </Alert>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            {/* Se souvenir de moi */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-neutral-300 text-primary-800 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600 cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            {/* Bouton */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Se Connecter
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-600">Ou</span>
            </div>
          </div>

          {/* Boutons sociaux */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="md">
              Google
            </Button>
            <Button variant="secondary" size="md">
              GitHub
            </Button>
          </div>

          {/* Lien inscription */}
          <div className="text-center text-sm">
            <span className="text-neutral-600">
              Pas encore de compte?{" "}
              <Link href="/auth/signup" className="text-primary-800 font-semibold hover:underline">
                S'inscrire
              </Link>
            </span>
          </div>

          {/* Lien mot de passe oublié */}
          <div className="text-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-neutral-600 hover:text-primary-800 transition"
            >
              Mot de passe oublié?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-neutral-600">
          <p>
            En vous connectant, vous acceptez nos{" "}
            <Link href="/legal/terms" className="text-primary-800 hover:underline">
              conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
