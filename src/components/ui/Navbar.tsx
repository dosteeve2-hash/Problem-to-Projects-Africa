"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "./Button"

type NavbarProps = {
  userEmail?: string | null
}

export function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: "/how-it-works", label: "Comment ça marche" },
    { href: "/about", label: "À propos" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 group-hover:bg-amber-400 transition-colors">
              <Zap className="h-4 w-4 text-slate-950" />
            </div>
            <span className="font-bold text-white text-sm sm:text-base">
              P2P<span className="text-amber-400">Africa</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? "text-amber-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {userEmail ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Mes projets
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <Button variant="ghost" size="sm">
                    Déconnexion
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/start">
                  <Button size="sm">Commencer</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-slate-400 hover:text-white py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {userEmail ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Mes projets
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/start" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Commencer
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
