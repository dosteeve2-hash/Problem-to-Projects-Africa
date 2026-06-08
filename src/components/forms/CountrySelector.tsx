"use client"

import { SUPPORTED_COUNTRIES } from "@/lib/context/countries"

type CountrySelectorProps = {
  value: string
  onChange: (code: string) => void
  error?: string
}

export function CountrySelector({ value, onChange, error }: CountrySelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">
        Ton pays <span className="text-red-400">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SUPPORTED_COUNTRIES.map((country) => (
          <button
            key={country.code}
            type="button"
            onClick={() => onChange(country.code)}
            className={[
              "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
              value === country.code
                ? "border-amber-500 bg-amber-500/10 text-white"
                : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-white",
            ].join(" ")}
          >
            <span className="text-xl shrink-0">{country.flag}</span>
            <span className="text-sm font-medium truncate">{country.name}</span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
