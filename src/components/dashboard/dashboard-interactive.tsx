"use client";

import { useState } from "react";
import type { RecommendationInput } from "@/lib/types/recommendation";

type DashboardInteractiveProps = {
  session: {
    id: string;
    mode: string;
    country: string;
    region: string;
    input_payload: RecommendationInput;
    project_recommendations: Array<{
      id: string;
      title: string;
      concept: string;
      feasibility_level: string;
      cost_level: string;
      complexity_level: string;
      mvp_summary: string;
      next_step: string;
    }>;
  };
};

export function DashboardInteractive({ session }: DashboardInteractiveProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInput, setEditedInput] = useState<RecommendationInput>(session.input_payload);
  const [isRefining, setIsRefining] = useState(false);

  const rec = session.project_recommendations?.[0];

  async function handleRefine() {
    setIsRefining(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedInput),
      });

      if (!response.ok) {
        throw new Error("Failed to refine recommendation");
      }

      const payload = await response.json();
      window.sessionStorage.setItem("problem-to-project-africa:result", JSON.stringify(payload));
      window.location.href = "/results";
    } catch (error) {
      console.error("Error refining recommendation:", error);
      alert("Erreur lors de la re-génération. Veuillez réessayer.");
    } finally {
      setIsRefining(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Recommendation Card */}
      <div className="rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{rec?.title ?? "Recommandation"}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{rec?.concept ?? ""}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-semibold text-primary">
                {rec?.feasibility_level}
              </span>
              <span className="rounded-full border border-accent/20 bg-white/80 px-3 py-1 text-xs font-semibold text-accent">
                {rec?.cost_level}
              </span>
              <span className="rounded-full border border-muted/20 bg-white/80 px-3 py-1 text-xs font-semibold text-muted">
                {rec?.complexity_level}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          >
            {isEditing ? "Annuler" : "Modifier les inputs"}
          </button>
        </div>
      </div>

      {/* Inputs Editor */}
      {isEditing && (
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)]">
          <h3 className="text-lg font-semibold text-foreground">Modifier les paramètres</h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground">Région</label>
              <input
                type="text"
                value={editedInput.region || ""}
                onChange={(e) => setEditedInput({ ...editedInput, region: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
                placeholder="Ouagadougou, Bobo-Dioulasso..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Niveau</label>
              <select
                value={editedInput.level || ""}
                onChange={(e) => setEditedInput({ ...editedInput, level: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
              >
                <option value="">Choisir</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Domaine</label>
              <input
                type="text"
                value={editedInput.domain || ""}
                onChange={(e) => setEditedInput({ ...editedInput, domain: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
                placeholder="Dev web, produit, santé..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Secteur prioritaire</label>
              <select
                value={editedInput.preferredSector || ""}
                onChange={(e) => setEditedInput({ ...editedInput, preferredSector: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
              >
                <option>Agriculture</option>
                <option>Education</option>
                <option>Sante</option>
                <option>Commerce informel</option>
                <option>Energie</option>
                <option>Logistique</option>
                <option>Eau et Assainissement</option>
                <option>Artisanat et Tourisme</option>
                <option>Environnement</option>
                <option>Numerique et Inclusion</option>
                <option>Sante Mentale et Bien-etre</option>
                <option>Securite Alimentaire</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Temps disponible</label>
              <input
                type="text"
                value={editedInput.timePerWeek || ""}
                onChange={(e) => setEditedInput({ ...editedInput, timePerWeek: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
                placeholder="5h, 10h, week-ends..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Objectif</label>
              <input
                type="text"
                value={editedInput.goal || ""}
                onChange={(e) => setEditedInput({ ...editedInput, goal: e.target.value })}
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
                placeholder="Portfolio, impact local, startup..."
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground">Compétences</label>
            <textarea
              value={editedInput.skills?.join(", ") || ""}
              onChange={(e) =>
                setEditedInput({
                  ...editedInput,
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
              rows={3}
              placeholder="HTML, React, terrain, organisation..."
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleRefine}
              disabled={isRefining}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-strong disabled:opacity-70"
            >
              {isRefining ? "Re-génération en cours..." : "Re-générer la recommandation"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/80"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Input Summary */}
      {!isEditing && (
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)]">
          <h3 className="text-lg font-semibold text-foreground">Paramètres utilisés</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Région :</span>
              <span className="font-medium text-foreground">{editedInput.region || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Niveau :</span>
              <span className="font-medium text-foreground">{editedInput.level || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Domaine :</span>
              <span className="font-medium text-foreground">{editedInput.domain || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Secteur :</span>
              <span className="font-medium text-foreground">{editedInput.preferredSector || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Temps/semaine :</span>
              <span className="font-medium text-foreground">{editedInput.timePerWeek || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Compétences :</span>
              <span className="font-medium text-foreground">{editedInput.skills?.join(", ") || "-"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
