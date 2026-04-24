import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<"problem" | "idea" | "skills" | null>(null);

  const modes = [
    {
      id: "problem",
      title: "J'ai un Problème",
      description: "Vous avez identifié un problème local et vous voulez le transformer en projet viable.",
      icon: "🔍",
      color: "from-blue-600 to-blue-800",
      textColor: "text-blue-800",
    },
    {
      id: "idea",
      title: "J'ai une Idée",
      description: "Vous avez une idée de projet et vous voulez valider sa viabilité financière.",
      icon: "💡",
      color: "from-amber-500 to-orange-600",
      textColor: "text-orange-600",
    },
    {
      id: "skills",
      title: "J'ai des Compétences",
      description: "Vous avez des compétences et vous cherchez comment les valoriser en projet.",
      icon: "🎯",
      color: "from-green-500 to-teal-600",
      textColor: "text-teal-600",
    },
  ];

  const handleModeSelect = (mode: "problem" | "idea" | "skills") => {
    setSelectedMode(mode);
    router.push(`/intake?mode=${mode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary-800">Problem to Project Africa</h1>
              <p className="text-xs text-neutral-500">Transforming Local Challenges into Viable Solutions</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-primary-800 hover:bg-primary-50 rounded-lg transition"
            >
              Dashboard
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold text-primary-800 leading-tight">
                  Transformez vos Problèmes en Projets Viables
                </h2>
                <p className="text-xl text-neutral-600">
                  Une plateforme d'incubation spécialisée pour les entrepreneurs du Burkina Faso
                </p>
              </div>

              <p className="text-lg text-neutral-700 leading-relaxed">
                Que vous ayez identifié un problème local, une idée brillante, ou des compétences à valoriser,
                nous vous aidons à transformer votre vision en un projet rentable et impactant.
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleModeSelect("problem")}
                  className="px-8 py-3 bg-gradient-to-r from-primary-800 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition"
                >
                  Commencer →
                </button>
                <Link
                  href="#features"
                  className="px-8 py-3 border-2 border-primary-800 text-primary-800 font-semibold rounded-lg hover:bg-primary-50 transition"
                >
                  En Savoir Plus
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-500">45+</p>
                  <p className="text-sm text-neutral-600">Projets Analysés</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-500">80%</p>
                  <p className="text-sm text-neutral-600">Viabilité Moyenne</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-500">100%</p>
                  <p className="text-sm text-neutral-600">Données Locales</p>
                </div>
              </div>
            </div>

            {/* Right: Image/Illustration */}
            <div className="relative h-96 sm:h-full">
              <Image
                src="/logo.png"
                alt="Problem to Project Africa"
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mode Selection */}
      <section id="modes" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
              Par Où Commencer?
            </h2>
            <p className="text-lg text-neutral-600">
              Choisissez le mode qui correspond à votre situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modes.map((mode) => (
              <div
                key={mode.id}
                onClick={() => handleModeSelect(mode.id as any)}
                className="group cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition`}>
                  {mode.icon}
                </div>
                <h3 className={`text-2xl font-bold ${mode.textColor} mb-3`}>
                  {mode.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {mode.description}
                </p>
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${mode.textColor}`}>
                  Commencer →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
              Ce Que Vous Obtenez
            </h2>
            <p className="text-lg text-neutral-600">
              Une analyse complète et personnalisée pour votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Analyse Financière",
                description: "Projections détaillées, budget de démarrage, point d'équilibre",
                icon: "📊",
              },
              {
                title: "Évaluation des Risques",
                description: "Identification des risques et stratégies d'atténuation",
                icon: "⚠️",
              },
              {
                title: "Roadmap Personnalisée",
                description: "Plan d'action étape par étape pour réussir",
                icon: "🗺️",
              },
              {
                title: "Données Burkina Faso",
                description: "Basé sur les données économiques réelles du terrain",
                icon: "📍",
              },
              {
                title: "Recommandations",
                description: "Conseils pratiques adaptés à votre contexte local",
                icon: "💡",
              },
              {
                title: "Support Continu",
                description: "Accès à des mentors et à la communauté d'entrepreneurs",
                icon: "🤝",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-primary-800 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-800 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Prêt à Transformer Votre Idée?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Commencez maintenant et obtenez une analyse complète de votre projet en quelques minutes.
          </p>
          <button
            onClick={() => handleModeSelect("idea")}
            className="px-8 py-4 bg-white text-primary-800 font-bold rounded-lg hover:bg-blue-50 transform hover:scale-105 transition shadow-lg"
          >
            Commencer Maintenant →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Problem to Project Africa</h3>
              <p className="text-neutral-400 text-sm">
                Transforming local challenges into scalable solutions that build a better Africa.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="#" className="hover:text-white">Accueil</Link></li>
                <li><Link href="#" className="hover:text-white">Intake</Link></li>
                <li><Link href="#" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="#" className="hover:text-white">Guide</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="#" className="hover:text-white">Conditions</Link></li>
                <li><Link href="#" className="hover:text-white">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2026 Problem to Project Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
