/**
 * Transformation Engine - Convertit les problèmes/idées/compétences en projets viables
 * Génère des roadmaps, flashcards, et perspectives financières réalistes
 */

export interface TransformationOutput {
  projectTitle: string;
  vision: string;
  roadmap: RoadmapPhase[];
  flashcards: Flashcard[];
  financialPerspective: FinancialPerspective;
  actionGuide: ActionStep[];
  risks: RiskMitigation[];
  opportunities: string[];
  nextSteps: string[];
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  resources: string[];
  milestones: string[];
  successMetrics: string[];
}

export interface Flashcard {
  id: string;
  category: "skill" | "market" | "financial" | "operational" | "legal";
  question: string;
  answer: string;
  tips: string[];
  resources: string[];
}

export interface FinancialPerspective {
  startupCost: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  breakEvenMonth: number;
  yearOneProfit: number;
  yearTwoProfit: number;
  yearThreeProfit: number;
  roi: number; // Return on Investment percentage
  scenarios: FinancialScenario[];
  fundingSources: FundingSource[];
  monetizationStrategies: string[];
}

export interface FinancialScenario {
  name: string;
  description: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
  breakEvenMonth: number;
  yearOneProfit: number;
  probability: number; // 0-100
}

export interface FundingSource {
  name: string;
  amount: number;
  description: string;
  timeline: string;
  requirements: string[];
}

export interface ActionStep {
  week: number;
  action: string;
  responsible: string;
  resources: string[];
  successCriteria: string;
  dependencies: string[];
}

export interface RiskMitigation {
  risk: string;
  probability: number; // 0-100
  impact: "low" | "medium" | "high" | "critical";
  mitigation: string;
  contingency: string;
}

/** Entrée du mode Problème. */
export interface ProblemInput {
  title: string;
  description: string;
  affectedPeople: number;
  frequency: string;
  severity: string;
  availableSkills: string;
  availableCapital: number;
  availableTime: number;
  ambitions: string;
}

/** Entrée du mode Idée. */
export interface IdeaInput {
  title: string;
  description: string;
  uniqueValue: string;
  targetMarket: string;
  competitors: string;
  startupCapital: number;
  monthlyRevenue: number;
  margin: number;
  pricingStrategy: string;
}

/** Entrée du mode Compétences. */
export interface SkillsInput {
  mainSkills: string;
  skillLevel: string;
  certifications: string;
  experience: number;
  interestSectors: string;
  desiredRole: string;
  projectIdeas: string;
  network: string;
}

/**
 * Vue « tous modes » passée aux générateurs : chaque champ propre à un mode y
 * est optionnel. Lire un champ absent devient une erreur de compilation au lieu
 * de renvoyer `undefined` en silence, ce que `data: AnyModeInput` autorisait.
 */
type AnyModeInput = Partial<ProblemInput & IdeaInput & SkillsInput>;

/**
 * Génère une transformation complète pour le mode Problème
 */
export function transformProblem(problemData: ProblemInput): TransformationOutput {
  const sector = identifySector(problemData.description);
  const projectTitle = `Solution: ${problemData.title}`;
  const vision = generateVision("problem", problemData);

  return {
    projectTitle,
    vision,
    roadmap: generateRoadmapForProblem(sector, problemData),
    flashcards: generateFlashcards("problem", sector, problemData),
    financialPerspective: generateFinancialPerspective("problem", sector, problemData),
    actionGuide: generateActionGuide("problem", problemData),
    risks: generateRisks("problem", sector, problemData),
    opportunities: generateOpportunities("problem", sector, problemData),
    nextSteps: generateNextSteps("problem", problemData),
  };
}

/**
 * Génère une transformation complète pour le mode Idée
 */
