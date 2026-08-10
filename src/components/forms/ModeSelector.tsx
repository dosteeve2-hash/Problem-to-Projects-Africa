"use client"

import Link from "next/link"
import { Wrench, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const modes = [
  {
    href: "/start/skills",
    icon: Wrench,
    title: "J'ai des compétences",
    subtitle: "mais pas encore d'idée précise",
    description:
      "Tu as des skills concrets — développement, agriculture, commerce, design, langues... P2P Africa trouve le projet qui correspond exactement à ce que tu sais faire.",
    tag: "Mode Skills",
    accent: "#D4AF37",
  },
  {
    href: "/start/idea",
    icon: Lightbulb,
    title: "J'ai une idée",
    subtitle: "et je veux la valider",
    description:
      "Tu as une idée qui germe. P2P Africa l'analyse sous l'angle de la faisabilité, de l'impact local, et te propose un plan pour la concrétiser.",
    tag: "Mode Idée",
    accent: "#00BCD4",
  },
  {
    href: "/start/problem",
    icon: AlertTriangle,
    title: "J'ai observé un problème",
    subtitle: "dans mon entourage ou ma communauté",
    description:
      "Tu as vu quelque chose qui ne fonctionne pas. P2P Africa transforme cette observation en projet concret avec un modèle économique viable.",
    tag: "Mode Problème",
    accent: "#22d98a",
  },
]

export function ModeSelector() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {modes.map((mode, i) => {
        const Icon = mode.icon
        return (
          <motion.div
            key={mode.href}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href={mode.href}
              className="group block h-full rounded-2xl border border-[#1f3054] bg-[#142b52] p-6 transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#0e1f3d] hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: `${mode.accent}15`,
                    border: `1px solid ${mode.accent}25`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: mode.accent }} />
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: `${mode.accent}15`,
                    color: mode.accent,
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  {mode.tag}
                </span>
              </div>

              <h3
                className="text-lg font-bold text-[#f5f0e8] mb-1"
                style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}
              >
                {mode.title}
              </h3>
              <p className="text-sm text-[#9ba8c4] mb-3" style={{ fontStyle: "normal" }}>
                {mode.subtitle}
              </p>
              <p className="text-sm text-[#4e5f82] leading-relaxed" style={{ fontStyle: "normal" }}>
                {mode.description}
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#4e5f82] group-hover:text-[#D4AF37] transition-colors">
                <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Choisir ce mode</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
