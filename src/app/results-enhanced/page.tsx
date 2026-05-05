"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { EnhancedResultsDisplay } from "@/components/results/enhanced-results-display";
import type { ProjectAnalysis } from "@/lib/types/project-analysis";
import { Loader2 } from "lucide-react";

function EnhancedResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const projectId = searchParams.get("projectId");
    const analysisData = searchParams.get("data");

    if (analysisData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(analysisData));
        setAnalysis(parsed);
      } catch {
        setError("Erreur lors du chargement de l'analyse");
      }
    } else if (projectId) {
      // Charger depuis la base de données
      // fetch(`/api/projects/${projectId}`)...
    }

    setLoading(false);
  }, [searchParams]);

  const handleSave = async () => {
    if (!analysis) return;

    try {
      // Sauvegarder le projet
      const response = await fetch("/api/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysis),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      alert("Projet sauvegardé avec succès!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      alert("Erreur: " + message);
    }
  };

  const handleRefine = () => {
    router.push("/intake-enhanced");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p>Chargement de l&apos;analyse...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erreur</h1>
          <p className="text-gray-600 mb-4">{error || "Analyse non trouvée"}</p>
          <button
            onClick={() => router.push("/intake-enhanced")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour au formulaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedResultsDisplay
        analysis={analysis}
        onSave={handleSave}
        onRefine={handleRefine}
      />
    </div>
  );
}

export default function EnhancedResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p>Chargement...</p>
          </div>
        </div>
      }
    >
      <EnhancedResultsContent />
    </Suspense>
  );
}
