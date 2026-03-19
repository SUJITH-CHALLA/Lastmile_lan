"use client"

import { useState } from "react"
import { Bookmark, Clock, CheckCircle2, XCircle, MoreVertical, Calendar, Briefcase, TrendingUp, Activity, Sparkles, ChevronDown, ListFilter, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export type TableAppItem = {
    id: string;
    serial: number;
    role: string;
    company: string;
    logo: string;
    logoBg: string;
    date: string;
    status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Rejected";
    isAutoSync: boolean;
}

const initialApps: TableAppItem[] = [
    { id: "1", serial: 1, role: "React Engineer", company: "Meta", logo: "M", logoBg: "#111111", date: "Oct 24", status: "Applied", isAutoSync: true },
    { id: "2", serial: 2, role: "Fullstack Developer", company: "Stripe", logo: "St", logoBg: "#0a0a0a", date: "Oct 22", status: "Interviewing", isAutoSync: true },
    { id: "3", serial: 3, role: "Product Designer", company: "Linear", logo: "L", logoBg: "#0a0a0a", date: "Oct 20", status: "Applied", isAutoSync: false },
    { id: "4", serial: 4, role: "UX Researcher", company: "Notion", logo: "N", logoBg: "#000000", date: "Oct 18", status: "Offer", isAutoSync: true },
    { id: "5", serial: 5, role: "Frontend UI Developer", company: "Spotify", logo: "S", logoBg: "#0a0a0a", date: "Oct 15", status: "Rejected", isAutoSync: true },
    { id: "6", serial: 6, role: "Junior Architect", company: "Airbnb", logo: "A", logoBg: "#333333", date: "Oct 12", status: "Saved", isAutoSync: false },
]

export function KanbanTracker() {
    const [apps, setApps] = useState<TableAppItem[]>(initialApps)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const handleStatusChange = (id: string, newStatus: any) => {
        setApps(apps.map(a => a.id === id ? { ...a, status: newStatus } : a))
    }

    // Dynamic data bound to Kanban columns state
    const savedCount = apps.filter(a => a.status === 'Saved').length;
    const appliedCount = apps.filter(a => a.status === 'Applied').length;
    const interviewCount = apps.filter(a => a.status === 'Interviewing').length;
    const offerCount = apps.filter(a => a.status === 'Offer').length;
    const rejectedCount = apps.filter(a => a.status === 'Rejected').length;

    const funnelData = [
        { name: 'Sent', count: appliedCount + interviewCount + offerCount + rejectedCount, fill: '#E8E9EC' },
        { name: 'Reviewed', count: interviewCount + offerCount + rejectedCount, fill: '#999999' },
        { name: 'Interview', count: interviewCount + offerCount, fill: '#F5C300' },
        { name: 'Offers', count: offerCount, fill: '#0a0a0a' }
    ];

    const pieData = [
        { name: 'Active', value: interviewCount + offerCount, color: '#F5C300' },
        { name: 'Stalled', value: appliedCount, color: '#0a0a0a' },
        { name: 'Rejected', value: rejectedCount, color: '#E8E9EC' }
    ];

    return (
        <div className="flex-1 w-full flex flex-col pt-5 px-6 pb-6 overflow-y-auto overflow-x-hidden slim-scroll bg-[#F8F9FA]">

            {/* Tracker Dashboard Header & Analytics Row */}
            <div className="mb-6 flex flex-col gap-5 shrink-0 w-full max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-black font-display uppercase tracking-widest text-lm-black">Applications Dashboard</h1>
                        <p className="text-xs text-lm-text-secondary font-medium mt-0.5">Manage your applications list. Tied directly to your Email Auto-Scraper.</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-lm-black text-white text-xs font-bold shadow-[0_4px_12px_rgba(10,10,10,0.15)] hover:scale-[1.02] flex items-center gap-2 transition-transform">
                        <Briefcase className="w-3.5 h-3.5" />
                        Add Manual Record
                    </button>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[160px]">

                    {/* KPI Mini Cards Container */}
                    <div className="flex flex-col gap-3">
                        <div className="flex-1 bg-white border border-lm-border rounded-[14px] p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-lm-text-secondary uppercase mb-1">Interviews Next 7 Days</p>
                                <p className="text-2xl font-black text-lm-black">3</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-lm-yellow-light flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-lm-yellow" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex-1 bg-white border border-lm-border rounded-[14px] p-4 flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-lm-text-secondary uppercase mb-1">Response Rate</p>
                                <p className="text-2xl font-black text-lm-black">16<span className="text-sm text-lm-text-secondary font-semibold">%</span></p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                                <Activity className="w-4 h-4 text-lm-text-primary" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Funnel Chart */}
                    <div className="bg-white border border-lm-border rounded-[14px] p-4 shadow-sm flex flex-col">
                        <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp className="w-3.5 h-3.5 text-lm-text-secondary" />
                            <h3 className="text-[11px] font-bold text-lm-black tracking-wide uppercase">The Hiring Funnel</h3>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666', fontWeight: 600 }} />
                                    <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '8px', border: '1px solid #E8E9EC', fontSize: '11px', fontWeight: 'bold' }} />
                                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
                                        {funnelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Velocity Pie Chart */}
                    <div className="bg-white border border-lm-border rounded-[14px] p-4 shadow-sm flex flex-col">
                        <div className="flex items-center gap-1.5 mb-0">
                            <Activity className="w-3.5 h-3.5 text-lm-text-secondary" />
                            <h3 className="text-[11px] font-bold text-lm-black tracking-wide uppercase">Pipeline Velocity</h3>
                        </div>
                        <div className="flex-1 w-full min-h-0 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={32}
                                        outerRadius={46}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E8E9EC', fontSize: '11px', fontWeight: 'bold' }} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Custom Legend inside the card */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                                {pieData.map((d, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                                        <span className="text-[10px] font-bold text-lm-text-secondary">{d.name} <span className="text-lm-black ml-1">({d.value})</span></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Excel-Flow Main Table */}
            <div className="w-full max-w-[1400px] mx-auto mt-6 bg-white border border-lm-border rounded-[14px] shadow-sm flex flex-col overflow-hidden">
                {/* Table Header Controls */}
                <div className="p-4 border-b border-lm-border flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[13px] font-bold text-lm-black uppercase tracking-wide">Application List</h2>
                        <span className="px-2 py-0.5 rounded-full bg-lm-content text-lm-text-secondary text-[10px] font-bold">{apps.length} Total</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-[7px] bg-lm-content border border-lm-border rounded-lg px-3 py-1.5 focus-within:border-lm-black transition-colors min-w-[200px]">
                            <Search className="w-3.5 h-3.5 text-lm-text-muted shrink-0" strokeWidth={2} />
                            <input
                                type="text"
                                placeholder="Search role or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-none bg-transparent text-xs font-sans outline-none w-full text-lm-text-primary placeholder:text-lm-text-muted"
                            />
                        </div>
                        <div className="relative inline-flex">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex items-center gap-2 px-3 py-1.5 pl-8 border border-lm-border rounded-lg text-xs font-medium text-lm-text-primary bg-white hover:bg-lm-content cursor-pointer transition-colors outline-none focus:border-lm-black appearance-none"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Saved">Saved</option>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            <div className="pointer-events-none flex items-center absolute inset-y-0 left-3 text-lm-text-muted">
                                <ListFilter className="w-3.5 h-3.5" />
                            </div>
                            <div className="pointer-events-none flex items-center absolute inset-y-0 right-2 text-lm-text-muted">
                                <ChevronDown className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Table View */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-lm-border bg-[#F8F9FA]">
                                <th className="py-2.5 px-5 text-[10px] font-black uppercase tracking-wider text-lm-text-secondary w-16 text-center border-r border-lm-border">S.No</th>
                                <th className="py-2.5 px-5 text-[10px] font-black uppercase tracking-wider text-lm-text-secondary">Role & Company</th>
                                <th className="py-2.5 px-5 text-[10px] font-black uppercase tracking-wider text-lm-text-secondary w-[120px]">Date Applied</th>
                                <th className="py-2.5 px-5 text-[10px] font-black uppercase tracking-wider text-lm-text-secondary w-[180px]">Current Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apps
                                .filter(app => {
                                    const matchesSearch = app.role.toLowerCase().includes(searchTerm.toLowerCase()) || app.company.toLowerCase().includes(searchTerm.toLowerCase());
                                    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
                                    return matchesSearch && matchesStatus;
                                })
                                .map((app) => (
                                    <tr key={app.id} className="border-b border-lm-border hover:bg-[#F8F9FA] transition-colors group">
                                        <td className="py-2.5 px-5 text-center border-r border-lm-border">
                                            <span className="text-[11px] font-bold text-lm-text-muted">#{app.serial.toString().padStart(2, '0')}</span>
                                        </td>

                                        <td className="py-2.5 px-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-inner"
                                                    style={{ backgroundColor: app.logoBg }}
                                                >
                                                    {app.logo}
                                                </div>
                                                <div>
                                                    <h3 className="text-[12.5px] font-bold text-lm-black leading-tight">{app.role}</h3>
                                                    <p className="text-[11px] font-medium text-lm-text-secondary mt-0.5">{app.company}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-2.5 px-5">
                                            <div className="text-[12px] font-semibold text-lm-black">{app.date}</div>
                                        </td>

                                        <td className="py-2.5 px-5">
                                            <div className="relative inline-block w-full">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                    className={`appearance-none w-full border rounded-lg py-1.5 pl-3 pr-8 text-[11px] font-bold cursor-pointer focus:outline-none transition-all
                                                  ${app.status === 'Offer' ? 'bg-[#111] text-white border-[#111]' :
                                                            app.status === 'Interviewing' ? 'bg-lm-yellow-light border-[#ecd26b] text-lm-black' :
                                                                app.status === 'Rejected' ? 'bg-lm-content border-[#ccc] text-lm-text-secondary line-through opacity-70' :
                                                                    'bg-white border-[#ccc] text-lm-black hover:border-lm-black focus:border-lm-black'}
                                                `}
                                                >
                                                    <option value="Saved">Saved</option>
                                                    <option value="Applied">Applied</option>
                                                    <option value="Interviewing">Interviewing</option>
                                                    <option value="Offer">Offer</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                                <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${app.status === 'Offer' ? 'text-white' : 'text-lm-black'}`}>
                                                    <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {apps.length === 0 && (
                    <div className="p-10 flex flex-col items-center justify-center text-center">
                        <Activity className="w-10 h-10 text-lm-text-muted mb-3 opacity-40" />
                        <h3 className="text-[13px] font-bold text-lm-black">No Applications Yet</h3>
                        <p className="text-[11px] text-lm-text-secondary mt-1 max-w-[250px]">Your email scraper hasn't detected any applications yet. Add one manually to get started.</p>
                    </div>
                )}
            </div>

            <div className="h-10 shrink-0"></div>

        </div>
    )
}
