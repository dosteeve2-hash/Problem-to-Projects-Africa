import { ModeSelector } from "@/components/forms/ModeSelector"

export default function StartPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-3xl sm:text-4xl font-black text-[#f5f0e8] mb-3"
            style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}
          >
            Quel est ton point de départ ?
          </h1>
          <p className="text-[#9ba8c4] text-lg" style={{ fontStyle: "normal" }}>
            Choisis le mode qui correspond à ta situation actuelle.
          </p>
        </div>

        <ModeSelector />
      </div>
    </div>
  )
}
