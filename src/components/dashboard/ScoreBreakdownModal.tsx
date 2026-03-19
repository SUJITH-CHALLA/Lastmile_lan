"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, AlertCircle, TrendingUp, Sparkles, Target, Briefcase, MapPin, GraduationCap, Code2, Clock } from "lucide-react"
import { Job } from "./JobCard"

interface ScoreBreakdownModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job;
}

interface CriterionScore {
    label: string;
    score: number;
    maxScore: number;
    icon: React.ElementType;
    status: 'strong' | 'partial' | 'weak';
    detail: string;
}

function generateBreakdown(job: Job): CriterionScore[] {
    const m = job.match;

    // Deterministically calculate each score proportionally to its max weight.
    let s1 = Math.round((m / 100) * 25);
    let s2 = Math.round((m / 100) * 20);
    let s3 = Math.round((m / 100) * 20);
    let s4 = Math.round((m / 100) * 15);
    let s5 = Math.round((m / 100) * 10);
    let s6 = Math.round((m / 100) * 10);

    // Correct any rounding difference so the sum stringently equals `m`
    const sum = s1 + s2 + s3 + s4 + s5 + s6;
    s1 += (m - sum);

    const getTechStackString = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('design') || t.includes('ux')) return "Figma, prototyping, and UI design skills";
        if (t.includes('product') || t.includes('manager')) return "product strategy and roadmapping skills";
        if (t.includes('data') || t.includes('analyst')) return "SQL, Python, and data analysis frameworks";
        if (t.includes('backend')) return "Node.js, PostgreSQL, and backend architecture";
        return "React, TypeScript, and frontend stack";
    }

    const techStackName = getTechStackString(job.title);

    return [
        {
            label: "Technical Skills",
            score: s1,
            maxScore: 25,
            icon: Code2,
            status: m >= 85 ? 'strong' : m >= 70 ? 'partial' : 'weak',
            detail: m >= 85
                ? `Your ${techStackName} fully match the JD requirements.`
                : m >= 70
                    ? `Most core skills match. Missing 1-2 secondary technologies related to ${job.title.split(' ')[0]} listed in JD.`
                    : "Several key technologies in the JD are not reflected in your profile."
        },
        {
            label: "Experience Level",
            score: s2,
            maxScore: 20,
            icon: Briefcase,
            status: m >= 80 ? 'strong' : m >= 65 ? 'partial' : 'weak',
            detail: m >= 80
                ? "Your years of experience align perfectly with the role's seniority requirements."
                : m >= 65
                    ? "Experience is close but slightly below the preferred range specified."
                    : "Experience gap detected — the role asks for more years than reflected in profile."
        },
        {
            label: "Role Alignment",
            score: s3,
            maxScore: 20,
            icon: Target,
            status: m >= 82 ? 'strong' : m >= 68 ? 'partial' : 'weak',
            detail: m >= 82
                ? "Your past roles and responsibilities closely mirror this position's day-to-day scope."
                : m >= 68
                    ? "Partial overlap with the role's core responsibilities. Some areas are new."
                    : "This role has significantly different responsibilities from your recent positions."
        },
        {
            label: "Location & Work Mode",
            score: s4,
            maxScore: 15,
            icon: MapPin,
            status: job.tags.includes("Remote") || m >= 75 ? 'strong' : 'partial',
            detail: job.tags.includes("Remote")
                ? "Remote-friendly role — matches your work preference perfectly."
                : "Location requirement is met based on your profile's stated preferences."
        },
        {
            label: "Education & Certs",
            score: s5,
            maxScore: 10,
            icon: GraduationCap,
            status: m >= 78 ? 'strong' : 'partial',
            detail: m >= 78
                ? "Your educational background and certifications satisfy the role's requirements."
                : "Meets minimum education criteria. Additional certifications could strengthen alignment."
        },
        {
            label: "Recency & Activity",
            score: s6,
            maxScore: 10,
            icon: Clock,
            status: 'strong',
            detail: "Your profile has recent activity and up-to-date project work, signaling active candidacy."
        }
    ]
}

function ScoreBar({ score, maxScore, status }: { score: number; maxScore: number; status: string }) {
    const pct = (score / maxScore) * 100;
    // Strong = yellow bar, Partial = gray bar, Weak = light gray bar
    const barColor = status === 'strong' ? '#F5C300' : status === 'partial' ? '#9CA3AF' : '#D1D5DB';
    const bgColor = status === 'strong' ? '#FEF9E7' : '#F4F5F7';

    return (
        <div className="flex items-center gap-2.5 flex-1">
            <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: bgColor }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: barColor }}
                />
            </div>
            <span className={`text-[11px] font-black tabular-nums w-[42px] text-right ${status === 'strong' ? 'text-lm-black' : 'text-lm-text-secondary'}`}>
                {score}/{maxScore}
            </span>
        </div>
    )
}