export function transformIdea(ideaData: IdeaInput): TransformationOutput {
  const sector = identifySector(ideaData.description);
  const projectTitle = `Projet: ${ideaData.title}`;
  const vision = generateVision("idea", ideaData);

  return {
    projectTitle,
    vision,
    roadmap: generateRoadmapForIdea(sector, ideaData),
    flashcards: generateFlashcards("idea", sector, ideaData),
    financialPerspective: generateFinancialPerspective("idea", sector, ideaData),
    actionGuide: generateActionGuide("idea", ideaData),
    risks: generateRisks("idea", sector, ideaData),
    opportunities: generateOpportunities("idea", sector, ideaData),
    nextSteps: generateNextSteps("idea", ideaData),
  };
}

/**
 * Génère une transformation complète pour le mode Compétences
 */
export function transformSkills(skillsData: SkillsInput): TransformationOutput {
  const sector = identifySector(skillsData.interestSectors);
  const projectTitle = `Opportunité: Valoriser vos compétences en ${sector}`;
  const vision = generateVision("skills", skillsData);

  return {
    projectTitle,
    vision,
    roadmap: generateRoadmapForSkills(sector, skillsData),
    flashcards: generateFlashcards("skills", sector, skillsData),
    financialPerspective: generateFinancialPerspective("skills", sector, skillsData),
    actionGuide: generateActionGuide("skills", skillsData),
    risks: generateRisks("skills", sector, skillsData),
    opportunities: generateOpportunities("skills", sector, skillsData),
    nextSteps: generateNextSteps("skills", skillsData),
  };
}

/**
 * Identifie le secteur basé sur la description
 */
function identifySector(description: string): string {
  const keywords: Record<string, string[]> = {
    agriculture: ["culture", "récolte", "semence", "sol", "engrais", "maïs", "riz"],
    élevage: ["bétail", "volaille", "poule", "chèvre", "mouton", "vache", "élevage"],
    santé: ["clinique", "pharmacie", "médecin", "santé", "maladie", "hôpital"],
    éducation: ["école", "formation", "tutoring", "apprentissage", "étudiant"],
    eau: ["puits", "eau", "station", "distribution", "robinet"],
    énergie: ["solaire", "électricité", "énergie", "biocarburant", "mini-grid"],
    commerce: ["vente", "commerce", "marché", "distribution", "e-commerce"],
    artisanat: ["textile", "menuiserie", "poterie", "artisanat", "artisan"],
  };

  const lowerDesc = description.toLowerCase();
  for (const [sector, words] of Object.entries(keywords)) {
    if (words.some((word) => lowerDesc.includes(word))) {
      return sector;
    }
  }

  return "commerce"; // Default sector
}

/**
 * Génère une vision inspirante pour le projet
 */
function generateVision(mode: string, data: AnyModeInput): string {
  const visions: Record<string, string> = {
    problem: `Transformer ce défi en opportunité économique qui crée de la valeur pour ${data.affectedPeople || "votre communauté"} et génère des revenus durables.`,
    idea: `Développer une entreprise viable qui répond à un besoin réel du marché et crée de l'impact économique et social.`,
    skills: `Valoriser vos compétences en créant une entreprise ou un service qui génère des revenus et contribue au développement local.`,
  };

  return visions[mode] || "Créer un projet viable et impactant.";
}

