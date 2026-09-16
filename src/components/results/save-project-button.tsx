"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { RecommendationResult } from "@/lib/types/recommendation";

interface SaveProjectButtonProps {
  result: RecommendationResult;
  sessionId: string;
}

export function SaveProjectButton({ result, sessionId }: SaveProjectButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        setError(
          "Sauvegarde indisponible : le projet Supabase n'est pas configuré.",
        );
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Vous devez être connecté pour sauvegarder un projet");
        router.push("/login");
        return;
      }

      // Insert the project recommendation into the database
      const { data: recommendation, error: insertError } = await supabase
        .from("project_recommendations")
        .insert({
          session_id: sessionId,
          title: result.recommendedProject.title,
          concept: result.recommendedProject.concept,
          why_it_fits: result.recommendedProject.whyItFits,
          local_why: result.recommendedProject.localWhy,
          feasibility_level: result.recommendedProject.feasibilityLevel,
          cost_level: result.recommendedProject.costLevel,
          complexity_level: result.recommendedProject.complexityLevel,
          mvp_summary: result.recommendedProject.mvpSummary,
          top_features: result.recommendedProject.topFeatures,
          skills_to_learn: result.recommendedProject.skillsToLearn,
          next_step: result.recommendedProject.nextStep,
          roadmap: result.recommendedProject.roadmap,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Save the project to the saved_projects table
      const { error: saveError } = await supabase.from("saved_projects").insert({
        user_id: user.id,
        recommendation_id: recommendation.id,
        status: "saved",
      });

      if (saveError) {
        throw saveError;
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Error saving project:", err);
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaved) {
    return (
      <div className="rounded-full bg-green-100 px-6 py-4 text-sm font-semibold text-green-700">
        ✓ Projet sauvegardé avec succès
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "Sauvegarde en cours..." : "Sauvegarder ce projet"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
