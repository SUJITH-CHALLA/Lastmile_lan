"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Building, MapPin, Calendar, ExternalLink, Filter, Bell, Plus, MoreHorizontal, ChevronDown } from "lucide-react"

export default function ApplicationsPage() {
    // Kanban data structure
    const columns = [
        { id: "saved", title: "Saved", count: 2 },
        { id: "applied", title: "Applied", count: 12 },
        { id: "viewed", title: "Viewed", count: 3 },
        { id: "interview", title: "Interview", count: 1 },
        { id: "offer", title: "Offer", count: 0 },
        { id: "rejected", title: "Rejected", count: 4 },
    ]

    const applications = [
        { id: 1, company: "Swiggy", role: "SDE II", status: "applied", date: "Feb 18", portal: "LinkedIn", nextAction: "Wait 1 week", logoColor: "bg-orange-500 text-white" },
        { id: 2, company: "CRED", role: "Senior Frontend", status: "viewed", date: "Feb 15", portal: "Naukri", nextAction: "Follow up tomorrow", logoColor: "bg-black text-white" },
        { id: 3, company: "Zepto", role: "Full Stack Dev", status: "interview", date: "Feb 10", portal: "Direct", nextAction: "Prep System Design", logoColor: "bg-purple-600 text-white" },
        { id: 4, company: "Razorpay", role: "UI Engineer", status: "saved", date: "Feb 20", portal: "Foundit", nextAction: "Tailor Resume", logoColor: "bg-blue-600 text-white" },
    ]

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto pb-12 h-[calc(100vh-2rem)] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-2 border-black p-6 shadow-neo gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-black uppercase mb-1">Applications</h1>
                    <p className="text-gray-600 font-bold">Track your job search progress across all portals.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-yellow-100 border-2 border-black px-4 py-2 font-bold text-sm flex flex-col items-center shadow-neo">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500">This Week</span>
                        <span>12 Applied · 3 Viewed · 1 Interview</span>
                    </div>
                    <Button variant="outline" className="border-2 border-black font-bold gap-2 bg-white shadow-neo active:shadow-none hover:bg-gray-50">
                        <Filter size={16} /> Filter: All Portals <ChevronDown size={16} />
                    </Button>
                </div>
            </div>

            {/* Kanban Board Container */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden border-2 border-black bg-gray-50 p-6 flex gap-6 shadow-inset">
                {columns.map(col => (
                    <div key={col.id} className="w-80 shrink-0 flex flex-col h-full">
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="font-black uppercase text-lg">{col.title}</h2>
                            <span className="bg-gray-200 text-black px-2 py-0.5 rounded-full text-xs font-bold border border-black">
                                {col.count}
                            </span>
                        </div>

                        {/* Column Drop Zone (Scrollable) */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
                            {applications.filter(app => app.status === col.id).map(app => (
                                <Card key={app.id} className="border-2 border-black bg-white p-4 shadow-neo hover:shadow-neo-lg transition-all cursor-grab active:cursor-grabbing group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded border-2 border-black flex items-center justify-center overflow-hidden shrink-0 ${app.logoColor}`}>
                                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.company}&backgroundColor=transparent`} alt={app.company} className="w-full h-full mix-blend-screen opacity-90" />
                                            </div>
                                            <div>
                                                <h3 className="font-black uppercase text-sm leading-tight">{app.company}</h3>
                                                <p className="text-xs font-bold text-gray-500">{app.role}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-black">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="outline" className="border-black text-[10px] font-bold uppercase bg-gray-50 rounded-none px-1">
                                            {app.portal}
                                        </Badge>
                                        <Badge variant="outline" className="border-black text-[10px] font-bold text-gray-500 rounded-none px-1">
                                            {app.date}
                                        </Badge>
                                    </div>

                                    <div className="border-t-2 border-black pt-3 flex items-center justify-between mt-auto">
                                        <div className="text-[10px] font-bold text-gray-600 truncate max-w-[130px]" title={app.nextAction}>
                                            <span className="text-primary uppercase mr-1">Next:</span>{app.nextAction}
                                        </div>
                                        <Button size="icon" className="h-6 w-6 border-2 border-black bg-yellow-300 hover:bg-yellow-400 text-black shrink-0" title="Set Follow-up Reminder">
                                            <Bell size={12} className="fill-black/20" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}

                            {/* Empty state or Add Button config */}
                            {col.id === "saved" && (
                                <button className="w-full border-2 border-dashed border-gray-400 p-3 flex items-center justify-center gap-2 text-gray-500 font-bold text-sm hover:border-black hover:text-black hover:bg-gray-100 transition-colors">
                                    <Plus size={16} /> Add Manual Entry
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
