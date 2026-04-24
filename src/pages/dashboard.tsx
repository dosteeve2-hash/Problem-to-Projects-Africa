import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  StatCard,
  Alert,
  Tabs,
  EmptyState,
  Badge,
} from "@/components/ui/design-system";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Plateforme de Vente de Fruits Frais",
      mode: "idea",
      sector: "commerce",
      status: "completed",
      score: 82,
      createdAt: "2026-04-20",
    },
    {
      id: 2,
      title: "Solution d'Eau Potable en Zone Rurale",
      mode: "problem",
      sector: "eau",
      status: "in-progress",
      score: 65,
      createdAt: "2026-04-22",
    },
  ]);

  const stats = [
    { label: "Projets Créés", value: projects.length, icon: "📊" },
    { label: "Score Moyen", value: "73.5%", icon: "⭐" },
    { label: "Projets Viables", value: "2", icon: "✅" },
  ];

  const handleNewProject = () => {
    router.push("/");
  };

  const handleViewProject = (id: number) => {
    router.push(`/results?projectId=${id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-lg font-bold text-primary-800 hidden sm:block">
              Problem to Project Africa
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-primary-800 font-semibold hover:bg-primary-50 px-3 py-2 rounded-lg transition"
            >
              Dashboard
            </Link>
            <Link
              href="/account"
              className="text-neutral-600 hover:text-foreground px-3 py-2 rounded-lg transition"
            >
              Compte
            </Link>
            <Button variant="secondary" size="sm" onClick={() => router.push("/auth/login")}>
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Bienvenue, Jean 👋</h2>
            <p className="text-neutral-600 mt-1">
              Gérez vos projets et continuez votre parcours d'entrepreneur
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNewProject}
            icon="+"
          >
            Nouveau Projet
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            {
              id: "all",
              label: "Tous les Projets",
              content: <ProjectsList projects={projects} onViewProject={handleViewProject} />,
            },
            {
              id: "completed",
              label: "Complétés",
              content: (
                <ProjectsList
                  projects={projects.filter((p) => p.status === "completed")}
                  onViewProject={handleViewProject}
                />
              ),
            },
            {
              id: "in-progress",
              label: "En Cours",
              content: (
                <ProjectsList
                  projects={projects.filter((p) => p.status === "in-progress")}
                  onViewProject={handleViewProject}
                />
              ),
            },
          ]}
        />

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-bold text-foreground mb-2">Analyser un Problème</h4>
              <p className="text-sm text-neutral-600 mb-4">
                Vous avez identifié un problème local? Transformez-le en projet viable.
              </p>
              <Button variant="tertiary" size="sm" onClick={handleNewProject}>
                Commencer →
              </Button>
            </Card>

            <Card className="hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-bold text-foreground mb-2">Valider une Idée</h4>
              <p className="text-sm text-neutral-600 mb-4">
                Vous avez une idée brillante? Validez sa viabilité financière.
              </p>
              <Button variant="tertiary" size="sm" onClick={handleNewProject}>
                Commencer →
              </Button>
            </Card>

            <Card className="hover:shadow-lg cursor-pointer transition">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-foreground mb-2">Valoriser vos Compétences</h4>
              <p className="text-sm text-neutral-600 mb-4">
                Vous avez des compétences? Découvrez comment les valoriser.
              </p>
              <Button variant="tertiary" size="sm" onClick={handleNewProject}>
                Commencer →
              </Button>
            </Card>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Ressources Utiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="success">
              <h4 className="font-bold text-success-800 mb-2">📖 Guide Complet</h4>
              <p className="text-sm text-success-700 mb-4">
                Apprenez comment utiliser la plateforme et maximiser vos chances de succès.
              </p>
              <Link href="#" className="text-success-800 font-semibold hover:underline">
                Lire le guide →
              </Link>
            </Card>

            <Card variant="warning">
              <h4 className="font-bold text-warning-800 mb-2">💬 Communauté</h4>
              <p className="text-sm text-warning-700 mb-4">
                Connectez-vous avec d'autres entrepreneurs et partagez vos expériences.
              </p>
              <Link href="#" className="text-warning-800 font-semibold hover:underline">
                Rejoindre →
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProjectsList({
  projects,
  onViewProject,
}: {
  projects: any[];
  onViewProject: (id: number) => void;
}) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon="📭"
        title="Aucun projet"
        description="Vous n'avez pas encore créé de projet. Commencez maintenant!"
        action={<Button variant="primary">Créer un Projet</Button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-bold text-foreground">{project.title}</h4>
                <Badge variant={project.status === "completed" ? "success" : "warning"}>
                  {project.status === "completed" ? "Complété" : "En cours"}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                Mode: <span className="font-semibold">{project.mode}</span> • Secteur:{" "}
                <span className="font-semibold">{project.sector}</span> • Créé le{" "}
                <span className="font-semibold">{project.createdAt}</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 max-w-xs bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-800 to-accent-500 h-2 rounded-full"
                    style={{ width: `${project.score}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {project.score}% viabilité
                </span>
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => onViewProject(project.id)}
            >
              Voir →
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
