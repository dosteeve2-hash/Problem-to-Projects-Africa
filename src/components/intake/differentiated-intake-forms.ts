export interface ProblemModeInput {
  problemDescription: string;
  affectedPeople: number;
  sector: string;
  availableCapital: number;
  availableTime: string;
  skills: string[];
}

export interface IdeaModeInput {
  ideaDescription: string;
  ideaTitle?: string;
  targetMarket: string;
  targetSector?: string;
  sector: string;
  estimatedCapital: number;
  capitalNeeded?: number;
  competitorAnalysis: string;
  uniqueValue: string;
  revenueTarget?: number;
  profitMargin?: number;
  breakEvenMonths?: number;
}

export interface SkillsModeInput {
  skills: string[];
  primarySkills?: string[];
  skillLevel: string;
  yearsExperience: number;
  sector: string;
  desiredRole: string;
  availableTime: string;
  network: string;
  incomeTarget?: number;
}

export const PROBLEM_MODE_QUESTIONS = [
  { id: 1, question: "Décrivez le problème que vous avez identifié", type: "textarea" },
  { id: 2, question: "Combien de personnes sont affectées par ce problème?", type: "number" },
  { id: 3, question: "Quel secteur concerne ce problème?", type: "select" },
  { id: 4, question: "Quel capital avez-vous disponible?", type: "number" },
  { id: 5, question: "Combien de temps pouvez-vous consacrer?", type: "select" },
  { id: 6, question: "Quelles compétences avez-vous?", type: "multiselect" },
  { id: 7, question: "Avez-vous une équipe?", type: "text" },
  { id: 8, question: "Quels sont les risques principaux?", type: "textarea" },
  { id: 9, question: "Avez-vous des partenaires potentiels?", type: "text" },
  { id: 10, question: "Quel est votre objectif à 1 an?", type: "textarea" },
];

export const IDEA_MODE_QUESTIONS = [
  { id: 1, question: "Décrivez votre idée de projet", type: "textarea" },
  { id: 2, question: "Qui est votre marché cible?", type: "textarea" },
  { id: 3, question: "Quel secteur?", type: "select" },
  { id: 4, question: "Quel capital estimez-vous nécessaire?", type: "number" },
  { id: 5, question: "Qui sont vos concurrents?", type: "textarea" },
  { id: 6, question: "Qu'est-ce qui vous rend unique?", type: "textarea" },
  { id: 7, question: "Avez-vous validé cette idée avec des clients?", type: "text" },
  { id: 8, question: "Quel est votre modèle de revenus?", type: "textarea" },
  { id: 9, question: "Quels sont les risques?", type: "textarea" },
  { id: 10, question: "Quel est votre objectif à 1 an?", type: "textarea" },
];

export const SKILLS_MODE_QUESTIONS = [
  { id: 1, question: "Quelles sont vos compétences principales?", type: "multiselect" },
  { id: 2, question: "Quel est votre niveau?", type: "select" },
  { id: 3, question: "Combien d'années d'expérience?", type: "number" },
  { id: 4, question: "Quel secteur vous intéresse?", type: "select" },
  { id: 5, question: "Quel rôle désirez-vous?", type: "text" },
  { id: 6, question: "Combien de temps pouvez-vous consacrer?", type: "select" },
  { id: 7, question: "Avez-vous un réseau professionnel?", type: "text" },
  { id: 8, question: "Quels sont vos objectifs financiers?", type: "textarea" },
  { id: 9, question: "Êtes-vous prêt à vous former?", type: "text" },
  { id: 10, question: "Quel est votre vision à 3 ans?", type: "textarea" },
];
