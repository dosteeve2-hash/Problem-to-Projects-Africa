"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ProjectAnalysis } from "@/lib/types/project-analysis";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface ProjectOptimizationDashboardProps {
  project: ProjectAnalysis;
  onUpdate?: (updates: Partial<ProjectAnalysis>) => void;
}

export function ProjectOptimizationDashboard({
  project,
  // Déclarée dans l'API du composant mais encore jamais appelée : le tableau
  // de bord n'a pas de chemin d'écriture vers le projet.
  onUpdate: _onUpdate,
}: ProjectOptimizationDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [trackingData, setTrackingData] = useState({
    actualRevenue: 0,
    actualExpenses: 0,
    completedPhases: 0,
    tasksCompleted: 0,
    teamSize: 1,
  });

  // Calculer les KPIs
  const projectedRevenue = project.financial.monthlyRevenue * 3; // 3 mois
  const actualRevenue = trackingData.actualRevenue;
  const revenueVariance = ((actualRevenue - projectedRevenue) / projectedRevenue) * 100;

  const projectedExpenses = project.financial.monthlyExpenses * 3;
  const actualExpenses = trackingData.actualExpenses;
  const expenseVariance = ((actualExpenses - projectedExpenses) / projectedExpenses) * 100;

  const projectedProfit = projectedRevenue - projectedExpenses;
  const actualProfit = actualRevenue - actualExpenses;
  const profitVariance = ((actualProfit - projectedProfit) / projectedProfit) * 100;

  // Données pour le radar chart (comparaison Prévu vs Réel)
  const radarData = [
    {
      metric: "Revenus",
      projected: 100,
      actual: Math.min((actualRevenue / projectedRevenue) * 100, 150),
    },
    {
      metric: "Dépenses",
      projected: 100,
      actual: Math.min((actualExpenses / projectedExpenses) * 100, 150),
    },
    {
      metric: "Rentabilité",
      projected: 100,
      actual: Math.min((actualProfit / projectedProfit) * 100, 150),
    },
    {
      metric: "Progression",
      projected: 100,
      actual: (trackingData.completedPhases / project.roadmap.phases.length) * 100,
    },
    {
      metric: "Équipe",
      projected: 100,
      actual: Math.min((trackingData.teamSize / 5) * 100, 150),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* En-tête avec KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Revenus (3 mois)</div>
          <div className="text-2xl font-bold mb-2">
            {(actualRevenue / 1000000).toFixed(1)}M FCFA
          </div>
          <div className={`text-sm ${revenueVariance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {revenueVariance >= 0 ? "+" : ""}{revenueVariance.toFixed(1)}% vs prévu
          </div>
          <Progress value={Math.min((actualRevenue / projectedRevenue) * 100, 100)} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Dépenses (3 mois)</div>
          <div className="text-2xl font-bold mb-2">
            {(actualExpenses / 1000000).toFixed(1)}M FCFA
          </div>
          <div className={`text-sm ${expenseVariance <= 0 ? "text-green-600" : "text-red-600"}`}>
            {expenseVariance >= 0 ? "+" : ""}{expenseVariance.toFixed(1)}% vs prévu
          </div>
          <Progress value={Math.min((actualExpenses / projectedExpenses) * 100, 100)} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Profit (3 mois)</div>
          <div className="text-2xl font-bold mb-2">
            {(actualProfit / 1000000).toFixed(1)}M FCFA
          </div>
          <div className={`text-sm ${profitVariance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {profitVariance >= 0 ? "+" : ""}{profitVariance.toFixed(1)}% vs prévu
          </div>
          <Progress value={Math.min((actualProfit / projectedProfit) * 100, 100)} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Progression</div>
          <div className="text-2xl font-bold mb-2">
            {trackingData.completedPhases}/{project.roadmap.phases.length} phases
          </div>
          <div className="text-sm text-gray-600">
            {((trackingData.completedPhases / project.roadmap.phases.length) * 100).toFixed(0)}% complété
          </div>
          <Progress
            value={(trackingData.completedPhases / project.roadmap.phases.length) * 100}
            className="mt-2"
          />
        </Card>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
          <TabsTrigger value="tracking">Suivi</TabsTrigger>
          <TabsTrigger value="optimization">Optimisation</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Comparaison Prévu vs Réel</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 150]} />
                <Radar
                  name="Prévu"
                  dataKey="projected"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Réel"
                  dataKey="actual"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Phases Complétées</h3>
              <div className="space-y-3">
                {project.roadmap.phases.map((phase, idx) => (
                  <div key={phase.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={idx < trackingData.completedPhases}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTrackingData({
                            ...trackingData,
                            completedPhases: Math.min(
                              trackingData.completedPhases + 1,
                              project.roadmap.phases.length
                            ),
                          });
                        } else {
                          setTrackingData({
                            ...trackingData,
                            completedPhases: Math.max(trackingData.completedPhases - 1, 0),
                          });
                        }
                      }}
                      className="w-5 h-5 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{phase.name}</div>
                      <div className="text-xs text-gray-600">
                        Semaines {phase.startWeek}-{phase.endWeek}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Métriques de Santé</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Santé Financière</span>
                    <span className="font-semibold">
                      {actualProfit > 0 ? "✓ Sain" : "⚠ Alerte"}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((actualProfit / (projectedProfit * 1.2)) * 100, 100)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Contrôle des Dépenses</span>
                    <span className="font-semibold">
                      {actualExpenses <= projectedExpenses ? "✓ Bon" : "⚠ Dépassement"}
                    </span>
                  </div>
                  <Progress
                    value={Math.min((projectedExpenses / actualExpenses) * 100, 100)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression du Projet</span>
                    <span className="font-semibold">
                      {((trackingData.completedPhases / project.roadmap.phases.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={(trackingData.completedPhases / project.roadmap.phases.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Suivi */}
        <TabsContent value="tracking" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Saisir les Données Réelles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Revenus Réels (3 mois)</label>
                <input
                  type="number"
                  value={trackingData.actualRevenue}
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      actualRevenue: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Dépenses Réelles (3 mois)</label>
                <input
                  type="number"
                  value={trackingData.actualExpenses}
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      actualExpenses: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Taille de l’Équipe</label>
                <input
                  type="number"
                  value={trackingData.teamSize}
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      teamSize: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tâches Complétées</label>
                <input
                  type="number"
                  value={trackingData.tasksCompleted}
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      tasksCompleted: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="0"
                />
              </div>
            </div>

            <Button className="mt-6 w-full">💾 Sauvegarder le Suivi</Button>
          </Card>
        </TabsContent>

        {/* Optimisation */}
        <TabsContent value="optimization" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Recommandations d’Optimisation</h3>

            <div className="space-y-4">
              {/* Recommandations basées sur les données */}
              {actualRevenue < projectedRevenue * 0.8 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-semibold text-sm mb-1">⚠️ Revenus Inférieurs aux Prévisions</div>
                  <div className="text-sm text-gray-700">
                    Vos revenus sont 20% en dessous des prévisions. Considérez :
                  </div>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
                    <li>• Augmenter vos efforts de marketing</li>
                    <li>• Ajuster les prix de votre produit/service</li>
                    <li>• Diversifier votre base de clients</li>
                  </ul>
                </div>
              )}

              {actualExpenses > projectedExpenses * 1.2 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <div className="font-semibold text-sm mb-1">🚨 Dépenses Supérieures aux Prévisions</div>
                  <div className="text-sm text-gray-700">
                    Vos dépenses dépassent les prévisions de 20%. Considérez :
                  </div>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
                    <li>• Réduire les coûts opérationnels</li>
                    <li>• Négocier de meilleurs prix avec les fournisseurs</li>
                    <li>• Automatiser certains processus</li>
                  </ul>
                </div>
              )}

              {trackingData.completedPhases < (project.roadmap.phases.length * 0.5) && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <div className="font-semibold text-sm mb-1">ℹ️ Progression du Projet</div>
                  <div className="text-sm text-gray-700">
                    Vous êtes en retard sur le calendrier. Considérez :
                  </div>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-4">
                    <li>• Augmenter les ressources allouées</li>
                    <li>• Prioriser les tâches critiques</li>
                    <li>• Revoir le calendrier du projet</li>
                  </ul>
                </div>
              )}

              {project.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded">
                  <div className="font-semibold text-sm mb-1">✓ {rec.action}</div>
                  <div className="text-sm text-gray-700">Impact: {rec.impact}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Alertes */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Alertes et Notifications</h3>

            <div className="space-y-3">
              {project.risks.risks
                .filter((r) => r.likelihood === "high")
                .map((risk) => (
                  <div key={risk.id} className="p-4 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-sm">🚨 {risk.description}</div>
                        <div className="text-sm text-gray-700 mt-1">
                          Atténuation: {risk.mitigation}
                        </div>
                      </div>
                      <Badge variant="destructive">Haute Priorité</Badge>
                    </div>
                  </div>
                ))}

              {project.risks.risks
                .filter((r) => r.likelihood === "medium")
                .map((risk) => (
                  <div key={risk.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-sm">⚠️ {risk.description}</div>
                        <div className="text-sm text-gray-700 mt-1">
                          Atténuation: {risk.mitigation}
                        </div>
                      </div>
                      <Badge variant="secondary">Moyenne Priorité</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
