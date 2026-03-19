"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Folder,
    ExternalLink,
    Code,
    LayoutTemplate,
    MoreVertical,
    Plus,
    Activity,
    MonitorPlay,
    Download
} from "lucide-react"

type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: string;
    isFeatured: boolean;
}

const dummyProjects: Project[] = [
    { id: 1, title: "E-commerce Dashboard", description: "Admin panel for tracking sales and inventory.", tags: ["React", "Tailwind", "Node.js"], date: "Jan 12, 2026", isFeatured: true },
    { id: 2, title: "Fintech Mobile App", description: "Cross-platform mobile banking application.", tags: ["React Native", "TypeScript"], date: "Dec 05, 2025", isFeatured: true },
    { id: 3, title: "AI Content Generator", description: "SaaS platform using OpenAI APIs.", tags: ["Next.js", "GPT-4"], date: "Nov 20, 2025", isFeatured: false },
    { id: 4, title: "Healthcare Portal", description: "Patient management and appointment scheduling.", tags: ["Vue", "Firebase"], date: "Oct 15, 2025", isFeatured: false },
    { id: 5, title: "Social Media Scheduler", description: "Automated posting for Twitter and LinkedIn.", tags: ["Python", "React"], date: "Sep 02, 2025", isFeatured: false },
]

const dummyTemplates = [
    { id: 101, title: "Minimal Developer", description: "Clean, dark-mode portfolio for software engineers.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", stack: ["Next.js", "Tailwind"] },
    { id: 102, title: "Creative Designer", description: "Image-heavy masonry layout for UI/UX designers.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop", stack: ["Framer Motion", "React"] },
    { id: 103, title: "Data Scientist PRO", description: "Jupyter-notebook style technical portfolio.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", stack: ["Python", "Streamlit"] },
]

