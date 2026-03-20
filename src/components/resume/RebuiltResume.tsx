"use client";

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

// Moved outside component to avoid react-hooks/static-components lint error
function SectionWrapper({
  id, title, children, openAIPanel, editorMode
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  openAIPanel: (id: string) => void;
  editorMode: string;
}) {
  return (
    <div
      className="group relative mb-6 border-[2px] border-transparent hover:border-[#FFDD00] hover:border-dashed p-2 transition-all"
      onMouseEnter={() => { }}
    >
      <h2 className="text-lg font-bold text-black mb-2 font-space-grotesk tracking-tight uppercase border-b-[2px] border-black inline-block">
        {title}
      </h2>
      <div
        className={`font-inter text-sm ${editorMode === 'manual' ? 'focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-2' : ''}`}
        contentEditable={editorMode === 'manual'}
        suppressContentEditableWarning={true}
      >
        {children}
      </div>
      <button
        onClick={() => openAIPanel(id)}
        className="absolute -top-3 right-0 opacity-0 group-hover:opacity-100 bg-[#FFDD00] text-black font-bold text-xs px-2 py-1 border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer z-10"
      >
        ✦ Edit with AI
      </button>
    </div>
  );
}

export default function RebuiltResume() {
  const { editorMode, openAIPanel } = useResumeStore();

  return (
    <div className="h-full bg-white border-[2px] border-black shadow-[4px_4px_0px_#888888] flex flex-col overflow-hidden relative">
      <div className="bg-[#FFDD00] text-black px-4 py-2 font-bold font-space-grotesk flex justify-between items-center shrink-0 border-b-[2px] border-black">
        <span>AI Rebuilt Resume</span>
        <span className="text-xs uppercase bg-black text-[#FFDD00] px-2 py-1">Standard</span>
      </div>

      <div className="p-8 overflow-y-auto flex-1 bg-white">
        <div className="mb-6 pb-4 border-b-[2px] border-black">
          <h1 className="text-3xl font-[800] text-black mb-1 font-space-grotesk">CHALLA SUJITH</h1>
          <p className="font-ibm-plex text-sm text-[#444444]">Software Engineer | challa@example.com | linkedin.com/in/challasujith</p>
        </div>

        <SectionWrapper id="summary" title="Professional Summary" openAIPanel={openAIPanel} editorMode={editorMode}>
          Entry-level automation controls engineer with hands-on internship experience developing vision-based sorting robots, programming PLCs, and building full-stack industrial applications. Seeking to leverage academic background and practical experience in a fast-paced automation environment.
        </SectionWrapper>

        <SectionWrapper id="experience" title="Work Experience" openAIPanel={openAIPanel} editorMode={editorMode}>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-black font-space-grotesk">Automation Intern</h3>
              <span className="text-[#888888] font-bold text-xs uppercase">Jun 2025 - Aug 2025</span>
            </div>
            <p className="font-ibm-plex text-sm text-black mb-2 font-bold">Acme Robotics, San Francisco, CA</p>
            <ul className="list-disc pl-5 font-inter text-sm mb-2 space-y-1">
              <li>Developed a vision-based sorting robot using Python, OpenCV, and a custom PLC setup.</li>
              <li>Increased sorting accuracy by 15% through machine learning optimizations.</li>
              <li>Worked extensively with IoT sensors and integrated databases for tracking.</li>
            </ul>
          </div>
        </SectionWrapper>

        <SectionWrapper id="education" title="Education" openAIPanel={openAIPanel} editorMode={editorMode}>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-black font-space-grotesk">Bachelor of Science in Engineering</h3>
              <span className="text-[#888888] font-bold text-xs uppercase">May 2026</span>
            </div>
            <p className="font-ibm-plex text-sm text-black mb-1">University of Technology, City, State</p>
            <p className="font-inter text-sm text-[#444444]">Minor in Computer Science | GPA: 3.8/4.0</p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills" openAIPanel={openAIPanel} editorMode={editorMode}>
          <div className="font-inter text-sm">
            <p className="mb-1"><span className="font-bold">Languages:</span> Python, JavaScript, TypeScript, C++</p>
            <p className="mb-1"><span className="font-bold">Frameworks:</span> React, Node.js, Next.js, FastAPI</p>
            <p className="mb-1"><span className="font-bold">Tools:</span> Git, Docker, OpenCV, AWS</p>
          </div>
        </SectionWrapper>
      </div>

      {editorMode === 'templates' && (
        <div className="absolute bottom-0 left-0 w-full bg-white border-t-[2px] border-black p-4 shrink-0 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold font-space-grotesk uppercase tracking-tight text-sm">Select Template</h3>
            <button className="text-xs font-bold hover:underline">Fit Resume to One Page ↕</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="border-[3px] border-black bg-[#FFDD00] shadow-[4px_4px_0px_#000000] p-4 flex flex-col items-center cursor-pointer transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="font-bold text-sm mb-1 uppercase font-space-grotesk">Standard</span>
              <span className="text-xs font-bold">★ Active</span>
            </div>
            <div className="border-[2px] border-black bg-white shadow-[2px_2px_0px_#888888] p-4 flex flex-col items-center cursor-pointer hover:bg-[#F2F2F2] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="font-bold text-sm mb-1 uppercase font-space-grotesk">Compact</span>
            </div>
            <div className="border-[2px] border-black bg-white shadow-[2px_2px_0px_#888888] p-4 flex flex-col items-center cursor-pointer hover:bg-[#F2F2F2] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="font-bold text-sm mb-1 uppercase font-space-grotesk">Modern</span>
            </div>
            <div className="border-[2px] border-black bg-white shadow-[2px_2px_0px_#888888] p-4 flex flex-col items-center cursor-pointer hover:bg-[#F2F2F2] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <span className="font-bold text-sm mb-1 uppercase font-space-grotesk">Classic</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
