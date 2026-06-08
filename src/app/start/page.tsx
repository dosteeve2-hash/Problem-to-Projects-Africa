import { ModeSelector } from "@/components/forms/ModeSelector"

export default function StartPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Quel est ton point de départ ?
          </h1>
          <p className="text-slate-400 text-lg">
            Choisis le mode qui correspond à ta situation actuelle.
          </p>
        </div>

        <ModeSelector />
      </div>
    </div>
  )
}
