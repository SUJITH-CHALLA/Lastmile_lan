"use client"

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding: '40 48',
        fontFamily: 'Times-Roman',
        fontSize: 10,
        color: '#111111',
        backgroundColor: '#FFFFFF',
        lineHeight: 1.5,
    },
    // Main Header Area
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.5,
        borderBottomColor: '#000000',
        paddingBottom: 10,
        marginBottom: 2,
    },
    headerLeft: {
        flex: 1,
        paddingRight: 20,
    },
    headerRight: {
        alignItems: 'flex-end',
        fontSize: 10,
        lineHeight: 1.6,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 3,
    },
    title: {
        fontSize: 11,
        color: '#444444',
        marginBottom: 2,
    },
    summaryText: {
        fontSize: 10,
        color: '#444444',
        lineHeight: 1.4,
    },
    // Section Styles
    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 3,
        marginTop: 16,
        marginBottom: 8,
    },
    sectionHeadingText: {
        fontSize: 11,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    // Experience / Education Entries
    entry: {
        marginBottom: 8,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    entryTitle: {
        fontFamily: 'Times-Bold',
        fontSize: 10,
    },
    entryDate: {
        fontFamily: 'Times-Italic',
        fontSize: 10,
        color: '#555555',
    },
    entrySubTitle: {
        fontFamily: 'Times-Italic',
        fontSize: 9.5,
        color: '#333333',
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 12,
        marginTop: 2,
    },
    bulletDot: {
        width: 10,
        fontSize: 9.5,
    },
    bulletText: {
        flex: 1,
        fontSize: 9.5,
        lineHeight: 1.5,
    },
    // Technical Skills
    skillRow: {
        flexDirection: 'row',
        marginBottom: 4,
        fontSize: 10,
    },
    skillLabel: {
        fontFamily: 'Times-Bold',
    },
    skillText: {
        flex: 1,
    },
})

export function ResumePDF({ data, profileData }: { data: any, profileData: any }) {
    if (!data || !data.personal_info) return null
    const p = data.personal_info || {}
    const fullName = p.full_name || profileData.fullName || 'Your Name'
    const currentTitle = p.current_title || profileData.jobTitle || ''
    const email = p.email || profileData.email || ''
    const phone = p.phones?.[0] || ''
    const location = p.location || profileData.city || ''
    const linkedin = p.linkedin || profileData.linkedinUrl || ''
    const github = p.github || ''
    const summary = data.professional_summary || data.optimizedSummary || ''

    const experience = data.work_experience || []
    const education = data.education || []
    const skills = data.core_skills || { technical_skills: [], accounting_tools: [], soft_skills: [] }
    const projects = data.projects || []
    const achievements = data.achievements || []
    const certifications = data.certifications || []

    const skillsGroups = [
        { label: 'Technical Skills', items: skills.technical_skills || [] },
        { label: 'Tools & Software', items: skills.accounting_tools || [] },
        { label: 'Soft Skills', items: skills.soft_skills || [] },
    ].filter(g => g.items.length > 0)

    const removeMarkup = (text: string) => (text || '').replace(/\*\*/g, '')

    return (
        <Document title={`${fullName.replace(/\\s+/g, '_')}_Resume`}>
            <Page size="LETTER" style={styles.page}>
                {/* ── HEADER ── */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{fullName.toUpperCase()}</Text>
                        <Text style={styles.title}>{currentTitle}</Text>
                        {summary ? (
                            <Text style={styles.summaryText}>{summary}</Text>
                        ) : null}
                    </View>
                    <View style={styles.headerRight}>
                        {phone ? <Text>✆ {phone}</Text> : null}
                        {github ? <Text>⊙ {github}</Text> : null}
                        {linkedin ? <Text>in {linkedin}</Text> : null}
                        {email ? <Text>✉ {email}</Text> : null}
                        {location ? <Text>📍 {location}</Text> : null}
                    </View>
                </View>

                {/* ── EDUCATION ── */}
                {education.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Education</Text>
                        </View>
                        {education.map((edu: any, i: number) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{edu.college || edu.specialization}</Text>
                                    <Text style={styles.entryDate}>{edu.duration || ''}</Text>
                                </View>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entrySubTitle}>{edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}</Text>
                                    {edu.gpa ? (
                                        <Text style={styles.entrySubTitle}>CGPA: {edu.gpa}</Text>
                                    ) : null}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── EXPERIENCE ── */}
                {experience.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Experience</Text>
                        </View>
                        {experience.map((job: any, i: number) => (
                            <View key={i} style={{ marginBottom: 12 }}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{job.company}</Text>
                                    <Text style={styles.entryDate}>{job.start_date} – {job.end_date}</Text>
                                </View>
                                <View style={[styles.entryHeader, { marginBottom: 4 }]}>
                                    <Text style={styles.entrySubTitle}>{job.title}{job.skills ? ` | ${job.skills}` : ''}</Text>
                                    <Text style={{ fontSize: 9.5 }}>{job.location || ''}</Text>
                                </View>
                                {(job.bullets || []).map((b: any, bi: number) => (
                                    <View key={bi} style={styles.bulletRow}>
                                        <Text style={styles.bulletDot}>–</Text>
                                        <Text style={styles.bulletText}>{removeMarkup(typeof b === 'string' ? b : b.text)}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* ── PROJECTS ── */}
                {projects.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Projects</Text>
                        </View>
                        {projects.map((proj: any, i: number) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{proj.name}</Text>
                                    <Text style={styles.entryDate}>{proj.start_date && proj.end_date ? `${proj.start_date} – ${proj.end_date}` : (proj.end_date || '')}</Text>
                                </View>
                                {proj.tech_stack ? (
                                    <Text style={[styles.entrySubTitle, { marginBottom: 2 }]}>{proj.tech_stack}</Text>
                                ) : null}
                                {(proj.bullets || []).map((b: any, bi: number) => {
                                    const text = typeof b === 'string' ? b : b?.text
                                    return (
                                        <View key={bi} style={styles.bulletRow}>
                                            <Text style={styles.bulletDot}>–</Text>
                                            <Text style={styles.bulletText}>{removeMarkup(text || '')}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        ))}
                    </View>
                )}

                {/* ── TECHNICAL SKILLS ── */}
                {skillsGroups.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Technical Skills</Text>
                        </View>
                        {skillsGroups.map((group, i) => (
                            <View key={i} style={styles.skillRow}>
                                <Text style={styles.skillLabel}>{group.label}: </Text>
                                <Text style={styles.skillText}>{group.items.join(', ')}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── ACHIEVEMENTS ── */}
                {achievements.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Achievements</Text>
                        </View>
                        {achievements.map((ach: any, i: number) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{ach.title}</Text>
                                    <Text style={styles.entryDate}>{ach.date || ''}</Text>
                                </View>
                                {ach.category ? (
                                    <Text style={[styles.entrySubTitle, { color: '#666666' }]}>{ach.category}</Text>
                                ) : null}
                                <View style={[styles.bulletRow, { marginLeft: 0 }]}>
                                    <Text style={styles.bulletDot}>–</Text>
                                    <Text style={styles.bulletText}>{removeMarkup(ach.description || '')}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── CERTIFICATIONS ── */}
                {certifications.length > 0 && (
                    <View>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Certifications</Text>
                        </View>
                        {certifications.map((cert: any, i: number) => (
                            <View key={i} style={styles.skillRow}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.skillLabel}>{cert.name}</Text>
                                {cert.issuer ? (
                                    <Text style={{ color: '#555555' }}> – {cert.issuer}</Text>
                                ) : null}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    )
}
