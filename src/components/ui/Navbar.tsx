"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type NavbarProps = {
  userEmail?: string | null
}

export function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/how-it-works", label: "Comment ça marche" },
    { href: "/about", label: "À propos" },
  ]

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        borderBottom: "1px solid var(--border)",
        background: "rgba(12,21,40,0.90)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(7,14,31,0.5)",
      } : {
        background: "transparent",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
              style={{ background: "var(--gold)" }}
            >
              <Zap className="h-4 w-4" style={{ color: "var(--bg)" }} />
            </div>
            <span
              className="font-bold text-sm sm:text-base"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold)" }}
            >
              P2P Africa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  color: pathname === link.href ? "var(--gold)" : "var(--text2)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
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
                  className="transition-colors"
                  style={{ color: "var(--text2)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em" }}
                >
                  Mes projets
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button
                    className="rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer"
                    style={{ color: "var(--text2)", border: "1px solid var(--border2)" }}
                  >
                    Déconnexion
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button
                    className="rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer"
                    style={{ color: "var(--text2)", border: "1px solid var(--border2)" }}
                  >
                    Connexion
                  </button>
                </Link>
                <Link href="/start">
                  <button
                    className="rounded-xl px-5 py-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
                    style={{ background: "var(--gold)", color: "var(--bg)", boxShadow: "0 4px 20px rgba(240,168,50,0.25)" }}
                  >
                    Commencer →
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden cursor-pointer transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ color: "var(--text2)" }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 py-4 space-y-3 overflow-hidden"
            style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 transition-colors"
                style={{ color: "var(--text2)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border)" }}>
              {userEmail ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-full rounded-xl px-4 py-2.5 text-xs cursor-pointer"
                    style={{ color: "var(--text2)", border: "1px solid var(--border2)" }}
                  >
                    Mes projets
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button
                      className="w-full rounded-xl px-4 py-2.5 text-xs cursor-pointer"
                      style={{ color: "var(--text2)", border: "1px solid var(--border2)" }}
                    >
                      Connexion
                    </button>
                  </Link>
                  <Link href="/start" onClick={() => setMenuOpen(false)}>
                    <button
                      className="w-full rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer"
                      style={{ background: "var(--gold)", color: "var(--bg)" }}
                    >
                      Commencer →
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
