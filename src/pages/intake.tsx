import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Button,
  Card,
  Input,
  Textarea,
  Select,
  Alert,
  Progress,
  Breadcrumb,
} from "@/components/ui/design-system";

export default function IntakePage() {
  const router = useRouter();
  const mode = (router.query.mode as string) || "problem";
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Mode Problème
    problemTitle: "",
    problemDescription: "",
    affectedPeople: "",
    frequency: "",
    severity: "",
    availableSkills: "",
    availableCapital: "",
    availableTime: "",
    ambitions: "",

    // Mode Idée
    ideaTitle: "",
    ideaDescription: "",
    uniqueValue: "",
    targetMarket: "",
    competitors: "",
    startupCapital: "",
    monthlyRevenue: "",
    margin: "",
    pricingStrategy: "",

    // Mode Compétences
    mainSkills: "",
    skillLevel: "",
    certifications: "",
    experience: "",
    interestSectors: "",
    desiredRole: "",
    projectIdeas: "",
    network: "",
  });

  const totalSteps = mode === "problem" ? 3 : mode === "idea" ? 3 : 3;
  const progress = (step / totalSteps) * 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Envoyer les données au backend
      // const response = await fetch("/api/projects", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ mode, ...formData }),
      // });

      // Simulation
      setTimeout(() => {
        router.push("/results");
      }, 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
          <Button variant="secondary" size="sm" onClick={() => router.push("/")}>
            Annuler
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Intake", href: "/intake" },
            { label: getModeLabel(mode) },
          ]}
        />

        {/* Progress */}
        <div className="mt-6 mb-8">
          <Progress value={step} max={totalSteps} label={`Étape ${step} sur ${totalSteps}`} />
        </div>

        {/* Content */}
        <Card>
          {mode === "problem" && (
            <ProblemMode
              step={step}
              formData={formData}
              onChange={handleChange}
            />
          )}
          {mode === "idea" && (
            <IdeaMode
              step={step}
              formData={formData}
              onChange={handleChange}
            />
          )}
          {mode === "skills" && (
            <SkillsMode
              step={step}
              formData={formData}
              onChange={handleChange}
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-between pt-8 border-t border-neutral-200 mt-8">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={step === 1 || isLoading}
            >
              ← Précédent
            </Button>

            {step === totalSteps ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Analyser Mon Projet →
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Suivant →
              </Button>
            )}
          </div>
        </Card>

        {/* Help */}
        <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-800">
            💡 <strong>Conseil :</strong> Soyez aussi précis que possible. Les données réalistes
            donnent les meilleures analyses.
          </p>
        </div>
      </main>
    </div>
  );
}