/**
 * Génère une roadmap pour un problème
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateRoadmapForProblem(_sector: string, _data: AnyModeInput): RoadmapPhase[] {
  return [
    {
      phase: 1,
      title: "Recherche et Validation",
      duration: "2-4 semaines",
      objectives: [
        "Valider que le problème existe vraiment",
        "Identifier les solutions existantes",
        "Évaluer la demande du marché",
      ],
      deliverables: [
        "Rapport de recherche marché",
        "Entretiens avec 10+ personnes affectées",
        "Analyse concurrentielle",
      ],
      resources: [
        "Temps: 40-60 heures",
        "Budget: 0-50,000 XOF (déplacements)",
        "Outils: Google Forms, Excel",
      ],
      milestones: [
        "Validé: Le problème existe et affecte vraiment les gens",
        "Identifié: Les solutions existantes et leurs limites",
      ],
      successMetrics: [
        "80%+ des personnes interrogées confirment le problème",
        "Identifié au moins 3 solutions existantes",
      ],
    },
    {
      phase: 2,
      title: "Développement de la Solution",
      duration: "4-8 semaines",
      objectives: [
        "Concevoir une solution adaptée",
        "Créer un prototype ou MVP",
        "Tester avec les utilisateurs",
      ],
      deliverables: [
        "Prototype ou MVP fonctionnel",
        "Guide d'utilisation",
        "Retours de 20+ utilisateurs",
      ],
      resources: [
        "Temps: 100-150 heures",
        "Budget: 100,000-500,000 XOF",
        "Matériaux et outils nécessaires",
      ],
      milestones: [
        "Prototype créé et testé",
        "Retours positifs de 70%+ des testeurs",
      ],
      successMetrics: [
        "Prototype fonctionne comme prévu",
        "Score de satisfaction > 7/10",
      ],
    },
    {
      phase: 3,
      title: "Pilote et Optimisation",
      duration: "6-12 semaines",
      objectives: [
        "Lancer un pilote avec un groupe limité",
        "Collecter les retours détaillés",
        "Optimiser la solution",
      ],
      deliverables: [
        "Rapport de pilote",
        "Solution optimisée",
        "Cas d'usage documentés",
      ],
      resources: [
        "Temps: 150-200 heures",
        "Budget: 500,000-2,000,000 XOF",
        "Équipe de 2-3 personnes",
      ],
      milestones: [
        "Pilote lancé avec 50+ utilisateurs",
        "Taux de satisfaction > 80%",
      ],
      successMetrics: [
        "Pilote génère des revenus",
        "Coûts d'opération validés",
      ],
    },
    {
      phase: 4,
      title: "Lancement et Croissance",
      duration: "3-6 mois",
      objectives: [
        "Lancer commercialement",
        "Atteindre le point d'équilibre",
        "Planifier la croissance",
      ],
      deliverables: [
        "Entreprise enregistrée",
        "100+ clients payants",
        "Plan de croissance 12 mois",
      ],
      resources: [
        "Temps: 200+ heures/mois",
        "Budget: 2,000,000+ XOF",
        "Équipe de 3-5 personnes",
      ],
      milestones: [
        "Entreprise enregistrée légalement",
        "Point d'équilibre atteint",
      ],
      successMetrics: [
        "Revenu mensuel > Dépenses mensuelles",
        "Croissance mois/mois positive",
      ],
    },
  ];
}

/**
 * Génère une roadmap pour une idée
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateRoadmapForIdea(_sector: string, _data: AnyModeInput): RoadmapPhase[] {
  return [
    {
      phase: 1,
      title: "Validation du Marché",
      duration: "2-3 semaines",
      objectives: [
        "Valider que le marché existe",
        "Identifier les clients potentiels",
        "Évaluer la concurrence",
      ],
      deliverables: [
        "Rapport de validation marché",
        "Liste de 50+ prospects",
        "Analyse concurrentielle détaillée",
      ],
      resources: [
        "Temps: 30-50 heures",
        "Budget: 0-30,000 XOF",
        "Outils: LinkedIn, Google, Excel",
      ],
      milestones: [
        "Marché validé avec demande confirmée",
        "Avantage concurrentiel identifié",
      ],
      successMetrics: [
        "70%+ des prospects intéressés",
        "Avantage unique vs concurrence",
      ],
    },
    {
      phase: 2,
      title: "Préparation et Financement",
      duration: "3-6 semaines",
      objectives: [
        "Préparer le plan d'affaires",
        "Sécuriser le financement",
        "Mettre en place l'infrastructure",
      ],
      deliverables: [
        "Plan d'affaires complet",
        "Financement sécurisé",
        "Infrastructure mise en place",
      ],
      resources: [
        "Temps: 60-100 heures",
        "Budget: 100,000-500,000 XOF",
        "Accès à des investisseurs ou prêteurs",
      ],
      milestones: [
        "Plan d'affaires validé",
        "Financement sécurisé",
      ],
      successMetrics: [
        "Financement obtenu à 100%",
        "Infrastructure prête",
      ],
    },
    {
      phase: 3,
      title: "Lancement MVP",
      duration: "4-8 semaines",
      objectives: [
        "Lancer une version minimale",
        "Acquérir les premiers clients",
        "Valider le modèle économique",
      ],
      deliverables: [
        "MVP en production",
        "10-20 premiers clients",
        "Retours et améliorations",
      ],
      resources: [
        "Temps: 100-150 heures",
        "Budget: 500,000-2,000,000 XOF",
        "Équipe de 2-3 personnes",
      ],
      milestones: [
        "MVP lancé",
        "Premiers revenus générés",
      ],
      successMetrics: [
        "Taux de conversion > 10%",
        "Coût d'acquisition client validé",
      ],
    },
    {
      phase: 4,
      title: "Croissance et Optimisation",
      duration: "3-12 mois",
      objectives: [
        "Atteindre le point d'équilibre",
        "Croissance exponentielle",
        "Optimisation des opérations",
      ],
      deliverables: [
        "100-500 clients payants",
        "Rentabilité atteinte",
        "Plan de croissance 2024",
      ],
      resources: [
        "Temps: 200+ heures/mois",
        "Budget: 2,000,000+ XOF/mois",
        "Équipe de 5-10 personnes",
      ],
      milestones: [
        "Point d'équilibre atteint",
        "Croissance 50%+ mois/mois",
      ],
      successMetrics: [
        "Marge bénéficiaire > 30%",
        "Taux de rétention client > 80%",
      ],
    },
  ];
}

/**
 * Génère une roadmap pour valoriser des compétences
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateRoadmapForSkills(_sector: string, _data: AnyModeInput): RoadmapPhase[] {
  return [
    {
      phase: 1,
      title: "Positionnement et Marché",
      duration: "2-3 semaines",
      objectives: [
        "Identifier votre positionnement unique",
        "Évaluer la demande pour vos compétences",
        "Définir votre offre de service",
      ],
      deliverables: [
        "Profil professionnel optimisé",
        "Liste de 50+ clients potentiels",
        "Proposition de valeur claire",
      ],
      resources: [
        "Temps: 20-40 heures",
        "Budget: 0-20,000 XOF",
        "Outils: LinkedIn, Portfolio",
      ],
      milestones: [
        "Positionnement défini",
        "Marché identifié",
      ],
      successMetrics: [
        "Proposition de valeur claire et unique",
        "Demande confirmée pour vos services",
      ],
    },
    {
      phase: 2,
      title: "Lancement du Service",
      duration: "2-4 semaines",
      objectives: [
        "Créer votre offre de service",
        "Mettre en place la facturation",
        "Acquérir les premiers clients",
      ],
      deliverables: [
        "Offre de service documentée",
        "Système de facturation",
        "3-5 premiers clients",
      ],
      resources: [
        "Temps: 30-60 heures",
        "Budget: 20,000-100,000 XOF",
        "Outils: Facture, Contrats",
      ],
      milestones: [
        "Service lancé",
        "Premiers revenus générés",
      ],
      successMetrics: [
        "Taux de conversion > 20%",
        "Tarif validé par le marché",
      ],
    },
    {
      phase: 3,
      title: "Croissance et Réputation",
      duration: "3-6 mois",
      objectives: [
        "Atteindre 10-15 clients réguliers",
        "Construire votre réputation",
        "Augmenter vos tarifs",
      ],
      deliverables: [
        "10-15 clients payants",
        "Portefeuille de cas d'usage",
        "Recommandations et témoignages",
      ],
      resources: [
        "Temps: 80-120 heures/mois",
        "Budget: 100,000-300,000 XOF/mois",
        "Réseau professionnel",
      ],
      milestones: [
        "Revenu mensuel stable",
        "Réputation établie",
      ],
      successMetrics: [
        "Revenu mensuel > 500,000 XOF",
        "Taux de rétention > 80%",
      ],
    },
    {
      phase: 4,
      title: "Scaling et Entreprise",
      duration: "6-12 mois",
      objectives: [
        "Transformer en entreprise",
        "Recruter une équipe",
        "Multiplier les revenus",
      ],
      deliverables: [
        "Entreprise enregistrée",
        "Équipe de 2-3 personnes",
        "Revenu mensuel 2-3x",
      ],
      resources: [
        "Temps: 150+ heures/mois",
        "Budget: 500,000+ XOF/mois",
        "Équipe et infrastructure",
      ],
      milestones: [
        "Entreprise formalisée",
        "Équipe opérationnelle",
      ],
      successMetrics: [
        "Revenu mensuel > 2,000,000 XOF",
        "Marge bénéficiaire > 50%",
      ],
    },
  ];
}

/**
 * Génère des flashcards pour l'apprentissage
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateFlashcards(_mode: string, _sector: string, _data: AnyModeInput): Flashcard[] {
  const flashcards: Flashcard[] = [
    {
      id: "market-1",
      category: "market",
      question: "Qui est exactement mon client idéal?",
      answer: `Votre client idéal est quelqu'un qui:
- A besoin de votre solution
- Peut payer pour
- Est facile à atteindre
- Génère des revenus durables`,
      tips: [
        "Créez un profil détaillé de votre client",
        "Validez avec des entretiens réels",
        "Cherchez les patterns communs",
      ],
      resources: [
        "Template: Customer Avatar",
        "Guide: Entretiens clients",
      ],
    },
    {
      id: "financial-1",
      category: "financial",
      question: "Comment calculer mon prix?",
      answer: `Trois approches:
1. Coût + Marge: (Coût × 3) = Prix
2. Valeur: Basé sur la valeur créée
3. Marché: Basé sur la concurrence`,
      tips: [
        "Testez différents prix",
        "Augmentez progressivement",
        "Validez avec les clients",
      ],
      resources: [
        "Calculateur de prix",
        "Guide: Stratégie de prix",
      ],
    },
    {
      id: "operational-1",
      category: "operational",
      question: "Quels sont mes coûts fixes vs variables?",
      answer: `Coûts fixes: Loyer, salaires, assurance
Coûts variables: Matériaux, transport, commissions

Calculez: Point d'équilibre = Coûts fixes / (Prix - Coût variable)`,
      tips: [
        "Listez tous les coûts",
        "Séparez fixes et variables",
        "Révisez mensuellement",
      ],
      resources: [
        "Template: Budget",
        "Calculateur: Point d'équilibre",
      ],
    },
    {
      id: "legal-1",
      category: "legal",
      question: "Quelles autorisations ai-je besoin?",
      answer: `Au Burkina Faso:
1. Enregistrement commercial
2. Numéro d'impôt (NIF)
3. Permis sectoriels (si nécessaire)
4. Assurances professionnelles`,
      tips: [
        "Consultez un expert comptable",
        "Commencez légalement",
        "Gardez les documents",
      ],
      resources: [
        "Guide: Formalités légales BF",
        "Contact: Chambre de commerce",
      ],
    },
  ];

  return flashcards;
}

/** Repères financiers par secteur, en XOF. */
interface SectorFinancials {
  startupCost: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  margin: number;
}

