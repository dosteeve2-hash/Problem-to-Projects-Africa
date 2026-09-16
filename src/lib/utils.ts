import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * This ensures Tailwind classes are properly merged without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Message lisible d'une valeur levée. `throw` accepte n'importe quoi en JS :
 * lire `.message` sur un `any` marchait par accident et renvoyait `undefined`
 * dès qu'on levait autre chose qu'une Error.
 */
export function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return fallback;
}

/**
 * Ne retient la valeur d'un `<select>` que si elle fait partie des options
 * connues. `e.target.value` est un `string` : l'écrire tel quel dans un champ
 * typé en union de littéraux ne marchait que parce que le handler était
 * annoté `any`.
 */
export function pickOption<T extends string>(
  value: string,
  allowed: readonly T[],
  fallback: T,
): T {
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}
