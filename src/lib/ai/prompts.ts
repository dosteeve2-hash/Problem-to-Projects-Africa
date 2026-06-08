import type { IntakePayload } from "@/types"
import { getCountryContext } from "@/lib/context"
import { getCountryByCode } from "@/lib/context/countries"

export const SYSTEM_PROMPT = `Tu es un expert en innovation africaine, entrepreneuriat local, projets tech et non-tech.

Tu connais profondément les réalités économiques, sociales, infrastructurelles et culturelles de chaque pays africain. Tu comprends ce qui fonctionne réellement sur le terrain : les contraintes de connectivité, les habitudes de paiement, les réseaux de distribution, les codes sociaux, les modèles économiques viables.

Ton rôle est d'aider les talents africains à transformer leurs compétences, idées ou observations de problèmes en projets concrets, réalistes et localement pertinents.

Tes recommandations sont :
- CONCRÈTES : pas de vague "construis une app", mais "construis X qui fait Y pour Z personnes à Z1 avec le modèle économique Z2"
- RÉALISTES : adaptées au niveau de l'utilisateur, aux ressources disponibles localement, aux contraintes infrastructurelles
- LOCALEMENT PERTINENTES : utilise les opportunités et contraintes spécifiques au pays et à la ville
- ACTIONNABLES : chaque recommandation peut être mise en oeuvre dans les 30 prochains jours

Tu réponds UNIQUEMENT en JSON valide selon le schéma fourni. Aucun texte avant ou après le JSON.`

export function buildUserPrompt(payload: IntakePayload): string {
  const country = getCountryByCode(payload.country)
  const countryContext = getCountryContext(payload.country)

  const contextLines = [
    `MODE: ${payload.mode}`,
    `PAYS: ${country?.name ?? payload.country} ${country?.flag ?? ""}`,
    payload.city ? `VILLE: ${payload.city}` : "",
    `SECTEUR D'INTÉRÊT: ${payload.sector}`,
    `NIVEAU: ${payload.user_level}`,
    payload.background ? `BACKGROUND: ${payload.background}` : "",
    payload.skills?.length ? `COMPÉTENCES: ${payload.skills.join(", ")}` : "",
    payload.tools?.length ? `OUTILS MAÎTRISÉS: ${payload.tools.join(", ")}` : "",
    payload.time_available ? `TEMPS DISPONIBLE: ${payload.time_available}` : "",
    payload.goal ? `OBJECTIF: ${payload.goal}` : "",
    payload.raw_idea ? `IDÉE BRUTE: ${payload.raw_idea}` : "",
    payload.raw_problem ? `PROBLÈME OBSERVÉ: ${payload.raw_problem}` : "",
    payload.constraints?.length
      ? `CONTRAINTES PERSONNELLES: ${payload.constraints.join(", ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n")

  return `${contextLines}

---
${countryContext}

---

Génère un projet adapté à ce profil. Réponds en JSON valide avec exactement ce schéma :

{
  "title": "Nom du projet (court, mémorable)",
  "one_liner": "Une phrase qui explique ce que c'est et pour qui",
  "problem_statement": "Le problème réel résolu, ancré dans la réalité locale",
  "target_users": ["Groupe 1", "Groupe 2"],
  "why_now": "Pourquoi ce projet est pertinent maintenant dans ce pays",
  "why_local_fit": "Pourquoi ce projet est parfaitement adapté au contexte local",
  "feasibility": {
    "level": "low|medium|high",
    "explanation": "Explication réaliste de la faisabilité pour ce profil"
  },
  "impact": {
    "level": "low|medium|high",
    "explanation": "Impact potentiel sur les utilisateurs et la société"
  },
  "recommended_stack": ["Tech/outil 1", "Tech/outil 2"],
  "non_technical_requirements": ["Partenariat avec X", "Accès à Y"],
  "mvp_scope": ["Feature 1", "Feature 2", "Feature 3"],
  "roadmap_30_days": {
    "week_1": ["Action 1", "Action 2"],
    "week_2": ["Action 1", "Action 2"],
    "week_3": ["Action 1", "Action 2"],
    "week_4": ["Action 1", "Action 2"]
  },
  "project_alternatives": [
    {"title": "Alternative 1", "one_liner": "Description courte"},
    {"title": "Alternative 2", "one_liner": "Description courte"}
  ],
  "next_best_action": "L'action concrète unique à faire aujourd'hui pour commencer",
  "skills_to_strengthen": ["Compétence 1", "Compétence 2"]
}`
}
