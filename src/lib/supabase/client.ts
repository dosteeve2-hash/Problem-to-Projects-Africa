import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Les identifiants Supabase sont-ils présents dans le bundle client ? */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Client Supabase navigateur, ou `null` si le projet n'est pas configuré.
 *
 * `createBrowserClient` lève quand l'URL ou la clé manquent. Comme il était
 * appelé depuis un effet de l'en-tête, présent sur toutes les pages, cette
 * exception remontait à la frontière d'erreur : sans variables d'environnement,
 * `npm run dev` affichait « This page couldn't load » sur l'ensemble du site,
 * alors que le rendu serveur, lui, fonctionnait.
 *
 * Le middleware Supabase gère déjà ce cas en se court-circuitant ; le client
 * navigateur fait désormais la même chose, et les appelants dégradent au lieu
 * de casser.
 */
export function createSupabaseBrowserClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
