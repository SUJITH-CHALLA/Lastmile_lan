"use client"

import { motion } from "framer-motion"

export function PortalStrip() {
    return (
        <section className="bg-yellow-200 border-b-2 border-black overflow-hidden py-4 z-20 relative">
            <div className="w-full mask-linear-fade">
                <motion.div
                    className="flex gap-8 md:gap-16 w-max items-center"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-8 md:gap-16 items-center">
                            {["Naukri", "LinkedIn", "Internshala", "Foundit", "Indeed", "Glassdoor", "Company Career Pages"].map((portal, j) => (
                                <div key={j} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-black"></div>
                                    <span className="text-xl md:text-2xl font-black text-black uppercase whitespace-nowrap">{portal}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