/**
 * Génère des perspectives financières réalistes
 */
function generateFinancialPerspective(mode: string, sector: string, data: AnyModeInput): FinancialPerspective {
  const sectorData: Record<string, SectorFinancials> = {
    agriculture: {
      startupCost: 1000000,
      monthlyRevenue: 500000,
      monthlyExpenses: 300000,
      margin: 0.4,
    },
    élevage: {
      startupCost: 1500000,
      monthlyRevenue: 600000,
      monthlyExpenses: 350000,
      margin: 0.42,
    },
    santé: {
      startupCost: 2000000,
      monthlyRevenue: 800000,
      monthlyExpenses: 400000,
      margin: 0.5,
    },
    commerce: {
      startupCost: 500000,
      monthlyRevenue: 400000,
      monthlyExpenses: 250000,
      margin: 0.38,
    },
  };

  const sector_data = sectorData[sector] || sectorData.commerce;
  const startupCost = data.availableCapital || data.startupCapital || sector_data.startupCost;
  const monthlyRevenue = data.monthlyRevenue || sector_data.monthlyRevenue;
  const monthlyExpenses = monthlyRevenue * (1 - sector_data.margin);
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  const breakEvenMonth = Math.ceil(startupCost / monthlyProfit);

  return {
    startupCost,
    monthlyRevenue,
    monthlyExpenses,
    monthlyProfit,
    breakEvenMonth,
    yearOneProfit: monthlyProfit * 12,
    yearTwoProfit: monthlyProfit * 12 * 1.5,
    yearThreeProfit: monthlyProfit * 12 * 2,
    roi: ((monthlyProfit * 36 - startupCost) / startupCost) * 100,
    scenarios: [
      {
        name: "Pessimiste",
        description: "-30% de revenus",
        monthlyRevenue: monthlyRevenue * 0.7,
        monthlyExpenses: monthlyExpenses,
        breakEvenMonth: Math.ceil(startupCost / (monthlyRevenue * 0.7 - monthlyExpenses)),
        yearOneProfit: (monthlyRevenue * 0.7 - monthlyExpenses) * 12,
        probability: 20,
      },
      {
        name: "Réaliste",
        description: "Scénario prévu",
        monthlyRevenue: monthlyRevenue,
        monthlyExpenses: monthlyExpenses,
        breakEvenMonth: breakEvenMonth,
        yearOneProfit: monthlyProfit * 12,
        probability: 60,
      },
      {
        name: "Optimiste",
        description: "+50% de revenus",
        monthlyRevenue: monthlyRevenue * 1.5,
        monthlyExpenses: monthlyExpenses,
        breakEvenMonth: Math.ceil(startupCost / (monthlyRevenue * 1.5 - monthlyExpenses)),
        yearOneProfit: (monthlyRevenue * 1.5 - monthlyExpenses) * 12,
        probability: 20,
      },
    ],
    fundingSources: [
      {
        name: "Microfinance",
        amount: startupCost * 0.5,
        description: "Prêt microfinance local",
        timeline: "2-4 semaines",
        requirements: [
          "Plan d'affaires",
          "Garantie personnelle",
          "Références",
        ],
      },
      {
        name: "Subventions",
        amount: startupCost * 0.2,
        description: "Subventions gouvernementales ou ONG",
        timeline: "4-8 semaines",
        requirements: [
          "Projet d'impact social",
          "Dossier complet",
          "Présentation",
        ],
      },
    ],
    monetizationStrategies: [
      "Vente directe aux clients",
      "Modèle d'abonnement mensuel",
      "Commissions sur les ventes",
      "Services additionnels premium",
      "Partenariats et distributions",
    ],
  };
}

