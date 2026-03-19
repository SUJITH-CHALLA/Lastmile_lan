"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ProfileData, AnalysisResult } from './types'
import { X, Brain, FileText, Sparkles } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { ResumeOutput } from './ResumeOutput'
import { ResumePDF } from './ResumePDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

// ── Logs Interface ──
interface LogEntry {
    text: string
    done: boolean
}




export function AIProcessing({
    profileData,
    onComplete,
}: {
    profileData: ProfileData
    onComplete: (data: AnalysisResult) => void
}) {
    const [logs, setLogs] = useState<{text: string, done: boolean}[]>([])
    const [sectionsFound, setSectionsFound] = useState(0)
    const [issuesFound, setIssuesFound] = useState(0)
    const [scoreBoost, setScoreBoost] = useState(0)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [previewData, setPreviewData] = useState<AnalysisResult | null>(null)
    const [editedData, setEditedData] = useState<AnalysisResult | null>(null)
    const [isMerging, setIsMerging] = useState(false)
    const [statusText, setStatusText] = useState("Initializing Neural Link...")
    const scrollRef = useRef<HTMLDivElement>(null)
    const logIdRef = useRef(0)
    const mountedRef = useRef(true)
    const apiDoneRef = useRef(false)
    const apiResultRef = useRef<AnalysisResult | null>(null)
    const apiErrorRef = useRef<string | null>(null)
    const hasFetched = useRef(false)

    // ── AI Edit Panel State ──
    const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null)
    const [activeSectionLabel, setActiveSectionLabel] = useState('')
    const [activeSectionContent, setActiveSectionContent] = useState('')
    const [activeSubKey, setActiveSubKey] = useState<string | null>(null)
    const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null)
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([])
    const [inputText, setInputText] = useState('')
    const [isAiTyping, setIsAiTyping] = useState(false)
    const [lastAiResponse, setLastAiResponse] = useState('')
    const [undoStack, setUndoStack] = useState<AnalysisResult[]>([])
    const chatScrollRef = useRef<HTMLDivElement>(null)

    const handleEditSection = (
        sectionKey: string,
        sectionLabel: string,
        content: string,
        subKey?: string,
        subIndex?: number
    ) => {
        setActiveSectionKey(sectionKey)
        setActiveSectionLabel(sectionLabel)
        setActiveSectionContent(content)
        setActiveSubKey(subKey || null)
        setActiveSubIndex(subIndex ?? null)
        setMessages([{
            role: 'ai',
            content: `Ready to refine your ${sectionLabel}. What would you like to improve?`
        }])
        setLastAiResponse('')
        setInputText('')
    }

    const closePanel = () => {
        setActiveSectionKey(null)
        setMessages([])
        setLastAiResponse('')
    }

    const handleSend = async () => {
        if (!inputText.trim() || isAiTyping) return
        const userMsg = inputText.trim()
        setInputText('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setIsAiTyping(true)
        setLastAiResponse('')
        try {
            const res = await fetch('https://api.cerebras.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CEREBRAS_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama3.1-8b',
                    max_tokens: 500,
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert resume editor. The user wants to refine ONLY their ${activeSectionLabel} section. Current content: "${activeSectionContent}". Provide improved content for this section only. Be concise and professional. Return only the improved text, no explanations.`
                        },
                        ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
                        { role: 'user', content: userMsg }
                    ]
                })
            })
            const data = await res.json()
            const aiReply = data.choices?.[0]?.message?.content || 'Could not generate a response.'
            setMessages(prev => [...prev, { role: 'ai', content: aiReply }])
            setLastAiResponse(aiReply)
        } catch {
            setMessages(prev => [...prev, { role: 'ai', content: 'Error connecting to AI. Please try again.' }])
        } finally {
            setIsAiTyping(false)
        }
    }

    const handleUndo = () => {
        if (undoStack.length === 0) return
        const previous = undoStack[undoStack.length - 1]
        setEditedData(previous)
        setUndoStack(prev => prev.slice(0, -1))
    }

    const handleApply = () => {
        if (!editedData || !lastAiResponse) return
        const updated = JSON.parse(JSON.stringify(editedData))

        const cleanResponse = lastAiResponse
            .replace(/^["'`]|["'`]$/g, '')  // remove leading/trailing quotes
            .replace(/^\s+|\s+$/g, '')       // trim whitespace

        setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(editedData))])

        // Experience bullet
        if (activeSectionKey === 'experience' && activeSubIndex !== null && activeSubKey !== null) {
            const [expIdx, bulletIdx] = [Number(activeSubKey), activeSubIndex]
            if (bulletIdx === -1) {
                // entire experience entry summary
                updated.work_experience[expIdx].title = cleanResponse
            } else {
                updated.work_experience[expIdx].bullets[bulletIdx].text = cleanResponse
            }
        }

        // Skills sub-category
        else if (activeSectionKey === 'skills' && activeSubKey) {
            updated.core_skills[activeSubKey] = cleanResponse.split(',').map((s: string) => s.trim())
        }

        // Projects bullet
        else if (activeSectionKey === 'projects' && activeSubIndex !== null && activeSubKey !== null) {
            const [projIdx, bulletIdx] = [Number(activeSubKey), activeSubIndex]
            if (bulletIdx === -1) {
                updated.projects[projIdx].name = cleanResponse
            } else {
                updated.projects[projIdx].bullets[bulletIdx].text = cleanResponse
            }
        }

        // Education entry
        else if (activeSectionKey === 'education' && activeSubIndex !== null) {
            updated.education[activeSubIndex].degree = cleanResponse
        }

        // Objective/summary
        else if (activeSectionKey === 'objective' || activeSectionKey === 'summary') {
            updated.professional_summary = cleanResponse
        }

        // Certifications
        else if (activeSectionKey === 'certifications' && activeSubIndex !== null) {
            updated.certifications[activeSubIndex].name = cleanResponse
        }

        // Achievements
        else if (activeSectionKey === 'achievements' && activeSubIndex !== null) {
            updated.achievements[activeSubIndex].description = cleanResponse
        }

        setEditedData(updated)
        setLastAiResponse('')
        setMessages(prev => [...prev, { role: 'ai', content: '✓ Applied to your resume!' }])
    }

    const addLog = (text: string) => {
        if (!text) return
        setLogs(prev => [
            ...prev.map(l => ({ ...l, done: true })),
            { text, done: false }
        ])
        // Minor dynamic stats
        setSectionsFound(prev => prev + (Math.random() > 0.8 ? 1 : 0))
        setIssuesFound(prev => prev + (Math.random() > 0.7 ? 1 : 0))
        setScoreBoost(prev => prev + Math.floor(Math.random() * 2) + 1)
    }

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        mountedRef.current = true

        const addLogDelayed = (text: string, delayMs: number) => {
            return new Promise<void>(resolve => {
                setTimeout(() => {
                    addLog(text)
                    resolve()
                }, delayMs)
            })
        }

        const fetchData = async () => {
            try {
                if (!profileData.resumeFile) {
                    throw new Error("No resume file found.")
                }

                await addLogDelayed('Reading your resume...', 0)
                setStatusText("Processing...")
                setProgress(20)

                const formData = new FormData()
                formData.append('file', profileData.resumeFile)
                formData.append('profileData', JSON.stringify({
                    fullName: profileData.fullName,
                    jobTitle: profileData.jobTitle,
                    yearsOfExperience: profileData.yearsOfExperience,
                    industry: profileData.industry,
                    targetRole: profileData.targetRole,
                    linkedinUrl: profileData.linkedinUrl,
                    email: profileData.email,
                    city: profileData.city,
                }))

                await addLogDelayed('Extracting sections...', 800)
                setProgress(40)

                await addLogDelayed('Analyzing experience...', 1600)

                const response = await fetch('/api/resume/analyze', {
                    method: 'POST',
                    body: formData,
                })

                const raw = await response.json()
                if (!response.ok) throw new Error(raw.error || "Analysis failed")

                setProgress(70)

                // Normalize results
                const exp = raw.work_experience || []
                const edu = raw.education || []
                const coreSkills = raw.core_skills || {}
                const allSkills = [
                    ...(Array.isArray(coreSkills.technical_skills) ? coreSkills.technical_skills : []),
                    ...(Array.isArray(coreSkills.tools) ? coreSkills.tools : []),
                ]

                const sections: any[] = []
                if (raw.professional_summary) {
                    sections.push({ key: 'summary', label: 'Objective', status: 'optimized', fixed_lines: [raw.professional_summary], original_lines: [], removed_lines: [], added_lines: [], issues: [] })
                }
                exp.forEach((job: any, i: number) => {
                    const bullets: string[] = (job.bullets || []).map((b: any) => typeof b === 'string' ? b : (b.text || ''))
                    sections.push({ key: `exp_${i}`, label: `${job.company || 'Experience'} — ${job.title || ''}`, status: 'optimized', fixed_lines: bullets, original_lines: [], removed_lines: [], added_lines: [], issues: [] })
                })
                if (allSkills.length > 0) {
                    sections.push({ key: 'skills', label: 'Core Skills', status: 'optimized', fixed_lines: allSkills, original_lines: [], removed_lines: [], added_lines: [], issues: [] })
                }
                edu.forEach((school: any, i: number) => {
                    sections.push({ key: `edu_${i}`, label: school.college || 'Education', status: 'valid', fixed_lines: [`${school.degree || ''} in ${school.specialization || ''} — ${school.duration || ''}`], original_lines: [], removed_lines: [], added_lines: [], issues: [] })
                })

                const normalized: AnalysisResult = {
                    ...raw,
                    meta: {
                        name: raw.personal_info?.full_name || profileData.fullName,
                        original_score: raw.analysisReport?.scores?.before?.overall || 40,
                        optimized_score: raw.analysisReport?.scores?.after?.overall || 82,
                    },
                    sections,
                }

                await addLogDelayed('Scoring resume quality...', 400)
                await addLogDelayed(`Score: ${normalized.meta.original_score} → ${normalized.meta.optimized_score}`, 800)
                await addLogDelayed(`${sections.length} sections analyzed.`, 400)
                await addLogDelayed('Resume Enhancement Complete.', 400)

                setPreviewData(normalized)
                setEditedData(JSON.parse(JSON.stringify(normalized)))
                setProgress(100)
                setStatusText("Complete")

            } catch (err: any) {
                setError(err.message)
            }
        }

        fetchData()

        return () => { mountedRef.current = false }
    }, [])

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    // Keep editedData as a deep copy of previewData whenever it changes
    useEffect(() => {
        if (previewData) {
            setEditedData(JSON.parse(JSON.stringify(previewData)))
        }
    }, [previewData])

    // ── Error State ──
    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-white p-6 text-center">
                <div className="max-w-md space-y-6">
                    <div className="w-16 h-16 bg-white border-2 border-black rounded-2xl mx-auto flex items-center justify-center shadow-neo-sm">
                        <X className="w-8 h-8 text-black" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-black">Engine Offline</h2>
                    <p className="text-xs text-black font-bold leading-relaxed break-all px-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-primary text-black px-6 py-3 rounded-xl font-bold uppercase text-xs shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform border-2 border-black"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden font-sans bg-white">
            <style>{`
                @keyframes breatheBg {
                    0% { background-color: #0a0a0a; }
                    100% { background-color: #111111; }
                }
                .breathe-bg {
                    animation: breatheBg 4s infinite alternate ease-in-out;
                    background-color: #0a0a0a;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .shimmer-effect {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.4),
                        transparent
                    );
                    animation: shimmer 1.5s infinite linear;
                }
            `}</style>

            {/* TOP NAVBAR */}
            <div className="h-12 border-b-2 border-black bg-white flex items-center justify-between px-6 shrink-0 z-50">

                {/* Left — Logo only */}
                <div className="flex items-center gap-2">
                    <Logo className="w-5 h-5 text-black" />
                    <span className="font-black text-sm uppercase tracking-widest">LastMile</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                        Resume AI
                    </span>
                </div>

                {/* Marquee warning — only shows after analysis done */}
                {previewData && (
                    <div className="flex-1 mx-6 overflow-hidden border-2 border-black rounded-sm bg-yellow-400">
                        <div style={{
                            display: 'flex',
                            animation: 'marquee 18s linear infinite',
                            whiteSpace: 'nowrap',
                            padding: '4px 0'
                        }}>
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="text-[10px] font-black uppercase tracking-widest text-black px-8">
                                    ⚠ AI Generated Resume — Please review all content before submitting to employers &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Right — Actions only */}
                <div className="flex items-center gap-3">
                    {/* Download — only after analysis done */}
                    {(editedData || previewData)?.personal_info?.full_name && (
                        <PDFDownloadLink
                            document={<ResumePDF data={editedData || previewData} profileData={profileData} />}
                            fileName={`${(editedData || previewData)?.personal_info?.full_name?.replace(/\s+/g, '_') || 'Resume'}_LastMile.pdf`}
                        >
                            {({ loading }) => (
                                <button className="bg-yellow-400 border-2 border-black font-black text-[10px] uppercase px-4 py-1.5 rounded-sm shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all tracking-widest">
                                    {loading ? 'Compiling…' : '↓ Download PDF'}
                                </button>
                            )}
                        </PDFDownloadLink>
                    )}

                    {/* Back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="border-2 border-black font-black text-[10px] uppercase px-4 py-1.5 rounded-sm shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-black hover:text-white transition-all tracking-widest"
                    >
                        ← Back
                    </button>
                </div>

            </div>

            {/* 3-COLUMN BODY */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* LEFT PANEL */}
                <motion.div
                    animate={isMerging ? { x: '50%', opacity: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="w-[260px] shrink-0 border-r-2 border-black flex flex-col overflow-hidden bg-white h-full relative"
                >
                    {/* Header */}
                    <div className="h-12 border-b-2 border-black flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} strokeWidth={2.5} />
                            <span className="font-black text-xs uppercase tracking-widest">AI Logs</span>
                        </div>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase text-gray-500">Live</span>
                        </span>
                    </div>

                    {/* Scrollable log lines */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-[10px] mt-0.5 shrink-0">
                                    {log.done ? '✓' : i === logs.length - 1 ? '→' : '○'}
                                </span>
                                <span className={`text-xs leading-snug font-mono ${
                                    log.done ? 'text-gray-400 line-through' :
                                    i === logs.length - 1 ? 'text-black font-bold' : 'text-gray-500'
                                }`}>
                                    {log.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Stats grid at bottom */}
                    <div className="border-t-2 border-black grid grid-cols-3 gap-2 px-2 py-3 shrink-0">
                        {[
                            { label: 'Sections', value: sectionsFound },
                            { label: 'Issues', value: issuesFound },
                            { label: 'Boost', value: `+${scoreBoost}%` },
                        ].map((stat, i) => (
                            <div key={i} className="p-3 flex flex-col items-center bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_#000]">
                                <span className="text-base font-black">{stat.value}</span>
                                <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-0.5">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* MIDDLE — Resume output */}
                <motion.div
                    animate={isMerging ? { x: '-50%', opacity: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex-1 overflow-y-auto bg-[#F5F5F5] relative"
                >
                    {/* Top bar inside middle column */}
                    <div className="sticky top-0 z-10 bg-white border-b-2 border-black h-12 flex items-center justify-between px-6">
                        <div className="flex items-center gap-2">
                            <FileText size={14} strokeWidth={2.5} />
                            <span className="text-xs font-black uppercase tracking-widest">
                                Resume Preview
                            </span>
                        </div>
                        {previewData && (
                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Analysis Complete
                            </span>
                        )}
                    </div>

                    {/* Resume card */}
                    <div className="py-8 px-6">
                        {(editedData || previewData) ? (
                            <div style={{
                                background: '#fff',
                                border: '2px solid #000',
                                borderRadius: '6px',
                                boxShadow: '6px 6px 0px #000',
                                maxWidth: '780px',
                                margin: '0 auto',
                                overflow: 'hidden'  // clips inner content to border radius
                            }}>
                                <ResumeOutput
                                    data={(editedData || previewData)!}
                                    profileData={profileData}
                                    onEditSection={handleEditSection}
                                />
                            </div>
                        ) : (
                            /* Skeleton loading */
                            <div className="max-w-3xl mx-auto space-y-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-6 space-y-3">
                                        <div className="h-3 bg-gray-200 animate-pulse rounded w-1/4" />
                                        <div className="h-2 bg-gray-100 animate-pulse rounded w-full" />
                                        <div className="h-2 bg-gray-100 animate-pulse rounded w-5/6" />
                                        <div className="h-2 bg-gray-100 animate-pulse rounded w-4/6" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {activeSectionKey && (
                    <div className="w-[360px] shrink-0 border-l-2 border-black flex flex-col bg-white overflow-hidden">

                        {/* Header */}
                        <div className="h-12 border-b-2 border-black flex items-center justify-between px-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                <span className="font-black text-xs uppercase tracking-widest">
                                    {activeSectionLabel}
                                </span>
                            </div>
                            <button
                                onClick={closePanel}
                                className="text-gray-400 hover:text-black transition-colors text-lg leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Current section preview */}
                        <div className="px-4 py-3 bg-[#FFFBEA] border-b-2 border-black shrink-0" style={{
                            background: '#FFFBEA',
                            border: '2px solid #000',
                            borderRadius: '4px',
                            boxShadow: '3px 3px 0px #000',
                            padding: '12px',
                            margin: '12px',
                        }}>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                Current Content
                            </p>
                            <p className="text-[11px] font-mono text-gray-600 leading-relaxed line-clamp-3">
                                {activeSectionContent}
                            </p>
                        </div>

                        {/* Quick action chips */}
                        <div className="px-4 py-2 border-b border-gray-100 flex flex-wrap gap-1.5 shrink-0">
                            {[
                                'Make it stronger',
                                'Add metrics',
                                'Make concise',
                                'Fix grammar',
                            ].map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => {
                                        setInputText(chip)
                                    }}
                                    className="text-[10px] font-bold border-2 border-black px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-400 transition-all uppercase tracking-wide"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed rounded-sm ${
                                        msg.role === 'user'
                                            ? 'bg-black text-yellow-400 font-bold shadow-[2px_2px_0px_#FFD600]'
                                            : 'bg-gray-100 border-2 border-black text-black shadow-[2px_2px_0px_#000]'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isAiTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 border-2 border-black px-3 py-2 rounded-sm shadow-[2px_2px_0px_#000]">
                                        <span className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Apply / Undo actions */}
                        {(lastAiResponse || undoStack.length > 0) && (
                            <div className="px-4 py-2 border-t border-gray-100 shrink-0 flex gap-2">
                                {lastAiResponse && (
                                    <button
                                        onClick={handleApply}
                                        className="flex-1 bg-black text-yellow-400 border-2 border-black font-black text-xs uppercase py-2 rounded-sm shadow-[3px_3px_0px_#FFD600] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all tracking-widest"
                                    >
                                        ✓ Apply
                                    </button>
                                )}
                                {undoStack.length > 0 && (
                                    <button
                                        onClick={handleUndo}
                                        className={`${!lastAiResponse ? 'w-full' : ''} border-2 border-black font-black text-xs uppercase px-4 py-2 rounded-sm shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-black hover:text-white transition-all`}
                                    >
                                        ↩ Undo
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t-2 border-black flex gap-2 shrink-0 bg-[#FAFAFA]">
                            <div className="flex-1 flex items-center border-2 border-black rounded-sm shadow-[2px_2px_0px_#000] bg-white overflow-hidden">
                                <input
                                    value={inputText}
                                    onChange={e => setInputText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                    placeholder={`Refine ${activeSectionLabel}...`}
                                    className="flex-1 px-3 py-2.5 text-xs font-medium outline-none bg-transparent placeholder:text-gray-400"
                                />
                                {inputText && (
                                    <button
                                        onClick={() => setInputText('')}
                                        className="px-2 text-gray-300 hover:text-black transition-colors text-sm"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim() || isAiTyping}
                                className="bg-yellow-400 border-2 border-black w-10 h-10 rounded-sm shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <Sparkles size={14} strokeWidth={2.5} />
                            </button>
                        </div>

                    </div>
                )}

            </div>

        </div>
    )
}
