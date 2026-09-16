/**
 * Questions Intelligentes pour les Formulaires d'Intake
 * Posent les bonnes questions pour vraiment comprendre la situation
 */

export interface IntakeQuestion {
  id: string;
  step: number;
  question: string;
  type: "text" | "textarea" | "number" | "select" | "multiselect" | "radio";
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  conditional?: {
    dependsOn: string;
    value: string | string[];
  };
}

/**
 * Questions pour le Mode Problème
 * Aide à transformer un problème local en projet viable
 */
export const PROBLEM_MODE_QUESTIONS: IntakeQuestion[] = [
  // Step 1: Comprendre le Problème
  {
    id: "problem_title",
    step: 1,
    question: "Quel est le problème que vous avez identifié?",
    type: "text",
    placeholder: "Ex: Manque d'accès à l'eau potable en zone rurale",
    helpText: "Soyez spécifique et concis. En 1-2 phrases.",
    validation: { required: true, minLength: 10, maxLength: 100 },
  },
  {
    id: "problem_description",
    step: 1,
    question: "Décrivez ce problème en détail",
    type: "textarea",
    placeholder: "Qui est affecté? Où? Depuis quand? Pourquoi c'est un problème?",
    helpText: "Plus vous donnez de détails, meilleures seront les recommandations",
    validation: { required: true, minLength: 50, maxLength: 1000 },
  },
  {
    id: "problem_scale",
    step: 1,
    question: "Combien de personnes sont affectées par ce problème?",
    type: "number",
    placeholder: "Ex: 5000",
    helpText: "Estimation approximative",
    validation: { required: true, min: 10, max: 10000000 },
  },
  {
    id: "problem_frequency",
    step: 1,
    question: "À quelle fréquence ce problème se pose-t-il?",
    type: "select",
    options: [
      { value: "daily", label: "Quotidien" },
      { value: "weekly", label: "Hebdomadaire" },
      { value: "monthly", label: "Mensuel" },
      { value: "seasonal", label: "Saisonnier" },
      { value: "occasional", label: "Occasionnel" },
    ],
    helpText: "Cela affecte l'urgence et la viabilité",
    validation: { required: true },
  },
  {
    id: "problem_severity",
    step: 1,
    question: "Quelle est la gravité de ce problème?",
    type: "select",
    options: [
      { value: "low", label: "Faible - Inconfort mineur" },
      { value: "medium", label: "Moyen - Affecte la productivité" },
      { value: "high", label: "Élevé - Risque pour la santé/sécurité" },
      { value: "critical", label: "Critique - Menace la vie" },
    ],
    helpText: "Évaluez l'impact réel sur les gens",
    validation: { required: true },
  },

  // Step 2: Vos Ressources
  {
    id: "available_skills",
    step: 2,
    question: "Quelles compétences avez-vous ou pouvez-vous acquérir?",
    type: "textarea",
    placeholder: "Ex: Menuiserie, électricité, gestion, marketing, etc.",
    helpText: "Listez vos compétences actuelles et celles que vous êtes prêt à apprendre",
    validation: { required: true, minLength: 10, maxLength: 500 },
  },
  {
    id: "available_capital",
    step: 2,
    question: "Quel capital pouvez-vous investir pour démarrer?",
    type: "select",
    options: [
      { value: "0-100k", label: "0 - 100,000 XOF" },
      { value: "100k-500k", label: "100,000 - 500,000 XOF" },
      { value: "500k-1m", label: "500,000 - 1,000,000 XOF" },
      { value: "1m-5m", label: "1,000,000 - 5,000,000 XOF" },
      { value: "5m+", label: "5,000,000+ XOF" },
    ],
    helpText: "Soyez honnête. Cela affecte la viabilité du projet",
    validation: { required: true },
  },
  {
    id: "available_time",
    step: 2,
    question: "Combien d'heures par semaine pouvez-vous consacrer à ce projet?",
    type: "select",
    options: [
      { value: "5-10", label: "5-10 heures (part-time)" },
      { value: "10-20", label: "10-20 heures (part-time sérieux)" },
      { value: "20-40", label: "20-40 heures (full-time)" },
      { value: "40+", label: "40+ heures (full-time + plus)" },
    ],
    helpText: "Soyez réaliste. C'est crucial pour le succès",
    validation: { required: true },
  },
  {
    id: "team_available",
    step: 2,
    question: "Avez-vous une équipe ou des partenaires?",
    type: "select",
    options: [
      { value: "solo", label: "Je suis seul" },
      { value: "1-2", label: "1-2 personnes" },
      { value: "3-5", label: "3-5 personnes" },
      { value: "5+", label: "5+ personnes" },
    ],
    helpText: "Une équipe augmente les chances de succès",
    validation: { required: true },
  },

  // Step 3: Vos Ambitions
  {
    id: "ambitions",
    step: 3,
    question: "Quels sont vos objectifs avec ce projet?",
    type: "textarea",
    placeholder: "Ex: Créer 50 emplois, générer 2M XOF/an, aider 10,000 personnes",
    helpText: "Soyez ambitieux mais réaliste",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },
  {
    id: "impact_goal",
    step: 3,
    question: "Quel impact social voulez-vous créer?",
    type: "select",
    options: [
      { value: "employment", label: "Créer des emplois" },
      { value: "income", label: "Augmenter les revenus" },
      { value: "health", label: "Améliorer la santé" },
      { value: "education", label: "Améliorer l'éducation" },
      { value: "environment", label: "Protéger l'environnement" },
      { value: "multiple", label: "Plusieurs impacts" },
    ],
    helpText: "Cela aide à aligner votre projet avec les besoins réels",
    validation: { required: true },
  },
  {
    id: "success_definition",
    step: 3,
    question: "Comment définissez-vous le succès pour ce projet?",
    type: "textarea",
    placeholder: "Ex: 100 clients payants, 500K XOF/mois, 80% de satisfaction",
    helpText: "Définissez des métriques claires et mesurables",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },
  {
    id: "timeline",
    step: 3,
    question: "Quel est votre timeline?",
    type: "select",
    options: [
      { value: "3months", label: "3 mois" },
      { value: "6months", label: "6 mois" },
      { value: "1year", label: "1 an" },
      { value: "2years", label: "2 ans" },
      { value: "flexible", label: "Flexible" },
    ],
    helpText: "Quand voulez-vous lancer?",
    validation: { required: true },
  },
];

