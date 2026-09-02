"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { ProjectAnalysis } from "@/lib/types/project-analysis";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EnhancedResultsDisplayProps {
  analysis: ProjectAnalysis;
  onSave?: () => void;
  onRefine?: () => void;
}

export function EnhancedResultsDisplay({
  analysis,
  onSave,
  onRefine,
}: EnhancedResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-green-50";
    if (score >= 50) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* En-tête avec scores */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{analysis.title}</h1>
          <p className="text-gray-600">{analysis.description}</p>
        </div>

        {/* Scores principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`p-4 ${getScoreBgColor(analysis.overallScore)}`}>
            <div className="text-sm text-gray-600 mb-2">Score Global</div>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore.toFixed(0)}/100
            </div>
            <Progress
              value={analysis.overallScore}
              className="mt-2"
            />
          </Card>

          <Card className={`p-4 ${getScoreBgColor(analysis.viabilityScore)}`}>
            <div className="text-sm text-gray-600 mb-2">Viabilité</div>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.viabilityScore)}`}>
              {analysis.viabilityScore.toFixed(0)}/100
            </div>
            <Progress
              value={analysis.viabilityScore}
              className="mt-2"
            />
          </Card>

          <Card className={`p-4 ${getScoreBgColor(analysis.profitabilityScore)}`}>
            <div className="text-sm text-gray-600 mb-2">Rentabilité</div>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.profitabilityScore)}`}>
              {analysis.profitabilityScore.toFixed(0)}/100
            </div>
            <Progress
              value={analysis.profitabilityScore}
              className="mt-2"
            />
          </Card>

          <Card className={`p-4 ${getScoreBgColor(analysis.feasibilityScore)}`}>
            <div className="text-sm text-gray-600 mb-2">Faisabilité</div>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.feasibilityScore)}`}>
              {analysis.feasibilityScore.toFixed(0)}/100
            </div>
            <Progress
              value={analysis.feasibilityScore}
              className="mt-2"
            />
          </Card>
        </div>

        {/* Insights motivationnels */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-lg mb-2">💡 Insights Motivationnels</h3>
          <p className="text-gray-700 mb-4">{analysis.motivationalInsights.encouragement}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Vos Forces</h4>
              <ul className="space-y-1">
                {analysis.motivationalInsights.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    ✓ {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Opportunités</h4>
              <ul className="space-y-1">
                {analysis.motivationalInsights.opportunities.map((opp, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    → {opp}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Prochaines Étapes</h4>
              <ul className="space-y-1">
                {analysis.motivationalInsights.nextSteps.slice(0, 3).map((step, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Onglets de contenu détaillé */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
          <TabsTrigger value="financial">Financier</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="risks">Risques</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Résumé du Projet</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Informations Clés</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Secteur:</span>
                    <span className="font-semibold ml-2">{analysis.sector}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Localisation:</span>
                    <span className="font-semibold ml-2">{analysis.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Mode:</span>
                    <Badge className="ml-2">
                      {analysis.mode === "skills" && "Basé sur les compétences"}
                      {analysis.mode === "idea" && "Basé sur une idée"}
                      {analysis.mode === "problem" && "Basé sur un problème"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Recommandations Principales</h4>
                <div className="space-y-2">
                  {analysis.recommendations.slice(0, 3).map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-gray-50 rounded border-l-4 border-blue-500"
                    >
                      <div className="text-sm font-semibold">{rec.action}</div>
                      <div className="text-xs text-gray-600">{rec.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Financier */}
        <TabsContent value="financial" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Analyse Financière</h3>

            {/* Métriques clés */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-sm text-gray-600">Investissement Initial</div>
                <div className="text-2xl font-bold">
                  {(analysis.financial.initialCost / 1000000).toFixed(1)}M FCFA
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded">
                <div className="text-sm text-gray-600">Revenu Mensuel</div>
                <div className="text-2xl font-bold">
                  {(analysis.financial.monthlyRevenue / 1000).toFixed(0)}K FCFA
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded">
                <div className="text-sm text-gray-600">Dépenses Mensuelles</div>
                <div className="text-2xl font-bold">
                  {(analysis.financial.monthlyExpenses / 1000).toFixed(0)}K FCFA
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded">
                <div className="text-sm text-gray-600">Break-even</div>
                <div className="text-2xl font-bold">{analysis.financial.breakEvenMonths} mois</div>
              </div>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Projections */}
              <div>
                <h4 className="font-semibold mb-3">Projections 12 Mois</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysis.financial.projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      name="Revenus"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#EF4444"
                      name="Dépenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#3B82F6"
                      name="Bénéfice"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Scénarios */}
              <div>
                <h4 className="font-semibold mb-3">Scénarios ROI 12 Mois</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysis.financial.scenarios}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roi12Months" fill="#3B82F6" name="ROI %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Décomposition des coûts */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Décomposition des Coûts Initiaux</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(analysis.financial.costBreakdown).map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-xs text-gray-600 capitalize">{key}</div>
                    <div className="text-lg font-bold">
                      {((value / analysis.financial.initialCost) * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {(value / 1000).toFixed(0)}K FCFA
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Roadmap du Projet</h3>

            <div className="space-y-4">
              {analysis.roadmap.phases.map((phase) => (
                <div key={phase.id} className="border-l-4 border-blue-500 pl-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{phase.name}</h4>
                    <Badge variant="outline">
                      Semaines {phase.startWeek}-{phase.endWeek}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-600 font-semibold mb-1">Objectifs</div>
                      <ul className="text-sm space-y-1">
                        {phase.objectives.map((obj, i) => (
                          <li key={i}>• {obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 font-semibold mb-1">Livrables</div>
                      <ul className="text-sm space-y-1">
                        {phase.deliverables.map((del, i) => (
                          <li key={i}>✓ {del}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 font-semibold mb-1">Jalons</div>
                      <ul className="text-sm space-y-1">
                        {phase.milestones.map((milestone, i) => (
                          <li key={i}>
                            📍 {milestone.name} (S{milestone.week})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded">
              <div className="text-sm font-semibold mb-2">Durée Totale</div>
              <div className="text-2xl font-bold">
                {analysis.roadmap.timeline.totalDuration} semaines
              </div>
              <div className="text-xs text-gray-600 mt-2">
                Du {analysis.roadmap.timeline.startDate} au{" "}
                {analysis.roadmap.timeline.endDate}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Risques */}
        <TabsContent value="risks" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Évaluation des Risques</h3>

            <div className="space-y-3">
              {analysis.risks.risks.map((risk) => (
                <div
                  key={risk.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{risk.description}</h4>
                      <div className="text-xs text-gray-600 mt-1">
                        Catégorie: <span className="font-semibold">{risk.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          risk.likelihood === "high"
                            ? "destructive"
                            : risk.likelihood === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {risk.likelihood}
                      </Badge>
                      <Badge
                        variant={
                          risk.impact === "high"
                            ? "destructive"
                            : risk.impact === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        Impact: {risk.impact}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Atténuation:</strong> {risk.mitigation}
                  </div>

                  <div className="text-xs text-gray-500">
                    Priorité: {risk.priority}/10
                  </div>
                </div>
              ))}
            </div>

            {/* Opportunités */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Opportunités</h4>
              <div className="space-y-2">
                {analysis.risks.opportunities.map((opp) => (
                  <div key={opp.id} className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-semibold text-sm">{opp.description}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Potentiel: <Badge variant="outline">{opp.potential}</Badge> | Délai:{" "}
                      {opp.timeline}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Ressources */}
        <TabsContent value="resources" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Ressources Requises</h3>

            {/* Compétences */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Compétences Requises</h4>
              <div className="space-y-2">
                {analysis.resources.skills.map((skill) => (
                  <div key={skill.name} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{skill.name}</span>
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                    <div className="text-xs text-gray-600">
                      {skill.trainingNeeded
                        ? `Formation requise: ${skill.estimatedTrainingHours}h`
                        : "Pas de formation requise"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outils */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Outils et Équipements</h4>
              <div className="space-y-2">
                {analysis.resources.tools.map((tool) => (
                  <div key={tool.name} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{tool.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{(tool.cost / 1000).toFixed(0)}K FCFA</Badge>
                        {tool.essential && <Badge>Essentiel</Badge>}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Alternatives: {tool.alternatives.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <h4 className="font-semibold mb-3">Budget Total</h4>
              <div className="p-4 bg-blue-50 rounded mb-3">
                <div className="text-2xl font-bold">
                  {(analysis.resources.budget.total / 1000000).toFixed(1)}M FCFA
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(analysis.resources.budget.breakdown).map(([category, amount]) => (
                  <div key={category} className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-xs text-gray-600 capitalize">{category}</div>
                    <div className="font-semibold text-sm">
                      {((amount as number) / 1000).toFixed(0)}K
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Boutons d'action */}
      <div className="flex gap-4 justify-center">
        <Button onClick={onSave} size="lg" className="px-8">
          💾 Sauvegarder ce Projet
        </Button>
        <Button onClick={onRefine} variant="outline" size="lg" className="px-8">
          🔄 Affiner l’Analyse
        </Button>
      </div>
    </div>
  );
}
