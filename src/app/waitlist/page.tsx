import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/waitlist/Hero"
import { CTA } from "@/components/waitlist/CTA"

export default function WaitlistPage() {
   return (
      <main className="min-h-screen bg-white font-sans">
         <Navbar />
         <Hero />
         <CTA />
      </main>
   )
}
