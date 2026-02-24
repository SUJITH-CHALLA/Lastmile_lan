"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

export function Solution() {
    return (
        <section id="how-it-works" className="py-20 bg-primary text-black border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="order-2 lg:order-1 relative overflow-visible pr-2 pb-2">
                        <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10">
                            <div className="space-y-2">
                                {[
                                    { step: 1, text: "Build Your Profile Once", bg: "bg-gray-100" },
                                    { step: 2, text: "Find a Job on Any Portal", bg: "bg-gray-100" },
                                    { step: 3, text: "Click Apply", bg: "bg-gray-100" },
                                    { step: 4, text: "AI-E Fills the Form + Tailors Resume + Writes Cover Letter", bg: "bg-gray-100" },
                                    { step: 5, text: "Review and Submit in One Click", bg: "bg-green-200" }
                                ].map((item, i) => (
                                    <div key={item.step}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: i * 0.15 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-neo-sm">
                                                {item.step}
                                            </div>
                                            <div className={`flex-1 ${item.bg} border-2 border-black p-2 font-bold text-sm shadow-neo-sm`}>
                                                {item.text}
                                            </div>
                                        </motion.div>
                                        {i < 4 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                whileInView={{ height: "auto", opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (i * 0.15) + 0.1, duration: 0.2 }}
                                                className="flex flex-col items-center py-1 overflow-hidden"
                                            >
                                                <div className="w-0.5 h-4 bg-black"></div>
                                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black"></div>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute top-4 left-4 w-full h-full border-2 border-black bg-black -z-0"></div>
                        <p className="mt-8 text-sm font-bold text-center">
                            Works on Naukri, LinkedIn, Internshala, Foundit, Indeed, and company career pages.
                        </p>
                    </div>

                    <div className="order-1 lg:order-2">
                        <h2 className="text-2xl md:text-4xl font-black uppercase mb-6 leading-none">
                            MEET AI-Engine. <br /> YOUR UNFAIR ADVANTAGE.
                        </h2>
                        <p className="text-base font-bold mb-8">
                            AI-E is your personal job application assistant. It reads the job, rewrites your resume, fills the form, and writes the cover letter — you click apply once and it handles everything else.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Tailor resumes in seconds, not hours.",
                                "Generate custom cover letters that don't suck.",
                                "Track every application automatically.",
                                "Applies to jobs on 10+ Indian and global portals without switching tabs."
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-3 text-base font-medium"
                                >
                                    <div className="bg-black text-white p-1 shrink-0"><Check size={16} /></div>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <Button variant="outline" size="lg" className="bg-white text-black border-2 border-black shadow-neo h-12 text-base px-8 font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-gray-50">
                            Watch AI-E in Action
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
