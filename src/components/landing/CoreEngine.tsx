"use client"

import { motion } from "framer-motion"

export function CoreEngine() {
    return (
        <section className="py-20 bg-white border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">
                    POWERED BY <span className="bg-black text-white px-2">AI-E</span>
                </h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="text-6xl font-black mb-4">01</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Analyze</h3>
                        <p>Scans your resume against thousands of job descriptions.</p>
                    </div>
                    <div className="p-6 border-2 border-black shadow-neo bg-primary">
                        <div className="text-6xl font-black mb-4">02</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Match</h3>
                        <p>Identifies listing keywords and gaps in your profile.</p>
                    </div>
                    <div className="p-6 border-2 border-black shadow-neo bg-white">
                        <div className="text-6xl font-black mb-4">03</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Optimize</h3>
                        <p>Rewrites your tailored resume to beat the ATS.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