/**
 * Questions pour le Mode Idée
 * Aide à valider et développer une idée de projet
 */
export const IDEA_MODE_QUESTIONS: IntakeQuestion[] = [
  // Step 1: Votre Idée
  {
    id: "idea_title",
    step: 1,
    question: "Quel est le titre de votre projet?",
    type: "text",
    placeholder: "Ex: Plateforme de Vente de Fruits Frais en Ligne",
    helpText: "Soyez clair et descriptif",
    validation: { required: true, minLength: 5, maxLength: 100 },
  },
  {
    id: "idea_description",
    step: 1,
    question: "Décrivez votre idée en détail",
    type: "textarea",
    placeholder: "Qu'allez-vous vendre? À qui? Comment?",
    helpText: "Soyez précis. Incluez le produit/service, le marché, le modèle économique",
    validation: { required: true, minLength: 50, maxLength: 1000 },
  },
  {
    id: "unique_value",
    step: 1,
    question: "Qu'est-ce qui rend votre idée unique?",
    type: "textarea",
    placeholder: "Ex: Meilleure qualité, prix plus bas, service plus rapide",
    helpText: "Pourquoi les clients choisiraient-ils vous plutôt que la concurrence?",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },
  {
    id: "target_market",
    step: 1,
    question: "Qui est votre marché cible?",
    type: "textarea",
    placeholder: "Ex: Commerçants de Ouagadougou, femmes entrepreneurs, étudiants",
    helpText: "Soyez aussi spécifique que possible",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },

  // Step 2: Le Marché
  {
    id: "market_size",
    step: 2,
    question: "Estimez la taille de votre marché",
    type: "select",
    options: [
      { value: "small", label: "Petit (< 1,000 clients potentiels)" },
      { value: "medium", label: "Moyen (1,000 - 10,000)" },
      { value: "large", label: "Grand (10,000 - 100,000)" },
      { value: "very_large", label: "Très grand (100,000+)" },
    ],
    helpText: "Combien de clients potentiels existent?",
    validation: { required: true },
  },
  {
    id: "competitors",
    step: 2,
    question: "Qui sont vos concurrents?",
    type: "textarea",
    placeholder: "Ex: Entreprise X, Entreprise Y, vendeurs informels",
    helpText: "Listez au moins 3 concurrents et leurs forces/faiblesses",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },
  {
    id: "competitive_advantage",
    step: 2,
    question: "Quel est votre avantage concurrentiel?",
    type: "select",
    options: [
      { value: "price", label: "Prix plus bas" },
      { value: "quality", label: "Meilleure qualité" },
      { value: "service", label: "Meilleur service" },
      { value: "innovation", label: "Innovation/Nouveauté" },
      { value: "network", label: "Réseau/Partenariats" },
      { value: "multiple", label: "Plusieurs avantages" },
    ],
    helpText: "Pourquoi vous allez gagner?",
    validation: { required: true },
  },
  {
    id: "demand_validation",
    step: 2,
    question: "Avez-vous validé la demande?",
    type: "select",
    options: [
      { value: "no", label: "Non, c'est une intuition" },
      { value: "partial", label: "Partiellement (quelques discussions)" },
      { value: "yes", label: "Oui (10+ entretiens confirmés)" },
      { value: "strong", label: "Très oui (pré-commandes reçues)" },
    ],
    helpText: "Avez-vous parlé à de vrais clients?",
    validation: { required: true },
  },

  // Step 3: Les Finances
  {
    id: "startup_capital",
    step: 3,
    question: "Combien de capital avez-vous besoin pour démarrer?",
    type: "number",
    placeholder: "Ex: 1000000",
    helpText: "Estimation en XOF",
    validation: { required: true, min: 10000, max: 100000000 },
  },
  {
    id: "monthly_revenue_estimate",
    step: 3,
    question: "Quel revenu mensuel estimez-vous au lancement?",
    type: "number",
    placeholder: "Ex: 500000",
    helpText: "Estimation réaliste en XOF",
    validation: { required: true, min: 10000, max: 100000000 },
  },
  {
    id: "profit_margin",
    step: 3,
    question: "Quelle est votre marge bénéficiaire estimée?",
    type: "select",
    options: [
      { value: "10", label: "10% (commerce, bas margin)" },
      { value: "20", label: "20% (commerce standard)" },
      { value: "30", label: "30% (services, produits)" },
      { value: "50", label: "50% (services haut de gamme)" },
      { value: "70", label: "70%+ (digital, logiciels)" },
    ],
    helpText: "Revenu - Coûts = Profit",
    validation: { required: true },
  },
  {
    id: "break_even_expectation",
    step: 3,
    question: "Quand pensez-vous atteindre le point d'équilibre?",
    type: "select",
    options: [
      { value: "3months", label: "3 mois" },
      { value: "6months", label: "6 mois" },
      { value: "1year", label: "1 an" },
      { value: "2years", label: "2 ans" },
      { value: "uncertain", label: "Incertain" },
    ],
    helpText: "Quand les revenus = dépenses?",
    validation: { required: true },
  },
];

