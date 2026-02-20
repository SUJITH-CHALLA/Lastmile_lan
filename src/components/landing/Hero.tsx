"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"

import Image from "next/image"

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white border-b-2 border-black pt-20 relative px-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/BG-hero.png"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-100" // Adjustable opacity if needed
                    priority
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-32 relative z-10">

                {/* Text Content */}
                <div className="flex flex-col gap-6 items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-black"
                    >
                        STOP JOB <br />
                        <span className="bg-primary px-2">HUNTING</span> <br />
                        MANUALLY.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base font-medium max-w-md"
                    >
                        The AI-Engine automates applications, tailors resumes, and gets you hired 10x faster. No bullshit, just results.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-4"
                    >
                        <JoinWaitlistDialog>
                            <Button size="lg" className="text-base h-12 border-2 border-black shadow-neo active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                                Start Winning
                            </Button>
                        </JoinWaitlistDialog>

                        <a href="#how-it-works">
                            <Button variant="secondary" size="lg" className="text-base h-12 border-2 border-black shadow-neo hover:bg-gray-100 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                                How it Works
                            </Button>
                        </a>
                    </motion.div>
                </div>

                {/* Visual / Mockup */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 bg-white border-2 border-black p-4 shadow-neo-lg"
                    >
                        {/* Mock Browser/App Window */}
                        <div className="border-b-2 border-black pb-2 mb-4 flex gap-2">
                            <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                            <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-40 bg-gray-100 border-2 border-black dashed flex items-center justify-center">
                                <span className="font-bold">Resume Scanner Active</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-10 w-1/3 bg-primary border-2 border-black"></div>
                                <div className="h-10 w-2/3 bg-gray-100 border-2 border-black"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-100"></div>
                                <div className="h-4 w-5/6 bg-gray-100"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary border-2 border-black"></div>
                </div>
            </div>

            {/* Social Proof - Pinned to bottom */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-black shadow-neo rounded-full">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gray-200">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                    alt="Student"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold">Files filled by 1,200+ students</p>
                </div>
            </div>
        </section>
    )
}
