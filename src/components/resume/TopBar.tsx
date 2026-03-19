"use client";

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';

export default function TopBar() {
  const { 
    setAnalysisComplete, 
    editorMode, 
    setEditorMode, 
    activeTemplate, 
    score 
  } = useResumeStore();

  const handleBack = () => {
    // Navigate back to Analysis Console or Upload
    setAnalysisComplete(false);
  };

  return (
    <div className="h-16 bg-white border-b-[2px] border-black flex items-center justify-between px-6 shrink-0 relative z-10 w-full shadow-[0px_4px_0px_#888888]">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="border-[2px] border-black bg-white px-3 py-1 font-bold text-sm shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#000000] transition-all"
        >
          ← Back
        </button>
        <div className="bg-[#FFDD00] border-[2px] border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0px_#000000]">
          Score: {score?.total || '7.0'} ▲
        </div>
      </div>

      <div className="flex border-[2px] border-black shadow-[2px_2px_0px_#000000] bg-white">
        <button 
          onClick={() => setEditorMode('templates')}
          className={`px-4 py-1 font-bold text-sm border-r-[2px] border-black ${editorMode === 'templates' ? 'bg-[#FFDD00]' : 'hover:bg-[#F2F2F2]'}`}
        >
          Templates
        </button>
        <button 
          onClick={() => setEditorMode('manual')}
          className={`px-4 py-1 font-bold text-sm border-r-[2px] border-black ${editorMode === 'manual' ? 'bg-[#FFDD00]' : 'hover:bg-[#F2F2F2]'}`}
        >
          Manual
        </button>
        <button 
          onClick={() => setEditorMode('ai')}
          className={`px-4 py-1 font-bold text-sm ${editorMode === 'ai' ? 'bg-[#FFDD00]' : 'hover:bg-[#F2F2F2]'}`}
        >
          AI Edit
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-[2px] border-black bg-white px-3 py-1 font-bold text-sm shadow-[2px_2px_0px_#000000] cursor-pointer hover:bg-[#F2F2F2]">
          <span>Template:</span>
          <span className="capitalize">{activeTemplate}</span>
          <span className="text-xs">▼</span>
        </div>
        <button 
          className="bg-black text-white border-[2px] border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_#888888] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#888888] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#000000] transition-all"
        >
          Download
        </button>
      </div>

    </div>
  );
}
