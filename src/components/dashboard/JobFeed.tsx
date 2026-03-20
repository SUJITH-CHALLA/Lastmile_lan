"use client"

import { useState, useEffect } from "react"
import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, ChevronDown } from "lucide-react"

const dummyJobs = [
    {
        title: "Senior React Developer",
        company: "CRED",
        location: "Bangalore / Hybrid",
        salary: "₹35L - ₹45L",
        match: 94,
        tags: ["React", "Next.js", "TypeScript"],
        logoColor: "bg-black",
        posted: "2 days ago",
        applyType: "Easy Apply",
        insight: "Matches your Next.js experience and your preference for high-growth tech companies.",
        missingSkills: "GraphQL"
    },
    {
        title: "Frontend Engineer (SDE II)",
        company: "Swiggy",
        location: "Bangalore",
        salary: "₹25L - ₹38L",
        match: 88,
        tags: ["JavaScript", "UI/UX", "Redux"],
        logoColor: "bg-orange-500",
        posted: "5 hours ago",
        applyType: "External Apply",
        insight: "Strong match for your 3+ years in scalable frontend architecture.",
        missingSkills: "WebSockets"
    },
    {
        title: "SDE 3 - Full Stack",
        company: "Zepto",
        location: "Mumbai",
        salary: "₹40L - ₹55L",
        match: 82,
        tags: ["PostgreSQL", "React", "Node.js"],
        logoColor: "bg-purple-600",
        posted: "1 day ago",
        applyType: "Easy Apply",
        insight: "Good fit for your full-stack capability, though slightly stretches years of experience.",
        missingSkills: "Redis"
    },
    {
        title: "UI Engineer",
        company: "Razorpay",
        location: "Remote",
        salary: "₹20L - ₹30L",
        match: 76,
        tags: ["CSS", "React", "Tailwind"],
        logoColor: "bg-blue-600",
        posted: "3 days ago",
        applyType: "Easy Apply",
        insight: "Perfect match for your Tailwind CSS and React skills. High chance of interview.",
        missingSkills: "Jest"
    }
]

export function JobFeed() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase mb-2">Your Feed</h1>
                    <p className="text-gray-500 font-bold">
                        Based on your "Senior Developer" profile · <a href="/dashboard/profile" className="text-black underline hover:text-primary transition-colors">Edit Profile</a>
                    </p>
                </div>
                <Button variant="outline" className="border-2 border-black font-bold gap-2">
                    <SlidersHorizontal size={16} /> Filters
                    <span className="bg-black text-white px-2 py-0.5 rounded-full text-xs">2</span>
                    <ChevronDown size={16} />
                </Button>
            </div>

            <hr className="border-t-2 border-black" />

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white border-2 border-black p-4 shadow-neo flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-black">4</span>
                    <span className="text-xs font-bold uppercase text-gray-500 mt-1">Jobs Matched</span>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-neo flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-black">0</span>
                    <span className="text-xs font-bold uppercase text-gray-500 mt-1">Applications Sent</span>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-neo flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-primary">72%</span>
                    <span className="text-xs font-bold uppercase text-gray-500 mt-1">Profile Strength</span>
                </div>
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-12 h-12 border-4 border-black border-t-primary rounded-full animate-spin"></div>
                        <p className="font-bold uppercase text-sm text-gray-500 tracking-widest motion-safe:animate-pulse">Curating matches...</p>
                    </div>
                ) : (
                    dummyJobs.map((job, i) => (
                        <JobCard
                            key={i}
                            job={{
                                id: String(i),
                                title: job.title,
                                company: job.company,
                                logo: "",
                                logoBg: job.logoColor ?? "#ffffff",
                                match: job.match,
                                salary: job.salary,
                                tags: job.tags,
                                time: job.posted,
                            }}
                            onClick={() => { }}
                        />

                    ))
                )}
            </div>
        </div>
    )
}
