import { NextResponse } from "next/server";

import { generateRecommendation } from "@/lib/recommendation/engine";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RecommendationInput } from "@/lib/types/recommendation";

function isValidInput(body: Partial<RecommendationInput>) {
  // We only strictly require the mode and some basic info to generate a recommendation
  // Other fields can have defaults in the engine if missing
  return Boolean(body.mode && body.country);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<RecommendationInput>;

  if (!isValidInput(body)) {
    return NextResponse.json(
      { error: "Missing required fields for recommendation generation." },
      { status: 400 },
    );
  }

  const input = body as RecommendationInput;
  const result = generateRecommendation(input);
  const generatedAt = new Date().toISOString();

  // Try to persist if user is authenticated
  let sessionId: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Create recommendation session
      const { data: session } = await supabase
        .from("recommendation_sessions")
        .insert({
          user_id: user.id,
          mode: input.mode,
          country: input.country,
          region: input.region,
          input_payload: input,
        })
        .select("id")
        .single();

      if (session) {
        sessionId = session.id;

        // Save the recommended project
        await supabase.from("project_recommendations").insert({
          session_id: session.id,
          title: result.recommendedProject.title,
          concept: result.recommendedProject.concept,
          why_it_fits: result.recommendedProject.whyItFits,
          local_why: result.recommendedProject.localWhy,
          feasibility_level: result.recommendedProject.feasibilityLevel,
          cost_level: result.recommendedProject.costLevel,
          complexity_level: result.recommendedProject.complexityLevel,
          mvp_summary: result.recommendedProject.mvpSummary,
          top_features: result.recommendedProject.topFeatures,
          skills_to_learn: result.recommendedProject.skillsToLearn,
          next_step: result.recommendedProject.nextStep,
          roadmap: result.recommendedProject.roadmap,
        });

        // Save alternatives
        const alternatives = result.ideas.slice(1);
        if (alternatives.length > 0) {
          await supabase.from("project_alternatives").insert(
            alternatives.map((alt) => ({
              session_id: session.id,
              title: alt.title,
              concept: alt.concept,
              local_relevance: alt.localRelevance,
            })),
          );
        }
      }
    }
  } catch {
    // Persistence failure should not block the recommendation
  }

  return NextResponse.json({
    result,
    generatedAt,
    sessionId,
  });
}
