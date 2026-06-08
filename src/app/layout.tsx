import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Problem to Project Africa — Transforme tes compétences en projets",
  description:
    "Plateforme AI-powered qui aide les talents africains à transformer leurs skills, idées et problèmes locaux en projets concrets et exécutables.",
  openGraph: {
    title: "Problem to Project Africa",
    description: "Transforme tes compétences en projets qui changent l'Afrique",
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-950 text-white antialiased">
        <Navbar userEmail={user?.email ?? null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
