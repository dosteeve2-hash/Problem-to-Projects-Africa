import type { RecommendationInput, RecommendationResult } from "@/lib/types/recommendation";

/**
 * ⚠️ Mesuré le 2026-09-27 : rien dans `src/` n'importe `@/lib/ai`, sur cette
 * branche. Ni `registerProvider` ni `getProvider` n'est appelé, et `package.json`
 * ne contient aucun SDK de modèle : cet échafaudage ne génère rien.
 *
 * La recommandation servie par `/api/recommend` est entièrement déterministe —
 * `lib/recommendation/engine.ts` choisit dans le catalogue de 709 lignes. Aucun
 * crédit n'est dépensé, ce qui est conforme à la doctrine « coût quasi nul ».
 *
 * Et surtout : **la vraie couche de génération existe déjà**, sur l'autre lignée
 * du dépôt, `master` — SDK Anthropic, quatre contextes pays, validation Zod,
 * limite de débit (5 requêtes/minute par IP) et system prompt constant avec le
 * texte de l'utilisateur envoyé en message user, jamais concaténé. Elle est
 * saine ; elle n'a simplement jamais été déployée. `main` et `master` n'ont
 * aucun ancêtre commun : ce sont deux applications construites séparément dans
 * le même dépôt.
 *
 * Donc il n'y a rien à écrire ici. Il y a une décision à prendre — laquelle des
 * deux lignées fait foi, et faut-il porter les dix fichiers de génération de
 * `master` vers `main` — et c'est la question Q13 posée à Steeve dans
 * `AUTOMATION/QUESTIONS.md` du dépôt forge-afrika. Brancher un fournisseur ici
 * sans cette réponse, ce serait réécrire à côté ce qui existe déjà à dix mètres.
 *
 * Le jour où le portage est fait, les deux règles de `CLAUDE.md` restent la
 * condition d'entrée : un rate limit sur la route (max 20 requêtes/utilisateur/
 * heure) et l'entrée utilisateur isolée par des délimiteurs XML, jamais
 * concaténée dans le system prompt. La couche de `master` les respecte déjà.
 */

/**
 * AI provider interface for generating recommendations.
 * Implementations can wrap Claude, Ollama, OpenAI, or any other provider.
 */
export type AIProvider = {
  name: string;
  generate: (input: RecommendationInput, systemPrompt: string) => Promise<RecommendationResult>;
};

/**
 * Registry of available AI providers.
 * Add new providers here as they become available.
 */
const providers = new Map<string, AIProvider>();

export function registerProvider(provider: AIProvider) {
  providers.set(provider.name, provider);
}

export function getProvider(name: string): AIProvider | undefined {
  return providers.get(name);
}

export function listProviders(): string[] {
  return Array.from(providers.keys());
}

/**
 * Returns the active provider based on env config, or null if none configured.
 * Falls back to the local heuristic engine when no AI provider is available.
 */
export function getActiveProvider(): AIProvider | null {
  const providerName = process.env.AI_PROVIDER;
  if (!providerName) return null;
  return providers.get(providerName) ?? null;
}
