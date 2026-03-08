"use client"

import { motion } from "framer-motion"

export function CoreEngine() {
    return (
        <section className="py-20 bg-white border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-2">
                    THE <span className="bg-black text-white px-2">AI-E</span> ENGINE
                </h2>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-12">AI-E: Application Intelligence Engine</p>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="p-6 border-2 border-black shadow-neo bg-gray-50 flex flex-col relative z-10 hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-black text-lg mb-4">01</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Analyze</h3>
                        <p className="font-medium text-gray-700">Scans your resume against thousands of job descriptions.</p>
                    </motion.div>

                    {/* Visual Connector 1 (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-[20%] w-[10%] h-0.5 bg-black border-t-2 border-dashed z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="p-6 border-2 border-black shadow-neo bg-primary flex flex-col relative z-10 hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-black text-lg mb-4">02</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Match</h3>
                        <p className="font-medium text-black">Identifies listing keywords and gaps in your profile.</p>
                    </motion.div>

                    {/* Visual Connector 2 (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-[45%] w-[10%] h-0.5 bg-black border-t-2 border-dashed z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="p-6 border-2 border-black shadow-neo bg-gray-50 flex flex-col relative z-10 hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-black text-lg mb-4">03</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Optimize</h3>
                        <p className="font-medium text-gray-700">Rewrites your tailored resume to beat the ATS.</p>
                    </motion.div>

                    {/* Visual Connector 3 (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 right-[20%] w-[10%] h-0.5 bg-black border-t-2 border-dashed z-0"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="p-6 border-2 border-black shadow-neo bg-white text-black flex flex-col relative z-10 hover:-translate-y-2 hover:shadow-neo-lg transition-all"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-black bg-black text-white flex items-center justify-center font-black text-lg mb-4">04</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Apply</h3>
                        <p className="font-medium text-gray-700">Submits your tailored application with one click. You review, you confirm, it's done.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
