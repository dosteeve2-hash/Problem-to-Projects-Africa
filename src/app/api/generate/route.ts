import { NextRequest, NextResponse } from "next/server"
import { IntakePayloadSchema } from "@/lib/ai/schemas"
import { generateProject } from "@/lib/ai/generate-project"
import { createSubmission } from "@/lib/db/submissions"
import { saveGeneratedProject } from "@/lib/db/generated-projects"
import { createClient } from "@/lib/supabase/server"

// Simple in-memory rate limiter: 5 req/min per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (entry.count >= 5) return false

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessaie dans une minute." },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 })
  }

  const parsed = IntakePayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const payload = parsed.data

  // Get current user if authenticated
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  try {
    const [result, submission] = await Promise.all([
      generateProject(payload),
      createSubmission(payload, user?.id),
    ])

    const saved = await saveGeneratedProject(
      submission.id,
      result,
      payload,
      user?.id
    )

    return NextResponse.json({ id: saved.id, result })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la génération"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
