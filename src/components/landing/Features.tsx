"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Send, Kanban, MessageSquare, LayoutTemplate, Briefcase } from "lucide-react"

export function Features() {
    const features = [
        {
            icon: <FileText className="w-8 h-8 text-black" />,
            title: "AI Resume Tailoring",
            description: "We analyze job descriptions and optimize your resume to beat the ATS every single time.",
            bgColor: "bg-yellow-200"
        },
        {
            icon: <Send className="w-8 h-8 text-black" />,
            title: "Auto-Apply Copilot",
            description: "Stop filling out the same forms. Our extension applies to jobs for you while you sleep.",
            bgColor: "bg-green-200"
        },
        {
            icon: <Kanban className="w-8 h-8 text-black" />,
            title: "Smart Job Tracker",
            description: "A built-in Kanban board to track applications, interviews, and offers in one place.",
            bgColor: "bg-pink-200"
        },
        {
            icon: <LayoutTemplate className="w-8 h-8 text-black" />,
            title: "Portfolio Builder",
            description: "Turn your experience into a deployed, professional portfolio website in one click.",
            bgColor: "bg-purple-200"
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-black" />,
            title: "Cover Letter Gen",
            description: "Generate highly personalized cover letters that recruiters actually want to read.",
            bgColor: "bg-blue-200"
        },
        {
            icon: <Briefcase className="w-8 h-8 text-black" />,
            title: "Mock Interviews",
            description: "Practice with our AI interviewer and get real-time feedback on your responses.",
            bgColor: "bg-orange-200"
        }
    ]

    return (
        <section id="features" className="py-20 bg-white text-black border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-black">
                        YOUR <span className="bg-primary px-2 text-black">UNFAIR ADVANTAGE.</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                        Everything a student needs to stop getting ghosted and start getting hired.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card className="h-full bg-white border-2 border-black text-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all shadow-neo hover:shadow-neo-lg flex flex-col items-start rounded-none">
                                <div className={`mb-6 w-16 h-16 flex items-center justify-center rounded-none border-2 border-black shadow-neo-sm ${feature.bgColor}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-3">{feature.title}</h3>
                                <p className="text-gray-700 font-medium leading-relaxed">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
