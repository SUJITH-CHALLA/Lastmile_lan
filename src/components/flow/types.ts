// ============================================================
// LASTMILE AI Resume Flow — Type Definitions
// ============================================================

// ── Flow Steps ──
export type FlowStep = 'profile' | 'processing' | 'editor'

// ============================================================
// PROFILE DATA (Simplified — 6 fields + resume)
// ============================================================
export interface ProfileData {
    fullName: string
    jobTitle: string
    yearsOfExperience: number
    industry: string
    targetRole: string
    linkedinUrl?: string
    resumeFile: File | null
    resumeText?: string  // extracted text from resume (client-side)
    email?: string
    city?: string
}

// ── Analysis Report Interfaces ──
export interface Flaw {
    type: string
    label: string
    severity: 'critical' | 'moderate' | 'low'
    description: string
    impact: string
}

export interface Change {
    label: string
    location: string
    before: string
    after: string
    icon: string
}

export interface AnalysisReportData {
    flawsFound: Flaw[]
    changesMade: Change[]
    scores: {
        before: { overall: number; impact: number; quantification: number; ats: number; grammar: number; keywords: number; format: number }
        after: { overall: number; impact: number; quantification: number; ats: number; grammar: number; keywords: number; format: number }
    }
    verdict: { level: string; summary: string }
}

// ============================================================
// API RESPONSE (from /api/analyze-resume — proven endpoint)
// ============================================================
export interface AnalysisMeta {
    name: string
    title: string
    email: string | null
    phone: string | null
    location: string | null
    linkedin: string | null
    original_score: number
    optimized_score: number
}

export interface SectionIssue {
    severity: 'critical' | 'high' | 'medium' | 'low'
    problem: string
    fix: string
}

export interface AnalysisSection {
    key: string
    label: string
    status: 'optimized' | 'valid' | 'flagged'
    original_lines: string[]
    removed_lines: string[]
    added_lines: string[]
    fixed_lines: string[]
    issues: SectionIssue[]
}

export interface FinalResumeHeader {
    name: string
    title: string
    contact: string
}

export interface FinalResumeSection {
    label: string
    content_lines: string[]
}

export interface AnalysisLog {
    id: number
    type: 'info' | 'ok' | 'warn' | 'err'
    msg: string
    section: string | null
}

export interface AnalysisResult {
    meta: AnalysisMeta
    logs: AnalysisLog[]
    sections: AnalysisSection[]
    final_resume: {
        header: FinalResumeHeader
        sections: FinalResumeSection[]
    }
    // Rich analysis data from Cerebras output
    personal_info?: {
        full_name: string
        current_title: string
        email: string
        phones: string[]
        location: string
        linkedin?: string
        github?: string
    }
    professional_summary?: string
    work_experience?: {
        company: string
        title: string
        location: string
        start_date: string
        end_date: string
        bullets: { text: string; inferred?: boolean }[]
    }[]
    education?: {
        degree: string
        specialization: string
        college: string
        duration: string
        gpa?: string
    }[]
    core_skills?: {
        technical_skills: string[]
        accounting_tools: string[]
        soft_skills: string[]
    }
    projects?: { name: string; tech_stack: string; start_date: string; end_date: string; bullets: { text: string }[] }[]
    achievements?: { title: string; date: string; category: string; description: string }[]
    certifications?: { name: string; issuer: string }[]
    analysisReport: AnalysisReportData
    _quality_flags: string[]
    optimizedSummary: string
    optimizedBullets: string[]
    skills: string[]
}

// ============================================================
// LEGACY: FullAnalysisResult (compatibility alias)
// ============================================================
export type FullAnalysisResult = AnalysisResult

// ============================================================
// RESUME EDITOR STATE
// ============================================================
export type ResumeSectionType = 'header' | 'summary' | 'experience' | 'skills' | 'education'

export interface ResumeEditorState {
    activeSection: ResumeSectionType | null
    aiPanelOpen: boolean
    isEditing: boolean
}
