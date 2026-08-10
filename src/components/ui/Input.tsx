import { forwardRef } from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#9ba8c4]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-xl border bg-[#142b52] px-4 py-2.5 text-sm text-[#f5f0e8] placeholder-[#4e5f82]",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent",
            error
              ? "border-[#ef4444]/60"
              : "border-[#1f3054] hover:border-[#D4AF37]/40",
            className,
          ].join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-[#ef4444]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#4e5f82]">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
