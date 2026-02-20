"use client" // turbo

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Calendar, Building, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export default function JobTracker() {
    const columns = [
        {
            title: "To Apply",
            color: "bg-gray-100",
            items: [
                { company: "Airbnb", role: "Frontend Engineer", salary: "$140k", due: "2 days" },
                { company: "Linear", role: "Product Designer", salary: "$160k", due: "Tomorrow" },
            ]
        },
        {
            title: "Applied",
            color: "bg-blue-100",
            items: [
                { company: "Vercel", role: "DevRel Engineer", salary: "$150k", due: "Applied 3d ago" },
                { company: "Stripe", role: "Backend Engineer", salary: "$170k", due: "Applied 1w ago" },
                { company: "Notion", role: "Full Stack Dev", salary: "$155k", due: "Applied 2w ago" },
            ]
        },
        {
            title: "Interviewing",
            color: "bg-yellow-100",
            items: [
                { company: "OpenAI", role: "Research Engineer", salary: "$200k", due: "Onsite Tmw" },
            ]
        },
        {
            title: "Offer",
            color: "bg-green-100",
            items: [
                { company: "Google", role: "L4 Engineer", salary: "$190k", due: "Expires in 3d" },
            ]
        }
    ]

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase mb-2">My Applications</h1>
                    <p className="text-lg text-gray-600 font-medium">Manage your pipeline like a pro.</p>
                </div>
                <Button className="border-2 border-black shadow-neo font-bold gap-2">
                    <Plus size={20} /> New Job
                </Button>
            </div>

            <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
                {columns.map((col, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="min-w-[300px] w-full md:w-[350px] shrink-0 snap-center"
                    >
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="font-black uppercase text-lg flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full border border-black ${col.color}`}></span>
                                {col.title}
                                <span className="text-gray-400 text-sm ml-2 font-bold">{col.items.length}</span>
                            </h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                <MoreHorizontal size={16} />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {col.items.map((item, j) => (
                                <Card key={j} className="p-4 border-2 border-black shadow-neo-sm hover:shadow-neo transition-all bg-white cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="font-bold text-lg">{item.role}</div>
                                        <div className="w-8 h-8 bg-gray-100 border border-black flex items-center justify-center font-bold text-xs shrink-0">
                                            {item.company[0]}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600 mb-4">
                                        <Building size={14} /> {item.company}
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant="secondary" className="border-black bg-gray-50 flex gap-1 items-center px-1.5 py-0">
                                            <DollarSign size={10} /> {item.salary}
                                        </Badge>
                                        <Badge variant="secondary" className={`border-black flex gap-1 items-center px-1.5 py-0 ${col.title === 'Offer' ? 'bg-green-100' : 'bg-yellow-50'}`}>
                                            <Calendar size={10} /> {item.due}
                                        </Badge>
                                    </div>
                                </Card>
                            ))}

                            <Button variant="ghost" className="w-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-black hover:text-black hover:bg-transparent">
                                <Plus size={16} className="mr-2" /> Add Card
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
