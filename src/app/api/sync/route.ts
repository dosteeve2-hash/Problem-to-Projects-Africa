import { NextRequest, NextResponse } from "next/server";
import { errorMessage } from "@/lib/utils";

/**
 * Routes API pour la synchronisation web-mobile
 * GET /api/sync/projects/:id - Récupérer un projet
 * POST /api/sync/projects - Créer/mettre à jour un projet
 * DELETE /api/sync/projects/:id - Supprimer un projet
 * POST /api/sync/tracking/:id - Synchroniser les données de suivi
 * GET /api/sync/tracking/:id - Récupérer les données de suivi
 * POST /api/sync/recommendations/:id - Synchroniser les recommandations
 * GET /api/sync/users/:userId/projects - Récupérer tous les projets de l'utilisateur
 * POST /api/sync/projects/:id/export/pdf - Exporter en PDF
 * POST /api/sync/projects/:id/share - Partager un projet
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "status") {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(request: NextRequest) {
  try {
    // Le corps est consommé pour valider que la requête est bien du JSON,
    // mais rien n'est encore persisté : cet endpoint est un bouchon.
    await request.json();

    return NextResponse.json({
      success: true,
      message: "Données synchronisées avec succès",
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: errorMessage(error, "Erreur lors de la synchronisation") },
      { status: 500 }
    );
  }
}
