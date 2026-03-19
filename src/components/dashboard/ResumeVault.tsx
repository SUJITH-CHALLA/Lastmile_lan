import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Info,
    Search,
    FileText,
    FileSignature,
    Download,
    Eye,
    X,
    CheckCircle2,
    Clock,
    XCircle,
    Briefcase
} from "lucide-react"

type JobApp = {
    id: number;
    company: string;
    title: string;
    status: "Active" | "Expiring" | "Expired";
    daysLeft: number | null;
    appliedDate: string;
    location: string;
}

const dummyApps: JobApp[] = [
    { id: 1, company: "Google", title: "Frontend Engineer", status: "Active", daysLeft: null, appliedDate: "Mar 2, 2026", location: "Bangalore · Full Time" },
    { id: 2, company: "Meta", title: "React Developer", status: "Active", daysLeft: null, appliedDate: "Mar 5, 2026", location: "Remote · Full Time" },
    { id: 3, company: "Stripe", title: "Full Stack Engineer", status: "Expiring", daysLeft: 3, appliedDate: "Feb 28, 2026", location: "Mumbai · Hybrid" },
    { id: 4, company: "Netflix", title: "UI Engineer", status: "Expiring", daysLeft: 1, appliedDate: "Feb 25, 2026", location: "Remote · Contract" },
    { id: 5, company: "Shopify", title: "Software Engineer", status: "Expired", daysLeft: 0, appliedDate: "Feb 10, 2026", location: "Pune · Full Time" },
    { id: 6, company: "Amazon", title: "Cloud Developer", status: "Expiring", daysLeft: 5, appliedDate: "Mar 1, 2026", location: "Hyderabad · Onsite" },
]

