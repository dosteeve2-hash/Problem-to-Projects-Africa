import { SkillsForm } from "@/components/forms/SkillsForm"

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 mb-4">
            <span className="text-xs font-medium text-amber-400">Mode Skills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Dis-moi ce que tu sais faire
          </h1>
          <p className="text-slate-400">
            Je vais trouver le projet qui correspond exactement à tes compétences et ton contexte local.
          </p>
        </div>
        <SkillsForm />
      </div>
    </div>
  )
}
