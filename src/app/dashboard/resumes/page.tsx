"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Plus, Download, Edit, Trash2 } from "lucide-react"

export default function ResumesPage() {
    const resumes = [
        { name: "Software Engineer (General)", date: "Edited 2 days ago", score: 92 },
        { name: "Frontend Developer (React)", date: "Edited 5 days ago", score: 88 },
        { name: "Full Stack (Startup)", date: "Edited 1 week ago", score: 75 },
    ]

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-white border-2 border-black p-6 shadow-neo">
                <div>
                    <h1 className="text-3xl font-black uppercase mb-1">My Resumes</h1>
                    <p className="text-gray-600 font-bold">Manage your tailored resumes.</p>
                </div>
                <Button className="font-bold border-2 border-black shadow-neo active:shadow-none gap-2">
                    <Plus size={18} /> Create New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume, i) => (
                    <Card key={i} className="border-2 border-black shadow-neo hover:shadow-neo-lg transition-all p-0 overflow-hidden group">
                        <div className="h-48 bg-gray-100 border-b-2 border-black flex items-center justify-center relative">
                            <FileText size={64} className="text-gray-300" />
                            <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs font-bold rounded-full">
                                Score: {resume.score}
                            </div>
                        </div>
                        <div className="p-4 bg-white">
                            <h3 className="font-black uppercase text-lg mb-1 truncate">{resume.name}</h3>
                            <p className="text-xs text-gray-500 font-bold mb-4">{resume.date}</p>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 border-2 border-black font-bold hover:bg-primary">
                                    <Edit size={14} className="mr-1" /> Edit
                                </Button>
                                <Button variant="ghost" size="icon" className="border-2 border-transparent hover:border-black">
                                    <Download size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="border-2 border-transparent hover:border-black hover:bg-red-100 hover:text-red-600">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {/* New Resume Placeholder Card */}
                <button className="border-2 border-black border-dashed h-full min-h-[300px] flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-primary border-2 border-black flex items-center justify-center transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-black uppercase text-lg">Create New Resume</span>
                </button>
            </div>
        </div>
    )
}
