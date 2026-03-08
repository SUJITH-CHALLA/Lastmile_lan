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

                        <JoinWaitlistDialog>
                            <Button variant="outline" size="lg" className="text-base h-12 border-2 border-black shadow-neo hover:bg-gray-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all bg-white text-black font-bold">
                                How it Works
                            </Button>
                        </JoinWaitlistDialog>
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
                        <div className="flex flex-col sm:flex-row gap-4 p-4 border-2 border-black bg-gray-50 h-[280px] overflow-hidden">
                            {/* Left Profile Area */}
                            <div className="flex flex-col items-center gap-3 w-full sm:w-1/3 border-r-2 border-black/10 pr-4">
                                <div className="relative w-16 h-16 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center overflow-hidden">
                                    {/* Profile Avatar Shape */}
                                    <div className="absolute bottom-[-5px] w-10 h-10 rounded-full bg-gray-400"></div>
                                    <div className="absolute top-[8px] w-6 h-6 rounded-full bg-gray-400"></div>
                                </div>
                                <div className="h-3 w-3/4 bg-gray-300 rounded-sm mt-1"></div>
                                <div className="h-2 w-1/2 bg-gray-200 rounded-sm"></div>

                                <div className="w-full space-y-2 mt-4">
                                    <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                                    <div className="h-2 w-5/6 bg-gray-200 rounded-sm"></div>
                                    <div className="h-2 w-4/5 bg-gray-200 rounded-sm"></div>
                                </div>
                            </div>

                            {/* Right Form Fillup Area */}
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="h-4 w-1/2 bg-gray-300 rounded-sm mb-1"></div>

                                {/* Form Skeletons */}
                                <div className="flex gap-3">
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-2 w-1/2 bg-gray-300 rounded-sm"></div>
                                        <div className="h-8 w-full bg-white border-2 border-black/20 rounded-sm flex items-center px-2">
                                            <div className="h-2 w-2/3 bg-gray-200 rounded-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-2 w-1/2 bg-gray-300 rounded-sm"></div>
                                        <div className="h-8 w-full bg-white border-2 border-black/20 rounded-sm flex items-center px-2">
                                            <div className="h-2 w-1/2 bg-gray-200 rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 mt-1">
                                    <div className="h-2 w-1/3 bg-gray-300 rounded-sm"></div>
                                    <div className="h-16 w-full bg-white border-2 border-black/20 rounded-sm p-2 flex flex-col gap-1.5">
                                        <div className="h-2 w-full bg-gray-200 rounded-sm"></div>
                                        <div className="h-2 w-5/6 bg-gray-200 rounded-sm"></div>
                                        <div className="h-2 w-4/6 bg-gray-200 rounded-sm"></div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-2 mt-auto pt-2">
                                    <div className="h-7 w-16 bg-gray-200 border border-black/20 rounded-sm"></div>
                                    <div className="h-7 w-20 bg-primary border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm flex items-center justify-center">
                                        <div className="h-1.5 w-8 bg-black/60 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Social Proof - Pinned to bottom */}
            <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 bg-white px-6 py-3 border-2 border-black shadow-neo rounded-full">
                    <div className="flex -space-x-3">
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
                    <p className="text-sm font-bold hidden sm:block leading-tight">Joined by 1,200+ job seekers across India</p>
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
