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
        "rounded-2xl border border-[#16233d] bg-[#0e1f3d]/60 backdrop-blur-sm p-6",
        hoverable
          ? "cursor-pointer hover:border-[#D4AF37]/40 hover:bg-[#142b52]/60 transition-all duration-200"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
