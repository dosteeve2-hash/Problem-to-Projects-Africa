"use client"

import { forwardRef } from "react"
import { LoadingSpinner } from "./LoadingSpinner"

type Variant = "primary" | "secondary" | "ghost" | "danger"
type Size = "sm" | "md" | "lg"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#f0a832] hover:bg-[#f7c060] text-[#070e1f] font-bold shadow-lg shadow-[#f0a832]/25 hover:shadow-[#f7c060]/30",
  secondary:
    "bg-[#111d34] hover:bg-[#0c1528] text-[#f5f0e8] border border-[#1f3054] hover:border-[#f0a832]/40",
  ghost:
    "bg-transparent hover:bg-[#111d34] text-[#9ba8c4] hover:text-[#f5f0e8] border border-[#1f3054] hover:border-[#f0a832]/40",
  danger: "bg-[#ef4444] hover:bg-[#dc2626] text-white",
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a832] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070e1f]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