/**
 * Génère un guide d'action semaine par semaine
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateActionGuide(_mode: string, _data: AnyModeInput): ActionStep[] {
  return [
    {
      week: 1,
      action: "Définir votre vision et objectifs clairs",
      responsible: "Vous",
      resources: [
        "Bloc-notes",
        "Temps: 5 heures",
      ],
      successCriteria: "Vision écrite et objectifs SMART définis",
      dependencies: [],
    },
    {
      week: 2,
      action: "Rechercher et valider votre marché",
      responsible: "Vous + 1 mentor",
      resources: [
        "Liste de 20+ prospects",
        "Temps: 10 heures",
        "Budget: 20,000 XOF (déplacements)",
      ],
      successCriteria: "10+ entretiens complétés, demande validée",
      dependencies: ["Week 1"],
    },
    {
      week: 3,
      action: "Analyser la concurrence et identifier votre avantage",
      responsible: "Vous",
      resources: [
        "Rapport concurrentiel",
        "Temps: 8 heures",
      ],
      successCriteria: "3+ avantages uniques identifiés",
      dependencies: ["Week 2"],
    },
    {
      week: 4,
      action: "Créer votre plan d'affaires initial",
      responsible: "Vous + Mentor",
      resources: [
        "Template: Plan d'affaires",
        "Temps: 15 heures",
      ],
      successCriteria: "Plan d'affaires complet et validé",
      dependencies: ["Week 1-3"],
    },
    {
      week: 5,
      action: "Identifier les sources de financement",
      responsible: "Vous",
      resources: [
        "Liste de microfinances",
        "Temps: 10 heures",
      ],
      successCriteria: "3+ sources de financement identifiées",
      dependencies: ["Week 4"],
    },
    {
      week: 6,
      action: "Préparer votre pitch et demander du financement",
      responsible: "Vous",
      resources: [
        "Présentation PowerPoint",
        "Temps: 12 heures",
      ],
      successCriteria: "Pitch présenté à 3+ investisseurs",
      dependencies: ["Week 4-5"],
    },
    {
      week: 7,
      action: "Créer votre MVP ou prototype",
      responsible: "Vous + Équipe",
      resources: [
        "Matériaux nécessaires",
        "Temps: 20 heures",
        "Budget: Selon le projet",
      ],
      successCriteria: "MVP fonctionnel et testable",
      dependencies: ["Week 1-4"],
    },
    {
      week: 8,
      action: "Tester avec 10+ utilisateurs et itérer",
      responsible: "Vous + Équipe",
      resources: [
        "Retours utilisateurs",
        "Temps: 15 heures",
      ],
      successCriteria: "Score de satisfaction > 7/10",
      dependencies: ["Week 7"],
    },
  ];
}

/**
 * Génère les risques et stratégies de mitigation
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateRisks(_mode: string, _sector: string, _data: AnyModeInput): RiskMitigation[] {
  return [
    {
      risk: "Manque de capital",
      probability: 70,
      impact: "high",
      mitigation: "Chercher des microcrédits, subventions, ou démarrer plus petit",
      contingency: "Réduire les coûts de 30%, chercher des partenaires",
    },
    {
      risk: "Concurrence forte",
      probability: 60,
      impact: "medium",
      mitigation: "Différenciation par la qualité, service, ou prix",
      contingency: "Cibler un segment de niche spécifique",
    },
    {
      risk: "Manque de clients",
      probability: 50,
      impact: "high",
      mitigation: "Marketing agressif, partenariats, bouche-à-oreille",
      contingency: "Ajuster le produit ou le marché cible",
    },
    {
      risk: "Problèmes opérationnels",
      probability: 40,
      impact: "medium",
      mitigation: "Processus clairs, formation d'équipe, outils de gestion",
      contingency: "Sous-traiter ou recruter rapidement",
    },
    {
      risk: "Changements réglementaires",
      probability: 30,
      impact: "high",
      mitigation: "Rester informé, consulter des experts, s'adapter rapidement",
      contingency: "Diversifier les sources de revenus",
    },
  ];
}

/**
 * Génère les opportunités
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateOpportunities(_mode: string, _sector: string, _data: AnyModeInput): string[] {
  return [
    "Partenariats avec d'autres entrepreneurs",
    "Expansion géographique à d'autres régions",
    "Diversification des produits/services",
    "Accès aux marchés d'exportation",
    "Intégration verticale (production + distribution)",
    "Création d'une franchise ou modèle scalable",
    "Accès aux financements plus importants",
    "Collaboration avec les institutions gouvernementales",
  ];
}

/**
 * Génère les prochaines étapes
 */
// Les paramètres sont conservés dans la signature — les appelants les passent
// et le contenu doit finir par en dépendre — mais ce générateur renvoie pour
// l'instant le même résultat quels que soient le mode, le secteur et l'entrée.
function generateNextSteps(_mode: string, _data: AnyModeInput): string[] {
  return [
    "1. Télécharger le plan d'action détaillé (8 semaines)",
    "2. Rejoindre la communauté d'entrepreneurs",
    "3. Trouver un mentor dans votre secteur",
    "4. Accéder aux ressources et templates",
    "5. Commencer la semaine 1 du plan d'action",
    "6. Partager votre progression avec la communauté",
    "7. Ajuster votre plan basé sur les retours",
    "8. Célébrer vos victoires et apprendre des défis",
  ];
}
