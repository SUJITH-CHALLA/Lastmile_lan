"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Building, Sparkles } from "lucide-react"

interface JobCardProps {
    title: string
    company: string
    location: string
    salary: string
    match: number
    tags: string[]
    logoColor?: string
}

export function JobCard({ title, company, location, salary, match, tags, logoColor = "bg-black" }: JobCardProps) {
    return (
        <Card className="flex flex-col md:flex-row gap-6 p-6 border-2 border-black shadow-neo hover:shadow-neo-lg transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
            {/* Logo */}
            <div className={`w-16 h-16 ${logoColor} border-2 border-black shrink-0 flex items-center justify-center text-white font-black text-xl`}>
                {company[0]}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-black uppercase">{title}</h3>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-600 mt-1">
                            <span className="flex items-center gap-1"><Building size={14} /> {company}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
                            <span className="flex items-center gap-1"><DollarSign size={14} /> {salary}</span>
                        </div>
                    </div>
                    {/* Match Score */}
                    <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-black text-sm ${match >= 90 ? "bg-primary" : match >= 70 ? "bg-yellow-200" : "bg-gray-200"}`}>
                            {match}%
                        </div>
                        <span className="text-[10px] uppercase font-bold mt-1">Match</span>
                    </div>
                </div>

                <div className="flex gap-2 my-4 flex-wrap">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="border-black">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex gap-4 mt-auto">
                    <Button className="flex-1 border-2 border-black shadow-neo active:shadow-none font-bold">Apply Now</Button>
                    <Button variant="outline" className="flex-1 border-2 border-black shadow-neo active:shadow-none font-bold flex items-center justify-center gap-2">
                        Ask AI-E
                        <Sparkles className="w-4 h-4 fill-black text-black" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
