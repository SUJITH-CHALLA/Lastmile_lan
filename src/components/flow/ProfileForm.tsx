"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ProfileData } from './types'
import {
    User, Briefcase, Target, Upload, Check,
    ChevronRight, Sparkles, LinkIcon
} from 'lucide-react'

// ── Constants ──
const INDUSTRIES = [
    "Information Technology", "Banking & Finance", "Healthcare", "EdTech",
    "Consulting", "E-Commerce", "Manufacturing", "Retail",
    "Media & Entertainment", "Automotive", "Telecom", "Other"
]

const STAGGER_DELAY = 0.06
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function ProfileForm({ onContinue }: { onContinue: (data: ProfileData) => void }) {
    const [fullName, setFullName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState(2)
    const [industry, setIndustry] = useState('')
    const [targetRole, setTargetRole] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Validation — each field checked individually for clarity
    const nameValid = fullName.trim().length > 0
    const titleValid = jobTitle.trim().length > 0
    const industryValid = industry.length > 0
    const roleValid = targetRole.trim().length > 0
    const fileValid = resumeFile !== null

    // TEMPORARY: Allow skipping other profile fields to quickly test resume analysis
    const isValid = fileValid

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            setResumeFile(file)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setResumeFile(file)
        }
        // Reset file input value so re-selecting the same file works
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setResumeFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async () => {
        if (!isValid || !resumeFile) return

        // No client-side extraction — the backend (pdf-parse / mammoth) handles it.
        // Just pass the raw file through so AIProcessing can send it via FormData.
        onContinue({
            fullName: fullName.trim() || 'Test User',
            jobTitle: jobTitle.trim() || 'Software Engineer',
            yearsOfExperience,
            industry: industry || 'Information Technology',
            targetRole: targetRole.trim() || 'Senior Software Engineer',
            linkedinUrl: linkedinUrl.trim() || undefined,
            resumeFile,
            resumeText: '', // will be extracted server-side
        })
    }


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: STAGGER_DELAY,
                delayChildren: 0.1,
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: EASE_EXPO }
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* ── Top Bar ── */}
            <div className="h-16 border-b-2 border-black bg-white flex items-center justify-between px-8 md:px-16 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black flex items-center justify-center rounded-lg shadow-neo-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-black text-sm uppercase tracking-tighter">LastMile</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Profile Builder</span>
            </div>

            {/* ── Main Content ── */}
            <div className="flex-1 overflow-y-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-20"
                >
                    {/* ── Headline ── */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                            BUILD YOUR <br />
                            <span className="bg-primary px-2">PROFILE.</span>
                        </h1>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-4">
                            Fill in your details and upload your resume. AI-E does the rest.
                        </p>
                    </motion.div>

                    {/* ── Form Fields ── */}
                    <div className="space-y-8">
                        {/* TEMPORARILY DISABLED: Hide unnecessary form fields while focusing on Resume Analysis */}
                        {false && (
                            <>
                        {/* Full Name */}
                        <motion.div variants={itemVariants}>
                            <FloatInput
                                label="Full Name"
                                icon={User}
                                value={fullName}
                                onChange={(val) => setFullName(val)}
                                placeholder="Sujith Challa"
                                required
                            />
                        </motion.div>

                        {/* Job Title / Current Role */}
                        <motion.div variants={itemVariants}>
                            <FloatInput
                                label="Job Title / Current Role"
                                icon={Briefcase}
                                value={jobTitle}
                                onChange={(val) => setJobTitle(val)}
                                placeholder="Software Engineer"
                                required
                            />
                        </motion.div>

                        {/* Years of Experience — Slider */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black">
                                Years of Experience
                            </label>
                            <div className="flex items-center gap-6">
                                <div className="flex-1 relative">
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        value={yearsOfExperience}
                                        onChange={(e) => setYearsOfExperience(parseFloat(e.target.value))}
                                        className="w-full h-3 bg-gray-100 border-2 border-black rounded-full appearance-none cursor-pointer accent-primary
                                            [&::-webkit-slider-thumb]:appearance-none
                                            [&::-webkit-slider-thumb]:w-6
                                            [&::-webkit-slider-thumb]:h-6
                                            [&::-webkit-slider-thumb]:bg-primary
                                            [&::-webkit-slider-thumb]:border-2
                                            [&::-webkit-slider-thumb]:border-black
                                            [&::-webkit-slider-thumb]:rounded-full
                                            [&::-webkit-slider-thumb]:shadow-neo-sm
                                            [&::-webkit-slider-thumb]:cursor-pointer
                                            [&::-webkit-slider-thumb]:hover:scale-110
                                            [&::-webkit-slider-thumb]:transition-transform
                                        "
                                    />
                                </div>
                                <div className="bg-black text-primary px-4 py-2 font-black text-lg rounded-xl shadow-neo-sm min-w-[80px] text-center border-2 border-black">
                                    {yearsOfExperience}<span className="text-[9px] ml-1 uppercase tracking-widest text-gray-400">yr</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Industry — Dropdown */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black">
                                Industry *
                            </label>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="w-full border-2 border-black p-4 font-black shadow-neo-sm rounded-2xl outline-none bg-white focus:bg-primary/5 transition-colors cursor-pointer"
                            >
                                <option value="">Select your industry</option>
                                {INDUSTRIES.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Target Role */}
                        <motion.div variants={itemVariants}>
                            <FloatInput
                                label="Target Role"
                                icon={Target}
                                value={targetRole}
                                onChange={(val) => setTargetRole(val)}
                                placeholder="Senior Frontend Engineer"
                                required
                            />
                        </motion.div>

                        {/* LinkedIn URL — Optional */}
                        <motion.div variants={itemVariants}>
                            <FloatInput
                                label="LinkedIn URL"
                                icon={LinkIcon}
                                value={linkedinUrl}
                                onChange={(val) => setLinkedinUrl(val)}
                                placeholder="linkedin.com/in/your-profile"
                                optional
                            />
                        </motion.div>
                            </>
                        )}

                        {/* ── Resume Upload Zone ── */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black mb-3 block">
                                Upload Your Resume *
                            </label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-10 md:p-14 transition-all cursor-pointer group ${
                                    isDragOver
                                        ? 'border-primary bg-primary/5 shadow-neo-sm scale-[1.01]'
                                        : resumeFile
                                            ? 'border-black bg-primary/5'
                                            : 'border-black/30 bg-gray-50 hover:border-black hover:bg-white'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    accept=".pdf,.docx,.txt"
                                />
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className={`w-16 h-16 rounded-2xl border-2 border-black shadow-neo-sm flex items-center justify-center transition-colors ${
                                        resumeFile ? 'bg-primary' : 'bg-white group-hover:bg-primary/10'
                                    }`}>
                                        {resumeFile ? (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", damping: 12 }}
                                            >
                                                <Check className="w-8 h-8 text-black" />
                                            </motion.div>
                                        ) : (
                                            <Upload className="w-8 h-8 text-black" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black uppercase tracking-tight">
                                            {resumeFile ? resumeFile.name : 'Click or drop your resume here'}
                                        </p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                            {resumeFile
                                                ? `${(resumeFile.size / 1024).toFixed(1)} KB — Ready for AI processing`
                                                : 'Supports PDF, DOCX, TXT — Max 5MB'}
                                        </p>
                                    </div>
                                    {resumeFile && (
                                        <button
                                            onClick={handleRemoveFile}
                                            className="bg-black text-white px-6 py-2 rounded-full font-black text-xs uppercase shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all"
                                        >
                                            Remove File
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Validation Status (visible when partial) ── */}
                        {(!isValid && (nameValid || titleValid || industryValid || roleValid || fileValid)) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                            >
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Required Fields</p>
                                <div className="flex flex-wrap gap-2">
                                    <ValidationPill label="Name" valid={nameValid} />
                                    <ValidationPill label="Job Title" valid={titleValid} />
                                    <ValidationPill label="Industry" valid={industryValid} />
                                    <ValidationPill label="Target Role" valid={roleValid} />
                                    <ValidationPill label="Resume" valid={fileValid} />
                                </div>
                            </motion.div>
                        )}

                        {/* ── Continue Button ── */}
                        <motion.div variants={itemVariants} className="pt-8">
                            <button
                                onClick={handleSubmit}
                                disabled={!isValid}
                                className={`w-full py-5 font-black uppercase tracking-tight text-lg border-2 border-black rounded-2xl transition-all flex items-center justify-center gap-3 ${
                                    isValid
                                        ? 'bg-black text-primary shadow-neo hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-neo-lg active:translate-x-0 active:translate-y-0 active:shadow-neo-sm'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none border-gray-200'
                                }`}
                            >
                                Continue
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════
// Sub-component: FloatInput (Neo-Brutalism style)
// ══════════════════════════════════════════════════════════════
function FloatInput({
    label, icon: Icon, value, onChange, placeholder, type = "text", required, optional
}: {
    label: string
    icon: React.ElementType
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: string
    required?: boolean
    optional?: boolean
}) {
    return (
        <div className="space-y-3 group">
            <label className="text-[10px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                {label} {required && '*'}
                {optional && <span className="text-gray-500 font-bold normal-case tracking-normal text-[9px]">(optional)</span>}
            </label>
            <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white border-2 border-black p-4 pl-14 font-black shadow-neo-sm rounded-2xl outline-none
                        focus:bg-primary/5 focus:shadow-neo transition-all
                        placeholder:text-gray-200 placeholder:font-bold"
                />
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════
// Sub-component: Validation Pill
// ══════════════════════════════════════════════════════════════
function ValidationPill({ label, valid }: { label: string; valid: boolean }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-[9px] font-black uppercase rounded-lg border transition-colors ${
            valid
                ? 'bg-primary/10 border-primary/30 text-black'
                : 'bg-gray-100 border-gray-200 text-gray-400'
        }`}>
            {valid ? <Check className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border-2 border-gray-300 inline-block" />}
            {label}
        </span>
    )
}
