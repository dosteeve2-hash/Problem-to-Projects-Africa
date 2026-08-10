type BadgeVariant = "amber" | "green" | "red" | "slate" | "blue"

type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  amber: "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20",
  green: "bg-[#22d98a]/15 text-[#22d98a] border border-[#22d98a]/20",
  red: "bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/20",
  slate: "bg-[#1f3054]/60 text-[#9ba8c4] border border-[#1f3054]",
  blue: "bg-[#00BCD4]/15 text-[#00BCD4] border border-[#00BCD4]/20",
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
