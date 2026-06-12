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
        "rounded-2xl border border-[#16233d] bg-[#0c1528]/60 backdrop-blur-sm p-6",
        hoverable
          ? "cursor-pointer hover:border-[#f0a832]/40 hover:bg-[#111d34]/60 transition-all duration-200"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
