"use client"

import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

const dummyJobs = [
    {
        title: "Senior Frontend Engineer",
        company: "Vercel",
        location: "Remote",
        salary: "$160k - $220k",
        match: 94,
        tags: ["React", "Next.js", "TypeScript"],
        logoColor: "bg-black"
    },
    {
        title: "Product Designer",
        company: "Linear",
        location: "San Francisco",
        salary: "$140k - $190k",
        match: 88,
        tags: ["Figma", "UI/UX", "Prototyping"],
        logoColor: "bg-purple-600"
    },
    {
        title: "Full Stack Developer",
        company: "Supabase",
        location: "Remote",
        salary: "$150k - $210k",
        match: 72,
        tags: ["PostgreSQL", "React", "Node.js"],
        logoColor: "bg-green-600"
    },
    {
        title: "Growth Engineer",
        company: "PostHog",
        location: "London / Remote",
        salary: "$130k - $180k",
        match: 65,
        tags: ["Python", "Analytics", "React"],
        logoColor: "bg-orange-500"
    }
]

export function JobFeed() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black uppercase mb-2">Your Feed</h1>
                    <p className="text-gray-500 font-bold">Based on your "Senior Developer" profile</p>
                </div>
                <Button variant="outline" className="border-2 border-black font-bold gap-2">
                    <SlidersHorizontal size={16} /> Filters
                </Button>
            </div>

            <div className="space-y-6">
                {dummyJobs.map((job, i) => (
                    <JobCard key={i} {...job} />
                ))}
            </div>
        </div>
    )
}
