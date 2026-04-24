import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  Badge,
  Alert,
  Tabs,
  StatCard,
  Breadcrumb,
} from "@/components/ui/design-system";

export default function ResultsPage() {
  const router = useRouter();
  const [projectData] = useState({
    title: "Plateforme de Vente de Fruits Frais",
    sector: "commerce",
    mode: "idea",
    viabilityScore: 82,
    status: "completed",
    createdAt: "2026-04-20",
  });

  const financialData = {
    startupCapital: 1000000,
    monthlyRevenue: 500000,
    monthlyExpenses: 350000,
    monthlyProfit: 150000,
    breakEvenMonth: 7,
    yearlyProfit: 1800000,
  };

  const risks = [
    {
      title: "Manque de Capital",
      probability: 70,
      impact: "Élevé",
      mitigation: "Chercher des microcrédits ou des subventions",
    },
    {
      title: "Concurrence",
      probability: 60,
      impact: "Moyen",
      mitigation: "Différenciation par la qualité et le service",
    },
    {
      title: "Fluctuation des Prix",
      probability: 80,
      impact: "Moyen",
      mitigation: "Contrats à long terme avec les producteurs",
    },
  ];

  const roadmap = [
    {
      phase: 1,
      title: "Préparation",
      duration: "1-2 mois",
      tasks: [
        "Finaliser le plan d'affaires",
        "Obtenir les autorisations",
        "Sécuriser le financement",
      ],
    },
    {
      phase: 2,
      title: "Mise en Place",
      duration: "2-3 mois",
      tasks: [
        "Acquérir l'équipement",
        "Recruter l'équipe",
        "Mettre en place les processus",
      ],
    },
    {
      phase: 3,
      title: "Lancement",
      duration: "1-2 mois",
      tasks: [
        "Commencer la production",
        "Lancer le marketing",
        "Collecter les retours",
      ],
    },
    {
      phase: 4,
      title: "Croissance",
      duration: "3-12 mois",
      tasks: [
        "Augmenter la production",
        "Élargir le marché",
        "Optimiser la rentabilité",
      ],
    },
  ];

  const recommendations = [
    "Commencez par un marché test pour valider votre modèle",
    "Établissez des partenariats avec les producteurs locaux",
    "Investissez dans la formation de votre équipe",
    "Mettez en place un système de contrôle de qualité",
    "Diversifiez vos sources de revenus",
  ];

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
              className="text-neutral-600 hover:text-foreground px-3 py-2 rounded-lg transition"
            >
              Dashboard
            </Link>
            <Button variant="primary" size="sm" onClick={() => router.push("/")}>
              Nouveau Projet
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: projectData.title },
          ]}
        />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{projectData.title}</h1>
              <p className="text-neutral-600 mt-2">
                Secteur: <span className="font-semibold">{projectData.sector}</span> • Mode:{" "}
                <span className="font-semibold">{projectData.mode}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary-800 mb-2">
                {projectData.viabilityScore}%
              </div>
              <Badge variant="success">Projet Viable</Badge>
            </div>
          </div>

          <Alert variant="success" title="Félicitations!">
            Votre projet a un score de viabilité élevé. Vous êtes prêt à passer à l'étape suivante!
          </Alert>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Capital de Démarrage"
            value={`${(financialData.startupCapital / 1000000).toFixed(1)}M XOF`}
            icon="💰"
          />
          <StatCard
            label="Revenu Mensuel"
            value={`${(financialData.monthlyRevenue / 1000).toFixed(0)}K XOF`}
            icon="📈"
          />
          <StatCard
            label="Profit Mensuel"
            value={`${(financialData.monthlyProfit / 1000).toFixed(0)}K XOF`}
            icon="✅"
          />
          <StatCard
            label="Point d'Équilibre"
            value={`${financialData.breakEvenMonth} mois`}
            icon="🎯"
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            {
              id: "financial",
              label: "Analyse Financière",
              content: <FinancialAnalysis data={financialData} />,
            },
            {
              id: "risks",
              label: "Évaluation des Risques",
              content: <RisksAnalysis risks={risks} />,
            },
            {
              id: "roadmap",
              label: "Roadmap",
              content: <RoadmapSection roadmap={roadmap} />,
            },
            {
              id: "recommendations",
              label: "Recommandations",
              content: <RecommendationsSection recommendations={recommendations} />,
            },
          ]}
        />

        {/* Actions */}
        <div className="mt-12 flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            Télécharger le Rapport PDF
          </Button>
          <Button variant="secondary" size="lg">
            Partager le Projet
          </Button>
          <Button variant="tertiary" size="lg" onClick={() => router.push("/dashboard")}>
            Retour au Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}

