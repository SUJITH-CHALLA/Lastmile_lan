"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export function ToolsGrid() {
    const tools = [
        {
            title: "ATS Score Checker",
            desc: "Paste your resume and a JD. Get an instant ATS match score with a breakdown of what to fix.",
            href: "/tools/ats-score-checker",
            tag: "FREE"
        },
        {
            title: "Naukri / LinkedIn Profile Optimizer",
            desc: "AI rewrites your profile headline, summary, and skills to get found by recruiters.",
            href: "/tools/profile-optimizer",
            tag: "NEW"
        },
        {
            title: "Auto-Apply Intelligence",
            desc: "Your one-click apply assistant. Fill any job form instantly and confirm before it submits.",
            href: "/tools/auto-apply-copilot",
            tag: "COMING SOON"
        },
        {
            title: "Resume Summary Generator",
            desc: "Craft a punchy professional summary in seconds.",
            href: "/tools/resume-summary-generator",
            tag: "FREE"
        },
        {
            title: "Bullet Point Generator",
            desc: "Turn weak metrics into power statements.",
            href: "/tools/resume-bullet-point-generator",
            tag: "POPULAR"
        },
        {
            title: "Job Tracker",
            desc: "Organize your chaos. Kanban board included.",
            href: "/tools/job-tracker",
            tag: "NEW"
        },
        {
            title: "Portfolio Developer",
            desc: "Generate and deploy a personal site from your profile.",
            href: "/tools/portfolio-developer",
            tag: "NEW"
        },
        {
            title: "AI-E Automation",
            desc: "See how the magic works. From profile to hired.",
            href: "/tools/ai-automation",
            tag: "FEATURE"
        },
        {
            title: "Interview Prep",
            desc: "AI mock interviews with real-time feedback.",
            href: "/tools/interview-prep",
            tag: "COMING SOON"
        }
    ]

    const [showAll, setShowAll] = useState(false)
    const visibleTools = showAll ? tools : tools.slice(0, tools.length - 3)

    return (
        <section id="tools" className="py-20 bg-gray-50 border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-center">
                    THE TOOLKIT
                </h2>

                <div className="flex justify-center mb-12">
                    <div className="bg-yellow-200 border-2 border-black px-4 py-2 shadow-neo-sm transform -rotate-1">
                        <p className="text-xs md:text-sm font-black uppercase text-black tracking-widest word-spacing-large">
                            Naukri · LinkedIn · Internshala · Foundit · Indeed · Company Career Pages
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleTools.map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={tool.href} className="group block h-full">
                                <Card className="h-full border-2 border-black shadow-neo hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 p-8 group-hover:bg-primary/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase min-w-[80px] text-center">{tool.tag}</div>
                                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase mb-2">{tool.title}</h3>
                                    <p className="text-gray-600 font-medium">{tool.desc}</p>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/tools">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-black shadow-neo h-14 text-lg"
                        >
                            View All Tools
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
