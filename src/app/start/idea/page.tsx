import { IdeaForm } from "@/components/forms/IdeaForm"

export default function IdeaPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 mb-4">
            <span className="text-xs font-medium text-emerald-400">Mode Idée</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Décris ton idée
          </h1>
          <p className="text-slate-400">
            Même vague, même incomplète. Je vais la structurer et l'analyser pour toi.
          </p>
        </div>
        <IdeaForm />
      </div>
    </div>
  )
}
