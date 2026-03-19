"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    User, Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap,
    Plus, Trash2, ChevronRight, ChevronLeft, Check, Sparkles, RefreshCw,
    Edit3, Download, Share2, Star, Code, Languages, Award, ArrowRight,
    X, Loader2, ExternalLink
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkExperience {
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    current: boolean
    bullets: string[]
    rephrasedBullets?: string[]
    useRephrased?: boolean
}

export interface Education {
    id: string
    school: string
    degree: string
    field: string
    startYear: string
    endYear: string
    gpa?: string
}

export interface ProfileData {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    linkedIn: string
    portfolio: string
    summary: string
    profilePicture?: string // Added profile picture support
    skills: string[]
    languages: string[]
    experience: WorkExperience[]
    education: Education[]
    profileComplete: boolean
}

// ─── Dummy Profile ─────────────────────────────────────────────────────────────

export const DUMMY_PROFILE: ProfileData = {
    fullName: "Aryan Mehta",
    title: "Senior Frontend Engineer",
    email: "aryan.mehta@gmail.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedIn: "linkedin.com/in/aryanmehta",
    portfolio: "aryanmehta.dev",
    summary: "Frontend engineer with 4+ years building scalable, high-performance web apps using React and TypeScript. Passionate about design systems, developer experience, and shipping products users love.",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "Figma", "TailwindCSS", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    languages: ["English", "Hindi", "Kannada"],
    experience: [
        {
            id: "e1",
            company: "Razorpay",
            role: "Frontend Engineer II",
            startDate: "Jan 2023",
            endDate: "",
            current: true,
            bullets: [
                "Built the new checkout flow reducing drop-off by 22%",
                "Led migration of legacy Backbone.js components to React",
                "Owned the design system library used by 8 teams"
            ],
            rephrasedBullets: [
                "Engineered a redesigned checkout experience that reduced payment drop-off by 22%, directly increasing monthly transaction revenue by ₹4.2Cr",
                "Spearheaded migration of 60,000+ lines of legacy Backbone.js code to a modern React + TypeScript architecture, cutting build times by 40%",
                "Architected and owned a company-wide design system library adopted by 8 cross-functional product teams, enabling consistent UI delivery at scale"
            ],
            useRephrased: true
        }
    ],
    education: [
        {
            id: "ed1",
            school: "PES University",
            degree: "B.Tech",
            field: "Computer Science & Engineering",
            startYear: "2017",
            endYear: "2021",
            gpa: "8.7 / 10"
        }
    ],
    profileComplete: true
}

// ─── LocalStorage helpers ──────────────────────────────────────────────────────

const STORAGE_KEY = "lm_profile_v1"

export function loadProfile(): ProfileData | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch { }
    return null
}

export function saveProfile(data: ProfileData) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch { }
}

// ─── Profile Editor (Simplified, No AI Polish) ──────────────────────────────────

