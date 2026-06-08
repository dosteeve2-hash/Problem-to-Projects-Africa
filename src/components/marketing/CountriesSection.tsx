import { SUPPORTED_COUNTRIES } from "@/lib/context/countries"

export function CountriesSection() {
  return (
    <section className="py-20 border-y border-slate-800 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ancré dans les réalités africaines
          </h2>
          <p className="text-slate-400">
            Connaissance profonde des contextes locaux pour 9 pays
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {SUPPORTED_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 hover:border-amber-500/30 transition-colors"
            >
              <span className="text-2xl">{country.flag}</span>
              <div>
                <p className="text-sm font-medium text-white">{country.name}</p>
                <p className="text-xs text-slate-500">{country.city_examples[0]}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          D'autres pays africains seront ajoutés prochainement
        </p>
      </div>
    </section>
  )
}
