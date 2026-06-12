import { createClient } from "@/lib/supabase/server"

export async function getOrCreateProfile(userId: string, email: string) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { data: existing } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (existing) return existing

  const { data, error } = await supabase
    .from("profiles")
    .insert({ id: userId, email })
    .select("*")
    .single()

  if (error) throw new Error(`Failed to create profile: ${error.message}`)
  return data
}
