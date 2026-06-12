"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Wrench, Lightbulb, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

const PARTICLES = [
  { left: "8%", top: "18%", size: 3, delay: 0, dur: 4.2 },
  { left: "85%", top: "12%", size: 2, delay: 0.8, dur: 5.1 },
  { left: "15%", top: "72%", size: 4, delay: 1.2, dur: 3.8 },
  { left: "91%", top: "63%", size: 2, delay: 0.3, dur: 4.7 },
  { left: "52%", top: "8%", size: 3, delay: 1.5, dur: 3.3 },
  { left: "32%", top: "88%", size: 2, delay: 0.6, dur: 5.6 },
  { left: "72%", top: "28%", size: 3, delay: 1.8, dur: 4.1 },
  { left: "4%", top: "52%", size: 2, delay: 0.4, dur: 4.9 },
  { left: "96%", top: "42%", size: 3, delay: 1.1, dur: 3.7 },
  { left: "47%", top: "93%", size: 2, delay: 0.9, dur: 5.3 },
  { left: "62%", top: "78%", size: 4, delay: 1.6, dur: 3.5 },
  { left: "22%", top: "38%", size: 2, delay: 0.2, dur: 4.4 },
  { left: "78%", top: "82%", size: 3, delay: 1.4, dur: 4.8 },
  { left: "38%", top: "58%", size: 2, delay: 0.7, dur: 5.9 },
  { left: "18%", top: "48%", size: 3, delay: 1.9, dur: 3.6 },
]

const MODES = [
  {
    href: "/start/problem",
    icon: AlertTriangle,
    tag: "Mode Problème",
    title: "J'ai observé un problème",
    subtitle: "dans mon entourage ou ma communauté",
    accent: "var(--gold)",
    accentHex: "#f0a832",
  },
  {
    href: "/start/idea",
    icon: Lightbulb,
    tag: "Mode Idée",
    title: "J'ai une idée",
    subtitle: "et je veux la valider et l'exécuter",
    accent: "var(--cyan)",
    accentHex: "#2dd4ff",
  },
  {
    href: "/start/skills",
    icon: Wrench,
    tag: "Mode Compétences",
    title: "J'ai des compétences",
    subtitle: "mais pas encore d'idée précise",
    accent: "var(--green)",
    accentHex: "#22d98a",
  },
]

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 pb-20">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(240,168,50,0.07)" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "rgba(45,212,255,0.04)" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-[350px] h-[250px] rounded-full blur-[80px]"
          style={{ background: "rgba(34,217,138,0.03)" }}
        />
      </div>

      {/* 15 floating gold particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -z-10 pointer-events-none"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <svg width={p.size * 4} height={p.size * 4} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r={p.size} fill="var(--gold)" />
          </svg>
        </motion.div>
      ))}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ border: "1px solid rgba(240,168,50,0.25)", background: "rgba(240,168,50,0.08)" }}
        >
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--gold2)", fontFamily: "var(--font-mono)" }}
          >
            Propulsé par Claude AI · 9 pays africains
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-5"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          <span style={{ color: "var(--text)" }}>Transforme ton problème</span>
          <br />
          <span style={{ color: "var(--gold)" }}>en projet concret.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-lg mb-12 leading-relaxed"
          style={{ color: "var(--text2)", fontFamily: "var(--font-sans)", fontStyle: "normal" }}
        >
          Tu as des skills, une idée, ou tu vois un problème ?{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>P2P Africa</strong> analyse ton contexte et génère un projet{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>adapté à ta réalité africaine.</strong>
        </motion.p>

        {/* Mode cards */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {MODES.map((mode) => {
            const Icon = mode.icon
            return (
              <motion.div key={mode.href} variants={cardItem}>
                <Link
                  href={mode.href}
                  className="group block rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: "1px solid var(--border2)",
                    background: "var(--bg3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${mode.accentHex}60`
                    e.currentTarget.style.background = "var(--bg2)"
                    e.currentTarget.style.boxShadow = `0 20px 60px ${mode.accentHex}10`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border2)"
                    e.currentTarget.style.background = "var(--bg3)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: `${mode.accentHex}15`,
                        border: `1px solid ${mode.accentHex}30`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: mode.accentHex }} />
                    </div>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: `${mode.accentHex}15`,
                        color: mode.accentHex,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {mode.tag}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}
                  >
                    {mode.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text2)", fontStyle: "normal" }}>
                    {mode.subtitle}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}
                  >
                    Choisir ce mode
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={6}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/start">
            <button
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all hover:scale-105 cursor-pointer"
              style={{
                background: "var(--gold)",
                color: "var(--bg)",
                boxShadow: "0 8px 32px rgba(240,168,50,0.25)",
              }}
            >
              Commence maintenant
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <Link href="/how-it-works">
            <button
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold transition-all cursor-pointer"
              style={{
                color: "var(--text2)",
                border: "1px solid var(--border2)",
              }}
            >
              Voir comment ça marche
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={7}
          variants={fade}
          initial="hidden"
          animate="show"
          className="pt-10"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-sm tracking-widest"
            style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}
          >
            500+ projets · 30+ pays · Claude AI · Gratuit
          </p>
        </motion.div>
      </div>
    </section>
  )
}
