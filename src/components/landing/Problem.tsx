"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { XCircle, Clock, Frown } from "lucide-react"

export function Problem() {
    const problems = [
        {
            icon: <Clock className="w-8 h-8 text-primary" />,
            title: "Waste of Time",
            description: "Spending 20 hours a week customizing resumes manually is insane."
        },
        {
            icon: <XCircle className="w-8 h-8 text-primary" />,
            title: "Zero Feedback",
            description: "Applying to 100 jobs and getting ghosted by 99 of them."
        },
        {
            icon: <Frown className="w-8 h-8 text-primary" />,
            title: "Constant Rejection",
            description: "Getting the same 'Unfortunately, we decided to move forward...' email."
        }
    ]

    return (
        <section className="py-20 bg-white text-black border-b-2 border-black">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-black uppercase mb-4 text-black">
                        The Job Search <br /> <span className="bg-primary px-2 text-black">Is Broken.</span>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto font-medium">
                        The modern hiring process is designed to filter you out, not find you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-gray-50 border-2 border-black text-black p-8 hover:bg-primary/20 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all shadow-neo hover:shadow-neo-lg">
                                <div className="mb-6 bg-white w-16 h-16 flex items-center justify-center rounded-none border-2 border-black shadow-neo-sm">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-4">{item.title}</h3>
                                <p className="text-gray-700 font-medium">{item.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
