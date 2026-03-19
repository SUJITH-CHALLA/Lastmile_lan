"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowRight, User, Mail, Phone, MapPin, Linkedin, Globe, Briefcase,
    GraduationCap, Plus, Trash2, X, Check, Sparkles, Loader2, ChevronRight,
    Code, Star
} from "lucide-react"
import { ProfileData, WorkExperience, Education, saveProfile, DUMMY_PROFILE } from "./ProfileSection"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls = "w-full bg-white border border-[#E8E9EC] rounded-lg px-3 py-2 text-[12.5px] font-medium text-[#0a0a0a] placeholder:text-gray-400 focus:outline-none focus:border-[#F5C300] focus:ring-2 focus:ring-[#F5C300]/20 transition-all"

function Field({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500">{label}</label>
            {children}
        </div>
    )
}

// ─── Rephrasing simulation ────────────────────────────────────────────────────

const POWER_WORDS: Record<string, string> = {
    "Built": "Engineered",
    "Worked on": "Developed",
    "Helped": "Partnered with senior leadership to deliver",
    "Made": "Architected",
    "Created": "Designed and launched",
    "Improved": "Optimized",
    "Led": "Spearheaded",
    "Owned": "Architected and owned",
    "Wrote": "Authored",
    "Managed": "Orchestrated",
}

const IMPACT_SUFFIXES = [
    ", increasing team velocity by 30%",
    ", cutting page load time by 40%",
    ", directly contributing to revenue growth",
    ", adopted by 6 cross-functional teams",
    " — resulting in measurable business impact",
    ", serving 10M+ daily active users",
]

function simulateRephrase(bullets: string[]): Promise<string[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const rephrased = bullets.map((b, i) => {
                let result = b
                for (const [old, rep] of Object.entries(POWER_WORDS)) {
                    if (result.startsWith(old)) {
                        result = rep + result.slice(old.length)
                        break
                    }
                }
                if (!result.match(/\d+[%MKB₹]/)) {
                    result += IMPACT_SUFFIXES[i % IMPACT_SUFFIXES.length]
                }
                return result
            })
            resolve(rephrased)
        }, 1800)
    })
}

// LandingScreen removed at user request

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2: Profile Builder (Step 1)
// ─────────────────────────────────────────────────────────────────────────────

