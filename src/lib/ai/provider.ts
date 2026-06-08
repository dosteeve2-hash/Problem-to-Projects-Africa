import Anthropic from "@anthropic-ai/sdk"
import type { GeneratedProjectResult } from "@/types"
import { GeneratedProjectResultSchema } from "./schemas"
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts"
import type { IntakePayload } from "@/types"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function generateProjectWithAI(
  payload: IntakePayload
): Promise<GeneratedProjectResult> {
  const userPrompt = buildUserPrompt(payload)

  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: SYSTEM_PROMPT,
  })

  const textContent = message.content.find((block) => block.type === "text")
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text content in AI response")
  }

  // Extract JSON from the response (handle potential markdown code blocks)
  let jsonText = textContent.text.trim()
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim()
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    throw new Error("AI response is not valid JSON")
  }

  const result = GeneratedProjectResultSchema.safeParse(parsed)
  if (!result.success) {
    throw new Error(`AI response does not match expected schema: ${result.error.message}`)
  }

  return result.data
}
