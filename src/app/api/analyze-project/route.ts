import { NextRequest, NextResponse } from "next/server";
import { EnhancedProjectAnalyzer } from "@/lib/recommendation/enhanced-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valider les données d'entrée
    if (!body.mode || !["skills", "idea", "problem"].includes(body.mode)) {
      return NextResponse.json(
        { error: "Mode invalide" },
        { status: 400 }
      );
    }

    // Analyser le projet
    const analysis = await EnhancedProjectAnalyzer.analyzeProject(body);

    // Sauvegarder l'analyse en base de données (optionnel)
    // await db.projectAnalysis.create({ data: analysis });

    return NextResponse.json({
      success: true,
      projectId: analysis.projectId,
      analysis,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'analyse du projet:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'analyse" },
      { status: 500 }
    );
  }
}
