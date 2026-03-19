import { useState } from "react"
import { motion } from "framer-motion"
import {
    Briefcase,
    CheckCircle2,
    XCircle,
    Clock,
    MoreHorizontal,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react"

function CompanyLogo({ company }: { company: string }) {
    const [error, setError] = useState(false);

    // Map company name to correct domain for Google Favicon API
    const domainMap: Record<string, string> = {
        google: "google.com",
        figma: "figma.com",
        meta: "meta.com",
        stripe: "stripe.com",
        vercel: "vercel.com",
        spotify: "spotify.com",
        netflix: "netflix.com",
        amazon: "amazon.com",
        microsoft: "microsoft.com",
        apple: "apple.com",
        uber: "uber.com",
        slack: "slack.com",
        github: "github.com",
        linkedin: "linkedin.com",
        openai: "openai.com",
        anthropic: "anthropic.com",
        notion: "notion.so",
        canva: "canva.com",
        dropbox: "dropbox.com",
        pinterest: "pinterest.com",
        ibm: "ibm.com",
        airbnb: "airbnb.com",
        snap: "snapchat.com",
        reddit: "reddit.com",
        zoom: "zoom.us",
        accenture: "accenture.com",
        databricks: "databricks.com",
        plaid: "plaid.com",
    };
    const key = company.toLowerCase().replace(/\s+/g, "");
    const domain = domainMap[key] ?? `${key}.com`;

    return (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-lm-border bg-white shrink-0 shadow-sm p-1.5 flex items-center justify-center">
            {!error ? (
                <img
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                    alt={company}
                    className="w-full h-full object-contain"
                    onError={() => setError(true)}
                />
            ) : (
                <span className="text-[14px] font-black text-gray-400">{company.charAt(0).toUpperCase()}</span>
            )}
        </div>
    );
}

export function ApplicationsTracker() {
    const [activeTab, setActiveTab] = useState("All")

    const applications = [
        { id: 1, company: "Google", location: "Bangalore", title: "Software Engineer", salary: "₹24L – ₹35L", date: "Oct 12, 2026", type: "Virtual", stage: "Applied", appliedDate: "Oct 1, 2026" },
        { id: 2, company: "Figma", location: "Remote", title: "UX/UI Designer", salary: "₹18L – ₹28L", date: "Oct 15, 2026", type: "Virtual", stage: "Next Step", appliedDate: "Oct 2, 2026" },
        { id: 3, company: "Meta", location: "Mumbai", title: "Frontend Developer", salary: "₹20L – ₹32L", date: "-", type: "-", stage: "Not Fit", appliedDate: "Sep 25, 2026" },
        { id: 4, company: "Stripe", location: "Bangalore", title: "Backend Engineer", salary: "₹22L – ₹38L", date: "Oct 18, 2026", type: "In Person", stage: "Applied", appliedDate: "Oct 5, 2026" },
        { id: 5, company: "Vercel", location: "Remote", title: "React Engineer", salary: "₹25L – ₹40L", date: "Oct 22, 2026", type: "Virtual", stage: "Next Step", appliedDate: "Oct 6, 2026" },
        { id: 6, company: "Spotify", location: "Pune", title: "Product Designer", salary: "₹16L – ₹24L", date: "-", type: "-", stage: "Not Fit", appliedDate: "Sep 20, 2026" },
        { id: 7, company: "Netflix", location: "Hyderabad", title: "Data Scientist", salary: "₹28L – ₹45L", date: "Oct 25, 2026", type: "Virtual", stage: "Applied", appliedDate: "Oct 10, 2026" },
    ]

    const stats = [
        { label: "Total Applications Applied", count: applications.length, icon: Briefcase, color: "text-lm-black", bg: "bg-[#FFF9DB]", border: "border-lm-yellow" },
        { label: "Active Applications", count: applications.filter(a => a.stage === 'Applied' || a.stage === 'Next Step').length, icon: CheckCircle2, color: "text-lm-black", bg: "bg-gray-50", border: "border-gray-200" },
        { label: "Not Fit Applications", count: applications.filter(a => a.stage === 'Not Fit').length, icon: XCircle, color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
        { label: "Closing Soon Applications", count: applications.filter(a => a.stage === 'Next Step').length, icon: Clock, color: "text-lm-black", bg: "bg-[#FFF9DB]", border: "border-lm-yellow" }
    ]

    const filteredApps = applications.filter(app => {
        if (activeTab === "All") return true;
        return app.stage === activeTab;
    });

    const getStageBadge = (stage: string) => {
        switch (stage) {
            case 'Applied': return "bg-[#FFF9DB] text-lm-black border-lm-yellow"
            case 'Next Step': return "bg-lm-black text-white border-lm-black"
            case 'Not Fit': return "bg-gray-100 text-gray-500 border-gray-200"
            default: return "bg-gray-50 text-gray-600 border-gray-200"
        }
    }

    return (
        <div className="flex-1 overflow-y-auto bg-lm-content p-6 sm:p-8 slim-scroll font-sans text-lm-black">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-6">

                {/* SECTION 1: 4 Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-5 border border-lm-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-black font-display tracking-tight leading-none text-lm-black">{stat.count}</span>
                                    <span className="text-[12px] font-bold text-lm-text-secondary uppercase tracking-wider">{stat.label}</span>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.border} border shrink-0`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} strokeWidth={2.5} />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* SECTION 2: Applied Jobs Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-lm-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden"
                >
                    {/* Table Header Row */}
                    <div className="p-5 border-b border-lm-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAFAFA]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-lm-yellow flex items-center justify-center border-2 border-white shadow-sm">
                                <Briefcase className="w-5 h-5 text-lm-black" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-[16px] font-black text-lm-black uppercase tracking-wider">Jobs You Have Applied</h2>
                                <p className="text-[12px] text-lm-text-secondary font-medium mt-0.5">Manage and track your active pipeline</p>
                            </div>
                            <div className="ml-2 px-2.5 py-1 bg-lm-black text-white text-[11px] font-bold rounded-full">
                                {filteredApps.length}
                            </div>
                        </div>

                        {/* Pill Tabs */}
                        <div className="flex p-1 bg-lm-content rounded-xl border border-lm-border shrink-0">
                            {["All", "Applied", "Not Fit", "Next Step"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 text-[12px] font-bold rounded-lg transition-all ${activeTab === tab
                                        ? "bg-white text-lm-black shadow-sm border border-lm-border"
                                        : "text-lm-text-secondary hover:text-lm-black bg-transparent border-transparent"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="border-b border-lm-border bg-white text-center">
                                    <th className="py-4 px-4 w-[40px] border border-lm-border align-middle">
                                        <input type="checkbox" className="w-4 h-4 rounded border-lm-border text-lm-yellow focus:ring-lm-yellow cursor-pointer" />
                                    </th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-left">Company</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Applied Date</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Job Title</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Salary Range</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Interview Date</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Type</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-lm-text-secondary uppercase tracking-wider border border-lm-border align-middle text-center">Stage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-lm-content/50 transition-colors group bg-white border-b border-lm-border">
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <input type="checkbox" className="w-4 h-4 rounded border-lm-border text-lm-yellow focus:ring-lm-yellow cursor-pointer inline-block align-middle" />
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-left">
                                            <div className="flex items-center gap-3">
                                                <CompanyLogo company={app.company} />
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-bold text-lm-black">{app.company}</span>
                                                    <span className="text-[11px] font-medium text-lm-text-secondary">{app.location}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <span className="text-[13px] font-semibold text-lm-black">{app.appliedDate}</span>
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <span className="text-[13px] font-bold text-lm-black">{app.title}</span>
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <div className="inline-flex items-center justify-center px-2 py-1 bg-lm-content border border-lm-border rounded pt-1.5 text-[11px] font-bold text-lm-text-secondary">
                                                {app.salary}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center text-[13px] font-semibold text-lm-black">
                                            {app.date}
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <span className="text-[12px] font-medium text-lm-text-secondary">{app.type}</span>
                                        </td>
                                        <td className="py-4 px-4 border border-lm-border align-middle text-center">
                                            <div className="flex justify-center items-center gap-3 relative inline-flex">
                                                <div className={`px-2.5 py-1 text-[11px] font-bold border rounded-full whitespace-nowrap ${getStageBadge(app.stage)}`}>
                                                    {app.stage}
                                                </div>
                                                <button className="p-1.5 text-lm-text-secondary hover:text-lm-black hover:bg-lm-border rounded-md transition-colors invisible group-hover:visible absolute -right-8">
                                                    <MoreHorizontal className="w-4 h-4" strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-lm-border bg-white flex items-center justify-between">
                        <span className="text-[12px] font-medium text-lm-text-secondary">Showing 1 to {filteredApps.length} of {filteredApps.length} entries</span>
                        <div className="flex gap-1">
                            <button className="p-1.5 border border-lm-border rounded-md text-lm-text-secondary hover:bg-lm-content disabled:opacity-50">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border border-lm-black bg-lm-black text-white rounded-md text-[12px] font-bold">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border border-lm-border hover:bg-lm-content rounded-md text-[12px] font-medium text-lm-text-secondary">
                                2
                            </button>
                            <button className="p-1.5 border border-lm-border rounded-md text-lm-text-secondary hover:bg-lm-content disabled:opacity-50">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
