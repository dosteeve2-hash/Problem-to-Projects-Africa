import { useRouter } from "next/router";
import Image from "next/image";

export default function HomeRealPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-xl font-bold text-blue-900">Problem to Project Africa</h1>
              <p className="text-xs text-gray-600">Transformez vos idées en réalité</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/account")}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Mon Compte
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transformez Vos Problèmes et Idées en Projets Viables
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Vous avez un problème à résoudre? Une idée brillante? Des compétences à valoriser? 
              Nous vous aidons à créer une roadmap claire, des perspectives financières réalistes 
              et un plan d'action pour transformer vos ambitions en réalité.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/intake-real?mode=problem")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                J'ai un Problème →
              </button>
              <button
                onClick={() => router.push("/intake-real?mode=idea")}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
              >
                J'ai une Idée →
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-orange-400 rounded-lg shadow-xl flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Hero"
                width={200}
                height={200}
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Comment Ça Marche?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 border-2 border-blue-200 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Répondez aux Questions</h4>
              <p className="text-gray-600">
                Répondez à des questions intelligentes adaptées à votre situation (problème, idée ou compétences).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 border-2 border-orange-200 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Recevez l'Analyse</h4>
              <p className="text-gray-600">
                Obtenez une analyse complète avec roadmap, flashcards, perspectives financières et plan d'action.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 border-2 border-green-200 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Passez à l'Action</h4>
              <p className="text-gray-600">
                Suivez votre plan d'action semaine par semaine et transformez votre vision en réalité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Choisissez Votre Mode
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mode Problème */}
          <div
            onClick={() => router.push("/intake-real?mode=problem")}
            className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h4 className="text-2xl font-bold text-blue-900 mb-3">J'ai un Problème</h4>
            <p className="text-blue-800 mb-6">
              Vous avez identifié un problème local que vous voulez résoudre? Transformez-le en projet viable.
            </p>
            <div className="space-y-2 text-sm text-blue-800">
              <p>✓ Analyser le problème</p>
              <p>✓ Évaluer la viabilité</p>
              <p>✓ Créer une roadmap</p>
              <p>✓ Obtenir un plan d'action</p>
            </div>
            <button className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Commencer →
            </button>
          </div>

          {/* Mode Idée */}
          <div
            onClick={() => router.push("/intake-real?mode=idea")}
            className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-300 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">💡</div>
            <h4 className="text-2xl font-bold text-orange-900 mb-3">J'ai une Idée</h4>
            <p className="text-orange-800 mb-6">
              Vous avez une idée de projet? Validez-la et obtenez un plan complet pour la réaliser.
            </p>
            <div className="space-y-2 text-sm text-orange-800">
              <p>✓ Valider le marché</p>
              <p>✓ Analyser la concurrence</p>
              <p>✓ Projections financières</p>
              <p>✓ Stratégie de lancement</p>
            </div>
            <button className="mt-6 w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
              Commencer →
            </button>
          </div>

          {/* Mode Compétences */}
          <div
            onClick={() => router.push("/intake-real?mode=skills")}
            className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-300 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h4 className="text-2xl font-bold text-green-900 mb-3">J'ai des Compétences</h4>
            <p className="text-green-800 mb-6">
              Vous avez des compétences? Découvrez comment les valoriser et créer un projet rentable.
            </p>
            <div className="space-y-2 text-sm text-green-800">
              <p>✓ Identifier vos forces</p>
              <p>✓ Trouver des opportunités</p>
              <p>✓ Modèles de monétisation</p>
              <p>✓ Plan de croissance</p>
            </div>
            <button className="mt-6 w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              Commencer →
            </button>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-16">
            Ce Que Vous Recevez
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="text-xl font-bold mb-2">Roadmap Détaillée</h4>
              <p className="text-sm opacity-90">4 phases claires avec objectifs, livrables et jalons</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="text-xl font-bold mb-2">Flashcards</h4>
              <p className="text-sm opacity-90">Apprentissage interactif sur le marché, finances et opérations</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-xl font-bold mb-2">Perspectives Financières</h4>
              <p className="text-sm opacity-90">Scénarios réalistes et projections de rentabilité</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">📋</div>
              <h4 className="text-xl font-bold mb-2">Plan d'Action</h4>
              <p className="text-sm opacity-90">Guide semaine par semaine pour démarrer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-6">
          Prêt à Transformer Votre Vision en Réalité?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez des centaines d'entrepreneurs et d'innovateurs qui utilisent Problem to Project Africa 
          pour créer des projets viables et impactants.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/intake-real?mode=problem")}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg"
          >
            Commencer Maintenant
          </button>
          <button
            onClick={() => alert("Contactez-nous: support@problemtoproject.africa")}
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-lg"
          >
            Nous Contacter
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Problem to Project Africa</h4>
              <p className="text-gray-400 text-sm">
                Transformez les problèmes locaux en projets viables et impactants.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Accueil</a></li>
                <li><a href="#" className="hover:text-white">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-white">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Conditions</a></li>
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Problem to Project Africa. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
