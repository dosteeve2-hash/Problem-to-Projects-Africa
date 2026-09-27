import type { ProjectAnalysis } from "@/lib/types/project-analysis";

/**
 * Charges utiles JSON envoyées telles quelles au serveur de synchronisation.
 * Aucun schéma n'est partagé avec l'app mobile : `unknown` décrit honnêtement
 * une valeur non vérifiée, là où `any` faisait croire qu'elle l'était.
 */
type JsonRecord = Record<string, unknown>;

/**
 * Service de synchronisation pour partager les données entre web et mobile.
 *
 * ⚠️ Mesuré le 2026-09-27 : ce service ne synchronise rien, et rien ne l'appelle.
 *
 * 1. Aucun fichier de `src/` n'importe `SyncService`. Il n'est donc pas « la
 *    synchronisation du produit » : c'est du code mort.
 * 2. Les neuf routes qu'il appelle (`/api/sync/projects`,
 *    `/api/sync/tracking/:id`, `/api/sync/recommendations/:id`,
 *    `/api/sync/users/:userId/projects`, les exports PDF et le partage)
 *    n'existent pas. La seule route existante est `/api/sync`, sans segment
 *    imbriqué, et son POST se décrit lui-même comme un bouchon : il répond
 *    « Données synchronisées avec succès » sans rien persister.
 * 3. `API_BASE` retombe sur `http://localhost:3000` : en production, sans
 *    `NEXT_PUBLIC_API_URL`, un navigateur appellerait la machine du visiteur.
 *
 * Ce commentaire existe pour qu'on ne relise pas ces 200 lignes en croyant que
 * l'offline-first du produit est fait. Il est fait dans l'intention, pas dans le
 * code. Le jour où on l'écrit vraiment, ce sont les routes qui manquent d'abord,
 * pas ce fichier.
 */
export class SyncService {
  private static readonly API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  /**
   * Synchroniser un projet vers le serveur
   */
  static async syncProjectToServer(project: ProjectAnalysis): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.projectId,
          data: project,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation:", error);
      throw error;
    }
  }

  /**
   * Récupérer un projet depuis le serveur
   */
  static async fetchProjectFromServer(projectId: string): Promise<ProjectAnalysis | null> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/projects/${projectId}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.project;
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
      return null;
    }
  }

  /**
   * Synchroniser les données de suivi
   */
  static async syncTrackingData(
    projectId: string,
    trackingData: JsonRecord
  ): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/tracking/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...trackingData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation du suivi:", error);
      throw error;
    }
  }

  /**
   * Récupérer les données de suivi
   */
  static async fetchTrackingData(projectId: string): Promise<JsonRecord | null> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/tracking/${projectId}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tracking;
    } catch (error) {
      console.error("Erreur lors de la récupération du suivi:", error);
      return null;
    }
  }

  /**
   * Synchroniser les recommandations
   */
  static async syncRecommendations(
    projectId: string,
    recommendations: readonly unknown[]
  ): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/recommendations/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recommendations,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation des recommandations:", error);
      throw error;
    }
  }

  /**
   * Récupérer tous les projets de l'utilisateur
   */
  static async fetchUserProjects(userId: string): Promise<ProjectAnalysis[]> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/users/${userId}/projects`);

      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
      return [];
    }
  }

  /**
   * Supprimer un projet
   */
  static async deleteProject(projectId: string): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      throw error;
    }
  }

  /**
   * Exporter un projet en PDF
   */
  static async exportProjectAsPDF(projectId: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/projects/${projectId}/export/pdf`);

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      throw error;
    }
  }

  /**
   * Partager un projet
   */
  static async shareProject(projectId: string, email: string): Promise<string> {
    try {
      const response = await fetch(`${this.API_BASE}/api/sync/projects/${projectId}/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Share failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.shareLink;
    } catch (error) {
      console.error("Erreur lors du partage:", error);
      throw error;
    }
  }
}
