import { SkillsForm } from "@/components/forms/SkillsForm"

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(34,217,138,0.1)", border: "1px solid rgba(34,217,138,0.2)" }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: "var(--green)", fontFamily: "var(--font-mono)" }}
            >
              Mode Skills
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            Dis-moi ce que tu sais faire
          </h1>
          <p style={{ color: "var(--text2)" }}>
            Je vais trouver le projet qui correspond exactement à tes compétences et ton contexte local.
          </p>
        </div>
        <SkillsForm />
      </div>
    </div>
  )
}
