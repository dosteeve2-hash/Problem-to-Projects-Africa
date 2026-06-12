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
      <label className="text-sm font-medium" style={{ color: "var(--text2)" }}>
        Ton pays <span style={{ color: "var(--red)" }}>*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SUPPORTED_COUNTRIES.map((country) => (
          <button
            key={country.code}
            type="button"
            onClick={() => onChange(country.code)}
            className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200"
            style={
              value === country.code
                ? { borderColor: "var(--gold)", background: "rgba(240,168,50,0.1)", color: "var(--text)" }
                : { borderColor: "var(--border2)", background: "var(--bg3)", color: "var(--text2)" }
            }
          >
            <span className="text-xl shrink-0">{country.flag}</span>
            <span className="text-sm font-medium truncate">{country.name}</span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs" style={{ color: "var(--red)" }}>{error}</p>}
    </div>
  )
}
