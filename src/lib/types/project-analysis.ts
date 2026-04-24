/**
 * Types enrichis pour l'analyse complète des projets
 * Incluant analyse financière, risques, ressources et roadmap
 */

export interface FinancialAnalysis {
  // Coûts initiaux
  initialCost: number;
  costBreakdown: {
    equipment: number;
    materials: number;
    training: number;
    licenses: number;
    other: number;
  };

  // Revenus et rentabilité
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  breakEvenMonths: number;
  roi12Months: number; // Return on Investment en %
  profitMargin: number; // %

  // Projections
  projections: {
    month: number;
    revenue: number;
    expenses: number;
    profit: number;
    cumulativeProfit: number;
  }[];

  // Scénarios
  scenarios: {
    name: string; // "Conservative", "Realistic", "Optimistic"
    monthlyRevenue: number;
    roi12Months: number;
  }[];
}

export interface RiskAssessment {
  risks: {
    id: string;
    category: "market" | "financial" | "operational" | "technical" | "regulatory";
    description: string;
    likelihood: "low" | "medium" | "high"; // 1-10
    impact: "low" | "medium" | "high"; // 1-10
    mitigation: string;
    priority: number; // likelihood * impact
  }[];

  opportunities: {
    id: string;
    description: string;
    potential: "low" | "medium" | "high";
    timeline: string;
  }[];
}

export interface ResourceRequirements {
  skills: {
    name: string;
    level: "beginner" | "intermediate" | "advanced";
    required: boolean;
    trainingNeeded: boolean;
    estimatedTrainingHours: number;
  }[];

  tools: {
    name: string;
    category: string;
    cost: number;
    essential: boolean;
    alternatives: string[];
  }[];

  team: {
    role: string;
    quantity: number;
    skills: string[];
    estimatedCost: number;
  }[];

  budget: {
    total: number;
    breakdown: Record<string, number>;
  };
}

export interface ProjectRoadmap {
  phases: {
    id: string;
    name: string;
    duration: number; // en semaines
    startWeek: number;
    endWeek: number;
    objectives: string[];
    deliverables: string[];
    resources: string[];
    dependencies: string[]; // IDs des phases précédentes
    milestones: {
      name: string;
      week: number;
      description: string;
    }[];
  }[];

  timeline: {
    totalDuration: number; // en semaines
    startDate: string;
    endDate: string;
    criticalPath: string[]; // IDs des phases critiques
  };
}

export interface ProjectMindMap {
  root: {
    name: string;
    description: string;
  };

  branches: {
    id: string;
    name: string;
    color: string;
    items: {
      id: string;
      name: string;
      description: string;
      children?: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
}

export interface CompetencyMapping {
  required: {
    name: string;
    level: "beginner" | "intermediate" | "advanced";
    userLevel: "beginner" | "intermediate" | "advanced" | "none";
    gap: number; // 0-100, 0 = no gap, 100 = complete gap
    trainingPath: {
      resource: string;
      duration: string;
      cost: number;
    }[];
  }[];

  existing: string[]; // Compétences que l'utilisateur possède déjà
  transferable: string[]; // Compétences transférables d'autres domaines
}

export interface ProjectAnalysis {
  projectId: string;
  mode: "skills" | "idea" | "problem";
  
  // Informations de base
  title: string;
  description: string;
  sector: string;
  location: string;

  // Analyses
  financial: FinancialAnalysis;
  risks: RiskAssessment;
  resources: ResourceRequirements;
  roadmap: ProjectRoadmap;
  mindmap: ProjectMindMap;
  competencies: CompetencyMapping;

  // Scores et recommandations
  viabilityScore: number; // 0-100
  profitabilityScore: number; // 0-100
  feasibilityScore: number; // 0-100
  overallScore: number; // 0-100

  recommendations: {
    priority: "high" | "medium" | "low";
    category: string;
    action: string;
    impact: string;
  }[];

  motivationalInsights: {
    strengths: string[];
    opportunities: string[];
    nextSteps: string[];
    encouragement: string;
  };

  createdAt: string;
  updatedAt: string;
}
