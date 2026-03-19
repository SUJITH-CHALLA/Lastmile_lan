"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnalysisResult, ProfileData, AnalysisSection } from './types'
import {
    User, FileText, Briefcase, Code, GraduationCap,
    Sparkles, Download, Eye, X, ChevronRight, Check
} from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ResumePDF } from './ResumePDF'

const SECTION_ICONS: Record<string, React.ElementType> = {
    summary: FileText,
    skills: Code,
    education: GraduationCap,
}

function getSectionIcon(key: string): React.ElementType {
    if (key.startsWith('exp')) return Briefcase
    return SECTION_ICONS[key] || FileText
}

export function ResumeEditor({
    data,
    profileData,
}: {
    data: AnalysisResult
    profileData: ProfileData
}) {
    // Editable sections state — initialized from API data
    const [sections, setSections] = useState<AnalysisSection[]>(data.sections)
    const [activeKey, setActiveKey] = useState<string | null>(null)
    const [hoveredKey, setHoveredKey] = useState<string | null>(null)

    // AI Edit panel state
    const [aiPanelSection, setAiPanelSection] = useState<string | null>(null)
    const [aiPrompt, setAiPrompt] = useState('')
    const [aiSuggestion, setAiSuggestion] = useState<string[] | null>(null)
    const [aiLoading, setAiLoading] = useState(false)

    // Preview modal
    const [showPreview, setShowPreview] = useState(false)

    // Get section being edited by AI
    const aiSection = aiPanelSection ? sections.find(s => s.key === aiPanelSection) : null

    // ── Handle inline text editing ──
    const updateSectionLine = (sectionKey: string, lineIndex: number, newText: string) => {
        setSections(prev => prev.map(sec => {
            if (sec.key !== sectionKey) return sec
            const newLines = [...sec.fixed_lines]
            newLines[lineIndex] = newText
            return { ...sec, fixed_lines: newLines }
        }))
    }

    const addSectionLine = (sectionKey: string) => {
        setSections(prev => prev.map(sec => {
            if (sec.key !== sectionKey) return sec
            return { ...sec, fixed_lines: [...sec.fixed_lines, ''] }
        }))
    }

    const removeSectionLine = (sectionKey: string, lineIndex: number) => {
        setSections(prev => prev.map(sec => {
            if (sec.key !== sectionKey) return sec
            const newLines = sec.fixed_lines.filter((_, i) => i !== lineIndex)
            return { ...sec, fixed_lines: newLines }
        }))
    }

    // ── AI Rewrite ──
    const handleAIRewrite = async () => {
        if (!aiSection) return
        setAiLoading(true)
        setAiSuggestion(null)

        try {
            const currentContent = aiSection.fixed_lines.join('\n')
            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeText: `SECTION: ${aiSection.label}\n\n${currentContent}\n\n${aiPrompt ? `USER INSTRUCTION: ${aiPrompt}` : 'Improve this section with stronger action verbs and quantified metrics.'}`
                }),
            })

            const result = await response.json()

            if (!response.ok) throw new Error(result.error || 'AI rewrite failed')

            // Extract the improved lines from the first section
            const improvedSection = result.sections?.[0]
            if (improvedSection?.fixed_lines?.length > 0) {
                setAiSuggestion(improvedSection.fixed_lines)
            } else if (result.final_resume?.sections?.[0]?.content_lines?.length > 0) {
                setAiSuggestion(result.final_resume.sections[0].content_lines)
            } else {
                setAiSuggestion(['AI could not generate improvements for this section.'])
            }
        } catch (err: any) {
            setAiSuggestion([`Error: ${err.message}`])
        } finally {
            setAiLoading(false)
        }
    }

    const applyAISuggestion = () => {
        if (!aiPanelSection || !aiSuggestion) return
        setSections(prev => prev.map(sec => {
            if (sec.key !== aiPanelSection) return sec
            return { ...sec, fixed_lines: aiSuggestion, status: 'optimized' as const }
        }))
        setAiSuggestion(null)
        setAiPrompt('')
        setAiPanelSection(null)
    }

    const discardAISuggestion = () => {
        setAiSuggestion(null)
        setAiPrompt('')
    }

    // ── Prepare data for PDF ──
    const getPdfData = () => {
        const mappedData: any = {
            personal_info: {
                full_name: data.meta.name,
                current_title: data.meta.title,
                email: data.meta.email,
                phones: [data.meta.phone],
                location: data.meta.location,
            },
            professional_summary: sections.find(s => s.key === 'summary')?.fixed_lines.join('\n') || '',
            work_experience: sections
                .filter(s => s.key.startsWith('exp'))
                .map(s => ({
                    title: s.label,
                    company: '', // Optional in current schema
                    bullets: s.fixed_lines.map(line => ({ text: line }))
                })),
            education: sections
                .filter(s => s.key === 'education')
                .map(s => ({
                    degree: s.label,
                    bullets: s.fixed_lines
                })),
            core_skills: {
                technical_skills: sections.find(s => s.key === 'skills')?.fixed_lines || []
            }
        }
        return mappedData
    }

    const isAIPanelOpen = aiPanelSection !== null

    return (
        <div className="h-screen flex flex-col bg-white font-sans overflow-hidden">
            {/* ── Top Bar ── */}
            <div className="h-14 bg-black flex items-center px-6 justify-between shrink-0 border-b-2 border-black">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Resume Editor</span>
                    <span className="bg-green-500 text-[7px] font-black text-white px-2 py-0.5 rounded-full uppercase">Live</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="bg-white text-black border-2 border-black px-5 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all flex items-center gap-2 rounded-lg"
                    >
                        <Eye className="w-3 h-3" /> Preview
                    </button>
                    <PDFDownloadLink
                        document={<ResumePDF data={getPdfData()} profileData={profileData} />}
                        fileName={`${data.meta.name.replace(/\s+/g, '_')}_Resume_Enhanced.pdf`}
                    >
                        {({ loading }) => (
                            <button
                                className="bg-primary text-black border-2 border-black px-5 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all flex items-center gap-2 rounded-lg"
                                disabled={loading}
                            >
                                <Download className="w-3 h-3" />
                                {loading ? 'Compiling...' : 'Download PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            {/* ── Main Layout ── */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Section Navigation */}
                <div className="w-40 bg-white border-r-2 border-black shrink-0 flex flex-col overflow-y-auto">
                    <div className="p-4 border-b border-gray-100">
                        <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Sections</p>
                    </div>

                    {/* Header (non-section) */}
                    <button
                        onClick={() => setActiveKey('_header')}
                        className={`flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-all hover:bg-primary/5 ${
                            activeKey === '_header' ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                        }`}
                    >
                        <User className="w-4 h-4 text-black shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wide text-black">Header</span>
                    </button>

                    {/* Dynamic Sections */}
                    {sections.map(sec => {
                        const Icon = getSectionIcon(sec.key)
                        return (
                            <button
                                key={sec.key}
                                onClick={() => setActiveKey(sec.key)}
                                className={`flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-all hover:bg-primary/5 ${
                                    activeKey === sec.key ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                                }`}
                            >
                                <Icon className="w-4 h-4 text-black shrink-0" />
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wide text-black block">{sec.label}</span>
                                    <span className={`text-[7px] font-bold uppercase ${
                                        sec.status === 'optimized' ? 'text-green-600' :
                                        sec.status === 'flagged' ? 'text-orange-500' : 'text-gray-400'
                                    }`}>
                                        {sec.status}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* CENTER: Editable Resume Document */}
                <div className="flex-1 overflow-y-auto bg-[#F8F8F8] p-6 md:p-10">
                    <div className="max-w-2xl mx-auto bg-white border-2 border-black shadow-neo rounded-2xl overflow-hidden">

                        {/* Resume Header */}
                        <div className="bg-black p-8 text-center">
                            <h2 className="text-2xl font-black text-primary tracking-widest uppercase">
                                {data.meta.name}
                            </h2>
                            <p className="text-[11px] text-white tracking-[0.2em] uppercase mt-1">
                                {data.meta.title}
                            </p>
                            <p className="text-[9px] text-gray-400 mt-3">
                                {[data.meta.email, data.meta.phone, data.meta.location, data.meta.linkedin].filter(Boolean).join(' | ')}
                            </p>
                        </div>

                        {/* Resume Sections */}
                        <div className="divide-y divide-gray-100">
                            {sections.map(sec => (
                                <div
                                    key={sec.key}
                                    className={`relative group transition-all ${
                                        activeKey === sec.key ? 'bg-primary/5 ring-2 ring-primary ring-inset' : ''
                                    }`}
                                    onMouseEnter={() => setHoveredKey(sec.key)}
                                    onMouseLeave={() => setHoveredKey(null)}
                                    onClick={() => setActiveKey(sec.key)}
                                >
                                    <div className="p-6">
                                        {/* Section Title */}
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-black border-b-2 border-black pb-1 inline-block">
                                                {sec.label}
                                            </h3>
                                            <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded ${
                                                sec.status === 'optimized' ? 'bg-green-100 text-green-700' :
                                                sec.status === 'flagged' ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {sec.status}
                                            </span>
                                        </div>

                                        {/* Editable Content Lines */}
                                        <div className="space-y-2">
                                            {sec.fixed_lines.map((line, i) => (
                                                <div key={i} className="flex items-start gap-2 group/line">
                                                    {sec.key.startsWith('exp') && (
                                                        <span className="text-primary font-black text-sm shrink-0 mt-0.5">■</span>
                                                    )}
                                                    <textarea
                                                        value={line}
                                                        onChange={(e) => updateSectionLine(sec.key, i, e.target.value)}
                                                        rows={Math.max(1, Math.ceil(line.length / 80))}
                                                        className="w-full text-[11px] font-medium leading-relaxed text-gray-700 bg-transparent border-0 outline-none resize-none focus:bg-primary/5 focus:ring-1 focus:ring-primary rounded p-1 -ml-1 transition-colors"
                                                    />
                                                    <button
                                                        onClick={() => removeSectionLine(sec.key, i)}
                                                        className="opacity-0 group-hover/line:opacity-100 text-red-400 hover:text-red-600 shrink-0 mt-1 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add Line button */}
                                        <button
                                            onClick={() => addSectionLine(sec.key)}
                                            className="mt-2 text-[8px] font-bold text-gray-300 hover:text-primary transition-colors uppercase tracking-widest"
                                        >
                                            + Add Line
                                        </button>

                                        {/* Changes Made (diff view) */}
                                        {(sec.removed_lines?.length > 0 || sec.added_lines?.length > 0) && (
                                            <details className="mt-3">
                                                <summary className="text-[8px] font-black text-gray-400 cursor-pointer hover:text-black uppercase tracking-widest">
                                                    View Changes ({(sec.removed_lines?.length || 0) + (sec.added_lines?.length || 0)})
                                                </summary>
                                                <div className="mt-2 space-y-0.5 text-[9px] font-mono">
                                                    {sec.removed_lines?.map((line, i) => (
                                                        <div key={`r-${i}`} className="bg-red-50 text-red-700 px-2 py-0.5 border-l-2 border-red-400 line-through">
                                                            − {line}
                                                        </div>
                                                    ))}
                                                    {sec.added_lines?.map((line, i) => (
                                                        <div key={`a-${i}`} className="bg-green-50 text-green-700 px-2 py-0.5 border-l-2 border-green-400">
                                                            + {line}
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        )}
                                    </div>

                                    {/* ✨ Edit with AI Button (on hover) */}
                                    <AnimatePresence>
                                        {(hoveredKey === sec.key || activeKey === sec.key) && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setAiPanelSection(sec.key)
                                                    setAiSuggestion(null)
                                                    setAiPrompt('')
                                                }}
                                                className="absolute top-4 right-4 bg-black text-primary border-2 border-black px-3 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all rounded-lg flex items-center gap-1.5 z-10"
                                            >
                                                <Sparkles className="w-3 h-3" /> Edit with AI
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-100">
                            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
                                Generated by LastMile AI Engine
                            </span>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-lg border-2 border-black shadow-neo-sm ${
                                (data.meta.optimized_score || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                (data.meta.optimized_score || 0) >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                Score: {data.meta.optimized_score}/100
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: AI Edit Panel (slides in) */}
                <AnimatePresence>
                    {isAIPanelOpen && aiSection && (
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-80 bg-white border-l-2 border-black shrink-0 flex flex-col overflow-hidden"
                        >
                            {/* Panel Header */}
                            <div className="h-12 bg-black text-primary px-4 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">AI Editor</span>
                                </div>
                                <button
                                    onClick={() => { setAiPanelSection(null); setAiSuggestion(null); setAiPrompt('') }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {/* Section Label */}
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Section</p>
                                    <p className="text-sm font-black text-black uppercase">{aiSection.label}</p>
                                </div>

                                {/* Current Content */}
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2">Current Content</p>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                                        {aiSection.fixed_lines.map((line, i) => (
                                            <p key={i} className="text-[9px] font-medium text-gray-600 leading-relaxed">{line}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2">
                                        Instructions (optional)
                                    </p>
                                    <textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="e.g. Make it more concise, add metrics, focus on leadership..."
                                        rows={3}
                                        className="w-full bg-white border-2 border-black rounded-lg p-3 text-[10px] font-bold outline-none focus:border-primary shadow-neo-sm resize-none placeholder:text-gray-300"
                                    />
                                </div>

                                {/* Rewrite Button */}
                                <button
                                    onClick={handleAIRewrite}
                                    disabled={aiLoading}
                                    className={`w-full py-3 text-[10px] font-black uppercase tracking-widest border-2 border-black rounded-lg transition-all flex items-center justify-center gap-2 ${
                                        aiLoading
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-primary text-black shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo'
                                    }`}
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {aiLoading ? 'Rewriting...' : 'Rewrite with AI'}
                                </button>

                                {/* AI Suggestion */}
                                {aiSuggestion && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-3"
                                    >
                                        <p className="text-[8px] font-black uppercase tracking-widest text-primary">AI Suggestion</p>
                                        <div className="bg-primary/5 border-2 border-primary/30 rounded-lg p-3">
                                            {aiSuggestion.map((line, i) => (
                                                <p key={i} className="text-[10px] font-medium text-black leading-relaxed">{line}</p>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={applyAISuggestion}
                                                className="flex-1 py-2 bg-black text-primary border-2 border-black rounded-lg text-[9px] font-black uppercase shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] flex items-center justify-center gap-1 transition-all"
                                            >
                                                <Check className="w-3 h-3" /> Apply
                                            </button>
                                            <button
                                                onClick={discardAISuggestion}
                                                className="flex-1 py-2 bg-white text-black border-2 border-black rounded-lg text-[9px] font-black uppercase shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] flex items-center justify-center gap-1 transition-all"
                                            >
                                                <X className="w-3 h-3" /> Discard
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Score Bar */}
            <div className="h-10 bg-white border-t-2 border-black flex items-center px-6 shrink-0 justify-between">
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Resume Score
                </span>
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-red-500">Before: {data.meta.original_score}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-[9px] font-black text-green-600">After: {data.meta.optimized_score}</span>
                </div>
            </div>

            {/* ── Preview Modal ── */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6"
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white border-2 border-black shadow-neo-lg rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Preview Header */}
                            <div className="bg-black p-8 text-center sticky top-0">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h2 className="text-2xl font-black text-primary tracking-widest uppercase">
                                    {data.meta.name}
                                </h2>
                                <p className="text-[11px] text-white tracking-[0.2em] uppercase mt-1">
                                    {data.meta.title}
                                </p>
                                <p className="text-[9px] text-gray-400 mt-3">
                                    {[data.meta.email, data.meta.phone, data.meta.location].filter(Boolean).join(' | ')}
                                </p>
                            </div>

                            {/* Preview Sections */}
                            <div className="divide-y divide-gray-100">
                                {sections.map(sec => (
                                    <div key={sec.key} className="p-6">
                                        <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-black border-b border-black pb-1 mb-3 inline-block">
                                            {sec.label}
                                        </h3>
                                        <div className="space-y-1.5">
                                            {sec.fixed_lines.map((line, i) => (
                                                <p key={i} className="text-[11px] font-medium leading-relaxed text-gray-700">
                                                    {sec.key.startsWith('exp') && <span className="text-primary mr-2">■</span>}
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