/**
 * Questions pour le Mode Compétences
 * Aide à valoriser les compétences en créant un projet
 */
export const SKILLS_MODE_QUESTIONS: IntakeQuestion[] = [
  // Step 1: Vos Compétences
  {
    id: "main_skills",
    step: 1,
    question: "Quelles sont vos compétences principales?",
    type: "textarea",
    placeholder: "Ex: Menuiserie, électricité, plomberie, informatique, marketing",
    helpText: "Listez 3-5 compétences clés",
    validation: { required: true, minLength: 10, maxLength: 500 },
  },
  {
    id: "skill_level",
    step: 1,
    question: "Quel est votre niveau de compétence?",
    type: "select",
    options: [
      { value: "beginner", label: "Débutant (< 1 an)" },
      { value: "intermediate", label: "Intermédiaire (1-3 ans)" },
      { value: "advanced", label: "Avancé (3-7 ans)" },
      { value: "expert", label: "Expert (7+ ans)" },
    ],
    helpText: "Soyez honnête sur votre niveau",
    validation: { required: true },
  },
  {
    id: "certifications",
    step: 1,
    question: "Avez-vous des certifications ou diplômes?",
    type: "textarea",
    placeholder: "Ex: Diplôme en électricité, Certification Google, etc.",
    helpText: "Listez vos qualifications formelles",
    validation: { required: false, maxLength: 500 },
  },
  {
    id: "experience_years",
    step: 1,
    question: "Combien d'années d'expérience avez-vous?",
    type: "number",
    placeholder: "Ex: 5",
    helpText: "Années d'expérience professionnelle",
    validation: { required: true, min: 0, max: 60 },
  },

  // Step 2: Vos Intérêts et Objectifs
  {
    id: "interest_sectors",
    step: 2,
    question: "Dans quels secteurs êtes-vous intéressé?",
    type: "multiselect",
    options: [
      { value: "agriculture", label: "Agriculture" },
      { value: "élevage", label: "Élevage" },
      { value: "santé", label: "Santé" },
      { value: "éducation", label: "Éducation" },
      { value: "eau", label: "Eau" },
      { value: "énergie", label: "Énergie" },
      { value: "commerce", label: "Commerce" },
      { value: "artisanat", label: "Artisanat" },
      { value: "tech", label: "Technologie" },
    ],
    helpText: "Sélectionnez 2-3 secteurs",
    validation: { required: true },
  },
  {
    id: "desired_role",
    step: 2,
    question: "Quel rôle désirez-vous?",
    type: "select",
    options: [
      { value: "freelancer", label: "Freelancer/Consultant" },
      { value: "employee", label: "Employé" },
      { value: "entrepreneur", label: "Entrepreneur (créer mon entreprise)" },
      { value: "partner", label: "Partenaire/Associé" },
      { value: "flexible", label: "Flexible" },
    ],
    helpText: "Quel type de travail voulez-vous?",
    validation: { required: true },
  },
  {
    id: "income_goal",
    step: 2,
    question: "Quel revenu mensuel visez-vous?",
    type: "select",
    options: [
      { value: "100k", label: "100,000 XOF" },
      { value: "300k", label: "300,000 XOF" },
      { value: "500k", label: "500,000 XOF" },
      { value: "1m", label: "1,000,000 XOF" },
      { value: "2m+", label: "2,000,000+ XOF" },
    ],
    helpText: "Soyez réaliste mais ambitieux",
    validation: { required: true },
  },

  // Step 3: Vos Ressources et Projets
  {
    id: "network",
    step: 3,
    question: "Avez-vous un réseau professionnel?",
    type: "select",
    options: [
      { value: "no", label: "Non, je dois construire" },
      { value: "small", label: "Petit (5-10 contacts)" },
      { value: "medium", label: "Moyen (10-50 contacts)" },
      { value: "large", label: "Grand (50+ contacts)" },
    ],
    helpText: "Votre réseau est crucial pour le succès",
    validation: { required: true },
  },
  {
    id: "project_ideas",
    step: 3,
    question: "Avez-vous des idées de projets basés sur vos compétences?",
    type: "textarea",
    placeholder: "Ex: Service de réparation, formation, consulting, produit",
    helpText: "Décrivez 1-2 idées de projets",
    validation: { required: true, minLength: 20, maxLength: 500 },
  },
  {
    id: "startup_readiness",
    step: 3,
    question: "Êtes-vous prêt à démarrer?",
    type: "select",
    options: [
      { value: "not_ready", label: "Non, j'ai besoin de formation" },
      { value: "partially", label: "Partiellement, j'ai besoin de support" },
      { value: "ready", label: "Oui, je peux démarrer maintenant" },
      { value: "already_started", label: "Déjà commencé" },
    ],
    helpText: "Honnêtement, où en êtes-vous?",
    validation: { required: true },
  },
];

