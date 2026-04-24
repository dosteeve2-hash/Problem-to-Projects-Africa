import Link from "next/link";

import { PRODUCT_NAME } from "@/lib/product";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-primary">
            {PRODUCT_NAME.toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-muted">
            Transformer des problemes locaux en projets concrets.
          </p>
        </div>
        <nav className="flex flex-wrap gap-5 text-xs text-muted">
          <Link href="/modes">Modes</Link>
          <Link href="/explore">Explorer</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </footer>
  );
}
