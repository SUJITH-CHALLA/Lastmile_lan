"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"

import Image from "next/image"

export function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white border-b-2 border-black pt-20 relative px-4 overflow-hidden">
            {/* Background Image with CSS Animation */}
            <div className="absolute inset-0 z-0 animate-[pulse_10s_ease-in-out_infinite]">
                <Image
                    src="/BG-hero.png"
                    alt=""
                    fill
                    className="object-cover opacity-100 mix-blend-multiply origin-center scale-105"
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
                        Build your profile once. Click apply. AI-E handles the resume tailoring, form filling, cover letter, and tracking — you just show up to the interview.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-4"
                    >
                        <JoinWaitlistDialog>
                            <Button size="lg" className="text-base h-12 px-6 border-2 border-black bg-primary text-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all font-bold">
                                Get Early Access — It's Free
                            </Button>
                        </JoinWaitlistDialog>

                        <a href="#how-it-works">
                            <Button variant="outline" size="lg" className="text-base h-12 border-2 border-black shadow-neo hover:bg-gray-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all bg-white text-black font-bold">
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
                            <div className="h-40 bg-gray-100 border-2 border-black p-4 flex flex-col gap-3">
                                <div className="h-4 w-1/3 bg-gray-300"></div>
                                <div className="h-4 w-full bg-gray-200"></div>
                                <div className="h-4 w-5/6 bg-gray-200"></div>
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
            <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-black shadow-neo rounded-full">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gray-200">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold hidden sm:block">Joined by 1,200+ job seekers across India</p>
                </div>

                {/* Portal Compatibility Strip */}
                <div className="bg-white px-5 py-2 border-2 border-black shadow-neo-sm transform -rotate-1 hidden sm:block">
                    <p className="text-xs md:text-sm font-black uppercase text-gray-800 tracking-widest word-spacing-large">
                        Naukri · LinkedIn · Indeed · Internshala · Foundit
                    </p>
                </div>
            </div>
        </section>
    )
}
