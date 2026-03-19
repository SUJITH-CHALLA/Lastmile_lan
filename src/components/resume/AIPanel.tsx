"use client";

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

export default function AIPanel() {
  const { closeAIPanel, activeSectionId } = useResumeStore();

  const mockSuggestions = [
    { id: 1, text: "Results-driven engineer with proven internship experience building OpenCV-powered sorting systems and full-stack industrial apps." },
    { id: 2, text: "Automation controls engineer with hands-on experience in Python, OpenCV, and IoT — seeking to contribute to PLC/SCADA development." },
    { id: 3, text: "Motivated engineer with internship background in vision systems and industrial automation, proficient in Python, C, and MongoDB." }
  ];

  return (
    <div className="h-full bg-white border-[2px] border-black shadow-[4px_4px_0px_#888888] flex flex-col font-mono text-sm">
      <div className="flex items-center justify-between border-b-[2px] border-black bg-[#FFDD00] px-4 py-3 shrink-0">
        <h2 className="font-[800] uppercase font-space-grotesk tracking-widest text-sm">
          AI Edit — {activeSectionId || "Section"}
        </h2>
        <button 
          onClick={closeAIPanel}
          className="font-bold border-[2px] border-black bg-white w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto font-ibm-plex">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-[#888888] uppercase mb-2">Current Text</h3>
          <div className="border-[2px] border-black p-3 bg-[#F2F2F2] text-sm text-[#444444]">
            Entry-level automation controls engineer with hands-on internship experience developing vision-based sorting robots...
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold text-[#888888] uppercase mb-2">AI Suggestions</h3>
          <div className="flex flex-col gap-3">
            {mockSuggestions.map((s, index) => (
              <div key={s.id} className="border-[2px] border-black p-3 bg-white hover:border-[#FFDD00] group transition-colors relative">
                <span className="absolute -left-3 -top-3 w-6 h-6 bg-black text-white flex items-center justify-center font-bold text-xs rounded-full border-[2px] border-white z-10">
                  {index + 1}
                </span>
                <p className="mb-3 text-black">{s.text}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#00C853] text-white font-bold py-1 border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                    ✓ Accept
                  </button>
                  <button className="flex-1 bg-[#FF1744] text-white font-bold py-1 border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-bold text-[#888888] uppercase mb-2">Or tell AI exactly what you want:</h3>
          <textarea 
            className="w-full border-[2px] border-black p-3 focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:ring-offset-2 mb-2 resize-none"
            placeholder="e.g. 'Make it 2 sentences, focus on PLC'"
            rows={3}
          />
          <button className="w-full bg-black text-white font-bold py-2 border-[2px] border-black shadow-[2px_2px_0px_#888888] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#888888] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
            → Generate
          </button>
        </div>

        <div>
           <h3 className="text-xs font-bold text-[#888888] uppercase mb-2">Quick Actions</h3>
           <div className="flex flex-wrap gap-2 text-xs">
              <button className="border-[2px] border-black px-2 py-1 font-bold hover:bg-[#FFDD00]">Use stronger verbs</button>
              <button className="border-[2px] border-black px-2 py-1 font-bold hover:bg-[#FFDD00]">Shorten</button>
              <button className="border-[2px] border-black px-2 py-1 font-bold hover:bg-[#FFDD00]">Remove filler</button>
           </div>
        </div>
      </div>
    </div>
  );
}
