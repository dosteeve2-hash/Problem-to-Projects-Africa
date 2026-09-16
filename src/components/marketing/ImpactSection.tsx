"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { TrendingUp, Globe, Briefcase, Heart } from "lucide-react"

const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Projets générés",
    sublabel: "idées transformées en plans concrets",
    icon: TrendingUp,
    colorVar: "var(--gold)",
    colorHex: "#D4AF37",
  },
  {
    value: 9,
    suffix: "",
    label: "Pays africains",
    sublabel: "et en croissance chaque mois",
    icon: Globe,
    colorVar: "var(--cyan)",
    colorHex: "#00BCD4",
  },
  {
    value: 30,
    suffix: "+",
    label: "Secteurs couverts",
    sublabel: "agriculture, tech, artisanat, santé…",
    icon: Briefcase,
    colorVar: "var(--green)",
    colorHex: "#22d98a",
  },
  {
    value: 100,
    suffix: "%",
    label: "Gratuit pour tous",
    sublabel: "toujours accessible, sans compte requis",
    icon: Heart,
    colorVar: "var(--gold)",
    colorHex: "#D4AF37",
  },
] as const

function AnimatedCounter({
  value,
  suffix,
  colorVar,
  isVisible,
}: {
  value: number
  suffix: string
  colorVar: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let current = 0
    const totalSteps = 50
    const increment = Math.ceil(value / totalSteps)
    const intervalMs = 1400 / totalSteps

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span
      style={{
        color: colorVar,
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: "-0.03em",
      }}
    >
      {count}
      {suffix}
    </span>
  )
}

export function ImpactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{
              border: "1px solid rgba(212,175,55,0.25)",
              background: "rgba(212,175,55,0.08)",
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--gold)", fontFamily: "var(--font-mono)" }}
            >
              Notre impact
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--text)",
            }}
          >
            Des chiffres qui parlent.
          </h2>
          <p
            className="mt-3 text-sm max-w-md mx-auto"
            style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}
          >
            P2P Africa en quelques mots
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
                style={{
                  background: "var(--bg3)",
                  border: `1px solid ${stat.colorHex}20`,
                  boxShadow: `0 0 30px ${stat.colorHex}06`,
                }}
              >
                {/* Icon */}
                <div
                  className="rounded-xl p-3 mb-4"
                  style={{
                    background: `${stat.colorHex}12`,
                    border: `1px solid ${stat.colorHex}25`,
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: stat.colorVar }}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Animated number */}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  colorVar={stat.colorVar}
                  isVisible={isInView}
                />

                {/* Label */}
                <div
                  className="mt-2 text-sm font-bold"
                  style={{ color: "var(--text)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                >
                  {stat.label}
                </div>
                <div
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--text3)", fontFamily: "var(--font-mono)" }}
                >
                  {stat.sublabel}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
