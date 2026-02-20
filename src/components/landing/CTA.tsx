"use client"

import { Button } from "@/components/ui/button"
import { JoinWaitlistDialog } from "@/components/ui/join-waitlist-dialog"
import { motion } from "framer-motion"

export function CTA() {
    return (
        <footer className="bg-primary text-black py-20 border-t-2 border-black">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 leading-none">
                    READY TO <br /> <span className="bg-white px-4">GET HIRED?</span>
                </h2>
                <p className="text-base text-black/80 font-bold mb-12 max-w-2xl mx-auto">
                    Join 10,000+ students landing their dream jobs with LastMile.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20 relative z-10">
                    <JoinWaitlistDialog>
                        <Button size="lg" className="h-14 px-10 text-lg border-2 border-black bg-black text-white hover:bg-white hover:text-black shadow-neo hover:shadow-none transition-all">
                            Join Waitlist
                        </Button>
                    </JoinWaitlistDialog>
                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 border-black text-black hover:bg-white bg-transparent">
                        Contact Sales
                    </Button>
                </div>

                {/* Flows / Marquees */}
                <div className="w-full overflow-hidden mb-12 border-y-2 border-black bg-white py-4 transform -skew-y-1">
                    <motion.div
                        className="flex gap-12 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                {["GOOGLE", "META", "AMAZON", "OPENAI", "NETFLIX", "MICROSOFT", "UBER", "AIRBNB"].map((company, j) => (
                                    <span key={j} className="text-2xl font-black text-black/20 uppercase">{company}</span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="w-full overflow-hidden mb-20 border-y-2 border-black bg-black py-4 transform skew-y-1">
                    <motion.div
                        className="flex gap-12 w-max"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                {["SOFTWARE ENGINEER", "PRODUCT MANAGER", "DATA SCIENTIST", "UX DESIGNER", "MARKETING", "SALES", "FOUNDER"].map((role, j) => (
                                    <span key={j} className="text-2xl font-black text-white/20 uppercase">{role}</span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t-2 border-black pt-8 gap-4">
                    <div className="font-black text-xl uppercase">LastMile</div>
                    <div className="flex gap-8 text-sm font-bold text-black">
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Terms</a>
                        <a href="#" className="hover:underline">Twitter</a>
                    </div>
                    <div className="text-black text-sm font-bold">
                        © 2026 AI-E Inc.
                    </div>
                </div>
            </div>
        </footer>
    )
}
