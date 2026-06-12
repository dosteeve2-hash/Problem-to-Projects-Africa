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
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
          >
            Tous les secteurs de l'économie africaine
          </h2>
          <p style={{ color: "var(--text2)" }}>
            P2P Africa couvre l'ensemble des secteurs économiques, tech et non-tech
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {sectors.map((sector) => (
            <div
              key={sector.label}
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: "1px solid var(--border)", background: "var(--bg3)" }}
            >
              <span className="text-2xl">{sector.icon}</span>
              <span
                className="text-xs text-center font-medium"
                style={{ color: "var(--text2)", fontFamily: "var(--font-mono)" }}
              >
                {sector.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
