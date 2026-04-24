import type {
  ProjectAnalysis,
  FinancialAnalysis,
  RiskAssessment,
  ResourceRequirements,
  ProjectRoadmap,
  ProjectMindMap,
  CompetencyMapping,
} from "@/lib/types/project-analysis";

import type {
  ProblemModeInput,
  IdeaModeInput,
  SkillsModeInput,
} from "@/components/intake/differentiated-intake-forms";
import { BURKINA_FASO_DATABASE } from "@/lib/data/burkina-faso-database";

interface EnhancedAnalysisInput {
  mode: "skills" | "idea" | "problem";
  name: string;
  email: string;
  location: string;
  sector: string;
  skills?: string[];
  skillsLevel?: string;
  yearsExperience?: number;
  ideaTitle?: string;
  ideaDescription?: string;
  targetMarket?: string;
  uniqueValue?: string;
  problemDescription?: string;
  affectedPeople?: string;
  currentSolutions?: string;
  whyNotWorking?: string;
  budget: number;
  timeAvailable: string;
  teamSize: number;
  hasEquipment: boolean;
  hasNetwork: boolean;
  goal: string;
  timeframe: string;
  expectedRevenue: number;
  riskTolerance: number;
  initialInvestment: number;
  monthlyExpenses: number;
  targetMonthlyRevenue: number;
}

export class EnhancedProjectAnalyzer {
  /**
   * Analyse un problème identifié (mode Problème)
   */
  static analyzeProblemMode(input: ProblemModeInput): any {
    const db = BURKINA_FASO_DATABASE;
    const sector = this.determineSector(input.problemDescription);
    const sectorData = db.sectors[sector] || db.sectors.agriculture;
    
    const startupBudget = this.calculateStartupBudget(
      sector,
      input.availableCapital,
      sectorData
    );
    
    return {
      projectTitle: `Projet: ${input.problemDescription.substring(0, 50)}...`,
      sector,
      startupBudget,
      monthlyRevenue: sectorData.averageMonthlyRevenue || 500000,
      monthlyExpenses: sectorData.averageMonthlyExpenses,
      profitMargin: sectorData.averageProfitMargin || 0.3,
      localOpportunities: sectorData.opportunities || [],
      localChallenges: sectorData.challenges || [],
      administrativeSteps: this.getAdministrativeRequirements(sector),
    };
  }

  /**
   * Analyse une idée de projet (mode Idée)
   */
  static analyzeIdeaMode(input: IdeaModeInput): any {
    const db = BURKINA_FASO_DATABASE;
    const sector = input.targetSector || "commerce";
    const sectorData = db.sectors[sector] || db.sectors.commerce;
    
    return {
      projectTitle: input.ideaTitle,
      sector,
      startupBudget: input.capitalNeeded || 1000000,
      monthlyRevenue: input.revenueTarget || 500000,
      profitMargin: input.profitMargin / 100 || 0.3,
      breakEvenMonths: input.breakEvenMonths || 6,
      localOpportunities: sectorData.opportunities || [],
      localChallenges: sectorData.challenges || [],
      administrativeSteps: this.getAdministrativeRequirements(sector),
    };
  }

  /**
   * Analyse les compétences (mode Compétences)
   */
  static analyzeSkillsMode(input: SkillsModeInput): any {
    const db = BURKINA_FASO_DATABASE;
    const sector = this.determineSectorFromSkills(input.primarySkills);
    const sectorData = db.sectors[sector] || db.sectors.artisanat;
    
    return {
      projectTitle: `Projet: Valoriser vos compétences en ${sector}`,
      sector,
      startupBudget: 500000,
      monthlyRevenue: input.incomeTarget || 300000,
      profitMargin: 0.4,
      localOpportunities: sectorData.opportunities || [],
      localChallenges: sectorData.challenges || [],
      administrativeSteps: this.getAdministrativeRequirements(sector),
    };
  }

