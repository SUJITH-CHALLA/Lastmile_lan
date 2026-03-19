"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileForm } from './ProfileForm'
import { AIProcessing } from './AIProcessing'
import { ResumeOutput } from './ResumeOutput'
import { FlowStep, ProfileData, AnalysisResult } from './types'
import { Navbar } from '@/components/layout/Navbar'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ResumePDF } from './ResumePDF'
const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export default function FlowContainer() {
    const [step, setStep] = useState<FlowStep>('profile')
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: '',
        jobTitle: '',
        yearsOfExperience: 0,
        industry: '',
        targetRole: '',
        linkedinUrl: '',
        resumeFile: null,
        resumeText: '',
    })
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

    // Screen 1 → Screen 2
    const handleContinue = (data: ProfileData) => {
        setProfileData(data)
        setStep('processing')
    }

    // Screen 2 → Screen 3
    const handleProcessingComplete = (result: AnalysisResult) => {
        setAnalysisResult(result)
        setStep('editor')
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-black">
            <AnimatePresence mode="wait">
                {/* ── SCREEN 1: Profile + Resume Upload ── */}
                {step === 'profile' && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_EXPO }}
                    >
                        <ProfileForm onContinue={handleContinue} />
                    </motion.div>
                )}

                {/* ── SCREEN 2: AI Split-Screen Processing ── */}
                {step === 'processing' && (
                    <motion.div
                        key="processing"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_EXPO }}
                        className="fixed inset-0 z-50 bg-white"
                    >
                        <AIProcessing
                            profileData={profileData}
                            onComplete={handleProcessingComplete}
                        />
                    </motion.div>
                )}

                {/* ── SCREEN 3: Resume Output ── */}
                {step === 'editor' && analysisResult && (
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_EXPO }}
                        className="fixed inset-0 z-50 bg-[#F5F5F5] overflow-y-auto"
                    >
                        {/* Custom Navbar for Editor */}
                        <Navbar
                            hideLinks={true}
                            rightSlot={
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => window.history.back()}
                                        className="border-2 border-black font-black text-xs uppercase px-5 py-2 shadow-neo hover:shadow-neo-lg transition-all bg-white text-black"
                                    >
                                        ← Back
                                    </button>
                                    <PDFDownloadLink
                                        document={<ResumePDF data={analysisResult as any} profileData={profileData} />}
                                        fileName={`${(analysisResult?.personal_info?.full_name || profileData.fullName || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf`}
                                    >
                                        {({ loading }) => (
                                            <button className="bg-primary text-black border-2 border-black font-black text-xs uppercase px-5 py-2 shadow-neo hover:shadow-neo-lg transition-all">
                                                {loading ? 'Compiling…' : '↓ Download PDF'}
                                            </button>
                                        )}
                                    </PDFDownloadLink>
                                </div>
                            }
                        />
                        <div className="min-h-screen bg-[#F5F5F5]">
                            <div style={{ paddingTop: '80px', paddingBottom: '48px' }}>
                                <ResumeOutput
                                    data={analysisResult}
                                    profileData={profileData}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