function ProfileBuilderScreen({ initial, onNext }: { initial: ProfileData, onNext: (d: ProfileData) => void }) {
    const [data, setData] = useState<ProfileData>(initial)
    const [skillInput, setSkillInput] = useState("")
    const [langInput, setLangInput] = useState("")

    const update = (field: keyof ProfileData, value: any) => setData(prev => ({ ...prev, [field]: value }))

    const addExp = () => update("experience", [...data.experience, {
        id: Date.now().toString(), company: "", role: "", startDate: "", endDate: "", current: false, bullets: [""], useRephrased: false
    }])
    const removeExp = (id: string) => update("experience", data.experience.filter(e => e.id !== id))
    const updateExp = (id: string, field: keyof WorkExperience, val: any) =>
        update("experience", data.experience.map(e => e.id === id ? { ...e, [field]: val } : e))
    const updateBullet = (expId: string, idx: number, val: string) =>
        update("experience", data.experience.map(e => e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? val : b) } : e))
    const addBullet = (expId: string) =>
        update("experience", data.experience.map(e => e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e))
    const removeBullet = (expId: string, idx: number) =>
        update("experience", data.experience.map(e => e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e))

    const addEd = () => update("education", [...data.education, {
        id: Date.now().toString(), school: "", degree: "", field: "", startYear: "", endYear: ""
    }])
    const removeEd = (id: string) => update("education", data.education.filter(e => e.id !== id))
    const updateEd = (id: string, field: keyof Education, val: any) =>
        update("education", data.education.map(e => e.id === id ? { ...e, [field]: val } : e))

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#FAFAFA]">
            {/* Progress header */}
            <div className="bg-white border-b border-[#E8E9EC] px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F5C300] flex items-center justify-center font-black text-[13px]">L</div>
                    <span className="font-black text-[15px] uppercase tracking-widest text-[#0a0a0a]">LastMile</span>
                </div>
                <div className="flex items-center gap-2">
                    <StepPill n={1} active label="Profile" />
                    <div className="w-8 h-px bg-[#E8E9EC]" />
                    <StepPill n={2} active={false} label="AI Polish" />
                </div>
                <div className="text-[12px] font-semibold text-gray-400">Step 1 of 2</div>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                <div className="max-w-[700px] mx-auto px-6 py-8">
                    <div className="mb-7">
                        <h1 className="text-[28px] font-black text-[#0a0a0a] tracking-tight">Build your profile</h1>
                        <p className="text-[13px] text-gray-500 mt-1">This becomes your master resume. Fill in your details — the AI will polish it on the next step.</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Personal Info */}
                        <Card title="Personal Information">
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Full Name">
                                    <input className={inputCls} placeholder="Aryan Mehta" value={data.fullName} onChange={e => update("fullName", e.target.value)} />
                                </Field>
                                <Field label="Professional Title">
                                    <input className={inputCls} placeholder="Senior Frontend Engineer" value={data.title} onChange={e => update("title", e.target.value)} />
                                </Field>
                                <Field label="Email">
                                    <input className={inputCls} type="email" placeholder="you@email.com" value={data.email} onChange={e => update("email", e.target.value)} />
                                </Field>
                                <Field label="Phone">
                                    <input className={inputCls} placeholder="+91 98765 43210" value={data.phone} onChange={e => update("phone", e.target.value)} />
                                </Field>
                                <Field label="Location">
                                    <input className={inputCls} placeholder="Bangalore, India" value={data.location} onChange={e => update("location", e.target.value)} />
                                </Field>
                                <Field label="LinkedIn URL">
                                    <input className={inputCls} placeholder="linkedin.com/in/you" value={data.linkedIn} onChange={e => update("linkedIn", e.target.value)} />
                                </Field>
                                <Field label="Portfolio / Website" className="col-span-2">
                                    <input className={inputCls} placeholder="yourportfolio.com" value={data.portfolio} onChange={e => update("portfolio", e.target.value)} />
                                </Field>
                                <Field label="Profile Picture URL" className="col-span-2">
                                    <input className={inputCls} placeholder="https://example.com/photo.jpg" value={data.profilePicture || ""} onChange={e => update("profilePicture", e.target.value)} />
                                </Field>
                                <Field label="Professional Summary" className="col-span-2">
                                    <textarea className={`${inputCls} resize-none h-[80px]`} placeholder="2–3 sentences about your professional identity and what you're looking for..." value={data.summary} onChange={e => update("summary", e.target.value)} />
                                </Field>
                            </div>
                        </Card>

                        {/* Work Experience */}
                        <Card title="Work Experience">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="border border-[#E8E9EC] rounded-xl p-4 mb-3 bg-white relative">
                                    <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <Field label="Company"><input className={inputCls} placeholder="Razorpay" value={exp.company} onChange={e => updateExp(exp.id, "company", e.target.value)} /></Field>
                                        <Field label="Role / Title"><input className={inputCls} placeholder="Frontend Engineer II" value={exp.role} onChange={e => updateExp(exp.id, "role", e.target.value)} /></Field>
                                        <Field label="Start Date"><input className={inputCls} placeholder="Jan 2023" value={exp.startDate} onChange={e => updateExp(exp.id, "startDate", e.target.value)} /></Field>
                                        <Field label="End Date">
                                            <input className={inputCls} placeholder="Present" value={exp.endDate} disabled={exp.current} onChange={e => updateExp(exp.id, "endDate", e.target.value)} />
                                        </Field>
                                    </div>
                                    <label className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 mb-3 cursor-pointer select-none">
                                        <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, "current", e.target.checked)} className="rounded accent-[#F5C300]" /> Currently working here
                                    </label>
                                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 mb-2">Key Achievements</div>
                                    {exp.bullets.map((b, bi) => (
                                        <div key={bi} className="flex items-center gap-2 mb-1.5">
                                            <span className="w-1.5 h-1.5 bg-[#F5C300] rounded-full shrink-0" />
                                            <input className={`${inputCls} flex-1`} placeholder="What did you build, lead, or achieve?" value={b} onChange={e => updateBullet(exp.id, bi, e.target.value)} />
                                            {exp.bullets.length > 1 && (
                                                <button onClick={() => removeBullet(exp.id, bi)} className="p-1 text-gray-400 hover:text-red-500 shrink-0">
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={() => addBullet(exp.id)} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-[#0a0a0a] mt-1 transition-colors">
                                        <Plus className="w-3 h-3" /> Add bullet
                                    </button>
                                </div>
                            ))}
                            <DashedAddButton onClick={addExp} label="Add Work Experience" />
                        </Card>

                        {/* Education */}
                        <Card title="Education">
                            {data.education.map(ed => (
                                <div key={ed.id} className="border border-[#E8E9EC] rounded-xl p-4 mb-3 bg-white relative">
                                    <button onClick={() => removeEd(ed.id)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="School / University" className="col-span-2"><input className={inputCls} placeholder="PES University" value={ed.school} onChange={e => updateEd(ed.id, "school", e.target.value)} /></Field>
                                        <Field label="Degree"><input className={inputCls} placeholder="B.Tech" value={ed.degree} onChange={e => updateEd(ed.id, "degree", e.target.value)} /></Field>
                                        <Field label="Field of Study"><input className={inputCls} placeholder="Computer Science" value={ed.field} onChange={e => updateEd(ed.id, "field", e.target.value)} /></Field>
                                        <Field label="Start Year"><input className={inputCls} placeholder="2017" value={ed.startYear} onChange={e => updateEd(ed.id, "startYear", e.target.value)} /></Field>
                                        <Field label="End Year"><input className={inputCls} placeholder="2021" value={ed.endYear} onChange={e => updateEd(ed.id, "endYear", e.target.value)} /></Field>
                                        <Field label="GPA (optional)"><input className={inputCls} placeholder="8.7 / 10" value={ed.gpa || ""} onChange={e => updateEd(ed.id, "gpa", e.target.value)} /></Field>
                                    </div>
                                </div>
                            ))}
                            <DashedAddButton onClick={addEd} label="Add Education" />
                        </Card>

                        {/* Skills & Languages */}
                        <Card title="Skills & Languages">
                            <Field label="Skills">
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {data.skills.map(s => (
                                        <span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-[#F5C300]/20 border border-[#F5C300]/50 rounded-full text-[11px] font-bold text-[#0a0a0a]">
                                            {s} <button onClick={() => update("skills", data.skills.filter(sk => sk !== s))} className="hover:text-red-500 ml-0.5"><X className="w-2.5 h-2.5" /></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input className={`${inputCls} flex-1`} placeholder="React, Python, Figma..." value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && skillInput.trim()) { update("skills", [...data.skills, skillInput.trim()]); setSkillInput("") } }} />
                                    <button onClick={() => { if (skillInput.trim()) { update("skills", [...data.skills, skillInput.trim()]); setSkillInput("") } }} className="px-4 py-2 bg-[#0a0a0a] text-white rounded-lg text-[12px] font-bold">Add</button>
                                </div>
                            </Field>
                            <Field label="Languages" className="mt-3">
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {data.languages.map(l => (
                                        <span key={l} className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-full text-[11px] font-bold text-[#0a0a0a]">
                                            {l} <button onClick={() => update("languages", data.languages.filter(lg => lg !== l))} className="hover:text-red-500 ml-0.5"><X className="w-2.5 h-2.5" /></button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input className={`${inputCls} flex-1`} placeholder="English, Hindi..." value={langInput} onChange={e => setLangInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && langInput.trim()) { update("languages", [...data.languages, langInput.trim()]); setLangInput("") } }} />
                                    <button onClick={() => { if (langInput.trim()) { update("languages", [...data.languages, langInput.trim()]); setLangInput("") } }} className="px-4 py-2 bg-[#0a0a0a] text-white rounded-lg text-[12px] font-bold">Add</button>
                                </div>
                            </Field>
                        </Card>
                    </div>

                    <div className="flex justify-end mt-8 pb-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNext(data)}
                            className="flex items-center gap-2 px-8 py-4 bg-[#F5C300] text-[#0a0a0a] rounded-2xl font-black text-[14px] shadow-[0_6px_24px_rgba(245,195,0,0.35)]"
                        >
                            Continue to AI Resume Polish <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3: AI Resume Polisher (Step 2 — happens ONCE)
// ─────────────────────────────────────────────────────────────────────────────

function AIPolishScreen({ data, onComplete }: { data: ProfileData, onComplete: (d: ProfileData) => void }) {
    const [profile, setProfile] = useState<ProfileData>(data)
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [doneIds, setDoneIds] = useState<Set<string>>(new Set())
    const [autoRunIdx, setAutoRunIdx] = useState(0)

    // Auto-run rephrase for all experiences sequentially
    useEffect(() => {
        const exps = profile.experience
        if (autoRunIdx < exps.length) {
            const exp = exps[autoRunIdx]
            if (!doneIds.has(exp.id)) {
                triggerRephrase(exp.id)
            }
        }
    }, [autoRunIdx])

    const triggerRephrase = async (expId: string) => {
        const exp = profile.experience.find(e => e.id === expId)
        if (!exp || doneIds.has(expId)) return
        setLoadingId(expId)
        const rephrased = await simulateRephrase(exp.bullets)
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(e =>
                e.id === expId ? { ...e, rephrasedBullets: rephrased, useRephrased: true } : e
            )
        }))
        setLoadingId(null)
        setDoneIds(prev => new Set([...prev, expId]))
        setAutoRunIdx(i => i + 1)
    }

    const toggleVersion = (expId: string, useRephrased: boolean) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === expId ? { ...e, useRephrased } : e)
        }))
    }

    const allDone = doneIds.size >= profile.experience.length

    const handleEnterDashboard = () => {
        const final: ProfileData = { ...profile, profileComplete: true }
        saveProfile(final)
        onComplete(final)
    }

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-[#FAFAFA]">
            {/* Header */}
            <div className="bg-white border-b border-[#E8E9EC] px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#F5C300] flex items-center justify-center font-black text-[13px]">L</div>
                    <span className="font-black text-[15px] uppercase tracking-widest text-[#0a0a0a]">LastMile</span>
                </div>
                <div className="flex items-center gap-2">
                    <StepPill n={1} active={false} label="Profile" done />
                    <div className="w-8 h-px bg-[#E8E9EC]" />
                    <StepPill n={2} active label="AI Polish" />
                </div>
                <div className="text-[12px] font-semibold text-gray-400">Step 2 of 2</div>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                <div className="max-w-[700px] mx-auto px-6 py-8">
                    <div className="mb-7">
                        <div className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-3 py-1.5 rounded-full text-[11px] font-bold mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-[#F5C300]" /> AI Resume Polish — One-Time
                        </div>
                        <h1 className="text-[28px] font-black text-[#0a0a0a] tracking-tight">Polishing your resume with AI</h1>
                        <p className="text-[13px] text-gray-500 mt-1">We're automatically rephrasing your experience bullets with stronger, impact-driven language. Review and choose your preferred version.</p>
                    </div>

                    {/* Live polish cards */}
                    <div className="flex flex-col gap-4">
                        {profile.experience.map((exp, expIdx) => {
                            const isActive = loadingId === exp.id
                            const isDone = doneIds.has(exp.id)
                            const isPending = !isActive && !isDone

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: expIdx * 0.1 }}
                                    className="bg-white border border-[#E8E9EC] rounded-2xl overflow-hidden"
                                >
                                    {/* Card header */}
                                    <div className="px-5 py-4 flex items-center justify-between border-b border-[#E8E9EC] bg-gray-50/60">
                                        <div>
                                            <div className="font-black text-[14px] text-[#0a0a0a]">{exp.role || "Unnamed Role"}</div>
                                            <div className="text-[12px] text-gray-500 font-medium">{exp.company} · {exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                                        </div>
                                        <div className="shrink-0">
                                            {isActive && (
                                                <div className="flex items-center gap-2 text-[12px] font-bold text-[#F5C300] bg-[#F5C300]/10 border border-[#F5C300]/20 px-3 py-1.5 rounded-lg">
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Rephrasing...
                                                </div>
                                            )}
                                            {isDone && (
                                                <div className="flex items-center gap-1.5 text-[12px] font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} /> Polished
                                                </div>
                                            )}
                                            {isPending && (
                                                <div className="text-[11px] font-semibold text-gray-400 animate-pulse">Queued...</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        {/* Original */}
                                        <div
                                            onClick={() => isDone && toggleVersion(exp.id, false)}
                                            className={`rounded-xl p-4 border-2 mb-3 transition-all ${!exp.useRephrased && isDone ? 'border-[#F5C300] bg-[#F5C300]/5 cursor-pointer' : isDone ? 'border-[#E8E9EC] bg-gray-50 cursor-pointer hover:border-gray-300' : 'border-[#E8E9EC] bg-gray-50/50'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                {isDone && (
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${!exp.useRephrased ? 'border-[#F5C300] bg-[#F5C300]' : 'border-gray-300'}`}>
                                                        {!exp.useRephrased && <Check className="w-2.5 h-2.5 text-[#0a0a0a]" strokeWidth={3} />}
                                                    </div>
                                                )}
                                                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Original</span>
                                            </div>
                                            <ul className="space-y-1.5">
                                                {exp.bullets.map((b, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500 leading-relaxed">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />{b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Rephrased */}
                                        <div
                                            onClick={() => isDone && toggleVersion(exp.id, true)}
                                            className={`rounded-xl p-4 border-2 transition-all ${isDone ? (exp.useRephrased ? 'border-[#F5C300] bg-[#F5C300]/5 cursor-pointer' : 'border-[#E8E9EC] bg-gray-50 cursor-pointer hover:border-gray-300') : 'border-dashed border-gray-200 bg-gray-50/30'}`}
                                        >
                                            {isActive ? (
                                                <div className="flex flex-col items-center py-4 gap-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {[0, 1, 2].map(i => (
                                                            <motion.div key={i} className="w-2 h-2 rounded-full bg-[#F5C300]"
                                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[12px] font-semibold text-gray-400">AI is rephrasing...</span>
                                                </div>
                                            ) : isDone && exp.rephrasedBullets ? (
                                                <>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${exp.useRephrased ? 'border-[#F5C300] bg-[#F5C300]' : 'border-gray-300'}`}>
                                                            {exp.useRephrased && <Check className="w-2.5 h-2.5 text-[#0a0a0a]" strokeWidth={3} />}
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#F5C300]">✦ AI Enhanced</span>
                                                    </div>
                                                    <ul className="space-y-1.5">
                                                        {exp.rephrasedBullets.map((b, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-[12px] text-[#0a0a0a] font-medium leading-relaxed">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C300] mt-1.5 shrink-0" />{b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-center py-4 text-[12px] text-gray-400 font-semibold gap-2">
                                                    <Sparkles className="w-4 h-4 text-gray-300" /> Waiting to polish...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* CTA */}
                    <AnimatePresence>
                        {allDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 pb-8 flex flex-col items-center gap-3"
                            >
                                <div className="text-[13px] font-semibold text-gray-500">Your resume has been polished! You can always update it from your Profile.</div>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleEnterDashboard}
                                    className="flex items-center gap-2 px-10 py-4 bg-[#0a0a0a] text-[#F5C300] rounded-2xl font-black text-[15px] shadow-[0_8px_30px_rgba(10,10,10,0.2)]"
                                >
                                    Enter Dashboard <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────────────────────────────────────

function StepPill({ n, active, label, done = false }: { n: number, active: boolean, label: string, done?: boolean }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${done ? 'bg-green-500 text-white' : active ? 'bg-[#F5C300] text-[#0a0a0a]' : 'bg-gray-200 text-gray-500'}`}>
                {done ? <Check className="w-3 h-3" strokeWidth={3} /> : n}
            </div>
            <span className={`text-[12px] font-bold ${active ? 'text-[#0a0a0a]' : 'text-gray-400'}`}>{label}</span>
        </div>
    )
}

function Card({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="bg-white border border-[#E8E9EC] rounded-2xl p-5">
            <div className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#F5C300] rounded" /> {title}
            </div>
            {children}
        </div>
    )
}

function DashedAddButton({ onClick, label }: { onClick: () => void, label: string }) {
    return (
        <button onClick={onClick} className="w-full border-2 border-dashed border-[#E8E9EC] rounded-xl py-3 text-[12px] font-bold text-gray-400 hover:border-[#F5C300] hover:text-[#0a0a0a] transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> {label}
        </button>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export: OnboardingFlow
// ─────────────────────────────────────────────────────────────────────────────

type OnboardingScreen = "build" | "polish"

export function OnboardingFlow({ onComplete }: { onComplete: (profile: ProfileData) => void }) {
    const [screen, setScreen] = useState<OnboardingScreen>("build")
    const [profileDraft, setProfileDraft] = useState<ProfileData | null>(null)

    const handleStep1Done = (data: ProfileData) => {
        setProfileDraft(data)
        setScreen("polish")
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={screen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 min-h-screen"
            >
                {screen === "build" && (
                    <ProfileBuilderScreen
                        initial={DUMMY_PROFILE}
                        onNext={handleStep1Done}
                    />
                )}
                {screen === "polish" && profileDraft && (
                    <AIPolishScreen
                        data={profileDraft}
                        onComplete={onComplete}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    )
}
