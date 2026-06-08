import { createClient } from "@/lib/supabase/server"
import type { GeneratedProjectResult, IntakePayload } from "@/types"

export async function saveGeneratedProject(
  submissionId: string,
  result: GeneratedProjectResult,
  payload: IntakePayload,
  userId?: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("generated_projects")
    .insert({
      submission_id: submissionId,
      user_id: userId ?? null,
      title: result.title,
      one_liner: result.one_liner,
      country: payload.country,
      sector: payload.sector,
      mode: payload.mode,
      result,
    })
    .select("id")
    .single()

  if (error) throw new Error(`Failed to save generated project: ${error.message}`)
  return data
}

export async function getGeneratedProject(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("generated_projects")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error(`Project not found`)
  return data
}

export async function getUserProjects(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("generated_projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw new Error(`Failed to fetch projects`)
  return data ?? []
}
