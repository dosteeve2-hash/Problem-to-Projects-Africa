"use client"

const SECTORS = [
  { id: "agriculture", label: "Agriculture", icon: "🌾" },
  { id: "sante", label: "Santé", icon: "🏥" },
  { id: "education", label: "Éducation", icon: "📚" },
  { id: "finance", label: "Finance & FinTech", icon: "💰" },
  { id: "energie", label: "Énergie", icon: "☀️" },
  { id: "logistique", label: "Logistique & Transport", icon: "🚚" },
  { id: "commerce", label: "Commerce & Retail", icon: "🛒" },
  { id: "construction", label: "Construction & BTP", icon: "🏗️" },
  { id: "artisanat", label: "Artisanat & Mode", icon: "🎨" },
  { id: "tech", label: "Tech & Apps", icon: "📱" },
  { id: "tourisme", label: "Tourisme & Hospitality", icon: "🌍" },
  { id: "environnement", label: "Environnement", icon: "♻️" },
  { id: "media", label: "Médias & Contenu", icon: "📰" },
  { id: "autre", label: "Autre", icon: "⚡" },
]

type SectorSelectorProps = {
  value: string
  onChange: (sector: string) => void
  error?: string
}

export function SectorSelector({ value, onChange, error }: SectorSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--text2)" }}>
        Secteur d&apos;intérêt <span style={{ color: "var(--red)" }}>*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            type="button"
            onClick={() => onChange(sector.id)}
            className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200"
            style={
              value === sector.id
                ? { borderColor: "var(--gold)", background: "rgba(212,175,55,0.1)", color: "var(--text)" }
                : { borderColor: "var(--border2)", background: "var(--bg3)", color: "var(--text2)" }
            }
          >
            <span className="text-lg shrink-0">{sector.icon}</span>
            <span className="text-xs font-medium">{sector.label}</span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs" style={{ color: "var(--red)" }}>{error}</p>}
    </div>
  )
}
