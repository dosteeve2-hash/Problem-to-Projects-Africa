// @ts-nocheck
/**
 * Formulaires d'Intake Différenciés et Enrichis
 * Chaque mode (Problème, Idée, Compétences) a ses propres questions pertinentes
 */

import { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { cn } from "@/lib/utils";

// Types pour chaque mode
export interface ProblemModeInput {
  // Identification du problème
  problemDescription: string;
  problemLocation: string; // Ouagadougou, zones rurales, etc.
  affectedPeople: string; // Nombre de personnes affectées
  problemFrequency: "daily" | "weekly" | "monthly" | "seasonal";
  problemSeverity: 1 | 2 | 3 | 4 | 5; // 1-5 scale

  // Compétences disponibles
  skills: string[];
  skillsLevel: "beginner" | "intermediate" | "advanced";
  yearsOfExperience: number;
  previousProjects: string;

  // Ressources
  availableCapital: number; // XOF
  availableTime: "part-time" | "full-time"; // Heures par semaine
  availableSpace: boolean;
  spaceType?: "home" | "office" | "land" | "shared";

  // Ambitions
  targetMarket: string;
  desiredImpact: string;
  timelineMonths: number;
  teamSize: number;

  // Défis anticipés
  anticipatedChallenges: string[];
  supportNeeded: string[];
}

export interface IdeaModeInput {
  // Description de l'idée
  ideaDescription: string;
  ideaTitle: string;
  targetSector: string;
  targetMarket: string;

  // Produit/Service
  productDescription: string;
  uniqueValue: string; // Qu'est-ce qui rend unique?
  targetCustomers: string;
  competitorAnalysis: string;

  // Compétences et équipe
  founderSkills: string[];
  founderBackground: string;
  teamMembers: number;
  teamSkills: string[];
  skillsGaps: string[];

  // Ressources
  availableCapital: number; // XOF
  capitalNeeded: number; // XOF
  timelineMonths: number;
  workingHours: "part-time" | "full-time";

  // Marché
  marketSize: string;
  marketGrowth: string;
  pricingStrategy: string;
  distributionChannels: string[];

  // Ambitions
  revenueTarget: number; // XOF/mois
  profitMargin: number; // %
  breakEvenMonths: number;
  growthPlans: string;

  // Défis
  mainChallenges: string[];
  riskFactors: string[];
}

export interface SkillsModeInput {
  // Compétences
  primarySkills: string[];
  skillsLevel: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  certifications: string[];
  previousProjects: string;

  // Expérience
  workBackground: string;
  industryExperience: string;
  successStories: string;

  // Intérêts et opportunités
  interestedSectors: string[];
  desiredRole: string; // Entrepreneur, consultant, formateur, etc.
  businessIdeas: string;
  targetMarket: string;

  // Ressources
  availableCapital: number; // XOF
  availableTime: "part-time" | "full-time";
  availableSpace: boolean;
  network: string; // Contacts, mentors, etc.

  // Ambitions
  incomeTarget: number; // XOF/mois
  timelineMonths: number;
  growthPlans: string;
  impactGoals: string;

  // Défis
  mainChallenges: string[];
  supportNeeded: string[];
}

// Composant pour le mode Problème
export function ProblemModeForm() {
  const [data, setData] = useState<ProblemModeInput>({
    problemDescription: "",
    problemLocation: "",
    affectedPeople: "",
    problemFrequency: "daily",
    problemSeverity: 3,
    skills: [],
    skillsLevel: "intermediate",
    yearsOfExperience: 0,
    previousProjects: "",
    availableCapital: 0,
    availableTime: "part-time",
    availableSpace: false,
    targetMarket: "",
    desiredImpact: "",
    timelineMonths: 12,
    teamSize: 1,
    anticipatedChallenges: [],
    supportNeeded: [],
  });

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="gap-6">
        {/* Titre */}
        <View>
          <Text className="text-2xl font-bold text-foreground mb-2">
            Décrivez le Problème
          </Text>
          <Text className="text-sm text-muted">
            Aidez-nous à comprendre le problème que vous avez identifié
          </Text>
        </View>

        {/* Section 1: Identification du Problème */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            1. Le Problème
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Décrivez le problème en détail *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Manque d'eau potable en zone rurale..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={4}
              value={data.problemDescription}
              onChangeText={(text) =>
                setData({ ...data, problemDescription: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Où avez-vous remarqué ce problème? *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Ouagadougou, villages ruraux..."
              placeholderTextColor="#687076"
              value={data.problemLocation}
              onChangeText={(text) =>
                setData({ ...data, problemLocation: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Combien de personnes sont affectées? *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 10000 personnes, toute la communauté..."
              placeholderTextColor="#687076"
              value={data.affectedPeople}
              onChangeText={(text) =>
                setData({ ...data, affectedPeople: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              À quelle fréquence ce problème se pose-t-il?
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              {(["daily", "weekly", "monthly", "seasonal"] as const).map(
                (freq) => (
                  <TouchableOpacity
                    key={freq}
                    className={cn(
                      "px-4 py-2 rounded-lg border",
                      data.problemFrequency === freq
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    )}
                    onPress={() =>
                      setData({ ...data, problemFrequency: freq })
                    }
                  >
                    <Text
                      className={cn(
                        "text-sm font-medium",
                        data.problemFrequency === freq
                          ? "text-background"
                          : "text-foreground"
                      )}
                    >
                      {freq === "daily"
                        ? "Quotidien"
                        : freq === "weekly"
                          ? "Hebdomadaire"
                          : freq === "monthly"
                            ? "Mensuel"
                            : "Saisonnier"}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Gravité du problème (1-5)
            </Text>
            <View className="flex-row gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <TouchableOpacity
                  key={level}
                  className={cn(
                    "flex-1 py-2 rounded-lg border",
                    data.problemSeverity === level
                      ? "bg-error border-error"
                      : "bg-background border-border"
                  )}
                  onPress={() =>
                    setData({
                      ...data,
                      problemSeverity: level as 1 | 2 | 3 | 4 | 5,
                    })
                  }
                >
                  <Text
                    className={cn(
                      "text-center font-semibold",
                      data.problemSeverity === level
                        ? "text-background"
                        : "text-foreground"
                    )}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Section 2: Compétences */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            2. Vos Compétences
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Quelles compétences avez-vous? *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Plomberie, électricité, gestion..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.skills.join(", ")}
              onChangeText={(text) =>
                setData({
                  ...data,
                  skills: text.split(",").map((s) => s.trim()),
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Niveau de compétence
            </Text>
            <View className="flex-row gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map(
                (level) => (
                  <TouchableOpacity
                    key={level}
                    className={cn(
                      "flex-1 py-2 rounded-lg border",
                      data.skillsLevel === level
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    )}
                    onPress={() =>
                      setData({ ...data, skillsLevel: level })
                    }
                  >
                    <Text
                      className={cn(
                        "text-center text-sm font-medium",
                        data.skillsLevel === level
                          ? "text-background"
                          : "text-foreground"
                      )}
                    >
                      {level === "beginner"
                        ? "Débutant"
                        : level === "intermediate"
                          ? "Intermédiaire"
                          : "Avancé"}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Années d'expérience
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 5 ans"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.yearsOfExperience.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  yearsOfExperience: parseInt(text) || 0,
                })
              }
            />
          </View>
        </View>

        {/* Section 3: Ressources */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            3. Ressources Disponibles
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Capital disponible (XOF) *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 500000"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.availableCapital.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  availableCapital: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Temps disponible
            </Text>
            <View className="flex-row gap-2">
              {(["part-time", "full-time"] as const).map((time) => (
                <TouchableOpacity
                  key={time}
                  className={cn(
                    "flex-1 py-2 rounded-lg border",
                    data.availableTime === time
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  )}
                  onPress={() =>
                    setData({ ...data, availableTime: time })
                  }
                >
                  <Text
                    className={cn(
                      "text-center text-sm font-medium",
                      data.availableTime === time
                        ? "text-background"
                        : "text-foreground"
                    )}
                  >
                    {time === "part-time" ? "Temps partiel" : "Temps plein"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-foreground">
              Avez-vous un espace pour démarrer?
            </Text>
            <Switch
              value={data.availableSpace}
              onValueChange={(value) =>
                setData({ ...data, availableSpace: value })
              }
            />
          </View>
        </View>

        {/* Section 4: Ambitions */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            4. Vos Ambitions
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Quel est votre objectif? *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Résoudre le manque d'eau en créant une entreprise..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.desiredImpact}
              onChangeText={(text) =>
                setData({ ...data, desiredImpact: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Délai (mois)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 12"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.timelineMonths.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  timelineMonths: parseInt(text) || 12,
                })
              }
            />
          </View>
        </View>

        {/* Bouton Soumettre */}
        <TouchableOpacity className="bg-primary py-4 rounded-lg mb-4">
          <Text className="text-center text-background font-semibold text-lg">
            Générer mon Projet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Composant pour le mode Idée
export function IdeaModeForm() {
  const [data, setData] = useState<IdeaModeInput>({
    ideaDescription: "",
    ideaTitle: "",
    targetSector: "",
    targetMarket: "",
    productDescription: "",
    uniqueValue: "",
    targetCustomers: "",
    competitorAnalysis: "",
    founderSkills: [],
    founderBackground: "",
    teamMembers: 1,
    teamSkills: [],
    skillsGaps: [],
    availableCapital: 0,
    capitalNeeded: 0,
    timelineMonths: 12,
    workingHours: "full-time",
    marketSize: "",
    marketGrowth: "",
    pricingStrategy: "",
    distributionChannels: [],
    revenueTarget: 0,
    profitMargin: 0,
    breakEvenMonths: 0,
    growthPlans: "",
    mainChallenges: [],
    riskFactors: [],
  });

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="gap-6">
        <View>
          <Text className="text-2xl font-bold text-foreground mb-2">
            Décrivez Votre Idée
          </Text>
          <Text className="text-sm text-muted">
            Partagez les détails de votre idée de projet
          </Text>
        </View>

        {/* Section 1: Idée */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            1. Votre Idée
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Titre de l'idée *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Plateforme de vente de fruits frais en ligne"
              placeholderTextColor="#687076"
              value={data.ideaTitle}
              onChangeText={(text) =>
                setData({ ...data, ideaTitle: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Description détaillée *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Décrivez votre idée en détail..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={4}
              value={data.ideaDescription}
              onChangeText={(text) =>
                setData({ ...data, ideaDescription: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Qu'est-ce qui rend votre idée unique? *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Livraison rapide, prix compétitif, qualité..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.uniqueValue}
              onChangeText={(text) =>
                setData({ ...data, uniqueValue: text })
              }
            />
          </View>
        </View>

        {/* Section 2: Marché */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            2. Marché
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Clients cibles *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Ménages urbains, restaurants, écoles..."
              placeholderTextColor="#687076"
              value={data.targetCustomers}
              onChangeText={(text) =>
                setData({ ...data, targetCustomers: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Taille du marché
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 100000 clients potentiels"
              placeholderTextColor="#687076"
              value={data.marketSize}
              onChangeText={(text) =>
                setData({ ...data, marketSize: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Analyse de la concurrence
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Qui sont vos concurrents? Comment vous différencier?"
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.competitorAnalysis}
              onChangeText={(text) =>
                setData({ ...data, competitorAnalysis: text })
              }
            />
          </View>
        </View>

        {/* Section 3: Financier */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            3. Financier
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Capital disponible (XOF) *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 1000000"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.availableCapital.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  availableCapital: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Capital nécessaire (XOF) *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 2000000"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.capitalNeeded.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  capitalNeeded: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Revenu cible mensuel (XOF)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 500000"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.revenueTarget.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  revenueTarget: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Marge bénéficiaire visée (%)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 30"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.profitMargin.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  profitMargin: parseInt(text) || 0,
                })
              }
            />
          </View>
        </View>

        {/* Bouton Soumettre */}
        <TouchableOpacity className="bg-primary py-4 rounded-lg mb-4">
          <Text className="text-center text-background font-semibold text-lg">
            Générer mon Projet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Composant pour le mode Compétences
export function SkillsModeForm() {
  const [data, setData] = useState<SkillsModeInput>({
    primarySkills: [],
    skillsLevel: "intermediate",
    yearsOfExperience: 0,
    certifications: [],
    previousProjects: "",
    workBackground: "",
    industryExperience: "",
    successStories: "",
    interestedSectors: [],
    desiredRole: "",
    businessIdeas: "",
    targetMarket: "",
    availableCapital: 0,
    availableTime: "part-time",
    availableSpace: false,
    network: "",
    incomeTarget: 0,
    timelineMonths: 12,
    growthPlans: "",
    impactGoals: "",
    mainChallenges: [],
    supportNeeded: [],
  });

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="gap-6">
        <View>
          <Text className="text-2xl font-bold text-foreground mb-2">
            Présentez Vos Compétences
          </Text>
          <Text className="text-sm text-muted">
            Montrez ce que vous savez faire et ce que vous pouvez offrir
          </Text>
        </View>

        {/* Section 1: Compétences */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            1. Vos Compétences
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Compétences principales *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Plomberie, électricité, menuiserie..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.primarySkills.join(", ")}
              onChangeText={(text) =>
                setData({
                  ...data,
                  primarySkills: text.split(",").map((s) => s.trim()),
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Niveau de maîtrise
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              {(["beginner", "intermediate", "advanced", "expert"] as const).map(
                (level) => (
                  <TouchableOpacity
                    key={level}
                    className={cn(
                      "px-3 py-2 rounded-lg border",
                      data.skillsLevel === level
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    )}
                    onPress={() =>
                      setData({ ...data, skillsLevel: level })
                    }
                  >
                    <Text
                      className={cn(
                        "text-xs font-medium",
                        data.skillsLevel === level
                          ? "text-background"
                          : "text-foreground"
                      )}
                    >
                      {level === "beginner"
                        ? "Débutant"
                        : level === "intermediate"
                          ? "Intermédiaire"
                          : level === "advanced"
                            ? "Avancé"
                            : "Expert"}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Années d'expérience
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 10"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.yearsOfExperience.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  yearsOfExperience: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Certifications
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: BTS électricité, CAP plomberie..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={2}
              value={data.certifications.join(", ")}
              onChangeText={(text) =>
                setData({
                  ...data,
                  certifications: text.split(",").map((c) => c.trim()),
                })
              }
            />
          </View>
        </View>

        {/* Section 2: Opportunités */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            2. Opportunités
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Secteurs d'intérêt *
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Agriculture, santé, éducation..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={2}
              value={data.interestedSectors.join(", ")}
              onChangeText={(text) =>
                setData({
                  ...data,
                  interestedSectors: text.split(",").map((s) => s.trim()),
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Rôle souhaité
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: Entrepreneur, consultant, formateur..."
              placeholderTextColor="#687076"
              value={data.desiredRole}
              onChangeText={(text) =>
                setData({ ...data, desiredRole: text })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Idées de projet
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Avez-vous des idées de projet?"
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.businessIdeas}
              onChangeText={(text) =>
                setData({ ...data, businessIdeas: text })
              }
            />
          </View>
        </View>

        {/* Section 3: Ressources */}
        <View className="bg-surface rounded-lg p-4 gap-4">
          <Text className="text-lg font-semibold text-foreground">
            3. Ressources
          </Text>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Capital disponible (XOF)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Ex: 500000"
              placeholderTextColor="#687076"
              keyboardType="number-pad"
              value={data.availableCapital.toString()}
              onChangeText={(text) =>
                setData({
                  ...data,
                  availableCapital: parseInt(text) || 0,
                })
              }
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-foreground mb-2">
              Réseau (mentors, contacts, partenaires)
            </Text>
            <TextInput
              className="bg-background border border-border rounded-lg p-3 text-foreground"
              placeholder="Décrivez votre réseau..."
              placeholderTextColor="#687076"
              multiline
              numberOfLines={3}
              value={data.network}
              onChangeText={(text) =>
                setData({ ...data, network: text })
              }
            />
          </View>
        </View>

        {/* Bouton Soumettre */}
        <TouchableOpacity className="bg-primary py-4 rounded-lg mb-4">
          <Text className="text-center text-background font-semibold text-lg">
            Générer mon Projet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
