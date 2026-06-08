import { Hero } from "@/components/marketing/Hero"
import { HowItWorks } from "@/components/marketing/HowItWorks"
import { UseCases } from "@/components/marketing/UseCases"
import { CountriesSection } from "@/components/marketing/CountriesSection"
import { SectorGrid } from "@/components/marketing/SectorGrid"
import { CTASection } from "@/components/marketing/CTASection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <UseCases />
      <CountriesSection />
      <SectorGrid />
      <CTASection />
    </>
  )
}
