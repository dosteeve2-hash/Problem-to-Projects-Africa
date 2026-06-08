import type { IntakePayload, GeneratedProjectResult } from "@/types"
import { generateProjectWithAI } from "./provider"

export async function generateProject(
  payload: IntakePayload
): Promise<GeneratedProjectResult> {
  return generateProjectWithAI(payload)
}
