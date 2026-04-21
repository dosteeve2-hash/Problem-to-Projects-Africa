export type RecommendationMode = "skills" | "idea" | "problem";

export type FeasibilityLevel = "beginner" | "intermediate" | "advanced";
export type CostLevel = "low" | "medium" | "high";
export type ComplexityLevel = "low" | "medium" | "high";

export type RecommendationInput = {
  country: string;
  region: string;
  mode: RecommendationMode;
  level: string;
  domain: string;
  skills: string[];
  preferredSector: string;
  timePerWeek: string;
  goal: string;
  projectPreference: string;
  targetAudience?: string;
  constraints?: string;
  resources?: string;
  tools?: string;
  projectType?: string;
  idea?: string;
  observedProblem?: string;
};

export type ProjectOption = {
  title: string;
  concept: string;
  localRelevance: string;
};

export type ProjectRecommendation = {
  id: string;
  title: string;
  concept: string;
  whyItFits: string;
  localWhy: string;
  feasibilityLevel: FeasibilityLevel;
  costLevel: CostLevel;
  complexityLevel: ComplexityLevel;
  mvpSummary: string;
  topFeatures: string[];
  skillsToLearn: string[];
  nextStep: string;
  roadmap: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
};

export type RecommendationResult = {
  relevantProblems: string[];
  ideas: ProjectOption[];
  recommendedProject: ProjectRecommendation;
};
