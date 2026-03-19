"use client";

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

export default function OriginalResume() {
  const { activeSectionId } = useResumeStore();

  return (
    <div className="h-full bg-white border-[2px] border-black shadow-[4px_4px_0px_#888888] flex flex-col overflow-hidden">
      <div className="bg-black text-white px-4 py-2 font-bold font-space-grotesk flex justify-between items-center shrink-0 border-b-[2px] border-black">
        <span>Your Uploaded Resume</span>
        <span className="text-xs text-[#888888]">Read-only</span>
      </div>
      
      <div className="p-8 overflow-y-auto flex-1 font-sans text-sm text-[#444444] leading-relaxed relative">
        <h1 className="text-2xl font-bold text-black mb-2">Challa Sujith</h1>
        <p className="mb-6">Software Engineer | challa@example.com | 123-456-7890</p>
        
        <div className={`mb-6 p-2 rounded transition-colors ${activeSectionId === 'summary' ? 'bg-[#F2F2F2] border-[2px] border-dashed border-[#888888]' : 'border-[2px] border-transparent'}`}>
          <h2 className="text-lg font-bold text-black mb-2 border-b-[2px] border-black inline-block">Summary</h2>
          <p>
            Entry-level automation controls engineer with hands-on internship experience developing vision-based sorting robots, programming PLCs, and building full-stack industrial applications.
          </p>
        </div>

        <div className={`mb-6 p-2 rounded transition-colors ${activeSectionId === 'experience' ? 'bg-[#F2F2F2] border-[2px] border-dashed border-[#888888]' : 'border-[2px] border-transparent'}`}>
          <h2 className="text-lg font-bold text-black mb-2 border-b-[2px] border-black inline-block">Experience</h2>
          <div className="mb-4">
            <h3 className="font-bold text-black">Automation Intern</h3>
            <p className="italic mb-2">Acme Robotics | Jun 2025 - Aug 2025</p>
            <ul className="list-disc pl-5">
              <li>Developed a vision-based sorting robot using Python, OpenCV, and a custom PLC setup.</li>
              <li>Increased sorting accuracy by 15% through machine learning optimizations.</li>
              <li>Worked extensively with IoT sensors and integrated databases for tracking.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
