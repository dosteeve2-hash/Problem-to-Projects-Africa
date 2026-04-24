"use client";

import { useState } from "react";
import Link from "next/link";

import { AuthButton } from "@/components/auth/auth-button";
import { PRODUCT_NAME } from "@/lib/product";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "Comment ca marche" },
  { href: "/modes", label: "Modes" },
  { href: "/explore", label: "Explorer" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.22em] text-primary">
          {PRODUCT_NAME.toUpperCase()}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <AuthButton />
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white/80 transition-colors hover:bg-white md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-foreground">
            {open ? (
              <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/70 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-0 px-6 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/70 active:bg-white/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-3 mt-2">
              <div className="px-4 py-2">
                <AuthButton />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
