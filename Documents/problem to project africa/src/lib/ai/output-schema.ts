export const recommendationOutputKeys = [
  "relevantProblems",
  "ideas",
  "recommendedProject",
] as const;

export const recommendedProjectShape = {
  title: "string",
  concept: "string",
  whyItFits: "string",
  localWhy: "string",
  feasibilityLevel: "beginner | intermediate | advanced",
  costLevel: "low | medium | high",
  complexityLevel: "low | medium | high",
  mvpSummary: "string",
  topFeatures: ["string"],
  skillsToLearn: ["string"],
  nextStep: "string",
  roadmap: {
    week1: "string",
    week2: "string",
    week3: "string",
    week4: "string",
  },
} as const;
