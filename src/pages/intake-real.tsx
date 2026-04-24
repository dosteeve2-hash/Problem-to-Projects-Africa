import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  getQuestionsForStep,
  validateAnswers,
  IntakeQuestion,
} from "@/lib/intake/intelligent-questions";
import {
  transformProblem,
  transformIdea,
  transformSkills,
} from "@/lib/recommendation/transformation-engine";

export default function IntakeRealPage() {
  const router = useRouter();
  const mode = (router.query.mode as "problem" | "idea" | "skills") || "problem";

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const currentQuestions = useMemo(
    () => getQuestionsForStep(mode, currentStep),
    [mode, currentStep]
  );

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear error for this field
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    // Validate current step
    const validation = validateAnswers(currentQuestions, answers);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    // Validate all steps
    const allQuestions = [1, 2, 3]
      .flatMap((step) => getQuestionsForStep(mode, step));
    const validation = validateAnswers(allQuestions, answers);

    if (!validation.valid) {
      setErrors(validation.errors);
      setCurrentStep(1);
      return;
    }

    setIsLoading(true);

    try {
      // Transform based on mode
      let transformation;
      if (mode === "problem") {
        transformation = transformProblem({
          title: answers.problem_title,
          description: answers.problem_description,
          affectedPeople: parseInt(answers.problem_scale),
          frequency: answers.problem_frequency,
          severity: answers.problem_severity,
          availableSkills: answers.available_skills,
          availableCapital: parseInt(answers.available_capital?.split("-")[0] || "0") * 1000,
          availableTime: parseInt(answers.available_time?.split("-")[0] || "0"),
          ambitions: answers.ambitions,
        });
      } else if (mode === "idea") {
        transformation = transformIdea({
          title: answers.idea_title,
          description: answers.idea_description,
          uniqueValue: answers.unique_value,
          targetMarket: answers.target_market,
          competitors: answers.competitors,
          startupCapital: parseInt(answers.startup_capital),
          monthlyRevenue: parseInt(answers.monthly_revenue_estimate),
          margin: parseInt(answers.profit_margin) / 100,
          pricingStrategy: answers.pricing_strategy || "market-based",
        });
      } else {
        transformation = transformSkills({
          mainSkills: answers.main_skills,
          skillLevel: answers.skill_level,
          certifications: answers.certifications || "",
          experience: parseInt(answers.experience_years),
          interestSectors: answers.interest_sectors?.join(", ") || "",
          desiredRole: answers.desired_role,
          projectIdeas: answers.project_ideas,
          network: answers.network,
        });
      }

      // Save and redirect
      sessionStorage.setItem("transformation", JSON.stringify(transformation));
      router.push("/results-real");
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-lg font-bold text-blue-900 hidden sm:block">
              Problem to Project Africa
            </h1>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Annuler
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getModeTitle(mode)}
          </h2>
          <p className="text-gray-600">
            Étape {currentStep} sur {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {currentQuestions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {question.question}
                  {question.validation?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {question.helpText && (
                  <p className="text-sm text-gray-600 mb-3">{question.helpText}</p>
                )}

                {/* Text Input */}
                {question.type === "text" && (
                  <input
                    type="text"
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[question.id] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}

                {/* Textarea */}
                {question.type === "textarea" && (
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[question.id] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}

                {/* Number Input */}
                {question.type === "number" && (
                  <input
                    type="number"
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[question.id] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}

                {/* Select */}
                {question.type === "select" && (
                  <select
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[question.id] ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Sélectionnez une option...</option>
                    {question.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* Multiselect */}
                {question.type === "multiselect" && (
                  <div className="space-y-2">
                    {question.options?.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(answers[question.id])
                              ? answers[question.id].includes(opt.value)
                              : false
                          }
                          onChange={(e) => {
                            const current = Array.isArray(answers[question.id])
                              ? answers[question.id]
                              : [];
                            if (e.target.checked) {
                              handleAnswerChange(question.id, [...current, opt.value]);
                            } else {
                              handleAnswerChange(
                                question.id,
                                current.filter((v) => v !== opt.value)
                              );
                            }
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-900">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Error Message */}
                {errors[question.id] && (
                  <p className="text-red-500 text-sm mt-2">{errors[question.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1 || isLoading}
            className="px-6 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Précédent
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Analyse en cours..." : "Analyser Mon Projet →"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              Suivant →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function getModeTitle(mode: string): string {
  const titles: Record<string, string> = {
    problem: "Transformez Votre Problème en Projet",
    idea: "Validez Votre Idée de Projet",
    skills: "Valorisez Vos Compétences",
  };
  return titles[mode] || "Créer un Projet";
}
