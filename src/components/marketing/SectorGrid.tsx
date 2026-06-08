const sectors = [
  { icon: "🌾", label: "Agriculture" },
  { icon: "🏥", label: "Santé" },
  { icon: "📚", label: "Éducation" },
  { icon: "💰", label: "Finance" },
  { icon: "☀️", label: "Énergie" },
  { icon: "🚚", label: "Logistique" },
  { icon: "🛒", label: "Commerce" },
  { icon: "🏗️", label: "Construction" },
  { icon: "🎨", label: "Artisanat" },
  { icon: "📱", label: "Tech & Apps" },
  { icon: "🌍", label: "Tourisme" },
  { icon: "♻️", label: "Environnement" },
]

export function SectorGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Tous les secteurs de l'économie africaine
          </h2>
          <p className="text-slate-400">
            P2P Africa couvre l'ensemble des secteurs économiques, tech et non-tech
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {sectors.map((sector) => (
            <div
              key={sector.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-amber-500/30 hover:bg-slate-800/40 transition-colors"
            >
              <span className="text-2xl">{sector.icon}</span>
              <span className="text-xs text-slate-400 text-center font-medium">
                {sector.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