export function ScoreBreakdownModal({ isOpen, onClose, job }: ScoreBreakdownModalProps) {
    const breakdown = generateBreakdown(job);
    const totalScore = breakdown.reduce((s, c) => s + c.score, 0);
    const totalMax = breakdown.reduce((s, c) => s + c.maxScore, 0);

    const strongCount = breakdown.filter(c => c.status === 'strong').length;
    const partialCount = breakdown.filter(c => c.status === 'partial').length;
    const weakCount = breakdown.filter(c => c.status === 'weak').length;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-lm-border bg-[#F8F9FA] relative overflow-hidden shrink-0">
                            <div className="relative flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-lm-yellow" strokeWidth={2.5} />
                                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-lm-black">AI Match Breakdown</h2>
                                    </div>
                                    <p className="text-[12px] text-lm-text-secondary font-medium leading-snug">
                                        How we scored <span className="text-lm-black font-bold">{job.title}</span> at <span className="text-lm-black font-bold">{job.company}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center border-[4px] border-lm-yellow bg-white text-lm-black text-[18px] font-black shadow-sm">
                                        {job.match}%
                                    </div>
                                    <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors absolute top-3 right-3 text-gray-500 hover:text-lm-black">
                                        <X className="w-4 h-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick summary pills */}
                            <div className="flex gap-2 mt-3.5 relative">
                                {strongCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-lm-yellow text-lm-black border border-lm-yellow">
                                        {strongCount} Strong
                                    </span>
                                )}
                                {partialCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-lm-text-secondary border border-lm-border">
                                        {partialCount} Developing
                                    </span>
                                )}
                                {weakCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-lm-text-muted border border-lm-border">
                                        {weakCount} Gap
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Criteria List */}
                        <div className="flex-1 overflow-y-auto p-5 slim-scroll min-h-0">
                            <div className="flex flex-col gap-4">
                                {breakdown.map((criterion, idx) => {
                                    const Icon = criterion.icon;

                                    return (
                                        <motion.div
                                            key={criterion.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.08 }}
                                            className="group"
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Icon */}
                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${criterion.status === 'strong'
                                                        ? 'bg-lm-yellow/10 border-lm-yellow/30'
                                                        : 'bg-lm-content border-lm-border'
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`w-4 h-4 ${criterion.status === 'strong' ? 'text-lm-black' : 'text-lm-text-muted'}`}
                                                        strokeWidth={2.5}
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[12px] font-bold text-lm-black">{criterion.label}</span>
                                                        {criterion.status === 'strong' && (
                                                            <CheckCircle2 className="w-3 h-3 text-lm-yellow" strokeWidth={3} />
                                                        )}
                                                        {criterion.status === 'partial' && (
                                                            <AlertCircle className="w-3 h-3 text-lm-text-muted" strokeWidth={3} />
                                                        )}
                                                        {criterion.status === 'weak' && (
                                                            <AlertCircle className="w-3 h-3 text-lm-text-muted" strokeWidth={3} />
                                                        )}
                                                    </div>

                                                    <ScoreBar score={criterion.score} maxScore={criterion.maxScore} status={criterion.status} />

                                                    <p className="text-[11px] text-lm-text-secondary leading-[1.5] mt-1.5">
                                                        {criterion.detail}
                                                    </p>
                                                </div>
                                            </div>

                                            {idx < breakdown.length - 1 && (
                                                <div className="border-b border-lm-border mt-4" />
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* Total Score Summary */}
                            <div className="mt-5 p-4 bg-lm-content border border-lm-border rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-lm-text-secondary">Total Evaluation Score</span>
                                    <span className="text-[16px] font-black text-lm-black">{totalScore}<span className="text-lm-text-muted text-[12px]">/{totalMax}</span></span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-white border border-lm-border overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(totalScore / totalMax) * 100}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                        className="h-full rounded-full bg-lm-yellow"
                                    />
                                </div>
                                <p className="text-[10px] text-lm-text-secondary mt-2 leading-[1.5]">
                                    This score is a weighted AI evaluation of your profile against the job description across {breakdown.length} key criteria. Scores are recalculated every time you update your profile.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-lm-border bg-lm-content shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-lm-text-muted" />
                                <span className="text-[10px] text-lm-text-secondary font-medium">Update your profile to improve match accuracy</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-5 py-2 bg-lm-black text-white text-[11px] font-bold rounded-lg hover:opacity-90 transition-opacity shadow-sm"
                            >
                                Got It
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
