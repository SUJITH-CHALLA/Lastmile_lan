# Resume Builder Task List

## 1. Product Overview
Build an AI-Powered Resume Builder module that acts upon user's uploaded resume (PDF/DOCX) after profile creation.
The theme is Neobrutalism (Yellow #FFDD00, Black #000000, White #FFFFFF, Gray shadows #888888).
Target Users: Fresh graduates & experienced professionals.

### Core Philosophy:
* Analysis first, edit second (live logs).
* No black-box edits.
* Data never lost via a single data model.
* Coexisting editor modes: Templates, Manual, AI Edit.

## 2. Global Design System
* **Colors:** Yellow (--color-primary), Black Text/Borders (--color-black), White (--color-white), etc.
* **Neobrutalism Rules:** 2px solid borders on interactive elements, 4px hard shadows (offset, no blur), 0px border radius. Hover: 6px shadow + translate. Click: 1px shadow.
* **Typography:** Space Grotesk (Headings), IBM Plex Mono (Body), JetBrains Mono (Console), Inter (Resume Content).
* **Grid:** 3 columns max. 1-Column for console -> 2-Columns for regular editor -> 3 Columns for AI Panel.

## 3. Core Screens & Flow
### Screen 1: Resume Analysis Console
* Live streaming logs via SSE.
* Displays JSON structure progress.
* Calculates resume score with an animated progress bar.
* Console detail toggles: Summary, Verbose, Raw JSON.

### Screen 2: Side-by-Side Editor
* **Grid 1:** Original Document (Read-only render / raw extract).
* **Grid 2:** Rebuilt Resume using the chosen template. Hover highlights correspond to Grid 1.
* Includes Topbar: Back button, Score Badge, Mode Toggle, Template Picker, Download button.

## 4. Editor Modes
### Mode 1: Templates
* Template picker via a slide-up panel.
* Four initial templates: Standard, Compact, Modern, Classic.
* Seamless re-rendering using the same `ResumeData`.

### Mode 2: Manual Edit
* Inline `contenteditable` activated on click.
* Section re-ordering with drag-and-drop.
* Deletion / addition of sections (Personal Info, Summary, Skills, Education, Experience, Projects, Custom).

### Mode 3: AI Editing
* Triggered by hovering elements on Grid 2.
* Opens Grid 3 (AI Panel) presenting current text and 3 AI suggestions based on prompt and Cerebras Qwen 3 API.

## 5. Technology constraints
* Frontend: React (Next.js), Zustand for State, Tailwind CSS (Utility classes only).
* Backend: Node.js (Next.js API Routes).
* AI Engine: Cerebras OpenAI SDK (Qwen 3) max_tokens and system prompts predefined.
* PDF/DOCX Parsing: `pdf-parse` or similar.

## Initial Steps
1. Setup global state via Zustand.
2. Develop pure UI components for Neobrutalism tokens.
3. Scaffold basic routing and the API folder structure `/api/resume/...`.
