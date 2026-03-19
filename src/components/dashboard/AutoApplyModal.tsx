"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2, Sparkles, X, BrainCircuit, FileSearch, PenTool, Database, Rocket } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Job } from "./JobCard"

interface AutoApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (dontShowAgain: boolean) => void;
    job: Job;
}

const steps = [
    { title: "Profile Thinking", icon: BrainCircuit },
    { title: "Profile Building", icon: PenTool },
    { title: "Resume Checking", icon: FileSearch },
    { title: "Resume Phrasing", icon: Sparkles },
    { title: "Form Filling", icon: Database },
    { title: "Submission Completed", icon: Rocket }
];

export function AutoApplyModal({ isOpen, onClose, onComplete, job }: AutoApplyModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const dontShowAgainRef = useRef(dontShowAgain);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        dontShowAgainRef.current = dontShowAgain;
    }, [dontShowAgain]);

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setIsFinished(false);
            return;
        }

        let stepIndex = 0;
        const interval = setInterval(() => {
            stepIndex++;
            if (stepIndex >= steps.length) {
                clearInterval(interval);
                setIsFinished(true);
                setTimeout(() => {
                    onComplete(dontShowAgainRef.current);
                }, 1500); // Auto close after showing completion
            } else {
                setCurrentStep(stepIndex);
            }
        }, 1200); // 1.2s per step

        return () => clearInterval(interval);
    }, [isOpen]);

    const handleGotItClick = () => {
        onComplete(dontShowAgain);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-white/40 backdrop-blur-sm sm:p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-lm-border"
            >
                {/* Header */}
                <div className="p-4 border-b border-lm-border flex justify-between items-center bg-[#F8F9FA]">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-lm-yellow" strokeWidth={2.5} />
                        <h2 className="text-[14px] font-black uppercase tracking-wider text-lm-black">Auto-Apply Engine</h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-lm-border rounded-md transition-colors bg-white border border-lm-border shadow-sm">
                        <X className="w-4 h-4 text-lm-text-secondary hover:text-lm-black" strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col items-center justify-center min-h-[250px] bg-gradient-to-b from-white to-[#FAFAFA]">

                    {/* Horizontal Flow */}
                    <div className="w-full flex items-start justify-between mb-10 relative px-2 mt-2">
                        {/* Connecting Line */}
                        <div className="absolute top-5 left-10 right-10 h-[2px] bg-lm-border z-0"></div>

                        {/* Active Line Fill */}
                        <div className="absolute top-5 left-10 right-10 h-[2px] z-0 overflow-hidden">
                            <motion.div
                                className="h-full bg-lm-yellow w-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: currentStep / (steps.length - 1) }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>

                        {steps.map((step, idx) => {
                            const isPast = idx < currentStep;
                            const isCurrent = idx === currentStep && !isFinished;
                            const isDone = isFinished;

                            const StepIcon = step.icon;

                            return (
                                <div key={idx} className="relative z-10 flex flex-col items-center gap-3 w-[84px]">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 shadow-sm shrink-0 bg-white ${isPast || isDone ? 'bg-lm-black border-lm-black text-lm-yellow' : isCurrent ? 'border-lm-yellow text-lm-black shadow-[0_0_15px_rgba(245,195,0,0.3)]' : 'border-lm-border text-lm-text-muted'}`}
                                    >
                                        {(isPast || isDone) ? (
                                            <CheckCircle2 className="w-5 h-5" strokeWidth={3} />
                                        ) : (
                                            <StepIcon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} strokeWidth={isCurrent ? 2.5 : 2} />
                                        )}
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-wider text-center leading-[1.3] ${(isPast || isCurrent || isDone) ? 'text-lm-black' : 'text-lm-text-muted'}`}>
                                        {step.title}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Status Text Box */}
                    <div className="mt-8 w-full max-w-md bg-white border border-lm-border rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm">
                        {isFinished ? (
                            <>
                                <CheckCircle2 className="w-6 h-6 text-[#0A7B3E]" />
                                <span className="text-[14px] font-bold text-lm-black">Application Successfully Submitted to {job.company}!</span>
                            </>
                        ) : (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-lm-yellow" />
                                <span className="text-[14px] font-bold text-lm-text-secondary">
                                    <span className="text-lm-black">{steps[Math.min(currentStep, steps.length - 1)].title}</span> for {job.title}...
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-white border-t border-lm-border flex items-center justify-end">
                    {/* TEMPORARILY DISABLED FOR TESTING */}
                    {/* <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-lm-border text-lm-yellow focus:ring-lm-yellow cursor-pointer"
                            checked={dontShowAgain}
                            onChange={(e) => setDontShowAgain(e.target.checked)}
                        />
                        <span className="text-[12px] font-semibold text-lm-text-secondary group-hover:text-lm-black transition-colors">
                            Don't show this animation again
                        </span>
                    </label> */}

                    {isFinished && (
                        <button
                            onClick={handleGotItClick}
                            className="px-6 py-2 bg-lm-black text-white text-[12px] font-bold rounded-lg hover:scale-[1.02] transition-transform shadow-md"
                        >
                            Got It
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
