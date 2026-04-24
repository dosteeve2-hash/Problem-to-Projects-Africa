import { burkinaFasoContext } from "@/lib/context/burkina-faso";
import { projectCatalog } from "@/lib/recommendation/catalog";
import type { ProjectTemplate } from "@/lib/recommendation/catalog";
import type {
  ComplexityLevel,
  CostLevel,
  FeasibilityLevel,
  RecommendationInput,
  RecommendationResult,
} from "@/lib/types/recommendation";

// ── Scoring helpers ──────────────────────────────────────────

function sectorScore(template: ProjectTemplate, input: RecommendationInput): number {
  if (!input.preferredSector) return 0;
  if (template.sector.toLowerCase() === input.preferredSector.trim().toLowerCase()) return 30;
  // Handle "Health" vs "Sante" mapping
  if (
    (template.sector.toLowerCase() === "sante" && input.preferredSector.trim().toLowerCase() === "health") ||
    (template.sector.toLowerCase() === "health" && input.preferredSector.trim().toLowerCase() === "sante")
  ) {
    return 30;
  }
  return 0;
}

function modeScore(template: ProjectTemplate, input: RecommendationInput): number {
  if (template.mode === input.mode) return 25;
  return 0;
}

function skillOverlapScore(template: ProjectTemplate, input: RecommendationInput): number {
  if (!input.skills || input.skills.length === 0) return 0;
  const inputSkillsLower = input.skills.map((s) => s.toLowerCase());
  const tagMatches = template.tags.filter((tag) =>
    inputSkillsLower.some((skill) => skill.includes(tag) || tag.includes(skill)),
  ).length;
  const featureMatches = template.topFeatures.filter((f) =>
    inputSkillsLower.some((skill) => f.toLowerCase().includes(skill)),
  ).length;
  return Math.min((tagMatches + featureMatches) * 5, 20);
}

function textRelevanceScore(template: ProjectTemplate, input: RecommendationInput): number {
  const searchText = [input.idea, input.observedProblem, input.domain, input.goal]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (!searchText) return 0;

  const words = searchText.split(/\s+/).filter((w) => w.length > 3);
  const corpus = `${template.title} ${template.concept} ${template.problem} ${template.tags.join(" ")}`.toLowerCase();

  const hits = words.filter((word) => corpus.includes(word)).length;
  return Math.min(hits * 4, 20);
}

function preferenceScore(template: ProjectTemplate, input: RecommendationInput): number {
  const pref = input.projectPreference?.toLowerCase() ?? "";
  if (pref === "digital" && template.tags.some((t) => ["mobile", "sms", "whatsapp", "formulaire", "pwa"].includes(t)))
    return 5;
  if (pref === "operational" && template.tags.some((t) => ["terrain", "communaute", "coordination", "operations"].includes(t)))
    return 5;
  if (pref === "hybrid") return 3;
  return 0;
}

function scoreTemplate(template: ProjectTemplate, input: RecommendationInput): number {
  return (
    sectorScore(template, input) +
    modeScore(template, input) +
    skillOverlapScore(template, input) +
    textRelevanceScore(template, input) +
    preferenceScore(template, input)
  );
}

// ── Classification helpers ───────────────────────────────────

function computeFeasibility(level: string): FeasibilityLevel {
  const n = level.toLowerCase();
  if (n.includes("debut") || n.includes("begin")) return "beginner";
  if (n.includes("advanced") || n.includes("senior")) return "advanced";
  return "intermediate";
}

function computeCost(input: RecommendationInput): CostLevel {
  const p = input.projectPreference?.toLowerCase() ?? "";
  if (p.includes("digital") || p.includes("lean")) return "low";
  if (p.includes("operational")) return "medium";
  return "medium";
}

function computeComplexity(input: RecommendationInput): ComplexityLevel {
  if (input.mode === "problem") return "medium";
  if (input.idea && input.idea.length > 120) return "medium";
  return "low";
}

// ── Main export ──────────────────────────────────────────────

export function generateRecommendation(input: RecommendationInput): RecommendationResult {
  const scored = projectCatalog
    .map((template) => ({ template, score: scoreTemplate(template, input) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0].template;
  const alternatives = scored.slice(1, 4).map((s) => s.template);

  const feasibilityLevel = computeFeasibility(input.level);
  const costLevel = computeCost(input);
  const complexityLevel = computeComplexity(input);

  const region = input.region || "la zone cible";

  const relevantProblems = [
    best.problem,
    `Realite locale a respecter : ${burkinaFasoContext.realities[0]}.`,
    `Angle d'execution : commencer avec une solution adaptee a ${region} et au temps disponible (${input.timePerWeek || "non precise"}).`,
  ];

  if (input.observedProblem) {
    relevantProblems.unshift(`Probleme observe par l'utilisateur : ${input.observedProblem}`);
  }

  return {
    relevantProblems,
    ideas: [
      { title: best.title, concept: best.concept, localRelevance: best.localRelevance },
      ...alternatives.map((t) => ({
        title: t.title,
        concept: t.concept,
        localRelevance: t.localRelevance,
      })),
    ],
    recommendedProject: {
      id: best.id,
      title: best.title,
      concept: best.concept,
      whyItFits: `Ce projet correspond au mode ${input.mode}, s'aligne avec le secteur ${input.preferredSector || "choisi"}, et reste realiste pour un profil ${input.level || "non precise"} avec ${input.timePerWeek || "du temps limite"} disponible.`,
      localWhy: `${best.localRelevance} Cette recommandation respecte aussi les realites du Burkina Faso : ${burkinaFasoContext.realities[1].toLowerCase()}.`,
      feasibilityLevel,
      costLevel,
      complexityLevel,
      mvpSummary: best.mvpSummary,
      topFeatures: best.topFeatures,
      skillsToLearn: best.skillsToLearn,
      nextStep: best.nextStep,
      roadmap: {
        week1: `Clarifier l'utilisateur cible, mener 3 a 5 interviews terrain dans ${region}, et reduire le scope a une tranche concrete du probleme.`,
        week2: "Designer le flux MVP lean, ecrire le parcours utilisateur, et preparer la premiere version manuelle ou no-code si pertinent.",
        week3: "Tester le MVP avec les premiers utilisateurs dans un contexte local et documenter les points de friction et blocages d'adoption.",
        week4: "Affiner le concept, prioriser les prochaines fonctionnalites, et decider si on continue, pivote, ou resserre le projet.",
      },
    },
  };
}