/**
 * Récupère les questions pour un mode spécifique
 */
export function getQuestionsForMode(mode: "problem" | "idea" | "skills"): IntakeQuestion[] {
  switch (mode) {
    case "problem":
      return PROBLEM_MODE_QUESTIONS;
    case "idea":
      return IDEA_MODE_QUESTIONS;
    case "skills":
      return SKILLS_MODE_QUESTIONS;
    default:
      return [];
  }
}

/**
 * Récupère les questions pour une étape spécifique
 */
export function getQuestionsForStep(
  mode: "problem" | "idea" | "skills",
  step: number
): IntakeQuestion[] {
  const questions = getQuestionsForMode(mode);
  return questions.filter((q) => q.step === step);
}

/**
 * Valide les réponses
 */
export function validateAnswers(
  questions: IntakeQuestion[],
  answers: Record<string, unknown>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const question of questions) {
    const answer = answers[question.id];
    const validation = question.validation;

    // minLength/maxLength s'appliquent aux caractères d'un texte et aux
    // éléments d'un multiselect. L'ancienne écriture, `answer?.length`, mesurait
    // bien les deux mais annonçait « caractères » dans les deux cas ; sur un
    // nombre elle valait `undefined`, et la comparaison était alors toujours
    // fausse — inapplicable plutôt qu'invalide, ce qui reste le comportement.
    const measured =
      typeof answer === "string"
        ? { size: answer.length, unit: "caractères" }
        : Array.isArray(answer)
          ? { size: answer.length, unit: "éléments" }
          : null;

    if (validation?.required && !answer) {
      errors[question.id] = "Ce champ est obligatoire";
      continue;
    }

    if (validation?.minLength && measured && measured.size < validation.minLength) {
      errors[question.id] = `Minimum ${validation.minLength} ${measured.unit}`;
      continue;
    }

    if (validation?.maxLength && measured && measured.size > validation.maxLength) {
      errors[question.id] = `Maximum ${validation.maxLength} ${measured.unit}`;
      continue;
    }

    if (validation?.min && Number(answer) < validation.min) {
      errors[question.id] = `Minimum ${validation.min}`;
      continue;
    }

    if (validation?.max && Number(answer) > validation.max) {
      errors[question.id] = `Maximum ${validation.max}`;
      continue;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
