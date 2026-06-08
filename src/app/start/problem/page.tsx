import { ProblemForm } from "@/components/forms/ProblemForm"

export default function ProblemPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 mb-4">
            <span className="text-xs font-medium text-blue-400">Mode Problème</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Quel problème as-tu observé ?
          </h1>
          <p className="text-slate-400">
            Décris ce que tu as vu dans ton entourage. Je vais le transformer en opportunité de projet.
          </p>
        </div>
        <ProblemForm />
      </div>
    </div>
  )
}
