export interface ResumeData {
  meta: {
    source_file: string;
    extracted_at: string;
    template_id: string;
    score: ResumeScore;
  };
  personal: {
    full_name: string;
    phone: string;
    email: string;
    linkedin_url?: string;
    github_url?: string;
    portfolio_url?: string;
    location?: string;
  };
  summary: string;
  skills: {
    programming_languages?: string[];
    frameworks?: string[];
    tools?: string[];
    databases?: string[];
    operating_systems?: string[];
    other?: string[];
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  languages: LanguageEntry[];
  certifications?: CertificationEntry[];
  custom_sections?: CustomSection[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type?: string;
  start_date: string;
  end_date: string;
  location: string;
  tech_stack?: string[];
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  associated_org?: string;
  description: string;
  bullets: string[];
  tech_stack?: string[];
  url?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  gpa?: number;
  start_year: string;
  end_year: string;
  location: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CustomSection {
  id: string;
  title: string;
  body: string;
}

export interface ResumeScore {
  total: number;
  action_verbs: number;
  quantified_achievements: number;
  relevance: number;
  clarity: number;
  structure: number;
  issues: ScoreIssue[];
}

export interface ScoreIssue {
  severity: 'warning' | 'error' | 'info';
  section: string;
  message: string;
}

export interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'progress';
  message: string;
}

export type EditorMode = 'templates' | 'manual' | 'ai';
