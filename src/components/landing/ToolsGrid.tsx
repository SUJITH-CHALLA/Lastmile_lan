"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function ToolsGrid() {
    const tools = [
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
            title: "Auto-Apply Copilot",
            desc: "The chrome extension that does the work for you.",
            href: "/tools/auto-apply-copilot",
            tag: "COMING SOON"
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
            title: "Autofill Forms",
            desc: "One-click application filling for any job board.",
            href: "#",
            tag: "COMING SOON"
        },
        {
            title: "LinkedIn Optimizer",
            desc: "Turn your profile into a recruiter magnet.",
            href: "#",
            tag: "NEW"
        },
        {
            title: "Interview Prep",
            desc: "AI mock interviews with real-time feedback.",
            href: "#",
            tag: "COMING SOON"
        }
    ]

    const [showAll, setShowAll] = useState(false)
    const visibleTools = showAll ? tools : tools.slice(0, tools.length - 3)

    return (
        <section id="tools" className="py-20 bg-gray-50 border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 text-center">
                    THE TOOLKIT
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visibleTools.map((tool, i) => (
                        <Link key={i} href={tool.href} className="group">
                            <Card className="h-full border-2 border-black shadow-neo hover:shadow-neo-lg transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] p-8 group-hover:bg-primary/10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">{tool.tag}</div>
                                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                                <h3 className="text-2xl font-bold uppercase mb-2">{tool.title}</h3>
                                <p className="text-gray-600 font-medium">{tool.desc}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                        className="border-2 border-black shadow-neo h-14 text-lg"
                    >
                        {showAll ? "View Less Tools" : "View All Tools"}
                    </Button>
                </div>
            </div>
        </section>
    )
}
