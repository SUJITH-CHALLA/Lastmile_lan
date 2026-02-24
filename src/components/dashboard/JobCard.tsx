"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Building, Sparkles, Bookmark, Clock, Zap, CheckCircle2 } from "lucide-react"

interface JobCardProps {
    title: string
    company: string
    location: string
    salary: string
    match: number
    tags: string[]
    logoColor?: string
    posted?: string
    applyType?: string
    insight?: string
    missingSkills?: string
}

export function JobCard({ title, company, location, salary, match, tags, logoColor = "bg-black", posted = "Just now", applyType = "Easy Apply", insight = "Good match for your profile.", missingSkills = "None" }: JobCardProps) {
    const [toast, setToast] = useState<string | null>(null)

    const showToast = (msg: string) => {
        setToast(msg)
        setTimeout(() => setToast(null), 3000)
    }

    return (
        <div className="relative">
            <Card className="flex flex-col md:flex-row gap-4 md:gap-6 p-6 border-2 border-black shadow-neo hover:shadow-neo-lg transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] bg-white group">
                {/* Logo */}
                <div className={`w-14 h-14 md:w-16 md:h-16 ${logoColor} border-2 border-black shrink-0 flex items-center justify-center text-white font-black text-2xl`}>
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${company}&backgroundColor=transparent`} alt={company} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-4 md:gap-0">
                        <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-xl font-black uppercase truncate">{title}</h3>
                                {applyType && (
                                    <Badge variant="outline" className="border-black bg-blue-50 text-blue-700 font-bold uppercase text-[10px] whitespace-nowrap">
                                        {applyType}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-600 flex-wrap">
                                <span className="flex items-center gap-1"><Building size={14} /> {company}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
                                <span className="flex items-center gap-1"><DollarSign size={14} /> {salary}</span>
                                <span className="flex items-center gap-1 text-gray-400"><Clock size={14} /> {posted}</span>
                            </div>
                        </div>

                        {/* Actions & Match Score */}
                        <div className="flex items-center gap-3 self-end md:self-auto">
                            <Button variant="ghost" size="icon" className="border-2 border-black bg-white hover:bg-yellow-200">
                                <Bookmark className="text-black" size={20} />
                            </Button>

                            <div className="relative group/score flex flex-col items-center cursor-help">
                                <div className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-black text-sm ${match >= 90 ? "bg-primary" : match >= 70 ? "bg-yellow-200" : "bg-gray-200"}`}>
                                    {match}%
                                </div>
                                <span className="text-[10px] uppercase font-bold mt-1">Match</span>

                                {/* Match Breakout Tooltip */}
                                <div className="absolute top-14 right-0 w-48 bg-black text-white p-3 border-2 border-black shadow-neo pointer-events-none opacity-0 group-hover/score:opacity-100 transition-opacity z-10 text-xs">
                                    <p className="font-bold mb-1">Match Breakdown:</p>
                                    <p className="text-gray-300">You match 8/9 required skills.</p>
                                    <p className="text-red-400 mt-1 font-bold">Missing: {missingSkills}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 my-4 flex-wrap">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="border-2 border-black bg-gray-100 font-bold hover:bg-gray-200">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="bg-yellow-50 border-2 border-black p-3 mb-4 text-sm font-medium flex gap-2 items-start">
                        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5 fill-black" />
                        <p className="text-gray-800"><span className="font-bold text-black uppercase text-xs mr-1 bg-primary px-1 border border-black">Why this job?</span> {insight}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <Button onClick={() => showToast(`Application sent to ${company}! AI-E is filling the form…`)} className="flex-1 border-2 border-black shadow-neo active:shadow-none font-black uppercase text-black bg-green-400 hover:bg-green-500 gap-2">
                            <Zap size={18} className="fill-black" /> One-Click Apply
                        </Button>
                        <Button onClick={() => showToast(`AI-E is analyzing the ${title} role at ${company}…`)} variant="outline" className="flex-1 border-2 border-black shadow-neo active:shadow-none font-bold flex items-center justify-center gap-2 hover:bg-gray-100">
                            Ask AI-E
                            <Sparkles className="w-4 h-4 fill-black text-black" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Toast */}
            {toast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 border-2 border-black shadow-neo-lg font-bold text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 whitespace-nowrap">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    {toast}
                </div>
            )}
        </div>
    )
}