  // Méthodes utilitaires pour déterminer le secteur
  private static determineSector(description: string): string {
    const keywords = {
      agriculture: [
        "agriculture",
        "culture",
        "récolte",
        "ferme",
        "champ",
        "maïs",
        "riz",
      ],
      élevage: ["élevage", "bétail", "vache", "chèvre", "poulet", "animal"],
      santé: ["santé", "médical", "maladie", "hôpital", "clinique", "docteur"],
      éducation: [
        "éducation",
        "école",
        "formation",
        "apprentissage",
        "étudiant",
      ],
      eau: ["eau", "puits", "robinet", "potable", "hygiène"],
      énergie: ["énergie", "électricité", "solaire", "lumière"],
      commerce: [
        "commerce",
        "vente",
        "marché",
        "boutique",
        "produit",
        "client",
      ],
      artisanat: [
        "artisanat",
        "métier",
        "fabrication",
        "création",
        "production",
      ],
    };

    const lowerDesc = description.toLowerCase();
    for (const [sector, words] of Object.entries(keywords)) {
      if (words.some((word) => lowerDesc.includes(word))) {
        return sector;
      }
    }
    return "commerce";
  }

  private static determineSectorFromSkills(skills: string[]): string {
    const skillSectorMap: Record<string, string> = {
      plomberie: "artisanat",
      électricité: "artisanat",
      menuiserie: "artisanat",
      maçonnerie: "artisanat",
      couture: "artisanat",
      agriculture: "agriculture",
      élevage: "élevage",
      infirmier: "santé",
      médecin: "santé",
      enseignant: "éducation",
      informatique: "technologie",
      marketing: "commerce",
      vente: "commerce",
    };

    for (const skill of skills) {
      const sector = skillSectorMap[skill.toLowerCase()];
      if (sector) return sector;
    }
    return "artisanat";
  }

  private static calculateStartupBudget(
    sector: string,
    availableCapital: number,
    sectorData: any
  ): number {
    const estimatedBudget = sectorData.averageStartupCost || 1000000;
    return Math.max(estimatedBudget, availableCapital * 1.5);
  }

