"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar, ExternalLink } from "lucide-react"

export default function ApplicationsPage() {
    const applications = [
        { company: "Vercel", role: "Senior Frontend Engineer", status: "Interviewing", date: "Feb 18, 2026", location: "Remote" },
        { company: "Linear", role: "Product Designer", status: "Applied", date: "Feb 15, 2026", location: "San Francisco" },
        { company: "Supabase", role: "Full Stack Developer", status: "Rejected", date: "Feb 10, 2026", location: "Remote" },
        { company: "PostHog", role: "Growth Engineer", status: "Offer", date: "Feb 08, 2026", location: "London" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Interviewing": return "bg-blue-200 hover:bg-blue-300"
            case "Offer": return "bg-green-200 hover:bg-green-300"
            case "Rejected": return "bg-red-200 hover:bg-red-300"
            default: return "bg-gray-200 hover:bg-gray-300"
        }
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-white border-2 border-black p-6 shadow-neo">
                <div>
                    <h1 className="text-3xl font-black uppercase mb-1">Applications</h1>
                    <p className="text-gray-600 font-bold">Track your job search progress.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-black text-white px-3 py-1 font-bold text-sm flex items-center">
                        Total: {applications.length}
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 font-bold text-sm flex items-center">
                        Active: 3
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 border-black shadow-neo overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-black">
                            <th className="p-4 font-black uppercase border-r-2 border-black">Company</th>
                            <th className="p-4 font-black uppercase border-r-2 border-black">Role</th>
                            <th className="p-4 font-black uppercase border-r-2 border-black">Status</th>
                            <th className="p-4 font-black uppercase border-r-2 border-black hidden md:table-cell">Date</th>
                            <th className="p-4 font-black uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, i) => (
                            <tr key={i} className="border-b-2 border-black last:border-b-0 hover:bg-yellow-50 transition-colors">
                                <td className="p-4 border-r-2 border-black font-bold">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded-none">
                                            {app.company[0]}
                                        </div>
                                        {app.company}
                                    </div>
                                </td>
                                <td className="p-4 border-r-2 border-black font-medium">{app.role}</td>
                                <td className="p-4 border-r-2 border-black">
                                    <Badge className={`text-black border-2 border-black rounded-none ${getStatusColor(app.status)}`}>
                                        {app.status}
                                    </Badge>
                                </td>
                                <td className="p-4 border-r-2 border-black text-gray-600 font-bold hidden md:table-cell">
                                    {app.date}
                                </td>
                                <td className="p-4">
                                    <Button size="sm" variant="ghost" className="hover:bg-black hover:text-white font-bold border-2 border-transparent hover:border-black">
                                        View <ExternalLink size={14} className="ml-1" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
