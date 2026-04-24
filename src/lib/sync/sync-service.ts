import type { ProjectAnalysis } from "@/lib/types/project-analysis";

/**
 * Service de synchronisation pour partager les données entre web et mobile
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
    trackingData: Record<string, any>
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
  static async fetchTrackingData(projectId: string): Promise<Record<string, any> | null> {
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
    recommendations: Array<any>
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
