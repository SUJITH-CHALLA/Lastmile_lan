"use client"

import React, { useState, useRef, useCallback } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { Upload, FileText, X, AlertCircle, CheckCircle, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Helper for rendering Neo-brutalist buttons/containers
const boxStyle = "border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"

export default function ResumeAnalyzer() {
    const store = useResumeStore()

    const [dragActive, setDragActive] = useState(false)
    const [fileError, setFileError] = useState<string | null>(null)

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
        else if (e.type === "dragleave") setDragActive(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0])
        }
    }

    const validateAndSetFile = (file: File) => {
        setFileError(null)
        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if (!validTypes.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".docx")) {
            setFileError("Only PDF and DOCX files are supported")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setFileError("File size exceeds 5MB limit")
            return
        }
        store.setFile(file)
    }

    const startAnalysis = async () => {
        if (!store.uploadedFile) return
        store.setIsAnalyzing(true)
        store.setAnalysis(null, null)

        // Create FormData
        const fd = new FormData()
        fd.append("file", store.uploadedFile)

        try {
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                body: fd
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || "Analysis taking too long. Please retry.")
            }

            const data = await res.json()
            store.setAnalysis(data)
        } catch (err: unknown) {
            store.setAnalysis(null, (err as Error).message)
        } finally {
            store.setIsAnalyzing(false)
        }
    }

    // UPLOAD SCREEN
    if (!store.analysisResult && !store.isAnalyzing) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-[#fdfbf7] p-8 flex items-center justify-center font-sans text-black">
                <div className={`max-w-xl w-full p-10 flex flex-col items-center justify-center transition-all ${boxStyle}`}>
                    <h1 className="text-4xl font-black uppercase mb-4 tracking-tight">Resume Analyzer</h1>
                    <p className="text-gray-600 font-bold mb-8 text-center">Upload your resume. Our AI engine will detect flaws, optimize your bullets, and perfectly format it for ATS systems.</p>

                    <div
                        className={`w-full p-12 border-4 border-dashed border-black flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${dragActive ? 'bg-[#FACC15]' : 'bg-gray-50 hover:bg-yellow-50'}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("resume-upload")?.click()}
                    >
                        <input
                            id="resume-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleChange}
                        />

                        {store.uploadedFile ? (
                            <>
                                <FileText size={48} className="mb-4 text-black" />
                                <h3 className="text-xl font-black uppercase">{store.uploadedFile.name}</h3>
                                <p className="text-sm font-bold text-gray-500 mt-2">{(store.uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                <div
                                    className="mt-6 px-4 py-2 border-2 border-black font-bold text-xs uppercase bg-white hover:bg-red-400 hover:text-white transition-colors flex items-center gap-2"
                                    onClick={(e) => { e.stopPropagation(); store.setFile(null); setFileError(null); }}
                                >
                                    <X size={14} /> Remove File
                                </div>
                            </>
                        ) : (
                            <>
                                <Upload size={48} className="mb-4 text-black" />
                                <h3 className="text-xl font-black uppercase">Drag & Drop</h3>
                                <p className="font-bold text-gray-600 mt-2">or click to upload</p>
                                <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">PDF or DOCX, Max 5MB</p>
                            </>
                        )}
                    </div>

                    {fileError && (
                        <div className="mt-6 w-full p-4 border-2 border-red-500 bg-red-50 text-red-700 font-bold flex items-center gap-2">
                            <AlertCircle size={18} /> {fileError}
                        </div>
                    )}

                    {store.analysisError && (
                        <div className="mt-6 w-full p-4 border-2 border-red-500 bg-red-50 text-red-700 font-bold flex items-center gap-2">
                            <AlertCircle size={18} /> {store.analysisError}
                        </div>
                    )}

                    <Button
                        disabled={!store.uploadedFile}
                        onClick={startAnalysis}
                        className={`mt-8 w-full h-14 text-lg font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${store.uploadedFile ? 'bg-[#FACC15] text-black hover:bg-yellow-400' : 'bg-gray-200 text-gray-400'}`}
                    >
                        Start Analysis
                    </Button>
                </div>
            </div>
        )
    }

    // LOADING SCREEN
    if (store.isAnalyzing) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-[#fdfbf7] p-8 flex items-center justify-center font-sans text-black">
                <div className={`max-w-md w-full p-8 flex flex-col items-center justify-center text-center ${boxStyle}`}>
                    <div className="w-16 h-16 border-4 border-black border-t-[#FACC15] rounded-full animate-spin mb-8"></div>
                    <h2 className="text-2xl font-black uppercase mb-2">Analyzing Resume...</h2>
                    <p className="text-gray-600 font-bold animate-pulse">Scanning for ATS issues and generating improvements.</p>
                    <div className="w-full h-4 bg-gray-200 border-2 border-black mt-8 overflow-hidden">
                        <div className="h-full bg-[#FACC15] w-full origin-left animate-[scale-x_2s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>
        )
    }

    // MAIN 3-COLUMN LAYOUT
    return <ResumeAnalyzerResults />
}

function ResumeAnalyzerResults() {
    const store = useResumeStore()
    const result = store.analysisResult
    if (!result) return null

    // UI Helper for Flaw Cards
    const FlawCard = ({ flaw }: { flaw: any }) => {
        const [expanded, setExpanded] = useState(false)
        const sevColor = flaw.severity === "high" ? "bg-red-400" : flaw.severity === "medium" ? "bg-orange-400" : "bg-yellow-400"

        return (
            <div className="border-2 border-black bg-white mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                <div
                    className="p-3 flex items-start justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex gap-3">
                        <span className={`px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase ${sevColor}`}>
                            {flaw.severity}
                        </span>
                        <div>
                            <div className="text-xs font-black uppercase text-gray-500 mb-1">{flaw.section}</div>
                            <div className="font-bold text-sm leading-snug">{flaw.issue}</div>
                        </div>
                    </div>
                    <ChevronDown size={16} className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </div>
                {expanded && (
                    <div className="p-3 border-t-2 border-black bg-green-50 text-green-900 text-sm font-medium">
                        <span className="font-black uppercase text-[10px] block mb-1">Suggestion</span>
                        {flaw.suggestion}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-white text-black font-sans overflow-hidden">

            {/* 3 Columns */}
            <div className="flex-1 flex overflow-hidden">

                {/* COL 1: FLAW REPORT */}
                <div className="w-1/3 border-r-2 border-black flex flex-col bg-white">
                    <div className="p-4 border-b-2 border-black bg-black text-white shrink-0">
                        <h2 className="font-black uppercase tracking-widest text-lg">Analysis Report</h2>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1">
                        {/* Score */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="56" fill="none" stroke={result.overall_score >= 80 ? "#4ade80" : result.overall_score >= 60 ? "#FACC15" : "#f87171"} strokeWidth="8" strokeDasharray={`${result.overall_score * 3.5} 350`} strokeLinecap="square" />
                                </svg>
                                <div className="text-4xl font-black">{result.overall_score}</div>
                                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black text-white border-4 border-white rounded-full flex items-center justify-center text-xl font-black">
                                    {result.grade}
                                </div>
                            </div>
                        </div>

                        <p className="font-bold text-sm text-center mb-8 pb-8 border-b-2 border-dashed border-gray-300">
                            {result.summary}
                        </p>

                        <h3 className="font-black uppercase mb-4 tracking-widest">Section Health</h3>
                        {Object.entries(result.sections).map(([key, sec]: [string, any]) => (
                            <div key={key} className="mb-4">
                                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                                    <span>{key}</span>
                                    <span>{sec.score}/100</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 border-2 border-black">
                                    <div className={`h-full border-r-2 border-black ${sec.score >= 80 ? 'bg-green-400' : 'bg-yellow-400'}`} style={{ width: \`\${sec.score}%\` }} />
                                </div>
                            </div>
                        ))}

                        <h3 className="font-black uppercase bg-black text-white px-3 py-1 inline-block mt-8 mb-4">Identified Flaws ({result.flaws.length})</h3>
                        {result.flaws.map((flaw: any, i: parseInt) => (
                            <FlawCard key={i} flaw={flaw} />
                        ))}

                        <h3 className="font-black uppercase mt-8 mb-3 tracking-widest">Keyword Analysis</h3>
                        <div className="mb-6">
                            <div className="text-xs font-bold uppercase text-gray-500 mb-2">Missing Priority Keywords</div>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords_missing.map((kw: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-red-100 border-2 border-red-500 text-red-700 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* COL 2: CANVAS */}
                <div className="w-1/3 border-r-2 border-black flex flex-col bg-gray-50">
                    <div className="p-4 border-b-2 border-black bg-[#FACC15] flex justify-between items-center shrink-0">
                        <h2 className="font-black uppercase tracking-widest text-lg">Your Resume</h2>
                        <Button variant="outline" size="sm" className="font-bold border-2 border-black bg-white hover:bg-black hover:text-white" onClick={store.resetToOriginal}>
                            Reset Edits
                        </Button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-full">
                            {/* Simplistic render of currentResume */}
                            <div className="text-center mb-8 border-b-2 border-black pb-4">
                                <h1 className="text-3xl font-black uppercase mb-2">{store.currentResume?.name}</h1>
                                <p className="font-bold text-gray-600">
                                    {[store.currentResume?.email, store.currentResume?.phone, store.currentResume?.location].filter(Boolean).join(" | ")}
                                </p>
                                <p className="text-sm font-medium mt-1">{store.currentResume?.linkedin}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="font-black border-b-2 border-black uppercase text-lg mb-2">Summary</h2>
                                <p className="text-sm leading-relaxed" contentEditable suppressContentEditableWarning onBlur={(e) => store.updateResumeSection("summary", e.target.innerText)}>
                                    {store.currentResume?.summary}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="font-black border-b-2 border-black uppercase text-lg mb-4">Experience</h2>
                                {store.currentResume?.experience?.map((exp: any, i: number) => (
                                    <div key={i} className="mb-4">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-black text-md">{exp.role}</h3>
                                            <span className="text-xs font-bold text-gray-500 uppercase">{exp.duration}</span>
                                        </div>
                                        <div className="font-bold text-sm mb-2">{exp.company} — {exp.location}</div>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {exp.bullets.map((b: string, j: number) => (
                                                <li key={j} className="text-sm" contentEditable suppressContentEditableWarning onBlur={(e) => {
                                                    const newExp = [...store.currentResume.experience];
                                                    newExp[i].bullets[j] = e.target.innerText;
                                                    store.updateResumeSection("experience", newExp);
                                                }}>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h2 className="font-black border-b-2 border-black uppercase text-lg mb-4">Skills</h2>
                                <p className="text-sm leading-relaxed" contentEditable suppressContentEditableWarning onBlur={(e) => store.updateResumeSection("skills", e.target.innerText.split(', '))}>
                                    {store.currentResume?.skills?.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COL 3: AI SUGGESTIONS */}
                <div className="w-1/3 flex flex-col bg-white">
                    <div className="p-4 border-b-2 border-black bg-black text-white shrink-0 flex justify-between items-center">
                        <h2 className="font-black uppercase tracking-widest text-lg text-[#FACC15]">AI Improvements</h2>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-7 text-[10px] font-black uppercase text-black">Accept All</Button>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 bg-[url('/grid.svg')]">
                        <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                            <CheckCircle size={40} className="mx-auto mb-3 text-green-500" />
                            <h3 className="font-black uppercase text-lg mb-2">Automated Optimization Complete</h3>
                            <p className="text-sm font-bold text-gray-500">
                                The AI has rewritten weak bullet points, injected missing keywords, and structured your resume for ATS systems. The results are already applied in the Canvas to your left. Review the document and make any final edits.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="h-16 border-t-2 border-black bg-white flex items-center justify-between px-6 shrink-0">
                <div className="font-bold text-sm flex items-center gap-2">
                    {store.hasUnsavedChanges ? <span className="text-yellow-600">⚠ Unsaved Edits Present</span> : <span className="text-green-600">✓ All Edits Synced</span>}
                </div>
                <Button className="font-black uppercase border-2 border-black bg-[#FACC15] text-black hover:bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center gap-2" onClick={() => window.location.href = '/resume-analyzer/templates'}>
                    Proceed to Templates <ChevronRight size={18} />
                </Button>
            </div>

        </div>
    )
}
