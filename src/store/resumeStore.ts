import { create } from 'zustand';
import { ResumeData, ResumeScore, LogEntry, EditorMode } from '@/types/resume';

interface ResumeStore {
  // Data
  resumeData: ResumeData | null;
  originalText: string | null;

  // Editor state
  activeTemplate: string;
  editorMode: EditorMode;
  activeSectionId: string | null;
  aiPanelOpen: boolean;

  // Analysis
  analysisComplete: boolean;
  analysisLogs: LogEntry[];
  score: ResumeScore | null;

  // Actions
  setResumeData: (data: ResumeData) => void;
  updateSection: (sectionId: string, content: any) => void;
  switchTemplate: (templateId: string) => void;
  setEditorMode: (mode: EditorMode) => void;
  openAIPanel: (sectionId: string) => void;
  closeAIPanel: () => void;
  acceptSuggestion: (sectionId: string, text: string) => void;
  appendLog: (log: Omit<LogEntry, 'id'>) => void;
  setAnalysisComplete: (complete: boolean) => void;
  setOriginalText: (text: string) => void;
  setScore: (score: ResumeScore) => void;
  resetAnalysis: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  // Data
  resumeData: null,
  originalText: null,

  // Editor state
  activeTemplate: 'standard',
  editorMode: 'templates',
  activeSectionId: null,
  aiPanelOpen: false,

  // Analysis
  analysisComplete: false,
  analysisLogs: [],
  score: null,

  // Actions
  setResumeData: (data) => set({ resumeData: data }),
  updateSection: (sectionId, content) => 
    set((state) => {
      if (!state.resumeData) return state;
      // Depending on how sections are structured, this will need a more complex update logic.
      // For now, simple spread assuming shallow update logic could be handled differently if it's an array element
      return {
        resumeData: {
          ...state.resumeData,
          [sectionId]: content,
        }
      };
    }),
  switchTemplate: (templateId) => set({ activeTemplate: templateId }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  openAIPanel: (sectionId) => set({ aiPanelOpen: true, activeSectionId: sectionId }),
  closeAIPanel: () => set({ aiPanelOpen: false, activeSectionId: null }),
  acceptSuggestion: (sectionId, text) =>
    set((state) => {
      // Mock update to accept suggestion, logic here would replace the text in the active section
      return state;
    }),
  appendLog: (log) =>
    set((state) => ({
      analysisLogs: [
        ...state.analysisLogs, 
        { ...log, id: Math.random().toString(36).substring(7) }
      ]
    })),
  setAnalysisComplete: (complete) => set({ analysisComplete: complete }),
  setOriginalText: (text) => set({ originalText: text }),
  setScore: (score) => set({ score: score }),
  resetAnalysis: () => set({
    resumeData: null,
    originalText: null,
    analysisComplete: false,
    analysisLogs: [],
    score: null,
    activeSectionId: null,
    aiPanelOpen: false,
  })
}));
