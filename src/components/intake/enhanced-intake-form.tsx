"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface EnhancedIntakeFormProps {
  mode: "skills" | "idea" | "problem";
}

export function EnhancedIntakeForm({ mode }: EnhancedIntakeFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Données du formulaire
  const [formData, setFormData] = useState({
    // Étape 1: Informations de base
    name: "",
    email: "",
    location: "",
    sector: "",

    // Étape 2: Contexte spécifique au mode
    // Pour "skills"
    skills: [] as string[],
    skillsLevel: "intermediate" as "beginner" | "intermediate" | "advanced",
    yearsExperience: 0,

    // Pour "idea"
    ideaTitle: "",
    ideaDescription: "",
    targetMarket: "",
    uniqueValue: "",

    // Pour "problem"
    problemDescription: "",
    affectedPeople: "",
    currentSolutions: "",
    whyNotWorking: "",

    // Étape 3: Ressources et contraintes
    budget: 0,
    timeAvailable: "part-time" as "part-time" | "full-time" | "weekends",
    teamSize: 1,
    hasEquipment: false,
    hasNetwork: false,

    // Étape 4: Ambitions et objectifs
    goal: "income" as "income" | "impact" | "learning" | "growth",
    timeframe: "6-months" as "3-months" | "6-months" | "1-year" | "2-years",
    expectedRevenue: 0,
    riskTolerance: 5,

    // Étape 5: Détails financiers
    initialInvestment: 0,
    monthlyExpenses: 0,
    targetMonthlyRevenue: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.name.trim()) newErrors.name = "Nom requis";
      if (!formData.email.trim()) newErrors.email = "Email requis";
      if (!formData.location.trim()) newErrors.location = "Localisation requise";
      if (!formData.sector) newErrors.sector = "Secteur requis";
    }

    if (stepNum === 2) {
      if (mode === "skills" && formData.skills.length === 0) {
        newErrors.skills = "Sélectionnez au moins une compétence";
      }
      if (mode === "idea" && !formData.ideaTitle.trim()) {
        newErrors.ideaTitle = "Titre de l'idée requis";
      }
      if (mode === "problem" && !formData.problemDescription.trim()) {
        newErrors.problemDescription = "Description du problème requise";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      // Appeler l'API avec les données enrichies
      const response = await fetch("/api/analyze-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'analyse");

      const analysis = await response.json();
      
      // Rediriger vers la page de résultats enrichis
      router.push(`/results?projectId=${analysis.projectId}`);
    } catch (error) {
      setErrors({ submit: "Erreur lors de l'analyse du projet" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Indicateur de progression */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 mx-1 rounded ${
                s <= step ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Étape {step} sur 5
        </p>
      </div>

      {/* Étape 1: Informations de base */}
      {step === 1 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Informations de Base</h2>
          
          <div>
            <Label>Nom complet</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Votre nom"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="votre@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label>Localisation</Label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Ville, Région"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <Label>Secteur d'activité</Label>
            <Select
              value={formData.sector}
              onChange={(e) =>
                setFormData({ ...formData, sector: e.target.value })
              }
            >
              <SelectItem value="" disabled>
                Sélectionnez un secteur
              </SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="energie">Énergie</SelectItem>
                <SelectItem value="tech">Technologie</SelectItem>
                <SelectItem value="artisanat">Artisanat</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
            </Select>
            {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
          </div>
        </Card>
      )}

      {/* Étape 2: Contexte spécifique au mode */}
      {step === 2 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">
            {mode === "skills" && "Vos Compétences"}
            {mode === "idea" && "Votre Idée"}
            {mode === "problem" && "Le Problème"}
          </h2>

          {mode === "skills" && (
            <>
              <div>
                <Label>Décrivez vos compétences principales</Label>
                <Textarea
                  value={formData.skills.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="Ex: Couture, Menuiserie, Électricité..."
                  className="min-h-24"
                />
              </div>

              <div>
                <Label>Niveau de compétence</Label>
                <Select
                  value={formData.skillsLevel}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, skillsLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Débutant</SelectItem>
                    <SelectItem value="intermediate">Intermédiaire</SelectItem>
                    <SelectItem value="advanced">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Années d'expérience</Label>
                <Input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                />
              </div>
            </>
          )}

          {mode === "idea" && (
            <>
              <div>
                <Label>Titre de votre idée</Label>
                <Input
                  value={formData.ideaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, ideaTitle: e.target.value })
                  }
                  placeholder="Ex: Plateforme de vente de produits locaux"
                  className={errors.ideaTitle ? "border-red-500" : ""}
                />
                {errors.ideaTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.ideaTitle}</p>
                )}
              </div>

              <div>
                <Label>Description détaillée</Label>
                <Textarea
                  value={formData.ideaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, ideaDescription: e.target.value })
                  }
                  placeholder="Décrivez votre idée en détail..."
                  className="min-h-32"
                />
              </div>

              <div>
                <Label>Marché cible</Label>
                <Input
                  value={formData.targetMarket}
                  onChange={(e) =>
                    setFormData({ ...formData, targetMarket: e.target.value })
                  }
                  placeholder="Qui sont vos clients?"
                />
              </div>

              <div>
                <Label>Proposition de valeur unique</Label>
                <Textarea
                  value={formData.uniqueValue}
                  onChange={(e) =>
                    setFormData({ ...formData, uniqueValue: e.target.value })
                  }
                  placeholder="Qu'est-ce qui vous différencie?"
                  className="min-h-20"
                />
              </div>
            </>
          )}

          {mode === "problem" && (
            <>
              <div>
                <Label>Description du problème</Label>
                <Textarea
                  value={formData.problemDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      problemDescription: e.target.value,
                    })
                  }
                  placeholder="Décrivez le problème que vous avez observé..."
                  className={`min-h-32 ${
                    errors.problemDescription ? "border-red-500" : ""
                  }`}
                />
                {errors.problemDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.problemDescription}
                  </p>
                )}
              </div>

              <div>
                <Label>Qui est affecté par ce problème?</Label>
                <Input
                  value={formData.affectedPeople}
                  onChange={(e) =>
                    setFormData({ ...formData, affectedPeople: e.target.value })
                  }
                  placeholder="Ex: Les petits agriculteurs, les femmes entrepreneurs..."
                />
              </div>

              <div>
                <Label>Solutions existantes</Label>
                <Textarea
                  value={formData.currentSolutions}
                  onChange={(e) =>
                    setFormData({ ...formData, currentSolutions: e.target.value })
                  }
                  placeholder="Quelles solutions existent déjà?"
                  className="min-h-20"
                />
              </div>

              <div>
                <Label>Pourquoi ces solutions ne fonctionnent pas?</Label>
                <Textarea
                  value={formData.whyNotWorking}
                  onChange={(e) =>
                    setFormData({ ...formData, whyNotWorking: e.target.value })
                  }
                  placeholder="Quels sont les problèmes avec les solutions actuelles?"
                  className="min-h-20"
                />
              </div>
            </>
          )}
        </Card>
      )}

      {/* Étape 3: Ressources et contraintes */}
      {step === 3 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Ressources et Contraintes</h2>

          <div>
            <Label>Budget initial disponible (FCFA)</Label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })
              }
              min="0"
              step="10000"
            />
          </div>

          <div>
            <Label>Temps disponible</Label>
            <Select
              value={formData.timeAvailable}
              onValueChange={(value: any) =>
                setFormData({ ...formData, timeAvailable: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekends">Weekends uniquement</SelectItem>
                <SelectItem value="part-time">Temps partiel</SelectItem>
                <SelectItem value="full-time">Temps plein</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Taille de l'équipe</Label>
            <Input
              type="number"
              value={formData.teamSize}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  teamSize: parseInt(e.target.value) || 1,
                })
              }
              min="1"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="equipment"
                checked={formData.hasEquipment}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasEquipment: checked as boolean })
                }
              />
              <Label htmlFor="equipment">Vous avez déjà l'équipement nécessaire</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="network"
                checked={formData.hasNetwork}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasNetwork: checked as boolean })
                }
              />
              <Label htmlFor="network">Vous avez un réseau/clientèle existant</Label>
            </div>
          </div>
        </Card>
      )}

      {/* Étape 4: Ambitions et objectifs */}
      {step === 4 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Ambitions et Objectifs</h2>

          <div>
            <Label>Objectif principal</Label>
            <Select
              value={formData.goal}
              onValueChange={(value: any) =>
                setFormData({ ...formData, goal: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Générer des revenus</SelectItem>
                <SelectItem value="impact">Créer un impact social</SelectItem>
                <SelectItem value="learning">Apprendre et développer</SelectItem>
                <SelectItem value="growth">Croissance personnelle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Délai souhaité</Label>
            <Select
              value={formData.timeframe}
              onValueChange={(value: any) =>
                setFormData({ ...formData, timeframe: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 mois</SelectItem>
                <SelectItem value="6-months">6 mois</SelectItem>
                <SelectItem value="1-year">1 an</SelectItem>
                <SelectItem value="2-years">2 ans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Revenu mensuel attendu (FCFA)</Label>
            <Input
              type="number"
              value={formData.expectedRevenue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expectedRevenue: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              step="10000"
            />
          </div>

          <div>
            <Label>Tolérance au risque: {formData.riskTolerance}/10</Label>
            <Slider
              value={[formData.riskTolerance]}
              onValueChange={(value) =>
                setFormData({ ...formData, riskTolerance: value[0] })
              }
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        </Card>
      )}

      {/* Étape 5: Détails financiers */}
      {step === 5 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">Détails Financiers</h2>

          <div>
            <Label>Investissement initial (FCFA)</Label>
            <Input
              type="number"
              value={formData.initialInvestment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  initialInvestment: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              step="10000"
            />
          </div>

          <div>
            <Label>Dépenses mensuelles estimées (FCFA)</Label>
            <Input
              type="number"
              value={formData.monthlyExpenses}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyExpenses: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              step="10000"
            />
          </div>

          <div>
            <Label>Revenu mensuel cible (FCFA)</Label>
            <Input
              type="number"
              value={formData.targetMonthlyRevenue}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetMonthlyRevenue: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              step="10000"
            />
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
        </Card>
      )}

      {/* Boutons de navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Précédent
        </Button>

        {step < 5 ? (
          <Button onClick={handleNext}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Analyse en cours..." : "Analyser mon projet"}
          </Button>
        )}
      </div>
    </div>
  );
}
