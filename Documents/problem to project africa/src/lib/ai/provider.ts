import type { RecommendationInput, RecommendationResult } from "@/lib/types/recommendation";

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
