"use client"

import { Check, X, Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export type Job = {
    id: string;
    title: string;
    company: string;
    logo: string;
    logoBg: string;
    match: number;
    salary: string;
    tags: string[];
    time: string;
    selected?: boolean;
}

interface JobCardProps {
    job: Job;
    onClick: () => void;
    isSaved?: boolean;
    onSave?: (e: React.MouseEvent) => void;
}

export function JobCard({ job, onClick, isSaved = false, onSave }: JobCardProps) {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [job.logo]);

    // Compute circle circumference and offset based on match percentage
    const r = 14;
    const circumference = 2 * Math.PI * r;
    const strokeDashoffset = circumference - (job.match / 100) * circumference;

    return (
        <div
            onClick={onClick}
            className={`bg-white border-[1.5px] rounded-xl p-[13px] mb-[7px] cursor-pointer transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#ccc]
        ${job.selected ? "border-lm-yellow bg-lm-yellow-light drop-shadow-sm" : "border-lm-border"}
      `}
        >
            {job.time && (
                <div className="inline-flex items-center gap-[3px] bg-lm-content text-lm-text-primary text-[9.5px] font-semibold px-[7px] py-[2px] rounded-full mb-1.5 border border-lm-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-lm-yellow inline-block"></span>
                    {job.time}
                </div>
            )}

            <div className="flex items-start gap-[9px] mb-[7px]">
                <div
                    className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[12px] font-extrabold shrink-0 border border-lm-border overflow-hidden"
                    style={{ background: job.logoBg, color: job.logoBg === '#FFFFFF' ? '#0a0a0a' : 'white' }}
                >
                    {(job.logo.startsWith('/') || job.logo.startsWith('http')) && !imageError ? (
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-contain p-1"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        job.company.charAt(0).toUpperCase()
                    )}
                </div>

                <div className="flex-1">
                    <div className="text-[13px] font-bold leading-[1.2] text-lm-black">{job.title}</div>
                    <div className="text-[11px] text-lm-text-secondary mt-px">{job.company}</div>
                </div>

                <div className="w-[34px] h-[34px] shrink-0 relative flex items-center justify-center">
                    <svg className="absolute top-0 left-0 -rotate-90" width="34" height="34" viewBox="0 0 34 34">
                        <circle cx="17" cy="17" r="14" fill="none" stroke="#E8E9EC" strokeWidth="2.5" />
                        <circle
                            cx="17"
                            cy="17"
                            r="14"
                            fill="none"
                            stroke="#F5C300"
                            strokeWidth="2.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-in-out"
                        />
                    </svg>
                    <span className="text-[9px] font-extrabold text-lm-text-primary z-10 relative">
                        {job.match}%
                    </span>
                </div>
            </div>

            <div className="text-xs font-bold mb-1.5 text-lm-black">{job.salary}</div>

            <div className="flex flex-wrap gap-[3px] mb-[4px]">
                {job.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-[7px] py-[2px] rounded-full text-[10px] font-medium bg-lm-content text-lm-text-secondary border border-transparent hover:border-lm-border transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-lm-content">
                <button
                    onClick={onSave}
                    className={`flex items-center gap-1.5 transition-colors ${isSaved ? 'text-lm-black font-bold' : 'text-lm-text-secondary hover:text-lm-black'}`} title="Save for later"
                >
                    <Bookmark className="w-[14px] h-[14px]" strokeWidth={isSaved ? 2.5 : 2} fill={isSaved ? "currentColor" : "none"} />
                    <span className="text-[10px] font-semibold">{isSaved ? "Saved" : "Save"}</span>
                </button>
                <div className="text-[10px] font-bold text-lm-text-primary flex items-center gap-1">
                    Details <span className="text-[8px]">▶</span>
                </div>
            </div>
        </div>
    )
}
