export const PRODUCT_NAME = "Problem to Project Africa";
export const MVP_COUNTRY = "Burkina Faso";

export const MVP_MODES = [
  {
    slug: "skills",
    title: "Skills -> Project",
    description:
      "Pour les personnes qui ont des competences, mais pas encore une direction claire.",
    prompt:
      "Transforme mes competences actuelles en un projet utile, realiste et pertinent localement.",
  },
  {
    slug: "idea",
    title: "Idea -> Project",
    description:
      "Pour les personnes qui ont deja une idee, mais qui ont besoin de validation et de priorisation.",
    prompt:
      "Dis-moi si mon idee vaut la peine d'etre poursuivie, et comment la rendre plus executable.",
  },
  {
    slug: "problem",
    title: "Problem -> Project",
    description:
      "Pour les personnes qui voient un probleme concret, mais qui ne savent pas encore quoi construire.",
    prompt:
      "Aide-moi a transformer un probleme observe sur le terrain en projet concret avec une feuille de route.",
  },
] as const;

export const SUPPORTED_SECTORS = [
  "Agriculture",
  "Education",
  "Sante",
  "Commerce informel",
  "Energie",
  "Logistique",
] as const;