function ProfileEditor({ initial, onSave, onCancel }: { initial: ProfileData, onSave: (data: ProfileData) => void, onCancel: () => void }) {
    const [data, setData] = useState<ProfileData>(initial)
    const [skillInput, setSkillInput] = useState("")
    const [langInput, setLangInput] = useState("")

    const update = (field: keyof ProfileData, value: any) => setData(prev => ({ ...prev, [field]: value }))

    const addExperience = () => {
        const newExp: WorkExperience = {
            id: Date.now().toString(),
            company: "", role: "", startDate: "", endDate: "",
            current: false, bullets: [""]
        }
        update("experience", [...data.experience, newExp])
    }

    const updateExp = (id: string, field: keyof WorkExperience, value: any) => {
        update("experience", data.experience.map(e => e.id === id ? { ...e, [field]: value } : e))
    }

    const removeExp = (id: string) => update("experience", data.experience.filter(e => e.id !== id))

    const addBullet = (expId: string) => {
        update("experience", data.experience.map(e =>
            e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e
        ))
    }

    const updateBullet = (expId: string, idx: number, val: string) => {
        update("experience", data.experience.map(e =>
            e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? val : b) } : e
        ))
    }

    const removeBullet = (expId: string, idx: number) => {
        update("experience", data.experience.map(e =>
            e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
        ))
    }

    const addEducation = () => {
        const newEd: Education = {
            id: Date.now().toString(),
            school: "", degree: "", field: "", startYear: "", endYear: ""
        }
        update("education", [...data.education, newEd])
    }

    const updateEd = (id: string, field: keyof Education, value: any) => {
        update("education", data.education.map(e => e.id === id ? { ...e, [field]: value } : e))
    }

    const removeEd = (id: string) => update("education", data.education.filter(e => e.id !== id))

    const addSkill = () => {
        const s = skillInput.trim()
        if (s && !data.skills.includes(s)) update("skills", [...data.skills, s])
        setSkillInput("")
    }

    const addLang = () => {
        const l = langInput.trim()
        if (l && !data.languages.includes(l)) update("languages", [...data.languages, l])
        setLangInput("")
    }

    return (
        <div className="flex-1 overflow-y-auto slim-scroll bg-lm-content">
            <div className="max-w-[760px] mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-[24px] font-black text-lm-black tracking-tight">Edit Profile</h1>
                        <p className="text-[13px] text-lm-text-secondary mt-1">Update your professional identity and master resume.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-gray-500 hover:text-lm-black hover:bg-white border border-transparent hover:border-lm-border transition-all">
                            Cancel
                        </button>
                        <button onClick={() => onSave(data)} className="px-6 py-2.5 bg-lm-black text-lm-yellow rounded-xl text-[13px] font-bold hover:scale-[1.02] transition-transform shadow-md">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <Section title="Personal Information">
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Full Name"><input className={inputCls} value={data.fullName} onChange={e => update("fullName", e.target.value)} /></Field>
                            <Field label="Professional Title"><input className={inputCls} value={data.title} onChange={e => update("title", e.target.value)} /></Field>
                            <Field label="Email"><input className={inputCls} value={data.email} onChange={e => update("email", e.target.value)} /></Field>
                            <Field label="Phone"><input className={inputCls} value={data.phone} onChange={e => update("phone", e.target.value)} /></Field>
                            <Field label="Location"><input className={inputCls} value={data.location} onChange={e => update("location", e.target.value)} /></Field>
                            <Field label="LinkedIn"><input className={inputCls} value={data.linkedIn} onChange={e => update("linkedIn", e.target.value)} /></Field>
                            <Field label="Portfolio" className="col-span-2"><input className={inputCls} value={data.portfolio} onChange={e => update("portfolio", e.target.value)} /></Field>
                            <Field label="Profile Picture URL" className="col-span-2">
                                <input className={inputCls} placeholder="https://example.com/photo.jpg" value={data.profilePicture || ""} onChange={e => update("profilePicture", e.target.value)} />
                            </Field>
                        </div>
                        <Field label="Professional Summary" className="mt-3">
                            <textarea className={`${inputCls} resize-none h-[90px]`} value={data.summary} onChange={e => update("summary", e.target.value)} />
                        </Field>
                    </Section>

                    <Section title="Work Experience">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="border border-lm-border rounded-xl p-4 mb-3 bg-white relative">
                                <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <Field label="Company"><input className={inputCls} value={exp.company} onChange={e => updateExp(exp.id, "company", e.target.value)} /></Field>
                                    <Field label="Role"><input className={inputCls} value={exp.role} onChange={e => updateExp(exp.id, "role", e.target.value)} /></Field>
                                    <Field label="Start"><input className={inputCls} value={exp.startDate} onChange={e => updateExp(exp.id, "startDate", e.target.value)} /></Field>
                                    <Field label="End"><input className={inputCls} value={exp.endDate} disabled={exp.current} onChange={e => updateExp(exp.id, "endDate", e.target.value)} /></Field>
                                </div>
                                <label className="flex items-center gap-2 text-[11px] font-semibold text-lm-text-secondary mb-3 cursor-pointer">
                                    <input type="checkbox" checked={exp.current} onChange={e => updateExp(exp.id, "current", e.target.checked)} className="rounded" /> I currently work here
                                </label>
                                <div className="space-y-2">
                                    {exp.bullets.map((bullet, bIdx) => (
                                        <div key={bIdx} className="flex items-start gap-2">
                                            <input className={`${inputCls} flex-1`} value={bullet} onChange={e => updateBullet(exp.id, bIdx, e.target.value)} />
                                            {exp.bullets.length > 1 && <button onClick={() => removeBullet(exp.id, bIdx)} className="p-1 text-gray-400 hover:text-red-500 mt-0.5"><X className="w-3.5 h-3.5" /></button>}
                                        </div>
                                    ))}
                                    <button onClick={() => addBullet(exp.id)} className="text-[11px] font-bold text-secondary flex items-center gap-1 mt-1 transition-colors"><Plus className="w-3 h-3" /> Add bullet</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={addExperience} className="w-full border-2 border-dashed border-lm-border rounded-xl py-3 text-[12px] font-bold text-lm-text-secondary hover:border-lm-yellow hover:text-lm-black flex items-center justify-center gap-2 transition-colors">
                            <Plus className="w-4 h-4" /> Add Experience
                        </button>
                    </Section>

                    <Section title="Education">
                        {data.education.map((ed) => (
                            <div key={ed.id} className="border border-lm-border rounded-xl p-4 mb-3 bg-white relative">
                                <button onClick={() => removeEd(ed.id)} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="School" className="col-span-2"><input className={inputCls} value={ed.school} onChange={e => updateEd(ed.id, "school", e.target.value)} /></Field>
                                    <Field label="Degree"><input className={inputCls} value={ed.degree} onChange={e => updateEd(ed.id, "degree", e.target.value)} /></Field>
                                    <Field label="Field"><input className={inputCls} value={ed.field} onChange={e => updateEd(ed.id, "field", e.target.value)} /></Field>
                                    <Field label="Start"><input className={inputCls} value={ed.startYear} onChange={e => updateEd(ed.id, "startYear", e.target.value)} /></Field>
                                    <Field label="End"><input className={inputCls} value={ed.endYear} onChange={e => updateEd(ed.id, "endYear", e.target.value)} /></Field>
                                </div>
                            </div>
                        ))}
                        <button onClick={addEducation} className="w-full border-2 border-dashed border-lm-border rounded-xl py-3 text-[12px] font-bold text-lm-text-secondary hover:border-lm-yellow hover:text-lm-black flex items-center justify-center gap-2 transition-colors">
                            <Plus className="w-4 h-4" /> Add Education
                        </button>
                    </Section>

                    <Section title="Skills & Languages">
                        <Field label="Skills">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {data.skills.map(s => (
                                    <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-lm-yellow/20 border border-lm-yellow text-lm-black rounded-full text-[11px] font-bold">
                                        {s} <button onClick={() => update("skills", data.skills.filter(sk => sk !== s))} className="hover:text-red-500"><X className="w-2.5 h-2.5" /></button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input className={`${inputCls} flex-1`} placeholder="Add skill..." value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} />
                                <button onClick={addSkill} className="px-4 py-2 bg-lm-black text-white rounded-lg text-[12px] font-bold">Add</button>
                            </div>
                        </Field>
                    </Section>
                </div>
            </div>
        </div>
    )
}

// ─── Digital Resume View ───────────────────────────────────────────────────────

function DigitalResume({ profile, onEdit }: { profile: ProfileData, onEdit: () => void }) {
    const initials = profile.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

    return (
        <div className="flex-1 overflow-y-auto slim-scroll bg-lm-content">
            <div className="max-w-[900px] mx-auto px-6 py-8">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-[22px] font-black text-lm-black">Your Digital Resume</h1>
                        <p className="text-[12px] text-lm-text-secondary mt-0.5">This is how hiring teams see your profile</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-lm-border rounded-xl text-[12px] font-bold text-lm-black hover:border-lm-yellow transition-colors"
                        >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-lm-yellow text-lm-black rounded-xl text-[12px] font-bold hover:scale-[1.02] transition-transform shadow-sm">
                            <Download className="w-3.5 h-3.5" /> Export PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-[280px_1fr] gap-5 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white border border-lm-border rounded-2xl p-5 text-center">
                            {profile.profilePicture ? (
                                <img src={profile.profilePicture} alt={profile.fullName} className="w-[88px] h-[88px] rounded-full object-cover mx-auto mb-3 shadow-lg border-2 border-lm-yellow" />
                            ) : (
                                <div className="w-[88px] h-[88px] rounded-full bg-lm-black flex items-center justify-center text-[28px] font-black text-lm-yellow mx-auto mb-3 shadow-lg">
                                    {initials}
                                </div>
                            )}
                            <div className="font-black text-[18px] text-lm-black leading-tight">{profile.fullName}</div>
                            <div className="text-[12px] text-lm-text-secondary font-semibold mt-0.5">{profile.title}</div>
                            <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-lm-text-secondary">
                                <MapPin className="w-3 h-3" /> {profile.location}
                            </div>
                        </div>

                        <div className="bg-white border border-lm-border rounded-2xl p-4">
                            <SectionTitle>Contact</SectionTitle>
                            <div className="flex flex-col gap-2.5 mt-3">
                                {profile.email && <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={profile.email} />}
                                {profile.phone && <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={profile.phone} />}
                                {profile.linkedIn && <ContactRow icon={<Linkedin className="w-3.5 h-3.5" />} value={profile.linkedIn} link={`https://${profile.linkedIn}`} />}
                                {profile.portfolio && <ContactRow icon={<Globe className="w-3.5 h-3.5" />} value={profile.portfolio} link={`https://${profile.portfolio}`} />}
                            </div>
                        </div>

                        {profile.skills.length > 0 && (
                            <div className="bg-white border border-lm-border rounded-2xl p-4">
                                <SectionTitle>Skills</SectionTitle>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {profile.skills.map(s => (
                                        <span key={s} className="px-2.5 py-1 bg-lm-yellow/15 border border-lm-yellow/40 text-lm-black rounded-lg text-[11px] font-bold">{s}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                        {profile.summary && (
                            <div className="bg-white border border-lm-border rounded-2xl p-5">
                                <SectionTitle>Professional Summary</SectionTitle>
                                <p className="text-[13px] text-lm-text-secondary leading-[1.75] mt-3">{profile.summary}</p>
                            </div>
                        )}

                        {profile.experience.length > 0 && (
                            <div className="bg-white border border-lm-border rounded-2xl p-5">
                                <SectionTitle>Work Experience</SectionTitle>
                                <div className="flex flex-col gap-5 mt-4">
                                    {profile.experience.map((exp, i) => {
                                        const bullets = exp.useRephrased && exp.rephrasedBullets ? exp.rephrasedBullets : exp.bullets
                                        return (
                                            <div key={exp.id} className={i > 0 ? "pt-5 border-t border-lm-border" : ""}>
                                                <div className="flex items-start justify-between mb-1.5">
                                                    <div>
                                                        <div className="font-black text-[15px] text-lm-black">{exp.role}</div>
                                                        <div className="text-[12px] font-bold text-lm-text-secondary">{exp.company}</div>
                                                    </div>
                                                    <div className="text-[11px] font-semibold text-lm-text-secondary bg-lm-content border border-lm-border px-2.5 py-1 rounded-full whitespace-nowrap">
                                                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                                                    </div>
                                                </div>
                                                <ul className="space-y-1.5 mt-1">
                                                    {bullets.map((b, bi) => (
                                                        <li key={bi} className="flex items-start gap-2 text-[12.5px] text-lm-text-secondary leading-relaxed">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-lm-yellow mt-1.5 shrink-0" />
                                                            {b}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {profile.education.length > 0 && (
                            <div className="bg-white border border-lm-border rounded-2xl p-5">
                                <SectionTitle>Education</SectionTitle>
                                <div className="flex flex-col gap-4 mt-4">
                                    {profile.education.map((ed, i) => (
                                        <div key={ed.id} className={i > 0 ? "pt-4 border-t border-lm-border" : ""}>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="font-black text-[14px] text-lm-black">{ed.school}</div>
                                                    <div className="text-[12px] font-semibold text-lm-text-secondary mt-0.5">{ed.degree} in {ed.field}</div>
                                                </div>
                                                <div className="text-[11px] font-semibold text-lm-text-secondary bg-lm-content border border-lm-border px-2.5 py-1 rounded-full whitespace-nowrap">
                                                    {ed.startYear} – {ed.endYear}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Small Reusable UI Helpers ─────────────────────────────────────────────────

const inputCls = "w-full bg-lm-content border border-lm-border rounded-lg px-3 py-2 text-[12.5px] font-medium text-lm-black placeholder:text-gray-400 focus:outline-none focus:border-lm-yellow transition-colors"

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="bg-white border border-lm-border rounded-2xl p-5">
            <h2 className="font-black text-[14px] text-lm-black uppercase tracking-wide mb-4">{title}</h2>
            {children}
        </div>
    )
}

function Field({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-[10.5px] font-bold uppercase tracking-wider text-lm-text-secondary">{label}</label>
            {children}
        </div>
    )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className={`text-[11px] font-black uppercase tracking-widest text-lm-text-secondary flex items-center gap-2`}>
            <span className={`w-3 h-[2px] bg-lm-yellow rounded-full`} />
            {children}
        </div>
    )
}

function ContactRow({ icon, value, link }: { icon: React.ReactNode, value: string, link?: string }) {
    const content = (
        <div className="flex items-center gap-2 text-[11.5px] font-medium text-lm-text-secondary">
            <span className="text-gray-400 shrink-0">{icon}</span>
            <span className="truncate">{value}</span>
        </div>
    )
    if (link) return <a href={link} target="_blank" rel="noreferrer" className="hover:text-lm-black transition-colors">{content}</a>
    return content
}

// ─── Main Export: ProfileSection ───────────────────────────────────────────────

export function ProfileSection() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const saved = loadProfile()
        setProfileData(saved || DUMMY_PROFILE)
    }, [])

    if (!profileData) return null

    const handleSave = (data: ProfileData) => {
        saveProfile(data)
        setProfileData(data)
        setIsEditing(false)
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isEditing ? "edit" : "view"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
                {isEditing ? (
                    <ProfileEditor
                        initial={profileData}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <DigitalResume
                        profile={profileData}
                        onEdit={() => setIsEditing(true)}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    )
}