function ProblemMode({
  step,
  formData,
  onChange,
}: {
  step: number;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Analysez Votre Problème Local
        </h2>
        <p className="text-neutral-600">
          Décrivez le problème que vous avez identifié et comment vous pensez le résoudre.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <Input
            label="Titre du Problème"
            name="problemTitle"
            value={formData.problemTitle}
            onChange={onChange}
            placeholder="Ex: Manque d'accès à l'eau potable en zone rurale"
            required
          />

          <Textarea
            label="Description Détaillée"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={onChange}
            placeholder="Décrivez le problème en détail..."
            rows={5}
            required
          />

          <Input
            label="Nombre de Personnes Affectées"
            type="number"
            name="affectedPeople"
            value={formData.affectedPeople}
            onChange={onChange}
            placeholder="Ex: 5000"
            required
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Select
            label="Fréquence du Problème"
            name="frequency"
            value={formData.frequency}
            onChange={onChange}
            options={[
              { value: "daily", label: "Quotidien" },
              { value: "weekly", label: "Hebdomadaire" },
              { value: "monthly", label: "Mensuel" },
              { value: "seasonal", label: "Saisonnier" },
            ]}
            required
          />

          <Select
            label="Gravité du Problème"
            name="severity"
            value={formData.severity}
            onChange={onChange}
            options={[
              { value: "low", label: "Faible" },
              { value: "medium", label: "Moyen" },
              { value: "high", label: "Élevé" },
              { value: "critical", label: "Critique" },
            ]}
            required
          />

          <Textarea
            label="Compétences Disponibles"
            name="availableSkills"
            value={formData.availableSkills}
            onChange={onChange}
            placeholder="Quelles compétences avez-vous ou pouvez-vous acquérir?"
            rows={3}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Input
            label="Capital Disponible (XOF)"
            type="number"
            name="availableCapital"
            value={formData.availableCapital}
            onChange={onChange}
            placeholder="Ex: 500000"
            required
          />

          <Input
            label="Temps Disponible (heures/semaine)"
            type="number"
            name="availableTime"
            value={formData.availableTime}
            onChange={onChange}
            placeholder="Ex: 40"
            required
          />

          <Textarea
            label="Vos Ambitions"
            name="ambitions"
            value={formData.ambitions}
            onChange={onChange}
            placeholder="Quel impact voulez-vous avoir? Quels sont vos objectifs?"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}

function IdeaMode({
  step,
  formData,
  onChange,
}: {
  step: number;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Validez Votre Idée de Projet
        </h2>
        <p className="text-neutral-600">
          Décrivez votre idée et ses caractéristiques pour une analyse complète.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <Input
            label="Titre du Projet"
            name="ideaTitle"
            value={formData.ideaTitle}
            onChange={onChange}
            placeholder="Ex: Plateforme de Vente de Fruits Frais"
            required
          />

          <Textarea
            label="Description de l'Idée"
            name="ideaDescription"
            value={formData.ideaDescription}
            onChange={onChange}
            placeholder="Décrivez votre idée en détail..."
            rows={5}
            required
          />

          <Textarea
            label="Valeur Unique"
            name="uniqueValue"
            value={formData.uniqueValue}
            onChange={onChange}
            placeholder="Qu'est-ce qui rend votre idée unique?"
            rows={3}
            required
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Input
            label="Marché Cible"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={onChange}
            placeholder="Ex: Commerçants de Ouagadougou"
            required
          />

          <Textarea
            label="Analyse de la Concurrence"
            name="competitors"
            value={formData.competitors}
            onChange={onChange}
            placeholder="Qui sont vos concurrents? Quels sont leurs avantages?"
            rows={3}
          />

          <Input
            label="Stratégie de Prix"
            name="pricingStrategy"
            value={formData.pricingStrategy}
            onChange={onChange}
            placeholder="Comment allez-vous fixer vos prix?"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Input
            label="Capital de Démarrage (XOF)"
            type="number"
            name="startupCapital"
            value={formData.startupCapital}
            onChange={onChange}
            placeholder="Ex: 1000000"
            required
          />

          <Input
            label="Revenu Mensuel Estimé (XOF)"
            type="number"
            name="monthlyRevenue"
            value={formData.monthlyRevenue}
            onChange={onChange}
            placeholder="Ex: 500000"
            required
          />

          <Input
            label="Marge Bénéficiaire (%)"
            type="number"
            name="margin"
            value={formData.margin}
            onChange={onChange}
            placeholder="Ex: 30"
            required
          />
        </div>
      )}
    </div>
  );
}

function SkillsMode({
  step,
  formData,
  onChange,
}: {
  step: number;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Valorisez Vos Compétences
        </h2>
        <p className="text-neutral-600">
          Décrivez vos compétences pour découvrir les opportunités de projet.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <Textarea
            label="Compétences Principales"
            name="mainSkills"
            value={formData.mainSkills}
            onChange={onChange}
            placeholder="Ex: Menuiserie, Électricité, Plomberie"
            rows={3}
            required
          />

          <Select
            label="Niveau de Compétence"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={onChange}
            options={[
              { value: "beginner", label: "Débutant" },
              { value: "intermediate", label: "Intermédiaire" },
              { value: "advanced", label: "Avancé" },
              { value: "expert", label: "Expert" },
            ]}
            required
          />

          <Input
            label="Certifications"
            name="certifications"
            value={formData.certifications}
            onChange={onChange}
            placeholder="Ex: Diplôme en Électricité"
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Input
            label="Années d'Expérience"
            type="number"
            name="experience"
            value={formData.experience}
            onChange={onChange}
            placeholder="Ex: 5"
            required
          />

          <Textarea
            label="Secteurs d'Intérêt"
            name="interestSectors"
            value={formData.interestSectors}
            onChange={onChange}
            placeholder="Ex: Agriculture, Énergie, Santé"
            rows={3}
          />

          <Input
            label="Rôle Souhaité"
            name="desiredRole"
            value={formData.desiredRole}
            onChange={onChange}
            placeholder="Ex: Responsable Technique, Consultant"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Textarea
            label="Idées de Projet"
            name="projectIdeas"
            value={formData.projectIdeas}
            onChange={onChange}
            placeholder="Avez-vous des idées de projets basés sur vos compétences?"
            rows={3}
          />

          <Textarea
            label="Réseau et Contacts"
            name="network"
            value={formData.network}
            onChange={onChange}
            placeholder="Avez-vous des contacts dans votre domaine?"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}

function getModeLabel(mode: string): string {
  const labels: Record<string, string> = {
    problem: "J'ai un Problème",
    idea: "J'ai une Idée",
    skills: "J'ai des Compétences",
  };
  return labels[mode] || "Intake";
}
