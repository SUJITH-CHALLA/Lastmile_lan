"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"

export function Pricing() {
    const [isYearly, setIsYearly] = useState(false)

    const plans = [
        {
            name: "Free",
            price: isYearly ? "0" : "0",
            desc: "Perfect for getting started.",
            features: ["5 ATS Score Checks/mo", "3 Resume Scans/mo", "Basic Job Tracker", "Community Access"],
            cta: "Start Free",
            popular: false
        },
        {
            name: "Pro",
            price: isYearly ? "1,049" : "1,499",
            desc: "For serious job seekers.",
            features: ["Unlimited Scans", "AI Cover Letters", "Auto-Apply Intelligence", "LinkedIn Optimization", "Works on Naukri, LinkedIn, Internshala, Foundit"],
            cta: "Get Pro",
            popular: true
        },
        {
            name: "AI-E Turbo",
            price: isYearly ? "1,399" : "1,999",
            desc: "Maximum speed & automation.",
            features: ["Everything in Pro", "Turbo Auto-Apply", "Priority queue on all Indian job portals", "Priority AI-E support + dedicated onboarding"],
            cta: "Get Turbo",
            popular: false
        }
    ]

    return (
        <section id="pricing" className="py-20 bg-primary/10 border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-black uppercase mb-6">Simple Pricing.</h2>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`font-bold px-3 py-1 rounded-full transition-colors ${!isYearly ? "bg-black text-white" : "text-gray-500"}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-16 h-8 bg-black rounded-full p-1 transition-all"
                        >
                            <div className={`w-6 h-6 bg-white rounded-full transition-all ${isYearly ? "translate-x-8" : "translate-x-0"}`}></div>
                        </button>
                        <span className={`font-bold px-3 py-1 rounded-full transition-colors flex items-center gap-2 ${isYearly ? "bg-black text-white" : "text-gray-500"}`}>Yearly <span className="bg-green-300 text-xs px-2 py-0.5 rounded-full text-black font-black border-2 border-black">-30%</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {plans.map((plan, i) => (
                        <Card key={i} className={`relative p-8 border-2 border-black shadow-neo hover:shadow-neo-lg transition-all flex flex-col ${plan.popular ? "bg-white md:scale-105 z-10" : "bg-gray-50"}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-4 py-1 font-black uppercase border-2 border-black shadow-neo-sm transform -rotate-2 z-20">
                                    <span className="relative">
                                        🔥 Most Popular
                                    </span>
                                </div>
                            )}
                            <h3 className="text-lg font-black uppercase mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-black">₹{plan.price}</span>
                                <span className="text-gray-500 font-bold">/mo</span>
                            </div>
                            <p className="text-gray-600 font-medium mb-6 text-sm">{plan.desc}</p>

                            <div className="space-y-4 flex-1 mb-8">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <div className="bg-black text-white p-0.5 shrink-0 mt-1"><Check size={14} /></div>
                                        <span className="font-bold">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <JoinWaitlistDialog>
                                <Button className={`w-full mt-auto border-2 border-black shadow-neo active:shadow-none font-bold text-base h-12 ${plan.popular ? "bg-primary text-black hover:bg-yellow-400" : "bg-white text-black hover:bg-gray-100"}`}>
                                    {plan.cta}
                                </Button>
                            </JoinWaitlistDialog>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
