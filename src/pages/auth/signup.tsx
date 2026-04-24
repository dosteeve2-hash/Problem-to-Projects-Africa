import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Alert, Progress } from "@/components/ui/design-system";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = calculatePasswordStrength(formData.password);

  function calculatePasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validations
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }

      if (formData.password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères");
        return;
      }

      if (!formData.acceptTerms) {
        setError("Vous devez accepter les conditions d'utilisation");
        return;
      }

      // TODO: Intégrer avec Supabase Auth
      // const { data, error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       firstName: formData.firstName,
      //       lastName: formData.lastName,
      //     },
      //   },
      // });

      // Simulation pour démo
      setTimeout(() => {
        router.push("/auth/verify-email");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4 py-8">
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
            Rejoignez notre communauté d'entrepreneurs
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Titre */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">S'inscrire</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Créez votre compte et commencez votre parcours
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
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Prénom"
                type="text"
                placeholder="Jean"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <Input
                label="Nom"
                type="text"
                placeholder="Dupont"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="vous@exemple.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            {/* Mot de passe */}
            <div>
              <Input
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                helperText="Minimum 8 caractères"
              />
              {formData.password && (
                <div className="mt-2">
                  <Progress
                    value={passwordStrength}
                    label="Force du mot de passe"
                    variant={
                      passwordStrength < 50
                        ? "error"
                        : passwordStrength < 75
                          ? "warning"
                          : "success"
                    }
                  />
                </div>
              )}
            </div>

            {/* Confirmer mot de passe */}
            <Input
              label="Confirmer le mot de passe"
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            {/* Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-neutral-300 text-primary-800 cursor-pointer mt-1"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-neutral-600 cursor-pointer">
                J'accepte les{" "}
                <Link href="/legal/terms" className="text-primary-800 hover:underline">
                  conditions d'utilisation
                </Link>
                {" "}et la{" "}
                <Link href="/legal/privacy" className="text-primary-800 hover:underline">
                  politique de confidentialité
                </Link>
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
              S'inscrire
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

          {/* Lien connexion */}
          <div className="text-center text-sm">
            <span className="text-neutral-600">
              Vous avez déjà un compte?{" "}
              <Link href="/auth/login" className="text-primary-800 font-semibold hover:underline">
                Se connecter
              </Link>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-neutral-600">
          <p>
            Nous respectons votre vie privée. Consultez notre{" "}
            <Link href="/legal/privacy" className="text-primary-800 hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
