import { createClient } from "@/lib/supabase/server"
import type { IntakePayload } from "@/types"

export async function createSubmission(payload: IntakePayload, userId?: string) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      payload,
      user_id: userId ?? null,
    })
    .select("id")
    .single()

  if (error) throw new Error(`Failed to create submission: ${error.message}`)
  return data
}