export function ResumeVault() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState("All")
    const [sortOrder, setSortOrder] = useState("Newest")
    const [previewDoc, setPreviewDoc] = useState<{ app: JobApp, type: "Resume" | "Cover Letter" } | null>(null)

    // Derived states
    const filteredApps = dummyApps.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.title.toLowerCase().includes(searchTerm.toLowerCase())

        let matchesFilter = true
        if (activeFilter === "Active") matchesFilter = app.status === "Active"
        if (activeFilter === "Expiring Soon") matchesFilter = app.status === "Expiring" && (app.daysLeft !== null && app.daysLeft <= 3)
        if (activeFilter === "Expired") matchesFilter = app.status === "Expired"

        return matchesSearch && matchesFilter
    }).sort((a, b) => {
        if (sortOrder === "Expiring First") {
            const daysA = a.daysLeft === null ? 999 : a.daysLeft
            const daysB = b.daysLeft === null ? 999 : b.daysLeft
            return daysA - daysB
        }
        // Basic newest/oldest dummy sorting using ID
        return sortOrder === "Newest" ? a.id - b.id : b.id - a.id
    })

    const totalStored = dummyApps.filter(a => a.status !== "Expired").length * 2

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
                            <div className="w-10 h-10 rounded-lg bg-lm-yellow flex items-center justify-center border-2 border-white shadow-sm">
                                <FileText className="w-5 h-5 text-lm-black" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-[16px] font-black text-lm-black uppercase tracking-wider">Your Document Vault</h2>
                                <p className="text-[12px] text-lm-text-secondary font-medium mt-0.5">AI-generated resumes & cover letters</p>
                            </div>
                            <div className="ml-2 px-2.5 py-1 bg-lm-black text-white text-[11px] font-bold rounded-full">
                                {totalStored}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 items-center w-full lg:w-auto">
                            <div className="flex items-center w-full sm:w-[260px] bg-white rounded-xl px-3 py-1.5 border border-lm-border focus-within:border-lm-black transition-colors relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    className="bg-transparent border-none outline-none text-[12px] w-full pl-7 text-lm-black placeholder:text-gray-400 font-medium h-6"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto p-1 bg-lm-content rounded-xl border border-lm-border">
                                {["All", "Active", "Expiring Soon", "Expired"].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f)}
                                        className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${activeFilter === f
                                            ? "bg-white text-lm-black shadow-sm border border-lm-border"
                                            : "text-lm-text-secondary hover:text-lm-black bg-transparent border-transparent"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            <div className="w-full sm:w-[130px] relative">
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full appearance-none bg-white border border-lm-border text-lm-black text-[11px] font-bold py-1.5 px-3 rounded-xl focus:outline-none focus:border-lm-black cursor-pointer h-[32px]"
                                >
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                    <option>Expiring</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* LIST TABLE VIEW */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse">
                            <thead>
                                <tr className="border-b border-[#EEEEEE] bg-[#FAFAFA] text-center">
                                    <th className="py-4 px-4 w-[60px] border border-[#EEEEEE] align-middle text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">S.No</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border border-[#EEEEEE] align-middle text-left">Company</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border border-[#EEEEEE] align-middle text-center">Job Title</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border border-[#EEEEEE] align-middle text-center">Applied Date</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border border-[#EEEEEE] align-middle text-center">Delete Date</th>
                                    <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border border-[#EEEEEE] align-middle text-center">Documents</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map((app, idx) => {
                                    const isExpired = app.status === "Expired";
                                    return (
                                        <tr key={app.id} className={`hover:bg-gray-50/50 transition-colors group bg-white border-b border-[#EEEEEE] ${isExpired ? "opacity-60" : ""}`}>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-center">
                                                <span className="text-[12px] font-black text-gray-400">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#EEEEEE] bg-white shrink-0 shadow-sm p-1 flex items-center justify-center">
                                                        <img
                                                            src={`/clearbit-logos/${app.company.toLowerCase()}.png`}
                                                            alt={app.company}
                                                            className="w-full h-full object-contain rounded-md"
                                                            onError={(e) => {
                                                                const parent = (e.target as HTMLImageElement).parentElement;
                                                                if (parent) {
                                                                    parent.innerHTML = `<span class="text-[14px] font-black text-gray-400">${app.company.charAt(0)}</span>`;
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-bold text-lm-black">{app.company}</span>
                                                        <span className="text-[11px] font-medium text-gray-500">{app.location}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-center">
                                                <span className="text-[13px] font-bold text-lm-black">{app.title}</span>
                                            </td>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-center">
                                                <span className="text-[13px] font-semibold text-gray-600">{app.appliedDate}</span>
                                            </td>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-center">
                                                {isExpired ? (
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-full text-[11px] font-bold text-gray-500">
                                                        <XCircle className="w-3 h-3" /> Deleted
                                                    </div>
                                                ) : app.status === "Active" ? (
                                                    <span className="text-[13px] font-semibold text-gray-400">—</span>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF9DB] border border-lm-yellow rounded-full text-[11px] font-bold text-lm-black">
                                                        <Clock className="w-3 h-3" /> In {app.daysLeft} {app.daysLeft === 1 ? 'day' : 'days'}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 border border-[#EEEEEE] align-middle text-center">
                                                {isExpired ? (
                                                    <span className="text-[12px] font-medium text-red-500 italic">No files available</span>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => setPreviewDoc({ app, type: "Resume" })}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-lm-black hover:bg-gray-800 text-white rounded-md text-[11px] font-bold transition-colors"
                                                            title="Download Resume"
                                                        >
                                                            <FileText className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Resume</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setPreviewDoc({ app, type: "Cover Letter" })}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-lm-yellow hover:bg-[#e0b200] text-lm-black rounded-md text-[11px] font-bold transition-colors"
                                                            title="Download Cover Letter"
                                                        >
                                                            <FileSignature className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Letter</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>

            {/* PREVIEW MODAL */}
            <AnimatePresence>
                {previewDoc && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setPreviewDoc(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-[680px] h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-[#EEEEEE] bg-[#F8F9FA]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#EEEEEE] flex items-center justify-center p-1">
                                        <img src={`/clearbit-logos/${previewDoc.app.company.toLowerCase()}.png`} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-black text-lm-black">{previewDoc.app.company} • {previewDoc.type}</h2>
                                        <p className="text-[11px] font-medium text-gray-500">{previewDoc.app.title}</p>
                                    </div>
                                </div>
                                <button onClick={() => setPreviewDoc(null)} className="p-2 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 slim-scroll bg-white">
                                {previewDoc.type === "Resume" ? (
                                    <div className="max-w-[500px] mx-auto space-y-6 text-sm">
                                        <div className="text-center pb-4 border-b">
                                            <h1 className="text-2xl font-black text-black">John Doe</h1>
                                            <p className="text-gray-500 font-medium mt-1">Software Engineer • john@example.com</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black border-b pb-1 mb-2">Summary</h3>
                                            <p className="text-gray-600 leading-relaxed font-medium">Results-oriented Software Engineer with 5+ years of experience designing and implementing scalable applications. Passionate about AI-driven solutions and tailored tools for modern workflows.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black border-b pb-1 mb-2">Experience</h3>
                                            <div className="mb-4">
                                                <div className="flex justify-between font-bold text-black mb-1">
                                                    <span>Senior Developer at TechCrop</span>
                                                    <span className="text-gray-500 text-xs">2023 - Present</span>
                                                </div>
                                                <ul className="list-disc pl-5 text-gray-600 space-y-1 font-medium">
                                                    <li>Led a team of 4 to architect the new dashboard interface.</li>
                                                    <li>Reduced load times by 40% through lazy loading and caching optimizations.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black border-b pb-1 mb-2">Skills</h3>
                                            <p className="text-gray-600 font-medium">React, Next.js, Node.js, TypeScript, Tailwind CSS, System Design.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="max-w-[500px] mx-auto space-y-4 text-sm font-serif leading-relaxed text-gray-700">
                                        <p className="text-right text-gray-500 text-xs font-sans">{previewDoc.app.appliedDate}</p>
                                        <p>Dear Hiring Manager,</p>
                                        <p>I am writing to express my eager interest in the {previewDoc.app.title} position at {previewDoc.app.company}. With a robust background in building dynamic web applications and a keen eye for exceptional user experiences, I am confident in my ability to make an immediate impact on your team.</p>
                                        <p>In my recent roles, I have spearheaded the development of high-performance dashboards and modular UI components, bridging the gap between design and technical implementation. {previewDoc.app.company}'s mission resonates deeply with my professional ambition to craft software that elevates human potential.</p>
                                        <p>Thank you for considering my application. I look forward to the possibility of discussing how my technical background and creative problem-solving skills align with your goals.</p>
                                        <p className="pt-4">Sincerely,<br /><strong>John Doe</strong></p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-[#EEEEEE] bg-[#F8F9FA] flex justify-end gap-3 z-10">
                                <button onClick={() => setPreviewDoc(null)} className="px-5 py-2 text-sm font-bold text-lm-black hover:bg-gray-200 rounded-xl transition-colors border border-gray-300 bg-white shadow-sm">
                                    Close
                                </button>
                                <button className="px-5 py-2 text-sm font-bold text-white bg-lm-black hover:bg-gray-800 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    )
}
