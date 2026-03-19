"use client";

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import TopBar from './TopBar';
import OriginalResume from './OriginalResume';
import RebuiltResume from './RebuiltResume';
import AIPanel from './AIPanel';

export default function EditorLayout() {
  const { aiPanelOpen } = useResumeStore();

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F2] font-sans overflow-hidden">
      <TopBar />
      <div className="flex flex-1 p-4 gap-4 overflow-hidden h-full">
        {aiPanelOpen ? (
          <>
            <div className="w-[35%] h-full shrink-0 transition-all duration-300">
              <OriginalResume />
            </div>
            <div className="w-[35%] h-full shrink-0 transition-all duration-300">
              <RebuiltResume />
            </div>
            <div className="w-[30%] h-full shrink-0 transition-all duration-300">
              <AIPanel />
            </div>
          </>
        ) : (
          <>
            <div className="w-[45%] h-full shrink-0 transition-all duration-300">
              <OriginalResume />
            </div>
            <div className="w-[55%] h-full shrink-0 transition-all duration-300">
              <RebuiltResume />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
