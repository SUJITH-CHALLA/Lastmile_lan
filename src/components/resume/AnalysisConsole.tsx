"use client";

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';

const mockLogs = [
  { text: "Parsing document structure...", status: "success" },
  { text: "Detecting resume language: English", status: "success" },
  { text: "Identifying sections found: Summary, Skills, Education, Languages, Experience (3), Projects (3)", status: "success" },
  { text: "Extracting personal info...", status: "success" },
  { text: "Extracting work experience...", status: "success" },
  { text: "Scoring resume content...", status: "progress" },
  { text: "Building structured data model...", status: "success" },
  { text: "Populating Default Template...", status: "success" },
  { text: "Ready.", status: "success" }
];

export default function AnalysisConsole() {
  const { setAnalysisComplete } = useResumeStore();
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentLogIndex < mockLogs.length) {
      const currentLog = mockLogs[currentLogIndex];
      let i = 0;
      setIsTyping(true);
      setDisplayedText("");
      
      const typingInterval = setInterval(() => {
        setDisplayedText(prev => prev + currentLog.text.charAt(i));
        i++;
        if (i >= currentLog.text.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          setTimeout(() => {
            setLogs(prev => [...prev, { ...currentLog, id: Math.random() }]);
            if (currentLog.text.includes("Scoring")) {
              simulateScore();
            }
            setCurrentLogIndex(prev => prev + 1);
          }, 400); // Wait bit before moving to next step
        }
      }, 20); // 20ms typewriter character delay

      return () => clearInterval(typingInterval);
    }
  }, [currentLogIndex]);

  const simulateScore = () => {
    let currentScore = 0;
    const scoreInterval = setInterval(() => {
      currentScore += 0.5;
      if (currentScore >= 4.2) {
        setScore(4.2);
        clearInterval(scoreInterval);
      } else {
        setScore(currentScore);
      }
    }, 50);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#FFFFFF] p-8">
      <div className="w-full max-w-[900px] mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-[800] text-black tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Analyzing Your Resume
          </h1>
          <div className="flex border-[2px] border-black text-sm bg-white font-bold text-black" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <button className="px-3 py-1 bg-[#FFDD00] border-r-[2px] border-black">Summary</button>
            <button className="px-3 py-1 hover:bg-[#F2F2F2] border-r-[2px] border-black">Verbose</button>
            <button className="px-3 py-1 hover:bg-[#F2F2F2]">Raw JSON</button>
          </div>
        </div>
        <p className="text-[#444444] text-sm" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          Challa Sujith · Software_Engineer_Resume.pdf
        </p>
      </div>

      <div className="w-full max-w-[900px] border-[2px] border-[#000000] bg-[#111111] p-6 shadow-[4px_4px_0px_#888888] mb-8 relative">
        <div className="text-[14px] text-[#FFDD00] leading-loose min-h-[400px]" style={{ fontFamily: '"JetBrains Mono", Courier, monospace' }}>
          {logs.map(log => (
            <div key={log.id} className="mb-2">
              <span className="text-[#FFDD00] mr-2">{">"}</span>
              <span>{log.text}</span>
              <span className={`ml-2 font-bold ${log.status === 'success' ? 'text-[#00C853]' : 'text-[#FFDD00]'}`}>
                {log.status === 'success' ? '[✓]' : '[~]'}
              </span>
            </div>
          ))}
          
          {currentLogIndex < mockLogs.length && (
            <div className="mb-2">
              <span className="text-[#FFDD00] mr-2">{">"}</span>
              <span>{displayedText}</span>
              {isTyping && <span className="animate-pulse ml-1 inline-block w-2 bg-[#FFDD00] h-4 translate-y-1"></span>}
            </div>
          )}

          {score > 0 && (
            <div className="mt-4 mb-2">
              <span className="text-[#FFDD00] mr-2">{">"}</span>
              <span className="text-white">Current Score: </span>
              <span className="font-bold text-white mr-4">{score.toFixed(1)} / 10 </span>
              <span className="text-[#FFDD00] inline-block font-mono tracking-tighter">
                {"█".repeat(Math.floor((score / 10) * 20))}
                <span className="text-[#444444]">{"░".repeat(20 - Math.floor((score / 10) * 20))}</span>
              </span>
            </div>
          )}

          {currentLogIndex >= mockLogs.length && (
            <div className="mt-6">
              <div className="text-[#FFDD00] mb-2">{"> Issues found:"}</div>
              <div className="text-[#FF6D00] ml-4">{"⚠ Weak action verbs in Experience section"}</div>
              <div className="text-[#FF6D00] ml-4">{"⚠ Summary not tailored to a specific role"}</div>
              <div className="text-[#FF6D00] ml-4">{"⚠ Missing quantified achievements"}</div>
              <div className="text-[#00C853] ml-4">{"✓ Education section is well-structured"}</div>
              <div className="text-[#00C853] ml-4">{"✓ Projects are detailed and relevant"}</div>
            </div>
          )}
        </div>
      </div>

      <div className="h-16 flex items-center">
        {currentLogIndex >= mockLogs.length ? (
          <button
            onClick={() => setAnalysisComplete(true)}
            className="px-8 py-4 bg-[#FFDD00] border-[2px] border-[#000000] text-[#000000] font-[800] text-lg shadow-[4px_4px_0px_#888888] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_#888888]"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Open Resume Editor →
          </button>
        ) : (
          <div className="text-[#888888] font-bold text-sm tracking-widest uppercase">
            Analysis in progress...
          </div>
        )}
      </div>
    </div>
  );
}