function FinancialAnalysis({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-bold text-foreground mb-6">Projections Financières</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Investissement Initial</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600">Capital de Démarrage</span>
                <span className="font-semibold">{data.startupCapital.toLocaleString()} XOF</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>{data.startupCapital.toLocaleString()} XOF</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Flux Mensuels</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600">Revenu</span>
                <span className="font-semibold text-success-600">
                  +{data.monthlyRevenue.toLocaleString()} XOF
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Dépenses</span>
                <span className="font-semibold text-error-600">
                  -{data.monthlyExpenses.toLocaleString()} XOF
                </span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
                <span>Profit</span>
                <span className="text-success-600">
                  +{data.monthlyProfit.toLocaleString()} XOF
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>Point d'Équilibre:</strong> Vous atteindrez votre point d'équilibre après{" "}
            <strong>{data.breakEvenMonth} mois</strong> d'activité.
          </p>
        </div>

        <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
          <p className="text-sm text-success-800">
            <strong>Profit Annuel Estimé:</strong> {data.yearlyProfit.toLocaleString()} XOF
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-foreground mb-6">Scénarios</h3>
        <div className="space-y-4">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Scénario Pessimiste (-30%)</h4>
            <p className="text-sm text-neutral-600">
              Profit mensuel: {(data.monthlyProfit * 0.7).toLocaleString()} XOF
            </p>
          </div>
          <div className="p-4 border border-primary-200 bg-primary-50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Scénario Réaliste</h4>
            <p className="text-sm text-neutral-600">
              Profit mensuel: {data.monthlyProfit.toLocaleString()} XOF
            </p>
          </div>
          <div className="p-4 border border-success-200 bg-success-50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Scénario Optimiste (+30%)</h4>
            <p className="text-sm text-neutral-600">
              Profit mensuel: {(data.monthlyProfit * 1.3).toLocaleString()} XOF
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RisksAnalysis({ risks }: { risks: any[] }) {
  return (
    <div className="space-y-4">
      {risks.map((risk, idx) => (
        <Card key={idx} variant={risk.probability > 70 ? "warning" : "default"}>
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-bold text-foreground">{risk.title}</h4>
            <Badge
              variant={
                risk.probability > 70
                  ? "error"
                  : risk.probability > 50
                    ? "warning"
                    : "success"
              }
            >
              {risk.probability}%
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-neutral-600 mb-1">Probabilité</p>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary-800 h-2 rounded-full"
                  style={{ width: `${risk.probability}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 mb-1">Impact</p>
              <p className="font-semibold text-foreground">{risk.impact}</p>
            </div>
          </div>

          <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-sm text-primary-800">
              <strong>Mitigation:</strong> {risk.mitigation}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RoadmapSection({ roadmap }: { roadmap: any[] }) {
  return (
    <div className="space-y-4">
      {roadmap.map((phase, idx) => (
        <Card key={idx}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-800 text-white font-bold">
                {phase.phase}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-foreground">{phase.title}</h4>
                <Badge variant="primary">{phase.duration}</Badge>
              </div>
              <ul className="space-y-2">
                {phase.tasks.map((task: string, idx: number) => (
                  <li key={idx} className="text-sm text-neutral-600 flex items-center gap-2">
                    <span className="text-primary-800">✓</span> {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RecommendationsSection({ recommendations }: { recommendations: string[] }) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, idx) => (
        <Card key={idx} variant="success">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <p className="text-foreground">{rec}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
