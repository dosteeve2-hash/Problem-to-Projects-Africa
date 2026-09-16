import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import { createClient } from "@/lib/supabase/server"
import { Playfair_Display, Outfit, JetBrains_Mono } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

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
  let user = null
  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user
  }

  return (
    <html
      lang="fr"
      className={`h-full ${playfair.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#0A1628] text-[#f5f0e8] antialiased">
        <Navbar userEmail={user?.email ?? null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
