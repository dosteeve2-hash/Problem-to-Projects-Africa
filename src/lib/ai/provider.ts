import type { RecommendationInput, RecommendationResult } from "@/lib/types/recommendation";

/**
 * ⚠️ Mesuré le 2026-09-27 : rien dans `src/` n'importe `@/lib/ai`.
 *
 * La recommandation servie par `/api/recommend` est entièrement déterministe —
 * `lib/recommendation/engine.ts` choisit dans le catalogue de 709 lignes. Aucun
 * appel à un modèle n'est fait, donc aucun crédit n'est dépensé : c'est
 * conforme à la doctrine « coût quasi nul », et ce n'est pas un défaut.
 *
 * Ce qui serait un défaut, c'est de brancher ce fichier sans ce qui va avec. Le
 * jour où un `registerProvider` réel est appelé depuis une route, deux règles de
 * `CLAUDE.md` deviennent obligatoires dans la même PR :
 *   — un rate limit sur la route (max 20 requêtes / utilisateur / heure) ;
 *   — l'entrée utilisateur passée en délimiteurs XML
 *     (`<user_input>` + userText + `</user_input>`), jamais concaténée dans le
 *     system prompt.
 * Aucune des deux n'existe aujourd'hui dans ce dépôt, parce qu'aucune n'est
 * encore nécessaire.
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
