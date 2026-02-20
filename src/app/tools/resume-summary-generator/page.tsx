"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" // Need to implement Textarea or use input
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2, Copy } from "lucide-react"

export default function ResumeSummaryGenerator() {
    const [jobDesc, setJobDesc] = useState("")
    const [resume, setResume] = useState("")
    const [generatedSummary, setGeneratedSummary] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerate = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setGeneratedSummary("Driven Senior Frontend Engineer with 5+ years of experience building scalable web applications. Expert in React, Next.js, and TypeScript. Proven track record of improving site performance by 40% and leading cross-functional teams to deliver projects on time.")
            setIsLoading(false)
        }, 2000)
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-black uppercase mb-2">Resume Summary Generator</h1>
                <p className="text-gray-600">Paste your resume and the job description. Get a tailored summary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="font-bold">Job Description</Label>
                    <textarea
                        className="w-full h-40 border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-neo-sm resize-none"
                        placeholder="Paste the job description here..."
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="font-bold">Current Resume / Experience</Label>
                    <textarea
                        className="w-full h-40 border-2 border-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-neo-sm resize-none"
                        placeholder="Paste your current resume summary or experience..."
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                    />
                </div>
            </div>

            <Button
                onClick={handleGenerate}
                disabled={isLoading || !jobDesc || !resume}
                className="w-full h-12 text-lg font-bold border-2 border-black shadow-neo active:shadow-none"
            >
                {isLoading ? <><Loader2 className="animate-spin mr-2" /> Generating...</> : "Generate Summary"}
            </Button>

            {generatedSummary && (
                <Card className="bg-primary/10 border-2 border-black p-6 mt-8 relative animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-black uppercase">Generated Summary</h3>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-black hover:text-white" onClick={() => navigator.clipboard.writeText(generatedSummary)}>
                            <Copy size={16} />
                        </Button>
                    </div>
                    <p className="text-lg leading-relaxed font-medium">
                        {generatedSummary}
                    </p>
                </Card>
            )}
        </div>
    )
}
