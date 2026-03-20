"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import AnalysisConsole from './AnalysisConsole';
import EditorLayout from './EditorLayout';

export default function ResumeBuilderPage() {
  const { analysisComplete } = useResumeStore();
  const [hasUploaded, setHasUploaded] = useState(false);

  // We define Neobrutalism classes inline for the pure UI elements to adhere strictly to the PRD

  const handleUpload = (file: File) => {
    // In the future this function will call the mock or actual API,
    // upload the file, and then we will redirect to the stream.
    console.log("Mock uploaded file:", file.name);
    setHasUploaded(true);
  };

  if (!hasUploaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-black bg-white">
        <div className="w-full max-w-2xl p-12 bg-white border-[2px] border-black shadow-[4px_4px_0px_#888888]">
          <h1 className="mb-4 text-3xl font-extrabold font-space-grotesk tracking-tight">Upload Resume</h1>
          <p className="mb-8 font-ibm-plex text-black font-medium">Upload your PDF or DOCX to begin AI-powered analysis.</p>
          <div className="flex items-center justify-center p-12 mb-6 border-[2px] border-black border-dashed bg-[#F2F2F2]">
            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              id="resume-upload"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleUpload(e.target.files[0]);
                }
              }}
            />
            <label
              htmlFor="resume-upload"
              className="px-6 py-3 font-bold text-black border-[2px] border-black cursor-pointer bg-[#FFDD00] shadow-[4px_4px_0px_#888888] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#888888]"
            >
              Choose File
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisComplete) {
    return <AnalysisConsole />;
  }

  return <EditorLayout />;
}
