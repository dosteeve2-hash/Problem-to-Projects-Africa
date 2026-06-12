import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="py-12"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "var(--gold)" }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: "var(--bg)" }} />
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
            >
              P2P<span style={{ color: "var(--gold)" }}>Africa</span>
            </span>
          </div>

          <nav className="flex items-center gap-6">
            {[
              { href: "/how-it-works", label: "Comment ça marche" },
              { href: "/about", label: "À propos" },
              { href: "/start", label: "Commencer" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--text3)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p
            className="text-xs"
            style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} Problem to Project Africa. Fait avec ❤️ pour l'Afrique.
          </p>
        </div>
      </div>
    </footer>
  )
}
