import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { CoreEngine } from "@/components/landing/CoreEngine"
import { ToolsGrid } from "@/components/landing/ToolsGrid"
import { Testimonials } from "@/components/landing/Testimonials"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { About } from "@/components/landing/About"
import { CTA } from "@/components/landing/CTA"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <CoreEngine />
      <ToolsGrid />
      <Testimonials />
      <Pricing />
      <About />
      <FAQ />
      <CTA />
    </main>
  )
}
