import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TransformationOutput } from "@/lib/recommendation/transformation-engine";

export default function ResultsRealPage() {
  const router = useRouter();
  const [transformation, setTransformation] = useState<TransformationOutput | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "roadmap" | "flashcards" | "financial" | "actions">("overview");
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("transformation");
    if (stored) {
      setTransformation(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!transformation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos résultats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-lg font-bold text-blue-900 hidden sm:block">
              Problem to Project Africa
            </h1>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Retour
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{transformation.projectTitle}</h1>
          <p className="text-xl text-gray-600 mb-6">{transformation.vision}</p>
          <div className="flex gap-4">
            <button
              onClick={() => alert("PDF téléchargé")}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              📥 Télécharger le Rapport
            </button>
            <button
              onClick={() => alert("Partagé")}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              🔗 Partager
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-300 flex gap-4 overflow-x-auto">
          {[
            { id: "overview", label: "Vue d'ensemble" },
            { id: "roadmap", label: "Roadmap" },
            { id: "flashcards", label: "Flashcards" },
            { id: "financial", label: "Finances" },
            { id: "actions", label: "Actions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Opportunités</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transformation.opportunities.map((opp, idx) => (
                    <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-gray-900">✨ {opp}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Risques et Stratégies</h2>
                <div className="space-y-4">
                  {transformation.risks.map((risk, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{risk.risk}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          risk.probability > 70 ? "bg-red-100 text-red-800" :
                          risk.probability > 50 ? "bg-orange-100 text-orange-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {risk.probability}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Contingence:</strong> {risk.contingency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Roadmap Tab */}
          {activeTab === "roadmap" && (
            <div className="space-y-6">
              {transformation.roadmap.map((phase, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {phase.phase}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      <p className="text-sm text-gray-600">{phase.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Objectifs</h4>
                      <ul className="space-y-1">
                        {phase.objectives.map((obj, i) => (
                          <li key={i} className="text-sm text-gray-700">✓ {obj}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Livrables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((del, i) => (
                          <li key={i} className="text-sm text-gray-700">📦 {del}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Ressources:</strong> {phase.resources.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Flashcards Tab */}
          {activeTab === "flashcards" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-8 text-white min-h-64 flex flex-col justify-between">
                <div>
                  <p className="text-sm opacity-80 mb-2">
                    Flashcard {currentFlashcardIndex + 1} / {transformation.flashcards.length}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">
                    {transformation.flashcards[currentFlashcardIndex].question}
                  </h3>
                </div>
                <p className="text-lg">
                  {transformation.flashcards[currentFlashcardIndex].answer}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
                <ul className="space-y-2">
                  {transformation.flashcards[currentFlashcardIndex].tips.map((tip, idx) => (
                    <li key={idx} className="text-gray-700">• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() =>
                    setCurrentFlashcardIndex(
                      (prev) => (prev - 1 + transformation.flashcards.length) % transformation.flashcards.length
                    )
                  }
                  className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                >
                  ← Précédent
                </button>
                <button
                  onClick={() =>
                    setCurrentFlashcardIndex((prev) => (prev + 1) % transformation.flashcards.length)
                  }
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Capital de Démarrage</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {(transformation.financialPerspective.startupCost / 1000000).toFixed(1)}M XOF
                  </p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Point d'Équilibre</p>
                  <p className="text-3xl font-bold text-green-600">
                    {transformation.financialPerspective.breakEvenMonth} mois
                  </p>
                </div>
                <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Profit Mensuel</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {(transformation.financialPerspective.monthlyProfit / 1000).toFixed(0)}K XOF
                  </p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">ROI (3 ans)</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {transformation.financialPerspective.roi.toFixed(0)}%
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scénarios Financiers</h3>
                <div className="space-y-3">
                  {transformation.financialPerspective.scenarios.map((scenario, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                        <span className="text-sm text-gray-600">{scenario.probability}% probable</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Revenu/mois</p>
                          <p className="font-semibold text-gray-900">
                            {(scenario.monthlyRevenue / 1000).toFixed(0)}K XOF
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Point d'équilibre</p>
                          <p className="font-semibold text-gray-900">{scenario.breakEvenMonth} mois</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Profit/an</p>
                          <p className="font-semibold text-gray-900">
                            {(scenario.yearOneProfit / 1000000).toFixed(1)}M XOF
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions Tab */}
          {activeTab === "actions" && (
            <div className="space-y-4">
              {transformation.actionGuide.map((step, idx) => (
                <div key={idx} className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                        {step.week}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{step.action}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Responsable:</strong> {step.responsible}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Critère de succès:</strong> {step.successCriteria}
                      </p>
                      {step.resources.length > 0 && (
                        <p className="text-sm text-gray-600">
                          <strong>Ressources:</strong> {step.resources.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Prochaines Étapes</h2>
          <ol className="space-y-3">
            {transformation.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="font-bold">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
