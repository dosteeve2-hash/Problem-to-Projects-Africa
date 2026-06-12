import type { GeneratedProjectResult } from "@/types"

const KEY_PREFIX = "p2p_result_"

export function storeResult(id: string, result: GeneratedProjectResult): void {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(KEY_PREFIX + id, JSON.stringify(result))
  } catch {
    // sessionStorage unavailable — ignore
  }
}

export function loadResult(id: string): GeneratedProjectResult | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + id)
    if (!raw) return null
    return JSON.parse(raw) as GeneratedProjectResult
  } catch {
    return null
  }
}
