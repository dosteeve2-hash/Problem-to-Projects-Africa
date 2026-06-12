import { IdeaForm } from "@/components/forms/IdeaForm"

export default function IdeaPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(45,212,255,0.1)", border: "1px solid rgba(45,212,255,0.2)" }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}
            >
              Mode Idée
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            Décris ton idée
          </h1>
          <p style={{ color: "var(--text2)" }}>
            Même vague, même incomplète. Je vais la structurer et l'analyser pour toi.
          </p>
        </div>
        <IdeaForm />
      </div>
    </div>
  )
}
