type CardProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6",
        hoverable
          ? "cursor-pointer hover:border-amber-500/40 hover:bg-slate-800/60 transition-all duration-200"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
