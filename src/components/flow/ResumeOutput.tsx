"use client"

import React, { useState } from 'react'
import { AnalysisResult, ProfileData } from './types'
import {
    Mail, Phone, MapPin, Linkedin, Github,
    Briefcase, GraduationCap, Wrench, FolderGit2,
    Trophy, BadgeCheck, ExternalLink, Target
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Renders text that may contain **bold** markdown as JSX */
function BoldText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                    ? <strong key={i}>{part.slice(2, -2)}</strong>
                    : <span key={i}>{part}</span>
            )}
        </>
    )
}

/** contentEditable span for inline editing */
function EditableSpan({
    value,
    className,
    style,
    block,
}: {
    value: string
    className?: string
    style?: React.CSSProperties
    block?: boolean
}) {
    const Tag = block ? 'div' : 'span'
    return (
        <Tag
            contentEditable
            suppressContentEditableWarning
            spellCheck
            className={className}
            style={{ outline: 'none', minWidth: '2px', ...style }}
        >
            {value}
        </Tag>
    )
}

function EditBtn({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                marginLeft: '8px',
                background: '#000',
                color: '#FFD600',
                border: 'none',
                borderRadius: '3px',
                fontSize: '9px',
                fontWeight: 900,
                padding: '1px 6px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0,
                transition: 'opacity 0.15s ease',
                verticalAlign: 'middle'
            }}
            className="edit-btn"
        >
            ✦ Edit
        </button>
    )
}

// ─────────────────────────────────────────────────────────────
// Section heading
// ─────────────────────────────────────────────────────────────
function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid #000',
            paddingBottom: '3px',
            marginTop: '4px',
            marginBottom: '6px',
        }}>
            {icon}
            <span style={{
                fontSize: '13px',
                fontVariant: 'small-caps',
                fontWeight: 'bold',
                letterSpacing: '0.04em',
            }}>{label}</span>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Editable Section Wrapper
