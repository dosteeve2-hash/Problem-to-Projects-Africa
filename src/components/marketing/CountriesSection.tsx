import { SUPPORTED_COUNTRIES } from "@/lib/context/countries"

export function CountriesSection() {
  return (
    <section
      className="py-20"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(12,21,40,0.6)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
          >
            Ancré dans les réalités africaines
          </h2>
          <p style={{ color: "var(--text2)" }}>
            Connaissance profonde des contextes locaux pour 9 pays
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {SUPPORTED_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-colors"
              style={{ border: "1px solid var(--border2)", background: "var(--bg3)" }}
            >
              <span className="text-2xl">{country.flag}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{country.name}</p>
                <p className="text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>{country.city_examples[0]}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs" style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
          D'autres pays africains seront ajoutés prochainement
        </p>
      </div>
    </section>
  )
}
