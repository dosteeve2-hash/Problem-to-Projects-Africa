import Link from "next/link";

import { PRODUCT_NAME } from "@/lib/product";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 mt-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:py-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            {PRODUCT_NAME.toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-muted">
            Transformer des problemes locaux en projets concrets.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-xs text-muted sm:gap-5">
          <Link href="/modes" className="transition-colors hover:text-foreground">Modes</Link>
          <Link href="/explore" className="transition-colors hover:text-foreground">Explorer</Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
        </nav>
      </div>
    </footer>
  );
}
