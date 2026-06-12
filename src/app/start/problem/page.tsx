import { ProblemForm } from "@/components/forms/ProblemForm"

export default function ProblemPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
            style={{ background: "rgba(240,168,50,0.1)", border: "1px solid rgba(240,168,50,0.2)" }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}
            >
              Mode Problème
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            Quel problème as-tu observé ?
          </h1>
          <p style={{ color: "var(--text2)" }}>
            Décris ce que tu as vu dans ton entourage. Je vais le transformer en opportunité de projet.
          </p>
        </div>
        <ProblemForm />
      </div>
    </div>
  )
}
