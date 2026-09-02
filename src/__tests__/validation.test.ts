import { validateAnswers, type IntakeQuestion } from "@/lib/intake/intelligent-questions";
import { errorMessage, pickOption } from "@/lib/utils";

function question(overrides: Partial<IntakeQuestion> = {}): IntakeQuestion {
  return {
    id: "q1",
    step: 1,
    question: "Décrivez votre projet",
    type: "textarea",
    ...overrides,
  };
}

describe("validateAnswers", () => {
  it("signale un champ obligatoire laissé vide", () => {
    const result = validateAnswers([question({ validation: { required: true } })], {});
    expect(result.valid).toBe(false);
    expect(result.errors.q1).toBe("Ce champ est obligatoire");
  });

  it("accepte une réponse assez longue", () => {
    const q = question({ validation: { minLength: 5 } });
    expect(validateAnswers([q], { q1: "bonjour" }).valid).toBe(true);
  });

  it("rejette une réponse trop courte", () => {
    const q = question({ validation: { minLength: 5 } });
    const result = validateAnswers([q], { q1: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.q1).toBe("Minimum 5 caractères");
  });

  it("rejette une réponse trop longue", () => {
    const q = question({ validation: { maxLength: 3 } });
    expect(validateAnswers([q], { q1: "abcdef" }).valid).toBe(false);
  });

  it("n'applique pas les contrôles de longueur à une réponse numérique", () => {
    const q = question({ type: "number", validation: { minLength: 5 } });
    expect(validateAnswers([q], { q1: 42 }).valid).toBe(true);
  });

  // Un multiselect était bien compté, mais le message annonçait « caractères »
  // pour un nombre d'éléments sélectionnés.
  it("compte les éléments d'un multiselect et l'annonce comme tel", () => {
    const q = question({ type: "multiselect", validation: { minLength: 3 } });
    const result = validateAnswers([q], { q1: ["a", "b"] });
    expect(result.valid).toBe(false);
    expect(result.errors.q1).toBe("Minimum 3 éléments");
    expect(validateAnswers([q], { q1: ["a", "b", "c"] }).valid).toBe(true);
  });

  it("applique les bornes numériques", () => {
    const q = question({ type: "number", validation: { min: 10, max: 20 } });
    expect(validateAnswers([q], { q1: 5 }).valid).toBe(false);
    expect(validateAnswers([q], { q1: 25 }).valid).toBe(false);
    expect(validateAnswers([q], { q1: 15 }).valid).toBe(true);
  });
});

describe("pickOption", () => {
  const NIVEAUX = ["beginner", "intermediate", "advanced"] as const;

  it("retient une option connue", () => {
    expect(pickOption("advanced", NIVEAUX, "beginner")).toBe("advanced");
  });

  // Sans ce filtre, `e.target.value` — un `string` quelconque — atterrissait
  // directement dans un champ typé en union de littéraux.
  it("retombe sur la valeur par défaut pour une option inconnue", () => {
    expect(pickOption("expert", NIVEAUX, "beginner")).toBe("beginner");
    expect(pickOption("", NIVEAUX, "intermediate")).toBe("intermediate");
  });
});

describe("errorMessage", () => {
  it("préfère le message d'une Error", () => {
    expect(errorMessage(new Error("boum"), "repli")).toBe("boum");
  });

  it("accepte une chaîne levée telle quelle", () => {
    expect(errorMessage("boum", "repli")).toBe("boum");
  });

  it("retombe sur le message par défaut pour une valeur non-Error", () => {
    expect(errorMessage({ code: 500 }, "repli")).toBe("repli");
    expect(errorMessage(new Error(""), "repli")).toBe("repli");
  });

  // `error.message` sur `null` lève un TypeError — depuis un bloc catch, la
  // réponse 500 n'était donc jamais renvoyée.
  it("ne lève pas sur null ou undefined", () => {
    expect(errorMessage(null, "repli")).toBe("repli");
    expect(errorMessage(undefined, "repli")).toBe("repli");
  });
});
