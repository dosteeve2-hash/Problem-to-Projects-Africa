export type IntakeMode = "skills" | "idea" | "problem"

export type IntakePayload = {
  mode: IntakeMode
  country: string
  city?: string
  sector: string
  user_level: "beginner" | "intermediate" | "advanced"
  background?: string
  skills?: string[]
  tools?: string[]
  time_available?: string
  goal?: string
  raw_idea?: string
  raw_problem?: string
  constraints?: string[]
}

export type FeasibilityLevel = "low" | "medium" | "high"
export type ImpactLevel = "low" | "medium" | "high"

export type GeneratedProjectResult = {
  title: string
  one_liner: string
  problem_statement: string
  target_users: string[]
  why_now: string
  why_local_fit: string
  feasibility: { level: FeasibilityLevel; explanation: string }
  impact: { level: ImpactLevel; explanation: string }
  recommended_stack: string[]
  non_technical_requirements: string[]
  mvp_scope: string[]
  roadmap_30_days: {
    week_1: string[]
    week_2: string[]
    week_3: string[]
    week_4: string[]
  }
  project_alternatives: Array<{ title: string; one_liner: string }>
  next_best_action: string
  skills_to_strengthen: string[]
}

export type GenerateResponse = {
  id: string
  result: GeneratedProjectResult
}

export type GenerateError = {
  error: string
}

export type CountryMetadata = {
  code: string
  name: string
  flag: string
  city_examples: string[]
  language: string
}

export type SectorOption = {
  id: string
  label: string
  icon: string
}

export type SavedProject = {
  id: string
  user_id: string
  title: string
  one_liner: string
  country: string
  sector: string
  mode: IntakeMode
  result: GeneratedProjectResult
  created_at: string
}

export type Submission = {
  id: string
  user_id?: string
  payload: IntakePayload
  created_at: string
}
