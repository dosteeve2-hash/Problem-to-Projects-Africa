type BadgeVariant = "amber" | "green" | "red" | "slate" | "blue"

type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  red: "bg-red-500/15 text-red-400 border border-red-500/20",
  slate: "bg-slate-700/60 text-slate-300 border border-slate-700",
  blue: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
}

export function Badge({ variant = "slate", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
