"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, CheckCircle2, X, FileText, Activity } from "lucide-react"
import { Job } from "./JobCard"

interface AIFitCheckerModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job | null;
}

export function AIFitCheckerModal({ isOpen, onClose, job }: AIFitCheckerModalProps) {
    const [phase, setPhase] = useState<number>(0);

    // Simulated progress steps
    useEffect(() => {
        if (isOpen) {
            setPhase(0); // 0: AI Thinking
            const t1 = setTimeout(() => setPhase(1), 1500); // 1: Checking Field 1
            const t2 = setTimeout(() => setPhase(2), 2500); // 2: Checking Field 2
            const t3 = setTimeout(() => setPhase(3), 3500); // 3: Checking Field 3
            const t4 = setTimeout(() => setPhase(4), 4500); // 4: Final Report Gen
            const t5 = setTimeout(() => setPhase(5), 5500); // 5: Done showing report

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
                clearTimeout(t5);
            }
        }
    }, [isOpen]);

    if (!job) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content - Notebook Fold Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-full"
                        style={{ height: '550px' }}
                    >
                        {/* Folded Corner Effect (CSS trick) */}
                        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-transparent via-[#f0f0f0] to-[#e0e0e0] z-20"
                            style={{
                                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                                boxShadow: '-2px 2px 5px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div className="absolute top-0 right-0 w-12 h-12 bg-white z-10" />
                        {/* Hides the corner behind the fold */}
                        <div className="absolute top-0 right-0 w-[49px] h-[49px] bg-lm-content z-[5]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

                        {/* Header */}
                        <div className="p-4 sm:p-5 border-b border-lm-border flex justify-between items-center bg-[#F8F9FA] z-30 relative shrink-0">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-lm-yellow shrink-0" strokeWidth={2.5} />
                                <h2 className="text-[13px] font-black uppercase tracking-wider text-lm-black">AI-Fit Checker</h2>
                            </div>
                            <button onClick={onClose} className="p-1.5 hover:bg-lm-border rounded-md transition-colors mr-6 relative z-30 bg-white/50 backdrop-blur-sm border border-lm-border shadow-sm">
                                <X className="w-4 h-4 text-lm-text-secondary hover:text-lm-black" strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-4 sm:p-6 flex flex-col relative overflow-hidden bg-white min-h-0">

                            {/* PHASE 0-4: Animating Verification State */}
                            <AnimatePresence>
                                {phase < 5 && (
                                    <motion.div
                                        key="loading-state"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white z-20"
                                    >
                                        <div className="w-16 h-16 mb-6 rounded-full bg-lm-content border border-lm-border flex items-center justify-center relative">
                                            {phase === 0 && <Activity className="w-6 h-6 text-lm-black animate-pulse" />}
                                            {phase > 0 && <Sparkles className="w-6 h-6 text-lm-yellow" />}
                                            {/* Rotating ring */}
                                            <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="48" fill="none" stroke="#F5C300" strokeWidth="2" strokeDasharray="100 200" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        <h3 className="text-[14px] font-bold text-lm-black mb-1">
                                            {phase === 0 ? "AI Thinking..." : phase === 4 ? "Generating Final Report..." : "Analyzing & Comparing..."}
                                        </h3>
                                        <p className="text-[11px] text-lm-text-secondary mb-8">Deep analyzing Job Description vs User Resume</p>

                                        <div className="w-full max-w-[280px] flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${phase >= 1 ? 'bg-lm-black border-lm-black text-white' : 'border-lm-border text-transparent'}`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[12px] font-medium transition-colors ${phase >= 1 ? 'text-lm-black' : 'text-lm-text-muted'}`}>Checking Job Fields</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${phase >= 2 ? 'bg-lm-black border-lm-black text-white' : 'border-lm-border text-transparent'}`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[12px] font-medium transition-colors ${phase >= 2 ? 'text-lm-black' : 'text-lm-text-muted'}`}>Proper Thinking & Evaluation</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${phase >= 3 ? 'bg-lm-black border-lm-black text-white' : 'border-lm-border text-transparent'}`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[12px] font-medium transition-colors ${phase >= 3 ? 'text-lm-black' : 'text-lm-text-muted'}`}>Comparing User Profile</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${phase >= 4 ? 'bg-lm-black border-lm-black text-white' : 'border-lm-border text-transparent'}`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[12px] font-medium transition-colors ${phase >= 4 ? 'text-lm-black' : 'text-lm-text-muted'}`}>Finalizing Alignment Match</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* PHASE 5: Final Evaluation Notebook Document */}
                            <AnimatePresence>
                                {phase === 5 && (
                                    <motion.div
                                        key="final-report"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex-1 flex flex-col min-h-0 relative"
                                    >
                                        <div className="mb-4 flex items-start justify-between shrink-0">
                                            <div>
                                                <h3 className="text-xl font-black font-display uppercase text-lm-black leading-tight">Match Report</h3>
                                                <p className="text-[11px] text-lm-text-secondary mt-1">Generated specifically for: <span className="font-bold text-lm-black">{job.title} @ {job.company}</span></p>
                                            </div>
                                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center border-4 border-lm-yellow bg-lm-black text-lm-yellow text-[14px] font-black shrink-0 relative shadow-md">
                                                {job.match}%
                                            </div>
                                        </div>

                                        {/* Notebook Linings */}
                                        <div className="flex-1 bg-[#FDFDFD] border border-lm-border rounded-lg relative overflow-y-auto slim-scroll p-4 sm:p-5 shadow-inner min-h-0">
                                            {/* CSS Notebook Lines Background */}
                                            <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'linear-gradient(transparent 95%, #E8E9EC 5%)', backgroundSize: '100% 28px', backgroundPosition: '0 -1px' }}></div>

                                            {/* Simulated Red Left Margin Line */}
                                            <div className="absolute top-0 bottom-0 left-8 border-l border-[#e5e5e5] pointer-events-none"></div>

                                            <div className="relative z-10 pl-5 pr-2 pt-1">
                                                <h4 className="text-[12px] font-black uppercase text-lm-black tracking-widest mb-2 inline-block bg-lm-yellow px-2 py-0.5">Summary Conclusion</h4>
                                                <p className="text-[12px] leading-[26px] text-[#333] font-medium mb-6">
                                                    Based on deep analysis, your profile stands as a {job.match >= 85 ? 'highly outstanding' : job.match >= 75 ? 'very strong' : 'developing'} candidate for this role. Your primary strength lies in matching {job.match >= 85 ? 'almost all' : job.match >= 75 ? 'the majority' : 'a portion'} of the required core criteria.
                                                </p>

                                                <h4 className="text-[12px] font-black uppercase text-lm-black tracking-widest mb-2 mt-4 inline-block bg-lm-content px-2 py-0.5 border border-lm-border">Strengths Confirmed</h4>
                                                <ul className="list-none m-0 p-0 mb-6 space-y-2 mt-2">
                                                    <li className="flex gap-2 items-start text-[11.5px] leading-[22px] text-[#444] font-medium">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-lm-black shrink-0 mt-[4px]" strokeWidth={3} />
                                                        <span><strong>Core Skill Match:</strong> Your experience directly aligns with the {job.title} job scope.</span>
                                                    </li>
                                                    <li className="flex gap-2 items-start text-[11.5px] leading-[22px] text-[#444] font-medium">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-lm-black shrink-0 mt-[4px]" strokeWidth={3} />
                                                        <span><strong>Seniority Match:</strong> Career background expectations fully met.</span>
                                                    </li>
                                                </ul>

                                                <h4 className="text-[12px] font-black uppercase text-lm-black tracking-widest mb-2 mt-4 inline-block bg-lm-content px-2 py-0.5 border border-lm-border">Identified Gaps</h4>
                                                <ul className="list-none m-0 p-0 space-y-2 mt-2">
                                                    <li className="flex gap-2 items-start text-[11.5px] leading-[22px] text-[#444] font-medium">
                                                        <X className="w-3.5 h-3.5 text-[#999] shrink-0 mt-[4px]" strokeWidth={3} />
                                                        <span>
                                                            Missing explicit keyword for{" "}
                                                            {(() => {
                                                                const t = job.title.toLowerCase();
                                                                if (t.includes('design') || t.includes('ux')) return '"Motion Design Prototypes"';
                                                                if (t.includes('product') || t.includes('manager')) return '"Go-to-Market Execution"';
                                                                if (t.includes('data')) return '"BigQuery / ETL Optimization"';
                                                                if (t.includes('backend') || t.includes('cloud')) return '"High-Concurrency Traffic"';
                                                                return '"Advanced System Architecture"';
                                                            })()}
                                                            . Suggest revising your profile to include this related terminology before submitting.
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-4 shrink-0 flex gap-3">
                                            <button onClick={onClose} className="w-full py-3 bg-lm-black text-white text-[12px] font-bold rounded-xl shadow-[0_4px_12px_rgba(10,10,10,0.15)] flex justify-center gap-2 items-center hover:scale-[1.02] transition-transform">
                                                Got It
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
