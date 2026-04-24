"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type {
  RecommendationInput,
  RecommendationMode,
  RecommendationResult,
} from "@/lib/types/recommendation";
import { saveToHistory } from "@/components/dashboard/dashboard-client";

type IntakeFormProps = {
  mode: RecommendationMode;
};

const STORAGE_KEY = "problem-to-project-africa:intake";

const initialStateByMode: Record<RecommendationMode, RecommendationInput> = {
  skills: {
    country: "Burkina Faso",
    region: "",
    mode: "skills",
    level: "",
    domain: "",
    skills: [],
    preferredSector: "Education",
    timePerWeek: "",
    goal: "",
    projectPreference: "digital",
    tools: "",
    projectType: "",
    idea: "",
    observedProblem: "",
    targetAudience: "",
    constraints: "",
    resources: "",
  },
  idea: {
    country: "Burkina Faso",
    region: "",
    mode: "idea",
    level: "",
    domain: "",
    skills: [],
    preferredSector: "Education",
    timePerWeek: "",
    goal: "",
    projectPreference: "hybrid",
    tools: "",
    projectType: "",
    idea: "",
    observedProblem: "",
    targetAudience: "",
    constraints: "",
    resources: "",
  },
  problem: {
    country: "Burkina Faso",
    region: "",
    mode: "problem",
    level: "",
    domain: "",
    skills: [],
    preferredSector: "Agriculture",
    timePerWeek: "",
    goal: "",
    projectPreference: "hybrid",
    tools: "",
    projectType: "",
    idea: "",
    observedProblem: "",
    targetAudience: "",
    constraints: "",
    resources: "",
  },
};

function Field({
  label,
  children,
  helper,
}: {
  label: string;
  children: React.ReactNode;
  helper?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {helper ? <span className="text-xs text-muted">{helper}</span> : null}
    </label>
  );
}

const baseInputClasses =
  "w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:shadow-[0_0_0_4px_var(--ring)]";