// ─────────────────────────────────────────────────────────────
function EditableSection({
    sectionKey,
    sectionLabel,
    content,
    onEditSection,
    children
}: {
    sectionKey: string
    sectionLabel: string
    content: string
    onEditSection?: (key: string, label: string, content: string, subKey?: string, subIndex?: number) => void
    children: React.ReactNode
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                outline: hovered && onEditSection ? '2px dashed #FFD600' : '2px dashed transparent',
                outlineOffset: '4px',
                borderRadius: '2px',
                transition: 'outline 0.15s ease',
                marginTop: '2px',
                marginBottom: '0px'
            }}
        >
            {/* Edit with AI button */}
            {hovered && onEditSection && (
                <button
                    onClick={() => onEditSection(sectionKey, sectionLabel, content)}
                    style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '0px',
                        background: '#000',
                        color: '#FFD600',
                        border: '2px solid #000',
                        padding: '2px 10px',
                        fontSize: '9px',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        zIndex: 10,
                        whiteSpace: 'nowrap',
                        fontFamily: 'sans-serif'
                    }}
                >
                    ✦ Edit with AI
                </button>
            )}
            {children}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export function ResumeOutput({
    data,
    profileData,
    onEditSection,
}: {
    data: AnalysisResult
    profileData: ProfileData
    onEditSection?: (sectionKey: string, sectionLabel: string, content: string, subKey?: string, subIndex?: number) => void
}) {
    if (!data || !(data as any).personal_info) {
        return (
            <div style={{ padding: '40px', fontFamily: 'sans-serif', color: 'red' }}>
                Error: No resume data received. data={JSON.stringify(data)}
            </div>
        )
    }
    const p: any = data.personal_info || {}

    const fullName = p.full_name || profileData.fullName || 'Your Name'
    const title = p.current_title || profileData.jobTitle || ''
    const email = p.email || profileData.email || ''
    const phone = p.phones?.[0] || ''
    const location = p.location || profileData.city || ''
    const linkedin = p.linkedin || profileData.linkedinUrl || ''
    const github = (p as any).github || ''
    const summary = data.professional_summary || data.optimizedSummary || ''

    const experience = data.work_experience || []
    const education = data.education || []
    const skills = data.core_skills || { technical_skills: [], accounting_tools: [], soft_skills: [] }
    const projects = data.projects || []
    const achievements = data.achievements || []
    const certifications = data.certifications || []


    // Merge skills arrays for display
    const skillsGroups: { label: string; items: string[] }[] = [
        { label: 'Technical Skills', items: skills.technical_skills || [] },
        { label: 'Tools & Software', items: skills.accounting_tools || [] },
        { label: 'Soft Skills', items: skills.soft_skills || [] },
    ].filter(g => g.items.length > 0)

    const pageStyle: React.CSSProperties = {
        fontFamily: 'Georgia, serif',
        maxWidth: '760px',
        margin: '0 auto',
        padding: '40px 48px',
        color: '#111',
        fontSize: '12px',
        lineHeight: 1.5,
        backgroundColor: '#fff',
        minHeight: '1050px',   // at least one page
        height: 'auto',        // grows naturally
        overflow: 'visible'    // never clips
    }

    return (
        <div>

            {/* Resume Paper */}
            <div style={pageStyle} id="resume-paper">

                {/* ── HEADER ── */}
                <div style={{ marginBottom: '8px', marginTop: '8px', paddingBottom: '10px' }}>
                    {/* Name */}
                    <h1 style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',   // ← prevents name breaking to 2 lines
                        margin: '0 0 4px 0'
                    }}>
                        {fullName}
                    </h1>

                    {/* Title */}
                    <p style={{ fontSize: '13px', color: '#444', margin: '0 0 8px 0' }}>
                        {title}
                    </p>

                    {/* Contact row — wraps gracefully */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',      // ← wraps to next line instead of overflowing
                        gap: '8px 16px',       // ← row gap 8px, column gap 16px
                        fontSize: '11px',
                        color: '#444'
                    }}>
                        {email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={11} /> {email}</span>}
                        {phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={11} /> {phone}</span>}
                        {location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {location}</span>}
                        {linkedin && linkedin !== 'Not Provided' && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Linkedin size={11} /> {linkedin}</span>}
                        {github && github !== 'Not Provided' && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Github size={11} /> {github}</span>}
                    </div>
                </div>

                {summary && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #000', marginBottom: '4px' }}>
                        <style>{`
                            *:hover > .edit-btn,
                            .editable-row:hover .edit-btn {
                                opacity: 1 !important;
                            }
                        `}</style>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '0.05em', marginBottom: '4px' }}>
                            <Target size={12} strokeWidth={2.5} />
                            <span>Objective</span>
                        </div>
                        <div className="editable-row">
                            <p style={{ fontSize: '11.5px', lineHeight: 1.6, color: '#222', margin: 0 }}>
                                {summary}
                            </p>
                            <EditBtn onClick={() => onEditSection?.('objective', 'Objective', summary)} />
                        </div>
                    </div>
                )}

                {/* ── EDUCATION ── */}
                {education.length > 0 && (
                    <EditableSection
                        sectionKey="education"
                        sectionLabel="Education"
                        content={education.map(e =>
                            `${e.college} — ${e.degree}${e.specialization ? ` in ${e.specialization}` : ''} (${e.duration || ''})`
                        ).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<GraduationCap size={13} strokeWidth={2.5} />} label="Education" />
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '8px', fontSize: '12px' }}>
                                <div className="editable-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700 }}>{edu.college || edu.specialization}</span>
                                        <EditBtn onClick={() => onEditSection?.('education', edu.college, `${edu.degree} ${(edu as any).gpa || ''}`, '', i)} />
                                    </div>
                                    <EditableSpan value={edu.duration || ''} style={{ fontStyle: 'italic', color: '#555' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <EditableSpan value={`${edu.degree}${edu.specialization ? ` in ${edu.specialization}` : ''}`} style={{ fontStyle: 'italic' }} />
                                    {(edu as any).gpa && (
                                        <EditableSpan value={`CGPA: ${(edu as any).gpa}`} style={{ color: '#555' }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </EditableSection>
                )}

                {/* ── EXPERIENCE ── */}
                {experience.length > 0 && (
                    <EditableSection
                        sectionKey="experience"
                        sectionLabel="Work Experience"
                        content={experience.map(e => `${e.company} - ${e.title}: ${e.bullets.map((b: any) => typeof b === 'string' ? b : b.text).join('. ')}`).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<Briefcase size={13} strokeWidth={2.5} />} label="Experience" />
                        {experience.map((job, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div className="editable-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, fontSize: '12px' }}>{job.company}</span>
                                        <EditBtn onClick={() => onEditSection?.('experience', job.company, job.bullets.map((b: any) => typeof b === 'string' ? b : (b.text || '')).join('. '), String(i), -1)} />
                                    </div>
                                    <EditableSpan
                                        value={`${job.start_date} – ${job.end_date}`}
                                        style={{ fontStyle: 'italic', fontSize: '12px', color: '#555' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#333', marginBottom: '4px' }}>
                                    <EditableSpan value={`${job.title}${(job as any).skills ? ` | ${(job as any).skills}` : ''}`} style={{ fontStyle: 'italic' }} />
                                    <EditableSpan value={job.location || ''} />
                                </div>
                                <ul style={{ margin: '0', paddingLeft: '0', listStyle: 'none' }}>
                                    {(job.bullets || []).map((b, bi) => (
                                        <li key={bi} style={{ marginLeft: '12px', lineHeight: '1.5', marginBottom: '2px' }}>
                                            <div className="editable-row" style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '11.5px', lineHeight: 1.5, flex: 1 }}>
                                                    – <BoldText text={typeof b === 'string' ? b : b.text} />
                                                </span>
                                                <EditBtn onClick={() => onEditSection?.('experience', `Bullet`, typeof b === 'string' ? b : b.text, String(i), bi)} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </EditableSection>
                )}

                {/* ── PROJECTS ── */}
                {projects.length > 0 && (
                    <EditableSection
                        sectionKey="projects"
                        sectionLabel="Projects"
                        content={projects.map(p => `${p.name}: ${p.bullets.map((b: any) => b.text).join('. ')}`).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<FolderGit2 size={13} strokeWidth={2.5} />} label="Projects" />
                        {projects.map((proj, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div className="editable-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, fontSize: '12px' }}>{proj.name}</span>
                                        <EditBtn onClick={() => onEditSection?.('projects', proj.name, proj.bullets?.map((b: any) => b.text).join('. ') || '', String(i), -1)} />
                                    </div>
                                    <EditableSpan
                                        value={proj.start_date && proj.end_date ? `${proj.start_date} – ${proj.end_date}` : (proj.end_date || '')}
                                        style={{ fontStyle: 'italic', fontSize: '12px', color: '#555' }}
                                    />
                                </div>
                                {proj.tech_stack && (
                                    <EditableSpan
                                        value={proj.tech_stack}
                                        block
                                        style={{ fontStyle: 'italic', fontSize: '11px', color: '#555', marginBottom: '2px' }}
                                    />
                                )}
                                {proj.bullets?.length > 0 && proj.bullets.map((b: any, bi: number) => (
                                    <div key={bi} className="editable-row" style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '11.5px', marginLeft: '12px', marginBottom: '3px', lineHeight: 1.5, flex: 1 }}>
                                            – {b.text || b}
                                        </span>
                                        <EditBtn onClick={() => onEditSection?.('projects', `Project Bullet`, b.text || b, String(i), bi)} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </EditableSection>
                )}

                {/* ── TECHNICAL SKILLS ── */}
                {skillsGroups.length > 0 && (
                    <EditableSection
                        sectionKey="skills"
                        sectionLabel="Technical Skills"
                        content={skillsGroups.map(g => `${g.label}: ${g.items.join(', ')}`).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<Wrench size={13} strokeWidth={2.5} />} label="Technical Skills" />
                        {skillsGroups.map((group, i) => (
                            <div key={i} className="editable-row" style={{ fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <strong style={{ fontWeight: 'bold' }}>{group.label}: </strong>
                                <span>{group.items.join(', ')}</span>
                                <EditBtn onClick={() => onEditSection?.('skills', group.label, group.items.join(', '), group.label, 0)} />
                            </div>
                        ))}
                    </EditableSection>
                )}

                {/* ── ACHIEVEMENTS ── */}
                {achievements.length > 0 && (
                    <EditableSection
                        sectionKey="achievements"
                        sectionLabel="Achievements"
                        content={achievements.map(a => `${a.title}: ${a.description}`).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<Trophy size={13} strokeWidth={2.5} />} label="Achievements" />
                        {achievements.map((ach, i) => (
                            <div key={i} style={{ marginBottom: '8px', fontSize: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <EditableSpan value={ach.title} style={{ fontWeight: 'bold' }} />
                                    <EditableSpan value={ach.date || ''} style={{ fontStyle: 'italic', color: '#555' }} />
                                </div>
                                {ach.category && (
                                    <EditableSpan
                                        value={ach.category}
                                        block
                                        style={{ fontStyle: 'italic', fontSize: '11px', color: '#666' }}
                                    />
                                )}
                                <div style={{ display: 'flex', gap: '6px', marginLeft: '12px', lineHeight: '1.5' }}>
                                    <span>–</span>
                                    <EditableSpan value={ach.description} />
                                </div>
                            </div>
                        ))}
                    </EditableSection>
                )}

                {/* ── CERTIFICATIONS ── */}
                {certifications.length > 0 && (
                    <EditableSection
                        sectionKey="certifications"
                        sectionLabel="Certifications"
                        content={certifications.map(c => `${c.name} — ${c.issuer || ''}`).join('\n')}
                        onEditSection={onEditSection}
                    >
                        <SectionHeading icon={<BadgeCheck size={13} strokeWidth={2.5} />} label="Certifications" />
                        {certifications.map((cert, i) => (
                            <div key={i} style={{ fontSize: '12px', marginBottom: '4px', display: 'flex', gap: '4px' }}>
                                •
                                <EditableSpan value={cert.name} style={{ fontWeight: 'bold' }} />
                                {cert.issuer && (
                                    <span style={{ color: '#555' }}>– <EditableSpan value={cert.issuer} /></span>
                                )}
                            </div>
                        ))}
                    </EditableSection>
                )}

            </div>
        </div>
    )
}
