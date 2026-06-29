"use client"

import { motion } from "framer-motion"
import { X, Check, MapPin, Cpu, Zap } from "lucide-react"

const comparisons = [
  {
    generic: "Conseils génériques applicables partout",
    p2p: "Projets ancrés dans ta réalité locale — Ouaga, Dakar, Abidjan, Kinshasa…",
  },
  {
    generic: "\"Lance une startup tech\" sans contexte",
    p2p: "Stack adaptée : SMS si faible connectivité, mobile money si non-bancarisé",
  },
  {
    generic: "Roadmap irréaliste (\"lève des fonds en 6 mois\")",
    p2p: "MVP en 30 jours avec les ressources dont tu disposes réellement",
  },
  {
    generic: "Secteurs tech uniquement (SaaS, apps mobile…)",
    p2p: "30+ secteurs : agriculture, artisanat, logistique, santé, commerce de rue…",
  },
]

const pillars = [
  {
    icon: MapPin,
    title: "Connaissance locale",
    desc: "9 pays, leurs villes, leurs infrastructures, leurs marchés, leur culture entrepreneuriale. P2P ne t'envoie pas vers des modèles qui ne marchent pas ici.",
    color: "#f0a832",
    colorHex: "#f0a832",
  },
  {
    icon: Cpu,
    title: "IA contextuelle",
    desc: "Claude analyse simultanément tes compétences, ton contexte pays, les secteurs porteurs locaux et les contraintes réelles pour générer un projet cohérent.",
    color: "var(--cyan)",
    colorHex: "#2dd4ff",
  },
  {
    icon: Zap,
    title: "Résultat actionnable",
    desc: "Pas un article de blog. Un projet avec titre, pitch, stack, scope MVP et roadmap 30 jours. Tu sors de P2P avec quelque chose à faire dès demain.",
    color: "var(--green)",
    colorHex: "#22d98a",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function MethodSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(45,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{
              border: "1px solid rgba(45,212,255,0.25)",
              background: "rgba(45,212,255,0.07)",
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}
            >
              Notre approche
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--text)",
            }}
          >
            Pas une IA générique.
            <br />
            <span style={{ color: "var(--cyan)" }}>Une IA qui connaît l'Afrique.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text2)" }}>
            ChatGPT te dit de "valider ton marché". P2P Africa te dit quel marché,
            avec quelle stack, pour quel client, dans ta ville.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-2xl p-7"
                style={{
                  background: "var(--bg3)",
                  border: `1px solid ${pillar.colorHex}25`,
                  boxShadow: `0 0 40px ${pillar.colorHex}06`,
                }}
              >
                <div
                  className="inline-flex rounded-xl p-3 mb-5"
                  style={{
                    background: `${pillar.colorHex}15`,
                    border: `1px solid ${pillar.colorHex}30`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: pillar.colorHex }} />
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    color: "var(--text)",
                  }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text2)" }}>
                  {pillar.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison table */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ border: "1px solid var(--border2)" }}
        >
          {/* Table header */}
          <div className="grid grid-cols-2">
            <div
              className="px-6 py-4 text-center text-sm font-semibold"
              style={{
                background: "rgba(239,68,68,0.08)",
                borderBottom: "1px solid var(--border2)",
                borderRight: "1px solid var(--border2)",
                color: "#ef4444",
                fontFamily: "var(--font-mono)",
              }}
            >
              IA générique
            </div>
            <div
              className="px-6 py-4 text-center text-sm font-semibold"
              style={{
                background: "rgba(240,168,50,0.08)",
                borderBottom: "1px solid var(--border2)",
                color: "var(--gold)",
                fontFamily: "var(--font-mono)",
              }}
            >
              P2P Africa
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-2"
              style={{
                borderBottom: i < comparisons.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {/* Generic side */}
              <div
                className="flex items-start gap-3 px-6 py-5"
                style={{
                  borderRight: "1px solid var(--border2)",
                  background: "rgba(239,68,68,0.02)",
                }}
              >
                <div
                  className="mt-0.5 shrink-0 rounded-full p-1"
                  style={{ background: "rgba(239,68,68,0.12)" }}
                >
                  <X className="h-3.5 w-3.5" style={{ color: "#ef4444" }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text3)" }}>
                  {row.generic}
                </p>
              </div>

              {/* P2P side */}
              <div
                className="flex items-start gap-3 px-6 py-5"
                style={{ background: "rgba(240,168,50,0.02)" }}
              >
                <div
                  className="mt-0.5 shrink-0 rounded-full p-1"
                  style={{ background: "rgba(240,168,50,0.15)" }}
                >
                  <Check className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {row.p2p}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
