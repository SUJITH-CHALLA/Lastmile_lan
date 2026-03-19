# Implementation Plan: AI-Powered Resume Builder

## 1. Architecture Overview
**Frontend (React + Next.js):**
* `App -> Router -> ResumeBuilderPage`
* Main views: `AnalysisConsole`, `EditorLayout` (contains `OriginalResume`, `RebuiltResume`, and optionally `AIPanel`).
* State Management: Zustand `ResumeStore`.

**Backend (Node.js + Next.js API Routes):**
* Integrates with Cerebras OpenAI SDK (Qwen 3).
* Endpoints for parsing, extracting, improving, and scoring.
* Streaming API for the analysis console (Server-Sent Events - SSE).

## 2. Global State Management (Zustand)
Create `src/store/resumeStore.ts` with the following structure:
```typescript
interface ResumeStore {
  // Data
  resumeData: ResumeData | null;
  originalText: string | null;
  // Editor state
  activeTemplate: string;
  editorMode: 'templates' | 'manual' | 'ai';
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
  // ... سایر actions
}
```

## 3. Component Tree Breakdown
**Main Container**
* `ResumeBuilderPage.tsx`: Container for the entire experience. Manages the display toggle between `AnalysisConsole` and `EditorLayout`.

**Analysis Console (`src/components/resume/AnalysisConsole.tsx`)**
* `ConsoleTerminal.tsx`: Handles SSE log stream with character-by-character typewriter effect.
* `ConsoleToggle.tsx`: Switches between Summary / Verbose / Raw JSON modes.
* `ProgressBar.tsx`: Animated scoring progress bar.

**Editor Layout (`src/components/resume/EditorLayout.tsx`)**
* `TopBar.tsx`: Score badge, Mode toggle (Templates/Manual/AI), Template picker, Download.
* `Grid 1` (`OriginalResume.tsx`): Renders original PDF or text. Responds to hover events from Grid 2.
* `Grid 2` (`RebuiltResume.tsx`): 
  * `TemplateRenderer`: Renders selected template (Standard, Compact, Modern, Classic).
  * `SectionWrapper`: Provides Hover boundaries for "Edit with AI" and Manual edit interactions.
* `Grid 3` (`AIPanel.tsx`): Slides in on side.
  * Shows Current Text.
  * Suggestion List (3 `SuggestionCard`s with Accept/Reject diffing).
  * Custom Prompt Input and Quick Action Chips.

## 4. Backend API Routes
Implement these routes in `src/app/api/resume/`:
1. `POST /api/resume/upload`: Parse file using `pdf-parse`. Returns text and meta.
2. `GET /api/resume/analyze/stream`: Core SSE route linking to Qwen 3 for parsing, structuring, and rating.
3. `POST /api/resume/extract`: Pure API route to extract into `ResumeData` JSON using Qwen 3.
4. `POST /api/resume/score`: Score logic (0-10 on 5 dimensions).
5. `POST /api/resume/improve`: Section-level refactoring endpoints. Input: Section contents + custom prompt/instruction.
6. `GET /api/templates`: Mock route providing standard 4 templates metadata.

## 5. Phased Execution Steps
1. **Phase 1: Setup & State:** Define `ResumeData` types, initialize Zustand store. Setup Tailwind theme to match Neobrutalism specs.
2. **Phase 2: Backend Mocking/Integration:** Build Next.js API Routes (upload parsing + SSE stream mock for quick frontend building). Hook Cerebras later.
3. **Phase 3: Analysis Console GUI:** Build terminal aesthetic and SSE log connection.
4. **Phase 4: Side-by-Side UI & Templates:** Lay out Grid 1 and 2. Implement base `StandardTemplate`.
5. **Phase 5: Editor Modes (Manual & Templates):** Implement template switching, build contenteditable interactions.
6. **Phase 6: AI Panel (Grid 3):** Implement hover mechanisms, prompt box, Quick Actions functionality, Diff UI.
7. **Phase 7: Connect AI Backend:** Replace mocks with actual Cerebras Qwen 3 logic for extracting, scoring, and improving.
