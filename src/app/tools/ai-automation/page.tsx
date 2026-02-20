"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { User, FileText, CheckCircle, Send, ArrowRight } from "lucide-react"

export default function AIAutomation() {
    const steps = [
        {
            icon: User,
            title: "1. Profile Analysis",
            desc: "The engine ingests your master profile: skills, experience, and achievements.",
            color: "bg-blue-100"
        },
        {
            icon: FileText,
            title: "2. Resume Generation",
            desc: "It constructs a tailored resume for the specific job description, optimizing keywords.",
            color: "bg-yellow-100"
        },
        {
            icon: CheckCircle,
            title: "3. Match Checking",
            desc: "A pre-check runs to ensure your match score is >90% before applying.",
            color: "bg-green-100"
        },
        {
            icon: Send,
            title: "4. Auto-Apply",
            desc: "The bot fills the application form, answers questions, and submits instantly.",
            color: "bg-red-100"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b-2 border-black p-6 bg-primary">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="font-black text-2xl uppercase tracking-tighter">LastMile.</Link>
                    <nav className="flex gap-4">
                        <Link href="/dashboard" className="font-bold underline">Dashboard</Link>
                        <Link href="/" className="font-bold underline">Back to Home</Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-black uppercase mb-6">Inside the Engine</h1>
                    <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">
                        How AI-E turns your static profile into a dynamic application machine.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute left-[50px] top-0 bottom-0 w-1 bg-black -z-10 transform translate-x-[-50%] ml-8"></div>

                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col md:flex-row gap-8 items-start relative"
                            >
                                {/* Step Number / Icon */}
                                <div className={`w-16 h-16 shrink-0 rounded-full border-2 border-black shadow-neo flex items-center justify-center z-10 ${step.color}`}>
                                    <step.icon className="w-8 h-8 text-black" />
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 bg-white border-2 border-black shadow-neo p-8 w-full hover:translate-x-1 transition-transform">
                                    <h3 className="text-2xl font-black uppercase mb-2">{step.title}</h3>
                                    <p className="text-lg font-medium text-gray-600">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Link href="/dashboard">
                        <button className="bg-black text-white text-xl font-bold py-4 px-12 border-2 border-black shadow-neo hover:bg-primary hover:text-black transition-all">
                            Start The Engine
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
