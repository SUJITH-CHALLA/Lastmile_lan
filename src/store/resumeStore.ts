import { create } from 'zustand';

// Use any for the large JSON schema shapes to avoid massive TS boilerplate for now
export interface ResumeStore {
  // Upload
  uploadedFile: File | null;
  parsedText: string;

  // Analysis
  isAnalyzing: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResult: Record<string, any> | null;
  analysisError: string | null;

  // Resume editing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentResume: Record<string, any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalResume: Record<string, any> | null;
  hasUnsavedChanges: boolean;

  // Templates
  selectedTemplate: number;

  // Actions
  setFile: (file: File | null) => void;
  setParsedText: (text: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAnalysis: (result: Record<string, any> | null, error?: string | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateResumeSection: (sectionPath: string, content: any) => void;
  resetToOriginal: () => void;

  setTemplate: (id: number) => void;

  acceptSuggestion: (sectionPath: string, newContent: string) => void;
  rejectSuggestion: (sectionPath: string) => void;

  // Additional actions
  resetStore: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  uploadedFile: null,
  parsedText: "",

  isAnalyzing: false,
  analysisResult: null,
  analysisError: null,

  currentResume: null,
  originalResume: null,
  hasUnsavedChanges: false,

  selectedTemplate: 3, // Neo-Brutalist default

  setFile: (file) => set({ uploadedFile: file }),
  setParsedText: (text) => set({ parsedText: text }),

  setAnalysis: (result, error = null) => set((state) => ({
    analysisResult: result,
    analysisError: error,
    currentResume: result?.improved_resume || state.currentResume,
    originalResume: result?.improved_resume || state.originalResume,
    isAnalyzing: false,
    hasUnsavedChanges: false
  })),

  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),

  updateResumeSection: (sectionPath, content) => set((state) => {
    if (!state.currentResume) return state;
    // Deep clone and update path logic would go here
    // For now we'll do a simple top-level merge
    const updated = { ...state.currentResume, [sectionPath]: content };
    return {
      currentResume: updated,
      hasUnsavedChanges: true
    };
  }),

  resetToOriginal: () => set((state) => ({
    currentResume: state.originalResume ? JSON.parse(JSON.stringify(state.originalResume)) : null,
    hasUnsavedChanges: false
  })),

  setTemplate: (id) => set({ selectedTemplate: id }),

  acceptSuggestion: (sectionPath, newContent) => set((state) => {
    if (!state.currentResume) return state;
    const updated = { ...state.currentResume, [sectionPath]: newContent };
    return { currentResume: updated, hasUnsavedChanges: true };
  }),

  rejectSuggestion: (_sectionPath) => set((state) => state), // no-op for now unless tracking rejected

  resetStore: () => set({
    uploadedFile: null,
    parsedText: "",
    isAnalyzing: false,
    analysisResult: null,
    analysisError: null,
    currentResume: null,
    originalResume: null,
    hasUnsavedChanges: false
  })
}));
