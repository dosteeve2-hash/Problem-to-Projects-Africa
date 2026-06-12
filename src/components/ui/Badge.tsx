type BadgeVariant = "amber" | "green" | "red" | "slate" | "blue"

type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  amber: "bg-[#f0a832]/15 text-[#f0a832] border border-[#f0a832]/20",
  green: "bg-[#22d98a]/15 text-[#22d98a] border border-[#22d98a]/20",
  red: "bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/20",
  slate: "bg-[#1f3054]/60 text-[#9ba8c4] border border-[#1f3054]",
  blue: "bg-[#2dd4ff]/15 text-[#2dd4ff] border border-[#2dd4ff]/20",
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