  private static getAdministrativeRequirements(sector: string): string[] {
    const requirements: Record<string, string[]> = {
      agriculture: [
        "Enregistrement auprès du ministère de l'Agriculture",
        "Obtenir un numéro d'identification fiscale (NIF)",
        "Respecter les normes phytosanitaires",
        "Assurance agricole recommandée",
      ],
      élevage: [
        "Enregistrement auprès du ministère de l'Élevage",
        "Vaccinations obligatoires pour les animaux",
        "Respect des normes de bien-être animal",
        "Certificats de santé animale",
      ],
      santé: [
        "Licence de prestataire de santé",
        "Respect des normes d'hygiène",
        "Assurance responsabilité civile",
        "Formation certifiée en premiers secours",
      ],
      commerce: [
        "Enregistrement commercial (RCCM)",
        "Obtenir un NIF",
        "Respecter les normes de consommation",
        "Assurance responsabilité civile",
      ],
      artisanat: [
        "Enregistrement auprès de la chambre des métiers",
        "Respect des normes de sécurité",
        "Assurance responsabilité civile",
        "Formation professionnelle recommandée",
      ],
    };

    return (
      requirements[sector] || [
        "Enregistrement commercial",
        "Obtenir un NIF",
        "Respecter les réglementations locales",
      ]
    );
  }
  /**
   * Analyse complète d'un projet avec tous les détails
   */
  static async analyzeProject(input: EnhancedAnalysisInput): Promise<ProjectAnalysis> {
    const projectId = `project_${Date.now()}`;

    // Générer les analyses
    const financial = this.generateFinancialAnalysis(input);
    const risks = this.generateRiskAssessment(input);
    const resources = this.generateResourceRequirements(input);
    const roadmap = this.generateRoadmap(input);
    const mindmap = this.generateMindMap(input);
    const competencies = this.generateCompetencyMapping(input);

    // Calculer les scores
    const viabilityScore = this.calculateViabilityScore(input, risks);
    const profitabilityScore = this.calculateProfitabilityScore(financial);
    const feasibilityScore = this.calculateFeasibilityScore(input, resources);
    const overallScore = (viabilityScore + profitabilityScore + feasibilityScore) / 3;

    // Générer les recommandations
    const recommendations = this.generateRecommendations(
      input,
      financial,
      risks,
      resources
    );

    // Générer les insights motivationnels
    const motivationalInsights = this.generateMotivationalInsights(
      input,
      overallScore,
      financial,
      risks
    );

    return {
      projectId,
      mode: input.mode,
      title: input.ideaTitle || input.problemDescription?.substring(0, 50) || "Mon Projet",
      description:
        input.ideaDescription ||
        input.problemDescription ||
        `Projet basé sur mes compétences en ${input.skills?.join(", ")}`,
      sector: input.sector,
      location: input.location,
      financial,
      risks,
      resources,
      roadmap,
      mindmap,
      competencies,
      viabilityScore,
      profitabilityScore,
      feasibilityScore,
      overallScore,
      recommendations,
      motivationalInsights,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Génère l'analyse financière détaillée
   */
  private static generateFinancialAnalysis(input: EnhancedAnalysisInput): FinancialAnalysis {
    const initialCost = input.initialInvestment || input.budget;
    const monthlyExpenses = input.monthlyExpenses || (initialCost / 6); // Par défaut, 6 mois de ROI
    const monthlyRevenue = input.targetMonthlyRevenue || input.expectedRevenue || (initialCost / 3);

    const monthlyProfit = monthlyRevenue - monthlyExpenses;
    const breakEvenMonths = initialCost > 0 ? Math.ceil(initialCost / Math.max(monthlyProfit, 1)) : 0;
    const roi12Months = initialCost > 0 ? ((monthlyProfit * 12 - initialCost) / initialCost) * 100 : 0;
    const profitMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;

    // Générer les projections mensuelles
    const projections = [];
    let cumulativeProfit = -initialCost;

    for (let month = 1; month <= 12; month++) {
      const revenue = monthlyRevenue * month;
      const expenses = monthlyExpenses * month + initialCost;
      const profit = revenue - expenses;

      projections.push({
        month,
        revenue,
        expenses,
        profit,
        cumulativeProfit: profit,
      });

      if (month === 12) {
        cumulativeProfit = profit;
      }
    }

    // Générer les scénarios
    const scenarios = [
      {
        name: "Conservative",
        monthlyRevenue: monthlyRevenue * 0.7,
        roi12Months: ((monthlyRevenue * 0.7 - monthlyExpenses) * 12 - initialCost) / Math.max(initialCost, 1) * 100,
      },
      {
        name: "Realistic",
        monthlyRevenue,
        roi12Months,
      },
      {
        name: "Optimistic",
        monthlyRevenue: monthlyRevenue * 1.5,
        roi12Months: ((monthlyRevenue * 1.5 - monthlyExpenses) * 12 - initialCost) / Math.max(initialCost, 1) * 100,
      },
    ];

    return {
      initialCost,
      costBreakdown: {
        equipment: initialCost * 0.3,
        materials: initialCost * 0.3,
        training: initialCost * 0.2,
        licenses: initialCost * 0.1,
        other: initialCost * 0.1,
      },
      monthlyRevenue,
      monthlyExpenses,
      monthlyProfit,
      breakEvenMonths,
      roi12Months,
      profitMargin,
      projections,
      scenarios,
    };
  }

  /**
   * Génère l'évaluation des risques
   */
  private static generateRiskAssessment(input: EnhancedAnalysisInput): RiskAssessment {
    const risks = [
      {
        id: "market_risk",
        category: "market" as const,
        description: "Faible demande du marché pour le produit/service",
        likelihood: input.riskTolerance < 5 ? "high" : "medium",
        impact: "high" as const,
        mitigation: "Conduire une étude de marché approfondie et valider la demande",
        priority: 8,
      },
      {
        id: "financial_risk",
        category: "financial" as const,
        description: "Budget insuffisant pour couvrir les coûts initiaux",
        likelihood: input.budget < input.initialInvestment ? "high" : "low",
        impact: "high" as const,
        mitigation: "Chercher des financements alternatifs ou réduire les coûts initiaux",
        priority: input.budget < input.initialInvestment ? 9 : 3,
      },
      {
        id: "operational_risk",
        category: "operational" as const,
        description: "Manque d'expérience dans la gestion opérationnelle",
        likelihood: input.yearsExperience! < 2 ? "high" : "low",
        impact: "medium" as const,
        mitigation: "Suivre une formation en gestion d'entreprise ou trouver un mentor",
        priority: input.yearsExperience! < 2 ? 7 : 2,
      },
      {
        id: "competition_risk",
        category: "market" as const,
        description: "Concurrence accrue dans le secteur",
        likelihood: "medium" as const,
        impact: "medium" as const,
        mitigation: "Développer une proposition de valeur unique et forte",
        priority: 6,
      },
      {
        id: "regulatory_risk",
        category: "regulatory" as const,
        description: "Changements réglementaires affectant le secteur",
        likelihood: "low" as const,
        impact: "high" as const,
        mitigation: "Rester informé des changements réglementaires et adapter le modèle",
        priority: 4,
      },
    ];

    const opportunities = [
      {
        id: "market_growth",
        description: "Croissance rapide du marché dans la région",
        potential: "high" as const,
        timeline: "6-12 mois",
      },
      {
        id: "network_leverage",
        description: input.hasNetwork
          ? "Utiliser votre réseau existant pour acquérir des clients"
          : "Construire un réseau de partenaires stratégiques",
        potential: input.hasNetwork ? "high" : "medium",
        timeline: "Immédiat",
      },
      {
        id: "technology_adoption",
        description: "Adopter la technologie pour améliorer l'efficacité",
        potential: "medium" as const,
        timeline: "3-6 mois",
      },
    ];

    return { risks, opportunities };
  }

  /**
   * Génère les ressources requises
   */
  private static generateResourceRequirements(input: EnhancedAnalysisInput): ResourceRequirements {
    const skills = (input.skills || []).map((skill) => ({
      name: skill,
      level: "intermediate" as const,
      required: true,
      trainingNeeded: false,
      estimatedTrainingHours: 0,
    }));

    const tools = [
      {
        name: "Équipement de base",
        category: "equipment",
        cost: input.initialInvestment * 0.3,
        essential: true,
        alternatives: ["Location", "Partenariat"],
      },
      {
        name: "Logiciel de gestion",
        category: "software",
        cost: 5000,
        essential: false,
        alternatives: ["Gratuit", "Open source"],
      },
    ];

    const team = [
      {
        role: "Fondateur/Gestionnaire",
        quantity: 1,
        skills: input.skills || [],
        estimatedCost: 0,
      },
      {
        role: "Assistant",
        quantity: input.teamSize > 1 ? 1 : 0,
        skills: ["Communication", "Organisation"],
        estimatedCost: input.monthlyExpenses * 0.3,
      },
    ];

    return {
      skills,
      tools,
      team,
      budget: {
        total: input.initialInvestment + input.monthlyExpenses * 6,
        breakdown: {
          equipment: input.initialInvestment * 0.3,
          materials: input.initialInvestment * 0.3,
          training: input.initialInvestment * 0.2,
          staffing: input.monthlyExpenses * 0.5,
          marketing: input.monthlyExpenses * 0.3,
          other: input.monthlyExpenses * 0.2,
        },
      },
    };
  }

  /**
   * Génère la roadmap du projet
   */
  private static generateRoadmap(input: EnhancedAnalysisInput): ProjectRoadmap {
    const timeframeWeeks = {
      "3-months": 12,
      "6-months": 24,
      "1-year": 52,
      "2-years": 104,
    }[input.timeframe] || 24;

    const phases = [
      {
        id: "phase_1",
        name: "Planification et Préparation",
        duration: Math.ceil(timeframeWeeks * 0.15),
        startWeek: 0,
        endWeek: Math.ceil(timeframeWeeks * 0.15),
        objectives: [
          "Valider l'idée du projet",
          "Identifier les ressources nécessaires",
          "Créer un plan détaillé",
        ],
        deliverables: ["Plan d'affaires", "Budget détaillé", "Calendrier"],
        resources: ["Mentor", "Outils de planification"],
        dependencies: [],
        milestones: [
          {
            name: "Plan approuvé",
            week: Math.ceil(timeframeWeeks * 0.15),
            description: "Plan d'affaires finalisé et approuvé",
          },
        ],
      },
      {
        id: "phase_2",
        name: "Mise en place et Développement",
        duration: Math.ceil(timeframeWeeks * 0.35),
        startWeek: Math.ceil(timeframeWeeks * 0.15),
        endWeek: Math.ceil(timeframeWeeks * 0.5),
        objectives: [
          "Acquérir l'équipement",
          "Développer le produit/service",
          "Mettre en place l'infrastructure",
        ],
        deliverables: ["Produit MVP", "Infrastructure opérationnelle"],
        resources: ["Équipement", "Formation"],
        dependencies: ["phase_1"],
        milestones: [
          {
            name: "MVP prêt",
            week: Math.ceil(timeframeWeeks * 0.5),
            description: "Produit minimum viable prêt pour le test",
          },
        ],
      },
      {
        id: "phase_3",
        name: "Lancement et Croissance",
        duration: Math.ceil(timeframeWeeks * 0.35),
        startWeek: Math.ceil(timeframeWeeks * 0.5),
        endWeek: Math.ceil(timeframeWeeks * 0.85),
        objectives: [
          "Lancer le produit/service",
          "Acquérir les premiers clients",
          "Optimiser les opérations",
        ],
        deliverables: ["Premiers clients", "Processus optimisés"],
        resources: ["Marketing", "Support client"],
        dependencies: ["phase_2"],
        milestones: [
          {
            name: "Premiers revenus",
            week: Math.ceil(timeframeWeeks * 0.65),
            description: "Premiers revenus générés",
          },
        ],
      },
      {
        id: "phase_4",
        name: "Expansion et Consolidation",
        duration: Math.ceil(timeframeWeeks * 0.15),
        startWeek: Math.ceil(timeframeWeeks * 0.85),
        endWeek: timeframeWeeks,
        objectives: [
          "Augmenter la base de clients",
          "Améliorer la rentabilité",
          "Planifier la croissance future",
        ],
        deliverables: ["Plan de croissance", "Rentabilité atteinte"],
        resources: ["Équipe étendue", "Financement"],
        dependencies: ["phase_3"],
        milestones: [
          {
            name: "Objectifs atteints",
            week: timeframeWeeks,
            description: "Objectifs de rentabilité atteints",
          },
        ],
      },
    ];

    return {
      phases,
      timeline: {
        totalDuration: timeframeWeeks,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + timeframeWeeks * 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        criticalPath: ["phase_1", "phase_2", "phase_3", "phase_4"],
      },
    };
  }

  /**
   * Génère la mindmap du projet
   */
  private static generateMindMap(input: EnhancedAnalysisInput): ProjectMindMap {
    return {
      root: {
        name: input.ideaTitle || "Mon Projet",
        description: input.ideaDescription || input.problemDescription || "",
      },
      branches: [
        {
          id: "vision",
          name: "Vision",
          color: "#3B82F6",
          items: [
            {
              id: "goal",
              name: "Objectif Principal",
              description: input.goal,
            },
            {
              id: "market",
              name: "Marché Cible",
              description: input.targetMarket || "À définir",
            },
          ],
        },
        {
          id: "resources",
          name: "Ressources",
          color: "#10B981",
          items: [
            {
              id: "budget",
              name: "Budget",
              description: `${input.initialInvestment} FCFA`,
            },
            {
              id: "team",
              name: "Équipe",
              description: `${input.teamSize} personne(s)`,
            },
            {
              id: "skills",
              name: "Compétences",
              description: input.skills?.join(", ") || "À développer",
            },
          ],
        },
        {
          id: "execution",
          name: "Exécution",
          color: "#F59E0B",
          items: [
            {
              id: "timeline",
              name: "Délai",
              description: input.timeframe,
            },
            {
              id: "phases",
              name: "Phases",
              description: "4 phases principales",
            },
          ],
        },
        {
          id: "financial",
          name: "Financier",
          color: "#EF4444",
          items: [
            {
              id: "revenue",
              name: "Revenu Mensuel",
              description: `${input.targetMonthlyRevenue} FCFA`,
            },
            {
              id: "expenses",
              name: "Dépenses Mensuelles",
              description: `${input.monthlyExpenses} FCFA`,
            },
          ],
        },
      ],
    };
  }

  /**
   * Génère le mapping des compétences
   */
  private static generateCompetencyMapping(input: EnhancedAnalysisInput): CompetencyMapping {
    const requiredSkills = [
      { name: "Gestion d'entreprise", level: "intermediate" as const },
      { name: "Marketing", level: "beginner" as const },
      { name: "Comptabilité", level: "intermediate" as const },
      ...((input.skills || []).map((s) => ({ name: s, level: "advanced" as const }))),
    ];

    return {
      required: requiredSkills.map((skill) => ({
        name: skill.name,
        level: skill.level,
        userLevel: (input.skills || []).includes(skill.name) ? "advanced" : "none",
        gap: (input.skills || []).includes(skill.name) ? 0 : 70,
        trainingPath: [
          {
            resource: "Formation en ligne",
            duration: "4 semaines",
            cost: 10000,
          },
        ],
      })),
      existing: input.skills || [],
      transferable: ["Communication", "Résolution de problèmes", "Apprentissage"],
    };
  }

  /**
   * Calcule le score de viabilité
   */
  private static calculateViabilityScore(
    input: EnhancedAnalysisInput,
    risks: RiskAssessment
  ): number {
    let score = 50;

    // Ajuster selon les risques
    const highRisks = risks.risks.filter((r) => r.likelihood === "high").length;
    score -= highRisks * 10;

    // Ajuster selon l'expérience
    score += Math.min(input.yearsExperience! * 5, 20);

    // Ajuster selon le réseau
    if (input.hasNetwork) score += 10;

    // Ajuster selon la tolérance au risque
    score += (input.riskTolerance - 5) * 2;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calcule le score de rentabilité
   */
  private static calculateProfitabilityScore(financial: FinancialAnalysis): number {
    let score = 50;

    // Ajuster selon la marge bénéficiaire
    score += Math.min(financial.profitMargin / 2, 25);

    // Ajuster selon le ROI
    score += Math.min(financial.roi12Months / 10, 25);

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calcule le score de faisabilité
   */
  private static calculateFeasibilityScore(
    input: EnhancedAnalysisInput,
    resources: ResourceRequirements
  ): number {
    let score = 50;

    // Ajuster selon le budget
    if (input.budget >= input.initialInvestment) score += 20;
    else if (input.budget >= input.initialInvestment * 0.7) score += 10;

    // Ajuster selon le temps disponible
    if (input.timeAvailable === "full-time") score += 20;
    else if (input.timeAvailable === "part-time") score += 10;

    // Ajuster selon l'équipe
    score += Math.min(input.teamSize * 5, 15);

    // Ajuster selon l'équipement
    if (input.hasEquipment) score += 10;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Génère les recommandations
   */
  private static generateRecommendations(
    input: EnhancedAnalysisInput,
    financial: FinancialAnalysis,
    risks: RiskAssessment,
    resources: ResourceRequirements
  ) {
    const recommendations = [];

    // Recommandations financières
    if (financial.breakEvenMonths > 12) {
      recommendations.push({
        priority: "high",
        category: "Financier",
        action: "Réduire les coûts initiaux ou augmenter les revenus",
        impact: "Atteindre l'équilibre financier plus rapidement",
      });
    }

    // Recommandations de risque
    const highRisks = risks.risks.filter((r) => r.likelihood === "high");
    if (highRisks.length > 0) {
      recommendations.push({
        priority: "high",
        category: "Risque",
        action: highRisks[0].mitigation,
        impact: "Réduire les risques du projet",
      });
    }

    // Recommandations de ressources
    if (input.budget < input.initialInvestment) {
      recommendations.push({
        priority: "high",
        category: "Ressources",
        action: "Chercher des financements alternatifs (prêts, subventions, partenaires)",
        impact: "Obtenir les ressources nécessaires",
      });
    }

    // Recommandations de compétences
    if (input.yearsExperience! < 2) {
      recommendations.push({
        priority: "medium",
        category: "Compétences",
        action: "Trouver un mentor ou suivre une formation en gestion d'entreprise",
        impact: "Développer les compétences de gestion",
      });
    }

    return recommendations;
  }

  /**
   * Génère les insights motivationnels
   */
  private static generateMotivationalInsights(
    input: EnhancedAnalysisInput,
    overallScore: number,
    financial: FinancialAnalysis,
    risks: RiskAssessment
  ) {
    const strengths = [];
    const opportunities = [];
    const nextSteps = [];
    let encouragement = "";

    // Identifier les forces
    if (input.yearsExperience! > 3) strengths.push("Expérience significative dans votre domaine");
    if (input.hasNetwork) strengths.push("Réseau existant pour acquérir des clients");
    if (input.hasEquipment) strengths.push("Équipement déjà disponible");
    if (input.budget >= input.initialInvestment) strengths.push("Budget suffisant pour démarrer");
    if (input.skills && input.skills.length > 0) strengths.push(`Compétences clés: ${input.skills.join(", ")}`);

    // Identifier les opportunités
    opportunities.push(...risks.opportunities.map((o) => o.description));

    // Prochaines étapes
    if (input.budget < input.initialInvestment) {
      nextSteps.push("1. Chercher un financement pour couvrir le budget initial");
    }
    nextSteps.push("2. Valider votre idée auprès des clients potentiels");
    nextSteps.push("3. Créer un plan d'action détaillé");
    nextSteps.push("4. Commencer par un MVP (produit minimum viable)");
    nextSteps.push("5. Mesurer et ajuster selon les retours");

    // Générer l'encouragement
    if (overallScore >= 70) {
      encouragement = `Félicitations ! Votre projet a un score de viabilité de ${overallScore.toFixed(0)}/100. Vous avez une excellente opportunité devant vous. Commencez dès maintenant et ajustez en cours de route.`;
    } else if (overallScore >= 50) {
      encouragement = `Votre projet a du potentiel avec un score de ${overallScore.toFixed(0)}/100. Concentrez-vous sur les recommandations ci-dessus pour augmenter vos chances de succès.`;
    } else {
      encouragement = `Votre projet nécessite des ajustements (score: ${overallScore.toFixed(0)}/100). Travaillez sur les risques identifiés et les recommandations pour améliorer la viabilité.`;
    }

    return {
      strengths,
      opportunities,
      nextSteps,
      encouragement,
    };
  }
}