export function IntakeForm({ mode }: IntakeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<RecommendationInput>(() => {
    if (typeof window === "undefined") {
      return initialStateByMode[mode];
    }

    const raw = window.localStorage.getItem(`${STORAGE_KEY}:${mode}`);
    if (!raw) {
      return initialStateByMode[mode];
    }

    try {
      const parsed = JSON.parse(raw) as RecommendationInput;
      return { ...initialStateByMode[mode], ...parsed, mode };
    } catch {
      return initialStateByMode[mode];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(`${STORAGE_KEY}:${mode}`, JSON.stringify(form));
  }, [form, mode]);

  function updateField<K extends keyof RecommendationInput>(key: K, value: RecommendationInput[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error ?? "Recommendation request failed.");
        }

        const payload = (await response.json()) as {
          result: RecommendationResult;
          generatedAt: string;
        };

        window.sessionStorage.setItem("problem-to-project-africa:result", JSON.stringify(payload));
        saveToHistory({ result: payload.result, generatedAt: payload.generatedAt, mode: form.mode });
        router.push("/results");
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "Une erreur est survenue pendant la generation.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Pays">
          <input
            className={baseInputClasses}
            value={form.country}
            onChange={(event) => updateField("country", event.target.value)}
          />
        </Field>
        <Field label="Ville ou region">
          <input
            className={baseInputClasses}
            placeholder="Ouagadougou, Bobo-Dioulasso, Koudougou..."
            value={form.region}
            onChange={(event) => updateField("region", event.target.value)}
          />
        </Field>
        <Field label="Niveau actuel">
          <select
            className={baseInputClasses}
            value={form.level}
            onChange={(event) => updateField("level", event.target.value)}
          >
            <option value="">Choisir</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </Field>
        <Field label="Domaine principal">
          <input
            className={baseInputClasses}
            placeholder="Dev web, produit, sante, agriculture..."
            value={form.domain}
            onChange={(event) => updateField("domain", event.target.value)}
          />
        </Field>
        <Field label="Secteur prioritaire">
          <select
            className={baseInputClasses}
            value={form.preferredSector}
            onChange={(event) => updateField("preferredSector", event.target.value)}
          >
            <option>Agriculture</option>
            <option>Education</option>
            <option value="Sante">Sante</option>
            <option>Commerce informel</option>
            <option>Energie</option>
            <option>Logistique</option>
          </select>
        </Field>
        <Field label="Temps disponible par semaine">
          <input
            className={baseInputClasses}
            placeholder="5h, 10h, week-ends..."
            value={form.timePerWeek}
            onChange={(event) => updateField("timePerWeek", event.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Competences"
        helper="Separe par des virgules. Exemple: HTML, React, terrain, organisation."
      >
        <textarea
          className={`${baseInputClasses} min-h-28`}
          value={form.skills.join(", ")}
          onChange={(event) =>
            updateField(
              "skills",
              event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Objectif">
          <input
            className={baseInputClasses}
            placeholder="Portfolio, impact local, startup..."
            value={form.goal}
            onChange={(event) => updateField("goal", event.target.value)}
          />
        </Field>
        <Field label="Preference de projet">
          <select
            className={baseInputClasses}
            value={form.projectPreference}
            onChange={(event) => updateField("projectPreference", event.target.value)}
          >
            <option value="digital">Digital</option>
            <option value="hybrid">Hybrid</option>
            <option value="operational">Operational</option>
            <option value="lean">Lean MVP</option>
          </select>
        </Field>
      </div>

      {mode === "skills" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Outils deja maitrises">
            <input
              className={baseInputClasses}
              placeholder="React, Excel, WhatsApp, Figma..."
              value={form.tools ?? ""}
              onChange={(event) => updateField("tools", event.target.value)}
            />
          </Field>
          <Field label="Type de projet vise">
            <input
              className={baseInputClasses}
              placeholder="Portfolio, side-project, startup..."
              value={form.projectType ?? ""}
              onChange={(event) => updateField("projectType", event.target.value)}
            />
          </Field>
        </div>
      ) : null}

      {mode === "idea" ? (
        <div className="grid gap-6">
          <Field label="Idee brute">
            <textarea
              className={`${baseInputClasses} min-h-32`}
              placeholder="Decris l'idee telle qu'elle existe aujourd'hui."
              value={form.idea ?? ""}
              onChange={(event) => updateField("idea", event.target.value)}
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Public cible">
              <input
                className={baseInputClasses}
                value={form.targetAudience ?? ""}
                onChange={(event) => updateField("targetAudience", event.target.value)}
              />
            </Field>
            <Field label="Contraintes deja identifiees">
              <input
                className={baseInputClasses}
                value={form.constraints ?? ""}
                onChange={(event) => updateField("constraints", event.target.value)}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {mode === "problem" ? (
        <div className="grid gap-6">
          <Field label="Probleme observe">
            <textarea
              className={`${baseInputClasses} min-h-32`}
              placeholder="Decris le probleme observe sur le terrain."
              value={form.observedProblem ?? ""}
              onChange={(event) => updateField("observedProblem", event.target.value)}
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Qui est touche ?">
              <input
                className={baseInputClasses}
                value={form.targetAudience ?? ""}
                onChange={(event) => updateField("targetAudience", event.target.value)}
              />
            </Field>
            <Field label="Ressources deja disponibles">
              <input
                className={baseInputClasses}
                value={form.resources ?? ""}
                onChange={(event) => updateField("resources", event.target.value)}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-[rgba(180,63,32,0.18)] bg-[rgba(180,63,32,0.08)] px-4 py-3 text-sm text-foreground">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 rounded-[28px] border border-border bg-card-strong p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Resultat attendu</p>
          <p className="mt-1 text-sm leading-7 text-muted">
            Problemes pertinents, idees de projet, recommandation finale, MVP et roadmap 30 jours.
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Generation en cours..." : "Generer mon projet"}
        </button>
      </div>
    </form>
  );
}
