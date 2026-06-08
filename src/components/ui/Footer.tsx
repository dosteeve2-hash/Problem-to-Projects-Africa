import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500">
              <Zap className="h-3.5 w-3.5 text-slate-950" />
            </div>
            <span className="font-bold text-white text-sm">
              P2P<span className="text-amber-400">Africa</span>
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm text-slate-500 hover:text-white transition-colors">
              Comment ça marche
            </Link>
            <Link href="/about" className="text-sm text-slate-500 hover:text-white transition-colors">
              À propos
            </Link>
            <Link href="/start" className="text-sm text-slate-500 hover:text-white transition-colors">
              Commencer
            </Link>
          </nav>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Problem to Project Africa. Fait avec ❤️ pour l'Afrique.
          </p>
        </div>
      </div>
    </footer>
  )
}