export function PortfolioVault() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState<"Live" | "Templates">("Live")

    const filteredProjects = dummyProjects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const filteredTemplates = dummyTemplates.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="flex-1 overflow-y-auto bg-lm-content p-6 sm:p-8 slim-scroll font-sans text-lm-black">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-lm-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden"
                >
                    {/* Header Row */}
                    <div className="p-5 border-b border-lm-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#FAFAFA]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-lm-black flex items-center justify-center border-2 border-white shadow-sm">
                                <Folder className="w-5 h-5 text-lm-yellow" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-[16px] font-black text-lm-black uppercase tracking-wider">Your Portfolio</h2>
                                <p className="text-[12px] text-lm-text-secondary font-medium mt-0.5">Manage your selected projects & case studies</p>
                            </div>
                            <div className="ml-2 px-2.5 py-1 bg-lm-yellow text-lm-black text-[11px] font-black rounded-full border border-lm-border/50 shadow-sm">
                                {dummyProjects.length}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto">
                            <div className="flex items-center w-full sm:w-[260px] bg-white rounded-xl px-3 py-1.5 border border-lm-border focus-within:border-lm-black transition-colors relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                                <input
                                    type="text"
                                    placeholder="Search projects or skills..."
                                    className="bg-transparent border-none outline-none text-[12px] w-full pl-7 text-lm-black placeholder:text-gray-400 font-medium h-6"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-lm-yellow text-lm-black font-bold text-[12px] rounded-xl hover:bg-[#e0b200] transition-colors border-2 border-transparent w-full sm:w-auto shadow-sm whitespace-nowrap">
                                <Plus className="w-4 h-4" strokeWidth={2.5} /> {activeTab === "Live" ? "Deploy New" : "Request Template"}
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#EEEEEE] bg-white px-5 pt-2">
                        {["Live", "Templates"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as "Live" | "Templates")}
                                className={`py-3 px-5 text-[13px] font-bold transition-colors relative ${activeTab === tab ? "text-lm-black" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab === "Live" ? <Activity className="w-4 h-4" /> : <LayoutTemplate className="w-4 h-4" />}
                                    {tab === "Live" ? "Live Console" : "Ready Templates"}
                                </span>
                                {activeTab === tab && (
                                    <motion.div layoutId="portfolioTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lm-yellow" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content View */}
                    <div className="w-full">
                        {activeTab === "Live" ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[800px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-lm-border text-lm-text-secondary">
                                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-wider w-[6%] border-r border-[#EEEEEE]">S.No</th>
                                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-wider w-[25%] border-r border-[#EEEEEE]">Project Name</th>
                                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-wider w-[25%] border-r border-[#EEEEEE]">Tech Stack</th>
                                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-wider w-[14%] border-r border-[#EEEEEE]">Added Date</th>
                                            <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-wider w-[30%] text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {filteredProjects.map((p, idx) => (
                                                <motion.tr
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    key={p.id}
                                                    className="border-b border-[#EEEEEE] hover:bg-lm-content/50 transition-colors group"
                                                >
                                                    <td className="py-4 px-6 text-[12px] font-bold text-gray-400 border-r border-[#EEEEEE]">
                                                        {String(idx + 1).padStart(2, '0')}.
                                                    </td>
                                                    <td className="py-4 px-6 border-r border-[#EEEEEE]">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-white border border-[#EEEEEE] shadow-sm flex items-center justify-center shrink-0">
                                                                {p.title.includes('Design') || p.title.includes('UI') ? <LayoutTemplate className="w-4 h-4 text-lm-black" /> : <Code className="w-4 h-4 text-lm-black" />}
                                                            </div>
                                                            <div>
                                                                <div className="text-[13px] font-black text-lm-black flex items-center gap-2">
                                                                    {p.title}
                                                                    {p.isFeatured && <span className="px-1.5 py-0.5 bg-lm-yellow text-[9px] font-bold text-lm-black rounded uppercase tracking-wider">Featured</span>}
                                                                </div>
                                                                <div className="text-[11px] font-medium text-gray-400 line-clamp-1 mt-0.5 max-w-[200px]">{p.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 border-r border-[#EEEEEE]">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {p.tags.map(t => (
                                                                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F4F4F4] text-lm-black border border-[#E8E8E8]">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 border-r border-[#EEEEEE]">
                                                        <div className="text-[12px] font-bold text-gray-500">{p.date}</div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-lm-black text-[11px] font-bold rounded-lg border border-lm-border hover:border-lm-black hover:bg-gray-50 transition-colors shadow-sm">
                                                                <ExternalLink className="w-3.5 h-3.5" /> View Live
                                                            </button>
                                                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-lm-black text-[11px] font-bold rounded-lg border border-lm-border hover:border-lm-black hover:bg-gray-50 transition-colors shadow-sm">
                                                                <Code className="w-3.5 h-3.5" /> Source
                                                            </button>
                                                            <button className="w-8 h-8 flex items-center justify-center bg-white border border-lm-border rounded-lg text-gray-400 hover:text-lm-black hover:border-gray-300 transition-colors shadow-sm shrink-0">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                        {filteredProjects.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center text-gray-500 text-sm font-medium">
                                                    No portfolio projects match your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-6 bg-[#FAFAFA] min-h-[400px]">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <AnimatePresence>
                                        {filteredTemplates.map((t, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.1 }}
                                                key={t.id}
                                                className="bg-white rounded-[16px] border border-[#EEEEEE] overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all flex flex-col"
                                            >
                                                <div className="h-[160px] relative overflow-hidden bg-gray-100 border-b border-[#EEEEEE]">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 backdrop-blur-[2px]">
                                                        <button className="w-10 h-10 rounded-full bg-white text-lm-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg" title="Live Preview">
                                                            <MonitorPlay className="w-5 h-5 ml-0.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <h3 className="text-[15px] font-black text-lm-black mb-1.5">{t.title}</h3>
                                                    <p className="text-[12px] font-medium text-gray-500 mb-4 line-clamp-2">{t.description}</p>
                                                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                                                        {t.stack.map(s => (
                                                            <span key={s} className="px-2 py-1 rounded-md text-[10px] font-bold bg-[#F4F4F4] text-lm-black border border-[#E8E8E8]">
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <button className="w-full py-2.5 bg-lm-black text-white rounded-xl text-[12px] font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                                        <Download className="w-4 h-4" /> Use Template
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {filteredTemplates.length === 0 && (
                                    <div className="py-16 text-center text-gray-500 text-sm font-medium flex flex-col items-center justify-center">
                                        <LayoutTemplate className="w-12 h-12 text-gray-300 mb-3" />
                                        No templates match your search.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
