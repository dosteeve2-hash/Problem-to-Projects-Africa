import { z } from "zod"

export const IntakePayloadSchema = z.object({
  mode: z.enum(["skills", "idea", "problem"]),
  country: z.string().min(2).max(2),
  city: z.string().optional(),
  sector: z.string().min(1),
  user_level: z.enum(["beginner", "intermediate", "advanced"]),
  background: z.string().optional(),
  skills: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  time_available: z.string().optional(),
  goal: z.string().optional(),
  raw_idea: z.string().optional(),
  raw_problem: z.string().optional(),
  constraints: z.array(z.string()).optional(),
})

export const GeneratedProjectResultSchema = z.object({
  title: z.string(),
  one_liner: z.string(),
  problem_statement: z.string(),
  target_users: z.array(z.string()),
  why_now: z.string(),
  why_local_fit: z.string(),
  feasibility: z.object({
    level: z.enum(["low", "medium", "high"]),
    explanation: z.string(),
  }),
  impact: z.object({
    level: z.enum(["low", "medium", "high"]),
    explanation: z.string(),
  }),
  recommended_stack: z.array(z.string()),
  non_technical_requirements: z.array(z.string()),
  mvp_scope: z.array(z.string()),
  roadmap_30_days: z.object({
    week_1: z.array(z.string()),
    week_2: z.array(z.string()),
    week_3: z.array(z.string()),
    week_4: z.array(z.string()),
  }),
  project_alternatives: z.array(
    z.object({
      title: z.string(),
      one_liner: z.string(),
    })
  ),
  next_best_action: z.string(),
  skills_to_strengthen: z.array(z.string()),
})
