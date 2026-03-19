"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnalysisReportData, Flaw, Change, ProfileData, FullAnalysisResult } from './types'
import { 
    AlertTriangle, Check, ArrowRight, Download, 
    ChevronRight, ChevronDown, Zap, ArrowUp, 
    BarChart3, List, FileText, Plus, Mic, 
    Search, Layout, Hash, Sparkles
} from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ResumePDF } from './ResumePDF'

const ICON_MAP: Record<string, any> = {
    lightning: Zap,
    'arrow-up': ArrowUp,
    check: Check,
    chart: BarChart3,
    list: List,
    document: FileText,
    plus: Plus,
    mic: Mic,
    search: Search,
    layout: Layout
}

const SEVERITY_COLORS = {
    critical: '#FF4444',
    moderate: '#F5C518',
    low: '#D1D1D1'
}

export function AnalysisReport({ data, profileData, onContinue }: { data: FullAnalysisResult, profileData: ProfileData, onContinue: () => void }) {
    const report = data.analysisReport
    const [expandedChanges, setExpandedChanges] = useState<number[]>([])
    const [viewMode, setViewMode] = useState<'report' | 'compare'>('compare')

    const toggleChange = (idx: number) => {
        setExpandedChanges(prev => 
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    } as const

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: 'spring' as const, stiffness: 100 } 
        }
    } as const

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-[#F8F8F8] p-4 md:p-6 font-sans text-black overflow-x-hidden"
        >
            {/* Header / Tabs */}
            <motion.div variants={itemVariants} className="max-w-[1400px] mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-1">REPHRASE ANALYSIS</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Neural Rebranding Complete. Review your modifications below.</p>
                </div>
                
                <div className="flex bg-white border-2 border-black p-1 shadow-neo-sm rounded-xl">
                    <button 
                        onClick={() => setViewMode('compare')}
                        className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'compare' ? 'bg-primary border-2 border-black shadow-neo-sm' : 'text-gray-400'}`}
                    >
                        Live Modifications
                    </button>
                    <button 
                        onClick={() => setViewMode('report')}
                        className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'report' ? 'bg-primary border-2 border-black shadow-neo-sm' : 'text-gray-400'}`}
                    >
                        Detailed Report
                    </button>
                </div>
            </motion.div>

            <div className="max-w-[1400px] mx-auto">
                <AnimatePresence mode="wait">
                    {viewMode === 'compare' ? (
                        <motion.div 
                            key="compare"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                        >
                            {/* LEFT: Stats & Changes List */}
                            <div className="lg:col-span-4 space-y-6 lg:h-[calc(100vh-180px)] lg:overflow-y-auto pr-2 custom-scrollbar">
                                <div className="bg-white border-2 border-black p-6 shadow-neo rounded-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="font-black text-xs uppercase tracking-widest">PERFORMANCE SCORE</h2>
                                        <div className="text-2xl font-black bg-primary px-2 border-2 border-black shadow-neo-sm">
                                            {report.scores.after.overall}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <ScoreBar label="Impact" before={report.scores.before.impact} after={report.scores.after.impact} />
                                        <ScoreBar label="Quantification" before={report.scores.before.quantification} after={report.scores.after.quantification} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                   <div className="flex items-center justify-between px-2">
                                       <h2 className="font-black text-xs uppercase tracking-widest">MODIFICATION LOG</h2>
                                       <span className="text-[9px] font-bold text-gray-400 uppercase">{report.changesMade.length} EDITS</span>
                                   </div>
                                    {report.changesMade.map((change, idx) => (
                                        <ChangeCard key={idx} change={change} isExpanded={expandedChanges.includes(idx)} onToggle={() => toggleChange(idx)} />
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: THE ACTUAL RESUME WITH MODS */}
                            <div className="lg:col-span-8">
                                <div className="bg-white border-4 border-black shadow-neo-lg rounded-[32px] p-8 md:p-14 relative overflow-hidden min-h-screen">
                                    <div className="absolute top-10 right-10 rotate-3 z-0 opacity-5">
                                        <Sparkles className="w-40 h-40" />
                                    </div>
                                    
                                    <div className="relative z-10 space-y-8">
                                        <header className="border-b-2 border-black pb-8">
                                            <h3 className="text-3xl font-black uppercase tracking-tighter">{profileData.fullName}</h3>
                                            <div className="flex gap-4 mt-2 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                                                <span className="bg-black text-primary px-2 py-0.5 rounded">{profileData.targetRole}</span>
                                                <span>{profileData.email}</span>
                                                <span>{profileData.city}</span>
                                            </div>
                                        </header>

                                        {data._quality_flags && data._quality_flags.length > 0 && (
                                            <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-2xl mb-8">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-yellow-700 mb-2">NEURAL CORRECTION INSIGHTS</p>
                                                <ul className="space-y-1">
                                                    {data._quality_flags.map((flag, i) => (
                                                        <li key={i} className="text-[10px] font-bold text-yellow-800 flex items-center gap-2">
                                                            <Zap className="w-3 h-3" /> {flag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-black inline-block px-2 py-0.5 rounded">MODIFIED SUMMARY</p>
                                                <div className="relative p-4 rounded-xl border-2 border-dashed border-green-500 bg-green-50/50">
                                                    <div className="absolute -top-3 right-4 px-2 bg-green-500 text-white text-[8px] font-black uppercase rounded">NEURO-REPHRASED</div>
                                                    <p className="text-xs md:text-sm font-bold leading-relaxed text-black">
                                                        {data.optimizedSummary}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-black inline-block px-2 py-0.5 rounded">OPTIMIZED EXPERIENCE</p>
                                                <div className="space-y-4">
                                                    {data.optimizedBullets.map((bullet, i) => {
                                                        const isModed = report.changesMade.some(c => bullet.includes(c.after))
                                                        return (
                                                            <div key={i} className={`flex gap-4 p-4 rounded-xl border-2 transition-all ${isModed ? 'border-green-500 bg-green-50/30' : 'border-transparent opacity-80'}`}>
                                                                <span className="text-green-500 font-black shrink-0">■</span>
                                                                <p className="text-xs md:text-sm font-bold leading-relaxed">
                                                                    {bullet}
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary bg-black inline-block px-2 py-0.5 rounded">ADAPTED COMPETENCIES</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {data.skills.map((s) => (
                                                        <span key={s} className="bg-white border-2 border-black px-3 py-1 text-[9px] font-black uppercase rounded-lg shadow-neo-sm">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="report"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
                        >
                            {/* Section 1: Flaws */}
                            <div className="space-y-6">
                                <motion.div variants={itemVariants}>
                                    <h2 className="text-xl font-black uppercase tracking-tight mb-1">FLAWS DETECTED</h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {report.flawsFound.length} ISSUES IN ORIGINAL SOURCE
                                    </p>
                                </motion.div>
                                <div className="space-y-4">
                                    {report.flawsFound.map((flaw, idx) => (
                                        <FlawCard key={idx} flaw={flaw} />
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Scores */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <motion.div variants={itemVariants} className="bg-white border-2 border-black p-8 shadow-neo rounded-2xl text-center">
                                        <div className="flex items-center justify-around mb-8">
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-gray-400 mb-1">ORIGINAL</p>
                                                <div className="text-3xl font-black text-gray-300 line-through">{report.scores.before.overall}</div>
                                            </div>
                                            <ArrowRight className="w-8 h-8 text-primary" />
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-primary bg-black inline-block px-1.5 py-0.5 rounded mb-1">ENHANCED</p>
                                                <div className="text-6xl font-black leading-none">{report.scores.after.overall}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 text-left">
                                            <ScoreBar label="ATS Stability" before={report.scores.before.ats} after={report.scores.after.ats} />
                                            <ScoreBar label="Impact Power" before={report.scores.before.impact} after={report.scores.after.impact} />
                                            <ScoreBar label="Keywords" before={report.scores.before.keywords} after={report.scores.after.keywords} />
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="bg-black text-white p-8 shadow-neo rounded-2xl flex flex-col justify-between">
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">NEURAL VERDICT</p>
                                            <h3 className="text-3xl font-black uppercase leading-none mb-4">
                                                STATUS: <span className="text-primary">{report.verdict.level}</span>
                                            </h3>
                                            <p className="text-xs font-bold text-gray-400 leading-relaxed italic">
                                                "{report.verdict.summary}"
                                            </p>
                                        </div>
                                        <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-black uppercase text-gray-500">OPTIMIZATION GAIN</p>
                                                <p className="text-2xl font-black text-green-400">+{report.scores.after.overall - report.scores.before.overall}%</p>
                                            </div>
                                            <Sparkles className="w-8 h-8 text-primary" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            <motion.div 
                variants={itemVariants}
                className="max-w-[1400px] mx-auto mt-12 bg-black border-2 border-black p-6 md:p-8 shadow-neo-lg flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl"
            >
                <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">READY TO DEPLOY YOUR NEW IDENTITY?</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Modifications are ready for one-click career transition.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <PDFDownloadLink
                        document={<ResumePDF data={data} profileData={profileData} />}
                        fileName={`${profileData.fullName.replace(/\s+/g, '_')}_Resume_Enhanced.pdf`}
                    >
                        {({ loading }) => (
                            <motion.button 
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white border-2 border-black font-black uppercase text-xs tracking-widest shadow-neo hover:shadow-neo-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-black"
                                disabled={loading}
                            >
                                <Download className="w-4 h-4" />
                                {loading ? 'NEURAL COMPILING...' : 'DOWNLOAD ENHANCED'}
                            </motion.button>
                        )}
                    </PDFDownloadLink>
                    <motion.button 
                        onClick={onContinue}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-primary text-black border-2 border-black font-black uppercase text-xs tracking-widest shadow-neo hover:shadow-neo-lg transition-all flex items-center justify-center gap-2"
                    >
                        GO TO DASHBOARD
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function FlawCard({ flaw }: { flaw: Flaw }) {
    return (
        <motion.div 
            whileHover={{ x: 5 }}
            className="bg-white border-2 border-black p-4 shadow-neo-sm relative overflow-hidden rounded-xl"
            style={{ borderLeftWidth: '6px', borderLeftColor: SEVERITY_COLORS[flaw.severity] }}
        >
            <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: SEVERITY_COLORS[flaw.severity] }} />
                <div>
                    <h4 className="font-black text-xs uppercase tracking-tight">{flaw.label}</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-1">{flaw.description}</p>
                    <p className="text-[8px] font-bold text-gray-600 mt-2 uppercase leading-normal">{flaw.impact}</p>
                </div>
            </div>
        </motion.div>
    )
}

function ChangeCard({ change, isExpanded, onToggle }: { change: Change, isExpanded: boolean, onToggle: () => void }) {
    const Icon = ICON_MAP[change.icon] || Check
    return (
        <motion.div 
            className="bg-white border-2 border-black shadow-neo-sm overflow-hidden rounded-xl"
            style={{ borderLeftWidth: '6px', borderLeftColor: '#F5C518' }}
        >
            <button 
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-black text-[9px] uppercase tracking-tight">{change.label}</h4>
                        <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{change.location}</p>
                    </div>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 border-t-2 border-black/5 bg-gray-50/50"
                    >
                        <div className="mt-4 space-y-4">
                            <div className="space-y-1">
                                <p className="text-[7px] font-black uppercase text-red-500">ORIGINAL FAULT</p>
                                <p className="px-2 py-1 rounded line-through text-[9px] text-red-700 italic border-l-2 border-red-200">
                                    "{change.before}"
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[7px] font-black uppercase text-green-600">NEURAL REPHRASE</p>
                                <p className="px-2 py-1 rounded text-[9px] text-green-800 font-bold border-l-2 border-green-400 bg-green-50">
                                    "{change.after}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function ScoreBar({ label, before, after }: { label: string, before: number, after: number }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                <span>{label}</span>
                <span>{before}/10 → {after}/10</span>
            </div>
            <div className="h-2 bg-gray-100 border border-black overflow-hidden flex">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(before / 10) * 100}%` }}
                    className="h-full bg-gray-300 border-r border-black"
                />
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((after - before) / 10) * 100}%` }}
                    className="h-full bg-primary"
                />
            </div>
        </div>
    )
}
