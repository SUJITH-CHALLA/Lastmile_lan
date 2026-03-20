"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, UploadCloud, Trash2, Sparkles, FileClock, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ResumesPage() {
    const resumes = [
        {
            name: "SDE_Backend_Final.pdf",
            targetRole: "Backend Engineer",
            date: "Updated 2 hours ago",
            score: 92,
            isOriginal: true,
            versions: 3
        },
        {
            name: "Frontend_React_Tailored.pdf",
            targetRole: "Frontend Developer (Swiggy)",
            date: "Generated 5 days ago",
            score: 88,
            isOriginal: false,
            versions: 0
        },
        {
            name: "FullStack_Startup_Draft.pdf",
            targetRole: "Full Stack (General)",
            date: "Updated 1 week ago",
            score: 75,
            isOriginal: true,
            versions: 1
        },
    ]

    const [isDragging, setIsDragging] = useState(false)

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-2 border-black p-6 shadow-neo gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase mb-1">My Resumes</h1>
                    <p className="text-gray-600 font-bold">Manage, tailor, and track your master and variant resumes.</p>
                </div>
                <Button className="font-bold border-2 border-black shadow-neo active:shadow-none bg-green-400 hover:bg-green-500 text-black gap-2 shrink-0">
                    <Sparkles size={18} className="fill-black" /> Auto-Tailor New
                </Button>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
                className={`border-4 border-dashed border-black bg-white p-12 flex flex-col items-center justify-center text-center transition-all ${isDragging ? 'bg-yellow-50 scale-[1.02]' : 'hover:bg-gray-50'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud size={40} className="text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Upload Master Resume</h3>
                <p className="font-bold text-gray-500 mb-6">Drag and drop your PDF here, or click to browse files.</p>
                <Button variant="outline" className="border-2 border-black shadow-neo font-bold hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                    Select File
                </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black uppercase">Your Documents</h2>
                <div className="flex gap-2 font-bold text-sm items-center cursor-pointer border-2 border-black px-3 py-1 bg-white hover:bg-gray-50">
                    Sort by: Recent <ChevronDown size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume, i) => (
                    <Card key={i} className="border-2 border-black shadow-neo hover:shadow-neo-lg transition-all p-0 overflow-hidden flex flex-col group bg-white">
                        <div className="h-40 bg-gray-100 border-b-2 border-black flex items-center justify-center relative group-hover:bg-primary/10 transition-colors">
                            <FileText size={48} className="text-black opacity-80" />
                            <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-black uppercase border-2 border-black ${resume.score >= 90 ? "bg-primary" : resume.score >= 70 ? "bg-yellow-300" : "bg-gray-200"}`}>
                                Score: {resume.score}
                            </div>
                            {resume.isOriginal && (
                                <Badge className="absolute top-3 left-3 bg-black text-white px-2 uppercase font-bold text-[10px]">
                                    Master
                                </Badge>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-black text-lg mb-1 truncate text-black" title={resume.name}>{resume.name}</h3>
                            <p className="text-sm font-bold text-gray-700 truncate mb-1">Target: {resume.targetRole}</p>
                            <p className="text-xs text-gray-500 font-bold mb-4">{resume.date}</p>

                            <div className="mt-auto space-y-3">
                                {resume.isOriginal && resume.versions > 0 && (
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-100 p-2 border border-gray-300">
                                        <FileClock size={14} />
                                        <span>{resume.versions} Tailored Variants</span>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1 border-2 border-black font-bold uppercase hover:bg-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs">
                                        Tailor for Job
                                    </Button>
                                    <Button variant="ghost" size="icon" className="border-2 border-black bg-gray-50 hover:bg-gray-200" title="Download PDF">
                                        <Download size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="border-2 border-black bg-white hover:bg-red-400 hover:text-white" title="Delete">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
