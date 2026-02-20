"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

export function Solution() {
    return (
        <section id="how-it-works" className="py-20 bg-primary text-black border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1 relative">
                        {/* Abstract Flow Diagram Placeholder */}
                        <div className="bg-white border-2 border-black p-8 shadow-neo-lg relative z-10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl">1</div>
                                    <div className="flex-1 bg-gray-100 border-2 border-black p-3 font-bold">Paste Resume</div>
                                </div>
                                <div className="flex justify-center"><ArrowRight className="rotate-90" /></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl">2</div>
                                    <div className="flex-1 bg-gray-100 border-2 border-black p-3 font-bold">Paste Job Description</div>
                                </div>
                                <div className="flex justify-center"><ArrowRight className="rotate-90" /></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl">3</div>
                                    <div className="flex-1 bg-gray-100 border-2 border-black p-3 font-bold bg-green-200">Get Optimized Application</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 left-4 w-full h-full border-2 border-black bg-black -z-0"></div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-2xl md:text-4xl font-black uppercase mb-6 leading-none">
                            MEET AI-Engine. <br /> YOUR UNFAIR ADVANTAGE.
                        </h2>
                        <p className="text-base font-bold mb-8">
                            Stop guessing keywords. Start hitting 90%+ match rates instantly.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {["Tailor resumes in seconds, not hours.", "Generate custom cover letters that don't suck.", "Track every application automatically."].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-base font-medium">
                                    <div className="bg-black text-white p-1"><Check size={16} /></div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Button size="lg" className="border-2 border-black shadow-neo h-12 text-base px-8">
                            See How It Works
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
